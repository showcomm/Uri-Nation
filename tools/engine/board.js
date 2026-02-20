// Uri-Nation — Board Graph Model (v1.3.0)
// The board is a graph of spaces connected by edges. Each edge can carry a drive cost.
// Loaded from a JSON definition produced by the board builder.
// Mutable state (ownership, fortify) lives on the spaces and is mutated by game.js.

export const SPACE_TYPES = {
  SIDEWALK:     'sidewalk',
  TERRITORY:    'territory',
  HOME:         'home',
  WATER_SOURCE: 'waterSource',
  CHANCE_SPOT:  'chanceSpot',
  DOG_PARK:     'dogPark',
  EVENTS:       'events',
  INTERSECTION: 'intersection',
  PATH:         'path',
};

// Default mutable state for a space — merged on top of the definition.
function defaultSpaceState() {
  return {
    owner: null,          // player id who owns this territory
    fortifyTokens: 0,     // 0–3, only meaningful on territory spaces
  };
}

export class Board {
  constructor() {
    // id → space object (definition + mutable state)
    this.spaces = new Map();
    // id → [ { target: id, driveCost: number } ]
    this.edges = new Map();
  }

  // --- Construction ---

  static fromJSON(json) {
    const board = new Board();
    for (const space of json.spaces) {
      board.addSpace(space);
    }
    for (const edge of json.edges) {
      board.addEdge(edge.from, edge.to, edge.driveCost || 0);
    }
    return board;
  }

  addSpace(def) {
    this.spaces.set(def.id, {
      // Definition fields (immutable after load)
      id:           def.id,
      type:         def.type,
      label:        def.label        || def.id,
      facing:       def.facing       || null,   // N/S/E/W — territories and homes only
      playerColour: def.playerColour || null,   // homes only
      pathExit:     def.pathExit     || null,   // PATH entry spaces only — id of paired exit
      // Mutable game state
      ...defaultSpaceState(),
    });
  }

  addEdge(fromId, toId, driveCost = 0) {
    if (!this.edges.has(fromId)) this.edges.set(fromId, []);
    if (!this.edges.has(toId))   this.edges.set(toId, []);
    // Bidirectional
    this.edges.get(fromId).push({ target: toId, driveCost });
    this.edges.get(toId).push({ target: fromId, driveCost });
  }

  // --- Queries ---

  getSpace(id) {
    return this.spaces.get(id) || null;
  }

  getNeighbors(id) {
    return (this.edges.get(id) || []).map(e => ({
      space: this.spaces.get(e.target),
      driveCost: e.driveCost,
    }));
  }

  getEdges(id) {
    return this.edges.get(id) || [];
  }

  getSpacesByType(type) {
    const out = [];
    for (const s of this.spaces.values()) {
      if (s.type === type) out.push(s);
    }
    return out;
  }

  getTerritoriesOwnedBy(playerId) {
    const out = [];
    for (const s of this.spaces.values()) {
      if (s.type === SPACE_TYPES.TERRITORY && s.owner === playerId) out.push(s);
    }
    return out;
  }

  getAllSpaces() {
    return [...this.spaces.values()];
  }

  // --- Home space queries ---

  // Returns the HOME space whose playerColour matches the player's colour.
  // Requires the players array to look up the player's colour.
  getHomeSpace(playerId, players) {
    const player = players.find(p => p.id === playerId);
    if (!player) return null;
    for (const s of this.spaces.values()) {
      if (s.type === SPACE_TYPES.HOME && s.playerColour === player.colour) return s;
    }
    return null;
  }

  // Returns the two TERRITORY spaces adjacent to the player's HOME space.
  getHomeNeighbourhood(playerId, players) {
    const home = this.getHomeSpace(playerId, players);
    if (!home) return [];
    return this.getNeighbors(home.id)
      .filter(n => n.space.type === SPACE_TYPES.TERRITORY)
      .map(n => n.space);
  }

  // Returns true if the territory is in the player's home neighbourhood.
  isHomeNeighbourhood(territoryId, playerId, players) {
    return this.getHomeNeighbourhood(playerId, players).some(s => s.id === territoryId);
  }

  // --- Alliance query ---

  // Checks the game's alliance state. Alliances live on players (allies arrays),
  // not on board spaces. The players array is passed in.
  areAllied(playerIdA, playerIdB, players) {
    const a = players.find(p => p.id === playerIdA);
    return a ? a.allies.includes(playerIdB) : false;
  }

  // --- Connected territory groups (for income + cluster rule) ---

  // Returns array of arrays. Each inner array is a connected component of
  // territory ids owned by playerId.
  getConnectedTerritoryGroups(playerId) {
    const owned = new Set();
    for (const s of this.spaces.values()) {
      if (s.type === SPACE_TYPES.TERRITORY && s.owner === playerId) owned.add(s.id);
    }
    const visited = new Set();
    const groups = [];
    for (const id of owned) {
      if (visited.has(id)) continue;
      const group = [];
      const stack = [id];
      while (stack.length > 0) {
        const cur = stack.pop();
        if (visited.has(cur)) continue;
        visited.add(cur);
        group.push(cur);
        for (const edge of (this.edges.get(cur) || [])) {
          if (owned.has(edge.target) && !visited.has(edge.target)) {
            stack.push(edge.target);
          }
        }
      }
      groups.push(group);
    }
    return groups;
  }

  // Binary check: is this territory in a cluster of 3+ connected territories?
  isInCluster(territoryId, playerId) {
    const groups = this.getConnectedTerritoryGroups(playerId);
    for (const group of groups) {
      if (group.includes(territoryId) && group.length >= 3) return true;
    }
    return false;
  }

  // --- Movement cost ---

  // Drive cost to step from one space to an adjacent space. null if not connected.
  getMovementCost(fromId, toId) {
    const edges = this.edges.get(fromId);
    if (!edges) return null;
    const edge = edges.find(e => e.target === toId);
    return edge ? edge.driveCost : null;
  }

  // --- State management ---

  // Wipe all mutable state (ownership, fortify) for a new game.
  resetState() {
    for (const s of this.spaces.values()) {
      Object.assign(s, defaultSpaceState());
    }
  }

  // Full snapshot for debugging / serialization.
  toJSON() {
    const spaces = [];
    for (const s of this.spaces.values()) spaces.push({ ...s });
    // Deduplicate bidirectional edges.
    const edges = [];
    const seen = new Set();
    for (const [fromId, conns] of this.edges) {
      for (const c of conns) {
        const key = [fromId, c.target].sort().join('|');
        if (seen.has(key)) continue;
        seen.add(key);
        edges.push({ from: fromId, to: c.target, driveCost: c.driveCost });
      }
    }
    return { spaces, edges };
  }
}
