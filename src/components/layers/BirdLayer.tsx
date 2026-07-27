import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { Z_INDEX } from '@/lib/constants'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface BirdLayerProps {
  enabled?: boolean
}

const BIRDS = [
  { left: '15%', top: '20%', reverse: false, delay: 0 },
  { left: '55%', top: '15%', reverse: false, delay: 2 },
  { left: '75%', top: '30%', reverse: true, delay: 4 },
]

function BirdSvg({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 30" width="60" height="30" className={className} aria-hidden="true">
      <g className="bird-wing">
        <path
          d="M5,15 Q15,5 25,15 Q35,25 45,15 Q50,10 55,15 L55,18 Q50,20 45,18 Q35,28 25,18 Q15,8 5,18 Z"
          fill="currentColor"
        />
      </g>
    </svg>
  )
}

export function BirdLayer({ enabled = true }: BirdLayerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const container = containerRef.current
    if (!container || !enabled || reducedMotion) return

    const wings = container.querySelectorAll('.bird-wing')
    const ctx = gsap.context(() => {
      wings.forEach((wing, i) => {
        gsap.to(wing, {
          rotation: -8,
          transformOrigin: 'center center',
          duration: 0.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: BIRDS[i]?.delay ?? 0,
        })
      })
    }, container)

    return () => ctx.revert()
  }, [enabled, reducedMotion])

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0"
      style={{ zIndex: Z_INDEX.particles }}
      aria-hidden="true"
    >
      {BIRDS.map((bird, i) => (
        <div
          key={i}
          className={`bird-drift absolute text-canopy-mist/30 ${bird.reverse ? 'bird-drift-reverse' : ''}`}
          style={{ left: bird.left, top: bird.top }}
        >
          <BirdSvg />
        </div>
      ))}
    </div>
  )
}
