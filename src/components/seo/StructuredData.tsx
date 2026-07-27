import { getExpeditions, getFAQ } from '@/lib/content'
import { BRAND } from '@/lib/constants'

export function StructuredData() {
  const expeditions = getExpeditions()
  const faq = getFAQ()

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: BRAND.name,
    description: BRAND.tagline,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Manaus',
      addressCountry: 'BR',
    },
  }

  const trips = expeditions.map((exp) => ({
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: exp.name,
    description: exp.highlights.join('. '),
    touristType: exp.difficulty,
    offers: {
      '@type': 'Offer',
      price: exp.priceFrom,
      priceCurrency: exp.currency,
      availability: 'https://schema.org/InStock',
    },
  }))

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  const schemas = [organization, ...trips, faqPage]

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}
