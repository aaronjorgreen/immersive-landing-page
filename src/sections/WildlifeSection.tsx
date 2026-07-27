import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'
import { ScrollTrigger } from '@/lib/gsap'
import { ParallaxLayer } from '@/components/layers/ParallaxLayer'
import { BirdLayer } from '@/components/layers/BirdLayer'
import { ExpeditionCard } from '@/components/expedition/ExpeditionCard'
import { ScrollRotatingHeadline } from '@/components/text/ScrollRotatingHeadline'
import { CTA_LABELS, SECTION_IDS, Z_INDEX } from '@/lib/constants'
import { getExpeditions } from '@/lib/content'
import { useMotionFeatures } from '@/app/MotionProvider'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useLenis } from '@/hooks/useScrollProgress'

export function WildlifeSection() {
  const expeditions = getExpeditions()
  const motion = useMotionFeatures()
  const lenis = useLenis()
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const [focusedId, setFocusedId] = useState<string>(expeditions[0]?.id ?? '')
  const reducedMotion = useReducedMotion()

  const headlineLines = expeditions.map((e) => e.name)

  useEffect(() => {
    const section = sectionRef.current
    const cards = cardsRef.current
    if (!section || !cards || reducedMotion) return

    const cardEls = cards.querySelectorAll('[data-expedition-card]')

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardEls,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'center center',
            scrub: 1,
          },
        },
      )

      cardEls.forEach((card) => {
        ScrollTrigger.create({
          trigger: card,
          start: 'top 60%',
          end: 'bottom 40%',
          onEnter: () => {
            const id = card.getAttribute('data-expedition-id')
            if (id) setFocusedId(id)
          },
          onEnterBack: () => {
            const id = card.getAttribute('data-expedition-id')
            if (id) setFocusedId(id)
          },
        })
      })
    }, section)

    return () => ctx.revert()
  }, [reducedMotion, expeditions.length])

  const scrollToExpeditions = () => {
    const target = document.getElementById(SECTION_IDS.expeditions)
    if (target && lenis) {
      lenis.scrollTo(target)
    } else if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      ref={sectionRef}
      id="wildlife"
      aria-label="The Wildlife"
      className="relative -mt-[15vh] min-h-[120vh] overflow-hidden"
    >
      <ParallaxLayer speed={0.1} trigger="#wildlife" zIndex={Z_INDEX.canopy}>
        <div className="absolute inset-0 bg-gradient-to-b from-canopy-deep to-[#1a4a2a]" />
      </ParallaxLayer>

      <ParallaxLayer speed={0.25} trigger="#wildlife" zIndex={Z_INDEX.particles}>
        <BirdLayer enabled={motion.birdFlap} />
      </ParallaxLayer>

      <div
        className="relative mx-auto flex min-h-[120vh] max-w-5xl flex-col justify-center px-6 py-20"
        style={{ zIndex: Z_INDEX.typography }}
      >
        <ScrollRotatingHeadline
          lines={headlineLines}
          trigger="#wildlife"
          scrollStart="top 65%"
          scrollEnd="bottom 35%"
          className="mb-12 text-center"
          lineClassName="font-display text-[clamp(1.8rem,5vw,3.5rem)] text-canopy-mist/90"
          as="h2"
        />

        <div ref={cardsRef} className="grid gap-6 md:grid-cols-3">
          {expeditions.map((expedition) => (
            <ExpeditionCard
              key={expedition.id}
              expedition={expedition}
              focused={focusedId === expedition.id}
              compact
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={scrollToExpeditions}
            className="font-sans text-sm text-arrival-gold/70 transition-colors hover:text-arrival-gold"
          >
            {CTA_LABELS.compareExpeditions}
          </button>
        </div>
      </div>
    </section>
  )
}
