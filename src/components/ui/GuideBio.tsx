import type { Guide } from '@/lib/content'

interface GuideBioProps {
  guide: Guide
}

export function GuideBio({ guide }: GuideBioProps) {
  return (
    <article className="border-l-2 border-community-amber/40 pl-6">
      <h3 className="font-display text-xl text-community-warm/95">{guide.name}</h3>
      <p className="mt-1 font-sans text-xs uppercase tracking-wider text-community-warm/50">
        {guide.role} · {guide.yearsExperience} years
      </p>
      <p className="mt-3 font-sans text-sm leading-relaxed text-community-warm/70">
        {guide.bio}
      </p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {guide.credentials.map((cred) => (
          <li
            key={cred}
            className="rounded-sm border border-community-amber/20 px-2 py-0.5 font-sans text-xs text-community-warm/60"
          >
            {cred}
          </li>
        ))}
      </ul>
    </article>
  )
}
