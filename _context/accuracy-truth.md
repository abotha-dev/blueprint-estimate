# Accuracy Truth Sheet — mytakeoff.ai

Quick-reference for anyone writing copy, designing pages, or reviewing claims. If a number isn't in this document, don't put it on the website.

---

## Room Detection

| Metric | Value | Conditions | Defensible in Copy? |
|---|---|---|---|
| Room detection rate | **100%** | Both validation runs (11 blueprints total) | ✅ Yes — genuinely strong across all tested inputs |

**What you can say:** "Finds every room in your floor plan." / "100% room detection across all tested blueprints."
**What you can't say:** Nothing problematic here — this metric is solid.

---

## Area Accuracy

| Metric | Value | Conditions | Defensible in Copy? |
|---|---|---|---|
| Area accuracy (clean plans) | **96.7%** | Run 2: 5 rendered plans from Cedreo + RoomSketcher | ⚠️ Only with context — these were ideal inputs |
| Area accuracy (messier plans) | **78.8%** | Run 1: 6 synthetic/simple blueprints | ⚠️ Only with context — this is the realistic baseline |

**What you can say:** "Up to 97% area accuracy on clean floor plans." (Note the "up to" and "clean" qualifiers.)
**What you can't say:**
- "97% accurate" (without qualifying input conditions)
- "Accurate to within X%" as a blanket claim
- Any accuracy number presented as a guarantee

**The honest framing:** Accuracy depends on input quality. Clean, rendered plans (like exports from design software) get the best results. Scanned, photographed, or marked-up plans will be less accurate until the parser is hardened further.

---

## Cost Estimate Accuracy

| Metric | Value | Conditions | Defensible in Copy? |
|---|---|---|---|
| "Within 4% of contractor benchmarks" | **NOT DEFENSIBLE** | N/A | ❌ Do not use |

**Why it's not defensible:**
1. Contractor benchmarks (HomeAdvisor, RSMeans, etc.) themselves span ~2× ranges. Being "within range" does not mean "4% accurate."
2. If room areas are ±21% off on harder inputs, downstream cost totals cannot be systematically 4% off.
3. The claim was based on favorable conditions and does not hold under realistic input variation.

**What you can say:** "Get a cost range — low, mid, and high — to frame the conversation." / "Ballpark estimates to help you decide if a project is worth pursuing."
**What you can't say:** Any specific percentage accuracy for cost estimates.

---

## Engine Assumptions (Affect What Claims Are Valid)

These are hardcoded in the calculators. Copy must not imply the tool handles scenarios outside these:

- **Foundation:** Slab-on-grade only, 4" thickness
- **Roof:** Gable only, 4/12 pitch
- **Structure:** Single-family, single-story target
- **Cost regionalization:** State-level multipliers only (no ZIP or metro granularity)
- **MEP:** Estimated as aggregates, not detailed takeoff

**Implication for copy:** The tool is most accurate for new single-story construction (especially ADUs) with standard specs. It is least accurate for multi-story, complex rooflines, non-slab foundations, or remodels involving demolition and existing conditions.

---

## Validation Set Size

| Detail | Value |
|---|---|
| Total blueprints tested | **11** |
| Run 1 (synthetic/simple) | 6 |
| Run 2 (rendered residential) | 5 |
| Real contractor blueprints tested | **0** |

**Implication for copy:** The validation set is small and contains zero real-world contractor plans. Do not make broad accuracy claims that outrun this data. Phrases like "proven across thousands of projects" or "industry-validated" are not true.

---

## Copy Decision Matrix

| Claim | Allowed? | Notes |
|---|---|---|
| "Finds every room" | ✅ | 100% detection across all tests |
| "100% room detection" | ✅ | Factual |
| "Up to 97% area accuracy on clean plans" | ⚠️ | Must include "up to" and "clean plans" |
| "97% accurate" (unqualified) | ❌ | Missing critical context |
| "Within 4% of contractor benchmarks" | ❌ | Not defensible |
| "Ballpark estimate" / "cost range" | ✅ | Honest framing |
| "Replaces your takeoff" | ❌ | It doesn't |
| "Starting point for your real estimate" | ✅ | Honest and useful |
| "Best for ADUs and single-story" | ✅ | True — matches engine assumptions |
| "Works on any blueprint" | ❌ | Not validated on messy real-world inputs |
| "Upload a floor plan, get a range in 60 seconds" | ✅ | Factual product flow |
