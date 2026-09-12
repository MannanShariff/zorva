// Simulated maps — pure CSS/SVG, no external map APIs.

function Streets({ tone = 'var(--color-surface-container-low)' }) {
  return (
    <g stroke={tone} strokeWidth="1.5" fill="none">
      <path d="M-10 120 C 60 110 120 70 160 60 S 260 40 350 42" />
      <path d="M40 -10 C 50 50 80 90 120 130 S 180 170 210 190" />
      <path d="M-10 60 L 350 80" />
      <path d="M120 -10 L 130 190" />
      <path d="M240 -10 L 250 190" />
      <path d="M-10 170 L 350 150" />
    </g>
  )
}

function MapBase({ children, className = '', height = 'h-44' }) {
  return (
    <div className={`relative w-full ${height} rounded-xl bg-surface-container-low overflow-hidden ${className}`}>
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 340 180" preserveAspectRatio="none">
        <Streets />
      </svg>
      {children}
    </div>
  )
}

function Pin({ x, y, label, sub, color = 'var(--color-primary)', you = false, active = false }) {
  return (
    <div className="absolute flex flex-col items-center" style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%,-50%)' }}>
      {active && <span className="absolute w-10 h-10 rounded-full pulse-ring" style={{ background: color, opacity: 0.3 }} />}
      <div
        className={`relative flex items-center justify-center rounded-full shadow-e2 ${
          you ? 'w-8 h-8 bg-inverse-surface text-inverse-on-surface' : 'w-7 h-7 text-white'
        }`}
        style={you ? {} : { background: color }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
          {you ? (
            <>
              <circle cx="12" cy="12" r="5" fill="currentColor" stroke="none" />
              <circle cx="12" cy="12" r="9" opacity="0.4" />
            </>
          ) : (
            <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" fill="currentColor" stroke="none" />
          )}
        </svg>
      </div>
      <span
        className={`mt-1 px-1.5 py-0.5 rounded-full font-label-sm text-label-sm shadow-e1 whitespace-nowrap ${
          you ? 'bg-inverse-surface text-inverse-on-surface' : 'bg-surface-container-lowest text-on-surface'
        }`}
      >
        {label}
        {sub && <span className="font-bold"> {sub}</span>}
      </span>
    </div>
  )
}

// ── Matching results map (screen 4) ──────────────────────────
export function MatchingMap() {
  return (
    <MapBase height="h-52">
      <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-lowest/95 shadow-e1">
        <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
        <span className="font-label-sm text-label-sm text-on-surface font-medium">
          3 verified guild artisans within 5 km
        </span>
      </div>
      <Pin x={70} y={38} label="Ravi" sub="96%" />
      <Pin x={38} y={55} label="Suresh" sub="87%" color="var(--color-secondary)" />
      <Pin x={84} y={72} label="Imran" sub="80%" color="var(--color-tertiary-container)" />
      <Pin x={55} y={62} label="You: Flat 4B" you />
    </MapBase>
  )
}

// ── Live tracking map (screen 10) ────────────────────────────
export function TrackingMap({ progress = 0.6 }) {
  // Worker marker travels along the route path as progress increases
  const x = 22 + progress * 48
  const y = 68 - progress * 38
  return (
    <MapBase height="h-56">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 340 180" preserveAspectRatio="none">
        <path
          d="M 75 125 C 110 120 140 95 175 75"
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray="8 6"
          className="route-dash"
          opacity="0.9"
        />
      </svg>
      <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-lowest/95 shadow-e1">
        <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
        <span className="font-label-sm text-label-sm text-on-surface font-medium">Light traffic · 1.8 km away</span>
      </div>
      <Pin x={x} y={y} label="Ravi (Bike)" color="var(--color-primary)" active />
      <Pin x={55} y={62} label="Flat 4B, Palm Grove" you />
    </MapBase>
  )
}

// ── Worker demand heat map (screen 8) ────────────────────────
export function DemandHeatMap() {
  return (
    <MapBase height="h-40">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 340 180" preserveAspectRatio="none">
        <defs>
          <radialGradient id="hm1" cx="70%" cy="35%" r="26%">
            <stop offset="0%" stopColor="#8b3b00" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ffb690" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="hm2" cx="42%" cy="60%" r="22%">
            <stop offset="0%" stopColor="#5925dc" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#ccbeff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="hm3" cx="82%" cy="72%" r="20%">
            <stop offset="0%" stopColor="#006c4a" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#82f5c1" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="340" height="180" fill="url(#hm1)" />
        <rect width="340" height="180" fill="url(#hm2)" />
        <rect width="340" height="180" fill="url(#hm3)" />
      </svg>
      <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-lowest/95 shadow-e1">
        <span className="w-2 h-2 rounded-full bg-tertiary" />
        <span className="font-label-sm text-label-sm text-on-surface">Standby zone · 100ft Rd junction</span>
      </div>
    </MapBase>
  )
}

// ── Co-op forecast heat map (screen 14) ──────────────────────
export function ForecastMap({ nodes }) {
  return (
    <div className="relative w-full h-44 rounded-xl bg-surface-container-low overflow-hidden">
      <svg className="w-full h-full" viewBox="0 0 340 160" preserveAspectRatio="none">
        <defs>
          <radialGradient id="fc-whitefield" cx="78%" cy="32%" r="28%">
            <stop offset="0%" stopColor="#8b3b00" stopOpacity="0.45" />
            <stop offset="60%" stopColor="#ffb690" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#ffb690" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="fc-indiranagar" cx="50%" cy="44%" r="24%">
            <stop offset="0%" stopColor="#5925dc" stopOpacity="0.35" />
            <stop offset="70%" stopColor="#ccbeff" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#ccbeff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="fc-ecity" cx="62%" cy="84%" r="26%">
            <stop offset="0%" stopColor="#8b3b00" stopOpacity="0.4" />
            <stop offset="65%" stopColor="#ffb690" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#ffb690" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="fc-koramangala" cx="40%" cy="66%" r="20%">
            <stop offset="0%" stopColor="#006c4a" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#82f5c1" stopOpacity="0" />
          </radialGradient>
        </defs>
        <Streets tone="var(--color-outline-variant)" />
        <path d="M 170 70 L 265 50" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" opacity="0.8" fill="none" />
        <path d="M 170 70 L 210 135" stroke="var(--color-tertiary)" strokeWidth="2" strokeLinecap="round" opacity="0.7" fill="none" />
        <rect width="340" height="160" fill="url(#fc-whitefield)" />
        <rect width="340" height="160" fill="url(#fc-indiranagar)" />
        <rect width="340" height="160" fill="url(#fc-ecity)" />
        <rect width="340" height="160" fill="url(#fc-koramangala)" />
        {nodes?.map((n) => (
          <g key={n.label}>
            {n.surge && (
              <circle cx={n.x} cy={n.y} r="10" fill="none" stroke="var(--color-tertiary)" strokeWidth="1" opacity="0.6" className="animate-ping" />
            )}
            <circle cx={n.x} cy={n.y} r={n.surge ? 5 : 4} fill={n.color} />
            <text
              x={n.x}
              y={n.y - 10}
              textAnchor="middle"
              fontSize="9"
              fontWeight={n.surge ? 700 : 600}
              fill="var(--color-on-surface)"
            >
              {n.label}
            </text>
          </g>
        ))}
      </svg>
      <div className="absolute bottom-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container-lowest/90 shadow-e1">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2">
          <circle cx="6" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <path d="M6 9v6" />
        </svg>
        <span className="font-label-sm text-label-sm text-on-surface">ORR Outer Corridor Prioritized</span>
      </div>
    </div>
  )
}

// ── Allocation corridor map (screen 15) ──────────────────────
export function CorridorMap() {
  return (
    <div className="relative w-full h-44 rounded-xl overflow-hidden shadow-e1 bg-inverse-surface">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 340 180" preserveAspectRatio="none">
        <Streets tone="rgba(238,240,255,0.25)" />
        <path d="M 40 130 C 120 110 200 90 300 60" stroke="var(--color-secondary-fixed)" strokeWidth="3" fill="none" strokeDasharray="10 6" strokeLinecap="round" />
        <path d="M 90 30 C 110 80 150 120 210 160" stroke="var(--color-primary-fixed-dim)" strokeWidth="2.5" fill="none" strokeDasharray="10 6" strokeLinecap="round" />
        {[
          { x: 90, y: 105, c: 'var(--color-secondary-fixed)' },
          { x: 160, y: 80, c: 'var(--color-primary-fixed-dim)' },
          { x: 240, y: 120, c: 'var(--color-secondary-fixed)' },
        ].map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="9" fill={p.c} opacity="0.25" />
            <circle cx={p.x} cy={p.y} r="4.5" fill={p.c} />
          </g>
        ))}
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/85 via-inverse-surface/20 to-transparent pointer-events-none" />
      <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-lowest/90 shadow-e1">
        <span className="w-2 h-2 rounded-full bg-secondary" />
        <span className="font-label-sm text-label-sm text-on-surface font-semibold">Inner Ring Road Corridor</span>
      </div>
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-inverse-on-surface">
        <span className="text-body-sm text-body-sm flex items-center gap-1.5">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--color-secondary-fixed)" strokeWidth="2">
            <path d="M12 2 2 19h20L12 2z" />
          </svg>
          Max radius: <strong>3.1 km</strong>
        </span>
        <span className="font-label-sm text-label-sm bg-inverse-surface/80 px-2 py-0.5 rounded text-surface-container-lowest">
          Zero Toll Bottlenecks
        </span>
      </div>
    </div>
  )
}

// ── GPS preview with radar ping (screen 2) ───────────────────
export function LocationPreview() {
  return (
    <MapBase height="h-36">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <span className="absolute -inset-6 rounded-full bg-primary/10 pulse-ring" />
          <span className="absolute -inset-6 rounded-full bg-primary/15 pulse-ring" style={{ animationDelay: '0.6s' }} />
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-e2 relative">
            <span className="w-3 h-3 rounded-full bg-on-primary animate-pulse" />
          </div>
        </div>
      </div>
      <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between">
        <span className="px-2.5 py-1 rounded-full bg-surface-container-lowest/95 shadow-e1 font-label-sm text-label-sm text-on-surface">
          📍 GPS accurate to 5m · Flat 4B, Silver Oak Apts
        </span>
      </div>
      <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm shadow-e1">
        8 verified technicians within 2.5 km
      </div>
    </MapBase>
  )
}

// ── Worker route preview (screen 9) ──────────────────────────
export function RoutePreview() {
  return (
    <MapBase height="h-40">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 340 180" preserveAspectRatio="none">
        <path
          d="M 60 140 C 100 120 150 80 210 55"
          fill="none"
          stroke="var(--color-secondary)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray="8 6"
          className="route-dash"
        />
      </svg>
      <Pin x={18} y={76} label="Guild Node #04" color="var(--color-secondary)" />
      <Pin x={62} y={30} label="Flat 4B · 2.4 km" you />
    </MapBase>
  )
}
