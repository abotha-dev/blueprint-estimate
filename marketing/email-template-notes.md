# Takeoff.ai HTML Email — Reuse Guide

## Files

| File | Purpose |
|------|---------|
| `email-template.html` | Reusable base template with `{{PLACEHOLDERS}}` |
| `email-01-nedes-estimating.html` | Email 1 (Nedes Estimating) — send-ready |

---

## How to produce a new branded email (Emails 2–9)

1. **Copy** `email-01-nedes-estimating.html` → rename to `email-0X-recipient-slug.html`
2. **Update the `<title>` tag** with the new subject line (top of `<head>`)
3. **Update the preheader text** (the hidden `<div>` right after `<body>`) — one punchy sentence pulled from the body copy
4. **Replace body paragraphs** — swap the `<p>` blocks inside the `<!-- ══ BODY ══ -->` section with the new email's copy. Keep the same `<p>` style attribute on each paragraph.
5. **Update the sign-off** if personalised (e.g., "Hi Greg," for Sylvis)
6. The CTA button, discount nudge, footer tile, and legal footer are identical across all emails — leave them alone.

### Placeholder reference (template file)

| Placeholder | What to put |
|-------------|-------------|
| `{{EMAIL_SUBJECT}}` | Subject line text |
| `{{PREHEADER_TEXT}}` | 1-sentence preview text (90 chars max) |
| `{{GREETING}}` | "Hi there," or "Hi Greg," etc. |
| `{{BODY_HTML}}` | Body `<p>` tags with approved copy |

---

## Sending checklist before hitting send

- [ ] Test render in Gmail (web) — paste HTML into a draft via a tool like Litmus, Mailtrap, or just send to yourself first
- [ ] Confirm subject line matches the `.md` file exactly
- [ ] Confirm `To:` address is correct (easy to mix up across 9 emails)
- [ ] Send from **hello@mytakeoff.ai** only
- [ ] Discount codes are correct: `TAKEOFF10` / `TAKEOFFANNUAL25`
- [ ] Do **not** attach the HTML file — copy-paste raw HTML into your sending tool (Gmail + a service like GMass, Mailmeteor, or manual paste into Superhuman)

---

## Design notes

**Color palette:** Indigo (#4F46E5) header bar + button + tile accent; light violet (#f5f3ff) tile background with #ddd6fe border. Neutral grays for body text. White card on light gray outer background.

**Why table-based layout:** Maximum email client compatibility. No flexbox, no grid. Works in Outlook, Gmail app, Apple Mail, and webmail.

**Inline SVG logo:** The logo is embedded as an inline `<svg>` (not an `<img>` tag pointing to an external URL). This means it renders even when images are blocked — no broken image icon.

**No web fonts:** Falls back gracefully to system fonts (`-apple-system, BlinkMacSystemFont, 'Segoe UI', Arial`). Avoids Gmail stripping `@font-face`.

**Footer tile:** Doubles as a branded CTA + trust signal. The entire tile is wrapped in an `<a>` tag so clicking anywhere on it opens mytakeoff.ai.

---

## Notes on follow-up emails

The follow-up templates (Day 3, Day 7) are plain-text replies threaded to the original — they don't need HTML treatment. Keep them plain; HTML follow-ups feel spammy.
