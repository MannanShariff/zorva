# ZORVA Intelligence — Prototype

**Verified Skills. Real Opportunities. Stronger Cooperatives.**

A fully clickable, mobile-first React prototype of ZORVA — an AI-powered cooperative
gig-services platform connecting customers with verified cooperative workers.
Built from 15 design references (`screen1`–`screen15`) into one cohesive app:
no iframes, no screenshot galleries.

## Stack

- **React 18 + Vite** — build tooling
- **React Router** — real client-side routing across every journey
- **Tailwind CSS v4** — the full "Cooperative Trust & Intelligence" design system
  (MD3-style surface tokens, Plus Jakarta Sans + Inter, elevation L1–L3)
- **Lucide React** — icons
- **Zero backend** — all AI, maps, payments and sync are simulated in the frontend

## Run it

```bash
npm install
npm run dev      # local dev server
npm run build    # production build (dist/)
```

## Deploy to Vercel

No environment variables, no API keys. The included `vercel.json` adds the SPA
fallback rewrite — import the repo in Vercel and deploy as a Vite preset.

## The three journeys

| Journey | Route | Flow |
|---|---|---|
| **Customer** | `/app/home` | Home → Request (voice/photo/text, 4 languages) → AI Understanding → Matches (map + explainable ranking) → Why This Match (factor breakdown + formula) → Booking → Live Tracking (route map + OTP) → Payment (transparent tariff, UPI) → Feedback |
| **Worker** | `/worker/home` | Home (availability, opportunities, demand heat map) → Jobs → Job Details (instant-dispatch countdown, accept/decline) → Evidence Capture (AI validation pipeline, offline-first) → Passport Updated → Living Skill Passport™ |
| **Cooperative** | `/coop` | Intelligence (live metrics, demand forecast heat map, decision weightings) → Optimized Workforce Allocation (before/after, corridor matrix, apply allocation) |

Start at `/` to pick a journey. Every screen in the app is reachable by tap —
there are no dead buttons.

## What's simulated (and how)

- **AI understanding** — staged "analysis" reveal with confidence scores
- **Explainable matching** — the same 35/25/20/10/10 formula rendered everywhere
- **Maps** — pure SVG street grids, heat gradients, animated route dashes (no map API keys)
- **UPI payment** — method selection → "Securing transaction…" → settled, with a
  90/10 cooperative split ledger
- **Evidence pipeline** — Capture → Upload → AI Scan → IS 732 Extraction → Peer
  Consensus, with "Saved offline — will sync when connected" states
- **Voice capture** — animated waveform + 4-language selector

## Layout

The app is strictly mobile-first: content maxes at **430px**. On desktop
(≥500px) it renders centered in a rounded device frame — never stretched.
Touch targets are ≥44px, bottom navigation is always reachable.
