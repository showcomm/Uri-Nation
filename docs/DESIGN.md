# Uri-Nation — Game Design Document

**Version:** 1.0
**Date:** 2026-02-17

---

## 1. Concept

Uri-Nation is a 2–4 player neighbourhood territory control game where each player is a dog on a walk. Players mark territory with urine, challenge other dogs' claims, form alliances, and try to dominate the neighbourhood — or push opponents back to their own backyards.

Grounded in real canine chemical communication research (dogs really do encode identity, status, stress, and social intent in urine chemistry). Presented with accessible, humorous mechanics.

---

## 2. Core Design Principles

- **Same actions for everyone.** Every archetype can Claim, Challenge, Fortify, Ally, and use shortcuts. No exclusive abilities. Differentiation is through cost discounts and resource income profiles (Path B).
- **Open information.** All claims are visible. Fortify tokens are visible. Bond space alliances are visible. No hidden state to track.
- **No decay.** Marks stay permanently until challenged off. No bookkeeping for mark aging.
- **Everything is physical tokens.** No cards for resources. Bones, sticks, hearts, grit tokens, water pegs — all tactile pieces you collect, store in your bowl, and spend. The game state is entirely visible on the table.
- **Pee + modifier = action.** Two sizes of pee disk (large and small) combined with different modifier tokens create all actions. Context determines what a pee does.
- **Compulsory bonding.** Dogs can't help sniffing and marking a hydrant another dog has marked. Passing a bond space with tokens on it forces you to join the alliance.
- **The leash is the joke.** You're a dog on a leash trying to execute grand strategy while being walked by an oblivious owner. Movement constraints are comedic.

---

## 3. The Board

### 3.1 Board Topology

The board represents a neighbourhood with three distinct space types:

**Paths** — The walk routes. Your owner walks you along these. Paths form a main loop through the neighbourhood with side streets and shortcuts branching off. You move along paths; you do not claim them. The path is the sidewalk.

**Territory spaces** — Branch off the paths. These are the yards, trees, poles, fences, and patches along the route. Players claim these by placing large pee disks. Each territory space can hold one large pee disk and up to 3 fortify tokens.

**Bond spaces** — Fixed infrastructure along the paths: fire hydrants, bus stops, park benches, lamp posts. Visually represented as small circles with radiating lines indicating their area of influence (which adjacent territories they connect to). Bond spaces are NOT claimable — they are where alliances are physically anchored. Like the railways of Monopoly.

### 3.2 Special Spaces

**🏠 Home Turf** — 4 locations, one per player, spaced around the main loop. Passing through your own Home Turf refills water to full for free (no Drive cost) and triggers income. +3 defense if challenged. Marks revert to owner after 1 turn if taken. Worth 0 VP.

**💧 Water Sources** — 4–5 scattered around the board, intersecting path spaces. Varied appearances: puddles, ditches, garden taps, neighbour's bowls. Drinking costs 1 Drive token (Scrapper: free) and triggers a Water Chance deck draw.

**📰 Neighbourhood Events** — One location on the main loop. Draw a card when passing through.

### 3.3 Adjacency and Defense

Territory spaces connected to the same path segment or bond space are adjacent. A claimed territory gets +1 defense for each adjacent friendly territory, max +3.

Build connected clusters, not scattered outposts. Attack clusters from the edges where the bonus is weakest.

### 3.4 Bond Spaces — Areas of Influence

Bond spaces (fire hydrants, bus stops, etc.) have printed radiating lines connecting them to nearby territory spaces. These lines define the bond's area of influence.

When two or more players are bonded at a bond space, none of them can challenge each other's claims on any territory connected to that bond space. The bond projects a demilitarized zone over its connected territories.

6–8 bond spaces on the board. Their placement relative to territory clusters and home turfs is a major design lever — they create natural alliance corridors and diplomatic flashpoints.

### 3.5 Board Design Open Questions

- Exact space count and topology
- Number and placement of side streets and shortcuts
- Water Source placement relative to Home Turfs and contested zones
- Bond space placement — near borders? Near water? Clustered or distributed?
- Whether main loop direction is fixed or reversible

---

## 4. Resources — All Physical Tokens

All resources are physical tokens stored in or around the player's dog bowl. No cards. Everything is tactile and visible.

### 4.1 Water Pegs 💧 (blue pegs, around bowl rim)

Bladder capacity. Every pee-based action costs 1 water peg. The universal fuel of the game.

- Refilled to full at Home Turf (free).
- Refilled variably at Water Sources (costs 1 Drive token, draw Water Chance card).
- Scrapper drinks free (no Drive cost).

### 4.2 Modifier Tokens (stored in bowl centre)

Five types of modifier tokens, each with a distinct physical shape:

| Token | Icon | Shape | Role |
|-------|------|-------|------|
| **Swagger** 💪 | Bone | Small bone shape | Territorial confidence. Modifier for Claims and re-claims. |
| **Drive** ⚡ | Stick | Small stick shape | Energy and aggression. Modifier for Challenges, shortcuts, and drinking. |
| **Grit** 🦴 | TBD | TBD | Defensive resolve. Modifier for Fortify. The hackles-up, planted-feet stance. |
| **Bond** 🤝 | Heart | Small heart shape | Social connection. Modifier for initiating an Ally bond. |
| **Water** 💧 | Peg | Blue peg in bowl rim | Activates all pee. See 4.1. |

**Note on Grit:** Working name. Represents the stiff-legged, low-growl defensive posture — not aggressive (that's Drive), not confident (that's Swagger), just stubborn refusal to move. Other candidates: Bark, Stand, Bristle, Guard, Feisty. Final name TBD.

### 4.3 Pee Disks (two sizes)

**Large pee disk** — Puddle-shaped disk in player colour. Used for Claims and Challenges on territory spaces. The main board presence token.

**Small pee disk** — Smaller puddle-shaped disk in player colour. Used for Fortify and Ally actions. Also used as compulsory bond markers (provided from the bank when a player passes an active bond space).

---

## 5. The Dog Bowl

Each player's personal dashboard is an oversized dog bowl, unique to their archetype.

### 5.1 Physical Design

- **Peg holes around the rim** — for water pegs (blue) only. Represent bladder capacity. Remove a peg when performing any pee-based action. Refill by drinking or passing home.
- **Centre dish** — holds all modifier tokens (swagger bones, drive sticks, grit tokens, bond hearts), stockpiled pee disks (large and small), and any other game pieces.
- **Colour-coded** to match player colour — the bowl IS your colour reference at the table.
- Each breed's bowl could be styled differently (Bruiser: chunky/oversized, Scrapper: small/shallow, Diplomat: elegant, Yapper: jagged rim). Art direction TBD.

### 5.2 Bowl Configurations by Archetype

| Archetype | Water Peg Holes | Notes |
|-----------|----------------|-------|
| Bruiser   | 6              | Big bladder. Fewer trips to water. |
| Scrapper  | 3              | Tiny bladder. Constantly drinking. |
| Diplomat  | 4              | Medium bladder. |
| Yapper    | 4              | Medium bladder. |

Drive is no longer tracked by pegs on the rim — Drive tokens (sticks) sit in the bowl centre with all other modifier tokens.

### 5.3 Design Notes

- Bowl peg layout (water only around rim) is readable at a glance across the table — you can see who's running low on bladder.
- Modifier tokens in the centre are visible but less countable at distance — you'd need to look into someone's bowl to assess their stockpile. This creates natural fog of war without hidden information.
- The dog figurine sits on the board; the bowl sits in front of the player. Everything about your dog's state is in one physical object.

---

## 6. Action Recipes

All actions are built from pee disks + water + modifier tokens. Water activates the pee. The modifier determines what the pee does.

### 6.1 Recipe Table

| Action | Pee Disk | Water | Swagger | Drive | Grit | Bond | Result |
|--------|----------|-------|---------|-------|------|------|--------|
| **Claim** | Large | 1 | 1 | — | — | — | Place on empty territory. |
| **Challenge** | Large | 1 | — | 1 | — | — | Place on occupied territory. Roll to clear. |
| **Re-claim after win** | — | 1 | 1 | — | — | — | After winning a challenge, spend water + swagger to keep the territory. Uses the same large pee disk (it stays on the space). |
| **Fortify** | Small | 1 | — | — | 1 | — | Add defense to your claimed territory. |
| **Ally (initiate)** | Small | 1 | — | — | — | 1 | Place on bond space. Sets the trap. |
| **Ally (compulsory join)** | Small (from bank) | 1 | — | — | — | — | Passing an active bond space. No modifier needed. Bank provides the small pee. |
| **Break alliance** | Small | 1 | 1 | — | — | — | Destroy entire bond stack. All markers returned to bank. |
| **Shortcut** | — | — | — | 1/space | — | — | Move off main loop. |
| **Drink water** | — | — | — | 1 | — | — | Use a Water Source. Scrapper: free. |

### 6.2 Recipe Logic

Every pee-based action needs water (you can't pee with an empty bladder). The modifier token determines intent:

- **Swagger** = confidence → claiming territory, re-claiming after a fight, breaking alliances
- **Drive** = energy/aggression → challenging, moving off-path, seeking water
- **Grit** = defensive resolve → fortifying your position
- **Bond** = social → initiating alliances

This means each modifier token has a clear identity and players can read intentions by watching what tokens others are collecting.

### 6.3 Archetype Discounts

| Archetype | Discount |
|-----------|----------|
| **Bruiser** | Claims cost no Swagger (large pee + water only). |
| **Scrapper** | Drinking costs no Drive. |
| **Diplomat** | Ally initiation costs no Bond (small pee + water only). Alliances must be joined for at least 1 turn by passing players (forced ceasefire). Challenges at −1 to attack roll. |
| **Yapper** | Fortify costs no Grit (small pee + water only). Attackers gain +1 Grit token debt (or equivalent penalty) when challenging Yapper claims. |

---

## 7. Archetypes and Breeds

### 7.1 Archetype System (Path B)

Four archetypes define gameplay. Each has a unique income profile (tokens received at home) AND one cost discount on recipes. Breeds are flavour — the picture on the card, a bio, maybe a minor once-per-game ability. Any dog breed can be any archetype.

### 7.2 The Four Archetypes

**The Bruiser** 🐕‍🦺
- Bowl: 6 water pegs.
- Walk: 1d6.
- Home Income: Swagger ×3, Grit ×0, Bond ×1, Drive ×1 | Water: refill to full.
- Discount: Claims cost no Swagger.
- Identity: Dominates the main path. Claims constantly and cheaply. Low Drive means it sticks to the main loop. Steamroller on rails.

**The Scrapper** 🐕
- Bowl: 3 water pegs.
- Walk: 2d6.
- Home Income: Swagger ×1, Grit ×1, Bond ×1, Drive ×3 | Water: refill to full.
- Discount: Drinking costs no Drive.
- Identity: Fastest mover. Explores the whole board. Tiny bladder keeps it hunting for water, but free drinking means all Drive goes to shortcuts and challenges. Spreads wide and thin.

**The Diplomat** 🦮
- Bowl: 4 water pegs.
- Walk: 1d6+2.
- Home Income: Swagger ×1, Grit ×0, Bond ×3, Drive ×1 | Water: refill to full.
- Discount: Ally initiation costs no Bond. Forced ceasefire on passing players.
- Constraint: Challenges at −1 to attack roll.
- Identity: Kingmaker. Bonds everywhere. Relies on allies for protection. Weak alone but makes itself indispensable.

**The Yapper** 🐩
- Bowl: 4 water pegs.
- Walk: 1d6.
- Home Income: Swagger ×1, Grit ×2, Bond ×1, Drive ×2 | Water: refill to full.
- Discount: Fortify costs no Grit. Attackers penalized when challenging Yapper claims.
- Identity: Turtle fortress builder. Must fortify constantly or Grit piles up unused. Stays close to home, builds walls, waits for others to exhaust themselves.

### 7.3 Income Summary

| Archetype | Swagger | Grit | Bond | Drive | Water | Total Tokens |
|-----------|---------|------|------|-------|-------|-------------|
| Bruiser   | 3       | 0    | 1    | 1     | Full (6) | 5 + water |
| Scrapper  | 1       | 1    | 1    | 3     | Full (3) | 6 + water |
| Diplomat  | 1       | 0    | 3    | 1     | Full (4) | 5 + water |
| Yapper    | 1       | 2    | 1    | 2     | Full (4) | 6 + water |

**Territory bonus:** For every 3 connected territories held (excluding Home Turf), +1 modifier token of player's choice.

**Desperation bonus:** Fewer than 3 non-home territories = +2 Grit (defensive resource, but penalizes challenge rolls if held above 5).

### 7.4 Design Notes on Archetypes

The four-way dynamic: Bruiser threatens with power, Scrapper with speed, Diplomat with alliances, Yapper with attrition. No archetype hard-counters another. Income profiles create natural playstyles; discounts amplify them.

Total modifier token income per home pass is 5–6 tokens, weighted differently. Everyone refills water to full at home — the difference is bladder size (how many actions per fill) and how easily you can refill away from home (Scrapper drinks free).

---

## 8. Actions in Detail

### 8.1 Claim

**Recipe:** Large pee + 1 water + 1 swagger. (Bruiser: no swagger needed.)

Place a large pee disk on an **empty** territory space adjacent to your path position. Defense base value = 1. Build clusters for adjacency bonuses.

### 8.2 Challenge

**Recipe:** Large pee + 1 water + 1 drive.

Place a large pee disk on an **occupied** territory space adjacent to your path position. This is the over-pee.

**Step 1 — Roll.** Contested d6 roll:
- Attacker: d6 − Grit penalty (if Grit tokens held > 5, subtract excess). Diplomat: additional −1.
- Defender: d6 + Fortify tokens (small pees on space) + adjacency bonus (max +3) + Home Turf (+3) + Alliance protection (+1 per alliance at adjacent bond space).
- Attacker must beat defender. Ties to defender.

**Step 2 — Resolution.**
- **Attacker wins:** Both large pee disks cancel out and are destroyed (returned to the bank). All fortify tokens (small pees) on that space are also removed. The territory is now empty. The attacker may immediately **re-claim** by spending 1 water + 1 swagger — the surviving large pee disk stays (or a new one is placed). 
- **Attacker loses:** Attacker's large pee disk is destroyed. Defender's disk and fortify tokens remain. Attacker gains +1 Grit token (humiliation/stress).

**Three possible outcomes:**
- Win + have swagger + have water → **Full conquest.** Costs: 1 large pee + 2 water + 1 drive + 1 swagger.
- Win + no swagger or water → **Denial.** Territory cleared but unclaimed. Costs: 1 large pee + 1 water + 1 drive.
- Lose → **Wasted.** Disk destroyed, +1 Grit. Costs: 1 large pee + 1 water + 1 drive.

Attacking a Yapper's claim: attacker takes +1 additional Grit token win or lose.

### 8.3 Fortify

**Recipe:** Small pee + 1 water + 1 grit. (Yapper: no grit needed.)

Deploy a small pee disk on one of your claimed territories adjacent to your path position. Max 3 fortify tokens (small pees) per territory. Each adds +1 defense.

### 8.4 Ally (Initiate)

**Recipe:** Small pee + 1 water + 1 bond. (Diplomat: no bond needed.)

Place a small pee disk on a bond space adjacent to your path position. This sets the trap — an open invitation that other dogs can't resist.

### 8.5 Ally (Compulsory Join)

**Trigger:** Any player passing through a bond space that has at least one small pee disk on it.

**Cost:** 1 water peg only. The bank provides a small pee disk in the passing player's colour, which is added to the bond space.

The passing player has no choice — dogs can't help marking a hydrant another dog has marked. This is involuntary. The only way to avoid joining is to not walk past the bond space.

Once joined, the player is part of the alliance. All bonded players at that space cannot challenge each other's claims on territories connected to that bond space.

Alliances can be 2, 3, or 4 players. Every player who passes adds their marker.

### 8.6 Break Alliance

**Recipe:** Small pee + 1 water + 1 swagger.

On your turn, spend the recipe to destroy the **entire bond stack** at a bond space where you have a marker. All small pee disks (from all players) are returned to the bank. The alliance is dissolved. All territories in that bond space's area of influence are now open for challenges.

Any bonded player can break it. This creates a game of chicken — everyone benefits from the protection, but eventually someone has to pay swagger to end it.

### 8.7 Pass

Do nothing. Walk away.

---

## 9. Movement

### 9.1 Persistent Position

Dog figurines stay on the board between turns. You are always somewhere on a path. Next turn, continue from where you stopped.

### 9.2 The Main Loop

Owner walks the loop. Player chooses direction at game start (fixed for the game). Roll and advance each turn. Can stop early.

### 9.3 Shortcuts (Leash Pull)

At any junction, may leave the main path onto side streets or shortcuts. **Costs 1 Drive token per space off the main loop.** This represents pulling your owner off their usual route.

Returning to the main loop is free — just move toward it on a subsequent turn.

### 9.4 Passing Through

Water Sources and Events squares trigger when passed through (drinking is optional, costs 1 Drive token — Scrapper: free). Bond spaces with active alliances trigger compulsory join (costs 1 water peg). Claim/Fortify/Ally actions only at your stopping position.

---

## 10. Water and Bladder

### 10.1 Core Rule

Bladder (water pegs) does NOT auto-refill. The only ways to restore water pegs:

- **Home Turf:** Pass through your own home → refill to full. Free. No Drive cost.
- **Water Source:** Stop and drink → costs 1 Drive token (Scrapper: free) → draw from Water Chance deck.

### 10.2 Water Chance Deck (24 cards)

| Grade | Count | Effect |
|-------|-------|--------|
| 💎 Clean | ~5 cards | Full refill. Possible +1 Bond token bonus. |
| 👍 Decent | ~8 cards | Half refill (rounded up). No side effects. |
| 😬 Questionable | ~7 cards | Half refill + penalty (+1 Grit token, or −1 Drive token, or −1 Swagger token). |
| ☠️ Terrible | ~4 cards | No refill + penalty (+2 Grit tokens, or lose 1 water peg for this cycle, or skip next action). |

Drinking is always optional. You may pass through a Water Source and choose not to drink.

### 10.3 Strategic Implications

- Home water is free and full but requires routing through home.
- Water Sources cost Drive and carry risk.
- Bruiser (6 water pegs) can do 6 pee-based actions before refilling. A full conquest costs 2 water — Bruiser can do 3 full conquests per fill.
- Scrapper (3 water pegs) empties fast but drinks free. Constant water hunting without the Drive tax.
- Controlling territories around a Water Source forces opponents into your zone to drink.
- Fortify costs water (it's a small pee) — even defense drains the bladder.

---

## 11. Turn Structure

1. **Income Phase** (at home only). When you pass or land on your Home Turf: collect modifier tokens based on breed income + territory bonuses. Refill water pegs to full.
2. **Roll and Move.** Roll walk dice. Advance along path. Spend Drive tokens for shortcuts. Optionally drink at Water Sources (costs 1 Drive, Scrapper free). Compulsory ally join at active bond spaces (costs 1 water). Trigger Events square.
3. **Action Phase.** At your stopping position: Claim, Challenge, Fortify, Ally, Break Alliance, or Pass. Spend pee disks + water + modifiers as required by the recipe.
4. **Maintenance.** Housebound check.

**Turn order:** Player with least territory goes first (catch-up mechanic). Ties: roll off.

**Note:** Income only happens when passing home — not every turn. This makes the loop circuit the fundamental rhythm of the game. Plan your actions around your next home pass.

---

## 12. Win Conditions

1. Hold **10 non-home territories** at end of any turn.
2. **Last player** with non-home territory.
3. After **30 turns**: most territory. Ties: most Fortify tokens, then highest Swagger tokens.

Housebound (0 non-home territories for 2 turns): walk halved, no territory bonuses. Recover by claiming any territory.

---

## 13. Neighbourhood Events Deck (24 cards)

Drawn when landing on or passing through the Events square.

Categories: Weather (affect all), Personal (affect drawer), Neighbourhood (affect board state). Some cards are HOLD (play when chosen, max 2 in hand).

Can create/remove temporary Water Sources, block paths, reset marks, award or remove modifier tokens.

---

## 14. Components List

- 1 Neighbourhood game board (paths, territory spaces, bond spaces, water sources, events square)
- 4 Dog breed cards (with income profile, description, strategy tips)
- 4 Dog figurines (player colours)
- 4 Dog Bowls (unique per archetype, colour-coded, water peg holes around rim, centre dish for token storage)
- Water pegs (blue) — 6 per player (Bruiser uses all 6, others cap lower)
- Swagger tokens (bone-shaped) — shared supply
- Drive tokens (stick-shaped) — shared supply
- Grit tokens (TBD shape) — shared supply
- Bond tokens (heart-shaped) — shared supply
- Large pee disks (puddle-shaped) in 4 player colours — for Claims and Challenges
- Small pee disks (smaller puddle-shaped) in 4 player colours — for Fortify, Ally, and compulsory bond markers
- Additional small pee disks in 4 player colours — bank supply for compulsory bond joins
- 1 Neighbourhood Events deck (24 cards)
- 1 Water Chance deck (24 cards)
- 2 Six-sided dice
- Rules booklet

---

## 15. Walk Tricks (Optional Module)

Agree before game. Each is once-per-game unless noted.

- **Pull the Leash** — Spend 2 Drive tokens, +3 walk roll. Narrate what dog lunged at.
- **Distracted Owner** — Roll doubles = +2 spaces, may reverse direction.
- **Zoomies** (Scrapper) — Triple walk roll, no action this turn.
- **Butt Sniff Diplomacy** (Diplomat) — Adjacent to another pawn, both reveal bowl contents. Free.
- **Paranoid Patrol** (Yapper) — Fortify all own claims within 3 spaces. Free (still costs small pee + water per fortify).
- **Leg Day** (Bruiser) — Claim or Challenge from 2 spaces away.

---

## 16. Science References

- Quaranta, A. et al. (2025). "Decoding dog communication through the physiology and behavior of urine marking." Scientific Reports.
- Dzieciol, M. et al. (2018). "Identification of putative volatile sex pheromones in female domestic dogs." Animal Reproduction Science.
- McGuire, B. and Bemis, K.E. (2017). "Scent marking in shelter dogs: effects of body size." Applied Animal Behaviour Science.
- Lisberg, A.E. and Snowdon, C.T. (2011). "Effects of sex, social status and gonadectomy on countermarking by domestic dogs." Animal Behaviour.
- Schultz, T.H. et al. (1985). "Some volatile constituents of female dog urine." Journal of Chemical Ecology.

---

## 17. Open Design Questions and Next Steps

### Balance Tuning (needs simulator)
- Recipe costs — are the 1-modifier-per-action costs right? Should Challenge cost more Drive?
- Income profiles — 5-6 tokens per home pass. Need testing to confirm pacing.
- Stockpile limits — currently unlimited. Self-regulating via water drain and adjacency defense?
- Adjacency bonus cap — +3 may be too strong for Yapper fortress strategy.
- Water Chance deck distribution — 4 Terrible in 24 cards — right?
- 30-turn game length — right pace?
- Win threshold of 10 territories — right for new board topology?
- Full conquest cost (1 large pee + 2 water + 1 drive + 1 swagger) — balanced?
- Grit penalty threshold — 5 Grit tokens held triggers challenge penalty. Right number?
- Territory bonus rate — +1 token per 3 connected territories. Too slow? Too fast?
- Compulsory bond economics — is 1 water the right cost for forced join?

### Board Design (needs prototyping)
- Exact topology of main loop, side streets, and shortcuts.
- Territory space count and distribution along paths.
- Bond space placement (6–8 total) — near borders? Near water? Creating alliance corridors?
- Bond space routing — can players route around bond spaces to avoid compulsory joins?
- Water Source placement relative to Home Turfs and contested zones.
- How many territories connect to each bond space (area of influence size)?
- Whether shortcuts create degenerate movement patterns.

### Component Design
- Bowl styling per archetype — art direction TBD.
- Large pee disk shape — puddle confirmed. Exact design TBD.
- Small pee disk shape — smaller puddle. Exact design TBD.
- Grit token — name and shape TBD. Working name "Grit." Alternatives: Bark, Stand, Bristle, Guard, Feisty.
- Bond space iconography — fire hydrants, bus stops, lamp posts with radiating influence lines.
- Token material — wood? Plastic? Cardboard punch-outs?

### Simulator Requirements
- Web-based, adjustable parameters for all income rates, recipe costs, deck distributions.
- Model the unified token economy: modifier tokens + water pegs + two pee disk sizes.
- Model compulsory bond joining and alliance breaking.
- Automated play with simple AI strategies (aggressive, defensive, balanced, random).
- Output: average game length, win rate by archetype, average territory held, resource utilization, stockpile patterns, water refill frequency, challenge success rates, alliance duration.
- Goal: find parameter ranges where all four archetypes are competitive and games end in 20–40 turns.

### Future Expansion Ideas
- New breed cards (flavour + minor ability) for existing archetypes.
- Fifth archetype?
- Solo mode with automated opponent.
- Campaign mode (series of games, persistent neighbourhood).
- Physical prototype for playtesting.
- Digital version (board topology is graph-based, translates well).
