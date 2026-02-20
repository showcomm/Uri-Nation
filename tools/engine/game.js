// Uri-Nation — Core Game Rules (v1.3.0)
// Source of truth for all game logic. No UI dependency.
// Used by simulator (Node) and game runner (browser) alike.

import { ARCHETYPES } from './archetypes.js';
import { SPACE_TYPES } from './board.js';

// ---------- Balance-tuning knobs ----------

export const DEFAULTS = {
  swaggerPerTerritories: 2,   // +1 swagger per N connected territories
  gritPenaltyThreshold:  5,   // grit above this penalises attack rolls
  maxFortify:            3,   // max fortify tokens per territory
  maxTurns:              30,
  territoryWinThreshold: 10,  // non-home territories to win
  desperationThreshold:  3,   // fewer than N → desperation bonus
  desperationGritBonus:  2,
  houseboundTurns:       2,   // 0 territories for N turns → housebound
};

// ---------- Player factory ----------

export function createPlayer(id, archetypeKey, homeSpaceId, colour) {
  const arch = ARCHETYPES[archetypeKey];
  if (!arch) throw new Error(`Unknown archetype: ${archetypeKey}`);
  return {
    id,
    colour,                     // blue / purple / orange / yellow
    archetype:          archetypeKey,
    position:           homeSpaceId,
    water:              arch.water,
    swagger:            arch.swagger,
    drive:              arch.drive,
    grit:               arch.grit,
    bond:               arch.bond,
    allies:             [],     // list of allied player ids
    zeroTerritoryTurns: 0,
    housebound:         false,
  };
}

// ---------- Game class ----------

export class Game {
  constructor(board, players, config = {}) {
    this.board   = board;
    this.players = players;
    this.config  = { ...DEFAULTS, ...config };
    this.turnNumber         = 0;
    this.currentPlayerIndex = 0;
    this.gameOver = false;
    this.winner   = null;
    this.log      = [];
    // dogParkSpaceId → initiatorPlayerId
    this.pendingAlliances = new Map();
  }

  // -------- helpers --------

  getPlayer(id) {
    return this.players.find(p => p.id === id);
  }

  getCurrentPlayer() {
    return this.players[this.currentPlayerIndex];
  }

  getArchetype(player) {
    return ARCHETYPES[player.archetype];
  }

  // -------- turn order (least territory first) --------

  sortTurnOrder() {
    this.players.sort((a, b) => {
      const aTerr = this.board.getTerritoriesOwnedBy(a.id).length;
      const bTerr = this.board.getTerritoriesOwnedBy(b.id).length;
      return aTerr - bTerr;
    });
  }

  // ================================================================
  //  TERRITORY INCOME (phase 1 of turn)
  // ================================================================

  calculateSwaggerIncome(playerId) {
    let total = 0;
    for (const group of this.board.getConnectedTerritoryGroups(playerId)) {
      total += Math.floor(group.length / this.config.swaggerPerTerritories);
    }
    return total;
  }

  applyTerritoryIncome(playerId) {
    const player = this.getPlayer(playerId);

    // Swagger from connected territories
    const swagger = this.calculateSwaggerIncome(playerId);
    if (swagger > 0) {
      player.swagger += swagger;
      this._log(playerId, `territory income: +${swagger} swagger`);
    }

    // Desperation grit bonus
    const terrCount = this.board.getTerritoriesOwnedBy(playerId).length;
    if (terrCount < this.config.desperationThreshold) {
      player.grit += this.config.desperationGritBonus;
      this._log(playerId, `desperation: +${this.config.desperationGritBonus} grit`);
    }
  }

  // ================================================================
  //  ACTION VALIDATION (can* methods)
  // ================================================================

  canClaim(playerId, territoryId) {
    const player = this.getPlayer(playerId);
    const space  = this.board.getSpace(territoryId);
    if (!space || space.type !== SPACE_TYPES.TERRITORY)
      return { ok: false, reason: 'Not a territory space' };
    if (space.owner !== null)
      return { ok: false, reason: 'Territory is occupied' };
    if (player.water < 2)
      return { ok: false, reason: 'Not enough water (need 2)' };

    const needsSwagger = player.archetype !== 'bruiser';
    if (needsSwagger && player.swagger < 1)
      return { ok: false, reason: 'Not enough swagger (need 1)' };

    return { ok: true, waterCost: 2, swaggerCost: needsSwagger ? 1 : 0 };
  }

  canChallenge(playerId, territoryId) {
    const player = this.getPlayer(playerId);
    const space  = this.board.getSpace(territoryId);

    // Home turfs are uncapturable
    if (!space)
      return { ok: false, reason: 'Space not found' };
    if (space.type === SPACE_TYPES.HOME)
      return { ok: false, reason: 'Cannot challenge a home turf' };
    if (space.type !== SPACE_TYPES.TERRITORY)
      return { ok: false, reason: 'Not a territory space' };
    if (space.owner === null)
      return { ok: false, reason: 'Territory is empty — use Claim' };
    if (space.owner === playerId)
      return { ok: false, reason: 'Cannot challenge your own territory' };
    if (player.water < 2)
      return { ok: false, reason: 'Not enough water (need 2)' };
    if (player.drive < 1)
      return { ok: false, reason: 'Not enough drive (need 1)' };

    // Alliance protection: direct allies cannot challenge each other
    if (this.board.areAllied(playerId, space.owner, this.players))
      return { ok: false, reason: 'Alliance protection — allied players cannot challenge each other' };

    // Alliance protection: home neighbourhood transitive check
    if (this.board.isHomeNeighbourhood(territoryId, space.owner, this.players)) {
      const defender = this.getPlayer(space.owner);
      for (const allyId of defender.allies) {
        if (this.board.areAllied(playerId, allyId, this.players)) {
          return { ok: false, reason: 'Alliance protection — home neighbourhood' };
        }
      }
    }

    return { ok: true, waterCost: 2, driveCost: 1 };
  }

  canFortify(playerId, territoryId) {
    const player = this.getPlayer(playerId);
    const space  = this.board.getSpace(territoryId);
    if (!space || space.type !== SPACE_TYPES.TERRITORY)
      return { ok: false, reason: 'Not a territory space' };
    if (space.owner !== playerId)
      return { ok: false, reason: 'Not your territory' };
    if (space.fortifyTokens >= this.config.maxFortify)
      return { ok: false, reason: `Max fortify (${this.config.maxFortify}) reached` };
    if (player.water < 1)
      return { ok: false, reason: 'Not enough water (need 1)' };

    const needsGrit = player.archetype !== 'yapper';
    if (needsGrit && player.grit < 1)
      return { ok: false, reason: 'Not enough grit (need 1)' };

    return { ok: true, waterCost: 1, gritCost: needsGrit ? 1 : 0 };
  }

  canAlly(playerId, dogParkSpaceId) {
    const player = this.getPlayer(playerId);
    const space  = this.board.getSpace(dogParkSpaceId);
    if (!space || space.type !== SPACE_TYPES.DOG_PARK)
      return { ok: false, reason: 'Not a dog park space' };
    if (player.water < 1)
      return { ok: false, reason: 'Not enough water (need 1)' };

    const needsBond = player.archetype !== 'diplomat';
    if (needsBond && player.bond < 1)
      return { ok: false, reason: 'Not enough bond (need 1)' };

    return { ok: true, waterCost: 1, bondCost: needsBond ? 1 : 0 };
  }

  canBreakAlliance(playerId, alliedPlayerId) {
    const player = this.getPlayer(playerId);
    if (!player.allies.includes(alliedPlayerId))
      return { ok: false, reason: 'Not allied with this player' };
    if (player.water < 1)
      return { ok: false, reason: 'Not enough water (need 1)' };
    if (player.swagger < 1)
      return { ok: false, reason: 'Not enough swagger (need 1)' };

    return { ok: true, waterCost: 1, swaggerCost: 1 };
  }

  canDrink(playerId) {
    const player = this.getPlayer(playerId);
    const space  = this.board.getSpace(player.position);
    if (!space || space.type !== SPACE_TYPES.WATER_SOURCE)
      return { ok: false, reason: 'Not at a water source' };

    const needsDrive = player.archetype !== 'scrapper';
    if (needsDrive && player.drive < 1)
      return { ok: false, reason: 'Not enough drive (need 1)' };

    return { ok: true, driveCost: needsDrive ? 1 : 0 };
  }

  canReClaim(playerId) {
    const player = this.getPlayer(playerId);
    if (player.swagger >= 1) return { ok: true, resource: 'swagger' };
    if (player.grit >= 1)    return { ok: true, resource: 'grit' };
    return { ok: false, reason: 'Need 1 swagger or 1 grit to re-claim' };
  }

  // ================================================================
  //  ACTION EXECUTION
  // ================================================================

  claim(playerId, territoryId) {
    const check = this.canClaim(playerId, territoryId);
    if (!check.ok) return { success: false, reason: check.reason };

    const player = this.getPlayer(playerId);
    const space  = this.board.getSpace(territoryId);
    player.water   -= check.waterCost;
    player.swagger -= check.swaggerCost;
    space.owner = playerId;

    this._log(playerId, `claimed ${territoryId}`);
    return { success: true };
  }

  // Pay challenge costs upfront. Resolution is separate so callers can
  // supply their own dice (simulator) or re-roll on ties (game runner).
  payChallengeCost(playerId, territoryId) {
    const check = this.canChallenge(playerId, territoryId);
    if (!check.ok) return { success: false, reason: check.reason };

    const player = this.getPlayer(playerId);
    player.water -= check.waterCost;
    player.drive -= check.driveCost;

    this._log(playerId, `paid challenge cost for ${territoryId}`);
    return { success: true, defenderId: this.board.getSpace(territoryId).owner };
  }

  // Resolve a challenge roll. Can be called repeatedly on ties.
  // attackRoll / defendRoll are raw d6 values (1-6).
  resolveChallenge(attackerId, defenderId, territoryId, attackRoll, defendRoll) {
    const attacker = this.getPlayer(attackerId);
    const defender = this.getPlayer(defenderId);
    const space    = this.board.getSpace(territoryId);

    // --- modified totals ---
    let attackTotal = attackRoll;
    let defendTotal = defendRoll;

    // Defender: fortify
    defendTotal += space.fortifyTokens;

    // Attacker: diplomat penalty
    if (attacker.archetype === 'diplomat') {
      attackTotal -= 1;
    }

    // Attacker: grit penalty (excess above threshold)
    if (attacker.grit > this.config.gritPenaltyThreshold) {
      attackTotal -= (attacker.grit - this.config.gritPenaltyThreshold);
    }

    // Yapper defender: attacker gains +1 grit regardless of outcome
    const yapperGrit = defender.archetype === 'yapper';
    if (yapperGrit) {
      attacker.grit += 1;
      this._log(attackerId, '+1 grit (challenged yapper)');
    }

    // --- determine outcome ---
    const clusterRule = this.board.isInCluster(territoryId, defenderId);

    let outcome;
    if (attackTotal > defendTotal) {
      outcome = 'attackerWins';
    } else if (attackTotal === defendTotal) {
      outcome = clusterRule ? 'defenderWins' : 'tie';
    } else {
      outcome = 'defenderWins';
    }

    const result = {
      outcome,
      attackRoll,  defendRoll,
      attackTotal, defendTotal,
      fortifyBonus: space.fortifyTokens,
      clusterRule,
      yapperGrit,
    };

    // --- apply consequences ---
    if (outcome === 'attackerWins') {
      // Defender's disk + fortify tokens go back to supply
      space.owner = null;
      space.fortifyTokens = 0;
      // Challenge disk stays — caller decides whether to re-claim
      result.canReClaim = this.canReClaim(attackerId);
      this._log(attackerId, `won challenge at ${territoryId} (${attackTotal} vs ${defendTotal})`);
    } else if (outcome === 'defenderWins') {
      // Attacker's pee destroyed, +1 grit to attacker
      attacker.grit += 1;
      this._log(attackerId, `lost challenge at ${territoryId} (+1 grit)`);
    }
    // tie → caller should re-roll

    return result;
  }

  // After winning a challenge, convert the challenge disk into a claim.
  reClaim(playerId, territoryId, useResource) {
    const player = this.getPlayer(playerId);
    const space  = this.board.getSpace(territoryId);

    if (useResource === 'swagger') {
      if (player.swagger < 1) return { success: false, reason: 'Not enough swagger' };
      player.swagger -= 1;
    } else if (useResource === 'grit') {
      if (player.grit < 1) return { success: false, reason: 'Not enough grit' };
      player.grit -= 1;
    } else {
      return { success: false, reason: 'Must specify swagger or grit' };
    }

    space.owner = playerId;

    this._log(playerId, `re-claimed ${territoryId} with ${useResource}`);
    return { success: true };
  }

  // Decline to re-claim after winning. Territory stays empty.
  declineReClaim(territoryId) {
    this._log(null, `re-claim declined at ${territoryId} — territory empty`);
    return { success: true };
  }

  fortify(playerId, territoryId) {
    const check = this.canFortify(playerId, territoryId);
    if (!check.ok) return { success: false, reason: check.reason };

    const player = this.getPlayer(playerId);
    const space  = this.board.getSpace(territoryId);
    player.water -= check.waterCost;
    player.grit  -= check.gritCost;
    space.fortifyTokens += 1;

    this._log(playerId, `fortified ${territoryId} (${space.fortifyTokens}/${this.config.maxFortify})`);
    return { success: true };
  }

  // ================================================================
  //  ALLIANCE — dog park bonding mechanic
  // ================================================================

  // Initiate an alliance at a dog park. Creates a pending alliance.
  ally(playerId, dogParkSpaceId) {
    const check = this.canAlly(playerId, dogParkSpaceId);
    if (!check.ok) return { success: false, reason: check.reason };

    const player = this.getPlayer(playerId);
    player.water -= check.waterCost;
    player.bond  -= check.bondCost;

    this.pendingAlliances.set(dogParkSpaceId, playerId);

    this._log(playerId, `initiated alliance at ${dogParkSpaceId}`);
    return { success: true };
  }

  // Compulsory bond join — triggered when a player passes through a dog park
  // with a pending alliance initiated by another player.
  compulsoryBondJoin(playerId, dogParkSpaceId) {
    const player = this.getPlayer(playerId);

    if (!this.pendingAlliances.has(dogParkSpaceId))
      return { success: false, reason: 'No pending alliance here' };

    const initiatorId = this.pendingAlliances.get(dogParkSpaceId);
    if (initiatorId === playerId)
      return { success: false, reason: 'Cannot join your own alliance' };
    if (player.allies.includes(initiatorId))
      return { success: false, reason: 'Already allied with initiator' };
    if (player.water < 1)
      return { success: false, reason: 'Not enough water' };

    const initiator = this.getPlayer(initiatorId);

    player.water -= 1;

    // Form alliance — add to each other's allies arrays
    if (!player.allies.includes(initiatorId))    player.allies.push(initiatorId);
    if (!initiator.allies.includes(playerId))    initiator.allies.push(playerId);

    // Clear pending
    this.pendingAlliances.delete(dogParkSpaceId);

    this._log(playerId, `joined alliance with ${initiatorId} at ${dogParkSpaceId}`);

    // Friendship sacrifice: clear claims in each other's home neighbourhood
    const cleared = [];

    // Claims by initiator in joiner's home neighbourhood
    const joinerHood = this.board.getHomeNeighbourhood(playerId, this.players);
    for (const t of joinerHood) {
      if (t.owner === initiatorId) {
        t.owner = null;
        t.fortifyTokens = 0;
        cleared.push(t.id);
        this._log(initiatorId, `claim cleared at ${t.id} (friendship sacrifice)`);
      }
    }

    // Claims by joiner in initiator's home neighbourhood
    const initiatorHood = this.board.getHomeNeighbourhood(initiatorId, this.players);
    for (const t of initiatorHood) {
      if (t.owner === playerId) {
        t.owner = null;
        t.fortifyTokens = 0;
        cleared.push(t.id);
        this._log(playerId, `claim cleared at ${t.id} (friendship sacrifice)`);
      }
    }

    return { success: true, cleared };
  }

  // Break an alliance. Removes both players from each other's allies.
  breakAlliance(playerId, alliedPlayerId) {
    const check = this.canBreakAlliance(playerId, alliedPlayerId);
    if (!check.ok) return { success: false, reason: check.reason };

    const player = this.getPlayer(playerId);
    const ally   = this.getPlayer(alliedPlayerId);

    player.water   -= check.waterCost;
    player.swagger -= check.swaggerCost;

    player.allies = player.allies.filter(id => id !== alliedPlayerId);
    ally.allies   = ally.allies.filter(id => id !== playerId);

    this._log(playerId, `broke alliance with ${alliedPlayerId}`);
    return { success: true };
  }

  // ================================================================
  //  PATH SHORTCUT
  // ================================================================

  // Take a shortcut via a PATH space. Costs 1 drive total for the whole path.
  takeShortcut(playerId, pathEntryId) {
    const player = this.getPlayer(playerId);
    const space  = this.board.getSpace(pathEntryId);

    if (!space || space.type !== SPACE_TYPES.PATH)
      return { success: false, reason: 'Not a path space' };
    if (player.position !== pathEntryId)
      return { success: false, reason: 'Not at path entry' };
    if (!space.pathExit)
      return { success: false, reason: 'Path has no exit' };
    if (player.drive < 1)
      return { success: false, reason: 'Not enough drive (need 1)' };

    player.drive -= 1;
    player.position = space.pathExit;

    this._log(playerId, `took shortcut ${pathEntryId} → ${space.pathExit}`);
    return { success: true, exitSpaceId: space.pathExit };
  }

  // ================================================================
  //  DRINK
  // ================================================================

  // Drink at a water source. waterGain comes from the Water Chance card
  // (drawn and resolved externally by the caller).
  drink(playerId, waterGain) {
    const check = this.canDrink(playerId);
    if (!check.ok) return { success: false, reason: check.reason };

    const player = this.getPlayer(playerId);
    const arch   = this.getArchetype(player);
    player.drive -= check.driveCost;
    player.water = Math.min(player.water + waterGain, arch.water);

    this._log(playerId, `drank: +${waterGain} water (now ${player.water}/${arch.water})`);
    return { success: true };
  }

  // ================================================================
  //  MOVEMENT
  // ================================================================

  // Returns the drive cost to step between two adjacent spaces.
  // null if not connected.
  getStepCost(fromId, toId) {
    return this.board.getMovementCost(fromId, toId);
  }

  // Determine what happens when a player passes through a space.
  getPassThroughEffects(spaceId, playerId) {
    const space = this.board.getSpace(spaceId);
    if (!space) return [];

    const effects = [];
    switch (space.type) {
      case SPACE_TYPES.WATER_SOURCE:
        effects.push({ type: 'waterSource', optional: true });
        break;
      case SPACE_TYPES.CHANCE_SPOT:
        effects.push({ type: 'chanceCard' });
        break;
      case SPACE_TYPES.DOG_PARK:
        // If pending alliance by another player → compulsory join
        if (this.pendingAlliances.has(spaceId)) {
          const initId = this.pendingAlliances.get(spaceId);
          const player = this.getPlayer(playerId);
          if (initId !== playerId && player && !player.allies.includes(initId)) {
            effects.push({ type: 'compulsoryBond', dogParkSpaceId: spaceId });
            break;
          }
        }
        // Otherwise → gain 1 bond
        effects.push({ type: 'dogPark' });
        break;
      case SPACE_TYPES.EVENTS:
        effects.push({ type: 'eventsCard' });
        break;
      case SPACE_TYPES.HOME: {
        const player = this.getPlayer(playerId);
        if (player && space.playerColour === player.colour) {
          effects.push({ type: 'homeResupply' });
        }
        break;
      }
      case SPACE_TYPES.PATH:
        if (space.pathExit) {
          effects.push({ type: 'pathEntry', exitSpaceId: space.pathExit });
        }
        break;
    }
    return effects;
  }

  // Move a player along a path. Returns the list of pass-through effects
  // triggered along the way. Does NOT auto-apply effects — caller decides
  // timing (e.g. home resupply happens in phase 4, not during movement).
  //
  // path: array of space ids starting at current position.
  movePlayer(playerId, path) {
    const player = this.getPlayer(playerId);

    if (path.length === 0)
      return { success: true, driveCost: 0, effects: [] };
    if (path[0] !== player.position)
      return { success: false, reason: 'Path must start at current position' };

    // Total drive cost
    let totalDrive = 0;
    for (let i = 1; i < path.length; i++) {
      const cost = this.board.getMovementCost(path[i - 1], path[i]);
      if (cost === null)
        return { success: false, reason: `No connection: ${path[i-1]} → ${path[i]}` };
      totalDrive += cost;
    }
    if (player.drive < totalDrive)
      return { success: false, reason: `Not enough drive (need ${totalDrive}, have ${player.drive})` };

    // Collect pass-through effects (skip starting space)
    const effects = [];
    for (let i = 1; i < path.length; i++) {
      for (const eff of this.getPassThroughEffects(path[i], playerId)) {
        effects.push({ ...eff, spaceId: path[i] });
      }
    }

    // Commit
    player.drive -= totalDrive;
    player.position = path[path.length - 1];

    this._log(playerId, `moved to ${player.position} (${totalDrive} drive spent)`);
    return { success: true, driveCost: totalDrive, effects };
  }

  // ================================================================
  //  PASS-THROUGH EFFECT HELPERS
  // ================================================================

  applyDogPark(playerId) {
    const player = this.getPlayer(playerId);
    player.bond += 1;
    this._log(playerId, '+1 bond (dog park)');
  }

  applyHomeResupply(playerId) {
    const player = this.getPlayer(playerId);
    const arch   = this.getArchetype(player);
    // Water: always refill to full
    player.water = arch.water;
    // Modifiers: bring up to max, but keep excess from board pickups
    player.swagger = Math.max(player.swagger, arch.swagger);
    player.drive   = Math.max(player.drive,   arch.drive);
    player.grit    = Math.max(player.grit,    arch.grit);
    player.bond    = Math.max(player.bond,    arch.bond);
    this._log(playerId, 'home resupply');
  }

  // ================================================================
  //  WIN CONDITIONS
  // ================================================================

  checkWinConditions() {
    // 1. Territory threshold
    for (const player of this.players) {
      const count = this.board.getTerritoriesOwnedBy(player.id).length;
      if (count >= this.config.territoryWinThreshold) {
        this.gameOver = true;
        this.winner = player.id;
        this._log(player.id, `wins — ${count} territories!`);
        return { gameOver: true, winner: player.id, reason: 'territory threshold' };
      }
    }

    // 2. Last player standing (only meaningful after first round)
    if (this.turnNumber > 0) {
      const withTerritory = this.players.filter(
        p => this.board.getTerritoriesOwnedBy(p.id).length > 0
      );
      if (withTerritory.length === 1) {
        this.gameOver = true;
        this.winner = withTerritory[0].id;
        this._log(withTerritory[0].id, 'wins — last player with territory!');
        return { gameOver: true, winner: withTerritory[0].id, reason: 'last standing' };
      }
    }

    // 3. Turn limit
    if (this.turnNumber >= this.config.maxTurns) {
      const ranked = [...this.players].sort((a, b) => {
        const aT = this.board.getTerritoriesOwnedBy(a.id);
        const bT = this.board.getTerritoriesOwnedBy(b.id);
        if (bT.length !== aT.length) return bT.length - aT.length;
        const aF = aT.reduce((s, t) => s + t.fortifyTokens, 0);
        const bF = bT.reduce((s, t) => s + t.fortifyTokens, 0);
        if (bF !== aF) return bF - aF;
        return b.swagger - a.swagger;
      });
      this.gameOver = true;
      this.winner = ranked[0].id;
      this._log(ranked[0].id, 'wins at turn limit!');
      return {
        gameOver: true,
        winner: ranked[0].id,
        reason: 'turn limit',
        rankings: ranked.map(p => p.id),
      };
    }

    return { gameOver: false };
  }

  // ================================================================
  //  MAINTENANCE (phase 5 of turn)
  // ================================================================

  // Housebound check: 0 non-home territories for N turns → walk halved.
  checkHousebound(playerId) {
    const player = this.getPlayer(playerId);
    const count  = this.board.getTerritoriesOwnedBy(playerId).length;

    if (count === 0) {
      player.zeroTerritoryTurns += 1;
      if (player.zeroTerritoryTurns >= this.config.houseboundTurns) {
        player.housebound = true;
        this._log(playerId, 'is housebound');
      }
    } else {
      player.zeroTerritoryTurns = 0;
      player.housebound = false;
    }
  }

  // ================================================================
  //  TURN MANAGEMENT
  // ================================================================

  startRound() {
    this.turnNumber += 1;
    this.sortTurnOrder();
    this.currentPlayerIndex = 0;
    this._log(null, `=== Round ${this.turnNumber} ===`);
  }

  // Advance to next player. Returns false when the round is over.
  advancePlayer() {
    this.currentPlayerIndex += 1;
    return this.currentPlayerIndex < this.players.length;
  }

  // ================================================================
  //  STATE INSPECTION
  // ================================================================

  getState() {
    return {
      turnNumber:         this.turnNumber,
      currentPlayerIndex: this.currentPlayerIndex,
      gameOver:           this.gameOver,
      winner:             this.winner,
      players:            this.players.map(p => ({ ...p, allies: [...p.allies] })),
      board:              this.board.toJSON(),
      pendingAlliances:   Object.fromEntries(this.pendingAlliances),
      log:                [...this.log],
    };
  }

  // ================================================================
  //  DICE HELPERS
  // ================================================================

  // Accepts an optional rng(min, max) function for deterministic testing.
  static rollD6(rng) {
    if (rng) return rng(1, 6);
    return Math.floor(Math.random() * 6) + 1;
  }

  static roll2D6(rng) {
    return Game.rollD6(rng) + Game.rollD6(rng);
  }

  // Movement roll, respecting housebound (walk halved, rounded down).
  rollMovement(playerId, rng) {
    const player = this.getPlayer(playerId);
    let roll = Game.roll2D6(rng);
    if (player.housebound) roll = Math.floor(roll / 2);
    return roll;
  }

  // ================================================================
  //  LOGGING
  // ================================================================

  _log(playerId, message) {
    this.log.push({
      turn:    this.turnNumber,
      player:  playerId,
      message,
    });
  }
}
