import { useCallback } from 'react'
import { ANALYTICS_EVENTS } from '@/lib/constants'
import { trackEvent } from '@/lib/analytics'

export function useAnalytics() {
  const trackHeadlineView = useCallback((index: number) => {
    trackEvent(ANALYTICS_EVENTS.heroHeadlineView, { index })
  }, [])

  const trackSectionEnter = useCallback((section: string) => {
    trackEvent(ANALYTICS_EVENTS.sectionEnter, { section })
  }, [])

  const trackCtaClick = useCallback((location: string, label: string) => {
    trackEvent(ANALYTICS_EVENTS.ctaClick, { location, label })
  }, [])

  const trackExpeditionFocus = useCallback((expeditionId: string) => {
    trackEvent(ANALYTICS_EVENTS.expeditionCardFocus, { expeditionId })
  }, [])

  const trackFormStart = useCallback(() => {
    trackEvent(ANALYTICS_EVENTS.formStart)
  }, [])

  const trackFormSubmit = useCallback((success: boolean) => {
    trackEvent(ANALYTICS_EVENTS.formSubmit, { success })
  }, [])

  return {
    trackHeadlineView,
    trackSectionEnter,
    trackCtaClick,
    trackExpeditionFocus,
    trackFormStart,
    trackFormSubmit,
  }
}
