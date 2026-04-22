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
