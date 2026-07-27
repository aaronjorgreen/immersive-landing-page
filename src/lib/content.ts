import expeditionsData from '@/content/expeditions.json'
import testimonialsData from '@/content/testimonials.json'
import faqData from '@/content/faq.json'
import guidesData from '@/content/guides.json'
import headlinesData from '@/content/headlines.json'
import sectionsData from '@/content/sections.json'

export type ExpeditionDifficulty = 'gentle' | 'moderate' | 'immersive'

export interface Expedition {
  id: string
  slug: string
  name: string
  durationDays: [number, number]
  priceFrom: number
  currency: 'USD'
  season: string[]
  groupSize: [number, number]
  difficulty: ExpeditionDifficulty
  highlights: string[]
  includes: string[]
  heroImage?: string
}

export interface Testimonial {
  id: string
  quote: string
  author: string
  location: string
  expedition: string
}

export interface FAQItem {
  id: string
  question: string
  answer: string
}

export interface Guide {
  id: string
  name: string
  role: string
  yearsExperience: number
  bio: string
  credentials: string[]
}

export interface Headlines {
  hero: { lines: string[]; mobileLines: string[] }
  canopy: { lines: string[] }
  river: { lines: string[] }
  wildlife: { lines: string[] }
  community: { headline: string; body: string }
  depths: { lines: string[] }
  arrival: { headline: string; subhead: string; subheads: string[] }
  seasonality: string
}

export interface SectionContent {
  wildlife: {
    highlights: { title: string; text: string }[]
  }
  community: {
    operatingSince: number
    pledge: string
  }
  cta: {
    formPlaceholders: {
      name: string
      email: string
      message: string
    }
  }
}

const expeditions = expeditionsData as Expedition[]
const testimonials = testimonialsData as Testimonial[]
const faq = faqData as FAQItem[]
const guides = guidesData as Guide[]
const headlines = headlinesData as Headlines
const sections = sectionsData as SectionContent

export function getExpeditions(): Expedition[] {
  return expeditions
}

export function getExpeditionById(id: string): Expedition | undefined {
  return expeditions.find((e) => e.id === id)
}

export function getExpeditionBySlug(slug: string): Expedition | undefined {
  return expeditions.find((e) => e.slug === slug)
}

export function getTestimonials(): Testimonial[] {
  return testimonials
}

export function getFAQ(): FAQItem[] {
  return faq
}

export function getGuides(): Guide[] {
  return guides
}

export function getHeadlines(): Headlines {
  return headlines
}

export function getHeadlinesForAct(act: keyof Headlines): Headlines[keyof Headlines] {
  return headlines[act]
}

export function getSectionContent(): SectionContent {
  return sections
}

export function formatPriceFrom(price: number, currency: 'USD' = 'USD'): string {
  return `from $${price.toLocaleString('en-US')} ${currency}`
}

export function formatDuration(days: [number, number]): string {
  if (days[0] === days[1]) return `${days[0]} days`
  return `${days[0]}–${days[1]} days`
}
