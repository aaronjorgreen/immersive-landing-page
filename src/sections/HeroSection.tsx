import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { BRAND, Z_INDEX } from '@/lib/constants'
import { CloudLayer } from '@/components/layers/CloudLayer'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const taglineRef = useRef<HTMLParagraphElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const section = sectionRef.current
    const bg = bgRef.current
    const title = titleRef.current
    const tagline = taglineRef.current
    if (!section || !bg || !title || !tagline) return

    const ctx = gsap.context(() => {
      if (!reducedMotion) {
        gsap.fromTo(
          [title, tagline],
          { opacity: 0, y: 30, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.4,
            stagger: 0.2,
            ease: 'power3.out',
            delay: 0.3,
          },
        )

        gsap.to(bg, {
          scale: 1.12,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=100%',
            pin: true,
            pinSpacing: true,
            scrub: true,
          },
        })
      } else {
        gsap.set([title, tagline], { opacity: 1, y: 0, scale: 1 })
      }
    }, section)

    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-label="The Sky"
      className="relative min-h-[100dvh] overflow-hidden"
    >
      <div
        ref={bgRef}
        className="absolute inset-0 origin-center will-change-transform"
        style={{ zIndex: Z_INDEX.sky }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#f5dcc0] via-sky-rose/80 to-sky-haze" />
        <div className="absolute inset-0 bg-gradient-to-t from-canopy-shadow/20 to-transparent" />
        <CloudLayer className="z-[1]" />
        {/* Distant treeline silhouette */}
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
          style={{ zIndex: Z_INDEX.treeline }}
          aria-hidden="true"
        >
          <path
            d="M0,200 L0,140 Q120,100 240,130 Q360,80 480,120 Q600,90 720,110 Q840,70 960,100 Q1080,85 1200,115 Q1320,95 1440,125 L1440,200 Z"
            fill="#2a4a3a"
            opacity="0.3"
          />
        </svg>
      </div>

      <div
        className="relative flex min-h-[100dvh] flex-col items-center justify-center px-6 text-center"
        style={{ zIndex: Z_INDEX.typography }}
      >
        <h1
          ref={titleRef}
          className="font-display text-[clamp(2.5rem,8vw,5rem)] font-semibold leading-tight text-white/95 text-balance min-h-[1.2em]"
        >
          {BRAND.name}
        </h1>
        <p
          ref={taglineRef}
          className="mt-6 max-w-md font-display text-[clamp(1.1rem,3vw,1.5rem)] italic text-white/75"
        >
          {BRAND.tagline}
        </p>
      </div>
    </section>
  )
}
