import { useMemo } from 'react'
import { Z_INDEX } from '@/lib/constants'

interface ParticleFieldProps {
  count?: number
  className?: string
  color?: string
}

export function ParticleField({
  count = 30,
  className = '',
  color = 'rgba(61, 139, 90, 0.4)',
}: ParticleFieldProps) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${5 + (i * 3.2) % 90}%`,
        top: `${8 + (i * 7.3) % 80}%`,
        size: 4 + (i % 4) * 3,
        depth: 0.3 + (i % 5) * 0.15,
        delay: `${(i * 0.7).toFixed(1)}s`,
        duration: `${5 + (i % 6) * 1.5}s`,
      })),
    [count],
  )

  if (count <= 0) return null

  return (
    <div
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{ zIndex: Z_INDEX.particles }}
      aria-hidden="true"
    >
      {particles.map((p) => (
        <div
          key={p.id}
          className="leaf-float absolute rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size * 1.4,
            backgroundColor: color,
            opacity: 0.2 + p.depth * 0.4,
            animationDelay: p.delay,
            animationDuration: `${parseFloat(p.duration) / p.depth}s`,
          }}
        />
      ))}
    </div>
  )
}
