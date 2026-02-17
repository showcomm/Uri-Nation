# Uri-Nation 🐕

**A neighbourhood territory control board game where players are dogs competing through strategic urine marking.**

Players choose a dog breed, manage their chemical resources (Swagger, Nerves, Bond, Drive), and compete to control neighbourhood territory through strategic marking, challenges, alliances, and fortification.

## Project Structure

```
/docs          - Game design documents and rules
/simulation    - Python batch simulation for balance testing
/prototype     - Visual prototype (React)
```

## Current Status

**Phase 1: Design &amp; Prototyping**

- [x] Core concept and mechanics design
- [ ] Visual prototype for gameplay feel
- [ ] Batch simulation for balance testing
- [ ] Playtesting and iteration

## Game Overview

### Dog Breeds (4 classes)
- **The Bruiser** (large, confident) — High Swagger, big bladder, fewer actions
- **The Scrapper** (small, confident) — Small bladder, high frequency, concentrated marks
- **The Diplomat** (medium, social) — Balanced, excels at alliances
- **The Nervous Sniffer** (medium, anxious) — High Drive/Nerves, intelligence-gathering playstyle

### Chemical Resources
- **Swagger** — Assertiveness. Powers claims and challenges.
- **Nerves** — Stress/defense. Powers fortification. Accumulates as liability.
- **Bond** — Social currency. Powers alliances.
- **Drive** — Alertness. Determines turn order, powers sniffing.

### Mark Actions
- **Claim** — Mark an empty space
- **Challenge** — Overmark an opponent's space (contested dice roll)
- **Bond Signal** — Adjacent-mark to propose alliance
- **Fortify** — Re-mark your own space to strengthen defense

### Win Conditions
- Control X spaces outside home turf, OR
- Be the last player with marks on the board

## Science Background

The game mechanics are grounded in actual research on canine chemical communication, including the Quaranta et al. (2025) study on urinary hormone modulation during marking behavior. See `/docs/DESIGN.md` for detailed references.

## License

TBD
