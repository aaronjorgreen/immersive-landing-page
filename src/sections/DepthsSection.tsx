import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { ParallaxLayer } from '@/components/layers/ParallaxLayer'
import { PARALLAX_RATIOS, Z_INDEX } from '@/lib/constants'
import { getHeadlines } from '@/lib/content'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const FIREFLIES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${5 + (i * 5.5) % 90}%`,
  top: `${15 + (i * 11) % 70}%`,
  delay: `${i * 0.4}s`,
  duration: `${3 + (i % 4) * 1.5}s`,
}))

export function DepthsSection() {
  const { depths } = getHeadlines()
  const sectionRef = useRef<HTMLElement>(null)
  const copyRef = useRef<HTMLHeadingElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const section = sectionRef.current
    const copy = copyRef.current
    if (!section || !copy || reducedMotion) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        copy,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
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
      id="depths"
      aria-label="The Depths"
      className="relative -mt-[10vh] min-h-[80vh] overflow-hidden bg-depths-indigo"
    >
      <ParallaxLayer speed={PARALLAX_RATIOS.depths} trigger="#depths" zIndex={Z_INDEX.sky}>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1018] to-depths-indigo" />
      </ParallaxLayer>

      {/* Vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          zIndex: Z_INDEX.mist,
          background:
            'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Fireflies */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ zIndex: Z_INDEX.particles }}
        aria-hidden="true"
      >
        {FIREFLIES.map((fly) => (
          <div
            key={fly.id}
            className="firefly absolute h-1.5 w-1.5 rounded-full bg-depths-glow"
            style={{
              left: fly.left,
              top: fly.top,
              animationDelay: fly.delay,
              animationDuration: fly.duration,
            }}
          />
        ))}
      </div>

      <div
        className="relative flex min-h-[80vh] items-center justify-center px-6"
        style={{ zIndex: Z_INDEX.typography }}
      >
        <h2
          ref={copyRef}
          className="font-display text-[clamp(2.2rem,6vw,4.5rem)] italic text-depths-glow/80 text-balance text-center"
        >
          {depths.lines[0]}
        </h2>
      </div>
    </section>
  )
}
