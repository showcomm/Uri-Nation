# Uri-Nation — Game Design Document

**Version:** 0.7
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
- **Scarcity drives drama.** Hormone Bucks accumulate at home. Bladder only refills from water sources. Action tokens must be purchased at the bank. Spending is a commitment. Losing a Challenge hurts — defender's claim token is destroyed (returned to bank).
- **The leash is the joke.** You're a dog on a leash trying to execute grand strategy while being walked by an oblivious owner. Movement constraints are comedic.

---

## 3. The Board

### 3.1 Board Topology

The board represents a neighbourhood with three distinct space types:

**Paths** — The walk routes. Your owner walks you along these. Paths form a main loop through the neighbourhood with side streets and shortcuts branching off. You move along paths; you do not claim them. The path is the sidewalk.

**Territory spaces** — Branch off the paths. These are the yards, trees, poles, fences, and patches along the route. Players claim these by placing claim tokens (pee puddle disks). Each territory space can hold one claim token and up to 3 fortify tokens.

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

Four archetypes define gameplay. Each has a unique income profile (what Hormone Bucks you receive at home) AND one cost discount at the Hormone Bank. Breeds are flavour — the picture on the card, a bio, maybe a minor once-per-game ability. Any dog breed can be any archetype.

### 4.2 The Four Archetypes

**The Bruiser** 🐕‍🦺
- Bowl: 6 water pegs, 2 drive pegs.
- Walk: 1d6.
- Home Refill: Swagger +3, Nerves +0, Bond +1, Drive +1.
- Bank Discount: Claims cost 1 less Swagger.
- Identity: Dominates the main path. Claims constantly. Low Drive means it sticks to the main loop. Steamroller on rails.

**The Scrapper** 🐕
- Bowl: 3 water pegs, 5 drive pegs.
- Walk: 2d6.
- Home Refill: Swagger +1, Nerves +1, Bond +1, Drive +3.
- Bank Discount: Drinking from water sources costs no Drive.
- Identity: Fastest mover. Explores the whole board. Tiny bladder keeps it hunting for water, but free drinking means all that Drive goes to shortcuts. Spreads wide and thin.

**The Diplomat** 🦮
- Bowl: 4 water pegs, 3 drive pegs.
- Walk: 1d6+2.
- Home Refill: Swagger +1, Nerves +0, Bond +3, Drive +1.
- Bank Discount: Bond tokens cost 1 less Bond. Proposed bonds must be accepted for 1 turn (forced ceasefire).
- Constraint: Challenges at −1 to attack roll.
- Identity: Kingmaker. Bonds everywhere. Relies on allies for protection. Weak alone but makes itself indispensable.

**The Yapper** 🐩
- Bowl: 4 water pegs, 4 drive pegs.
- Walk: 1d6.
- Home Refill: Swagger +1, Nerves +2, Bond +1, Drive +2.
- Bank Discount: Fortify tokens cost no Nerves (bladder only). Attackers take +1 Nerves when challenging Yapper claims.
- Identity: Turtle fortress builder. Must fortify constantly or Nerves pile up and become a liability. Stays close to home, builds walls, waits for others to exhaust themselves.

### 4.3 Design Notes on Archetypes

The four-way dynamic: Bruiser threatens with power, Scrapper with speed, Diplomat with alliances, Yapper with attrition. No archetype hard-counters another. Income profiles create natural playstyles; bank discounts amplify them.

Total income per home pass is roughly equal across breeds (~5–6 Hormone Bucks) but weighted differently. The Yapper's high Nerves income is both a resource (fuel for fortify) and a liability (penalty above 5) — you must spend it or it hurts you.

---

## 5. The Dog Bowl

Each player's personal dashboard is an oversized dog bowl, unique to their archetype.

### 5.1 Physical Design

- **Peg holes around the rim** — divided into two sections:
  - **Water pegs** (blue) — represent bladder capacity. Remove a peg each time you spend bladder. Refill by drinking or passing home.
  - **Drive pegs** (yellow/orange) — represent energy. Remove a peg to use shortcuts or drink from water sources. Refill from Hormone Buck income.
- **Centre dish** — holds the player's stockpiled action tokens (claim, fortify, bond) and unspent Hormone Bucks cards.
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

## 6. Economy — Hormone Bucks and the Bank

### 6.1 Hormone Bucks

Four types of currency cards, matching the four chemicals:

- **Swagger** 💪 — buys Claim tokens and funds Challenges.
- **Nerves** 😰 — buys Fortify tokens. Liability above 5 (excess penalizes Challenge rolls).
- **Bond** 🤝 — buys Bond tokens. Also pays alliance maintenance (1 per turn per bond).
- **Drive** ⚡ — converted to Drive pegs in your bowl. Drive pegs are spent on shortcuts and drinking.

Players receive Hormone Bucks based on their breed's income profile when passing Home Turf, plus territory bonuses.

### 6.2 The Hormone Bank

A central tray where players exchange Hormone Bucks for action tokens. Exchange happens **at the start of your turn only** — before you roll and move. This forces planning ahead.

**Base Exchange Rates:**

| Action Token | Cost | Notes |
|-------------|------|-------|
| Claim (pee puddle disk) | 2 Swagger | Bruiser: 1 Swagger |
| Fortify | 2 Nerves | Yapper: 1 Nerves (bladder peg only) |
| Bond | 2 Bond | Diplomat: 1 Bond |
| Drive peg refill | 1 Drive Buck per peg | Added to bowl |

All action tokens except Drive peg refills also cost 1 bladder peg from your bowl when placed on the board.

### 6.3 Stockpiling

Players carry unspent action tokens between turns. Tokens sit in the centre of your dog bowl. You can save up and deploy multiple tokens over several turns — e.g. stockpile claim tokens then go on a claiming spree.

**Open question:** Should there be a carrying capacity / hand limit? A natural limit might emerge from balance testing. Flag for simulator.

---

## 7. Actions

Every archetype can perform every action. Action tokens are purchased at the Hormone Bank at the start of your turn, then deployed during your action phase.

### 7.1 Claim

Place a claim token (pee puddle disk in your colour) on an empty territory space adjacent to your path position. Costs 1 bladder peg from bowl + the claim token you purchased.

One claim size only. Defense base value = 1.

### 7.2 Challenge

Two-step process:

1. **Roll to clear.** Attacker spends bladder + Swagger Bucks (exact cost TBD via simulator). Contested d6 roll:
   - Attacker: d6 − Nerves penalty (if Nerves > 5, subtract excess). Diplomat: additional −1.
   - Defender: d6 + Fortify tokens + adjacency bonus (max +3) + Home Turf (+3) + Bond protection (+1 if bonded at adjacent bond space).
   - Attacker must beat defender. Ties to defender.

2. **Optionally claim.** If attacker wins the roll, the defender's claim token is **destroyed** (returned to the Hormone Bank). The space is now empty. The attacker may then spend a claim token from their bowl to immediately claim the space. If they don't have one, the space stays empty — available for anyone.

**Three possible outcomes:**
- Win roll + have claim token → full conquest (clear and claim).
- Win roll + no claim token → denial (clear only, space is empty).
- Lose roll → resources wasted, attacker gains +1 Nerves.

Attacking a Yapper's claim: attacker takes +1 Nerves win or lose.

### 7.3 Challenge a Bond

Same contested roll mechanic, but targeting a bond space instead of a territory. If successful, both players' bond tokens are removed from that bond space, breaking the alliance and unlocking all territories in that bond's area of influence.

### 7.4 Fortify

Place a fortify token on one of your claimed territories adjacent to your path position. Costs 1 bladder peg + the fortify token you purchased. Max 3 fortify tokens per territory. Each adds +1 defense.

### 7.5 Bond

Place a bond token (in your colour) on a bond space adjacent to your path position. If another player later places their bond token on the same bond space, the bond is formed — neither player can challenge the other's claims on territories connected to that bond space.

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
| 💎 Clean | ~5 cards | Full refill. Possible +1 Bond bonus. |
| 👍 Decent | ~8 cards | Half refill (rounded up). No side effects. |
| 😬 Questionable | ~7 cards | Half refill + penalty (+1 Nerves, or −1 Drive peg, or −1 Swagger). |
| ☠️ Terrible | ~4 cards | No refill + penalty (+2 Nerves, or lose 1 water peg, or skip next action). |

Drinking is always optional. You may pass through a Water Source and choose not to drink.

### 9.3 Strategic Implications

- Home water is free and full but requires routing through home.
- Water Sources cost Drive to use (except Scrapper) and carry risk.
- Bruiser (6 water pegs) needs water less often.
- Scrapper (3 water pegs) is constantly hunting for water, but free drinking means all Drive goes to shortcuts.
- Controlling territories around a Water Source forces opponents into your zone to drink.

---

## 10. Turn Structure

1. **Bank Phase.** Exchange Hormone Bucks for action tokens at the Hormone Bank. Refill Drive pegs. This happens before rolling — you must plan ahead.
2. **Roll and Move.** Roll walk dice. Advance along path. Spend Drive pegs for shortcuts. Optionally drink at Water Sources (costs 1 Drive peg, Scrapper free). Trigger Events square.
3. **Action Phase.** At your stopping position: place a Claim, Fortify, Bond, initiate a Challenge, or Pass.
4. **Refill Phase** (after all players). Collect Hormone Bucks based on breed income + territory bonuses. Bladder only from water/home (during movement).
5. **Maintenance.** Pay Bond Buck maintenance. Housebound check.

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

Can create/remove temporary Water Sources, block paths, reset marks, adjust chemicals.

---

## 13. Components List

- 1 Neighbourhood game board
- 4 Dog breed cards (with base Hormone Bucks, description, strategy)
- 4 Dog figurines
- 4 Dog Bowls (unique per archetype, colour-coded, peg holes for water and drive)
- Water pegs (blue) and Drive pegs (yellow/orange)
- Hormone Bank tray
- Hormone Bucks cards (Swagger, Nerves, Bond, Drive)
- Claim tokens — pee puddle disks in 4 player colours
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
- **Paranoid Patrol** (Yapper) — Fortify all own claims within 3 spaces. Free.
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
- Hormone Bank exchange rates — are base costs of 2 per action token right?
- Income profiles — total ~5-6 Bucks per home pass, but exact numbers need testing.
- Stockpile limits — should there be a max number of action tokens carried? Or does the economy self-regulate?
- Adjacency bonus cap (+3 may be too strong for Yapper fortress strategy).
- Water Chance deck distribution — 4 Terrible cards in 24 — too punishing or not enough?
- 30-turn game length — is this right for the pace?
- Win threshold of 10 territories — too many? Too few?
- Challenge costs — exact Swagger/Nerves spend for initiating a challenge.

### Board Design (needs prototyping)
- Exact topology of main loop, side streets, and shortcuts.
- Territory space count and distribution along paths.
- Bond space placement (6–8 total) — near borders? Near water? Creating alliance corridors?
- Water Source placement relative to Home Turfs and contested zones.
- Whether shortcuts create degenerate movement patterns.

### Component Design
- Bowl styling per archetype — chunky Bruiser, small Scrapper, elegant Diplomat, jagged Yapper. Art direction TBD.
- Claim token shape — pee puddle disk confirmed. Exact design TBD.
- Fortify token shape — options: scratched ground, dirt mound, or something else. NOT poo (keeps tone accessible).
- Bond space iconography — fire hydrants, bus stops, lamp posts with radiating influence lines.

### Simulator Requirements
- Web-based, adjustable parameters for all income rates, bank exchange costs, deck distributions.
- Automated play with simple AI strategies (aggressive, defensive, balanced, random).
- Output: average game length, win rate by archetype, average territory held, resource utilization, stockpile patterns.
- Goal: find parameter ranges where all four archetypes are competitive and games end in 20–40 turns.

### Future Expansion Ideas
- New breed cards (flavour + minor ability) for existing archetypes.
- Fifth archetype?
- Solo mode with automated opponent.
- Campaign mode (series of games, persistent neighbourhood).
- Physical prototype for playtesting.
- Digital version (board topology is graph-based, translates well).
