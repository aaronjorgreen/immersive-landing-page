# Implementation Plan B: Business Layer, Scroll Narrative & Motion Upgrade

**Project:** Selva Viva Expeditions — v2 upgrade plan  
**Builds on:** `IMPLEMENTATION_PLAN.md` v1.1 (Phases 0–10 complete)  
**Version:** 2.0 (Planning — not yet approved for build)  
**Status:** Draft upgrade outline — **do not implement until approved**

---

## Purpose of This Document

v1 delivered the cinematic scroll journey: seven narrative acts, parallax infrastructure, environmental motion, and a single arrival CTA. It intentionally prioritised **atmosphere over conversion** and **restraint over spectacle**.

Plan B identifies where v1 leaves commercial and experiential headroom — and outlines a second build cycle to add:

1. **Business and sales information** woven into the journey (not bolted on as a brochure page)
2. **Scroll-controlled rotating headlines** — starting with a user-driven H1 carousel in the hero pin
3. **Distributed CTAs** that invite without breaking the film
4. **Richer, more realistic background motion** — depth, physics, and environmental life
5. **Supporting infrastructure** for content, forms, analytics, and expedition data

This document does **not** replace Plan A. It extends it.

---

## What v1 Delivered (Baseline)

| Area | v1 State |
|---|---|
| **Hero** | Static H1 + tagline; load fade; pin + BG scale 1→1.12 |
| **Copy** | Sparse poetic lines per act; 3 highlight bullets in Wildlife |
| **CTAs** | Scroll hint only; single primary CTA + mailto form at Arrival |
| **Business info** | Brand constants, location line, 3 expedition themes (no pricing, dates, or catalog) |
| **Motion** | CSS drift (clouds, birds), opacity pulse (fireflies), SVG shimmer (water), parallax layers |
| **Assets** | Procedural SVG placeholders; illustration-only; no photo/video/WebGL |
| **Infrastructure** | Static React app; no CMS, analytics, or form backend |
| **Nav** | No persistent chrome beyond scroll hint |

Plan B upgrades each of these deliberately — not all at once without review.

---

## Creative Direction for v2 (Revised Principles)

Plan A principles still apply. v2 adds three modifiers:

1. **Commerce serves the story** — Pricing, dates, and expedition details appear as *discoveries along the descent*, not sidebar widgets. The visitor learns what they can book because the river showed them why.
2. **Scroll is the editor** — Rotating headlines are scrubbed, not auto-played. The user controls pace; motion follows their thumb/wheel. No carousel timers in the hero.
3. **Realism through layers, not noise** — Richer motion means more depth planes, subtle physics, and light behaviour — not more bouncing elements. If realism costs 60fps, simplify the layer count before simplifying the story.

### Updated Voice Guardrails

| Keep from v1 | Add in v2 |
|---|---|
| Sensory, reverent tone | Concrete expedition facts (duration, group size, season) |
| Invitation, not urgency | Clear next steps at multiple beats |
| No poverty tourism framing | Social proof from travellers and guides (fictional but respectful) |
| 12-word headline max per beat | Rotating headlines = 3–4 beats × 12 words, scroll-gated |
| No countdown / fake scarcity | "Limited departures" only if tied to real seasonality data |

---

## 1. Business & Sales Information Architecture

v1 defined the persona but did not surface enough for a visitor to **evaluate and enquire**. v2 introduces a **content model** and **surface map**.

### 1.1 Expedition Data Model

Centralise in `src/lib/expeditions.ts` (or CMS-backed JSON) — not scattered in components.

```ts
interface Expedition {
  id: string
  slug: string
  name: string               // e.g. "Rio Negro Dawn"
  durationDays: [number, number]
  priceFrom: number          // USD, "from" pricing
  currency: 'USD'
  season: string[]           // e.g. ['May', 'Jun', 'Jul']
  groupSize: [number, number]
  difficulty: 'gentle' | 'moderate' | 'immersive'
  highlights: string[]       // max 3 sensory bullets
  includes: string[]         // meals, guide, permits, etc.
  heroImage?: string         // v2 optional WebP
}
```

**Seed catalog (fictional):**

| Expedition | Duration | From | Hook |
|---|---|---|---|
| Rio Negro Dawn | 3–5 days | $2,400 | First light on black water |
| Canopy & Current | 7–10 days | $4,800 | Treetops to riverbed |
| Full Basin Immersion | 12–14 days | $7,200 | The complete descent |

### 1.2 Information Surfaces (Where Sales Content Lives)

| Surface | Narrative fit | Content |
|---|---|---|
| **Hero rotating H1s** | Act 1 — wonder → offer | Brand name → sensory promise → duration hook → tagline |
| **Wildlife act (expand)** | Act 4 — life & choice | Expedition cards scrubbed into view; each card = one offering |
| **New: Expeditions interlude** | Between Wildlife & Community (~120vh) | Scroll-driven catalog strip; detail expands on scroll hold |
| **Community act (expand)** | Act 5 — trust | Guide credentials, years operating, respectful tourism pledge |
| **Depths act (expand)** | Act 6 — decision pause | Testimonial quote rotation (scroll-scrubbed); social proof |
| **Arrival act (expand)** | Act 7 — conversion | Form + expedition selector dropdown + secondary links |
| **Persistent mini-nav** | UI chrome | Section dots + "Enquire" ghost button after Act 1 |

### 1.3 Trust & Conversion Elements

- **Social proof:** 2–3 short traveller quotes (scroll-rotated in Depths); guide name + tenure in Community
- **FAQ block:** 4–5 questions at Arrival (accordion, below form) — visas, fitness, what to pack, cancellation policy
- **Seasonality callout:** "Best departures: May–September" in hero rotation or Expeditions interlude
- **Secondary CTA (v1 unbuilt):** "View Expeditions" → smooth scroll to interlude or opens expedition panel
- **Micro-CTAs:** Text links at end of River ("See journey options →") and Wildlife ("Compare expeditions →")

### 1.4 Sales Copy Rules

- Every price shown as **"from $X,XXX"** with footnote "per person, shared cabin"
- No discount language, countdown timers, or "only 2 spots left" unless driven by real inventory (future backend)
- Headlines remain poetic; **body copy carries facts** beneath stagger reveals
- Expedition names use place + time language (Rio Negro Dawn), not adventure-brochure clichés (Ultimate Amazon Adventure)

---

## 2. Scroll-Controlled Rotating Headlines

v1 uses static headlines per act. v2 introduces **scrub-synced headline rotation** — the user's scroll position selects which line is visible.

### 2.1 Hero: User-Controlled Rotating H1 (Priority ★)

**Behaviour:** During the hero pin (existing scale 1→1.12), scroll progress drives a **crossfade carousel** of H1 variants. No autoplay. Scrolling down advances; scrolling up reverses.

**Pin timeline (desktop, ~100% scroll during pin):**

```
Scroll progress   H1 displayed
─────────────────────────────────────────
0% – 25%          "Selva Viva Expeditions"
25% – 50%         "Three to fourteen days on the Rio Negro."
50% – 75%         "Canopy walks. Black-water nights. Respectful river journeys."
75% – 100%        "Where the river remembers your name."  (tagline becomes H1 beat)
```

**Motion spec:**
- Outgoing line: `opacity 1→0`, `y 0→-24`, `filter: blur(0→4px)` over 15% scroll segment
- Incoming line: reverse; overlap 5% crossfade
- Single `h1` in DOM with `aria-live="polite"` OR visually hidden static h1 + `role="presentation"` rotated spans (accessibility review required)
- Tagline `<p>` fades out when rotation begins; reappears only on final beat if desired
- **Scroll progress indicator:** thin dawn-gold line or "01 / 04" counter below H1 — subtle, not a UI slider

**Mobile:** Shorter pin (`+=60%`); 3 beats instead of 4 if needed; same scrub logic

**New component:** `ScrollRotatingHeadline.tsx` — reusable for hero and other acts

```tsx
interface ScrollRotatingHeadlineProps {
  lines: string[]
  trigger: string | Element
  scrollStart: string   // e.g. 'top top'
  scrollEnd: string     // e.g. '+=100%'
  pin?: boolean
}
```

### 2.2 Rotating Headers in Other Acts (Phase 2 of headline work)

| Act | Rotation pattern | Example lines |
|---|---|---|
| **River** | 2 beats, side-enter | "The river carries everything." → "Black water. Silver reflection. Ancient current." |
| **Wildlife** | 3 beats synced to card focus | One headline per expedition as cards scroll into centre |
| **Depths** | 2 beats, testimonial | "The river remembers." → Rotating guest quote (scroll-scrubbed) |
| **Arrival** | Static H1 + rotating subhead | "Begin Your Descent" + "Choose your expedition" / "Tell us your dates" |

All rotations use the same `ScrollRotatingHeadline` primitive — no independent carousel logic per section.

---

## 3. CTA Strategy (Distributed, Not Dumped)

v1: one conversion moment. v2: **invitation ladder** — each CTA earns its place in the narrative.

### 3.1 CTA Map

| Location | Type | Label | Action |
|---|---|---|---|
| Hero (after pin release) | Ghost button | View Expeditions | Scroll to `#expeditions` interlude |
| River (copy exit) | Text link | Explore journeys → | Scroll to `#expeditions` |
| Wildlife (post-cards) | Secondary button | Compare all expeditions | Open expedition panel / scroll |
| Community | Text link | Meet our guides → | Expand inline guide bios |
| Depths | None | — | Pause beat; no CTA (respect the moment) |
| Arrival | Primary + secondary | Begin Your Descent / Download itinerary (PDF) | Form submit / static PDF |
| Persistent (post-hero) | Fixed ghost | Enquire | Scroll to `#arrival` |

### 3.2 New UI Components

| Component | Purpose |
|---|---|
| `ExpeditionCard.tsx` | Scrub-reveal card with duration, price, CTA |
| `ExpeditionPanel.tsx` | Optional slide-over detail view (desktop) / full-screen sheet (mobile) |
| `MiniNav.tsx` | Section progress + Enquire; appears after hero pin ends |
| `FAQAccordion.tsx` | Arrival section; keyboard accessible |
| `GuideBio.tsx` | Community section expansion |

### 3.3 CTA Tone Checklist

- [ ] No popup modals on page load
- [ ] No exit-intent overlays
- [ ] Fixed Enquire button uses ghost styling — visible but not shouting
- [ ] Primary button appears only at Arrival (journey earned)

---

## 4. Realistic Background Motion Upgrade

v1 motion is intentionally subtle (CSS keyframes, simple SVG). v2 targets **believable environment** while staying GPU-friendly.

### 4.1 Motion Upgrade Matrix

| Layer | v1 | v2 Target | Technique |
|---|---|---|---|
| **Clouds** | 2 SVG layers, horizontal drift | 4+ depth planes, vertical + horizontal drift, opacity variance | Multi `ParallaxLayer` + staggered CSS; optional Perlin noise offset via GSAP custom property |
| **Sky / light** | Static gradient | Slow dawn shift during hero pin; god rays | CSS gradient animation scrubbed to scroll; radial gradient mask |
| **Canopy trees** | Static SVG silhouettes | Gentle sway (phase-offset sine) | GSAP `y` + `rotation` oscillation per tree group; 3–5° max |
| **Mist** | Blur div, translateY scrub | Volumetric feel: 3 mist sheets, different blur/speed | Layered `MistLayer` instances; `filter: blur()` + opacity |
| **Leaves / pollen** | 12 CSS dots | 30+ particles, depth-scaled speed, wind gusts | Lightweight canvas particle system OR CSS with `--depth` custom property |
| **Water** | SVG wave + background-position shimmer | Path morph + caustic overlay + reflection ripple | GSAP MorphSVG (or CSS clip-path) + animated noise texture (WebP, low opacity) |
| **Birds** | 3 silhouettes, translate drift | Wing flap cycle (2-frame SVG swap or rotate transform on wing path) | SVG sprite or `@keyframes` on wing group; slow banking arcs |
| **Fireflies** | Opacity pulse dots | Drift paths + brightness variance | GSAP motion paths or canvas; fewer on mobile |
| **River reeds** | Static foreground | Wind ripple, FG parallax increase on scroll | Sine wave on path control points (simplified) |

### 4.2 Realism Principles

1. **Phase offset everything** — No two trees sway in sync. Use `index * 0.7s` delay pattern (extend v1 leaf pattern).
2. **Depth drives speed** — Far layers move slower; near layers faster. Reinforce existing parallax ratios; don't replace them.
3. **Scroll couples to wind** — Optional: global `--wind-intensity` custom property tied to scroll velocity (Lenis) for gust responsiveness. Cap effect to avoid motion sickness.
4. **No video loops in hero** — Maintain v1 performance posture; realism via layers, not MP4.
5. **WebGL: opt-in, isolated** — If needed, single `<canvas>` for water caustics only — behind SVG reeds, fixed size, disabled on low-power mode / reduced motion.

### 4.3 New Layer Components

```
src/components/layers/
├── CloudLayer.tsx          # upgrade: multi-plane
├── MistLayer.tsx           # upgrade: volumetric stack
├── WaterLayer.tsx          # upgrade: morph + caustics
├── CanopySwayLayer.tsx     # new
├── ParticleField.tsx       # new — leaves, pollen, spores
├── BirdLayer.tsx           # new — replaces inline SVG in Wildlife
├── LightRaysLayer.tsx      # new — hero + arrival
└── CausticsLayer.tsx       # new — optional canvas, river only
```

### 4.4 Performance Budget (Revised)

| Metric | v1 | v2 Target |
|---|---|---|
| Scroll FPS (mid-tier mobile) | 60fps | ≥55fps; degrade gracefully |
| Max actively animating layers per section | ~5 | ~8 (with mobile cap at 5) |
| Canvas usage | None | 0–1 per page (river caustics) |
| `will-change` elements | Parallax only | Parallax + active particle containers |
| Reduced motion fallback | Static composition | Static + all rotating headlines show line 1 only |

**Degradation order when FPS drops:** Disable caustics → reduce particle count → disable tree sway → simplify cloud planes.

---

## 5. Infrastructure & Content Layer

v1 is a static SPA. v2 adds the scaffolding for a **maintainable commercial site** without necessarily deploying a full CMS on day one.

### 5.1 Content Architecture

```
src/
├── content/
│   ├── expeditions.json      # catalog data (CMS-ready)
│   ├── testimonials.json
│   ├── faq.json
│   ├── guides.json
│   └── headlines.json        # rotating H1/H2 copy per act
├── lib/
│   ├── content.ts            # typed loaders
│   ├── analytics.ts          # event helpers
│   └── form.ts               # submission adapter
```

Copy moves out of components into JSON. Components consume via hooks: `useExpeditions()`, `useHeadlines('hero')`.

### 5.2 Form & Enquiry Backend

| Option | Phase | Notes |
|---|---|---|
| **Formspree / Basin** | B1 (fast) | Drop-in; no server |
| **Netlify Forms** | B1 | If deployed on Netlify |
| **Serverless API route** | B2 | Custom validation, expedition ID in payload |
| **CRM webhook** | B3 | HubSpot / Notion / Airtable integration |

**Form upgrades:**
- Expedition selector (required dropdown from catalog)
- Preferred dates (month picker)
- Group size
- Honeypot spam field
- Success state (inline thank-you — not redirect)

### 5.3 Analytics & Scroll Intelligence

Track narrative engagement without breaking immersion:

| Event | Trigger |
|---|---|
| `hero_headline_view` | Each H1 beat reached (index 0–3) |
| `section_enter` | Each act enters viewport |
| `expedition_card_focus` | Card centred in interlude |
| `cta_click` | Any CTA; include `location` param |
| `form_start` / `form_submit` | Arrival form |
| `scroll_depth` | 25 / 50 / 75 / 100% |

Implement via `src/lib/analytics.ts` — pluggable adapter (Plausible, GA4, or console in dev). No third-party scripts in critical path; load deferred.

### 5.4 SEO & Structured Data

- Expand `<meta>` per section themes
- JSON-LD: `TouristTrip`, `Organization`, `FAQPage`
- Open Graph image (generated static asset)
- Semantic heading order updated for rotating H1 strategy (document in accessibility section)

### 5.5 Optional CMS Path (B3)

If content changes frequently:

- **Decap CMS / Sanity / Contentful** for expeditions + headlines
- Build-time fetch into JSON (keeps Vite SPA fast)
- Not required for B1 launch

---

## 6. Architecture Changes

### 6.1 Updated Folder Structure

```
src/
├── app/
│   ├── App.tsx
│   ├── ScrollProvider.tsx
│   └── AnalyticsProvider.tsx       # new
├── content/                         # new — JSON copy & data
├── sections/
│   ├── HeroSection.tsx              # upgrade: rotating H1
│   ├── ExpeditionsSection.tsx       # new interlude
│   ├── WildlifeSection.tsx          # upgrade: expedition cards
│   ├── CommunitySection.tsx         # upgrade: guide bios
│   ├── DepthsSection.tsx            # upgrade: testimonial rotation
│   └── CTASection.tsx               # upgrade: form + FAQ
├── components/
│   ├── layers/                      # upgraded + new layers (see 4.3)
│   ├── text/
│   │   ├── ScrollRevealText.tsx
│   │   └── ScrollRotatingHeadline.tsx   # new ★
│   ├── expedition/                  # new
│   │   ├── ExpeditionCard.tsx
│   │   ├── ExpeditionPanel.tsx
│   │   └── ExpeditionCompare.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── MiniNav.tsx              # new
│       ├── FAQAccordion.tsx         # new
│       └── ScrollHint.tsx
├── hooks/
│   ├── useScrollProgress.ts
│   ├── useRotatingHeadline.ts       # new
│   ├── useAnalytics.ts              # new
│   └── ...
└── lib/
    ├── constants.ts
    ├── content.ts                   # new
    ├── analytics.ts                 # new
    └── form.ts                      # new
```

### 6.2 New Scroll Primitives

| Primitive | Responsibility |
|---|---|
| `ScrollRotatingHeadline` | Scrub-synced multi-line headline crossfade |
| `useRotatingHeadline` | Normalised progress → active index + crossfade amount |
| `ScrollScrubbedCards` | Horizontal or vertical card focus based on scroll centre |

---

## 7. Revised Narrative Arc (v2)

Acts remain seven; one **interlude** inserts between Wildlife and Community. Pacing adjusts slightly.

```
ACT 1   THE SKY           → Wonder + offer hint (rotating H1)     (~120dvh pin extended)
ACT 2   THE CANOPY        → Mystery (sway, volumetric mist)        (~120vh)
ACT 3   THE RIVER         → Flow + first micro-CTA                 (~150vh)
ACT 4   THE WILDLIFE      → Life + expedition cards                (~120vh)
        ─── EXPEDITIONS ───  Catalog interlude (scroll-scrubbed)   (~120vh) ★ new
ACT 5   THE PEOPLE        → Trust (guides, credentials)            (~110vh)
ACT 6   THE DEPTHS        → Testimonial rotation + pause           (~90vh)
ACT 7   THE ARRIVAL       → Form + FAQ + primary CTA               (~110dvh)
```

**Total scroll length:** ~15–20% longer than v1 — acceptable if motion stays smooth.

---

## 8. Build Phases (Plan B)

Follow `GITHUB_ISSUES_GUIDE.md` — one issue per phase, branch → PR → merge.

### Phase B0 — Content & Data Foundation
- [ ] JSON content files (expeditions, headlines, FAQ, testimonials, guides)
- [ ] Typed content loaders (`src/lib/content.ts`)
- [ ] Move hardcoded copy from sections to content layer
- [ ] Expand `constants.ts` with CTA labels, analytics event names

### Phase B1 — Scroll Rotating Headline System ★
- [ ] `ScrollRotatingHeadline` component
- [ ] `useRotatingHeadline` hook
- [ ] Hero integration: 4-beat H1 rotation during pin
- [ ] Scroll progress indicator (01/04)
- [ ] Accessibility: screen reader strategy documented + implemented
- [ ] Reduced motion: show first headline only

### Phase B2 — Hero & Sky Motion Upgrade
- [ ] Multi-plane cloud system (4 layers)
- [ ] Scrubbed dawn light shift + optional god rays
- [ ] Extend hero pin to accommodate H1 rotation timeline
- [ ] "View Expeditions" ghost CTA after pin release

### Phase B3 — Environmental Realism Pass
- [ ] Canopy sway layer
- [ ] Volumetric mist stack (Canopy)
- [ ] Water path morph + caustic overlay (River)
- [ ] Bird layer with wing flap cycle (Wildlife)
- [ ] Enhanced particle field (leaves, pollen)
- [ ] Firefly motion paths (Depths)
- [ ] Mobile degradation rules

### Phase B4 — Expeditions Interlude & Wildlife Cards
- [ ] New `ExpeditionsSection.tsx`
- [ ] `ExpeditionCard` with scroll focus state
- [ ] Upgrade Wildlife to card-driven headline rotation
- [ ] Expedition detail panel (mobile sheet / desktop side panel)
- [ ] Compare micro-interaction (optional)

### Phase B5 — Business Content & Trust
- [ ] Community: guide bios + operating credentials
- [ ] Depths: scroll-rotated testimonials
- [ ] River + Wildlife micro-CTAs
- [ ] FAQ accordion at Arrival
- [ ] Form: expedition selector, dates, group size

### Phase B6 — CTA Infrastructure & Mini-Nav
- [ ] Persistent `MiniNav` (section dots + Enquire)
- [ ] Form backend integration (Formspree or equivalent)
- [ ] Form success / error states
- [ ] Secondary CTA: itinerary PDF download (static asset)

### Phase B7 — Analytics & SEO
- [ ] Analytics adapter + scroll/CTA events
- [ ] JSON-LD structured data
- [ ] OG meta + share image
- [ ] Deferred script loading

### Phase B8 — Performance & Realism Tuning
- [ ] FPS profiling on mid-tier mobile with all layers active
- [ ] Degradation cascade implemented
- [ ] Lighthouse 85+ with richer motion ( revised target)
- [ ] Cross-browser: iOS Safari, Chrome Android

### Phase B9 — Responsive & Accessibility Pass
- [ ] Rotating headlines on mobile (3-beat variant)
- [ ] Mini-nav thumb zone + safe areas
- [ ] FAQ / form keyboard flow
- [ ] WCAG AA on all new business copy backgrounds
- [ ] `prefers-reduced-motion` full audit

---

## 9. GitHub Issue Mapping (Plan B)

| Issue title | Phase |
|---|---|
| `[Content] Expedition data model and JSON content layer` | B0 |
| `[Core] Scroll rotating headline system` | B1 |
| `[Section] Hero upgrade — rotating H1 and sky motion` | B2 |
| `[Motion] Environmental realism pass` | B3 |
| `[Section] Expeditions interlude and wildlife cards` | B4 |
| `[Content] Trust, testimonials, and guide bios` | B5 |
| `[Infra] CTA distribution, mini-nav, and form backend` | B6 |
| `[Infra] Analytics and SEO structured data` | B7 |
| `[Polish] Performance tuning for v2 motion budget` | B8 |
| `[Polish] Responsive and accessibility pass (v2)` | B9 |

---

## 10. Accessibility Considerations (v2)

| Concern | Approach |
|---|---|
| **Multiple H1 beats** | One semantic `<h1>`; rotate visually hidden/visible spans OR `aria-live="polite"` with full line announced on beat change |
| **Motion sensitivity** | All new realism layers disabled under `prefers-reduced-motion`; static headline line 1 |
| **CTA focus order** | Mini-nav Enquire does not trap focus; skip link to main content |
| **Form labels** | All new fields labelled; expedition selector keyboard navigable |
| **FAQ accordion** | `button` + `aria-expanded`; focus management |
| **Scroll-only content** | Critical expedition facts available without scroll (noscript / static fallback block in HTML) |

---

## 11. Risks & Mitigations (v2)

| Risk | Mitigation |
|---|---|
| Hero rotation feels like an ad carousel | Scrub-only control; poetic lines first; facts on beats 2–3 only |
| Sales content breaks cinematic flow | Interlude act + micro-CTAs; no popups; facts as discoveries |
| Realistic motion tanks mobile FPS | Degradation cascade; canvas opt-in; cap particles |
| Scope creep into WebGL / video | Water caustics only; no hero video; review gate at B3 |
| Rotating H1 SEO confusion | Static noscript h1; JSON-LD; first beat = brand name |
| Form backend adds deployment complexity | Start Formspree (B6); upgrade later |
| Longer page length | Accept 15–20% more scroll; tighten interlude if testing shows drop-off |

---

## 12. Out of Scope (Plan B)

- Full CMS admin UI
- Payment / booking engine
- User accounts
- Background audio
- Full WebGL scene
- i18n
- Live inventory / real-time availability
- Multi-page routing

---

## 13. Definition of Done (Plan B)

The v2 upgrade is complete when:

1. Hero H1 rotates through 3–4 scroll-controlled beats during pin — no autoplay.
2. At least one additional act uses scroll-rotated headlines (Wildlife or Depths).
3. Expedition catalog is visible with duration, price-from, and highlights — data-driven from JSON.
4. CTAs appear at ≥3 narrative beats plus persistent Enquire chrome — none use urgency tactics.
5. Background motion is observably richer (multi-plane clouds, sway, water morph, bird flap) at 60fps desktop / ≥55fps mobile.
6. Form submits to a real backend (not mailto) with expedition selection.
7. Analytics fires headline, section, and CTA events.
8. Reduced-motion fallback is complete and beautiful.
9. All Plan B GitHub issues (B0–B9) closed with acceptance criteria met.

---

## 14. Suggested Build Order

1. **B0 → B1** — Content layer + rotating headline primitive (unblocks hero and depths)
2. **B2** — Hero upgrade (highest visibility; validate scroll-H1 feel early)
3. **B3** — Environmental realism (can parallelise with B4 after B2)
4. **B4 → B5** — Commercial content surfaces
5. **B6 → B7** — Infrastructure (form, nav, analytics)
6. **B8 → B9** — Polish passes

**Do not start B3 (heavy motion) until B1 (headline system) is merged and hero pin timeline is stable.**

---

## 15. Relationship to Plan A

| Plan A (v1) | Plan B (v2) |
|---|---|
| Cinematic first | Cinematic + convertible |
| Static hero H1 | Scroll-rotated H1 |
| One CTA | Invitation ladder |
| Subtle CSS motion | Layered environmental realism |
| Hardcoded copy | JSON content layer |
| mailto form | Form backend + expedition selector |
| No analytics | Scroll intelligence |
| Illustration SVG | SVG + optional caustic canvas |

Plan A remains the creative foundation. Plan B must not rewrite the descent metaphor — it **deepens** it with information the traveller needs before they enquire.

---

*Draft v2.0 — awaiting creative and technical review before issue creation. Do not implement until approved.*
