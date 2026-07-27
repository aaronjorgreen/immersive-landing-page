# Implementation Plan: Immersive Amazonian Travel Landing Page

**Project:** Selva Viva Expeditions — scroll-driven cinematic landing page  
**Version:** 1.1 (Creative Director review)  
**Status:** Approved for build — planning complete

---

## Creative Direction (Read First)

This is not a website. It is a **90-second film** where scroll is the camera dolly.

Every decision — motion, copy, colour, timing — must serve one feeling: **the visitor is descending from sky into the living Amazon**, and the final frame earns the right to ask them to begin.

### Non-Negotiable Creative Principles

1. **Restraint over spectacle** — Animate fewer things, but animate them beautifully. Never compete with the story.
2. **One idea per scroll beat** — Each section communicates a single emotional note before the next begins.
3. **Continuity over chapters** — Sections bleed into one another. No hard cuts, no "new slide" energy.
4. **Copy is sparse** — Headlines: 12 words max. Body: 2 short sentences max per beat. Silence is a tool.
5. **Mobile is portrait cinema** — Not a shrunk desktop. Vertical depth, gentler motion, thumb-friendly CTA.
6. **Performance is part of the craft** — If motion drops below 60fps, simplify a layer — never the story.

---

## 1. Business Persona (Fictional)

| Field | Detail |
|---|---|
| **Company** | **Selva Viva Expeditions** |
| **Tagline** | *"Where the river remembers your name."* |
| **Origin** | Manaus, Brazil — expeditions into the Rio Negro basin |
| **Offerings** | 3–14 day river journeys, canopy walks, wildlife photography, respectful community visits |
| **Audience** | Eco-conscious adventurers and photographers, 30–55 |
| **Tone** | Reverent, immersive, cinematic — never tourist-brochure |
| **Primary CTA** | **Begin Your Descent** → expedition inquiry form |
| **Secondary CTA** | View expeditions (anchor scroll or modal) |

### Voice & Copy Guardrails

- Use **sensory language** (mist, current, canopy, dawn) — not feature lists.
- Reference real geography lightly (Rio Negro, Amazon basin) without claiming partnerships that do not exist.
- Community section: **respectful, observational** — no poverty tourism, no "discover the natives" framing.
- CTA section: **invitation, not urgency** — no countdown timers, no fake scarcity.

---

## 2. Narrative Arc & Emotional Pacing

Scroll = descent. Pacing must **breathe** — not every act is the same length or speed.

```
ACT 1  THE SKY        → Wonder, openness, stillness         (~100dvh + brief pin)
ACT 2  THE CANOPY     → Mystery, soft disorientation          (~120vh)
ACT 3  THE RIVER      → Flow, depth, reflection               (~150vh) ★ FG/BG split
ACT 4  THE WILDLIFE   → Life, movement, surprise              (~100vh)
ACT 5  THE PEOPLE     → Warmth, human scale                   (~100vh)
ACT 6  THE DEPTHS     → Intimacy, darkness, pause             (~80vh)
ACT 7  THE ARRIVAL    → Resolution, invitation                (~100dvh)
```

### Colour Story (Light → Shadow → Warm Return)

| Act | Palette shift |
|---|---|
| Sky | Dawn gold, pale rose, distant blue-grey |
| Canopy | Deep emerald, mist white, muted shadow |
| River | Teal, silver reflection, reed green |
| Wildlife | Saturated green accents, dappled light |
| Community | Golden hour amber, warm skin tones in illustration |
| Depths | Indigo shadow, bioluminescent points |
| Arrival | Convergence — river teal meets dawn gold (journey complete) |

---

## 3. Tech Stack

| Layer | Choice | Rationale |
|---|---|---|
| Bundler | Vite + React + TypeScript | Fast iteration, typed components |
| Scroll cinematics | GSAP + ScrollTrigger | Industry standard for scrubbed scroll motion |
| Smooth scroll | Lenis | Buttery wheel/touch; never hijack user control |
| Text motion | GSAP or Framer Motion | Viewport enter/exit with scrub sync |
| Styling | Tailwind CSS + CSS custom properties | Responsive tokens, theme variables |
| Assets | SVG layers + WebP/AVIF | GPU-friendly parallax; no hero video in v1 |
| Fonts | Display serif + clean sans | Poetry vs utility — load with `font-display: swap` |

### Viewport & Layout Rules (Screen vs Window)

- **Layout heights:** Use `100dvh` / `min-h-[100dvh]` for full-screen sections — not `100vh` alone (mobile browser chrome).
- **JS calculations:** Use `window.innerHeight` only for parallax math and ScrollTrigger refresh — not for setting layout height in CSS.
- **Safe areas:** Respect `env(safe-area-inset-*)` on mobile for CTA and scroll hint.
- **Overflow:** `overflow-x: hidden` on root; never trap vertical scroll.

---

## 4. Architecture

```
src/
├── app/                      # Root layout, Lenis provider, scroll context
├── sections/                 # One component per narrative act
│   ├── HeroSection.tsx
│   ├── CanopySection.tsx
│   ├── RiverSection.tsx          ★ foreground/background parallax
│   ├── WildlifeSection.tsx
│   ├── CommunitySection.tsx
│   ├── DepthsSection.tsx
│   └── CTASection.tsx
├── components/
│   ├── layers/               # ParallaxLayer, MistLayer, CloudLayer, WaterLayer
│   ├── text/                 # ScrollRevealText, StaggerLines
│   └── ui/                   # Button, ScrollHint (minimal chrome — no heavy nav)
├── hooks/
│   ├── useScrollProgress.ts
│   ├── useParallax.ts
│   └── useReducedMotion.ts
├── lib/
│   ├── gsap.ts               # ScrollTrigger + Lenis registration
│   └── constants.ts          # Z-index stack, section timing, parallax ratios
└── assets/                   # SVG layers, optimised images
```

### Z-Index Stack (back → front)

`sky gradient → distant mountains/treeline → mid canopy → mist → river → foreground foliage → birds/particles → typography → UI chrome`

---

## 5. Section Specifications

| Section | Height | Camera / motion | Copy (draft) | Text animation |
|---|---|---|---|---|
| **Hero** | 100dvh + pin | BG scale 1→1.12; clouds drift (CSS); scroll hint pulses | *Selva Viva Expeditions* / tagline | Load: fade + scale; hint fades on first scroll |
| **Canopy** | ~120vh | Mist rise; layers 0.1x / 0.35x; overlap hero | *Descend into the green.* | Scrub: slide up + fade in |
| **River** | ~150vh | **BG 0.15x / FG 0.6x**; water shimmer; reflection layer | *The river carries everything.* | Enter from side; exit fade + scale down |
| **Wildlife** | ~100vh | 3 depth layers; 2–3 bird silhouettes (subtle loop) | 3 expedition highlights, staggered | Stagger reveal on scroll |
| **Community** | ~100vh | Golden palette; slow parallax on text only | *Stories older than maps.* | Single block reveal |
| **Depths** | ~80vh | Vignette; firefly dots; slowest parallax | *The river remembers.* | Dramatic line — hold 1 beat |
| **CTA** | ~100dvh | Prior layers converge; subtle pulse on button | *Begin Your Descent* | CTA scale on enter; form focus states |

---

## 6. Build Phases

### Phase 0 — Foundation
- [ ] Scaffold Vite + React + TS + Tailwind
- [ ] Install GSAP, ScrollTrigger, Lenis
- [ ] Define design tokens (colours, spacing, type scale)
- [ ] Global styles: overflow, fonts, reduced-motion base
- [ ] Minimal README with dev commands

### Phase 1 — Scroll Infrastructure
- [ ] Lenis + ScrollTrigger integration (`scrollerProxy` if required)
- [ ] Global scroll progress (0–1)
- [ ] Reusable `ParallaxLayer` component
- [ ] Resize / orientation / `visualViewport` refresh handler
- [ ] `useReducedMotion` — static beautiful fallback

### Phase 2 — Act 1: Hero
- [ ] Full-viewport hero with layered sky
- [ ] Load animation for title + tagline
- [ ] Scroll hint; fades after first scroll
- [ ] Brief pin + background push-in on scroll

### Phase 3 — Act 2: Canopy
- [ ] Overlap transition from hero (no hard edge)
- [ ] Mist layer (opacity + translateY scrub)
- [ ] Canopy silhouettes with parallax
- [ ] Floating leaf particles (CSS — lightweight)

### Phase 4 — Act 3: River ★
- [ ] **Foreground / background speed split** (mandatory)
- [ ] Water shimmer animation
- [ ] Reflection layer (inverted, low opacity)
- [ ] Copy enter/exit animations

### Phase 5 — Act 4: Wildlife
- [ ] Three-layer depth composition
- [ ] Bird SVG motion (subtle, not cartoonish)
- [ ] Staggered highlight bullets

### Phase 6 — Act 5: Community
- [ ] Golden-hour palette shift
- [ ] Village / canoe illustration layer
- [ ] Respectful ethos copy block

### Phase 7 — Act 6: Depths
- [ ] Dark vignette; slowest motion in experience
- [ ] Firefly / bioluminescent micro-animations
- [ ] Single dramatic line — pause before CTA

### Phase 8 — Act 7: CTA (The Arrival)
- [ ] Converging background layers
- [ ] Primary CTA: **Begin Your Descent**
- [ ] Inquiry form (name, email, message) or mailto fallback
- [ ] Section feels like destination — not another slide

### Phase 9 — Polish & Performance
- [ ] Lazy-load below-fold assets; preload hero critical path
- [ ] GPU-only animation properties (`transform`, `opacity`)
- [ ] ScrollTrigger refresh debounced on resize
- [ ] Lighthouse target: 90+ performance; zero CLS on hero
- [ ] Cross-browser: Safari iOS (`100dvh`), Chrome Android touch

### Phase 10 — Responsive & Mobile
- [ ] Breakpoints: mobile (<768), tablet (768–1024), desktop (>1024)
- [ ] Mobile parallax multipliers at ~50% of desktop values
- [ ] Touch-friendly Lenis config; no hover-only interactions
- [ ] Fluid type via `clamp()`
- [ ] Test portrait + landscape on mid-tier devices

---

## 7. Asset Direction

| Asset | Approach |
|---|---|
| Sky / gradients | CSS custom properties — no image needed |
| Treeline / canopy / river | **Consistent illustrated SVG style** (not mixed photo + illustration) |
| Mist | CSS gradient + `filter: blur()` div |
| Water | SVG wave paths + CSS `background-position` shimmer |
| Birds | 2–3 simple silhouettes — slow drift, not flapping cartoons |
| Fireflies | Small CSS dots with opacity pulse |
| Photography | Defer to v2 — illustration-only keeps v1 cohesive and fast |

Start with procedural / SVG placeholders. Asset swaps must not require scroll logic changes.

---

## 8. Performance Budget

- **Target:** 60fps scroll on mid-tier mobile
- Animate **only** `transform` and `opacity`
- No layout-triggering properties during scroll
- `will-change: transform` only on actively scrubbed layers
- Images: WebP/AVIF, explicit dimensions, `loading="lazy"` below fold
- **`prefers-reduced-motion`:** Static layered composition — still beautiful, zero scrub

---

## 9. Accessibility Baseline

- Semantic HTML: one `h1`, logical heading order per section
- All motion respects `prefers-reduced-motion`
- CTA and form: visible focus states, labels, keyboard navigable
- Colour contrast: body copy WCAG AA minimum on all backgrounds
- Scroll hint: decorative only — experience must be clear without it

---

## 10. GitHub Issue Mapping

Each phase above maps to one GitHub Issue. See `GITHUB_ISSUES_GUIDE.md` for mandatory workflow.

| Issue title | Phase |
|---|---|
| `[Setup] Project foundation and design tokens` | Phase 0 |
| `[Core] Scroll infrastructure and parallax system` | Phase 1 |
| `[Section] Act 1 — Hero` | Phase 2 |
| `[Section] Act 2 — Canopy` | Phase 3 |
| `[Section] Act 3 — River (FG/BG parallax)` | Phase 4 |
| `[Section] Act 4 — Wildlife` | Phase 5 |
| `[Section] Act 5 — Community` | Phase 6 |
| `[Section] Act 6 — Depths` | Phase 7 |
| `[Section] Act 7 — CTA / The Arrival` | Phase 8 |
| `[Polish] Performance and cross-browser pass` | Phase 9 |
| `[Polish] Responsive and mobile experience` | Phase 10 |

---

## 11. Risks & Mitigations

| Risk | Mitigation |
|---|---|
| Janky mobile scroll | Lower parallax ratios; tune Lenis `touchMultiplier` |
| Lenis + ScrollTrigger conflict | Official integration pattern; single scroller element |
| Visual clutter | Cap animated layers per section; creative review before merge |
| Motion sickness | Gentler mobile multipliers; honour reduced motion |
| Scope creep (sound, video, WebGL) | Out of scope for v1 — log as future issue if desired |

---

## 12. Out of Scope (v1)

- Background audio / sound design
- Hero video or WebGL
- CMS or backend — static form / mailto is sufficient
- Multi-page routing
- i18n

---

## 13. Definition of Done

The experience is complete when:

1. A visitor can scroll from sky to CTA without a single hard section break.
2. At least one section demonstrates clear foreground / background parallax speed difference.
3. Environmental motion (mist, clouds, birds, water, fireflies) is present and subtle.
4. Text animates in and out of the viewport with fade, scale, or position motion.
5. Desktop and mobile both feel intentional — not degraded.
6. Scroll remains smooth on a mid-tier phone.
7. CTA section feels like the end of a journey, not a popup.
8. All GitHub Issues for Phases 0–10 are closed with acceptance criteria met.

---

## 14. Suggested Build Order

1. Phase 0 → 1 (foundation + scroll engine)
2. Hero — validate "camera push" feel before building further acts
3. River — validate FG/BG parallax (hardest technical proof)
4. Remaining acts in narrative order (Canopy → Wildlife → Community → Depths)
5. CTA — The Arrival
6. Polish passes (performance, then mobile)

---

*Approved for implementation. Follow `GITHUB_ISSUES_GUIDE.md` for all repo changes.*
