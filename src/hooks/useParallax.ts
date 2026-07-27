import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { BREAKPOINTS, MOBILE_PARALLAX_MULTIPLIER } from '@/lib/constants'

interface UseParallaxOptions {
  speed: number
  trigger?: string | Element
  start?: string
  end?: string
  scrub?: boolean | number
}

export function useParallax<T extends HTMLElement>(
  options: UseParallaxOptions,
): React.RefObject<T | null> {
  const ref = useRef<T>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const element = ref.current
    if (!element || reducedMotion) return

    const isMobile = window.innerWidth < BREAKPOINTS.mobile
    const speed = isMobile
      ? options.speed * MOBILE_PARALLAX_MULTIPLIER
      : options.speed

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        { y: 0 },
        {
          y: () => -window.innerHeight * speed,
          ease: 'none',
          scrollTrigger: {
            trigger: options.trigger ?? element,
            start: options.start ?? 'top bottom',
            end: options.end ?? 'bottom top',
            scrub: options.scrub ?? true,
          },
        },
      )
    }, element)

    return () => ctx.revert()
  }, [options.speed, options.trigger, options.start, options.end, options.scrub, reducedMotion])

  return ref
}
