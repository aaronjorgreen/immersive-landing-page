import { useEffect, useRef, type ReactNode, type CSSProperties } from 'react'
import { gsap } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { BREAKPOINTS, MOBILE_PARALLAX_MULTIPLIER } from '@/lib/constants'

interface ParallaxLayerProps {
  children: ReactNode
  speed?: number
  className?: string
  style?: CSSProperties
  trigger?: string
  start?: string
  end?: string
  zIndex?: number
}

export function ParallaxLayer({
  children,
  speed = 0.2,
  className = '',
  style,
  trigger,
  start = 'top bottom',
  end = 'bottom top',
  zIndex,
}: ParallaxLayerProps) {
  const layerRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const element = layerRef.current
    if (!element || reducedMotion) return

    const isMobile = window.innerWidth < BREAKPOINTS.mobile
    const effectiveSpeed = isMobile ? speed * MOBILE_PARALLAX_MULTIPLIER : speed

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        { y: 0 },
        {
          y: () => -window.innerHeight * effectiveSpeed,
          ease: 'none',
          scrollTrigger: {
            trigger: trigger ?? element.closest('section') ?? element,
            start,
            end,
            scrub: true,
          },
        },
      )
    }, element)

    return () => ctx.revert()
  }, [speed, trigger, start, end, reducedMotion])

  return (
    <div
      ref={layerRef}
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{ zIndex, ...style }}
      aria-hidden="true"
    >
      {children}
    </div>
  )
}
