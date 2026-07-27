import { useEffect, useRef, type ReactNode } from 'react'
import { gsap } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface ScrollRevealTextProps {
  children: ReactNode
  className?: string
  animation?: 'fadeUp' | 'fadeIn' | 'slideFromLeft' | 'scaleIn'
  trigger?: string
  start?: string
  end?: string
}

export function ScrollRevealText({
  children,
  className = '',
  animation = 'fadeUp',
  trigger,
  start = 'top 80%',
  end = 'bottom 20%',
}: ScrollRevealTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const element = ref.current
    if (!element) return

    if (reducedMotion) {
      gsap.set(element, { opacity: 1, y: 0, x: 0, scale: 1 })
      return
    }

    const fromVars: gsap.TweenVars = { opacity: 0 }
    const toVars: gsap.TweenVars = { opacity: 1, ease: 'power2.out' }

    switch (animation) {
      case 'fadeUp':
        fromVars.y = 40
        toVars.y = 0
        break
      case 'slideFromLeft':
        fromVars.x = -60
        toVars.x = 0
        break
      case 'scaleIn':
        fromVars.scale = 0.92
        toVars.scale = 1
        break
      case 'fadeIn':
      default:
        break
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(element, fromVars, {
        ...toVars,
        scrollTrigger: {
          trigger: trigger ?? element,
          start,
          end,
          scrub: 1,
          toggleActions: 'play none none reverse',
        },
      })
    }, element)

    return () => ctx.revert()
  }, [animation, trigger, start, end, reducedMotion])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
