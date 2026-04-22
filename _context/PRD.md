# PRD — mytakeoff.ai Website Redesign

## Project Summary

Redesign mytakeoff.ai's website copy and visual design so the packaging honestly reflects what the product delivers today. The product works — the packaging doesn't match the reality. We're fixing the packaging, not the product.

## Scope

### In Scope

- **Copy rewrite** for Home, Analyze, Results, and Pricing pages
- **Visual design refresh** using existing stack (Tailwind + shadcn/ui)
- **Implementation** in the `blueprint-estimate` React codebase
- **Outreach email alignment** for 21 staged contractor beta-recruitment emails
- **Positioning pivot** from accuracy-first to lead-qualification-first messaging

### Out of Scope

- Backend changes of any kind
- `blueprint-intelligence-engine` repo
- Parsing engine improvements
- Accuracy improvements
- New features
- Auth/signup flow changes (Supabase stays as-is)
- Stripe/checkout flow changes (wiring stays as-is)

## Target Users

1. **ADU builders/contractors** — strongest fit. Engine assumptions (slab-on-grade, gable, single-story) match ADU construction perfectly.
2. **Small residential remodelers** — good fit for lead qualification use case. Not for actual bid generation.
3. **Design-build firms** — useful for early client conversations and scope anchoring.

## Deliverables

| # | Deliverable | Format | Owner Tool |
|---|---|---|---|
| 1 | Messaging framework | `_context/positioning.md` | Claude Chat |
| 2 | Full copy deck (all pages) | `_context/copy-deck.md` | Claude Chat |
| 3 | Visual design mockups / direction | Design specs | Claude Design |
| 4 | Implemented frontend changes | PR to `blueprint-estimate` | Claude Code |
| 5 | Aligned outreach emails (21) | Email copy doc | Claude Chat / Cowork |
| 6 | Accuracy truth sheet | `_context/accuracy-truth.md` | Claude Chat |

## Success Criteria

1. **No misleading claims.** A contractor reading any page should not believe this tool produces bid-ready estimates. Every accuracy-adjacent claim must be defensible against the validation data.
2. **Clear value prop in <5 seconds.** A contractor landing on the home page should understand "upload plan → get ballpark range → decide if the lead is worth a real takeoff" within the first scroll.
3. **ICP alignment.** ADU builders should feel like this was built for them. Remodelers should see it as useful for lead qualification. Neither should expect it replaces their estimating workflow.
4. **Visual credibility.** The design should feel professional and construction-industry-appropriate — not generic SaaS, not over-designed.
5. **Copy-design consistency.** Every page's copy and visuals tell the same story. No page contradicts another.

## Constraints

- Frontend only: Vite + React + TypeScript + shadcn/ui + Tailwind
- Existing Supabase auth and Stripe integration stay untouched
- Engine assumptions are fixed (slab-on-grade, gable 4/12, single-story, state-level cost multipliers, no detailed MEP)
- Validation dataset is small (11 blueprints). Do not make broad accuracy claims that outrun the data.

## Phases

| Phase | What | Status |
|---|---|---|
| 0 | Scaffold bridge files | ✅ Complete |
| 1 | Copy strategy + full copy deck | 🔜 Next |
| 2 | Visual design direction | Pending |
| 3 | Implementation in codebase | Pending |
| 4 | Outreach email alignment | Pending |
| 5 | Review + polish | Pending |
