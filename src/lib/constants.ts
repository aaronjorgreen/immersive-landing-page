/** Z-index stack, section timing, parallax ratios */

export const Z_INDEX = {
  sky: 0,
  treeline: 10,
  canopy: 20,
  mist: 30,
  river: 40,
  foliage: 50,
  particles: 60,
  typography: 70,
  chrome: 80,
} as const

/** Section scroll heights in viewport units */
export const SECTION_HEIGHTS = {
  hero: '100dvh',
  canopy: '120vh',
  river: '150vh',
  wildlife: '100vh',
  community: '100vh',
  depths: '80vh',
  cta: '100dvh',
} as const

/** Default parallax speed ratios (desktop) */
export const PARALLAX_RATIOS = {
  slow: 0.1,
  medium: 0.35,
  riverBg: 0.15,
  riverFg: 0.6,
  depths: 0.05,
} as const

/** Mobile parallax multiplier (~50% of desktop) */
export const MOBILE_PARALLAX_MULTIPLIER = 0.5

/** Breakpoints */
export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
} as const

/** Brand copy */
export const BRAND = {
  name: 'Selva Viva Expeditions',
  tagline: 'Where the river remembers your name.',
  cta: 'Begin Your Descent',
  location: 'Manaus, Brazil — Rio Negro basin',
} as const
