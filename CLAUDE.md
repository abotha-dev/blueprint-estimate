# CLAUDE.md — mytakeoff.ai Redesign Project

## What is mytakeoff.ai?

AI-powered residential construction cost estimator. Upload a floor plan (PDF or image) → get a parsed room layout, material quantities, and a cost estimate with low/mid/high ranges. Pre-launch stage, recruiting beta contractor testers.

## Repos & Stack

| Repo | What it is | Stack | Deploy |
|---|---|---|---|
| `blueprint-estimate` | Frontend web app (THIS IS WHAT WE'RE CHANGING) | Vite + React + TypeScript + shadcn/ui + Tailwind + Supabase (auth/storage) + TanStack Query | Vercel |
| `blueprint-intelligence-engine` | Backend parsing + cost engine (DO NOT TOUCH) | Python + FastAPI, GPT-4o / Claude Sonnet 4.5 (switchable), Tesseract OCR, OpenCV | Render |

## The Positioning Pivot

**FROM:** "Accurate construction estimates powered by AI" (implies precision we can't deliver)
**TO:** "Instant ballpark estimates for residential remodels and ADUs — know which leads are worth chasing"

This is a lead-qualification tool, not a bid-generation tool. All copy must reflect this.

## What We're Changing (Frontend Only)

- Home page copy and design
- Analyze page copy
- Results page copy
- Pricing page copy and tier framing
- Overall visual design refresh (Tailwind + shadcn/ui)
- Outreach email copy alignment (21 staged contractor emails)

## What We Are NOT Changing

- No backend/engine changes
- No parsing improvements
- No accuracy work
- No new features
- `blueprint-intelligence-engine` repo is not touched

## Hard Rules for All Copy

1. **No misleading accuracy claims.** Do not use "within 4% of contractor benchmarks" — it is not defensible.
2. **Never imply the tool produces actual bids, purchase orders, or fixed-price quotes.**
3. **"Ballpark" and "range" are the right words.** Not "precise," "accurate," or "exact."
4. **Room detection is genuinely strong (100%).** You can say this confidently.
5. **Area accuracy depends on input quality.** 96.7% on clean rendered plans, 78.8% on messier inputs. Do not cherry-pick the higher number without context.
6. **The engine has fixed assumptions:** slab-on-grade foundation, gable roof at 4/12 pitch, single-story, state-level cost multipliers only. Copy should not imply flexibility that doesn't exist.
7. **No MEP detailed takeoff exists.** MEP is estimated as aggregates.

## ICP Priority

1. **ADU builders** (best fit — engine assumptions match ADUs perfectly)
2. **Small residential remodelers** (good for lead qualification)
3. **Design-build firms** (useful for early client conversations)

## Project Context Files

Read these for detailed context:
- `_context/PRD.md` — scoped requirements and deliverables
- `_context/positioning.md` — messaging framework
- `_context/accuracy-truth.md` — honest accuracy numbers (quick reference)
- `_context/copy-deck.md` — all page copy (written in Phase 1)
- `_context/decisions.md` — running decision log
- `_context/status.md` — current project phase

## Current Status

Phase 0: Bridge files scaffolded. Next: Phase 1 (Copy strategy + copy deck).
