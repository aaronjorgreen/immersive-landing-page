import { useContext } from 'react'
import { ScrollContext } from '@/app/ScrollContext'

export function useScrollProgress(): number {
  const context = useContext(ScrollContext)
  if (!context) {
    throw new Error('useScrollProgress must be used within ScrollProvider')
  }
  return context.progress
}

export function useLenis() {
  const context = useContext(ScrollContext)
  if (!context) {
    throw new Error('useLenis must be used within ScrollProvider')
  }
  return context.lenis
}

export function useScrollContext() {
  const context = useContext(ScrollContext)
  if (!context) {
    throw new Error('useScrollContext must be used within ScrollProvider')
  }
  return context
}
