import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { CTA_LABELS, SECTION_IDS, Z_INDEX } from '@/lib/constants'
import { getHeadlines } from '@/lib/content'
import { CloudLayer } from '@/components/layers/CloudLayer'
import { LightRaysLayer } from '@/components/layers/LightRaysLayer'
import { ScrollRotatingHeadline } from '@/components/text/ScrollRotatingHeadline'
import { Button } from '@/components/ui/Button'
import { useMotionFeatures } from '@/app/MotionProvider'
import { useIsMobile } from '@/hooks/useMediaQuery'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useLenis } from '@/hooks/useScrollProgress'

export function HeroSection() {
  const { hero } = getHeadlines()
  const motion = useMotionFeatures()
  const isMobile = useIsMobile()
  const reducedMotion = useReducedMotion()
  const lenis = useLenis()
  const sectionRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  const headlineLines = isMobile ? hero.mobileLines : hero.lines
  const pinEnd = isMobile ? '+=60%' : '+=100%'

  useEffect(() => {
    const section = sectionRef.current
    const bg = bgRef.current
    const content = contentRef.current
    const cta = ctaRef.current
    if (!section || !bg || !content) return

    const ctx = gsap.context(() => {
      if (!reducedMotion) {
        gsap.fromTo(
          content,
          { opacity: 0, y: 30, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.4,
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
            end: pinEnd,
            pin: true,
            pinSpacing: true,
            scrub: true,
          },
        })

        if (cta) {
          gsap.fromTo(
            cta,
            { opacity: 0, y: 16, pointerEvents: 'none' },
            {
              opacity: 1,
              y: 0,
              pointerEvents: 'auto',
              ease: 'power2.out',
              scrollTrigger: {
                trigger: section,
                start: 'bottom bottom',
                end: 'bottom top',
                scrub: 0.5,
              },
            },
          )
        }
      } else {
        gsap.set(content, { opacity: 1, y: 0, scale: 1 })
        if (cta) gsap.set(cta, { opacity: 1, y: 0 })
      }
    }, section)

    return () => ctx.revert()
  }, [reducedMotion, pinEnd])

  const scrollToExpeditions = () => {
    const target = document.getElementById(SECTION_IDS.expeditions)
    if (target && lenis) {
      lenis.scrollTo(target, { offset: 0 })
    } else if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

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
        <LightRaysLayer trigger="#hero" scrollStart="top top" scrollEnd={pinEnd} />
        <div className="absolute inset-0 bg-gradient-to-t from-canopy-shadow/20 to-transparent" />
        <CloudLayer className="z-[1]" planes={motion.cloudPlanes} />
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
        ref={contentRef}
        className="relative flex min-h-[100dvh] flex-col items-center justify-center px-6 text-center"
        style={{ zIndex: Z_INDEX.typography }}
      >
        <ScrollRotatingHeadline
          lines={headlineLines}
          trigger="#hero"
          scrollStart="top top"
          scrollEnd={pinEnd}
          showProgress={headlineLines.length > 1}
          className="max-w-4xl"
          lineClassName="font-display text-[clamp(2.5rem,8vw,5rem)] font-semibold leading-tight text-white/95"
          as="h1"
        />

        <div ref={ctaRef} className="mt-10">
          <Button variant="ghost" onClick={scrollToExpeditions}>
            {CTA_LABELS.viewExpeditions}
          </Button>
        </div>
      </div>
    </section>
  )
}
