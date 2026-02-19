# Uri-Nation — Development Environment Plan

## Overview

Three layers that talk to each other. Built with plain HTML/CSS/JS (browser tools) and Node.js (engine and simulation). No frameworks. Everything lives in `tools/`.

---

## Layer 1 — Game Engine (`tools/engine/`)

Pure JS module. No UI dependency. This is the source of truth for all game rules.

- Board represented as a graph of spaces (type, owner, fortify count, bond markers, etc.)
- Archetypes, action recipes, challenge resolution, income rules all live here
- Ingests a board definition (JSON) from the board builder
- Used by both the simulator and the game runner

---

## Layer 2 — Board Builder (`tools/board-builder/`)

Browser-based visual grid editor. Your design workbench for laying out board variations.

- Stamp-based: palette of pre-built component types (road section, intersection, territory, bond space, water source, home turf, etc.)
- Snap components together on a grid; connections auto-link in the topology graph
- Each component carries metadata: space type, connections, which side of road, area of influence
- Outputs a named JSON board definition file
- JSON files are version controlled — easy to diff layouts and roll back

---

## Layer 3 — Game Runner (`tools/game-runner/`)

Browser-based. Loads a board definition, renders it visually, and runs a game.

- Renders the board using SVG — each component type has an SVG asset
- Game state (ownership, tokens, alliances) reflected live on the board
- Supports manual play (click to take actions) and AI players
- Goal: look close to a real board game — this is where look and feel gets worked out

---

## Graphics Approach

SVG-based rendering. Each board component type has its own SVG file in `tools/assets/`.

**Why SVG:**
- Scales perfectly at any size
- Individual elements can be manipulated directly (colour tinting for ownership, token overlays, etc.)
- Supports drop shadows, textures, transitions
- Can look genuinely close to a physical board game with good artwork behind it

**Workflow:**
1. Engine and runner built with placeholder SVG art
2. You design component artwork in your tool of choice (Illustrator, Figma, Inkscape)
3. Export each component as SVG, drop into `tools/assets/`
4. Runner swaps placeholders automatically

You are not blocked waiting for tech. Tech is not locked to placeholder art. They develop in parallel.

---

## Build Order

1. **Game engine** — data model and core rules in code
2. **Board builder** — create and save board layouts as JSON
3. **Game runner** — render the board, play a game manually
4. **AI players** — simple strategy bots (aggressive, defensive, balanced, random)

---

## Component Types (Board Builder Palette)

**Road components** — span full road width:
- Straight road section (sidewalk | road | sidewalk)
- Intersection (free crossing point)
- T-junction (side street meets main road)

**Sidewalk-side components** — attach to one side of road:
- Territory: residential property (yard, driveway, house)
- Territory: tree / pole / fence (smaller claimable space)
- Bond space: fire hydrant, bus stop, lamp post
- Water source: puddle, garden tap
- Home turf (larger, distinct per player)
- Chance spot: garbage bin, café scraps
- Dog park
- Events space

**Side street components:**
- Side street path (costs 1 Drive per space to enter)
- Cul-de-sac cluster (territories at dead end)

---

## File Structure

```
tools/
├── engine/
│   ├── game.js           ← core game rules
│   ├── board.js          ← graph/topology model
│   └── archetypes.js     ← archetype definitions
├── board-builder/
│   ├── index.html
│   ├── builder.js
│   └── components.js     ← stamp definitions
├── game-runner/
│   ├── index.html
│   ├── runner.js
│   └── renderer.js       ← SVG rendering
├── simulator/
│   └── simulate.js       ← batch AI game runner
├── assets/
│   └── components/       ← SVG files per component type
└── boards/               ← saved board JSON definitions
```
