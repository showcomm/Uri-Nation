# Uri-Nation 🐕

**A neighbourhood territory control board game where players are dogs competing through strategic urine marking.**

2–4 players. Ages 10+. 45–90 minutes.

Players choose a dog breed, manage their chemical resources (Swagger, Nerves, Bond, Drive), and compete to control neighbourhood territory through strategic marking, challenges, alliances, and fortification. Grounded in real canine chemical communication science. Presented as a light, funny strategy game.

## Project Structure

```
/docs          - Game design documents and rules
/simulation    - Balance simulation (planned)
/prototype     - Visual prototype (planned)
```

## Current Status

**Version 0.6 — Design & Prototyping**

- [x] Core concept and mechanics design (v6)
- [ ] Balance simulator (web-based, adjustable parameters)
- [ ] Board layout and topology
- [ ] Visual prototype for gameplay feel
- [ ] Playtesting and iteration

## Game Overview

### Archetypes (4 types, breeds are cosmetic flavour)
- **The Bruiser** — Big, confident. Cheap claims, big bladder, slow and predictable.
- **The Scrapper** — Small, fast. Free detours, everywhere at once, always thirsty.
- **The Diplomat** — Friendly, social. Cheap alliances, forced ceasefires, can't fight well.
- **The Yapper** — Loud, annoying. Cheap fortification, stressful to attack, turtle strategy.

### Chemical Resources
- **Swagger** 💪 — Assertiveness. Powers claims and challenges.
- **Nerves** 😰 — Stress/defense. Powers fortification. Liability above 5.
- **Bond** 🤝 — Social currency. Powers alliances.
- **Drive** ⚡ — Navigation fuel. Powers detours off the main loop.

### Core Mechanics
- Same actions for everyone, one thing cheaper per archetype
- Open information — all marks face-up, no hidden state
- Bladder does NOT auto-refill — only from Home Turf (safe) or Water Sources (risky)
- Adjacency defense bonus (+1 per friendly neighbour, max +3)
- No decay — marks stay until overmarked
- The leash is the joke — you're a dog executing grand strategy while being walked by an oblivious owner

### Win Conditions
- Hold 10 non-home spaces, OR
- Be the last player with territory, OR
- Most territory after 30 turns

## Science Background

The game mechanics are grounded in actual research on canine chemical communication, including the Quaranta et al. (2025) study on urinary hormone modulation during marking behavior. See `/docs/DESIGN.md` for detailed references.

## License

TBD
