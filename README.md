# Uri-Nation 🐕

**A neighbourhood territory control board game where players are dogs competing through strategic urine marking.**

Players choose a dog archetype and breed, manage their chemical resources (Swagger, Nerves, Bond, Drive), and compete to control neighbourhood territory through strategic marking, challenges, alliances, and fortification — all while being walked on a leash by an oblivious owner.

## Project Structure

```
/docs          - Game design documents and rules
/simulation    - Balance simulator (planned)
/prototype     - Visual prototype (planned)
```

## Current Status

**Phase 1: Design & Prototyping**

- [x] Core concept and mechanics design (v0.6)
- [ ] Balance simulator for parameter tuning
- [ ] Board layout and topology design
- [ ] Physical prototype for playtesting

## Game Overview

### Archetypes (4 types — same actions, different discounts)
- **The Bruiser** — Big bladder, cheap claims, expensive detours. Steamroller on rails.
- **The Scrapper** — Tiny bladder, free detours, small marks only. Everywhere at once.
- **The Diplomat** — Cheap alliances, forced ceasefires, weak in combat. Kingmaker.
- **The Yapper** — Free fortification, punishing to attack, slow. Annoying turtle fortress.

### Chemical Resources
- **Swagger** 💪 — Assertiveness. Powers claims and challenges.
- **Nerves** 😰 — Stress/defense. Powers fortification. Liability above 5.
- **Bond** 🤝 — Social currency. Powers alliances.
- **Drive** ⚡ — Navigation fuel. Spent to leave the main loop.

### Actions
- **Claim** — Mark an empty space (Small or Large)
- **Challenge** — Overmark an opponent's space (contested dice roll)
- **Fortify** — Reinforce your own mark (+1 defense, max 3)
- **Bond Signal** — Propose alliance adjacent to opponent's mark
- **Pass** — Walk away

### Key Mechanics
- **Bladder scarcity** — No auto-refill. Home Turf (safe, half max) or Water Sources (risky deck draw).
- **Adjacency bonus** — +1 defense per adjacent friendly space (max +3). Build clusters, not outposts.
- **The leash** — Owner walks the loop. Dog spends Drive to detour. Comedy through constraint.

### Win Conditions
- Hold 10 non-home spaces, OR
- Be the last player with territory, OR
- Most territory after 30 turns

## Science Background

The game mechanics are grounded in actual research on canine chemical communication, including the Quaranta et al. (2025) study on urinary hormone modulation during marking behavior. See `/docs/DESIGN.md` for detailed references.

## License

TBD
