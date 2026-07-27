import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { ParallaxLayer } from '@/components/layers/ParallaxLayer'
import { WaterLayer } from '@/components/layers/WaterLayer'
import { ScrollRotatingHeadline } from '@/components/text/ScrollRotatingHeadline'
import { CTA_LABELS, PARALLAX_RATIOS, SECTION_IDS, Z_INDEX } from '@/lib/constants'
import { getHeadlines } from '@/lib/content'
import { useMotionFeatures } from '@/app/MotionProvider'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useLenis } from '@/hooks/useScrollProgress'

export function RiverSection() {
  const { river } = getHeadlines()
  const motion = useMotionFeatures()
  const lenis = useLenis()
  const sectionRef = useRef<HTMLElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const section = sectionRef.current
    const copy = copyRef.current
    if (!section || !copy || reducedMotion) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        copy,
        { opacity: 0, x: -80 },
        {
          opacity: 1,
          x: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            end: 'center center',
            scrub: 1,
          },
        },
      )

      gsap.to(copy, {
        opacity: 0.6,
        scale: 0.96,
        ease: 'power2.in',
        scrollTrigger: {
          trigger: section,
          start: 'center center',
          end: 'bottom top',
          scrub: 1,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [reducedMotion])

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
      id="river"
      aria-label="The River"
      className="relative -mt-[20vh] min-h-[150vh] overflow-hidden"
    >
      <ParallaxLayer
        speed={PARALLAX_RATIOS.riverBg}
        trigger="#river"
        zIndex={Z_INDEX.river - 1}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-river-reed/60 via-river-teal/80 to-river-teal" />
        <svg
          className="absolute top-[10%] left-0 w-full opacity-30"
          viewBox="0 0 1440 300"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,200 Q360,100 720,180 Q1080,120 1440,200 L1440,300 L0,300 Z"
            fill="#4a6741"
          />
        </svg>
      </ParallaxLayer>

      <ParallaxLayer speed={PARALLAX_RATIOS.riverBg} trigger="#river" zIndex={Z_INDEX.river}>
        <WaterLayer caustics={motion.caustics} />
      </ParallaxLayer>

      <ParallaxLayer
        speed={PARALLAX_RATIOS.riverFg}
        trigger="#river"
        zIndex={Z_INDEX.foliage}
      >
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1440 350"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {Array.from({ length: 20 }, (_, i) => {
            const x = 50 + i * 70
            const h = 120 + (i % 5) * 40
            return (
              <path
                key={i}
                d={`M${x},350 L${x - 5},${350 - h} Q${x},${350 - h - 20} ${x + 5},${350 - h} Z`}
                fill="#2a4a2a"
                opacity={0.6 + (i % 3) * 0.15}
              />
            )
          })}
          <path
            d="M0,350 Q200,300 400,330 Q600,280 800,320 Q1000,290 1200,340 Q1320,310 1440,330 L1440,350 Z"
            fill="#1a3d1a"
            opacity="0.8"
          />
        </svg>
      </ParallaxLayer>

      <div
        ref={copyRef}
        className="relative flex min-h-[150vh] flex-col items-center justify-center gap-8 px-6 md:items-end md:px-16"
        style={{ zIndex: Z_INDEX.typography }}
      >
        <ScrollRotatingHeadline
          lines={river.lines}
          trigger="#river"
          scrollStart="top 55%"
          scrollEnd="bottom 45%"
          className="max-w-md text-center md:text-right"
          lineClassName="font-display text-[clamp(1.8rem,5vw,3.5rem)] text-river-silver/90"
          as="h2"
        />
        <button
          type="button"
          onClick={scrollToExpeditions}
          className="font-sans text-sm text-river-silver/60 transition-colors hover:text-river-silver/90"
        >
          {CTA_LABELS.seeJourneyOptions}
        </button>
      </div>
    </section>
  )
}
