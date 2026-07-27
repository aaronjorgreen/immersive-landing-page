import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { Z_INDEX } from '@/lib/constants'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface LightRaysLayerProps {
  trigger: string | Element | null
  scrollStart?: string
  scrollEnd?: string
  className?: string
}

export function LightRaysLayer({
  trigger,
  scrollStart = 'top top',
  scrollEnd = '+=100%',
  className = '',
}: LightRaysLayerProps) {
  const layerRef = useRef<HTMLDivElement>(null)
  const dawnRef = useRef<HTMLDivElement>(null)
  const raysRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const layer = layerRef.current
    const dawn = dawnRef.current
    const rays = raysRef.current
    if (!layer || !dawn || !rays || !trigger || reducedMotion) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        dawn,
        { opacity: 0.3 },
        {
          opacity: 0.85,
          ease: 'none',
          scrollTrigger: {
            trigger,
            start: scrollStart,
            end: scrollEnd,
            scrub: true,
          },
        },
      )

      gsap.fromTo(
        rays,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 0.4,
          scale: 1.05,
          ease: 'none',
          scrollTrigger: {
            trigger,
            start: scrollStart,
            end: scrollEnd,
            scrub: true,
          },
        },
      )
    }, layer)

    return () => ctx.revert()
  }, [trigger, scrollStart, scrollEnd, reducedMotion])

  return (
    <div
      ref={layerRef}
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{ zIndex: Z_INDEX.sky + 1 }}
      aria-hidden="true"
    >
      <div
        ref={dawnRef}
        className="absolute inset-0 bg-gradient-to-b from-[#ffe8c8]/60 via-sky-rose/30 to-transparent"
      />
      <div
        ref={raysRef}
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255,220,180,0.35) 0%, transparent 70%)',
        }}
      />
    </div>
  )
}
