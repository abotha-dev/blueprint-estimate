# Decisions Log — mytakeoff.ai Redesign

---

## 2026-04-21

### Decision 001: Positioning pivot from accuracy-first to lead-qualification

**Decision:** Pivoting from accuracy-first positioning ("Accurate construction estimates powered by AI") to lead-qualification positioning ("Instant ballpark estimates — know which leads are worth chasing").

**Rationale:** The validation data does not support accuracy-first claims. Run 1 shows 78.8% area accuracy on non-ideal inputs. The "within 4% of contractor benchmarks" framing is not defensible. The product's real value today is speed — a 60-second ballpark that helps contractors decide whether to invest time in a full takeoff. Positioning around that value is both honest and compelling.

**Implications:**
- All website copy will be rewritten to reflect lead-qualification framing
- No accuracy percentages will appear as headline claims
- "Ballpark," "range," and "starting point" replace "accurate," "precise," and "exact"
- ADU builders become the primary ICP (engine assumptions match ADU specs)

---

### Decision 002: Frontend-only scope

**Decision:** This redesign touches only the `blueprint-estimate` frontend repo. The `blueprint-intelligence-engine` backend is out of scope entirely.

**Rationale:** The product works. The packaging doesn't match the reality. We're fixing the packaging. No backend changes, no accuracy improvements, no new features.

---

### Decision 003: Honesty as a trust strategy

**Decision:** We will be deliberately, visibly honest about what the tool does and doesn't do. This is a strategic choice, not a concession.

**Rationale:** Contractors have been burned by software that overpromises. Leading with honesty ("this is a ballpark, not a bid") builds more trust than leading with inflated claims. The product's genuine strengths (speed, room detection, range-based estimates) are compelling enough without exaggeration.

---

### Decision 004: ICP priority order

**Decision:** ADU builders are the primary ICP. Small residential remodelers are secondary. Design-build firms are tertiary.

**Rationale:** The engine's hardcoded assumptions (slab-on-grade, gable roof, single-story) match standard ADU construction perfectly. This isn't a compromise — it's a natural fit. Remodelers benefit from lead qualification but the engine doesn't model remodel-specific complexity (demolition, existing conditions). Design-build firms can use it for early scope anchoring.

---

### Decision 005: Strip unbuilt features from pricing tiers

**Decision:** Remove all features from pricing cards that are not confirmed built. Specifically removed: "Advanced AI room detection" (Pro), "Regional + zip code pricing" (Pro), "White-label PDF reports" (Agency), "API access" (Agency), "Dedicated account manager" (Agency), "Priority processing" (Pro).

**Rationale:** Founder confirmed these are artifacts from a previous build cycle. Listing unbuilt features on a pricing page is misleading. We only list what the product does today. Claude Code will audit the codebase in Phase 3 to confirm which features exist, and any confirmed features can be added back.

---

### Decision 006: Pause Agency tier, launch with Free + Pro only

**Decision:** Do not display the Agency tier ($199/month) on the pricing page at launch. Ship Free + Pro only.

**Rationale:** With unbuilt features removed, Agency has insufficient differentiation from Pro. The team features (shared project library, multi-seat) need to be built first. Founder will revisit Agency tier after this project ships.

---

### Decision 007: Pro pricing under review pending beta feedback

**Decision:** Hold Pro at $79/month ($59/month annual) for now. May adjust after beta tester feedback.

**Rationale:** $79/month is mathematically defensible (saves one wasted takeoff per month). But the trust gap is real for a pre-launch product with no case studies. Options include launching at $79 with a beta discount ($29-39/month locked in), or launching at a lower permanent price ($49). Decision deferred until beta contractors provide feedback on perceived value.

---

### Decision 008: Free tier requires account creation

**Decision:** Users must create a Supabase account to access the free tier (3 estimates/month). No anonymous usage.

**Rationale:** Prevents abuse via incognito tabs. Usage tracking is tied to the account, not the browser session. Email verification (supported by Supabase) can further mitigate multi-account abuse. Backend implementation of anti-abuse measures is out of scope for this project but noted for a future sprint.

---

### Decision 009: No em dashes in any copy

**Decision:** All copy uses commas, periods, parentheses, or hyphens instead of em dashes.

**Rationale:** Founder preference.

## 2026-05-01

**Goal shift:** Project repositioned from beta launch to portfolio piece (layoff in 4–8 weeks). New priority order: finish Analyze/Results/Pricing pages → visual polish across all pages → merge to main → write case study. Phase 4 (outreach emails) deferred indefinitely.

**Hero illustration:** Replaced animated SVG with ChatGPT-generated exploded isometric (orange linework on transparent PNG, `public/hero-house.png`). Sized via `lg:scale-110 xl:scale-125` rather than `max-w-*` to actually fill the hero column.

2026-05-02: Pricing direction — going with option 1 (real working Stripe 
tiers, not waitlist mock). Rationale: portfolio realism. The story 
"shipped real SaaS with working billing" is stronger than "designed 
mock pricing." Stripe stays on as currently implemented. Phase 4 
(outreach) remains deferred — not actively marketing, but signups will 
be handled if they happen. Earlier note about "Join waitlist CTA" is 
superseded by this entry.
