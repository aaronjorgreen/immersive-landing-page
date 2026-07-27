import { useEffect, useState, type ReactNode } from 'react'
import Lenis from 'lenis'
import { ScrollTrigger } from '@/lib/gsap'
import { ScrollContext } from '@/app/ScrollContext'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { BREAKPOINTS } from '@/lib/constants'

interface ScrollProviderProps {
  children: ReactNode
}

function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}

export function ScrollProvider({ children }: ScrollProviderProps) {
  const [progress, setProgress] = useState(0)
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) {
      setLenisInstance(null)
      return
    }

    const isMobile = window.innerWidth < BREAKPOINTS.mobile

    const lenis = new Lenis({
      duration: isMobile ? 1.0 : 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: isMobile ? 2.0 : 1.5,
    })

    setLenisInstance(lenis)

    lenis.on('scroll', ({ scroll, limit }: { scroll: number; limit: number }) => {
      setProgress(limit > 0 ? scroll / limit : 0)
      ScrollTrigger.update()
    })

    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value as number, { immediate: true })
        }
        return lenis.scroll
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        }
      },
      pinType: document.documentElement.style.transform ? 'transform' : 'fixed',
    })

    ScrollTrigger.defaults({ scroller: document.documentElement })

    const raf = (time: number) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    const handleRefresh = debounce(() => {
      ScrollTrigger.refresh()
    }, 200)

    window.addEventListener('resize', handleRefresh)
    window.addEventListener('orientationchange', handleRefresh)

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleRefresh)
    }

    ScrollTrigger.refresh()

    return () => {
      window.removeEventListener('resize', handleRefresh)
      window.removeEventListener('orientationchange', handleRefresh)
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleRefresh)
      }
      lenis.destroy()
      setLenisInstance(null)
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [reducedMotion])

  return (
    <ScrollContext.Provider
      value={{ progress, lenis: lenisInstance, reducedMotion }}
    >
      {children}
    </ScrollContext.Provider>
  )
}
