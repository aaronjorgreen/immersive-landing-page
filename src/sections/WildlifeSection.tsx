import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { ParallaxLayer } from '@/components/layers/ParallaxLayer'
import { PARALLAX_RATIOS, Z_INDEX } from '@/lib/constants'
import { getSectionContent } from '@/lib/content'
import { useReducedMotion } from '@/hooks/useReducedMotion'

function Bird({ path, className }: { path: string; className?: string }) {
  return (
    <svg
      className={`bird-drift ${className ?? ''}`}
      viewBox="0 0 60 30"
      width="60"
      height="30"
      aria-hidden="true"
    >
      <path d={path} fill="currentColor" />
    </svg>
  )
}

export function WildlifeSection() {
  const { wildlife } = getSectionContent()
  const sectionRef = useRef<HTMLElement>(null)
  const highlightsRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const section = sectionRef.current
    const highlights = highlightsRef.current
    if (!section || !highlights || reducedMotion) return

    const items = highlights.querySelectorAll('[data-highlight]')

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
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
    }, section)

    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <section
      ref={sectionRef}
      id="wildlife"
      aria-label="The Wildlife"
      className="relative -mt-[15vh] min-h-[100vh] overflow-hidden"
    >
      <ParallaxLayer speed={PARALLAX_RATIOS.slow} trigger="#wildlife" zIndex={Z_INDEX.canopy}>
        <div className="absolute inset-0 bg-gradient-to-b from-canopy-deep to-[#1a4a2a]" />
      </ParallaxLayer>

      <ParallaxLayer speed={PARALLAX_RATIOS.medium} trigger="#wildlife" zIndex={Z_INDEX.canopy + 1}>
        <svg
          className="absolute bottom-0 left-0 w-full opacity-50"
          viewBox="0 0 1440 300"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <circle cx="200" cy="180" r="80" fill="#2a5a3a" opacity="0.4" />
          <circle cx="600" cy="200" r="100" fill="#3d8b5a" opacity="0.3" />
          <circle cx="1000" cy="170" r="90" fill="#2a5a3a" opacity="0.35" />
        </svg>
      </ParallaxLayer>

      <ParallaxLayer speed={0.25} trigger="#wildlife" zIndex={Z_INDEX.particles}>
        <Bird
          path="M5,15 Q15,5 25,15 Q35,25 45,15 Q50,10 55,15 L55,18 Q50,20 45,18 Q35,28 25,18 Q15,8 5,18 Z"
          className="absolute left-[15%] top-[20%] text-canopy-mist/30"
        />
        <Bird
          path="M5,15 Q15,5 25,15 Q35,25 45,15 Q50,10 55,15 L55,18 Q50,20 45,18 Q35,28 25,18 Q15,8 5,18 Z"
          className="bird-drift-reverse absolute right-[20%] top-[30%] text-canopy-mist/20"
        />
        <Bird
          path="M5,15 Q15,5 25,15 Q35,25 45,15 Q50,10 55,15 L55,18 Q50,20 45,18 Q35,28 25,18 Q15,8 5,18 Z"
          className="absolute left-[55%] top-[15%] text-canopy-mist/25"
        />
      </ParallaxLayer>

      <div
        ref={highlightsRef}
        className="relative mx-auto flex min-h-[100vh] max-w-3xl flex-col justify-center gap-10 px-6 py-20"
        style={{ zIndex: Z_INDEX.typography }}
      >
        {wildlife.highlights.map((item) => (
          <div key={item.title} data-highlight className="border-l-2 border-wildlife-accent/50 pl-6">
            <h3 className="font-display text-[clamp(1.4rem,3vw,2rem)] text-canopy-mist/90">
              {item.title}
            </h3>
            <p className="mt-2 font-sans text-sm leading-relaxed text-canopy-mist/60 md:text-base">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
