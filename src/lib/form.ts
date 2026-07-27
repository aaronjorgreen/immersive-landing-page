export interface EnquiryPayload {
  name: string
  email: string
  expedition: string
  preferredMonth?: string
  groupSize?: string
  message?: string
}

export interface FormSubmitResult {
  ok: boolean
  error?: string
}

const FORMSPREE_ENDPOINT =
  import.meta.env.VITE_FORMSPREE_ENDPOINT ?? 'https://formspree.io/f/xplaceholder'

/**
 * Submit enquiry to Formspree (or configured endpoint).
 * Set VITE_FORMSPREE_ENDPOINT in .env for production.
 */
export async function submitEnquiry(payload: EnquiryPayload): Promise<FormSubmitResult> {
  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        expedition: payload.expedition,
        preferredMonth: payload.preferredMonth || 'Flexible',
        groupSize: payload.groupSize || 'Not specified',
        message: payload.message || '',
        _subject: `Expedition inquiry — ${payload.expedition}`,
      }),
    })

    if (!response.ok) {
      const data = (await response.json().catch(() => ({}))) as { error?: string }
      return { ok: false, error: data.error ?? 'Something went wrong. Please try again.' }
    }

    return { ok: true }
  } catch {
    return { ok: false, error: 'Network error. Please check your connection and try again.' }
  }
}
