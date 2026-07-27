import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { Z_INDEX } from '@/lib/constants'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface FireflyLayerProps {
  count?: number
  motionPaths?: boolean
}

export function FireflyLayer({ count = 18, motionPaths = true }: FireflyLayerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  const fireflies = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${5 + (i * 5.5) % 90}%`,
    top: `${15 + (i * 11) % 70}%`,
    delay: `${i * 0.4}s`,
    duration: `${3 + (i % 4) * 1.5}s`,
  }))

  useEffect(() => {
    const container = containerRef.current
    if (!container || !motionPaths || reducedMotion) return

    const flies = container.querySelectorAll('[data-firefly]')
    const ctx = gsap.context(() => {
      flies.forEach((fly, i) => {
        gsap.to(fly, {
          x: (i % 2 === 0 ? 1 : -1) * (20 + (i % 5) * 8),
          y: -15 - (i % 4) * 10,
          duration: 4 + (i % 3) * 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.3,
        })
      })
    }, container)

    return () => ctx.revert()
  }, [motionPaths, reducedMotion, count])

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0"
      style={{ zIndex: Z_INDEX.particles }}
      aria-hidden="true"
    >
      {fireflies.map((fly) => (
        <div
          key={fly.id}
          data-firefly
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
  )
}
