import { useEffect, useState } from 'react'
import { gsap } from '@/lib/gsap'
import { ScrollTrigger } from '@/lib/gsap'
import { CTA_LABELS, SECTION_IDS, Z_INDEX } from '@/lib/constants'
import { useLenis } from '@/hooks/useScrollProgress'

const NAV_SECTIONS = [
  { id: SECTION_IDS.hero, label: 'Sky' },
  { id: SECTION_IDS.canopy, label: 'Canopy' },
  { id: SECTION_IDS.river, label: 'River' },
  { id: SECTION_IDS.wildlife, label: 'Wildlife' },
  { id: SECTION_IDS.expeditions, label: 'Expeditions' },
  { id: SECTION_IDS.community, label: 'People' },
  { id: SECTION_IDS.depths, label: 'Depths' },
  { id: SECTION_IDS.arrival, label: 'Arrival' },
] as const

export function MiniNav() {
  const lenis = useLenis()
  const [visible, setVisible] = useState(false)
  const [activeId, setActiveId] = useState<string>(SECTION_IDS.hero)

  useEffect(() => {
    const hero = document.getElementById(SECTION_IDS.hero)
    if (!hero) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: hero,
        start: 'bottom center',
        onEnter: () => setVisible(true),
        onLeaveBack: () => setVisible(false),
      })

      NAV_SECTIONS.forEach(({ id }) => {
        const section = document.getElementById(id)
        if (!section) return

        ScrollTrigger.create({
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setActiveId(id),
          onEnterBack: () => setActiveId(id),
        })
      })
    })

    return () => ctx.revert()
  }, [])

  const scrollTo = (id: string) => {
    const target = document.getElementById(id)
    if (target && lenis) {
      lenis.scrollTo(target)
    } else if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav
      aria-label="Section navigation"
      className={`fixed right-4 top-1/2 z-[90] flex -translate-y-1/2 flex-col items-end gap-4 transition-opacity duration-500 md:right-6 ${
        visible ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
      style={{
        zIndex: Z_INDEX.chrome,
        paddingRight: 'env(safe-area-inset-right)',
        paddingTop: 'env(safe-area-inset-top)',
      }}
    >
      <button
        type="button"
        onClick={() => scrollTo(SECTION_IDS.arrival)}
        className="rounded-sm border border-white/20 bg-depths-indigo/40 px-3 py-2 font-sans text-xs uppercase tracking-wider text-white/70 backdrop-blur-sm transition-colors hover:border-white/40 hover:text-white/90"
      >
        {CTA_LABELS.enquire}
      </button>

      <ul className="flex flex-col items-end gap-2" aria-label="Sections">
        {NAV_SECTIONS.map(({ id, label }) => (
          <li key={id}>
            <button
              type="button"
              onClick={() => scrollTo(id)}
              aria-label={`Go to ${label}`}
              aria-current={activeId === id ? 'true' : undefined}
              className={`group flex items-center gap-2 font-sans text-[10px] uppercase tracking-wider transition-colors ${
                activeId === id ? 'text-arrival-gold' : 'text-white/40 hover:text-white/70'
              }`}
            >
              <span className="hidden opacity-0 transition-opacity group-hover:opacity-100 md:inline md:opacity-0">
                {label}
              </span>
              <span
                className={`block h-2 w-2 rounded-full transition-all ${
                  activeId === id ? 'scale-125 bg-arrival-gold' : 'bg-white/30'
                }`}
              />
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
