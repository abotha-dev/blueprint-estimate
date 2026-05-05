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

**Status (2026-05-02):** Superseded. Agency tier dropped from scope. $79 Pro tier confirmed live per 2026-05-02 pricing direction. Reflected in commit cee0e53.

---

### Decision 007: Pro pricing under review pending beta feedback

**Decision:** Hold Pro at $79/month ($59/month annual) for now. May adjust after beta tester feedback.

**Rationale:** $79/month is mathematically defensible (saves one wasted takeoff per month). But the trust gap is real for a pre-launch product with no case studies. Options include launching at $79 with a beta discount ($29-39/month locked in), or launching at a lower permanent price ($49). Decision deferred until beta contractors provide feedback on perceived value.

**Status (2026-05-02):** Superseded. Agency tier dropped from scope. $79 Pro tier confirmed live per 2026-05-02 pricing direction. Reflected in commit cee0e53.

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

2026-05-02: Results page deep-link compromise. The new Analyze page
navigates to /results with React Router state, not /results/:id, because
the parse API returns the full result object but no analysis ID. A page
refresh on /results loses the estimate. Revisit when redesigning Results:
if Results.tsx can load by ID from upload_history, switch Analyze's
navigate to use the inserted row's ID.

**Status (2026-05-04):** Resolved. See 2026-05-04 entry below.

2026-05-02: localStorage 'takeoff_guest_analyses' counter is dead code
post-Decision-008. The new Analyze page does not read or write it.
Cleanup of references elsewhere in the app pending.

2026-05-04: Results deep-link resolved. Analyze now captures the
upload_history row id via .select('id').single() and navigates to
/results/:id (with a fallback to /results if the insert fails). The new
Results page loads by id from upload_history, filtered by user_id —
which also closes a pre-existing access-control gap in the prior
Results query that selected by id only.

2026-05-05: Known debt — PDF report template is inconsistent with the
new positioning. The PDF generated by /api/v1/generate-pdf still uses
the old Takeoff.ai branded template, itemized labor/materials
breakdowns, a two-decimal Grand Total, and the four-tier comparison
including the Luxury tier that was cut from the redesigned pricing and
results pages. This contradicts the "ballpark, not a bid" framing the
new Results page commits to. Out of scope for this redesign because the
template lives in blueprint-intelligence-engine, which is not being
touched. Flag for the portfolio case study: frontend redesigned for
honest positioning; PDF template still pre-redesign and needs a
matching pass when the engine repo is in scope again.

2026-05-05: Shared layout components decision. After shipping Home,
Analyze, and Results with inlined header/footer, extracting SiteHeader
and SiteFooter into shared components before adding more pages.
Trigger: login/signup still on the old dark Layout palette (visible
inconsistency in the auth flow), and Pricing coming next would
compound the duplication. Component extraction now keeps scope from
sprawling later.

2026-05-05: Refactor verified, scope of next pass. SiteHeader and
SiteFooter shipped and verified on Home, Analyze, and Results.
Logged-in users see Dashboard + Logout in header; logged-out users
see Login + Get Started. Outstanding pages still on old
Layout/Header/Footer (dark palette): Dashboard, Login, Signup, Success.
Visible seam in the auth flow because Dashboard is the post-login
landing page. Next prompt scope: Login, Signup, and Dashboard. Defer
Success to a later isolated prompt after Pricing ships, so Success can
be tested end-to-end via a real test-mode Stripe checkout rather than
restyled in a multi-page diff with no verification path.

2026-05-05: Known debt surfaced during Login/Signup/Dashboard restyle.
Two pre-redesign quirks observed during the restyle, neither blocking,
both styling-pass-adjacent and to be handled in a later cleanup pass:
(1) Signup success toast still says "Welcome to Takeoff.ai." — old brand,
should be "mytakeoff.ai" to match the redesign positioning.
(2) Dashboard's SUBSCRIPTION_LABELS still includes an 'agency' entry
despite Decision 006 cutting the Agency tier; the path is reachable if a
user record has subscription_status = 'agency' in the DB.

2026-05-05: Stripe configuration debt — pre-existing, scoped out of
redesign. Verified during Pricing test on Vercel preview that the
Stripe integration has pre-existing configuration drift unrelated to
the redesign:
(1) Backend on Render uses live Stripe keys, not test keys. No test
mode environment exists. End-to-end checkout verification was not
possible without setting up a test environment, which is out of scope
for the frontend redesign.
(2) Stripe product pricing is stale: configured at $49/month for Pro.
Website Pricing page advertises $79/month ($59 annual). Backend
resolves plan='pro', interval='monthly' to a $49 price ID.
(3) Stripe product metadata is stale: merchant name "Takeoff.ai" (not
"mytakeoff.ai"), product description "For contractors who need more"
(not "For contractors and estimators").

This is pre-existing debt, not redesign debt. The frontend correctly
redirects to Stripe with the configured intervals and the integration
is wired end-to-end at the code level. The configuration mismatch
surfaces only on actual checkout attempts.

Resolution path (post-merge, requires backend repo work):
- Update Pro product in Stripe dashboard (name, description).
- Archive existing $49 price; create new $79 monthly and $708 annual
  prices.
- Update backend price ID mapping (in blueprint-intelligence-engine
  repo).
- Set up Stripe test mode and configure backend to use test keys in
  non-production environments.

For the redesign portfolio: this gap is documented in the case study
as the first item in a backend cleanup pass. Frontend redesign is
unblocked.

2026-05-05: Success page restyle, fixed missing Stripe session_id
placeholder. While restyling Success.tsx to use SiteHeader/SiteFooter
and the new visual language, identified that Pricing.tsx's success_url
was missing Stripe's required {CHECKOUT_SESSION_ID} placeholder.
Without it, Stripe redirects subscribers to /success with no query
string, which would route every real subscriber to the
direct-navigation "Nothing to confirm here" branch instead of the
"You're on Pro" confirmation. Fixed in the same diff.

Pre-existing bug, not redesign-introduced. Surfaced because the
redesign added the branching logic that exposed the missing placeholder.
