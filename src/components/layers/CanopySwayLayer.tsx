import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { Z_INDEX } from '@/lib/constants'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface CanopySwayLayerProps {
  enabled?: boolean
}

const TREE_GROUPS = [
  { d: 'M100,500 L100,280 Q130,240 160,280 L160,500', delay: 0 },
  { d: 'M350,500 L350,220 Q390,170 430,220 L430,500', delay: 0.7 },
  { d: 'M620,500 L620,260 Q660,210 700,260 L700,500', delay: 1.4 },
  { d: 'M900,500 L900,200 Q950,140 1000,200 L1000,500', delay: 2.1 },
  { d: 'M1200,500 L1200,270 Q1240,220 1280,270 L1280,500', delay: 2.8 },
]

export function CanopySwayLayer({ enabled = true }: CanopySwayLayerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const container = containerRef.current
    if (!container || !enabled || reducedMotion) return

    const paths = container.querySelectorAll('[data-sway]')
    const ctx = gsap.context(() => {
      paths.forEach((path, index) => {
        gsap.to(path, {
          rotation: index % 2 === 0 ? 3 : -3,
          transformOrigin: 'bottom center',
          duration: 3 + (index % 3) * 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: TREE_GROUPS[index]?.delay ?? index * 0.7,
        })
      })
    }, container)

    return () => ctx.revert()
  }, [enabled, reducedMotion])

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute bottom-0 left-0 w-full"
      style={{ zIndex: Z_INDEX.canopy + 2 }}
      aria-hidden="true"
    >
      <svg className="w-full" viewBox="0 0 1440 500" preserveAspectRatio="none">
        {TREE_GROUPS.map((tree, i) => (
          <path key={i} data-sway d={tree.d} fill="#0a1a12" opacity="0.7" />
        ))}
      </svg>
    </div>
  )
}
