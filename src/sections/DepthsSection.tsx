import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { ParallaxLayer } from '@/components/layers/ParallaxLayer'
import { FireflyLayer } from '@/components/layers/FireflyLayer'
import { ScrollRotatingHeadline } from '@/components/text/ScrollRotatingHeadline'
import { PARALLAX_RATIOS, Z_INDEX } from '@/lib/constants'
import { getHeadlines, getTestimonials } from '@/lib/content'
import { getMotionFeatures, useMotionTier } from '@/hooks/useMotionTier'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function DepthsSection() {
  const { depths } = getHeadlines()
  const testimonials = getTestimonials()
  const motionTier = useMotionTier()
  const motion = getMotionFeatures(motionTier)
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()

  const testimonialLines = [
    depths.lines[0],
    ...testimonials.map((t) => `"${t.quote}" — ${t.author}`),
  ]

  useEffect(() => {
    const section = sectionRef.current
    if (!section || reducedMotion) return

    const ctx = gsap.context(() => {}, section)
    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <section
      ref={sectionRef}
      id="depths"
      aria-label="The Depths"
      className="relative -mt-[10vh] min-h-[90vh] overflow-hidden bg-depths-indigo"
    >
      <ParallaxLayer speed={PARALLAX_RATIOS.depths} trigger="#depths" zIndex={Z_INDEX.sky}>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1018] to-depths-indigo" />
      </ParallaxLayer>

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          zIndex: Z_INDEX.mist,
          background:
            'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)',
        }}
        aria-hidden="true"
      />

      <FireflyLayer count={18} motionPaths={motion.fireflyPaths} />

      <div
        className="relative flex min-h-[90vh] items-center justify-center px-6"
        style={{ zIndex: Z_INDEX.typography }}
      >
        <ScrollRotatingHeadline
          lines={testimonialLines}
          trigger="#depths"
          scrollStart="top 60%"
          scrollEnd="bottom 40%"
          className="max-w-3xl text-center"
          lineClassName="font-display text-[clamp(1.6rem,5vw,3.5rem)] italic text-depths-glow/80"
          as="h2"
        />
      </div>
    </section>
  )
}
