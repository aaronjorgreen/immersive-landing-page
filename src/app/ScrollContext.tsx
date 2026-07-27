import { createContext } from 'react'
import type Lenis from 'lenis'

export interface ScrollContextValue {
  progress: number
  lenis: Lenis | null
  reducedMotion: boolean
}

export const ScrollContext = createContext<ScrollContextValue | null>(null)
