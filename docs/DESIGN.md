# Uri-Nation — Game Design Document

**Version:** 1.2.2
**Date:** 2026-02-18

---

## 1. Concept

Uri-Nation is a 2–4 player neighbourhood territory control game where each player is a dog on a walk. Players mark territory with urine, challenge other dogs' claims, form alliances, and try to dominate the neighbourhood — or push opponents back to their own backyards.

Grounded in real canine chemical communication research (dogs really do encode identity, status, stress, and social intent in urine chemistry). Presented with accessible, humorous mechanics.

---

## 2. Core Design Principles

- **Same actions for everyone.** Every archetype can Claim, Challenge, Fortify, Ally, and use shortcuts. No exclusive abilities. Differentiation is through cost discounts, modifier maxes, and board economy.
- **Open information.** All claims are visible. Fortify tokens are visible. Bond space alliances are visible. No hidden state to track.
- **No decay.** Marks stay permanently until challenged off. No bookkeeping for mark aging.
- **Everything is physical tokens.** No cards for resources. Bones, sticks, hearts, grit tokens, water pegs — all tactile pieces you collect, store in your bowl, and spend.
- **Pee = water. Modifiers = intent.** Actions that place pee disks cost water (removed from bowl rim) plus a modifier token. The water IS the pee. The modifier determines what the pee does.
- **Defense is strong.** Claims are hard to dislodge. Fortify and clustering make territories progressively more secure. Offense requires real commitment.
- **No basic income.** The board IS the economy. Territory holdings generate swagger. Chance spots generate drive. The dog park generates bond. Grit accumulates from conflict. Home gives a full resupply but takes you away from the action.
- **Compulsory bonding.** Dogs can't help sniffing and marking a hydrant another dog has marked. Passing a bond space with tokens on it forces you to join the alliance.
- **The leash is the joke.** You're a dog on a leash trying to execute grand strategy while being walked by an oblivious owner.

---

## 3. The Board

### 3.1 Board Topology — The Neighbourhood Street

The board represents a neighbourhood street with **two sidewalks separated by a road**. This is the core spatial mechanic — the road is a barrier.

**Sidewalks** — Two parallel walking paths, one on each side of the road. Players walk freely in either direction along their sidewalk. Territory spaces, bond spaces, water sources, and chance spots branch off from the sidewalks.

**The Road** — Barrier between the two sidewalks. Cannot be walked along. Can be crossed:
- **Free at intersections.** Your owner naturally crosses at corners.
- **Mid-block crossing costs 1 Drive token.** Treated like a shortcut — you're dragging your owner across traffic. Can happen mid-roll (e.g., roll 6, walk 3, pay Drive, cross, continue 3 on the other side).

**Side streets** — Branch off perpendicular to the main sidewalks. Costs 1 Drive token per space to enter (shortcut rules). May dead-end in cul-de-sacs with clustered territories.

**Intersections** — Where side streets meet the main road. Free crossing points. High-traffic strategic positions.

### 3.2 Space Types

**Territory spaces** — Branch off the sidewalks. Yards, trees, poles, fences, driveways. Players claim these by placing large pee disks. Each territory space can hold one large pee disk and up to 3 fortify tokens (small pee disks).

**Bond spaces** — Fixed infrastructure along the sidewalks: fire hydrants, bus stops, park benches, lamp posts. Visually represented as small circles with radiating lines indicating their area of influence (which adjacent territories they connect to). Bond spaces are NOT claimable — they are where alliances are physically anchored.

**🏠 Home Turf** — 4 locations, one per player, each on a specific side of the road. Your home determines your starting sidewalk. Passing through refills water to full and refills all modifier tokens to your archetype max. +3 to defender's roll if challenged. Marks revert to owner after 1 turn if taken. Worth 0 VP.

**💧 Water Sources** — 4–5 scattered on both sides of the road. Puddles, ditches, garden taps, neighbour's bowls. Drinking costs 1 Drive token (Scrapper: free) and triggers a Water Chance deck draw.

**🎲 Chance Spots** — 4–6 locations around the board. Garbage bins, café scraps, back alleys, interesting smells. Pass through to draw a Chance card. Primary source of Drive tokens and other modifiers during play.

**🐕 Dog Park** — 1 location on the board. The only reliable source of Bond tokens outside of home. Pass through to receive 1 Bond token.

**📰 Neighbourhood Events** — 1 location on the main sidewalk. Draw an Events card when passing through.

### 3.3 Adjacency and Connected Territories

Territory spaces connected to the same path segment or bond space are adjacent. Adjacency matters for one key rule:

**The Cluster Rule:** If the defender holds **3 or more connected friendly territories** (including the one being challenged), **ties go to the defender** instead of triggering a re-roll. This is the reward for building clusters rather than scattering claims.

This is a binary check (3+ connected or not), not a sliding scale.

### 3.4 Bond Spaces — Areas of Influence

Bond spaces have printed radiating lines connecting them to nearby territory spaces. These define the bond's area of influence.

When two or more players are bonded at a bond space, none of them can challenge each other's claims on any territory connected to that bond space. The bond projects a demilitarized zone.

6–8 bond spaces on the board. Their placement relative to territory clusters and home turfs creates natural alliance corridors and diplomatic flashpoints.

### 3.5 Movement Rules

- **Direction is free.** At the start of each roll, choose which direction to walk. You can backtrack.
- **Your sidewalk is free.** Walk in either direction along the sidewalk your dog is currently on.
- **Intersections are free crossings.** Cross the road at any intersection at no cost.
- **Mid-block crossing costs 1 Drive.** Cross the road between intersections by spending 1 Drive token. Can happen mid-roll.
- **Side streets cost 1 Drive per space.** Same as shortcut rules.
- **Can stop early.** Don't have to use your full roll.

---

## 4. Resources — All Physical Tokens

All resources are physical tokens stored in or around the player's dog bowl. No cards for resources.

### 4.1 Water Pegs 💧 (blue pegs, around bowl rim)

Bladder capacity. Water is what makes pee — large pee actions cost 2 water, small pee actions cost 1 water. The universal fuel.

- Refilled to full at Home Turf (free).
- Refilled variably at Water Sources (costs 1 Drive token, draw Water Chance card).
- Scrapper drinks free (no Drive cost).

### 4.2 Modifier Tokens (stored in bowl centre)

Four types of modifier tokens, each with a distinct physical shape:

| Token | Icon | Shape | Role |
|-------|------|-------|------|
| **Swagger** 💪 | Bone | Small bone shape | Territorial confidence. Modifier for Claims, re-claims, breaking alliances. |
| **Drive** ⚡ | Stick | Small stick shape | Energy and aggression. Modifier for Challenges, road crossings, shortcuts, drinking. |
| **Grit** 🦴 | TBD | TBD | Defensive resolve. Modifier for Fortify and re-claims. The hackles-up, planted-feet stance. |
| **Bond** 🤝 | Heart | Small heart shape | Social connection. Modifier for initiating an Ally bond. |

**Note on Grit:** Working name. Represents the stiff-legged, low-growl defensive posture — not aggressive (that's Drive), not confident (that's Swagger), just stubborn refusal to move. Other candidates: Bark, Stand, Bristle, Guard, Feisty. Final name TBD.

### 4.3 Pee Disks (two sizes)

Pee disks are coloured markers that go straight from the shared supply to the board when you take an action. They are never stored in your bowl — pee belongs on the board, not in a dish. The water cost is paid at the moment you take the action (remove pegs from your bowl rim).

**Large pee disk** — Puddle-shaped disk in player colour. Placed on the board when you Claim or Challenge (costs 2 water pegs from your bowl rim, plus a modifier token).

**Small pee disk** — Smaller puddle-shaped disk in player colour. Placed on the board when you Fortify, Ally, or Break Alliance (costs 1 water peg, plus a modifier token). Also used as compulsory bond markers (provided from the bank when passing an active bond space, costs 1 water).

### 4.4 Modifier Token Maxes by Archetype

Home refills modifier tokens **up to your archetype max.** Board pickups (chance cards, dog park, territory bonuses) can push you above your home max — the max is a soft cap for home resupply only.

| Archetype | Swagger | Drive | Grit | Bond | Total |
|-----------|---------|-------|------|------|-------|
| Bruiser   | 3       | 2     | 2    | 1    | 8     |
| Scrapper  | 2       | 3     | 1    | 2    | 8     |
| Diplomat  | 2       | 1     | 2    | 3    | 8     |
| Yapper    | 1       | 2     | 3    | 2    | 8     |

Each archetype has one strength (3), two middling (2), and one weakness (1). Total always 8.

**Weakness creates identity:**
- Bruiser (1 Bond): natural loner, worst at alliances
- Scrapper (1 Grit): fast but fragile, can't stockpile fortifications from home
- Diplomat (1 Drive): stuck on its side of the road, dependent on allies
- Yapper (1 Swagger): terrible at claiming, must turtle and wait

**Discounts compensate:**
- Bruiser doesn't need swagger to claim → 3 swagger is pure surplus for re-claims and breaking alliances
- Scrapper drinks free → 3 Drive all goes to shortcuts and challenges
- Diplomat doesn't need bond to initiate alliances → 3 bond is pure surplus
- Yapper doesn't need grit to fortify → 3 grit all goes to re-claims

---

## 5. The Dog Bowl

Each player's personal dashboard is an oversized dog bowl, unique to their archetype.

### 5.1 Physical Design

- **Peg holes around the rim** — for water pegs (blue) only. Represent bladder capacity. Remove pegs when taking pee-based actions (2 for large pee actions, 1 for small). Refill by drinking or passing home.
- **Centre dish** — holds all modifier tokens (swagger bones, drive sticks, grit tokens, bond hearts). Pee disks are kept in a shared supply, not in the bowl.
- **Colour-coded** to match player colour.
- Each breed's bowl styled differently (Bruiser: chunky/oversized, Scrapper: small/shallow, Diplomat: elegant, Yapper: jagged rim). Art direction TBD.

### 5.2 Bowl Configurations by Archetype

| Archetype | Water Peg Holes |
|-----------|----------------|
| Bruiser   | 6              |
| Scrapper  | 3              |
| Diplomat  | 4              |
| Yapper    | 4              |

---

## 6. Economy — The Board as Income

There is **no basic income per turn.** All resources come from the board.

### 6.1 Income Sources

**Home Turf (full resupply):**
- Refill water pegs to full.
- Refill all modifier tokens to archetype max.
- Strategic trade-off: home is safe but takes you away from the action.

**Territory Holdings (swagger):**
- +1 Swagger token per 2–3 connected territories held, collected at start of your turn.
- The more you own, the more confident you are. Own nothing, get nothing.

**Chance Spots (primarily drive, mixed others):**
- 4–6 locations around the board. Draw a Chance card when passing through.
- Most common: Drive tokens (found food/energy).
- Less common: Swagger, Grit tokens.
- Rare: Bond tokens.
- Some cards have mixed outcomes (e.g., eat a rotten bone: −1 water, +1 grit).

**Dog Park (bond):**
- 1 location. Receive 1 Bond token when passing through.
- The only reliable bond source on the board outside of home.

**Water Sources (water):**
- 4–5 locations. Draw Water Chance card. Costs 1 Drive (Scrapper free).

**Conflict (grit — involuntary):**
- Lose a challenge: +1 Grit.
- Challenge a Yapper: +1 Grit (win or lose).
- Bad water draws: +1 or +2 Grit.
- Desperation bonus (fewer than 3 territories): +2 Grit.

### 6.2 Economic Rhythm

Early game: near home, well-supplied, claiming nearby territories on your sidewalk. Mid game: pushing out, crossing the road, scrounging chance spots for drive, stretching resources thin. Late game: torn between holding distant territory and trekking home for a refill. Every walk is a supply run — route planning is resource planning.

### 6.3 Why No Basic Income Works

Without a safety net, every resource matters. You can't turtle at home collecting free tokens — home gives you a fixed max and then you have to go spend them. You can't ignore the board — chance spots and the dog park are your lifeline. Territory isn't just VP — it's your swagger engine.

Players who are losing have the desperation grit bonus and the catch-up turn order (least territory goes first), but recovery requires scrounging and smart play, not waiting for handouts.

---

## 7. Action Recipes

Actions that place pee disks on the board cost water pegs (the pee) plus modifier tokens (the intent). Water is removed from the bowl rim. The pee disk goes from the shared supply straight to the board.

### 7.1 Recipe Table

| Action | Pee Disk | Modifier | Result |
|--------|----------|----------|--------|
| **Claim** | Large (2 water) | + 1 swagger | Place on empty territory. |
| **Challenge** | Large (2 water) | + 1 drive | Place on occupied territory. Roll to clear. |
| **Re-claim after win** | — | + 1 swagger OR 1 grit | After winning challenge, spend modifier to keep territory. Swagger = confident claim. Grit = dig in defensively. |
| **Fortify** | Small (1 water) | + 1 grit | Add defense to your claimed territory. |
| **Ally (initiate)** | Small (1 water) | + 1 bond | Place on bond space. Sets the trap. |
| **Ally (compulsory join)** | Small (from bank) | — (just 1 water) | Passing an active bond space. Involuntary. |
| **Break alliance** | Small (1 water) | + 1 swagger | Destroy entire bond stack. |
| **Road crossing (mid-block)** | — | 1 drive | Cross the road between intersections. |
| **Shortcut / side street** | — | 1 drive per space | Move off main sidewalk. |
| **Drink water** | — | 1 drive | Use a Water Source. Scrapper: free. |

### 7.2 Recipe Logic

- **Swagger** = confidence → claiming, re-claiming (offensive option), breaking alliances
- **Drive** = energy/aggression → challenging, crossing the road, shortcuts, drinking
- **Grit** = defensive resolve → fortifying, re-claiming (defensive option)
- **Bond** = social → initiating alliances

### 7.3 Archetype Discounts

| Archetype | Discount |
|-----------|----------|
| **Bruiser** | Claims cost no Swagger (large pee only). |
| **Scrapper** | Drinking costs no Drive. |
| **Diplomat** | Ally initiation costs no Bond (small pee only). Forced ceasefire on passing players. Challenges at −1 to attack roll. |
| **Yapper** | Fortify costs no Grit (small pee only). Attackers gain +1 Grit when challenging Yapper claims (win or lose). |

---

## 8. Archetypes and Breeds

### 8.1 The Four Archetypes

All archetypes roll **2d6** for movement.

**The Bruiser** 🐕‍🦺
- Bowl: 6 water pegs.
- Walk: 2d6.
- Modifier Max: Swagger 3, Drive 2, Grit 2, Bond 1.
- Discount: Claims cost no Swagger.
- Identity: Dominates its sidewalk. Claims constantly and cheaply. Low Drive (2) and low Bond (1) mean it stays on its side and fights alone. 3 Swagger is pure surplus for re-claims and breaking alliances. Steamroller on rails.

**The Scrapper** 🐕
- Bowl: 3 water pegs.
- Walk: 2d6.
- Modifier Max: Swagger 2, Drive 3, Grit 1, Bond 2.
- Discount: Drinking costs no Drive.
- Identity: Crosses the road freely, hits every chance spot. Tiny bladder (3 water) but free drinking keeps it going. 1 Grit means it can't stockpile fortifications — fast but fragile. Spreads wide and thin.

**The Diplomat** 🦮
- Bowl: 4 water pegs.
- Walk: 2d6.
- Modifier Max: Swagger 2, Drive 1, Grit 2, Bond 3.
- Discount: Ally initiation costs no Bond. Forced ceasefire. Challenges at −1.
- Identity: Stuck on its side of the road (1 Drive). Plants bond traps everywhere. Relies on allies for protection. Weak alone but makes itself indispensable. Needs the dog park badly.

**The Yapper** 🐩
- Bowl: 4 water pegs.
- Walk: 2d6.
- Modifier Max: Swagger 1, Drive 2, Grit 3, Bond 2.
- Discount: Fortify costs no Grit. Attackers gain +1 Grit.
- Identity: 1 Swagger means barely any claims from home. But can challenge (Drive) and re-claim with Grit instead of Swagger. 3 Grit fuels both fortify (free discount) and re-claims. The turtle that bites — takes territory through challenges, then digs in.

---

## 9. Challenge Resolution

The challenge mechanic is the core conflict system. Designed to favor defense.

### 9.1 Basic Roll

Both players roll 1d6. **Attacker must roll higher than defender to win.** Ties trigger a re-roll (see 9.2 for exception).

### 9.2 Modifiers

**Fortify (defender).** Each small pee disk (fortify token) on the territory adds **+1 to the defender's roll.** Max 3 fortify = defender rolls d6+3.

**Cluster Rule (defender).** If the defender holds **3 or more connected friendly territories** (including the one being challenged), **ties go to the defender** instead of re-rolling.

**Home Turf (defender).** Defender gets **+3 to their roll.** Nearly unassailable.

**Alliance protection (defender).** If both attacker and defender are bonded at an adjacent bond space, **the challenge is illegal.**

**Grit penalty (attacker).** If holding more than **5 Grit tokens**, subtract excess from attacker's roll.

**Diplomat penalty (attacker).** −1 to attack roll.

**Yapper penalty (attacker).** +1 Grit token to attacker, win or lose.

### 9.3 Challenge Probability Summary

| Scenario | Defender Roll | Ties | Approx. Attack Success |
|----------|-------------|------|----------------------|
| Naked, isolated | d6 | Re-roll | ~42% |
| Naked, cluster 3+ | d6 | To defender | ~42% |
| 1 fortify | d6+1 | Re-roll/defender | ~28% |
| 2 fortify | d6+2 | Re-roll/defender | ~17% |
| 3 fortify | d6+3 | Re-roll/defender | ~9% |
| Home Turf | d6+3 | Re-roll | ~9% |
| Home + 3 fortify | d6+6 | Re-roll | ~0% |

### 9.4 Challenge Sequence

1. Attacker pays: 2 water (large pee disk placed from supply) + 1 Drive token.
2. Both roll d6. Apply modifiers.
3. **Attacker wins:** Both large pees destroyed (returned to supply). Fortify tokens removed. Territory empty. Attacker may **re-claim** by spending 1 swagger OR 1 grit.
4. **Attacker loses:** Attacker's pee destroyed. +1 Grit to attacker.
5. **Tie (no cluster):** Re-roll.
6. **Tie (cluster 3+):** Defender wins.
7. **Yapper defender:** +1 Grit to attacker regardless.

### 9.5 Three Outcomes

- **Full conquest:** Win + re-claim. Costs: 2 water + 1 drive + 1 swagger or grit.
- **Denial:** Win, leave empty. Costs: 2 water + 1 drive.
- **Wasted:** Lose. Costs: 2 water + 1 drive + 1 grit penalty.

### 9.6 Challenge a Bond

Same roll but targeting a bond space. Attacker pays 2 water (large pee from supply) + 1 Drive.

- Defender: d6 + 1 per small pee on the bond space.
- Win: entire bond stack destroyed.
- Lose: attacker's pee destroyed, +1 Grit.

Bigger alliances are harder to break by force.

---

## 10. Actions in Detail

### 10.1 Claim

**Recipe:** 2 water + 1 swagger. (Bruiser: no swagger.) Large pee disk placed from supply.

Place on an empty territory adjacent to your path position.

### 10.2 Challenge

**Recipe:** 2 water + 1 drive. Large pee disk placed from supply.

See Section 9 for full resolution.

### 10.3 Fortify

**Recipe:** 1 water + 1 grit. (Yapper: no grit.) Small pee disk placed from supply.

Place on your claimed territory. Max 3 per territory. Each +1 to defender's roll.

### 10.4 Ally (Initiate)

**Recipe:** 1 water + 1 bond. (Diplomat: no bond.) Small pee disk placed from supply.

Place on bond space. Sets the trap.

### 10.5 Ally (Compulsory Join)

**Trigger:** Passing an active bond space.
**Cost:** 1 water. Bank provides small pee disk in your colour from supply.

Involuntary. Dogs can't resist marking a hydrant. Only way to avoid is to not walk past.

Alliances can be 2, 3, or 4 players.

### 10.6 Break Alliance

**Recipe:** 1 water + 1 swagger. Small pee disk placed from supply.

Destroy entire bond stack. All markers returned to supply. Any bonded player can break it. Game of chicken — who pays the swagger?

### 10.7 Pass

Do nothing.

---

## 11. Movement

### 11.1 Persistent Position

Dog figurines stay on the board between turns. Continue from where you stopped.

### 11.2 Direction

Free choice each turn. Can backtrack. No fixed direction.

### 11.3 The Road

Two sidewalks separated by a road. You start on the side your home is on.

- **Intersections:** Free crossing.
- **Mid-block:** 1 Drive token to cross. Can happen mid-roll (e.g., roll 6, walk 3, cross, walk 3).
- **Side streets:** 1 Drive per space off the main sidewalk.

### 11.4 Passing Through

- Water Sources: optional drink (1 Drive, Scrapper free).
- Chance Spots: draw Chance card.
- Dog Park: receive 1 Bond token.
- Bond Spaces (active): compulsory join (1 water).
- Events: draw Events card.
- Actions (Claim/Fortify/Ally): only at stopping position.

---

## 12. Water and Bladder

### 12.1 Core Rule

Bladder (water pegs) does NOT auto-refill.

- **Home Turf:** Refill to full. Free.
- **Water Source:** Costs 1 Drive (Scrapper free). Draw Water Chance card.

### 12.2 Water Chance Deck (24 cards)

| Grade | Count | Effect |
|-------|-------|--------|
| 💎 Clean | ~5 | Full refill. Possible +1 Bond bonus. |
| 👍 Decent | ~8 | Half refill (rounded up). |
| 😬 Questionable | ~7 | Half refill + penalty (+1 Grit, or −1 Drive, or −1 Swagger). |
| ☠️ Terrible | ~4 | No refill + penalty (+2 Grit, or lose 1 water peg this cycle, or skip next action). |

---

## 13. Chance Deck (24 cards)

Drawn at Chance Spots around the board.

### 13.1 Card Distribution

| Category | Count | Examples |
|----------|-------|---------|
| 🍖 Food (Drive) | ~8 | Found a sandwich (+2 Drive). Stole a chip (+1 Drive). |
| 💪 Confidence (Swagger) | ~4 | Scared a squirrel (+1 Swagger). Got belly rubs (+1 Swagger). |
| 🦴 Toughening (Grit) | ~4 | Got barked at through a fence (+1 Grit). Stood ground against a cat (+1 Grit). |
| 🤝 Social (Bond) | ~2 | Friendly sniff exchange (+1 Bond). |
| 😬 Mixed | ~4 | Ate a rotten bone (−1 Water, +1 Grit). Chased a ball into traffic (−1 Drive, +1 Swagger). |
| ☠️ Penalty | ~2 | Got sprayed by sprinkler (−1 Drive). Stepped in something (−1 Swagger). |

Drive is the most common Chance card outcome — the board's primary drive source. Bond is the rarest.

---

## 14. Turn Structure

1. **Territory Income.** Collect swagger from territory holdings (+1 per 2–3 connected territories). Desperation bonus if applicable (+2 Grit if fewer than 3 territories).
2. **Roll and Move.** Roll 2d6. Choose direction. Move along sidewalk. Spend Drive for road crossings, shortcuts, side streets. Pass through triggers: Water Sources, Chance Spots, Dog Park, active Bond Spaces, Events.
3. **Action Phase.** At stopping position: Claim, Challenge, Fortify, Ally, Break Alliance, or Pass. Spend water pegs + modifier tokens. Pee disk placed from shared supply.
4. **Home Resupply** (if you passed or landed on Home). Refill water to full. Refill modifiers to archetype max.
5. **Maintenance.** Housebound check.

**Turn order:** Player with least territory goes first. Ties: roll off.

---

## 15. Win Conditions

1. Hold **10 non-home territories** at end of any turn.
2. **Last player** with non-home territory.
3. After **30 turns**: most territory. Ties: most Fortify tokens, then highest Swagger.

Housebound (0 non-home territories for 2 turns): walk halved, no territory bonuses.

---

## 16. Components List

- 1 Neighbourhood game board (two sidewalks, road, intersections, side streets, territory spaces, bond spaces, chance spots, water sources, dog park, events space)
- 4 Dog breed cards (with modifier max, discount, strategy tips)
- 4 Dog figurines (player colours)
- 4 Dog Bowls (unique per archetype, colour-coded, water peg holes around rim, centre dish for modifier tokens)
- Water pegs (blue) — 6 per player
- Swagger tokens (bone-shaped) — shared supply
- Drive tokens (stick-shaped) — shared supply
- Grit tokens (TBD shape) — shared supply
- Bond tokens (heart-shaped) — shared supply
- Large pee disks (puddle-shaped) in 4 player colours — shared supply
- Small pee disks (smaller puddle-shaped) in 4 player colours — shared supply
- 1 Water Chance deck (24 cards)
- 1 Chance deck (24 cards)
- 1 Neighbourhood Events deck (24 cards)
- 2 Six-sided dice
- Rules booklet

---

## 17. Walk Tricks (Optional Module)

Agree before game. Once-per-game unless noted.

- **Pull the Leash** — Spend 2 Drive, +3 walk roll. Narrate what dog lunged at.
- **Distracted Owner** — Roll doubles = +2 spaces, may reverse direction.
- **Zoomies** (Scrapper) — Triple walk roll, no action this turn.
- **Butt Sniff Diplomacy** (Diplomat) — Adjacent to another pawn, both reveal bowl contents. Free.
- **Paranoid Patrol** (Yapper) — Fortify all own claims within 3 spaces (still costs per fortify).
- **Leg Day** (Bruiser) — Claim or Challenge from 2 spaces away.

---

## 18. Advanced Variant: Secret Water Bidding

For experienced players. In challenges, both players may secretly add water pegs to their roll (+1 each). Reveal simultaneously. All bid water spent regardless of outcome.

Turns challenges into poker-style bluffs. Use after learning the base game.

---

## 19. Science References

- Quaranta, A. et al. (2025). "Decoding dog communication through the physiology and behavior of urine marking." Scientific Reports.
- Dzieciol, M. et al. (2018). "Identification of putative volatile sex pheromones in female domestic dogs." Animal Reproduction Science.
- McGuire, B. and Bemis, K.E. (2017). "Scent marking in shelter dogs: effects of body size." Applied Animal Behaviour Science.
- Lisberg, A.E. and Snowdon, C.T. (2011). "Effects of sex, social status and gonadectomy on countermarking by domestic dogs." Animal Behaviour.
- Schultz, T.H. et al. (1985). "Some volatile constituents of female dog urine." Journal of Chemical Ecology.

---

## 20. Open Design Questions and Next Steps

### Balance Tuning (needs simulator)
- Territory swagger rate: +1 per 2 or per 3 connected territories?
- Modifier maxes (3/2/2/1 spread): tight enough? Too tight?
- Challenge full conquest cost (2 water + 1 drive + 1 swagger/grit): balanced?
- Grit penalty threshold at 5: right number given max of 3 from home?
- Chance deck distribution: enough drive to keep the game moving?
- 30-turn game length and 10-territory win threshold: right for two-sided road board?
- Compulsory bond join cost (1 water): right?
- How many chance spots and where?
- Road crossing frequency: how many intersections vs mid-block stretches?

### Board Design (needs prototyping)
- Grid-based board builder tool with sub-grid for component sizing.
- Street layout: one main street? Multiple streets? How many intersections?
- Territory count and distribution across both sidewalks.
- Bond space placement: at intersections? Mid-block? Near homes?
- Chance spot placement: spread evenly or clustered?
- Dog park location: central? One side? Near water?
- Side street depth: how far do cul-de-sacs extend?
- Home placement: all on same side? Alternating? Corners?

### Component Design
- Bowl styling per archetype — art direction TBD.
- Grit token name and shape TBD.
- Large/small pee disk exact design.
- Board visual design: neighbourhood aesthetic, property art, road/sidewalk look.
- Token material: wood? Plastic? Cardboard?

### Simulator Requirements
- Model two-sided road with crossing costs.
- Model board economy: territory swagger, chance spots, dog park, water sources.
- Model modifier maxes and home resupply.
- Model re-claim with swagger OR grit option.
- Automated play with archetype-appropriate AI strategies.
- Output: game length, win rates, resource utilization, crossing frequency, home visit frequency.
