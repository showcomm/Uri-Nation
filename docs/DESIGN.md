# Uri-Nation — Game Design Document

**Version:** 1.4.0
**Date:** 2026-02-21

---

## 1. Concept

Uri-Nation is a 2–4 player neighbourhood territory control game where each player is a dog on a walk. Players mark territory with urine, challenge other dogs' claims, form alliances at dog parks, and try to dominate the neighbourhood.

Grounded in real canine chemical communication research (dogs really do encode identity, status, stress, and social intent in urine chemistry). Presented with accessible, humorous mechanics.

---

## 2. Core Design Principles

- **Same actions for everyone.** Every archetype can Claim, Challenge, Fortify, Ally, and use shortcuts. No exclusive abilities. Differentiation is through starting resources only.
- **Open information.** All claims are visible. Fortify tokens are visible. Alliance markers are visible. No hidden state.
- **No decay.** Marks stay permanently until challenged off.
- **Everything is physical tokens.** Bones, sticks, hearts, grit tokens, water pegs — all tactile pieces stored in the player's dog bowl.
- **Pee = water. Modifiers = intent.** Actions that place pee disks cost water (removed from bowl rim) plus a modifier token. The water IS the pee. The modifier determines what the pee does.
- **Defense is strong.** Claims are hard to dislodge. Fortify and clustering make territories progressively more secure.
- **No basic income.** The board IS the economy. Territory holdings generate swagger. Dog parks generate bond. Water sources refill water. Home gives a full resupply but costs you your remaining movement.
- **Sidewalk only.** Players never step onto special spaces. All interaction happens from the adjacent sidewalk.
- **The leash is the joke.** You're a dog on a leash trying to execute grand strategy while being walked by an oblivious owner.

---

## 3. The Board

### 3.1 Board Topology

The board represents a neighbourhood of city blocks. Roads run between blocks. Sidewalks run along each block face. Players walk along sidewalks only.

All special spaces (territories, home turfs, dog parks, water sources, paths) are adjacent to sidewalk spaces. Players interact with them from the sidewalk — they never occupy these spaces directly.

**Sidewalks** — The movement layer. Players walk freely between connected sidewalk spaces.

**Roads** — Barriers between blocks. Cannot be walked along. Can be crossed:
- **Free at intersections.**
- **Mid-block crossing costs 1 Drive token.** Movement continues after crossing.

**Intersections** — Where roads meet. Free crossing in any direction.

### 3.2 Space Types

**Territory** — Residential properties: yard, driveway, house. Claimed from the adjacent sidewalk. Each territory holds 1 large pee disk (claim) and 1 small pee disk (fortify token).

**🏠 Home Turf** — One per player. Cannot be captured. Passing the adjacent sidewalk triggers full resupply, but the player must stop and forfeit remaining movement. Each home turf has exactly two adjacent territory spaces — the player's home neighbourhood. Placed at non-corner positions on the board.

**Paths** — Shortcut routes between two sidewalk spaces. When a player passes the entry sidewalk, they instantly move to the exit sidewalk and continue moving for remaining steps (snakes and ladders style).

**🐕 Dog Park** — Where alliances form. Passing the adjacent sidewalk gives 1 Bond token. If an active bond marker is present, passing triggers compulsory join. A player can stop here to initiate an alliance, ending their movement.

**💧 Water Sources** — Passing the adjacent sidewalk lets a player optionally drink. Costs 1 Drive (Scrapper: free). Tops up water to archetype max. Movement continues.

**🎲 Chance Spots / Events** — Not yet implemented.

### 3.3 Adjacency and the Cluster Rule

Territory spaces that share a sidewalk segment are adjacent. A connected group of 3 or more territories all owned by the same player triggers the **Cluster Rule**: ties in challenges go to the defender instead of re-rolling.

### 3.4 Home Neighbourhood

The two territory spaces immediately adjacent to a player's home turf are their **home neighbourhood**. This is what alliance protection covers, and what gets cleared when bonding.

---

## 4. Resources

### 4.1 Water Pegs (around bowl rim)

Bladder capacity. The universal fuel for all pee-based actions.

- Large pee actions cost 2 water.
- Small pee actions cost 1 water.
- Refilled to full at Home Turf (costs remaining movement).
- Topped up at Water Sources (costs 1 Drive, Scrapper: free).

### 4.2 Modifier Tokens (in bowl centre)

| Token | Shape | Role |
|-------|-------|------|
| **Swagger** 💪 | Bone | Territorial confidence. Spent on Claims, re-claims, breaking alliances. |
| **Drive** ⚡ | Stick | Energy. Spent on Challenges, road crossings, shortcuts, drinking. |
| **Grit** 🦴 | TBD | Defensive resolve. Spent on Fortify and re-claims. Accumulates from losing challenges. |
| **Bond** 🤝 | Heart | Social connection. Spent on initiating alliances. |

### 4.3 Archetype Starting Resources

Each archetype has one strength (3), two middling (2), and one weakness (1) across the four modifiers. Total always 8.

| Archetype | Water | Swagger | Drive | Grit | Bond |
|-----------|-------|---------|-------|------|------|
| Bruiser   | 6     | 3       | 2     | 2    | 1    |
| Scrapper  | 3     | 2       | 3     | 1    | 2    |
| Diplomat  | 4     | 2       | 1     | 2    | 3    |
| Yapper    | 4     | 1       | 2     | 3    | 2    |

Home resupply refills to these values. Board pickups can push above them — the archetype max is a soft cap for home resupply only.

### 4.4 Pee Disks

Pee disks go from the shared supply straight to the board. Never stored in the bowl.

- **Large pee disk** — Claim or Challenge. Costs 2 water.
- **Small pee disk** — Fortify or Alliance marker. Costs 1 water.

---

## 5. Archetypes

All archetypes roll **2d6** for movement and can take every action. Differentiation is starting resources only — no in-game action discounts.

**The Bruiser** 🐕‍🦺 — *Big. Confident. Marks like it owns the place.*
High water (6) and swagger (3). Low bond (1) — a natural loner. Steamrolls through early claiming.

**The Scrapper** 🐕 — *Small. Fast. Everywhere at once.*
High drive (3). Tiny bladder (3 water) — must manage resources carefully. Spreads wide and thin.

**The Diplomat** 🦮 — *Medium. Friendly. Everyone's best friend.*
High bond (3). Low drive (1) — can't roam far. Relies on alliances for protection.

**The Yapper** 🐩 — *Small. Loud. Annoying to mess with.*
High grit (3). Low swagger (1) — struggles to claim early. Takes territory through challenges, then digs in.

---

## 6. Economy

There is no basic income per turn. All resources come from the board.

**Home Turf** — Full resupply to archetype max. Costs remaining movement for that turn.

**Territory Holdings** — +1 Swagger per 3 connected territories, collected at start of your turn.

**Dog Park** — 1 Bond token when passing the adjacent sidewalk.

**Water Sources** — Top up water to archetype max. Costs 1 Drive (Scrapper: free).

**Conflict** — Lose a challenge: +1 Grit to the attacker.

**Chance Spots / Events** — Not yet implemented. Intended to be the primary source of Drive tokens during play.

### Economic Rhythm

Early game: near home, well-supplied, claiming nearby territories. Mid game: pushing out, crossing roads, managing drive for crossings and drinking. Late game: torn between holding distant territory and trekking home for a refill. Every walk is a supply run.

---

## 7. Action Recipes

| Action | Water | Modifier | Pee Disk | Target |
|--------|-------|----------|----------|--------|
| Claim | 2 | + 1 Swagger | Large | Empty adjacent territory |
| Challenge | 2 | + 1 Drive | Large | Occupied adjacent territory |
| Re-claim (after win) | — | + 1 Swagger OR 1 Grit | Challenge disk stays | Same territory |
| Fortify | 1 | + 1 Grit | Small | Your adjacent territory |
| Ally (initiate) | 1 | + 1 Bond | Small | Adjacent dog park |
| Ally (compulsory join) | 1 | — | Small (from bank) | Dog park being passed |
| Break alliance | 1 | + 1 Swagger | — | Adjacent dog park |
| Road crossing (mid-block) | — | 1 Drive | — | — |
| Drink water | — | 1 Drive (Scrapper: free) | — | Adjacent water source |
| Path shortcut | — | 1 Drive | — | Path entry sidewalk |

---

## 8. Challenge Resolution

### 8.1 Basic Roll

Both players roll 1d6. **Attacker must roll higher than defender to win.** Ties trigger a re-roll (see Cluster Rule exception).

### 8.2 Modifiers

**Fortify (defender).** +1 to defender's roll. Max 1 fortify token per territory.

**Cluster Rule (defender).** If the defender holds 3 or more connected territories including this one, ties go to the defender instead of re-rolling.

**Alliance protection (defender).** If the territory is in the defender's home neighbourhood and the attacker is bonded with the defender, the challenge is **illegal**.

**Home Turf (defender).** Cannot be captured. Challenges against home turfs are illegal.

**Attacker penalties.** None.

### 8.3 Challenge Sequence

1. Attacker pays: 2 water + 1 Drive. Large pee disk placed from supply.
2. Both roll 1d6. Apply modifiers.
3. **Attacker wins:** Defender's large pee disk and fortify token returned to supply. Attacker's challenge disk stays. Attacker may re-claim by spending 1 Swagger OR 1 Grit. If neither available, disk returned and territory sits empty.
4. **Attacker loses:** Attacker's disk returned to supply. Defender keeps everything. Attacker gains +1 Grit.
5. **Tie (no cluster):** Re-roll.
6. **Tie (cluster 3+):** Defender wins.

### 8.4 Outcome Costs

- **Full conquest** (win + re-claim): 2 water + 1 Drive + 1 Swagger or Grit.
- **Denial** (win, leave empty): 2 water + 1 Drive.
- **Failed challenge** (lose): 2 water + 1 Drive + 1 Grit penalty.

---

## 9. Movement

### 9.1 Core Rules

- Roll 2d6. Move along sidewalk spaces only.
- Can choose direction freely. Can backtrack. Must use full roll unless stopping at home turf or dog park (see §9.4).
- Special spaces are never occupied — interact with them from the adjacent sidewalk.

### 9.2 Road Crossings

- **Intersections:** Free in any direction.
- **Mid-block:** 1 Drive token. Movement continues afterward.

### 9.3 Pass-by Effects (movement continues)

- **Water Source:** Optional drink — spend 1 Drive (Scrapper: free), top up water to max.
- **Dog Park with active bond marker:** Compulsory join — spend 1 water.
- **Dog Park without bond marker:** Receive 1 Bond token.
- **Path entry:** Instantly move to path exit sidewalk, continue for remaining steps.

### 9.4 Stopping (forfeit remaining movement)

- **Home Turf adjacent sidewalk:** Full resupply.
- **Dog Park adjacent sidewalk:** Initiate alliance (this is your action for the turn).

---

## 10. Alliances

### 10.1 Forming an Alliance

1. A player initiates by spending 1 water + 1 Bond from a sidewalk adjacent to a dog park. Movement ends.
2. Any player who passes the adjacent sidewalk of an active dog park must join. Cost: 1 water. Movement continues.
3. Alliances can include 2, 3, or 4 players.

### 10.2 What Bonding Does

**Immediately on joining:** Any claims either player holds in the other's home neighbourhood are cleared — returned to empty. This is mutual and immediate.

**For the duration:** No bonded player can challenge another bonded player's claims in either player's home neighbourhood. Non-bonded players remain free to challenge those territories.

### 10.3 Breaking an Alliance

Any bonded player can spend 1 water + 1 Swagger from a sidewalk adjacent to the dog park. All bond markers returned. All protections end immediately.

---

## 11. Turn Structure

1. **Territory Income** — Collect Swagger: +1 per 3 connected territories owned.
2. **Roll and Move** — Roll 2d6. Move along sidewalks. Trigger pass-by effects as you go. Stop early at home or dog park if desired.
3. **Action Phase** — From stopping position, take one action targeting an adjacent space: Claim, Challenge, Fortify, Ally (initiate), or Break Alliance.
4. **Home Resupply** — If stopped at home turf's adjacent sidewalk: refill water + modifiers to archetype max.

**Turn order:** Random starting player. Fixed counterclockwise order based on home turf positions for the whole game.

---

## 12. Win Conditions

1. Hold **15 non-home territories** at the end of any turn.
2. **Last player** with non-home territory.
3. After **30 turns**: most territory wins. Ties: most Fortify tokens, then highest Swagger.

---

## 13. Components

- 1 Neighbourhood game board
- 4 Dog breed cards
- 4 Dog figurines (player colours)
- 4 Dog Bowls (unique per archetype)
- Water pegs (blue) — shared supply
- Swagger tokens (bone-shaped) — shared supply
- Drive tokens (stick-shaped) — shared supply
- Grit tokens — shared supply
- Bond tokens (heart-shaped) — shared supply
- Large pee disks in 4 player colours — shared supply
- Small pee disks in 4 player colours — shared supply
- 1 Water Chance deck (24 cards)
- 1 Chance deck (24 cards)
- 1 Neighbourhood Events deck (24 cards)
- 2 Six-sided dice
- Rules booklet

---

## 16. Science References

- Quaranta, A. et al. (2025). "Decoding dog communication through the physiology and behavior of urine marking." Scientific Reports.
- Dzieciol, M. et al. (2018). "Identification of putative volatile sex pheromones in female domestic dogs." Animal Reproduction Science.
- McGuire, B. and Bemis, K.E. (2017). "Scent marking in shelter dogs: effects of body size." Applied Animal Behaviour Science.
- Lisberg, A.E. and Snowdon, C.T. (2011). "Effects of sex, social status and gonadectomy on countermarking by domestic dogs." Animal Behaviour.
- Schultz, T.H. et al. (1985). "Some volatile constituents of female dog urine." Journal of Chemical Ecology.
