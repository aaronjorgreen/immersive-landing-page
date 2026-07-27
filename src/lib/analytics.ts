type AnalyticsProperties = Record<string, string | number | boolean | undefined>

type AnalyticsAdapter = (event: string, properties?: AnalyticsProperties) => void

let adapter: AnalyticsAdapter = (event, properties) => {
  if (import.meta.env.DEV) {
    console.debug('[analytics]', event, properties)
  }
}

/** Configure a production analytics adapter (Plausible, GA4, etc.) */
export function setAnalyticsAdapter(next: AnalyticsAdapter): void {
  adapter = next
}

export function trackEvent(event: string, properties?: AnalyticsProperties): void {
  adapter(event, properties)
}

export function loadDeferredAnalytics(scriptUrl?: string): void {
  if (!scriptUrl || import.meta.env.DEV) return

  const script = document.createElement('script')
  script.src = scriptUrl
  script.defer = true
  document.head.appendChild(script)
}
