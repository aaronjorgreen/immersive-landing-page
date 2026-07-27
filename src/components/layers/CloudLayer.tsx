interface CloudLayerProps {
  className?: string
  /** Number of depth planes (default 4 for v2) */
  planes?: number
}

const CLOUD_PLANES = [
  {
    animation: 'cloud-drift-slow',
    top: '8%',
    width: '130%',
    left: '-15%',
    opacity: 0.18,
    viewBox: '0 0 1200 250',
    ellipses: [
      { cx: 150, cy: 140, rx: 200, ry: 45 },
      { cx: 500, cy: 120, rx: 240, ry: 50 },
      { cx: 900, cy: 150, rx: 180, ry: 42 },
    ],
  },
  {
    animation: 'cloud-drift',
    top: '15%',
    width: '120%',
    left: '-10%',
    opacity: 0.28,
    viewBox: '0 0 1200 300',
    ellipses: [
      { cx: 200, cy: 180, rx: 180, ry: 60 },
      { cx: 380, cy: 160, rx: 140, ry: 50 },
      { cx: 550, cy: 190, rx: 200, ry: 55 },
      { cx: 780, cy: 170, rx: 160, ry: 45 },
      { cx: 980, cy: 185, rx: 190, ry: 58 },
    ],
  },
  {
    animation: 'cloud-drift-slow',
    top: '22%',
    width: '115%',
    left: '-8%',
    opacity: 0.22,
    viewBox: '0 0 1200 200',
    ellipses: [
      { cx: 300, cy: 120, rx: 220, ry: 50 },
      { cx: 600, cy: 100, rx: 180, ry: 40 },
      { cx: 900, cy: 130, rx: 200, ry: 48 },
    ],
  },
  {
    animation: 'cloud-drift',
    top: '30%',
    width: '105%',
    left: '-3%',
    opacity: 0.35,
    viewBox: '0 0 1200 180',
    ellipses: [
      { cx: 250, cy: 100, rx: 160, ry: 38 },
      { cx: 650, cy: 90, rx: 190, ry: 42 },
      { cx: 950, cy: 110, rx: 150, ry: 35 },
    ],
  },
] as const

export function CloudLayer({ className = '', planes = 4 }: CloudLayerProps) {
  const activePlanes = CLOUD_PLANES.slice(0, Math.min(planes, CLOUD_PLANES.length))

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {activePlanes.map((plane, index) => (
        <svg
          key={index}
          className={`${plane.animation} absolute`}
          style={{
            top: plane.top,
            left: plane.left,
            width: plane.width,
            opacity: plane.opacity,
          }}
          viewBox={plane.viewBox}
          preserveAspectRatio="xMidYMid slice"
          fill="white"
        >
          {plane.ellipses.map((e, i) => (
            <ellipse key={i} cx={e.cx} cy={e.cy} rx={e.rx} ry={e.ry} />
          ))}
        </svg>
      ))}
    </div>
  )
}
