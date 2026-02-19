// Quick smoke test — run with: node tools/engine/test.js
import { ARCHETYPES, ACTION_COSTS } from './archetypes.js';
import { Board, SPACE_TYPES } from './board.js';
import { Game, createPlayer, DEFAULTS } from './game.js';

let passed = 0;
let failed = 0;
function assert(cond, label) {
  if (cond) { passed++; }
  else { failed++; console.error(`  FAIL: ${label}`); }
}

// --- Archetypes ---
console.log('Archetypes');
assert(Object.keys(ARCHETYPES).length === 4, '4 archetypes defined');
for (const [key, a] of Object.entries(ARCHETYPES)) {
  const total = a.swagger + a.drive + a.grit + a.bond;
  assert(total === 8, `${key} modifier total is 8 (got ${total})`);
}
assert(ARCHETYPES.bruiser.water === 6, 'bruiser water 6');
assert(ARCHETYPES.scrapper.water === 3, 'scrapper water 3');
assert(ARCHETYPES.diplomat.bond === 3, 'diplomat bond 3');
assert(ARCHETYPES.yapper.grit === 3, 'yapper grit 3');

// --- Board ---
console.log('Board');
const boardDef = {
  spaces: [
    { id: 'sw1', type: 'sidewalk', side: 'north' },
    { id: 'sw2', type: 'sidewalk', side: 'north' },
    { id: 'sw3', type: 'sidewalk', side: 'north' },
    { id: 'sw4', type: 'sidewalk', side: 'south' },
    { id: 't1',  type: 'territory', side: 'north' },
    { id: 't2',  type: 'territory', side: 'north' },
    { id: 't3',  type: 'territory', side: 'north' },
    { id: 't4',  type: 'territory', side: 'south' },
    { id: 'b1',  type: 'bond', influence: ['t1', 't2'] },
    { id: 'h1',  type: 'home', homeOwner: 'p1', side: 'north' },
    { id: 'h2',  type: 'home', homeOwner: 'p2', side: 'south' },
    { id: 'ws1', type: 'waterSource', side: 'north' },
    { id: 'cs1', type: 'chanceSpot', side: 'south' },
    { id: 'dp1', type: 'dogPark', side: 'south' },
    { id: 'int1', type: 'intersection' },
  ],
  edges: [
    { from: 'sw1', to: 'sw2' },
    { from: 'sw2', to: 'sw3' },
    { from: 'sw1', to: 't1' },
    { from: 'sw2', to: 't2' },
    { from: 'sw3', to: 't3' },
    { from: 'sw1', to: 'b1' },
    { from: 'sw1', to: 'h1' },
    { from: 'sw2', to: 'ws1' },
    { from: 'sw4', to: 'h2' },
    { from: 'sw4', to: 't4' },
    { from: 'sw4', to: 'cs1' },
    { from: 'sw4', to: 'dp1' },
    { from: 'int1', to: 'sw3', driveCost: 0 },
    { from: 'int1', to: 'sw4', driveCost: 0 },
    // connect t1-t2-t3 for cluster testing
    { from: 't1', to: 't2' },
    { from: 't2', to: 't3' },
  ],
};

const board = Board.fromJSON(boardDef);
assert(board.getSpace('t1').type === 'territory', 'space type preserved');
assert(board.getNeighbors('sw1').length === 4, 'sw1 has 4 neighbors');
assert(board.getMovementCost('sw1', 'sw2') === 0, 'sidewalk-to-sidewalk free');
assert(board.getMovementCost('int1', 'sw4') === 0, 'intersection crossing free');
assert(board.getMovementCost('sw1', 'sw4') === null, 'no direct connection across road');
assert(board.getSpacesByType('territory').length === 4, '4 territory spaces');

// Cluster rule
board.getSpace('t1').owner = 'p1';
board.getSpace('t2').owner = 'p1';
board.getSpace('t3').owner = 'p1';
assert(board.isInCluster('t1', 'p1'), 't1 in cluster of 3');
assert(board.isInCluster('t2', 'p1'), 't2 in cluster of 3');
board.getSpace('t3').owner = null;
assert(!board.isInCluster('t1', 'p1'), 't1 not in cluster with only 2');
board.getSpace('t3').owner = 'p1'; // restore

// Bond query
board.getSpace('b1').bondMarkers = ['p1', 'p2'];
assert(board.areBondedAt('p1', 'p2', 't1'), 'p1-p2 bonded at t1');
assert(!board.areBondedAt('p1', 'p2', 't4'), 'p1-p2 not bonded at t4');

// Clean up for game tests
board.resetState();
assert(board.getSpace('t1').owner === null, 'resetState clears ownership');

// --- Game ---
console.log('Game');
const p1 = createPlayer('p1', 'bruiser', 'h1');
const p2 = createPlayer('p2', 'yapper',  'h2');
assert(p1.water === 6, 'bruiser starts with 6 water');
assert(p2.grit === 3, 'yapper starts with 3 grit');

const game = new Game(board, [p1, p2]);

// Claim — bruiser (no swagger cost)
let r = game.claim('p1', 't1');
assert(r.success, 'bruiser claims t1');
assert(p1.water === 4, 'bruiser spent 2 water');
assert(p1.swagger === 3, 'bruiser swagger unchanged (discount)');
assert(board.getSpace('t1').owner === 'p1', 't1 owned by p1');

// Claim — yapper (needs swagger)
r = game.claim('p2', 't4');
assert(r.success, 'yapper claims t4');
assert(p2.swagger === 0, 'yapper spent 1 swagger');
assert(p2.water === 2, 'yapper spent 2 water');

// Claim on occupied → fail
r = game.claim('p2', 't1');
assert(!r.success, 'cannot claim occupied territory');

// Fortify — yapper (no grit cost)
r = game.fortify('p2', 't4');
assert(r.success, 'yapper fortifies t4');
assert(p2.grit === 3, 'yapper grit unchanged (discount)');
assert(board.getSpace('t4').fortifyTokens === 1, 't4 has 1 fortify');

// Fortify — bruiser (needs grit)
game.claim('p1', 't2');
r = game.fortify('p1', 't1');
assert(r.success, 'bruiser fortifies t1');
assert(p1.grit === 1, 'bruiser spent 1 grit');

// Challenge validation
r = game.canChallenge('p2', 't1');
assert(!r.ok, 'yapper cannot challenge — not enough drive after claim');

// Give p2 resources for challenge
p2.water = 4; p2.drive = 2;
r = game.payChallengeCost('p2', 't1');
assert(r.success, 'yapper pays challenge cost');
assert(p2.water === 2, 'challenge cost 2 water');
assert(p2.drive === 1, 'challenge cost 1 drive');

// Resolve — attacker wins (high roll vs low roll)
r = game.resolveChallenge('p2', 'p1', 't1', 6, 1);
// defender has 1 fortify → defend total = 1+1 = 2, attack total = 6
// yapper defender? no, p1 is bruiser. So no yapper grit.
assert(r.outcome === 'attackerWins', 'attacker wins with 6 vs 2');
assert(board.getSpace('t1').owner === null, 't1 cleared after challenge win');
assert(r.fortifyBonus === 1, 'fortify bonus reported');

// Re-claim with grit
p2.grit = 3; // yapper has grit
r = game.reClaim('p2', 't1', 'grit');
assert(r.success, 're-claim with grit');
assert(board.getSpace('t1').owner === 'p2', 't1 now owned by p2');
assert(p2.grit === 2, 'spent 1 grit on re-claim');

// Challenge — yapper as DEFENDER (attacker gets +1 grit)
p1.water = 6; p1.drive = 2; p1.grit = 0;
game.payChallengeCost('p1', 't1');
r = game.resolveChallenge('p1', 'p2', 't1', 6, 1);
assert(r.yapperGrit, 'yapper defender flag set');
assert(p1.grit === 1, 'attacker got +1 grit from yapper');

// Challenge — diplomat penalty
const p3 = createPlayer('p3', 'diplomat', 'h1');
game.players.push(p3);
game.reClaim('p1', 't1', 'swagger'); // give p1 back t1
p3.water = 4; p3.drive = 2;
game.payChallengeCost('p3', 't1');
r = game.resolveChallenge('p3', 'p1', 't1', 4, 4);
// diplomat attack: 4 - 1 = 3, defender: 4. Defender wins.
assert(r.outcome === 'defenderWins', 'diplomat penalty makes 4v4 a loss');
assert(r.attackTotal === 3, 'diplomat attack total reduced by 1');

// Grit penalty
p1.grit = 7;
p1.water = 4; p1.drive = 2;
board.getSpace('t4').owner = 'p2';
game.payChallengeCost('p1', 't4');
r = game.resolveChallenge('p1', 'p2', 't4', 6, 1);
// grit penalty: 7-5 = 2 subtracted. attack: 6-2=4. defend: 1. Still wins.
assert(r.attackTotal === 4, 'grit penalty applied (6 - 2 = 4)');
assert(r.outcome === 'attackerWins', 'still wins despite grit penalty');

// Cluster rule — tie goes to defender
board.resetState();
board.getSpace('t1').owner = 'p2';
board.getSpace('t2').owner = 'p2';
board.getSpace('t3').owner = 'p2';
p1.water = 4; p1.drive = 2; p1.grit = 0;
game.payChallengeCost('p1', 't2');
r = game.resolveChallenge('p1', 'p2', 't2', 3, 3);
assert(r.clusterRule, 'cluster rule active');
assert(r.outcome === 'defenderWins', 'tie goes to defender with cluster');

// Tie without cluster → re-roll
board.getSpace('t3').owner = null; // break cluster
p1.water = 4; p1.drive = 2;
game.payChallengeCost('p1', 't1');
r = game.resolveChallenge('p1', 'p2', 't1', 3, 3);
assert(r.outcome === 'tie', 'tie without cluster → re-roll');

// Ally — diplomat (no bond cost)
board.getSpace('b1').bondMarkers = [];
r = game.ally('p3', 'b1');
assert(r.success, 'diplomat allies at b1');
assert(p3.bond === 3, 'diplomat bond unchanged (discount)');

// Compulsory bond join
p1.water = 6; p1.bond = 1;
r = game.compulsoryBondJoin('p1', 'b1');
assert(r.success, 'compulsory bond join');
assert(p1.water === 5, 'compulsory bond costs 1 water');
assert(board.getSpace('b1').bondMarkers.includes('p1'), 'p1 marker on bond');

// Alliance protection
board.getSpace('t1').owner = 'p3';
r = game.canChallenge('p1', 't1');
assert(!r.ok, 'alliance protection blocks challenge');

// Break alliance
p1.swagger = 3;
r = game.breakAlliance('p1', 'b1');
assert(r.success, 'alliance broken');
assert(board.getSpace('b1').bondMarkers.length === 0, 'bond markers cleared');

// Territory income
board.resetState();
board.getSpace('t1').owner = 'p1';
board.getSpace('t2').owner = 'p1';
board.getSpace('t3').owner = 'p1';
p1.swagger = 0;
game.applyTerritoryIncome('p1');
assert(p1.swagger === 1, '3 connected territories → +1 swagger (per 2)');

board.getSpace('t4').owner = 'p1';
p1.swagger = 0;
game.applyTerritoryIncome('p1');
// t1-t2-t3 connected (3 → floor(3/2)=1), t4 separate (1 → floor(1/2)=0) → total 1
assert(p1.swagger === 1, '3+1 territories → +1 swagger');

// Home resupply
p1.water = 1; p1.swagger = 0; p1.drive = 0; p1.grit = 0; p1.bond = 0;
game.applyHomeResupply('p1');
assert(p1.water === 6, 'water refilled to full');
assert(p1.swagger === 3, 'swagger refilled to max');
assert(p1.drive === 2, 'drive refilled to max');

// Home resupply preserves excess
p1.swagger = 5;
game.applyHomeResupply('p1');
assert(p1.swagger === 5, 'swagger above max preserved');

// Movement
board.resetState();
p1.position = 'sw1';
p1.drive = 5;
r = game.movePlayer('p1', ['sw1', 'sw2', 'sw3']);
assert(r.success, 'move along sidewalk');
assert(r.driveCost === 0, 'sidewalk movement free');
assert(p1.position === 'sw3', 'position updated');

// Movement with drive cost (intersection crossing)
r = game.movePlayer('p1', ['sw3', 'int1', 'sw4']);
assert(r.success, 'cross via intersection');
assert(r.driveCost === 0, 'intersection crossing free');

// Pass-through effects
board.getSpace('b1').bondMarkers = ['p2'];
p1.position = 'sw2';
r = game.movePlayer('p1', ['sw2', 'sw1', 'b1']);
const bondEffect = r.effects.find(e => e.type === 'compulsoryBond');
assert(bondEffect, 'compulsory bond effect triggered');

// Dog park pass-through
p1.position = 'sw4';
p1.drive = 5;
r = game.movePlayer('p1', ['sw4', 'dp1']);
const parkEffect = r.effects.find(e => e.type === 'dogPark');
assert(parkEffect, 'dog park effect triggered');

// Movement roll — housebound
p1.housebound = false;
let roll = game.rollMovement('p1', () => 3);
assert(roll === 6, 'normal roll: 3+3=6');
p1.housebound = true;
roll = game.rollMovement('p1', () => 3);
assert(roll === 3, 'housebound roll: floor(6/2)=3');
p1.housebound = false;

// Win condition — territory threshold
board.resetState();
for (let i = 0; i < 4; i++) board.getSpace(`t${i+1}`).owner = 'p1';
// Only 4 territories on this test board, so can't hit 10. Check no false win.
r = game.checkWinConditions();
assert(!r.gameOver, 'no win with 4 territories');

// Win condition — turn limit
game.turnNumber = 30;
board.getSpace('t1').owner = 'p1';
board.getSpace('t2').owner = 'p1';
board.getSpace('t3').owner = 'p2';
board.getSpace('t4').owner = null;
r = game.checkWinConditions();
assert(r.gameOver && r.winner === 'p1', 'p1 wins at turn limit (2 vs 1)');

// Home reversion
board.resetState();
const homeSpace = board.getSpace('h2');
homeSpace.owner = 'p1';
homeSpace.revertOwner = 'p2';
homeSpace.revertIn = 1;
game.processHomeReversions();
assert(homeSpace.owner === 'p2', 'home reverts to original owner');
assert(homeSpace.revertIn === 0, 'revert counter cleared');

// Serialization round-trip
const snapshot = board.toJSON();
const board2 = Board.fromJSON(snapshot);
assert(board2.getSpace('t1') !== null, 'round-trip preserves spaces');
assert(board2.getNeighbors('sw1').length > 0, 'round-trip preserves edges');

// --- Summary ---
console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
