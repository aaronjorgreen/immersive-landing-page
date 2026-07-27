import { useEffect, useRef, type FormEvent } from 'react'
import { gsap } from '@/lib/gsap'
import { Button } from '@/components/ui/Button'
import { BRAND, Z_INDEX } from '@/lib/constants'
import { getHeadlines, getSectionContent } from '@/lib/content'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function CTASection() {
  const { arrival } = getHeadlines()
  const { cta } = getSectionContent()
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const name = (form.elements.namedItem('name') as HTMLInputElement).value
    const email = (form.elements.namedItem('email') as HTMLInputElement).value
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value
    const subject = encodeURIComponent(`Expedition Inquiry from ${name}`)
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)
    window.location.href = `mailto:expeditions@selvaviva.com?subject=${subject}&body=${body}`
  }

  return (
    <section
      ref={sectionRef}
      id="arrival"
      aria-label="The Arrival"
      className="relative -mt-[5vh] min-h-[100dvh] overflow-hidden"
    >
      {/* Converging layers — river teal meets dawn gold */}
      <div
        className="absolute inset-0"
        style={{ zIndex: Z_INDEX.sky }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-arrival-teal via-[#1a4a4a] to-arrival-gold/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-arrival-gold/20 to-transparent" />
      </div>

      <div
        ref={contentRef}
        className="relative flex min-h-[100dvh] flex-col items-center justify-center px-6 pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)]"
        style={{ zIndex: Z_INDEX.typography }}
      >
        <h2 className="font-display text-[clamp(2.5rem,7vw,4.5rem)] text-arrival-gold text-balance text-center">
          {arrival.headline}
        </h2>
        <p className="mt-4 max-w-md text-center font-sans text-base text-arrival-gold/60">
          {arrival.subhead}
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-12 w-full max-w-md space-y-5"
          noValidate
        >
          <div>
            <label htmlFor="name" className="mb-1.5 block font-sans text-xs uppercase tracking-wider text-arrival-gold/50">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              className="w-full border-b border-arrival-gold/30 bg-transparent px-0 py-3 font-sans text-arrival-gold placeholder:text-arrival-gold/30 focus:border-arrival-gold focus:outline-none"
              placeholder={cta.formPlaceholders.name}
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-1.5 block font-sans text-xs uppercase tracking-wider text-arrival-gold/50">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="w-full border-b border-arrival-gold/30 bg-transparent px-0 py-3 font-sans text-arrival-gold placeholder:text-arrival-gold/30 focus:border-arrival-gold focus:outline-none"
              placeholder={cta.formPlaceholders.email}
            />
          </div>
          <div>
            <label htmlFor="message" className="mb-1.5 block font-sans text-xs uppercase tracking-wider text-arrival-gold/50">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={3}
              className="w-full resize-none border-b border-arrival-gold/30 bg-transparent px-0 py-3 font-sans text-arrival-gold placeholder:text-arrival-gold/30 focus:border-arrival-gold focus:outline-none"
              placeholder={cta.formPlaceholders.message}
            />
          </div>
          <div className="pt-4 text-center">
            <Button type="submit">{BRAND.cta}</Button>
          </div>
        </form>

        <p className="mt-16 font-sans text-xs text-arrival-gold/30">
          {BRAND.location}
        </p>
      </div>
    </section>
  )
}
