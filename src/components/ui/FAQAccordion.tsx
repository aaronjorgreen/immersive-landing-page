import { useState } from 'react'
import type { FAQItem } from '@/lib/content'

interface FAQAccordionProps {
  items: FAQItem[]
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null)

  const toggle = (id: string) => {
    setOpenId((current) => (current === id ? null : id))
  }

  return (
    <div className="mt-16 w-full max-w-md space-y-2">
      <h3 className="mb-6 text-center font-sans text-xs uppercase tracking-wider text-arrival-gold/50">
        Common questions
      </h3>
      {items.map((item) => {
        const isOpen = openId === item.id
        return (
          <div key={item.id} className="border-b border-arrival-gold/15">
            <button
              type="button"
              id={`faq-${item.id}`}
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${item.id}`}
              onClick={() => toggle(item.id)}
              className="flex w-full items-center justify-between py-4 text-left font-sans text-sm text-arrival-gold/80 transition-colors hover:text-arrival-gold"
            >
              {item.question}
              <span className="ml-4 text-arrival-gold/40" aria-hidden="true">
                {isOpen ? '−' : '+'}
              </span>
            </button>
            <div
              id={`faq-panel-${item.id}`}
              role="region"
              aria-labelledby={`faq-${item.id}`}
              hidden={!isOpen}
              className="pb-4 font-sans text-sm leading-relaxed text-arrival-gold/50"
            >
              {item.answer}
            </div>
          </div>
        )
      })}
    </div>
  )
}
