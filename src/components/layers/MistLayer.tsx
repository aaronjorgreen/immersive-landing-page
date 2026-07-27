import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { Z_INDEX } from '@/lib/constants'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface MistLayerProps {
  trigger: string
}

export function MistLayer({ trigger }: MistLayerProps) {
  const mistRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const mist = mistRef.current
    if (!mist || reducedMotion) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        mist,
        { opacity: 0.2, y: 100 },
        {
          opacity: 0.85,
          y: -80,
          ease: 'none',
          scrollTrigger: {
            trigger,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      )
    }, mist)

    return () => ctx.revert()
  }, [trigger, reducedMotion])

  return (
    <div
      ref={mistRef}
      className="pointer-events-none absolute inset-0"
      style={{ zIndex: Z_INDEX.mist }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(240,248,245,0.9) 0%, rgba(240,248,245,0.4) 40%, transparent 100%)',
          filter: 'blur(20px)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-1/2"
        style={{
          background:
            'radial-gradient(ellipse at 50% 100%, rgba(255,255,255,0.5) 0%, transparent 70%)',
          filter: 'blur(30px)',
        }}
      />
    </div>
  )
}
