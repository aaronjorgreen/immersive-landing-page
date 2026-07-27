import { useIsMobile } from '@/hooks/useMediaQuery'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export type MotionTier = 'full' | 'reduced' | 'minimal'

/**
 * Degradation cascade: full (desktop) → reduced (mobile) → minimal (prefers-reduced-motion).
 * Order when FPS drops: caustics → particles → sway → cloud planes.
 */
export function useMotionTier(): MotionTier {
  const reducedMotion = useReducedMotion()
  const isMobile = useIsMobile()

  if (reducedMotion) return 'minimal'
  if (isMobile) return 'reduced'
  return 'full'
}

export interface MotionFeatures {
  caustics: boolean
  particles: boolean
  particleCount: number
  treeSway: boolean
  cloudPlanes: number
  birdFlap: boolean
  fireflyPaths: boolean
  mistSheets: number
}

export function getMotionFeatures(tier: MotionTier): MotionFeatures {
  switch (tier) {
    case 'minimal':
      return {
        caustics: false,
        particles: false,
        particleCount: 0,
        treeSway: false,
        cloudPlanes: 2,
        birdFlap: false,
        fireflyPaths: false,
        mistSheets: 1,
      }
    case 'reduced':
      return {
        caustics: false,
        particles: true,
        particleCount: 15,
        treeSway: false,
        cloudPlanes: 3,
        birdFlap: true,
        fireflyPaths: false,
        mistSheets: 2,
      }
    case 'full':
    default:
      return {
        caustics: true,
        particles: true,
        particleCount: 30,
        treeSway: true,
        cloudPlanes: 4,
        birdFlap: true,
        fireflyPaths: true,
        mistSheets: 3,
      }
  }
}
