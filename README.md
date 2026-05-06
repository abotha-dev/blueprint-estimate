# mytakeoff.ai

Instant ballpark estimates for residential remodels and ADUs.

mytakeoff.ai is an AI-powered cost estimator for residential contractors. Upload a floor plan (PDF or image), get a parsed room layout, material quantities, and a low/mid/high cost range in about 60 seconds. It's a fast filter that runs before a real takeoff. A sanity check to decide which leads are worth a few hours of estimating, not a replacement for one. Best fit is single-story residential, especially ADUs.

## Status

This repo is the frontend half of mytakeoff.ai, redesigned as a portfolio piece around honest positioning (lead qualification, not bid generation). The parsing and cost engine lives in a separate repo, [blueprint-intelligence-engine](https://github.com/abotha-dev/blueprint-intelligence-engine), and is out of scope for this redesign. Stripe checkout and customer portal are wired end-to-end at the code level; configuration drift in the live Stripe account is documented as known debt in `_context/decisions.md`.

## Tech stack

- Vite + React + TypeScript
- Tailwind CSS + shadcn/ui
- Supabase (auth + storage)
- TanStack Query
- Stripe (checkout + customer portal)
- Vercel (deployment)

## Local development

Prerequisites: Node 18+ and npm.

```sh
git clone https://github.com/abotha-dev/blueprint-estimate.git
cd blueprint-estimate
npm install
```

Create a `.env` at the repo root with:

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_PUBLISHABLE_KEY=...
VITE_API_URL=...
```

`VITE_API_URL` should point at the running `blueprint-intelligence-engine` backend, locally if you're running it, or the deployed Render instance if you're not. If unset, the frontend falls back to the production Render URL.

```sh
npm run dev
```

## Project structure

- `src/pages/` - route components (Home, Analyze, Results, Pricing, Login, Signup, Dashboard, Success)
- `src/components/layout/` - shared SiteHeader and SiteFooter
- `src/components/ui/` - shadcn primitives
- `src/services/` - API client (`api.ts`)
- `src/hooks/` - custom hooks (auth, analysis flow, toast)
- `_context/` - bridge files for the redesign (positioning, accuracy guardrails, copy deck, decisions log)

## Case study

Case study forthcoming.

## License

All rights reserved.
