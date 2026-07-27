import { useEffect, useRef, useState, type FormEvent } from 'react'
import { gsap } from '@/lib/gsap'
import { Button } from '@/components/ui/Button'
import { FAQAccordion } from '@/components/ui/FAQAccordion'
import { ANALYTICS_EVENTS, BRAND, CTA_LABELS, Z_INDEX } from '@/lib/constants'
import { getExpeditions, getFAQ, getHeadlines, getSectionContent } from '@/lib/content'
import { submitEnquiry } from '@/lib/form'
import { trackEvent } from '@/lib/analytics'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export function CTASection() {
  const { arrival } = getHeadlines()
  const { cta } = getSectionContent()
  const expeditions = getExpeditions()
  const faq = getFAQ()
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [formStarted, setFormStarted] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    const content = contentRef.current
    if (!section || !content || reducedMotion) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        content,
        { opacity: 0, scale: 0.92 },
        {
          opacity: 1,
          scale: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'center center',
            scrub: 1,
          },
        },
      )
    }, section)

    return () => ctx.revert()
  }, [reducedMotion])

  const handleFormFocus = () => {
    if (!formStarted) {
      setFormStarted(true)
      trackEvent(ANALYTICS_EVENTS.formStart)
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget

    const gotcha = (form.elements.namedItem('_gotcha') as HTMLInputElement).value
    if (gotcha) return

    setStatus('submitting')
    setErrorMessage('')

    const result = await submitEnquiry({
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      expedition: (form.elements.namedItem('expedition') as HTMLSelectElement).value,
      preferredMonth: (form.elements.namedItem('preferredMonth') as HTMLSelectElement).value,
      groupSize: (form.elements.namedItem('groupSize') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    })

    if (result.ok) {
      setStatus('success')
      trackEvent(ANALYTICS_EVENTS.formSubmit, { success: true })
      form.reset()
    } else {
      setStatus('error')
      setErrorMessage(result.error ?? 'Submission failed.')
      trackEvent(ANALYTICS_EVENTS.formSubmit, { success: false })
    }
  }

  const inputClass =
    'w-full border-b border-arrival-gold/30 bg-transparent px-0 py-3 font-sans text-arrival-gold placeholder:text-arrival-gold/30 focus:border-arrival-gold focus:outline-none'
  const labelClass =
    'mb-1.5 block font-sans text-xs uppercase tracking-wider text-arrival-gold/50'

  return (
    <section
      ref={sectionRef}
      id="arrival"
      aria-label="The Arrival"
      className="relative -mt-[5vh] min-h-[110dvh] overflow-hidden"
    >
      <div className="absolute inset-0" style={{ zIndex: Z_INDEX.sky }}>
        <div className="absolute inset-0 bg-gradient-to-b from-arrival-teal via-[#1a4a4a] to-arrival-gold/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-arrival-gold/20 to-transparent" />
      </div>

      <div
        ref={contentRef}
        className="relative flex min-h-[110dvh] flex-col items-center justify-center px-6 pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)]"
        style={{ zIndex: Z_INDEX.typography }}
      >
        <h2 className="font-display text-[clamp(2.5rem,7vw,4.5rem)] text-arrival-gold text-balance text-center">
          {arrival.headline}
        </h2>
        <p className="mt-4 max-w-md text-center font-sans text-base text-arrival-gold/60">
          {status === 'success'
            ? 'Thank you. We will be in touch within two business days.'
            : arrival.subhead}
        </p>

        {status === 'success' ? (
          <div className="mt-12 text-center">
            <p className="font-sans text-sm text-arrival-gold/70">
              Your enquiry has been received. Check your email for confirmation.
            </p>
            <a
              href="/itinerary.pdf"
              download
              className="mt-8 inline-block font-sans text-sm text-arrival-gold/60 underline-offset-4 hover:text-arrival-gold hover:underline"
              onClick={() => trackEvent(ANALYTICS_EVENTS.ctaClick, { location: 'arrival_success', label: CTA_LABELS.downloadItinerary })}
            >
              {CTA_LABELS.downloadItinerary}
            </a>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            onFocus={handleFormFocus}
            className="mt-12 w-full max-w-md space-y-5"
            noValidate
          >
            <input
              type="text"
              name="_gotcha"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />

            <div>
              <label htmlFor="expedition" className={labelClass}>
                Expedition
              </label>
              <select
                id="expedition"
                name="expedition"
                required
                className={inputClass}
                defaultValue=""
              >
                <option value="" disabled>
                  Choose your expedition
                </option>
                {expeditions.map((exp) => (
                  <option key={exp.id} value={exp.name}>
                    {exp.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="name" className={labelClass}>
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                className={inputClass}
                placeholder={cta.formPlaceholders.name}
              />
            </div>

            <div>
              <label htmlFor="email" className={labelClass}>
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className={inputClass}
                placeholder={cta.formPlaceholders.email}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="preferredMonth" className={labelClass}>
                  Preferred month
                </label>
                <select id="preferredMonth" name="preferredMonth" className={inputClass} defaultValue="">
                  <option value="">Flexible</option>
                  {MONTHS.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="groupSize" className={labelClass}>
                  Group size
                </label>
                <input
                  id="groupSize"
                  name="groupSize"
                  type="number"
                  min={1}
                  max={12}
                  placeholder="2"
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className={labelClass}>
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={3}
                className={`${inputClass} resize-none`}
                placeholder={cta.formPlaceholders.message}
              />
            </div>

            {status === 'error' && (
              <p className="font-sans text-sm text-red-300/90" role="alert">
                {errorMessage}
              </p>
            )}

            <div className="flex flex-col items-center gap-4 pt-4">
              <Button type="submit" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Sending…' : BRAND.cta}
              </Button>
              <a
                href="/itinerary.pdf"
                download
                className="font-sans text-xs text-arrival-gold/50 underline-offset-4 hover:text-arrival-gold/80 hover:underline"
                onClick={() => trackEvent(ANALYTICS_EVENTS.ctaClick, { location: 'arrival', label: CTA_LABELS.downloadItinerary })}
              >
                {CTA_LABELS.downloadItinerary}
              </a>
            </div>
          </form>
        )}

        <FAQAccordion items={faq} />

        <p className="mt-16 font-sans text-xs text-arrival-gold/30">{BRAND.location}</p>
      </div>
    </section>
  )
}
