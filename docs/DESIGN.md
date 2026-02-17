# Uri-Nation — Game Design Document

**Version:** 0.9
**Date:** 2026-02-17

---

## 1. Concept

Uri-Nation is a 2–4 player neighbourhood territory control game where each player is a dog on a walk. Players mark territory with urine, challenge other dogs' claims, form alliances, and try to dominate the neighbourhood — or push opponents back to their own backyards.

Grounded in real canine chemical communication research (dogs really do encode identity, status, stress, and social intent in urine chemistry). Presented with accessible, humorous mechanics.

---

## 2. Core Design Principles

- **Same actions for everyone.** Every archetype can Claim, Challenge, Fortify, Bond, and use shortcuts. No exclusive abilities. Differentiation is through cost discounts at the Hormone Bank and resource income profiles (Path B).
- **Open information.** All claims are visible. Fortify tokens are visible. Bond space connections are printed on the board. No hidden state to track.
- **No decay.** Marks stay permanently until challenged off. No bookkeeping for mark aging.
- **Two-layer economy.** Strategic resources (Hormone Bucks: Swagger, Nerves, Bond) accumulate and are spent on action token recipes. Operational resources (water and drive pegs) are received directly and drain constantly through play. Water is the universal cost of peeing; Drive is the cost of movement and hydration.
- **One token, many uses.** The pee disk is the universal action token. Place it on an empty territory = Claim. Place it on an occupied territory = Challenge. Context determines the action, not the token.
- **Scarcity drives drama.** Action tokens require recipes combining Bucks and pegs. Every pee-based action drains water. Every drink drains drive.
- **The leash is the joke.** You're a dog on a leash trying to execute grand strategy while being walked by an oblivious owner. Movement constraints are comedic.

---

## 3. The Board

### 3.1 Board Topology

The board represents a neighbourhood with three distinct space types:

**Paths** — The walk routes. Your owner walks you along these. Paths form a main loop through the neighbourhood with side streets and shortcuts branching off. You move along paths; you do not claim them. The path is the sidewalk.

**Territory spaces** — Branch off the paths. These are the yards, trees, poles, fences, and patches along the route. Players claim these by placing pee disks. Each territory space can hold one pee disk and up to 3 fortify tokens.

**Bond spaces** — Fixed infrastructure along the paths: fire hydrants, bus stops, park benches, lamp posts. Visually represented as small circles with radiating lines indicating their area of influence (which adjacent territories they connect to). Bond spaces are NOT claimable — they are where diplomatic relationships are physically anchored. Like the railways of Monopoly.

### 3.2 Special Spaces

**🏠 Home Turf** — 4 locations, one per player, spaced around the main loop. Passing through your own Home Turf refills bladder to full for free (no Drive cost). +3 defense if challenged. Marks revert to owner after 1 turn if taken. Worth 0 VP.

**💧 Water Sources** — 4–5 scattered around the board, intersecting path spaces. Varied appearances: puddles, ditches, garden taps, neighbour's bowls. Drinking costs 1 Drive peg (Scrapper: free) and triggers a Water Chance deck draw.

**📰 Neighbourhood Events** — One location on the main loop. Draw a card when passing through.

### 3.3 Adjacency and Defense

Territory spaces connected to the same path segment or bond space are adjacent. A claimed territory gets +1 defense for each adjacent friendly territory, max +3.

Build connected clusters, not scattered outposts. Attack clusters from the edges where the bonus is weakest.

### 3.4 Bond Spaces — Areas of Influence

Bond spaces (fire hydrants, bus stops, etc.) have printed radiating lines connecting them to nearby territory spaces. These lines define the bond's area of influence.

When two players are bonded at a bond space, neither can challenge the other's claims on any territory connected to that bond space. The bond projects a demilitarized zone over its connected territories.

A third player (or one of the bonded players) can challenge the bond itself to break it. This unlocks all those previously protected territories for attack.

6–8 bond spaces on the board. Their placement relative to territory clusters and home turfs is a major design lever — they create natural alliance corridors and diplomatic flashpoints.

### 3.5 Board Design Open Questions

- Exact space count and topology
- Number and placement of side streets and shortcuts
- Water Source placement relative to Home Turfs and contested zones
- Bond space placement — near borders? Near water? Clustered or distributed?
- Whether main loop direction is fixed or reversible

---

## 4. Archetypes and Breeds

### 4.1 Archetype System (Path B)

Four archetypes define gameplay. Each has a unique income profile (Hormone Bucks + pegs received at home) AND one cost discount at the Hormone Bank. Breeds are flavour — the picture on the card, a bio, maybe a minor once-per-game ability. Any dog breed can be any archetype.

### 4.2 The Four Archetypes

**The Bruiser** 🐕‍🦺
- Bowl: 6 water pegs, 2 drive pegs.
- Walk: 1d6.
- Home Income: Swagger +3, Nerves +0, Bond +1 | Water: refill to full, Drive: +1 peg.
- Bank Discount: Pee disks cost 1 less Swagger (1S instead of 2S).
- Identity: Dominates the main path. Claims constantly. Low Drive means it sticks to the main loop. Steamroller on rails.

**The Scrapper** 🐕
- Bowl: 3 water pegs, 5 drive pegs.
- Walk: 2d6.
- Home Income: Swagger +1, Nerves +1, Bond +1 | Water: refill to full, Drive: +3 pegs.
- Bank Discount: Drinking from water sources costs no Drive.
- Identity: Fastest mover. Explores the whole board. Tiny bladder keeps it hunting for water, but free drinking means all that Drive goes to shortcuts. Spreads wide and thin.

**The Diplomat** 🦮
- Bowl: 4 water pegs, 3 drive pegs.
- Walk: 1d6+2.
- Home Income: Swagger +1, Nerves +0, Bond +3 | Water: refill to full, Drive: +1 peg.
- Bank Discount: Bond tokens cost 1 less Bond (1B instead of 2B). Proposed bonds must be accepted for 1 turn (forced ceasefire).
- Constraint: Challenges at −1 to attack roll.
- Identity: Kingmaker. Bonds everywhere. Relies on allies for protection. Weak alone but makes itself indispensable.

**The Yapper** 🐩
- Bowl: 4 water pegs, 4 drive pegs.
- Walk: 1d6.
- Home Income: Swagger +1, Nerves +2, Bond +1 | Water: refill to full, Drive: +2 pegs.
- Bank Discount: Fortify tokens cost no Nerves (0N instead of 2N). Attackers take +1 Nerves when challenging Yapper claims.
- Identity: Turtle fortress builder. Must fortify constantly or Nerves pile up and become a liability. Stays close to home, builds walls, waits for others to exhaust themselves.

### 4.3 Design Notes on Archetypes

The four-way dynamic: Bruiser threatens with power, Scrapper with speed, Diplomat with alliances, Yapper with attrition. No archetype hard-counters another. Income profiles create natural playstyles; bank discounts amplify them.

Hormone Buck income per home pass is roughly 4–5 Bucks each, weighted differently. Peg income varies by bowl size. Everyone refills water to full at home — the difference is how fast you drain it (big bladder = more actions per fill) and how easily you can refill away from home (Scrapper drinks free).

The Yapper's high Nerves income is both a resource (fuel for fortify) and a liability (penalty above 5) — you must spend it or it hurts you.

---

## 5. The Dog Bowl

Each player's personal dashboard is an oversized dog bowl, unique to their archetype.

### 5.1 Physical Design

- **Peg holes around the rim** — divided into two sections:
  - **Water pegs** (blue) — represent bladder capacity. Remove a peg when performing any pee-based action (Claim, Challenge, Bond). Refill by drinking or passing home.
  - **Drive pegs** (yellow/orange) — represent energy. Remove a peg to use shortcuts or drink from water sources. Received directly at home — NOT purchased at the bank.
- **Centre dish** — holds the player's stockpiled action tokens (pee disks, fortify tokens, bond tokens) and unspent Hormone Bucks.
- **Colour-coded** to match player colour — the bowl IS your colour reference at the table.

### 5.2 Bowl Configurations by Archetype

| Archetype | Water Pegs | Drive Pegs | Total |
|-----------|-----------|------------|-------|
| Bruiser   | 6         | 2          | 8     |
| Scrapper  | 3         | 5          | 8     |
| Diplomat  | 4         | 3          | 7     |
| Yapper    | 4         | 4          | 8     |

### 5.3 Design Notes

- Each breed's bowl could be styled differently (Bruiser: chunky/oversized, Scrapper: small/shallow, Diplomat: elegant, Yapper: jagged rim). Art direction TBD.
- Bowl peg layout is readable at a glance across the table — you can see who's running low on water or drive.
- The dog figurine sits on the board; the bowl sits in front of the player. Everything about your dog's state is in one physical object.

---

## 6. Economy — Two Layers

### 6.1 Resource Types

The economy has two distinct layers:

**Strategic resources — Hormone Bucks (cards/chips)**
- **Swagger** 💪 — offensive currency. Used in pee disk recipes.
- **Nerves** 😰 — defensive currency. Used in Fortify recipes and as additional cost for Challenges. Liability above 5 (excess penalizes Challenge rolls).
- **Bond** 🤝 — diplomatic currency. Used in Bond token recipes. Also pays alliance maintenance (1 per turn per active bond).

Hormone Bucks are received at home based on breed income profile + territory bonuses. They accumulate between turns. Spent at the Hormone Bank to purchase action tokens.

**Operational resources — Pegs (physical pegs in bowl)**
- **Water pegs** (blue) 💧 — bladder. Spent whenever you pee: deploying a pee disk (1 per deployment, whether claiming or challenging) and placing a bond token (1). NOT spent on Fortify (fortify = poo, not pee). Refilled at home (full) or water sources (variable).
- **Drive pegs** (yellow) ⚡ — energy. Spent on shortcuts (1 per space off main loop) and drinking from water sources (1 per drink, Scrapper: free). Received directly at home — not purchased at the bank.

Pegs are received directly — no bank exchange needed. They drain constantly through play, creating logistical pressure underneath the strategic Hormone Buck decisions.

### 6.2 The Hormone Bank — Action Token Recipes

A central tray where players exchange Hormone Bucks for action tokens. Exchange happens **at the start of your turn only** — before you roll and move. This forces planning ahead.

Each action token has a **recipe** — a specific combination of Hormone Bucks required to purchase it. Water pegs are spent later when the token is deployed on the board, not at the bank.

**Action Token Recipes (base costs at the bank):**

| Token | Swagger | Nerves | Bond | What You Get | Notes |
|-------|---------|--------|------|-------------|-------|
| **Pee disk** | 2 | — | — | 1 pee puddle disk in your colour | Bruiser: 1 Swagger. Used for Claims AND Challenges. |
| **Fortify token** | — | 2 | — | 1 fortify token in your colour | Yapper: 0 Nerves. |
| **Bond token** | — | — | 2 | 1 bond token in your colour | Diplomat: 1 Bond. |

**Additional Challenge cost:** To use a pee disk as a Challenge (placing it on an occupied territory), you must also pay **1 Nerves Buck** at the time of deployment. This is paid from your Hormone Bucks on hand, not at the bank. It represents the stress of confrontation.

**Peg costs when deploying on the board:**

| Action | Water Pegs | Notes |
|--------|-----------|-------|
| **Claim** (pee disk on empty territory) | 1 | Pee-based. |
| **Challenge** (pee disk on occupied territory) | 1 | Pee-based. Both disks destroyed if attacker wins. Attacker can then deploy a second pee disk (+1 more water) to claim. |
| **Re-claim after Challenge win** | 1 | Optional. Deploy another pee disk from your bowl to take the cleared territory. |
| **Fortify** | 0 | Poo-based. No water cost. The one action you can do with an empty bladder. |
| **Bond** | 1 | Pee-based. Scent marking at the hydrant. |

### 6.3 Income — What You Get at Home

When passing your Home Turf, you receive:

| Archetype | Swagger | Nerves | Bond | Water Pegs | Drive Pegs |
|-----------|---------|--------|------|-----------|------------|
| Bruiser   | +3      | +0     | +1   | Refill to full (6) | +1 |
| Scrapper  | +1      | +1     | +1   | Refill to full (3) | +3 |
| Diplomat  | +1      | +0     | +3   | Refill to full (4) | +1 |
| Yapper    | +1      | +2     | +1   | Refill to full (4) | +2 |

**Territory bonus:** For every 3 connected territories held (excluding Home Turf), +1 Hormone Buck of player's choice.

**Desperation bonus:** Fewer than 3 non-home territories = +2 Nerves (both a resource and a liability).

### 6.4 Economic Rhythm

The intended pace: one home pass gives you slightly more than the cost of one action. You can act almost every turn, but bigger plays (Challenge + re-claim, multi-claim pushes) require saving up across 2–3 home passes. Water drains constantly and forces route planning. Drive drains when you explore or drink, creating a mobility budget.

- **Bruiser** gets 3 Swagger per pass → can buy a pee disk (cost 1S discounted) almost every turn, plus save toward challenges. Big bladder (6 water) means up to 6 pee-based actions before refilling. But low Drive (+1) means it rarely leaves the main loop.
- **Scrapper** gets 1 Swagger per pass → needs 2 passes to buy a pee disk. But massive Drive (+3) and free drinking means it covers ground and stays hydrated. Tiny bladder (3 water) empties fast but refills easily. Quantity through speed, not income.
- **Diplomat** gets 3 Bond per pass → can buy a bond token (cost 1B discounted) every turn. Low Swagger means pee disks are expensive. Wins through alliances, not force.
- **Yapper** gets 2 Nerves per pass → can buy fortify tokens for free (0N discount) every turn. But unused Nerves accumulate and penalize challenges above 5. Must fortify or suffer.

### 6.5 Stockpiling

Players carry unspent action tokens and Hormone Bucks between turns. Tokens and Bucks sit in the centre of your dog bowl. You can save up and deploy over several turns.

Stockpiling is unlimited, but self-regulates: hoarding pee disks is useless without the water to deploy them and the position to place them. The adjacency defense bonus (+1 per adjacent friendly territory) means challenging well-established clusters costs extra Nerves, discouraging blind aggression from hoarders.

---

## 7. Actions

Every archetype can perform every action. Action tokens are purchased at the Hormone Bank at the start of your turn, then deployed during your action phase. The pee disk is the universal offensive token — what it does depends on where you put it.

### 7.1 Claim

Deploy a pee disk on an **empty** territory space adjacent to your path position. Costs 1 water peg from your bowl.

Defense base value = 1. Build clusters for adjacency bonuses.

### 7.2 Challenge

Deploy a pee disk on an **occupied** territory space adjacent to your path position. Costs 1 water peg + 1 Nerves Buck (paid from hand at time of deployment — the stress of confrontation).

**Step 1 — Over-pee.** Both pee disks are now on the same space. Contested d6 roll:
- Attacker: d6 − Nerves penalty (if Nerves Bucks held > 5, subtract excess). Diplomat: additional −1.
- Defender: d6 + Fortify tokens + adjacency bonus (max +3) + Home Turf (+3) + Bond protection (+1 if bonded at adjacent bond space).
- Attacker must beat defender. Ties to defender.

**Step 2 — Resolution.**
- **Attacker wins:** Both pee disks are destroyed (returned to the bank). All fortify tokens on that space are also removed. The territory is now empty. The attacker may immediately deploy a second pee disk from their bowl (+1 water peg) to claim it.
- **Attacker loses:** Attacker's pee disk is destroyed. Defender's disk and fortify tokens remain. Attacker gains +1 Nerves Buck (humiliation).

**Three possible outcomes:**
- Win + have second pee disk + have water → **Full conquest.** Costs: 2 pee disks + 2 water pegs + 1 Nerves Buck.
- Win + no second disk (or no water) → **Denial.** Territory cleared but unclaimed. Costs: 1 pee disk + 1 water peg + 1 Nerves Buck.
- Lose → **Wasted.** Disk destroyed, +1 Nerves. Costs: 1 pee disk + 1 water peg + 1 Nerves Buck + 1 penalty Nerves.

Attacking a Yapper's claim: attacker takes +1 additional Nerves Buck win or lose.

### 7.3 Challenge a Bond

Same mechanic but targeting a bond space. Deploy a pee disk on the bond space. Costs 1 water peg + 1 Nerves Buck.

- Attacker: d6 − Nerves penalty.
- Defender: d6 + 1 per bond token on the space (max +2 if both players bonded there).
- If successful, both players' bond tokens are removed from that bond space, breaking the alliance and unlocking all territories in that bond's area of influence. Attacker's pee disk is returned to the bank (bond spaces aren't claimable).

### 7.4 Fortify

Deploy a fortify token on one of your claimed territories adjacent to your path position. **No water peg cost** — fortify is poo, not pee. This is the one action you can do when your bladder is empty.

Max 3 fortify tokens per territory. Each adds +1 defense.

### 7.5 Bond

Deploy a bond token (in your colour) on a bond space adjacent to your path position. Costs 1 water peg (scent marking at the hydrant).

If another player later places their bond token on the same bond space, the bond is formed — neither player can challenge the other's claims on territories connected to that bond space.

Diplomat's bond proposals must be accepted for at least 1 turn (forced ceasefire).

Active bonds cost 1 Bond Buck per turn to maintain. Can't pay = bond breaks. Max 2 active bonds per player.

### 7.6 Pass

Do nothing. Walk away.

---

## 8. Movement

### 8.1 Persistent Position

Dog figurines stay on the board between turns. You are always somewhere on a path. Next turn, continue from where you stopped.

### 8.2 The Main Loop

Owner walks the loop. Player chooses direction at game start (fixed for the game). Roll and advance each turn. Can stop early.

### 8.3 Shortcuts (Leash Pull)

At any junction, may leave the main path onto side streets or shortcuts. **Costs 1 Drive peg per space off the main loop.** This represents pulling your owner off their usual route.

Returning to the main loop is free — just move toward it on a subsequent turn.

### 8.4 Passing Through

Water Sources and Events squares trigger when passed through (drinking is optional, costs 1 Drive peg — Scrapper: free). Claim/Fortify/Bond actions only at your stopping position.

---

## 9. Water and Bladder

### 9.1 Core Rule

Bladder (water pegs) does NOT auto-refill. The only ways to restore water pegs:

- **Home Turf:** Pass through your own home → refill to full. Free. No Drive cost.
- **Water Source:** Stop and drink → costs 1 Drive peg (Scrapper: free) → draw from Water Chance deck.

### 9.2 Water Chance Deck (24 cards)

| Grade | Count | Effect |
|-------|-------|--------|
| 💎 Clean | ~5 cards | Full refill. Possible +1 Bond Buck bonus. |
| 👍 Decent | ~8 cards | Half refill (rounded up). No side effects. |
| 😬 Questionable | ~7 cards | Half refill + penalty (+1 Nerves Buck, or −1 Drive peg, or −1 Swagger Buck). |
| ☠️ Terrible | ~4 cards | No refill + penalty (+2 Nerves Bucks, or lose 1 water peg permanently this cycle, or skip next action). |

Drinking is always optional. You may pass through a Water Source and choose not to drink.

### 9.3 Strategic Implications

- Home water is free and full but requires routing through home.
- Water Sources cost Drive to use (except Scrapper) and carry risk.
- Bruiser (6 water pegs) needs water less often — can deploy up to 6 pee-based actions before needing a refill.
- Scrapper (3 water pegs) empties fast but drinks free — constant water hunting without the Drive tax.
- Controlling territories around a Water Source forces opponents into your zone to drink.
- Fortify is the only action that doesn't cost water — when your bladder is empty, you can still reinforce.
- A full conquest costs 2 water pegs (challenge + re-claim). The Bruiser can do 3 full conquests on a full bladder. The Scrapper can do 1 and has 1 water left.

---

## 10. Turn Structure

1. **Bank Phase.** Exchange Hormone Bucks for action tokens (pee disks, fortify tokens, bond tokens) at the Hormone Bank. This happens before rolling — you must plan ahead.
2. **Roll and Move.** Roll walk dice. Advance along path. Spend Drive pegs for shortcuts. Optionally drink at Water Sources (costs 1 Drive peg, Scrapper free). Trigger Events square.
3. **Action Phase.** At your stopping position: deploy a pee disk (Claim or Challenge), Fortify, Bond, or Pass. Spend water pegs and any additional Nerves Bucks as required.
4. **Refill Phase** (after all players). Collect Hormone Bucks based on breed income + territory bonuses. Water and Drive pegs only refill at home or water sources (during movement phase).
5. **Maintenance.** Pay Bond Buck maintenance (1 per active bond). Housebound check.

**Turn order:** Player with least territory goes first (catch-up mechanic). Ties: roll off.

---

## 11. Win Conditions

1. Hold **10 non-home territories** at end of any Refill phase.
2. **Last player** with non-home territory.
3. After **30 turns**: most territory. Ties: most Fortify tokens, then highest Swagger Bucks.

Housebound (0 non-home territories for 2 turns): walk halved, no territory bonuses. Recover by claiming any territory.

---

## 12. Neighbourhood Events Deck (24 cards)

Drawn when landing on or passing through the Events square.

Categories: Weather (affect all), Personal (affect drawer), Neighbourhood (affect board state). Some cards are HOLD (play when chosen, max 2 in hand).

Can create/remove temporary Water Sources, block paths, reset marks, adjust Hormone Bucks or pegs.

---

## 13. Components List

- 1 Neighbourhood game board (paths, territory spaces, bond spaces, water sources, events square)
- 4 Dog breed cards (with income profile, description, strategy tips)
- 4 Dog figurines
- 4 Dog Bowls (unique per archetype, colour-coded, peg holes for water and drive around rim, centre dish for token/Buck storage)
- Water pegs (blue) — quantity per player varies by archetype
- Drive pegs (yellow/orange) — quantity per player varies by archetype
- Hormone Bank tray (central exchange station)
- Hormone Bucks (cards or chips: Swagger 💪, Nerves 😰, Bond 🤝)
- Pee disks (pee puddle shaped) in 4 player colours — used for both Claims and Challenges
- Fortify tokens in 4 player colours
- Bond tokens in 4 player colours
- 1 Neighbourhood Events deck (24 cards)
- 1 Water Chance deck (24 cards)
- 2 Six-sided dice
- Rules booklet

---

## 14. Walk Tricks (Optional Module)

Agree before game. Each is once-per-game unless noted.

- **Pull the Leash** — Spend 2 Drive pegs, +3 walk roll. Narrate what dog lunged at.
- **Distracted Owner** — Roll doubles = +2 spaces, may reverse direction.
- **Zoomies** (Scrapper) — Triple walk roll, no action.
- **Butt Sniff Diplomacy** (Diplomat) — Adjacent to another pawn, both reveal Hormone Bucks. Free.
- **Paranoid Patrol** (Yapper) — Fortify all own claims within 3 spaces. Free (still costs fortify tokens from bowl).
- **Leg Day** (Bruiser) — Claim or Challenge from 2 spaces away.

---

## 15. Science References

- Quaranta, A. et al. (2025). "Decoding dog communication through the physiology and behavior of urine marking." Scientific Reports.
- Dzieciol, M. et al. (2018). "Identification of putative volatile sex pheromones in female domestic dogs." Animal Reproduction Science.
- McGuire, B. and Bemis, K.E. (2017). "Scent marking in shelter dogs: effects of body size." Applied Animal Behaviour Science.
- Lisberg, A.E. and Snowdon, C.T. (2011). "Effects of sex, social status and gonadectomy on countermarking by domestic dogs." Animal Behaviour.
- Schultz, T.H. et al. (1985). "Some volatile constituents of female dog urine." Journal of Chemical Ecology.

---

## 16. Open Design Questions and Next Steps

### Balance Tuning (needs simulator)
- Pee disk recipe — is 2 Swagger the right base cost? Bruiser at 1S can buy 3 disks per home pass.
- Challenge Nerves surcharge (1N at deployment) — right amount? Too cheap? Too expensive?
- Income profiles — current numbers give ~4-5 Bucks per home pass. Need testing to confirm pacing.
- Stockpile limits — currently unlimited. Self-regulating via water drain and adjacency defense? Or add explicit cap?
- Adjacency bonus cap — +3 may be too strong for Yapper fortress strategy.
- Water Chance deck distribution — 4 Terrible in 24 cards — too punishing or not enough?
- 30-turn game length — right pace?
- Win threshold of 10 territories — right for the new board where territories are separate from paths?
- Full conquest cost (2 disks + 2 water + 1 Nerves) — balanced?
- Nerves penalty threshold — 5 Nerves Bucks held triggers penalty. Right number?
- Territory bonus rate — +1 Buck per 3 connected territories. Too slow? Too fast?

### Board Design (needs prototyping)
- Exact topology of main loop, side streets, and shortcuts.
- Territory space count and distribution along paths.
- Bond space placement (6–8 total) — near borders? Near water? Creating alliance corridors?
- Water Source placement relative to Home Turfs and contested zones.
- How many territories connect to each bond space (area of influence size)?
- Whether shortcuts create degenerate movement patterns.

### Component Design
- Bowl styling per archetype — chunky Bruiser, small Scrapper, elegant Diplomat, jagged Yapper. Art direction TBD.
- Pee disk shape — puddle confirmed. Exact design TBD.
- Fortify token shape — poo emoji? Scratched ground? Dirt mound? Tone consideration: poo keeps the dog theme but may narrow audience. TBD.
- Bond space iconography — fire hydrants, bus stops, lamp posts with radiating influence lines.
- Hormone Bucks format — cards? Chips? Paper money?

### Simulator Requirements
- Web-based, adjustable parameters for all income rates, recipe costs, deck distributions.
- Model the two-layer economy: Hormone Bucks (strategic) + pegs (operational).
- Model pee disk as unified token for both claims and challenges.
- Automated play with simple AI strategies (aggressive, defensive, balanced, random).
- Output: average game length, win rate by archetype, average territory held, resource utilization, stockpile patterns, water refill frequency, challenge success rates.
- Goal: find parameter ranges where all four archetypes are competitive and games end in 20–40 turns.

### Future Expansion Ideas
- New breed cards (flavour + minor ability) for existing archetypes.
- Fifth archetype?
- Solo mode with automated opponent.
- Campaign mode (series of games, persistent neighbourhood).
- Physical prototype for playtesting.
- Digital version (board topology is graph-based, translates well).
