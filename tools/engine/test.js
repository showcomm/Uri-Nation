// Uri-Nation engine tests (v1.3.0) — run with: node tools/engine/test.js
import { ARCHETYPES, ACTION_COSTS } from './archetypes.js';
import { Board, SPACE_TYPES } from './board.js';
import { Game, createPlayer, DEFAULTS } from './game.js';

let passed = 0;
let failed = 0;
function assert(cond, label) {
  if (cond) { passed++; }
  else { failed++; console.error(`  FAIL: ${label}`); }
}

// ══════════════════════════════════════════════════════════════════
//  ARCHETYPES
// ══════════════════════════════════════════════════════════════════
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

// ══════════════════════════════════════════════════════════════════
//  BOARD
// ══════════════════════════════════════════════════════════════════
console.log('Board');

// Test board layout:
//   h1(blue) ─ sw1 ─ t1, t2
//               │
//              sw2 ─ ws1, pe1(path entry)
//               │
//              sw3 ─ int1 ─ sw4 ─ t3, t4, dp1, h2(orange), pe2(path exit)
//
// Home neighbourhoods:  p1(blue): t1,t2    p2(orange): t3,t4
// Territory chain: t1─t2─t3─t4  (for cluster testing)

const boardDef = {
  spaces: [
    { id: 'sw1', type: 'sidewalk' },
    { id: 'sw2', type: 'sidewalk' },
    { id: 'sw3', type: 'sidewalk' },
    { id: 'sw4', type: 'sidewalk' },
    { id: 't1',  type: 'territory', facing: 'N' },
    { id: 't2',  type: 'territory', facing: 'N' },
    { id: 't3',  type: 'territory', facing: 'S' },
    { id: 't4',  type: 'territory', facing: 'S' },
    { id: 'h1',  type: 'home', playerColour: 'blue' },
    { id: 'h2',  type: 'home', playerColour: 'orange' },
    { id: 'ws1', type: 'waterSource' },
    { id: 'dp1', type: 'dogPark' },
    { id: 'int1', type: 'intersection' },
    { id: 'pe1', type: 'path', pathExit: 'pe2' },
    { id: 'pe2', type: 'path', pathExit: 'pe1' },
  ],
  edges: [
    // Sidewalk chain
    { from: 'sw1', to: 'sw2' },
    { from: 'sw2', to: 'sw3' },
    { from: 'sw3', to: 'int1' },
    { from: 'int1', to: 'sw4' },
    // Territories ↔ sidewalks
    { from: 'sw1', to: 't1' },
    { from: 'sw1', to: 't2' },
    { from: 'sw4', to: 't3' },
    { from: 'sw4', to: 't4' },
    // Territory chain (cluster testing)
    { from: 't1', to: 't2' },
    { from: 't2', to: 't3' },
    { from: 't3', to: 't4' },
    // Homes ↔ sidewalks + adjacent territories
    { from: 'h1', to: 'sw1' },
    { from: 'h1', to: 't1' },
    { from: 'h1', to: 't2' },
    { from: 'h2', to: 'sw4' },
    { from: 'h2', to: 't3' },
    { from: 'h2', to: 't4' },
    // Special spaces
    { from: 'dp1', to: 'sw4' },
    { from: 'ws1', to: 'sw2' },
    // Paths
    { from: 'pe1', to: 'sw2' },
    { from: 'pe2', to: 'sw4' },
    { from: 'pe1', to: 'pe2', driveCost: 1 },
  ],
};

const board = Board.fromJSON(boardDef);

// Space types
assert(board.getSpace('t1').type === 'territory', 'space type preserved');
assert(board.getSpace('pe1').type === 'path', 'path space type');
assert(board.getSpace('pe1').pathExit === 'pe2', 'pathExit preserved');
assert(board.getSpace('h1').playerColour === 'blue', 'playerColour preserved');

// Neighbors
assert(board.getNeighbors('sw1').length === 4, 'sw1 has 4 neighbors (sw2, t1, t2, h1)');

// Movement cost
assert(board.getMovementCost('sw1', 'sw2') === 0, 'sidewalk-to-sidewalk free');
assert(board.getMovementCost('int1', 'sw4') === 0, 'intersection crossing free');
assert(board.getMovementCost('sw1', 'sw4') === null, 'no direct connection across road');
assert(board.getMovementCost('pe1', 'pe2') === 1, 'path edge costs 1 drive');

// getSpacesByType
assert(board.getSpacesByType('territory').length === 4, '4 territory spaces');
assert(board.getSpacesByType('path').length === 2, '2 path spaces');

// Cluster rule
board.getSpace('t1').owner = 'p1';
board.getSpace('t2').owner = 'p1';
board.getSpace('t3').owner = 'p1';
assert(board.isInCluster('t1', 'p1'), 't1 in cluster of 3');
assert(board.isInCluster('t2', 'p1'), 't2 in cluster of 3');
board.getSpace('t3').owner = null;
assert(!board.isInCluster('t1', 'p1'), 't1 not in cluster with only 2');
board.resetState();

// ══════════════════════════════════════════════════════════════════
//  HOME SPACE QUERIES
// ══════════════════════════════════════════════════════════════════
console.log('Home space queries');

const players_for_board = [
  { id: 'p1', colour: 'blue', allies: [] },
  { id: 'p2', colour: 'orange', allies: [] },
];

const h1 = board.getHomeSpace('p1', players_for_board);
assert(h1 !== null && h1.id === 'h1', 'getHomeSpace finds h1 for blue player');

const h2 = board.getHomeSpace('p2', players_for_board);
assert(h2 !== null && h2.id === 'h2', 'getHomeSpace finds h2 for orange player');

const hood1 = board.getHomeNeighbourhood('p1', players_for_board);
assert(hood1.length === 2, 'p1 home neighbourhood has 2 territories');
assert(hood1.some(s => s.id === 't1') && hood1.some(s => s.id === 't2'), 'p1 neighbourhood is t1, t2');

const hood2 = board.getHomeNeighbourhood('p2', players_for_board);
assert(hood2.length === 2, 'p2 home neighbourhood has 2 territories');
assert(hood2.some(s => s.id === 't3') && hood2.some(s => s.id === 't4'), 'p2 neighbourhood is t3, t4');

assert(board.isHomeNeighbourhood('t1', 'p1', players_for_board), 't1 in p1 home neighbourhood');
assert(!board.isHomeNeighbourhood('t3', 'p1', players_for_board), 't3 not in p1 home neighbourhood');

// areAllied
const ap = [
  { id: 'a', allies: ['b'], colour: 'blue' },
  { id: 'b', allies: ['a'], colour: 'orange' },
];
assert(board.areAllied('a', 'b', ap), 'a and b are allied');
assert(!board.areAllied('a', 'c', ap), 'a and c are not allied');

// resetState / round-trip
board.getSpace('t1').owner = 'p1';
board.resetState();
assert(board.getSpace('t1').owner === null, 'resetState clears ownership');

const snapshot = board.toJSON();
const board2 = Board.fromJSON(snapshot);
assert(board2.getSpace('t1') !== null, 'round-trip preserves spaces');
assert(board2.getNeighbors('sw1').length > 0, 'round-trip preserves edges');

// ══════════════════════════════════════════════════════════════════
//  GAME — player creation + basic setup
// ══════════════════════════════════════════════════════════════════
console.log('Game — basics');

const p1 = createPlayer('p1', 'bruiser', 'h1', 'blue');
const p2 = createPlayer('p2', 'yapper',  'h2', 'orange');
assert(p1.water === 6, 'bruiser starts with 6 water');
assert(p2.grit === 3, 'yapper starts with 3 grit');
assert(p1.colour === 'blue', 'p1 colour is blue');
assert(p2.colour === 'orange', 'p2 colour is orange');
assert(Array.isArray(p1.allies) && p1.allies.length === 0, 'p1 starts with empty allies');

const game = new Game(board, [p1, p2]);

// ══════════════════════════════════════════════════════════════════
//  HOME TURF UNCAPTURABLE
// ══════════════════════════════════════════════════════════════════
console.log('Home turf uncapturable');

let r = game.canChallenge('p2', 'h1');
assert(!r.ok, 'canChallenge rejects HOME space');
assert(r.reason === 'Cannot challenge a home turf', 'correct reason for HOME rejection');

// ══════════════════════════════════════════════════════════════════
//  CLAIM
// ══════════════════════════════════════════════════════════════════
console.log('Claim');

// Bruiser — no swagger cost
r = game.claim('p1', 't1');
assert(r.success, 'bruiser claims t1');
assert(p1.water === 4, 'bruiser spent 2 water');
assert(p1.swagger === 3, 'bruiser swagger unchanged (discount)');
assert(board.getSpace('t1').owner === 'p1', 't1 owned by p1');

// Yapper — needs swagger
r = game.claim('p2', 't4');
assert(r.success, 'yapper claims t4');
assert(p2.swagger === 0, 'yapper spent 1 swagger');
assert(p2.water === 2, 'yapper spent 2 water');

// Claim on occupied → fail
r = game.claim('p2', 't1');
assert(!r.success, 'cannot claim occupied territory');

// ══════════════════════════════════════════════════════════════════
//  FORTIFY
// ══════════════════════════════════════════════════════════════════
console.log('Fortify');

// Yapper — no grit cost
r = game.fortify('p2', 't4');
assert(r.success, 'yapper fortifies t4');
assert(p2.grit === 3, 'yapper grit unchanged (discount)');
assert(board.getSpace('t4').fortifyTokens === 1, 't4 has 1 fortify');

// Bruiser — needs grit
game.claim('p1', 't2');
r = game.fortify('p1', 't1');
assert(r.success, 'bruiser fortifies t1');
assert(p1.grit === 1, 'bruiser spent 1 grit');

// ══════════════════════════════════════════════════════════════════
//  CHALLENGE RESOLUTION
// ══════════════════════════════════════════════════════════════════
console.log('Challenge resolution');

// Give p2 resources for challenge
p2.water = 4; p2.drive = 2;
r = game.payChallengeCost('p2', 't1');
assert(r.success, 'yapper pays challenge cost');
assert(p2.water === 2, 'challenge cost 2 water');
assert(p2.drive === 1, 'challenge cost 1 drive');

// Attacker wins (high roll vs low roll)
r = game.resolveChallenge('p2', 'p1', 't1', 6, 1);
// defender t1 has 1 fortify → defend total = 1+1 = 2, attack total = 6
assert(r.outcome === 'attackerWins', 'attacker wins with 6 vs 2');
assert(board.getSpace('t1').owner === null, 't1 cleared after challenge win');
assert(r.fortifyBonus === 1, 'fortify bonus reported');

// Re-claim with grit
p2.grit = 3;
r = game.reClaim('p2', 't1', 'grit');
assert(r.success, 're-claim with grit');
assert(board.getSpace('t1').owner === 'p2', 't1 now owned by p2');
assert(p2.grit === 2, 'spent 1 grit on re-claim');

// Yapper as DEFENDER — attacker gets +1 grit
p1.water = 6; p1.drive = 2; p1.grit = 0;
game.payChallengeCost('p1', 't1');
r = game.resolveChallenge('p1', 'p2', 't1', 6, 1);
assert(r.yapperGrit, 'yapper defender flag set');
assert(p1.grit === 1, 'attacker got +1 grit from yapper');

// Diplomat penalty
const p3 = createPlayer('p3', 'diplomat', 'h1', 'purple');
game.players.push(p3);
game.reClaim('p1', 't1', 'swagger'); // give p1 back t1
p3.water = 4; p3.drive = 2;
game.payChallengeCost('p3', 't1');
r = game.resolveChallenge('p3', 'p1', 't1', 4, 4);
assert(r.outcome === 'defenderWins', 'diplomat penalty makes 4v4 a loss');
assert(r.attackTotal === 3, 'diplomat attack total reduced by 1');

// Grit penalty
p1.grit = 7;
p1.water = 4; p1.drive = 2;
board.getSpace('t4').owner = 'p2';
game.payChallengeCost('p1', 't4');
r = game.resolveChallenge('p1', 'p2', 't4', 6, 1);
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
board.getSpace('t3').owner = null;
p1.water = 4; p1.drive = 2;
game.payChallengeCost('p1', 't1');
r = game.resolveChallenge('p1', 'p2', 't1', 3, 3);
assert(r.outcome === 'tie', 'tie without cluster → re-roll');

// ══════════════════════════════════════════════════════════════════
//  ALLIANCE FORMATION — dog park + friendship sacrifice
// ══════════════════════════════════════════════════════════════════
console.log('Alliance — formation');

// Remove p3 for cleaner alliance tests
game.players = game.players.filter(p => p.id !== 'p3');
board.resetState();

// Set up: p1 owns t3 (in p2's home neighbourhood), p2 owns t2 (in p1's home neighbourhood)
board.getSpace('t3').owner = 'p1';
board.getSpace('t2').owner = 'p2';
board.getSpace('t1').owner = 'p1';

// p3 (diplomat) initiates alliance at dog park — diplomat doesn't need bond
game.players.push(p3);
p3.water = 4; p3.bond = 3; p3.allies = [];
p1.allies = []; p2.allies = [];

// p1 initiates alliance at dp1
p1.water = 6; p1.bond = 1;
r = game.ally('p1', 'dp1');
assert(r.success, 'p1 initiates alliance at dp1');
assert(game.pendingAlliances.has('dp1'), 'pending alliance created');
assert(game.pendingAlliances.get('dp1') === 'p1', 'p1 is initiator');
assert(p1.water === 5, 'ally costs 1 water');

// p2 passes through dp1 → compulsory bond join
p2.water = 4;
r = game.compulsoryBondJoin('p2', 'dp1');
assert(r.success, 'compulsory bond join succeeds');
assert(p2.water === 3, 'compulsory bond costs 1 water');
assert(p1.allies.includes('p2'), 'p1 allies includes p2');
assert(p2.allies.includes('p1'), 'p2 allies includes p1');
assert(!game.pendingAlliances.has('dp1'), 'pending alliance cleared');

// Friendship sacrifice: p1's claim at t3 (p2's neighbourhood) cleared
assert(board.getSpace('t3').owner === null, 'p1 claim at t3 cleared (in p2 hood)');
// Friendship sacrifice: p2's claim at t2 (p1's neighbourhood) cleared
assert(board.getSpace('t2').owner === null, 'p2 claim at t2 cleared (in p1 hood)');
// p1's claim at t1 (p1's own neighbourhood) NOT cleared
assert(board.getSpace('t1').owner === 'p1', 'p1 claim at t1 preserved (own hood)');

assert(r.cleared.includes('t3'), 'cleared list includes t3');
assert(r.cleared.includes('t2'), 'cleared list includes t2');

// ══════════════════════════════════════════════════════════════════
//  ALLIANCE PROTECTION — blocks challenge
// ══════════════════════════════════════════════════════════════════
console.log('Alliance — protection');

// p1 owns t1, p1 and p2 are allied
board.getSpace('t1').owner = 'p1';
p2.water = 6; p2.drive = 3;

// Direct alliance: p2 cannot challenge p1 anywhere
r = game.canChallenge('p2', 't1');
assert(!r.ok, 'allied player cannot challenge (direct alliance)');
assert(r.reason.includes('allied'), 'reason mentions alliance');

// Home neighbourhood protection via transitive alliance
// p3 is not allied with p1, but is allied with p2 who is allied with p1
// p3 should not be able to challenge p1's t1 (in p1's home neighbourhood)
// because p1's ally (p2) is allied with p3
p3.allies = ['p2'];
p2.allies = ['p1', 'p3'];
p1.allies = ['p2'];
p3.water = 4; p3.drive = 2;
r = game.canChallenge('p3', 't1');
assert(!r.ok, 'transitive alliance blocks challenge in home neighbourhood');

// But p3 CAN challenge p1 outside home neighbourhood (if such territory exists)
// t3 is in p2's neighbourhood, not p1's
board.getSpace('t3').owner = 'p1';
// p3 is allied with p2, and t3 is in p2's neighbourhood.
// defender is p1, defender's allies include p2, and p3 is allied with p2 → blocked
r = game.canChallenge('p3', 't3');
// t3 is in p2's home neighbourhood (p2 is defender's ally p1's ally... wait no)
// defender is p1, t3 is in p2's home neighbourhood not p1's home neighbourhood
// isHomeNeighbourhood(t3, p1) → p1's home is h1, adjacent territories are t1, t2. So t3 is NOT in p1's hood.
// The transitive check only applies when the territory IS in the defender's home neighbourhood.
// t3 is NOT in p1's home neighbourhood, so no transitive check.
// Direct check: p3 is not allied with p1 directly.
assert(r.ok, 'p3 can challenge p1 at t3 (not in p1 home neighbourhood)');
board.getSpace('t3').owner = null;

// Clean up alliances for next tests
p1.allies = ['p2']; p2.allies = ['p1']; p3.allies = [];

// ══════════════════════════════════════════════════════════════════
//  BREAK ALLIANCE
// ══════════════════════════════════════════════════════════════════
console.log('Alliance — break');

p1.swagger = 3; p1.water = 6;
r = game.breakAlliance('p1', 'p2');
assert(r.success, 'alliance broken');
assert(!p1.allies.includes('p2'), 'p1 no longer allied with p2');
assert(!p2.allies.includes('p1'), 'p2 no longer allied with p1');
assert(p1.water === 5, 'break costs 1 water');
assert(p1.swagger === 2, 'break costs 1 swagger');

// After breaking, p2 can challenge p1 again
board.getSpace('t1').owner = 'p1';
p2.water = 6; p2.drive = 3;
r = game.canChallenge('p2', 't1');
assert(r.ok, 'after break, challenge allowed again');

// ══════════════════════════════════════════════════════════════════
//  PATH SHORTCUT
// ══════════════════════════════════════════════════════════════════
console.log('Path shortcut');

p1.position = 'pe1';
p1.drive = 3;
r = game.takeShortcut('p1', 'pe1');
assert(r.success, 'shortcut succeeds');
assert(r.exitSpaceId === 'pe2', 'exit at pe2');
assert(p1.position === 'pe2', 'player moved to pe2');
assert(p1.drive === 2, 'shortcut costs 1 drive');

// Not at path entry → fail
p1.position = 'sw1';
r = game.takeShortcut('p1', 'pe1');
assert(!r.success, 'shortcut fails when not at entry');

// ══════════════════════════════════════════════════════════════════
//  DOG PARK PASS-THROUGH EFFECTS
// ══════════════════════════════════════════════════════════════════
console.log('Dog park effects');

// No pending alliance → dogPark effect (+1 bond)
game.pendingAlliances.clear();
let effects = game.getPassThroughEffects('dp1', 'p1');
assert(effects.length === 1 && effects[0].type === 'dogPark', 'dog park gives dogPark effect');

// With pending alliance by different player → compulsoryBond
game.pendingAlliances.set('dp1', 'p2');
p1.allies = [];
effects = game.getPassThroughEffects('dp1', 'p1');
assert(effects.length === 1 && effects[0].type === 'compulsoryBond', 'pending alliance triggers compulsory bond');
assert(effects[0].dogParkSpaceId === 'dp1', 'correct dog park space id');

// With pending alliance by same player → dogPark effect (not compulsory)
effects = game.getPassThroughEffects('dp1', 'p2');
assert(effects.length === 1 && effects[0].type === 'dogPark', 'initiator gets dogPark not compulsory bond');
game.pendingAlliances.clear();

// PATH pass-through effect
effects = game.getPassThroughEffects('pe1', 'p1');
assert(effects.length === 1 && effects[0].type === 'pathEntry', 'path gives pathEntry effect');
assert(effects[0].exitSpaceId === 'pe2', 'pathEntry has correct exit');

// HOME pass-through — own home triggers resupply
effects = game.getPassThroughEffects('h1', 'p1');
assert(effects.length === 1 && effects[0].type === 'homeResupply', 'own home triggers resupply');

// HOME pass-through — opponent's home, no effect
effects = game.getPassThroughEffects('h2', 'p1');
assert(effects.length === 0, 'opponent home no effect');

// ══════════════════════════════════════════════════════════════════
//  DRINK
// ══════════════════════════════════════════════════════════════════
console.log('Drink');

p1.position = 'ws1';
p1.water = 2; p1.drive = 2;
r = game.drink('p1', 3);
assert(r.success, 'bruiser drinks');
assert(p1.drive === 1, 'drink costs 1 drive');
assert(p1.water === 5, 'water refilled (capped at max 6, 2+3=5)');

// Scrapper — no drive cost
const pScrapper = createPlayer('pS', 'scrapper', 'h1', 'yellow');
game.players.push(pScrapper);
pScrapper.position = 'ws1';
pScrapper.water = 1; pScrapper.drive = 0;
r = game.drink('pS', 2);
assert(r.success, 'scrapper drinks free');
assert(pScrapper.drive === 0, 'scrapper drive unchanged');
assert(pScrapper.water === 3, 'scrapper water: 1+2=3 (max)');
game.players = game.players.filter(p => p.id !== 'pS');

// ══════════════════════════════════════════════════════════════════
//  TERRITORY INCOME
// ══════════════════════════════════════════════════════════════════
console.log('Territory income');

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
// t1-t2-t3-t4 connected (4 → floor(4/2)=2) → total 2
assert(p1.swagger === 2, '4 connected territories → +2 swagger');

// ══════════════════════════════════════════════════════════════════
//  HOME RESUPPLY
// ══════════════════════════════════════════════════════════════════
console.log('Home resupply');

p1.water = 1; p1.swagger = 0; p1.drive = 0; p1.grit = 0; p1.bond = 0;
game.applyHomeResupply('p1');
assert(p1.water === 6, 'water refilled to full');
assert(p1.swagger === 3, 'swagger refilled to max');
assert(p1.drive === 2, 'drive refilled to max');

// Preserves excess
p1.swagger = 5;
game.applyHomeResupply('p1');
assert(p1.swagger === 5, 'swagger above max preserved');

// ══════════════════════════════════════════════════════════════════
//  MOVEMENT
// ══════════════════════════════════════════════════════════════════
console.log('Movement');

board.resetState();
p1.position = 'sw1';
p1.drive = 5;
r = game.movePlayer('p1', ['sw1', 'sw2', 'sw3']);
assert(r.success, 'move along sidewalk');
assert(r.driveCost === 0, 'sidewalk movement free');
assert(p1.position === 'sw3', 'position updated');

// Movement via intersection (free crossing)
r = game.movePlayer('p1', ['sw3', 'int1', 'sw4']);
assert(r.success, 'cross via intersection');
assert(r.driveCost === 0, 'intersection crossing free');

// Movement roll — housebound
p1.housebound = false;
let roll = game.rollMovement('p1', () => 3);
assert(roll === 6, 'normal roll: 3+3=6');
p1.housebound = true;
roll = game.rollMovement('p1', () => 3);
assert(roll === 3, 'housebound roll: floor(6/2)=3');
p1.housebound = false;

// ══════════════════════════════════════════════════════════════════
//  WIN CONDITIONS
// ══════════════════════════════════════════════════════════════════
console.log('Win conditions');

board.resetState();
for (let i = 0; i < 4; i++) board.getSpace(`t${i+1}`).owner = 'p1';
r = game.checkWinConditions();
assert(!r.gameOver, 'no win with 4 territories');

// Turn limit
game.turnNumber = 30;
board.getSpace('t1').owner = 'p1';
board.getSpace('t2').owner = 'p1';
board.getSpace('t3').owner = 'p2';
board.getSpace('t4').owner = null;
r = game.checkWinConditions();
assert(r.gameOver && r.winner === 'p1', 'p1 wins at turn limit (2 vs 1)');
game.turnNumber = 0;
game.gameOver = false;
game.winner = null;

// ══════════════════════════════════════════════════════════════════
//  HOUSEBOUND
// ══════════════════════════════════════════════════════════════════
console.log('Housebound');

board.resetState();
p1.zeroTerritoryTurns = 0;
p1.housebound = false;
game.checkHousebound('p1');
assert(p1.zeroTerritoryTurns === 1, 'zero territory turn incremented');
assert(!p1.housebound, 'not housebound after 1 turn');
game.checkHousebound('p1');
assert(p1.housebound, 'housebound after 2 turns with 0 territories');

board.getSpace('t1').owner = 'p1';
game.checkHousebound('p1');
assert(!p1.housebound, 'not housebound with territory');
assert(p1.zeroTerritoryTurns === 0, 'zero territory counter reset');

// ══════════════════════════════════════════════════════════════════
//  COMPULSORY BOND JOIN — full flow
// ══════════════════════════════════════════════════════════════════
console.log('Compulsory bond join — full flow');

board.resetState();
p1.allies = []; p2.allies = [];
game.pendingAlliances.clear();

// p1 initiates at dp1
p1.water = 6; p1.bond = 1;
r = game.ally('p1', 'dp1');
assert(r.success, 'p1 initiates');

// p2 moves through dp1 — pass-through detects compulsory bond
p2.position = 'sw4'; p2.drive = 5; p2.water = 4;
r = game.movePlayer('p2', ['sw4', 'dp1']);
assert(r.success, 'p2 moves to dp1');
const cbEffect = r.effects.find(e => e.type === 'compulsoryBond');
assert(cbEffect, 'compulsory bond effect triggered');
assert(cbEffect.dogParkSpaceId === 'dp1', 'correct dog park in effect');

// Execute the compulsory bond
r = game.compulsoryBondJoin('p2', 'dp1');
assert(r.success, 'compulsory bond join completed');
assert(p1.allies.includes('p2'), 'p1 now allied with p2');
assert(p2.allies.includes('p1'), 'p2 now allied with p1');

// ══════════════════════════════════════════════════════════════════
//  SERIALIZATION ROUND-TRIP
// ══════════════════════════════════════════════════════════════════
console.log('Serialization');

const state = game.getState();
assert(state.pendingAlliances !== undefined, 'getState includes pendingAlliances');
assert(state.players[0].allies !== undefined, 'getState includes allies');
assert(state.players[0].colour !== undefined, 'getState includes colour');

// ══════════════════════════════════════════════════════════════════
//  SUMMARY
// ══════════════════════════════════════════════════════════════════
console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
