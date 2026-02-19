// Uri-Nation — Archetype Definitions
// Pure data. No logic. Imported by game.js and anything else that needs archetype stats.

export const ARCHETYPES = {
  bruiser: {
    name: 'Bruiser',
    water: 6,
    swagger: 3,
    drive: 2,
    grit: 2,
    bond: 1,
    discount: 'claimNoSwagger',
    // Claims cost no Swagger (large pee only).
  },
  scrapper: {
    name: 'Scrapper',
    water: 3,
    swagger: 2,
    drive: 3,
    grit: 1,
    bond: 2,
    discount: 'drinkNoDrive',
    // Drinking costs no Drive.
  },
  diplomat: {
    name: 'Diplomat',
    water: 4,
    swagger: 2,
    drive: 1,
    grit: 2,
    bond: 3,
    discount: 'allyNoBond',
    // Ally initiation costs no Bond. Challenges at −1 to attack roll.
  },
  yapper: {
    name: 'Yapper',
    water: 4,
    swagger: 1,
    drive: 2,
    grit: 3,
    bond: 2,
    discount: 'fortifyNoGrit',
    // Fortify costs no Grit. Attackers gain +1 Grit when challenging.
  },
};

// Action costs before discounts.
// waterCost is pee disk size: 2 = large, 1 = small, 0 = none.
export const ACTION_COSTS = {
  claim:          { water: 2, swagger: 1, drive: 0, grit: 0, bond: 0 },
  challenge:      { water: 2, swagger: 0, drive: 1, grit: 0, bond: 0 },
  reClaim:        { water: 0, swagger: 1, drive: 0, grit: 0, bond: 0 }, // OR 1 grit instead of swagger
  fortify:        { water: 1, swagger: 0, drive: 0, grit: 1, bond: 0 },
  ally:           { water: 1, swagger: 0, drive: 0, grit: 0, bond: 1 },
  compulsoryBond: { water: 1, swagger: 0, drive: 0, grit: 0, bond: 0 },
  breakAlliance:  { water: 1, swagger: 1, drive: 0, grit: 0, bond: 0 },
  drink:          { water: 0, swagger: 0, drive: 1, grit: 0, bond: 0 },
  roadCrossing:   { water: 0, swagger: 0, drive: 1, grit: 0, bond: 0 },
  sideStreet:     { water: 0, swagger: 0, drive: 1, grit: 0, bond: 0 }, // per space
};
