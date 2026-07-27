import { useEffect, useRef } from 'react'
import { Z_INDEX } from '@/lib/constants'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface CausticsLayerProps {
  enabled?: boolean
}

export function CausticsLayer({ enabled = true }: CausticsLayerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reducedMotion = useReducedMotion()
  const visibleRef = useRef(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !enabled || reducedMotion) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry?.isIntersecting ?? false
      },
      { threshold: 0.1 },
    )
    observer.observe(canvas)

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let frame = 0
    let rafId = 0

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      if (visibleRef.current) {
        frame += 0.02
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.globalAlpha = 0.08

        for (let i = 0; i < 6; i++) {
          const x = ((Math.sin(frame + i * 1.2) + 1) / 2) * canvas.width
          const y =
            ((Math.cos(frame * 0.8 + i * 0.9) + 1) / 2) * canvas.height * 0.5 +
            canvas.height * 0.3
          const r = 40 + Math.sin(frame + i) * 20
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, r)
          gradient.addColorStop(0, 'rgba(184,205,212,0.6)')
          gradient.addColorStop(1, 'transparent')
          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(x, y, r, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      rafId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      observer.disconnect()
    }
  }, [enabled, reducedMotion])

  if (!enabled || reducedMotion) return null

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ zIndex: Z_INDEX.river + 1 }}
      aria-hidden="true"
    />
  )
}
