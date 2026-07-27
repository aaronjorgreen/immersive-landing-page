interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  children: React.ReactNode
}

export function Button({
  variant = 'primary',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center rounded-sm px-8 py-4 font-sans text-sm uppercase tracking-[0.15em] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-arrival-gold focus-visible:ring-offset-2 focus-visible:ring-offset-depths-indigo'

  const variants = {
    primary:
      'bg-arrival-gold/90 text-depths-indigo hover:bg-arrival-gold hover:scale-[1.02]',
    secondary:
      'border border-arrival-gold/40 text-arrival-gold/80 hover:border-arrival-gold hover:text-arrival-gold',
  }

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}
