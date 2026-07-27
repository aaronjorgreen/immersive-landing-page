/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sky: {
          dawn: 'var(--color-sky-dawn)',
          rose: 'var(--color-sky-rose)',
          haze: 'var(--color-sky-haze)',
        },
        canopy: {
          deep: 'var(--color-canopy-deep)',
          mist: 'var(--color-canopy-mist)',
          shadow: 'var(--color-canopy-shadow)',
        },
        river: {
          teal: 'var(--color-river-teal)',
          silver: 'var(--color-river-silver)',
          reed: 'var(--color-river-reed)',
        },
        wildlife: {
          accent: 'var(--color-wildlife-accent)',
        },
        community: {
          amber: 'var(--color-community-amber)',
          warm: 'var(--color-community-warm)',
        },
        depths: {
          indigo: 'var(--color-depths-indigo)',
          glow: 'var(--color-depths-glow)',
        },
        arrival: {
          teal: 'var(--color-arrival-teal)',
          gold: 'var(--color-arrival-gold)',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      spacing: {
        section: 'var(--spacing-section)',
      },
      zIndex: {
        sky: 'var(--z-sky)',
        treeline: 'var(--z-treeline)',
        canopy: 'var(--z-canopy)',
        mist: 'var(--z-mist)',
        river: 'var(--z-river)',
        foliage: 'var(--z-foliage)',
        particles: 'var(--z-particles)',
        typography: 'var(--z-typography)',
        chrome: 'var(--z-chrome)',
      },
    },
  },
  plugins: [],
}
