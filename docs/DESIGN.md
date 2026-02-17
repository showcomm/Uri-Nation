# Uri-Nation — Game Design Document

**Version:** 0.6
**Date:** 2026-02-16

---

## 1. Concept

Uri-Nation is a 2–4 player neighbourhood territory control game where each player is a dog on a walk. Players mark territory with urine, challenge other dogs' claims, form alliances, and try to dominate the neighbourhood — or push opponents back to their own backyards.

Grounded in real canine chemical communication research (dogs really do encode identity, status, stress, and social intent in urine chemistry). Presented with accessible, humorous mechanics.

---

## 2. Core Design Principles

- **Same actions for everyone.** Every archetype can Claim, Challenge, Fortify, Bond Signal, and Detour. No exclusive abilities. Differentiation is through cost discounts and stat profiles.
- **Open information.** All marks are face-up. Fortify tokens are visible. Adjacency bonuses are countable from the board. No hidden state to track.
- **No decay.** Marks stay permanently until overmarked. No bookkeeping for mark aging.
- **Scarcity drives drama.** Chemicals accumulate slowly. Bladder only refills from water sources. Spending is a commitment. Losing a Challenge hurts.
- **The leash is the joke.** You're a dog on a leash trying to execute grand strategy while being walked by an oblivious owner. Movement constraints are comedic.

---

## 3. Archetypes and Breeds

### 3.1 Archetype System

Four archetypes define gameplay mechanics. Each gets one cost discount and one or more constraints. Breeds are flavour — the picture on the card, a bio, maybe a minor once-per-game ability. Any dog breed can be any archetype. Expandable forever.

### 3.2 The Four Archetypes

**The Bruiser**
- Bladder: 6. Walk: 1d6.
- Starting: Swagger 4, Nerves 1, Bond 1, Drive 2.
- Refill: Swagger +2, Nerves +0, Bond +1, Drive +1.
- Discount: Claims cost -1 Swagger (Small = 1B+1S, Large = 2B+3S).
- Constraint: Detours cost 2 Drive/space. Can only interact every other space.
- Identity: Dominates its patch. Powerful but slow and predictable.

**The Scrapper**
- Bladder: 3. Walk: 2d6.
- Starting: Swagger 3, Nerves 1, Bond 1, Drive 3.
- Refill: Swagger +1, Nerves +1, Bond +1, Drive +2.
- Discount: Detours are free (no Drive cost to leave main loop).
- Constraint: Small marks only. Tiny bladder.
- Identity: Everywhere at once. Fast, fragile, always thirsty.

**The Diplomat**
- Bladder: 4. Walk: 1d6+2.
- Starting: Swagger 2, Nerves 1, Bond 3, Drive 2.
- Refill: Swagger +1, Nerves +0, Bond +2, Drive +1.
- Discount: Bond Signals cost -1 Bond. Proposed alliances must be accepted for 1 turn.
- Constraint: Challenges at -1 to attack roll.
- Identity: Kingmaker. Wins by making itself too useful to attack.

**The Yapper**
- Bladder: 4. Walk: 1d6.
- Starting: Swagger 1, Nerves 2, Bond 1, Drive 3.
- Refill: Swagger +1, Nerves +1, Bond +1, Drive +2.
- Discount: Fortify costs only Bladder (no Nerves). Attacks against Yapper marks cost attacker +1 Nerves.
- Constraint: Small marks only. Slowest walk (1d6, no modifier).
- Identity: Turtle. Builds an annoying fortress and waits for others to exhaust themselves.

### 3.3 Design Notes on Archetypes

The four-way dynamic: Bruiser threatens with power, Scrapper with speed, Diplomat with alliances, Yapper with attrition. No archetype hard-counters another but each has natural advantages and disadvantages in different matchups.

---

## 4. Chemical Resources

### 4.1 The Chemical Bank

Each player tracks four chemicals on a track card. Chemicals accumulate each turn based on breed refill rate + territory bonuses. They are spent to perform actions. No chemical exceeds 10.

The bank is the player's strategic engine. Some turns are "positioning turns" — walking, accumulating, getting into place. Others are "strike turns" — spending a stockpile on a critical Claim or Challenge. The accumulation rhythm is central to gameplay pacing.

**Key tuning parameter:** Refill rates control game speed. Slower refills = cautious, positional game with weighty decisions. Faster refills = aggressive, frequent territory changes. Current rates need simulator testing.

### 4.2 The Four Chemicals

**Swagger** 💪 — Assertiveness. Spent on Claims and Challenges. Primary offensive resource.

**Nerves** 😰 — Stress and defense. Spent on Fortify. Accumulates involuntarily from failed Challenges, bad water, and Desperation bonus. Penalty above 5: excess subtracted from Challenge attack rolls. A liability if it gets too high.

**Bond** 🤝 — Social currency. Spent on Bond Signals and alliance maintenance (1 per turn per alliance). Can't pay = alliance breaks.

**Drive** ⚡ — Navigation fuel. Spent to leave the main loop (1 per space off-route; varies by archetype). The only chemical with a movement function.

### 4.3 Refill and Territory Bonus

Each turn after all players walk:
- Chemicals refill by breed base rate.
- For every 3 connected spaces held (excluding Home Turf), +1 to any chemical of player's choice.
- No chemical exceeds 10.
- Desperation bonus: fewer than 3 non-home spaces = +2 Nerves.

---

## 5. Actions

Every archetype can perform every action. Costs below are base; see archetype discounts.

| Action | Cost | Effect |
|--------|------|--------|
| Claim (Small) | 1 Bladder + 2 Swagger | Place Small disk (defense 1) on empty space |
| Claim (Large) | 2 Bladder + 4 Swagger | Place Large disk (defense 2) on empty space |
| Challenge | 2 Bladder + 3 Swagger + 1 Nerves | Contested d6 roll to overmark opponent |
| Fortify | 1 Bladder + 2 Nerves | +1 defense token on your mark (max 3) |
| Bond Signal | 1 Bladder + 2 Bond | Propose alliance adjacent to opponent mark |
| Pass | Nothing | Do nothing |

### 5.1 Challenge Resolution

- Attacker: d6 + disk size being placed − Nerves penalty (if Nerves > 5, subtract excess)
- Defender: d6 + disk size + Fortify tokens + adjacency bonus (max +3) + Home Turf (+3) + Alliance (+1)
- Attacker must beat defender. Ties to defender.
- Win: replace their mark. Lose: resources spent, +1 Nerves.
- Attacking a Yapper mark: attacker takes +1 Nerves win or lose.
- Diplomat attacks at -1 to roll.

### 5.2 Alliance Rules

- Bond Signal places white token adjacent to opponent mark.
- Opponent accepts on their turn by placing token adjacent to yours.
- Diplomat's proposals must be accepted for 1 turn minimum.
- Active alliance: can't attack each other's adjacent marks, +1 defense vs non-allied Challenges.
- Maintenance: 1 Bond per turn. Max 2 alliances. Breaks if either attacks the other.

---

## 6. The Board

### 6.1 Layout

- **Main loop:** ~30–40 spaces, circuit through the neighbourhood. Default walking route.
- **Side streets:** Branches off the loop — cul-de-sacs, clusters, dead ends. Cost Drive to enter.
- **Shortcuts:** Short paths (1–3 spaces) connecting non-adjacent board areas. Unfenced backyards, walking trails, hedge gaps. Cost Drive but save movement.
- **Home Turfs:** 4 corners, one per player. On the main loop.
- **News square:** One location on the main loop.
- **Water Sources:** 4–5 scattered, some on-loop, some on side streets.

### 6.2 Spaces

Every markable space is identical. No categories. Value comes from adjacency.

**Adjacency bonus:** +1 defense per adjacent friendly space, max +3.

**Home Turf:** +3 defense. Marks revert after 1 turn if taken. Worth 0 VP. Safe water refill (half bladder).

### 6.3 Board Design Open Questions

- Exact space count and topology
- Number and placement of side streets
- Shortcut positions and connectivity
- Water Source placement (strategic: near contested borders? Near home?)
- Whether main loop direction is fixed or reversible

---

## 7. Movement

### 7.1 Persistent Position

Pawns stay on the board between turns. You are always somewhere. Next turn, continue from where you stopped.

### 7.2 The Main Loop

Owner walks the loop. Player chooses direction at game start (fixed for the game). Roll and advance each turn. Can stop early.

### 7.3 Detours

At any junction, may leave the main loop onto side streets or shortcuts.

**Cost: 1 Drive per space off the main loop.**
- Bruiser: 2 Drive per space.
- Scrapper: Free.
- Diplomat: 1 Drive per 2 spaces (rounded up).
- Yapper: 1 Drive per space (standard).

Returning to the main loop is free — just move toward it on a subsequent turn.

### 7.4 Passing Through

Water Sources and News squares trigger when passed through (optional for water). Marking actions only at your stopping space.

---

## 8. Water and Bladder

### 8.1 Core Rule

Bladder does NOT auto-refill. The only ways to restore bladder:
- Pass through your Home Turf: half max, rounded up. Safe. Once per turn.
- Drink from a Water Source: draw from Water Quality deck. Risky.

### 8.2 Water Quality Deck

| Grade | Frequency | Effect |
|-------|-----------|--------|
| 💎 Clean | ~20% | Full refill. Possible +1 Bond bonus. |
| 👍 Decent | ~35% | Half refill. No side effects. |
| 😬 Questionable | ~30% | Half refill + penalty (+1 Nerves, or -1 Drive, or -1 Swagger). |
| ☠️ Terrible | ~15% | No refill + penalty (+2 Nerves, or -1 Bladder, or skip next action). |

Drinking is always optional. Passing through a Water Source without drinking is allowed.

### 8.3 Strategic Implications

- Home water is safe but requires routing through home.
- Water Sources near contested areas are convenient but risky.
- Bruiser (bladder 6) needs water less often.
- Scrapper (bladder 3) is constantly hunting for water.
- Controlling spaces around a Water Source forces opponents into your territory to drink.
- Neighbourhood News can create/remove Water Sources temporarily.

---

## 9. Turn Structure

1. **Roll and Move.** Roll walk dice. Advance up to that many spaces (spend Drive for detours). Trigger Water Sources and News along the way.
2. **Take One Action.** At stopping space or adjacent: Claim, Challenge, Fortify, Bond Signal, or Pass.
3. **Refill** (after all players). Chemicals by breed rate + territory bonus. Bladder only from water/home.
4. **Maintenance.** Pay alliance costs. Housebound check.

**Turn order:** Player with least territory goes first (catch-up mechanic). Ties: roll off.

---

## 10. Win Conditions

1. Hold **10 non-home spaces** at end of any Refill phase.
2. **Last player** with non-home territory.
3. After **30 turns**: most territory. Ties: most Fortify tokens, then highest Swagger.

Housebound (0 non-home spaces for 2 turns): walk halved, no territory bonuses. Recover by claiming any space.

---

## 11. Neighbourhood News Deck

Drawn when landing on or passing through the News square.

Categories: Weather (affect all), Personal (affect drawer), Neighbourhood (affect board state). Some cards are HOLD (play when chosen, max 2 in hand).

Can create/remove temporary Water Sources, block paths, reset marks, adjust chemicals.

---

## 12. Walk Tricks (Optional Module)

Agree before game. Each is once-per-game unless noted.

- **Pull the Leash** — Spend 2 Drive, +3 walk roll. Narrate what dog lunged at.
- **Distracted Owner** — Roll doubles = +2 spaces, may reverse direction.
- **Zoomies** (Scrapper) — Triple walk roll, no action.
- **Butt Sniff Diplomacy** (Diplomat) — Adjacent to pawn, both reveal chemical tracks. Free.
- **Paranoid Patrol** (Yapper) — Fortify all own marks within 3 spaces. Free.
- **Leg Day** (Bruiser) — Claim or Challenge from 2 spaces away.

---

## 13. Science References

- Quaranta, A. et al. (2025). "Decoding dog communication through the physiology and behavior of urine marking." Scientific Reports.
- Dzieciol, M. et al. (2018). "Identification of putative volatile sex pheromones in female domestic dogs." Animal Reproduction Science.
- McGuire, B. and Bemis, K.E. (2017). "Scent marking in shelter dogs: effects of body size." Applied Animal Behaviour Science.
- Lisberg, A.E. and Snowdon, C.T. (2011). "Effects of sex, social status and gonadectomy on countermarking by domestic dogs." Animal Behaviour.
- Schultz, T.H. et al. (1985). "Some volatile constituents of female dog urine." Journal of Chemical Ecology.

---

## 14. Open Design Questions and Next Steps

### Balance Tuning (needs simulator)
- Chemical refill rates may be too generous — a Bruiser can currently Claim every turn. Slower accumulation would make Challenges feel weightier and create more "positioning turns."
- Exact adjacency bonus cap (+3 may be too strong for Yapper fortress strategy).
- Water Quality deck distribution — 15% Terrible may be too punishing or not punishing enough.
- 30-turn game length — is this right for the pace?
- Win threshold of 10 spaces — too many? Too few?

### Board Design (needs prototyping)
- Exact topology of main loop, side streets, and shortcuts.
- Water Source placement relative to Home Turfs and contested zones.
- Number of side street spaces vs. main loop spaces.
- Whether shortcuts create degenerate movement patterns.

### Simulator Requirements
- Web-based, adjustable parameters for all refill rates, costs, deck distributions.
- Automated play with simple AI strategies (aggressive, defensive, balanced, random).
- Output: average game length, win rate by archetype, average territory held, resource utilization.
- Goal: find parameter ranges where all four archetypes are competitive and games end in 20–40 turns.

### Future Expansion Ideas
- New breed cards (flavour + minor ability) for existing archetypes.
- Fifth archetype?
- Solo mode with automated opponent.
- Campaign mode (series of games, persistent neighbourhood).
- Physical prototype for playtesting.
