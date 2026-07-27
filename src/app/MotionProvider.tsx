import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import {
  getMotionFeatures,
  useMotionTier,
  type MotionFeatures,
  type MotionTier,
} from '@/hooks/useMotionTier'

interface MotionContextValue {
  features: MotionFeatures
  tier: MotionTier
  fpsLimited: boolean
}

const MotionContext = createContext<MotionContextValue | null>(null)

/** Apply degradation cascade when FPS drops below threshold */
function applyFpsDegradation(features: MotionFeatures): MotionFeatures {
  return {
    ...features,
    caustics: false,
    particleCount: Math.floor(features.particleCount * 0.5),
    treeSway: false,
    cloudPlanes: Math.max(2, features.cloudPlanes - 1),
  }
}

function applySevereDegradation(features: MotionFeatures): MotionFeatures {
  return {
    ...features,
    caustics: false,
    particles: false,
    particleCount: 0,
    treeSway: false,
    cloudPlanes: 2,
    birdFlap: false,
    fireflyPaths: false,
    mistSheets: 1,
  }
}

interface MotionProviderProps {
  children: ReactNode
}

export function MotionProvider({ children }: MotionProviderProps) {
  const tier = useMotionTier()
  const baseFeatures = getMotionFeatures(tier)
  const [fpsLimited, setFpsLimited] = useState(false)
  const [severe, setSevere] = useState(false)
  const frames = useRef(0)
  const lastTime = useRef(performance.now())
  const lowFpsCount = useRef(0)

  useEffect(() => {
    if (tier === 'minimal') return

    let rafId = 0

    const measure = (now: number) => {
      frames.current += 1
      const elapsed = now - lastTime.current

      if (elapsed >= 1000) {
        const fps = (frames.current / elapsed) * 1000
        frames.current = 0
        lastTime.current = now

        if (fps < 45) {
          lowFpsCount.current += 1
          if (lowFpsCount.current >= 2) {
            setFpsLimited(true)
          }
          if (lowFpsCount.current >= 4) {
            setSevere(true)
          }
        } else if (fps > 52) {
          lowFpsCount.current = Math.max(0, lowFpsCount.current - 1)
        }
      }

      rafId = requestAnimationFrame(measure)
    }

    rafId = requestAnimationFrame(measure)
    return () => cancelAnimationFrame(rafId)
  }, [tier])

  let features = baseFeatures
  if (severe) {
    features = applySevereDegradation(baseFeatures)
  } else if (fpsLimited) {
    features = applyFpsDegradation(baseFeatures)
  }

  return (
    <MotionContext.Provider value={{ features, tier, fpsLimited: fpsLimited || severe }}>
      {children}
    </MotionContext.Provider>
  )
}

export function useMotionFeatures(): MotionFeatures {
  const context = useContext(MotionContext)
  const tier = useMotionTier()
  if (!context) {
    return getMotionFeatures(tier)
  }
  return context.features
}
