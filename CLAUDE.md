# Uri-Nation — Claude Code Project Guide

## What This Project Is

Uri-Nation is a 2–4 player physical board game where players control dogs on neighbourhood walks, competing for territory through urine marking. It combines real canine chemical communication research with accessible strategy gameplay.

This repo contains the game design documents and will house the tools we build to design, simulate, and test the game mechanics.

Full design spec: `docs/DESIGN.md`
Player-facing rules: `docs/INSTRUCTIONS.md`

---

## Project Structure

```
Uri-Nation/
├── CLAUDE.md               ← you are here
├── docs/
│   ├── DESIGN.md           ← canonical game design document (source of truth)
│   └── INSTRUCTIONS.md     ← player-facing rules
└── tools/                  ← game development tools (to be built)
    ├── simulator/          ← balance simulator
    └── board-builder/      ← board topology tool
```

The `tools/` directory does not exist yet — we will build it here.

---

## Core Game Concepts (read before touching anything)

### Resources — all physical tokens
- **Water pegs** (blue, around bowl rim) — bladder. Fuel for all pee-based actions. Large pee costs 2, small pee costs 1.
- **Swagger** (bones) — confidence. Spent to Claim, re-claim after winning challenges, break alliances.
- **Drive** (sticks) — energy/aggression. Spent to Challenge, cross the road, take shortcuts, drink.
- **Grit** (TBD shape) — defensive resolve. Spent to Fortify and re-claim. Accumulates involuntarily from conflict.
- **Bond** (hearts) — social. Spent to initiate alliances.

### Pee Disks
- **Large pee disk** — placed when Claiming or Challenging (costs 2 water + modifier).
- **Small pee disk** — placed when Fortifying, Allying, or Breaking Alliance (costs 1 water + modifier).
- Pee disks come from a shared supply and go straight to the board. Never stored in a bowl.

### Re-claim mechanic (important)
When a Challenge is won, the defender's disk and fortify tokens go back to supply. The **attacker's challenge disk stays on the territory**. The attacker may spend 1 Swagger OR 1 Grit to convert it into a claim. No additional water cost. If neither is available, the disk goes back to supply and the territory is empty.

### Archetypes
| Archetype | Water | Swagger | Drive | Grit | Bond | Discount |
|-----------|-------|---------|-------|------|------|----------|
| Bruiser   | 6     | 3       | 2     | 2    | 1    | Claims cost no Swagger |
| Scrapper  | 3     | 2       | 3     | 1    | 2    | Drinking costs no Drive |
| Diplomat  | 4     | 2       | 1     | 2    | 3    | Ally initiation costs no Bond. Challenges −1. |
| Yapper    | 4     | 1       | 2     | 3    | 2    | Fortify costs no Grit. Attackers +1 Grit. |

### Board
Two sidewalks separated by a road. Road crossings: free at intersections, 1 Drive mid-block. Side streets cost 1 Drive per space. Territory spaces branch off sidewalks. Bond spaces (hydrants, lamp posts etc.) are alliance anchors, not claimable.

### Challenge resolution
Both roll 1d6. Attacker must roll higher to win. Defender bonuses: +1 per fortify token (max 3), +3 at home turf, ties go to defender if holding 3+ connected territories (cluster rule). Attacker penalties: −1 if Diplomat, +1 Grit to attacker if challenging Yapper (win or lose), subtract excess Grit above 5 from roll.

### Economy — no basic income
All resources come from the board: territory holdings generate Swagger, Chance Spots generate Drive, Dog Park generates Bond, Water Sources refill bladder. Home gives full resupply but costs positioning.

---

## What We're Building

### 1. Balance Simulator (`tools/simulator/`)
Simulate full games with AI-controlled archetype players to test balance. Key outputs:
- Win rates per archetype
- Average game length
- Resource utilization rates
- Road crossing frequency
- Home visit frequency

Key variables to test:
- Territory swagger rate: +1 per 2 vs per 3 connected territories
- Modifier maxes (3/2/2/1 spread)
- Grit penalty threshold (currently 5)
- Chance deck drive distribution
- 30-turn game length and 10-territory win threshold

### 2. Board Builder (`tools/board-builder/`)
Visual tool for designing board topology. Needs to handle:
- Two sidewalks with road between them
- Intersections (free crossings) and mid-block stretches
- Territory spaces branching off sidewalks
- Bond spaces with areas of influence
- Side streets / cul-de-sacs
- Placement of: homes, water sources, chance spots, dog park, events space

---

## Coding Conventions

- **Language:** JavaScript/Node.js preferred for tools (keep it simple, runnable without build steps)
- **No frameworks unless necessary** — this is game design tooling, not a web app
- **Readable over clever** — these tools will be iterated on heavily; clarity matters
- **Game state should be inspectable** — simulator should be able to dump full game state at any turn for debugging
- **Docs stay in sync** — if a mechanic changes, update `docs/DESIGN.md` and `docs/INSTRUCTIONS.md` together

---

## Do Not Change Without Discussion
- Archetype modifier maxes (3/2/2/1 spread) — carefully balanced
- Re-claim mechanic (challenge disk stays, no additional water cost)
- Compulsory bonding trigger (passing an active bond space forces join)
- Cluster rule (3+ connected territories, binary check not sliding scale)
