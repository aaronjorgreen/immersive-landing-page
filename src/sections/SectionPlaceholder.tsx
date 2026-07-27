interface SectionPlaceholderProps {
  id: string
  label: string
  height: string
  className?: string
}

export function SectionPlaceholder({
  id,
  label,
  height,
  className = '',
}: SectionPlaceholderProps) {
  return (
    <section
      id={id}
      aria-label={label}
      className={`relative flex items-center justify-center ${className}`}
      style={{ minHeight: height }}
    >
      <p className="font-display text-xl text-white/30">{label}</p>
    </section>
  )
}
