# Saudi Gold (سعودي قولد) — Complete Project & Technical Documentation

> A high‑performance, SEO‑first web application that displays **live gold and
> silver prices in Saudi Arabia** in Saudi Riyal (SAR), with calculators,
> Zakat tools, per‑city pages, a blog, and rich structured data.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Technology Stack](#2-technology-stack)
3. [High-Level Architecture](#3-high-level-architecture)
4. [Data Flow & Pricing Engine](#4-data-flow--pricing-engine)
5. [Directory & File Structure](#5-directory--file-structure)
6. [Core Libraries (`app/lib`)](#6-core-libraries-applib)
7. [API Routes](#7-api-routes)
8. [Pages & Routing](#8-pages--routing)
9. [Components](#9-components)
10. [Live Client-Side Price Updating](#10-live-client-side-price-updating)
11. [SEO Architecture](#11-seo-architecture)
12. [Internationalization & Arabic URL Handling](#12-internationalization--arabic-url-handling)
13. [Performance & Cost Optimization](#13-performance--cost-optimization)
14. [Styling & Design System](#14-styling--design-system)
15. [Caching Strategy (Deep Dive)](#15-caching-strategy-deep-dive)
16. [Environment Variables](#16-environment-variables)
17. [Deployment](#17-deployment)
18. [Local Development](#18-local-development)
19. [Security](#19-security)
20. [Known Notes & Historical Context](#20-known-notes--historical-context)
21. [Glossary (Gold Domain)](#21-glossary-gold-domain)

---

## 1. Project Overview

**Saudi Gold** is a content + tools website targeting the Arabic-speaking
Saudi market. Its primary keyword target is *"سعر الذهب اليوم في السعودية"*
(today's gold price in Saudi Arabia). The site:

- Shows the **live price of one gram of gold** for karats **24, 22, 21, 18,
  and 14**, plus the ounce and kilo prices, in **SAR and USD**.
- Provides interactive **gold value** and **Zakat** calculators.
- Publishes **per-city landing pages** for 15 Saudi cities (Riyadh, Jeddah,
  Makkah, Madinah, Dammam, etc.).
- Has a small **blog** with buying guides and educational articles.
- Is fully **right-to-left (RTL)**, in **Arabic** (`lang="ar"`), with a dark
  gold-themed UI.
- Is engineered to be **extremely cheap to run** on Vercel (minimal serverless
  invocations and **zero ISR writes** on hot paths) while still showing
  near‑real-time prices.

**Project version:** `3.1.0` (from `package.json`).

---

## 2. Technology Stack

| Layer | Technology | Notes |
|-------|------------|-------|
| Framework | **Next.js 14.2.15** (App Router) | React Server Components, file-based routing, Metadata API |
| UI Library | **React 18** | Server + Client components |
| Language | **JavaScript (ES Modules)** | No TypeScript |
| Styling | **Plain CSS** (`globals.css` + inline critical CSS) | CSS variables, no Tailwind/CSS-in-JS framework |
| Runtime | **Node.js** (serverless) + **Edge** (for OG image) | |
| Hosting | **Vercel** | Region pinned to `fra1` (Frankfurt) |
| Data source | **goldprice.org** (free public endpoint) with **MetalPriceAPI** fallback | |
| Build tooling | **SWC** (Next.js default minifier) | `swcMinify: true` |
| Analytics | **Google Analytics 4** (optional, env-gated) | |
| Cron | **cron-job.org** (external) | Hits a refresh endpoint (legacy/optional) |

### Dependencies (`package.json`)

```json
{
  "dependencies": {
    "next": "14.2.15",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}
```

> The dependency tree is intentionally minimal — **only Next.js + React**.
> There is **no database client, no UI kit, no state library**. Everything
> else is hand-rolled, which keeps the bundle small and the build fast.

---

## 3. High-Level Architecture

```
                         ┌──────────────────────────────┐
                         │        Visitor's Browser       │
                         │  (RTL Arabic UI, dark theme)   │
                         └───────────────┬────────────────┘
                                         │
                 1. Initial HTML (SSR/ISR, server-rendered prices)
                                         │
                         ┌───────────────▼────────────────┐
                         │      Vercel Edge / CDN           │
                         │  (caches HTML + API responses)   │
                         └───────────────┬────────────────┘
                                         │
            ┌────────────────────────────┼─────────────────────────────┐
            │                            │                             │
   2. Page render (RSC)        3. /api/live-gold (client poll)   middleware.js
   getPrices() server fetch        s-maxage=60 CDN cache          (Arabic→EN 308
            │                            │                          redirects)
            └────────────┬───────────────┘
                         │
                         ▼
              ┌────────────────────────┐        fallback
              │  goldprice.org (SAR)   │ ───────────────────► MetalPriceAPI
              │  data-asg.goldprice.org│                       (if key set)
              └────────────────────────┘                            │
                                                                     ▼
                                                            hard-coded defaults
                                                            (browser corrects
                                                             within ~2s)
```

There are **two independent price paths**:

1. **Server render path** — When a page is built/revalidated, the React Server
   Component calls `getPrices()` (in `app/lib/getPrices.js`), which fetches the
   spot price and renders prices directly into the HTML. This guarantees
   crawlers and first paint always see real numbers.

2. **Client live path** — After hydration, `LivePriceUpdater` (mounted once in
   the root layout) polls `/api/live-gold` and **mutates the DOM in place** to
   keep prices fresh without re-rendering or re-fetching the page.

---

## 4. Data Flow & Pricing Engine

### Upstream source

The canonical source is **`https://data-asg.goldprice.org/dbXRates/SAR`**, a
free JSON endpoint used by goldprice.org. The request sends browser-like
headers (`User-Agent`, `Origin`, `Referer`) to avoid `403` blocking.

The response includes:

- `xauPrice` — gold price per **ounce** in SAR
- `xagPrice` — silver price per ounce in SAR
- `chgXau` / `pcXau` — absolute change and percent change for gold

### Conversion math

All gram prices derive from the ounce price via constants defined in
`app/lib/gold.js`:

```js
export const MARKUP = 1.02;     // 2% commercial margin
export const OUNCE  = 31.1035;  // grams per troy ounce
```

The core formula (`calcGramPrices`):

```js
gram24 = (sarPerOunce / OUNCE) * MARKUP;   // pure 24K gram price + 2% margin

// per karat:
prices[k].gram  = gram24 * purity;
prices[k].ounce = gram24 * purity * OUNCE;
prices[k].kilo  = gram24 * purity * 1000;
```

USD figures use a **fixed SAR↔USD peg of 3.75** (the Saudi Riyal is pegged to
the US Dollar): `usd = sar / 3.75`.

### Karat purities

| Karat | Purity | Description |
|-------|--------|-------------|
| 24 | 1.0000 | Pure gold 99.9% |
| 22 | 0.9167 | 91.6% |
| 21 | 0.8750 | Most common in Saudi Arabia (87.5%) |
| 18 | 0.7500 | Luxury jewelry (75%) |
| 14 | 0.5833 | Durable jewelry (58.3%) |

### Fallback chain (`getPrices()`)

1. **goldprice.org** (primary, free).
2. **MetalPriceAPI** (`api.metalpriceapi.com`) if `METAL_API_KEY` is set.
3. **Hard-coded default** (`gram24 = 350 SAR`) with `updatedAt: null`, so the
   page never crashes — the browser then corrects it within ~2 seconds via the
   live updater.

The Zakat engine (`calcZakat`) uses `NISAB = 85` grams of pure gold as the
threshold and a `2.5%` rate.

---

## 5. Directory & File Structure

```
Saudi_Gold/
├── app/
│   ├── api/
│   │   ├── cron/refresh-prices/route.js   # secret-gated refresh endpoint
│   │   ├── live-gold/route.js             # client polling endpoint (rich payload)
│   │   └── prices/route.js                # alternate price endpoint (bot-facing)
│   ├── blog/
│   │   ├── page.js                        # blog index
│   │   ├── best-time-buy-gold/page.js
│   │   ├── difference-gold-karats/page.js
│   │   ├── gold-buying-guide-saudi/page.js
│   │   ├── gold-investment-saudi-2026/page.js
│   │   └── gold-zakat-guide/page.js
│   ├── components/
│   │   ├── Breadcrumb.js
│   │   ├── Calculators.js                 # GoldCalculator + ZakatCalculator (client)
│   │   ├── CityPage.js                    # shared template for all 15 city pages
│   │   ├── Disclaimer.js
│   │   ├── FAQ.js
│   │   ├── Footer.js
│   │   ├── Header.js                      # client (mobile menu state)
│   │   ├── InternalLinks.js
│   │   ├── LivePriceUpdater.js            # client, mounted in layout
│   │   ├── PriceCards.js
│   │   └── PriceTable.js
│   ├── lib/
│   │   ├── getPrices.js                   # server-side price fetch + fallback
│   │   ├── gold.js                        # constants, math, city & market data
│   │   └── schema.js                      # JSON-LD schema.org helpers
│   ├── gold-price-<city>/page.js          # 15 city pages (thin wrappers)
│   ├── karat-18|21|22|24/page.js          # per-karat landing pages
│   ├── gold-price-saudi-arabia/           # dedicated SEO page (server/client split)
│   │   ├── page.js
│   │   └── PageClient.js
│   ├── buy-sell/page.js
│   ├── calculator/page.js
│   ├── gold-bars/page.js
│   ├── history/page.js
│   ├── markets/page.js
│   ├── ounce/page.js
│   ├── silver/page.js
│   ├── workmanship/page.js
│   ├── zakat/page.js
│   ├── globals.css
│   ├── layout.js                          # root layout, metadata, schemas, GA4
│   ├── not-found.js                       # 404 page
│   ├── opengraph-image.js                 # dynamic OG image (edge runtime)
│   ├── page.js                            # homepage
│   ├── robots.js                          # robots.txt generator
│   └── sitemap.js                         # sitemap.xml generator
├── public/                                # icons, manifest, og-image, logo
├── middleware.js                          # Arabic URL → English route redirects
├── next.config.js                         # headers, caching, image config
├── vercel.json                            # build config + region pin
├── package.json
├── README.md
├── SETUP-GUIDE.md
├── BACKLINKS-STRATEGY.md
└── .env.example
```

---

## 6. Core Libraries (`app/lib`)

### `gold.js` — the domain core

The single source of truth for the gold domain. Exports:

- **Formatting:** `fmt(n, d=2)` (en-US number formatting), `toAr(n)`.
- **Constants:** `KARATS`, `MARKUP`, `OUNCE`, `NISAB`, `BAR_WEIGHTS`.
- **Math:** `calcGramPrices(sarPerOunce)`, `calcBarPrices(gram24Price)`,
  `calcZakat(weightGrams, karat, gram24Price)`.
- **Time:** `formatRiyadhTime(date)` (formats in `Asia/Riyadh` timezone).
- **Static data:**
  - `GOLD_MARKETS` — featured gold souqs.
  - `PAGES` — internal route registry with Arabic titles.
  - `SAUDI_CITIES` — **15 city objects**, each with slug, Arabic/English name,
    region, population, description, markets, buying tips, and lat/lng
    coordinates. This array powers both the city pages and their `LocalBusiness`
    / `GeoCoordinates` schema.

### `getPrices.js` — server fetcher

`getPrices()` (async) returns `{ prices, rates, updatedAt, source }` using the
fallback chain described in §4. Uses `next: { revalidate: 1800 }` so the
upstream fetch is shared across renders within a 30‑minute window.
Also exports `formatRiyadhTime(isoString)` (Arabic locale variant).

### `schema.js` — structured data helpers

A library of pure functions returning JSON-LD objects (schema.org), each
`inLanguage: 'ar'`:

| Helper | Schema type |
|--------|-------------|
| `getWebPageSchema` | `WebPage` |
| `getGoldPriceSchema` | `WebPage` + `ExchangeRateSpecification` / `UnitPriceSpecification` |
| `getServiceSchema` | `WebApplication` (FinanceApplication) for calculators |
| `getHowToSchema` | `HowTo` with ordered steps |
| `getItemListSchema` | `ItemList` |
| `getLocalBusinessSchema` | `JewelryStore` + `PostalAddress` + `GeoCoordinates` |
| `getArticleSchema` | `Article` (blog posts) |
| `getCityGoldSchema` | `WebPage` for city pages |
| `getBreadcrumbSchema` | `BreadcrumbList` |

> Note: an earlier version used a misleading `Product` schema for prices; it was
> deliberately replaced with `ExchangeRateSpecification` to be accurate and
> avoid rich-result penalties.

---

## 7. API Routes

All three routes are **`export const dynamic = 'force-dynamic'`** — this is a
deliberate cost optimization: it ensures the routes **never generate ISR
writes**. Caching is delegated entirely to the Vercel CDN via `Cache-Control`
headers on the response.

### `/api/live-gold` (primary client endpoint)

- Fetches goldprice.org, computes all karat prices, silver, and change values.
- Returns a rich payload: `{ success, prices, xauSar, xagSar, change, updatedAt, source }`.
- **`Cache-Control: public, s-maxage=60, stale-while-revalidate=120`** — the CDN
  serves one cached response for 60s, absorbing bursty traffic so the function
  runs roughly **once per minute regardless of visitor count** (~95% invocation
  reduction).
- Holds an **in-memory `lastGood`** snapshot inside the warm Lambda. If
  goldprice.org returns `403`/errors, it serves the last good value (up to 1
  hour old, flagged `stale: true`) instead of cascading 500s to every visitor.

### `/api/prices` (bot-facing endpoint)

- Similar logic, but the payload shape is tailored for an external Twitter/X bot:
  `rates.SAR`, `rates.USD`, `change_percent`, `change_value` — these field names
  are explicitly marked **"do not rename"** because an external consumer depends
  on them.
- Same `s-maxage=60` CDN caching + in-memory stale fallback.

### `/api/cron/refresh-prices` (secret-gated)

- Requires `?secret=<CRON_SECRET>` (compared against `process.env.CRON_SECRET`,
  default fallback present in code). Returns `401` on mismatch.
- Designed to be hit hourly by **cron-job.org** to warm/refresh data.
- Uses `cache: 'no-store'` to always fetch fresh.
- Returns gram prices for karats 24/22/21/18 plus silver and change data.

---

## 8. Pages & Routing

Routing uses the **Next.js App Router** (folder = route). All pages are Arabic,
RTL, and set their own `metadata` (title, description, keywords, canonical,
OpenGraph).

### Page categories

| Category | Routes | Revalidate | Pattern |
|----------|--------|-----------|---------|
| Homepage | `/` | `1800s` | Full server render with all price tables, calculators, FAQ, markets |
| Karat pages | `/karat-18`, `/karat-21`, `/karat-22`, `/karat-24` | `3600s` | Per-karat detail + calculator + FAQ |
| City pages | `/gold-price-riyadh` … (15 total) | `3600s` | Thin wrappers around shared `<CityPage citySlug=… />` |
| Dedicated SEO page | `/gold-price-saudi-arabia` | `3600s` | **Server/client split** (see below) |
| Tools | `/calculator`, `/zakat` | — | Interactive calculators |
| Info | `/gold-bars`, `/ounce`, `/silver`, `/workmanship`, `/buy-sell`, `/markets`, `/history` | — | Topic landing pages |
| Blog | `/blog` + 5 articles | — | Index + article pages with `Article` schema |
| System | `/not-found`, `/sitemap.xml`, `/robots.txt`, `/opengraph-image` | — | Generated |

### The `/gold-price-saudi-arabia` server/client split

This page is a case study in SEO-safe hydration. The **above-the-fold** content
(Header, Breadcrumb, hero with the single `<h1>`, and the main price box) is
**fully server-rendered** so crawlers and first paint always see the H1 and
price in the correct visual position. The **below-the-fold interactive content**
lives in `PageClient.js` and renders only after React hydrates (a "mounted
gate"). The commit history shows this was iterated carefully to ensure the H1 is
rendered exactly once, server-side, at the right position.

### City pages

Each city route (e.g. `app/gold-price-riyadh/page.js`) is a **3-line wrapper**:

```js
import CityPage from '../components/CityPage';
export const revalidate = 3600;
export const metadata = { /* city-specific SEO */ };
export default function RiyadhGoldPage() {
  return <CityPage citySlug="gold-price-riyadh" />;
}
```

`CityPage.js` looks the slug up in `SAUDI_CITIES`, fetches prices, and renders a
full localized page (hero, price cards, price table, market list, buying tips,
calculator, links to other cities, FAQ, disclaimer) plus city-specific JSON-LD.

---

## 9. Components

| Component | Type | Responsibility |
|-----------|------|----------------|
| `Header` | **Client** | Logo + nav; holds mobile menu open/close state |
| `Footer` | Server | Site footer links |
| `PriceCards` | Server | Grid of karat price cards |
| `PriceTable` | Server | Detailed price table (gram/ounce/kilo) |
| `Calculators` | **Client** | `GoldCalculator` (weight × karat) + `ZakatCalculator` (Nisab/2.5%) with `useState` |
| `FAQ` | (client/interactive) | Accordion of Q&A, feeds FAQ content |
| `Breadcrumb` | Server | Breadcrumb trail |
| `InternalLinks` | Server | Icon link grid for internal SEO linking |
| `Disclaimer` | Server | Legal/pricing disclaimer |
| `CityPage` | Server (async) | Shared template for all 15 city pages |
| `LivePriceUpdater` | **Client** | Mounted once in layout; polls API and updates DOM |

`Header` and the calculators are the only stateful interactive components.
The DOM-mutation approach of `LivePriceUpdater` means most of the tree can stay
as cheap server components.

---

## 10. Live Client-Side Price Updating

`LivePriceUpdater` is the cleverest performance trick in the codebase. Mounted
**once** in `app/layout.js`, it keeps prices fresh **without re-rendering React
or re-fetching the page**:

- **Polling interval:** every **15 minutes** (`REFRESH_INTERVAL`), plus an
  initial fetch 2s after mount, plus a refresh on `visibilitychange` when the
  tab becomes visible.
- **Throttle guard:** a `lastFetchAt` ref prevents fetching more than once per
  60s, matching the API's edge-cache window — so it never pays for a request the
  CDN would have served from cache anyway.
- **Tab-hidden skip:** does not fetch when `document.visibilityState ===
  'hidden'`, saving both client and server work.
- **Direct DOM updates:** after fetching `/api/live-gold`, it queries known CSS
  selectors (`.main-price-value`, `.price-card-value`, `.last-update`,
  `.price-table tbody tr`) and **sets `textContent` directly**. It also updates
  the "last update" timestamps to the current Riyadh time.
- **Broadcast:** stores the latest prices on `window.__goldPrices` and dispatches
  a `goldPriceUpdate` `CustomEvent`, so other components can listen.
- **Visual indicator:** renders a fixed-position "live" pill (bottom-left) with a
  pulsing dot and the % change (green ▲ / red ▼), `aria-live="polite"`.
- **Silent failure:** errors are swallowed (no `console.error`) to keep the
  PageSpeed "Best Practices" score clean.

This design means a page can be cached as static HTML, yet still display
near-live prices to the visitor.

---

## 11. SEO Architecture

SEO is the central concern of the project. Techniques in use:

### Metadata API

`layout.js` defines a global `metadata` object: title template
(`%s | سعودي قولد`), description, a large keyword set, authors/creator/publisher,
`alternates` (canonical + `ar-SA` / `x-default` hreflang), OpenGraph, Twitter
cards, `robots` directives (with explicit `googleBot` rules), Google
site verification token, and the web app manifest. Every page overrides title,
description, keywords, and canonical.

### Structured data (JSON-LD)

- Global `WebSite` and `Organization` schemas injected in the layout `<head>`.
- Per-page schemas via `schema.js` helpers: `WebPage`, `ItemList` (price lists),
  `ExchangeRateSpecification` (prices), `BreadcrumbList`, `JewelryStore` +
  `GeoCoordinates` (cities), `Article` (blog), `WebApplication` (calculators),
  `HowTo`.
- FAQ content is rendered on most pages (homepage has 7 keyword-optimized Q&As).

### Sitemap & robots

- `sitemap.js` programmatically lists **~36 URLs** with per-route
  `changeFrequency` and `priority` (homepage `1.0`/hourly, karat & city pages
  high priority, blog/info lower).
- `robots.js` allows everything except `/api/` and `/_next/`, and points to the
  sitemap.

### Dynamic OG image

`opengraph-image.js` uses `next/og` `ImageResponse` on the **edge runtime** to
generate a 1200×630 branded social-share image on the fly.

### Content depth

Pages carry substantial Arabic prose (pricing explanations, history of gold,
buying guides, per-city descriptions and tips) with heavy **internal linking**
between karat pages, tools, city pages, and the blog — a classic topical-cluster
SEO strategy. `BACKLINKS-STRATEGY.md` documents the off-page plan (directories,
guest posts, embeddable widgets, digital PR, broken-link building, competitor
analysis) targeting Domain Authority 30+ and page-1 rankings.

---

## 12. Internationalization & Arabic URL Handling

The site is single-locale **Arabic (RTL)**: `<html lang="ar" dir="rtl">`.

A notable engineering detail is **Arabic vanity URLs**. The site wants Arabic
slugs like `/سعر-الذهب-في-الرياض` to redirect to the canonical English route
`/gold-price-riyadh`. This **cannot** be done via `next.config.js`
`redirects()`/`rewrites()` because Next.js's pattern matcher does not reliably
match non-ASCII source paths in production (they silently 404).

The solution is **`middleware.js`**:

- Maintains an `ARABIC_REDIRECTS` map (Arabic slug → English route) covering
  karat pages, tool pages, all 15 cities, and the blog.
- On each request it `decodeURIComponent`s the path (browsers send
  percent-encoded Arabic), looks it up, and issues a **308 permanent redirect**
  (SEO-equivalent to 301 for GET).
- The `matcher` config is tightly scoped to **HTML page requests only** —
  excluding `api`, `_next/*`, static assets, fonts, images, robots, sitemap,
  manifest — so the middleware adds negligible overhead.
- On the default path it appends a `Link: <fonts.gstatic.com>; rel=preconnect`
  header as a performance hint.

---

## 13. Performance & Cost Optimization

This project is aggressively tuned to run cheaply on Vercel. Highlights:

- **`force-dynamic` on all API routes** → zero ISR writes from hot paths.
- **CDN-delegated caching** via `s-maxage` + `stale-while-revalidate` headers →
  function invocations reduced ~95% under bursty traffic.
- **In-memory `lastGood` fallback** in warm Lambdas → upstream `403`s don't turn
  into a storm of 500s and extra invocations.
- **Client polling throttled to the cache window** (60s) and **paused on hidden
  tabs** → no wasted requests.
- **Aligned revalidate windows** (page `1800`/`3600`/`86400`s, data fetch
  `1800`s) so longer-revalidate pages reuse the same data cache entry.
- **Minimal dependencies** (Next + React only) → small bundle, fast build.
- **`next.config.js` tuning:** `compress: true`, `productionBrowserSourceMaps:
  false`, `poweredByHeader: false`, `removeConsole` in production,
  `optimizePackageImports`, AVIF/WebP image formats with a 1‑year
  `minimumCacheTTL`.
- **Critical CSS inlined** in the layout `<head>` for fast first paint; the rest
  in `globals.css`.
- **Region pin** to `fra1` (Frankfurt) in `vercel.json` for consistent latency.

The commit history (`perf: massive Vercel usage reduction (ISR writes -95%, CPU
-85%)`) confirms these were measured wins.

---

## 14. Styling & Design System

- **No CSS framework.** Styling is plain CSS using **CSS custom properties**
  defined in `:root`.
- **Theme:** dark background (`--bg: #0A0A0F`) with a **gold gradient**
  (`--gold-gradient`) accent (`--g: #F59E0B`), green/red for up/down change.
- **Critical CSS** (header, hero, price box, price cards, badges, live dot
  animation) is inlined in `layout.js` for instant above-the-fold render;
  the full stylesheet is `app/globals.css`.
- **RTL-first**: `direction: rtl` on the body, Arabic numerals handled by
  formatting helpers (numbers kept Latin via `toLocaleString('en-US', …)`).
- **Responsive**: fluid typography via `clamp()`, CSS grid with
  `auto-fit/minmax` for card layouts, mobile breakpoints at 768px.
- **Accessibility**: skip-link to `#main-content`, `aria-label`/`aria-expanded`
  on the menu button, `aria-live` on the live indicator, `aria-hidden` on
  decorative icons.
- **Theme color** meta adapts to light/dark via the `viewport` export.

---

## 15. Caching Strategy (Deep Dive)

There are **four cache layers** working together:

1. **Next.js Data Cache** — `fetch(..., { next: { revalidate: 60 | 1800 } })`
   deduplicates upstream goldprice.org calls across invocations within the
   window.
2. **Vercel CDN (edge)** — `Cache-Control: s-maxage=60, stale-while-revalidate`
   on API responses; serves cached JSON to most visitors without invoking the
   function.
3. **In-memory Lambda cache** — `lastGood` snapshot survives within a warm
   function instance, used as an upstream-failure fallback for up to 1 hour.
4. **Browser cache** — static assets (`svg|jpg|png|webp|avif|ico`, `_next/static`)
   get `max-age=31536000, immutable` via `next.config.js` headers; the live
   updater relies on browser + CDN caching the `/api/live-gold` response.

Page-level ISR revalidation: homepage `1800s` (30 min), karat/city/SEO pages
`3600s` (1 hour), aligned with the data-fetch revalidate windows.

---

## 16. Environment Variables

From `.env.example`:

| Variable | Purpose | Required |
|----------|---------|----------|
| `METAL_API_KEY` | MetalPriceAPI key (fallback price source) | Optional |
| `CRON_SECRET` | Secret token to authorize `/api/cron/refresh-prices` | Recommended |
| `DATABASE_URL` | Neon PostgreSQL connection string (legacy — see §20) | Optional/unused by current code |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 measurement ID; GA is only injected if set | Optional |

> Security note: `.env*` files are git-ignored. The committed `.env.example`
> contains placeholder/sample values — real secrets should be set in the Vercel
> dashboard, not committed.

---

## 17. Deployment

- **Platform:** Vercel. `vercel.json` sets `framework: nextjs`, `buildCommand:
  next build`, `outputDirectory: .next`, and pins `regions: ["fra1"]`.
- **Process (per `SETUP-GUIDE.md`):**
  1. Push the repo to GitHub.
  2. Import the project into Vercel.
  3. Set environment variables (`METAL_API_KEY`, `CRON_SECRET`, optionally
     `DATABASE_URL`, `NEXT_PUBLIC_GA_ID`).
  4. Deploy.
  5. (Optional) Create an hourly cron on **cron-job.org** pointing at
     `/api/cron/refresh-prices?secret=<CRON_SECRET>`.
- **Custom domain:** `saudi-gold.com` (used as `SITE_URL` / `metadataBase`
  throughout).

---

## 18. Local Development

```bash
# install
npm install

# dev server (http://localhost:3000)
npm run dev

# production build
npm run build

# run the production build
npm run start
```

Scripts (`package.json`): `dev` → `next dev`, `build` → `next build`,
`start` → `next start`.

No database or external service is required for local dev — `getPrices()`
fetches from goldprice.org directly and falls back to defaults if offline.

---

## 19. Security

- **Security headers** (via `next.config.js`): `X-Content-Type-Options: nosniff`,
  `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: origin-when-cross-origin`,
  `X-DNS-Prefetch-Control: on`. `poweredByHeader` is disabled.
- **Cron endpoint** is protected by a shared secret (`CRON_SECRET`).
- **No secrets in the bundle**: only `NEXT_PUBLIC_*` vars reach the client (just
  the optional GA ID). Price source keys stay server-side.
- **External links** use `rel="noopener noreferrer"` and `target="_blank"`.
- **`removeConsole`** strips console output in production builds.

---

## 20. Known Notes & Historical Context

- **Database is currently unused.** `README.md` and `SETUP-GUIDE.md` describe an
  earlier architecture where an hourly cron wrote prices into a **Neon
  PostgreSQL** database and `/api/prices` read from it. The **current code does
  not use a database** — it fetches live from goldprice.org and relies on
  multi-layer caching plus client-side updates. The `DATABASE_URL` variable and
  the Neon setup steps are therefore **legacy/optional** and can be ignored
  unless the DB path is reintroduced. (The `refresh-prices` cron endpoint still
  exists but now just returns fresh fetched prices rather than persisting them.)
- **Two price endpoints** (`/api/live-gold` and `/api/prices`) exist with
  slightly different payload shapes; `/api/prices` field names are frozen because
  an external bot consumes them.
- **Arabic redirects live in middleware, not next.config.js** — by necessity
  (non-ASCII matcher limitation), documented inline in both files.
- The previous misleading `Product` price schema was intentionally replaced with
  `ExchangeRateSpecification`.

---

## 21. Glossary (Gold Domain)

| Term (AR) | Term (EN) | Meaning |
|-----------|-----------|---------|
| عيار (Ayar) | Karat | Gold purity grade (24 = 99.9% pure) |
| جرام | Gram | Base unit for jewelry pricing |
| أونصة | Ounce | Troy ounce = 31.1035 g; global trading unit |
| مصنعية | Workmanship | Per-gram labor/crafting fee added by jewelers |
| سبائك | Bullion / Bars | Investment-grade 24K gold (low margin) |
| زكاة | Zakat | Islamic alms; 2.5% on gold above the Nisab |
| نصاب | Nisab | Zakat threshold = 85 g of pure gold |
| تولة | Tola | South-Asian unit ≈ 11.664 g |
| ريال سعودي (ر.س) | Saudi Riyal | Local currency, pegged at 3.75 per USD |

---

*This document describes the codebase as of project version `3.1.0`. Prices,
math constants (`MARKUP`, `OUNCE`, `NISAB`), and city data live in
`app/lib/gold.js` and are the authoritative source if anything here drifts.*
