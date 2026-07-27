import { useEffect, useState } from 'react'
import { useScrollContext } from '@/hooks/useScrollProgress'

export function ScrollHint() {
  const { progress, reducedMotion } = useScrollContext()
  const [visible, setVisible] = useState(true)
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    if (progress > 0.01 && !hasScrolled) {
      setHasScrolled(true)
      setVisible(false)
    }
  }, [progress, hasScrolled])

  if (!visible || hasScrolled) return null

  return (
    <div
      className="fixed bottom-8 left-1/2 z-chrome -translate-x-1/2 px-4 pb-[max(2rem,env(safe-area-inset-bottom))]"
      aria-hidden="true"
    >
      <div
        className={`flex flex-col items-center gap-2 text-white/60 ${reducedMotion ? '' : 'animate-scroll-hint'}`}
      >
        <span className="font-sans text-xs uppercase tracking-[0.2em]">
          Scroll to descend
        </span>
        <svg
          width="20"
          height="28"
          viewBox="0 0 20 28"
          fill="none"
          className="opacity-70"
        >
          <path
            d="M10 2v16M10 18l-5-5M10 18l5-5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  )
}
