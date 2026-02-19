// Uri-Nation — Board Graph Model
// The board is a graph of spaces connected by edges. Each edge can carry a drive cost.
// Loaded from a JSON definition produced by the board builder.
// Mutable state (ownership, fortify, bonds) lives on the spaces and is mutated by game.js.

export const SPACE_TYPES = {
  SIDEWALK:     'sidewalk',
  TERRITORY:    'territory',
  BOND:         'bond',
  HOME:         'home',
  WATER_SOURCE: 'waterSource',
  CHANCE_SPOT:  'chanceSpot',
  DOG_PARK:     'dogPark',
  EVENTS:       'events',
  INTERSECTION: 'intersection',
  SIDE_STREET:  'sideStreet',
};

// Default state for a space — merged on top of the definition.
function defaultSpaceState() {
  return {
    owner: null,          // player id who owns this territory/home
    fortifyTokens: 0,     // 0–3, only meaningful on territory spaces
    bondMarkers: [],      // player ids with markers here (bond spaces only)
    revertOwner: null,    // original home owner when home is taken
    revertIn: 0,          // turns until home reverts (0 = no pending revert)
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
      id:        def.id,
      type:      def.type,
      side:      def.side      || null,   // 'north' | 'south' | null
      homeOwner: def.homeOwner || null,   // player id (home spaces only)
      influence: def.influence || [],     // territory ids (bond spaces only)
      label:     def.label     || def.id, // human-readable name
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

  // --- Bond / alliance queries ---

  // Are attackerId and defenderId both bonded at a bond space whose area
  // of influence includes territoryId?
  areBondedAt(attackerId, defenderId, territoryId) {
    for (const s of this.spaces.values()) {
      if (s.type !== SPACE_TYPES.BOND) continue;
      if (
        s.bondMarkers.includes(attackerId) &&
        s.bondMarkers.includes(defenderId) &&
        s.influence.includes(territoryId)
      ) {
        return true;
      }
    }
    return false;
  }

  // All bond spaces with at least one marker.
  getActiveBondSpaces() {
    return this.getSpacesByType(SPACE_TYPES.BOND).filter(s => s.bondMarkers.length > 0);
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

  // Wipe all mutable state (ownership, fortify, bonds) for a new game.
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
