interface CloudLayerProps {
  className?: string
}

export function CloudLayer({ className = '' }: CloudLayerProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <svg
        className="cloud-drift absolute -left-[10%] top-[15%] w-[120%] opacity-40"
        viewBox="0 0 1200 300"
        preserveAspectRatio="xMidYMid slice"
        fill="white"
      >
        <ellipse cx="200" cy="180" rx="180" ry="60" />
        <ellipse cx="380" cy="160" rx="140" ry="50" />
        <ellipse cx="550" cy="190" rx="200" ry="55" />
        <ellipse cx="780" cy="170" rx="160" ry="45" />
        <ellipse cx="980" cy="185" rx="190" ry="58" />
      </svg>
      <svg
        className="cloud-drift-slow absolute -left-[5%] top-[25%] w-[110%] opacity-25"
        viewBox="0 0 1200 200"
        preserveAspectRatio="xMidYMid slice"
        fill="white"
      >
        <ellipse cx="300" cy="120" rx="220" ry="50" />
        <ellipse cx="600" cy="100" rx="180" ry="40" />
        <ellipse cx="900" cy="130" rx="200" ry="48" />
      </svg>
    </div>
  )
}
