# Uri-Nation — Continuation Prompt

Use this prompt to pick up the Uri-Nation board game design in a new Claude chat.

---

## The Prompt

```
I'm designing a board game called "Uri-Nation" (working title was "Peemail") — a 2–4 player neighbourhood territory control game where each player is a dog on a walk, marking territory through strategic urination. It's grounded in real canine chemical communication science but presented as a light, funny strategy game.

The full design documents are in my GitHub repo: https://github.com/showcomm/Uri-Nation

Please read both docs/DESIGN.md (the internal design document with all numbers, rationale, and open questions) and docs/INSTRUCTIONS.md (the player-facing rulebook, currently v6) to get up to speed.

Here's where we are and what needs doing next:

**Current state (v6):**
- Four archetypes (Bruiser, Scrapper, Diplomat, Yapper) — same actions for all, differentiated by cost discounts and constraints. Breeds are cosmetic flavour.
- Four chemicals: Swagger (offense), Nerves (defense/liability), Bond (alliances), Drive (navigation).
- Board: main loop (~30-40 spaces) with side streets and shortcuts. Persistent pawn position.
- Movement: owner walks the loop by default. Dog spends Drive to detour onto side streets. Cost varies by archetype (Bruiser: 2/space, Scrapper: free, Diplomat: 1/2 spaces, Yapper: 1/space).
- Water system: bladder does NOT auto-refill. Only refills from Home Turf (safe, half max) or Water Sources (draw from Water Quality deck — risky).
- Adjacency defense bonus (+1 per adjacent friendly space, max +3). No space types, no decay.
- Turn order: least territory goes first (catch-up mechanic).

**Priority next steps:**
1. **Balance simulator** — Web-based tool with adjustable parameters for all refill rates, action costs, deck distributions. Run automated games with simple AI to find parameter ranges where all archetypes are competitive and games end in 20-40 turns. Current concern: refill rates may be too generous (Bruiser can Claim every turn).
2. **Board layout** — Design the actual topology. How many spaces on the loop, where side streets branch, where shortcuts connect, where water sources sit. This determines everything about pace and strategy.
3. **Drive as a resource** — Currently Drive's only function is navigation (paying to leave the main loop). Is that enough to justify tracking it as a chemical? Or should it be simplified to a token pool? Or does it need a second use?

When you respond, start by reading the repo docs so you have the exact current state. Then we can pick up wherever makes sense.
```

---

## Notes for Future Me

- The game started from real research on canine urine chemistry (Quaranta et al. 2025). The four chemicals are renamed hormones: Swagger=testosterone, Nerves=cortisol, Bond=oxytocin, Drive=dopamine.
- We went through 6 major iterations. Key decisions: removed hidden marks (doesn't work on shared board), removed decay (too much bookkeeping), removed space types (replaced with adjacency bonus), removed Sniff action (nothing hidden to sniff), replaced Nervous Sniffer with Yapper.
- The "leash" movement system is core to the comedy — you're a dog trying to execute strategy while being walked by an oblivious owner.
- The archetype principle is: same actions for everyone, one thing cheaper per type. No exclusive abilities.
- Water as a scarce bladder resource (not auto-refilling) was a late addition that significantly improved the design — it makes route planning matter and creates risk/reward decisions at every water source.
