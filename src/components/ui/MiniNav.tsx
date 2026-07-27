import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'
import { ScrollTrigger } from '@/lib/gsap'
import { CTA_LABELS, SECTION_IDS, Z_INDEX } from '@/lib/constants'
import { useIsMobile } from '@/hooks/useMediaQuery'
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
  const isMobile = useIsMobile()
  const [visible, setVisible] = useState(false)
  const [activeId, setActiveId] = useState<string>(SECTION_IDS.hero)
  const enquireRef = useRef<HTMLButtonElement>(null)

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

  const positionClass = isMobile
    ? 'bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] top-auto translate-y-0 flex-row-reverse items-center'
    : 'right-[max(1rem,env(safe-area-inset-right))] top-1/2 -translate-y-1/2 flex-col items-end'

  return (
    <nav
      aria-label="Section navigation"
      className={`fixed z-[90] flex gap-3 transition-opacity duration-500 ${positionClass} ${
        visible ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
      style={{ zIndex: Z_INDEX.chrome }}
    >
      <button
        ref={enquireRef}
        type="button"
        onClick={() => scrollTo(SECTION_IDS.arrival)}
        className="min-h-[44px] min-w-[44px] rounded-sm border border-white/30 bg-depths-indigo/60 px-4 py-2.5 font-sans text-xs uppercase tracking-wider text-white/85 backdrop-blur-sm transition-colors hover:border-white/50 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-arrival-gold focus-visible:ring-offset-2 focus-visible:ring-offset-depths-indigo"
      >
        {CTA_LABELS.enquire}
      </button>

      <ul
        className={`flex gap-2 ${isMobile ? 'flex-row' : 'flex-col items-end'}`}
        aria-label="Sections"
      >
        {NAV_SECTIONS.map(({ id, label }) => (
          <li key={id}>
            <button
              type="button"
              onClick={() => scrollTo(id)}
              aria-label={`Go to ${label}`}
              aria-current={activeId === id ? 'true' : undefined}
              className={`group flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-full font-sans text-[10px] uppercase tracking-wider transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-arrival-gold ${
                activeId === id ? 'text-arrival-gold' : 'text-white/50 hover:text-white/80'
              }`}
            >
              <span className="hidden md:group-hover:inline">{label}</span>
              <span
                className={`block h-2.5 w-2.5 rounded-full transition-all ${
                  activeId === id ? 'scale-125 bg-arrival-gold' : 'bg-white/40'
                }`}
              />
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
