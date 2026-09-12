import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  BadgeCheck,
  CheckCircle2,
  Loader2,
  PackageOpen,
  SignalHigh,
  WifiOff,
  X,
} from 'lucide-react'

// Mount overlays (modals, sheets, toasts) on the device frame itself so they
// escape the scrolling content area and always cover the visible app.
function portalTarget() {
  return typeof document !== 'undefined' ? document.querySelector('.app-frame') || document.body : null
}

// ── Avatar ────────────────────────────────────────────────────
export function Avatar({ name = '?', size = 'md', color, ring, verified, className = '' }) {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
  const sizes = {
    sm: 'w-9 h-9 text-label-md',
    md: 'w-11 h-11 text-label-lg',
    lg: 'w-14 h-14 text-headline-sm',
    xl: 'w-16 h-16 text-headline-md',
  }
  const hue = (name.charCodeAt(0) * 37 + (name.charCodeAt(1) || 11) * 53) % 360
  return (
    <div className={`relative shrink-0 ${className}`}>
      <div
        className={`${sizes[size]} rounded-full flex items-center justify-center font-label font-bold text-white shadow-e1 select-none`}
        style={{
          background: color || `linear-gradient(135deg, hsl(${hue} 60% 42%), hsl(${(hue + 40) % 360} 62% 30%))`,
        }}
      >
        {initials}
      </div>
      {verified && (
        <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-secondary text-on-secondary flex items-center justify-center shadow-e1 ring-2 ring-surface">
          <BadgeCheck size={12} strokeWidth={2.5} />
        </span>
      )}
      {ring && <span className={`absolute inset-0 rounded-full ring-2 ring-primary-fixed`} />}
    </div>
  )
}

// ── Chip / pill tag ───────────────────────────────────────────
export function Chip({ children, tone = 'surface', className = '', onClick, icon: Icon, pulse }) {
  const tones = {
    surface: 'bg-surface-container-low text-on-surface',
    high: 'bg-surface-container-high text-on-surface',
    primary: 'bg-primary-fixed text-on-primary-fixed',
    primarySolid: 'bg-primary text-on-primary',
    container: 'bg-primary-container text-on-primary',
    secondary: 'bg-secondary-container text-on-secondary-container',
    tertiary: 'bg-tertiary-fixed text-on-tertiary-fixed',
    outline: 'border border-outline-variant text-on-surface-variant',
  }
  const Tag = onClick ? 'button' : 'span'
  return (
    <Tag
      onClick={onClick}
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-label-sm text-label-sm ${
        onClick ? 'tap' : ''
      } ${tones[tone]} ${className}`}
    >
      {pulse && <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />}
      {Icon && <Icon size={12} />}
      {children}
    </Tag>
  )
}

// ── Section header ────────────────────────────────────────────
export function SectionHeader({ icon: Icon, title, sub, action, onAction, className = '' }) {
  return (
    <div className={`flex items-end justify-between gap-2 ${className}`}>
      <div className="min-w-0">
        <div className="flex items-center gap-1.5">
          {Icon && <Icon size={18} className="text-primary shrink-0" />}
          <h2 className="font-headline-sm text-headline-sm text-on-surface truncate">{title}</h2>
        </div>
        {sub && <p className="text-body-sm text-body-sm text-on-surface-variant mt-0.5">{sub}</p>}
      </div>
      {action && (
        <button
          onClick={onAction}
          className="text-label-md text-label-md text-primary font-semibold tap shrink-0 min-h-[32px]"
        >
          {action}
        </button>
      )}
    </div>
  )
}

// ── Stars (display) ───────────────────────────────────────────
export function Stars({ value = 5, size = 13, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-0.5 text-tertiary ${className}`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" aria-hidden>
          <path
            d="M12 2l2.9 6.26 6.85.83-5.07 4.7 1.35 6.77L12 17.1l-6.03 3.46 1.35-6.77-5.07-4.7 6.85-.83L12 2z"
            fill={i <= Math.round(value) ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="1.6"
          />
        </svg>
      ))}
    </span>
  )
}

// ── Interactive star rating ───────────────────────────────────
export function StarRating({ value = 0, onChange, size = 30 }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          aria-label={`${i} star${i > 1 ? 's' : ''}`}
          onClick={() => onChange?.(i)}
          className={`w-10 h-10 rounded-full flex items-center justify-center tap ${
            i <= value ? 'text-tertiary' : 'text-surface-dim'
          }`}
        >
          <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
            <path
              d="M12 2l2.9 6.26 6.85.83-5.07 4.7 1.35 6.77L12 17.1l-6.03 3.46 1.35-6.77-5.07-4.7 6.85-.83L12 2z"
              fill={i <= value ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth="1.6"
            />
          </svg>
        </button>
      ))}
    </div>
  )
}

// ── Skill level bar (5 segments, L1–L5) ──────────────────────
export function SkillLevelBar({ level = 0, className = '' }) {
  return (
    <div className={`flex gap-1 ${className}`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`h-1.5 flex-1 rounded-full ${
            i <= level ? (level >= 4 ? 'bg-secondary' : 'bg-primary') : 'bg-surface-container-high'
          }`}
        />
      ))}
    </div>
  )
}

// ── Match score pill ──────────────────────────────────────────
export function MatchScore({ value = 96, size = 'md', className = '' }) {
  const sizes = {
    sm: 'px-2 py-0.5 text-label-sm',
    md: 'px-2.5 py-1 text-label-md',
    lg: 'px-3 py-1.5 text-label-lg',
  }
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-primary text-on-primary font-label font-bold ${sizes[size]} ${className}`}
    >
      {value}% Match
    </span>
  )
}

// ── Verification badge ────────────────────────────────────────
export function VerificationBadge({ children = 'Verified', icon: Icon = BadgeCheck, tone = 'secondary' }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-label-sm text-label-sm font-semibold ${
        tone === 'secondary'
          ? 'bg-secondary-container text-on-secondary-container'
          : 'bg-primary-fixed text-on-primary-fixed'
      }`}
    >
      <Icon size={12} />
      {children}
    </span>
  )
}

// ── Primary pill CTA ──────────────────────────────────────────
export function PillButton({
  children,
  onClick,
  variant = 'primary',
  icon: Icon,
  className = '',
  disabled,
  type = 'button',
}) {
  const variants = {
    primary: 'bg-primary text-on-primary shadow-e2',
    secondary: 'bg-secondary text-on-secondary shadow-e2',
    container: 'bg-primary-container text-on-primary shadow-e1',
    surface: 'bg-surface-container-low text-on-surface shadow-e1',
    outline: 'border border-outline-variant text-on-surface-variant',
    ghost: 'text-on-surface-variant',
  }
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full min-h-[48px] rounded-full font-label-lg text-label-lg flex items-center justify-center gap-2 tap disabled:opacity-50 ${variants[variant]} ${className}`}
    >
      {children}
      {Icon && <Icon size={18} />}
    </button>
  )
}

// ── Segmented control ─────────────────────────────────────────
export function SegmentedControl({ options, value, onChange, className = '' }) {
  return (
    <div className={`flex items-center gap-1 p-1 rounded-full bg-surface-container-low ${className}`}>
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={`flex-1 py-1.5 px-3 rounded-full font-label-md text-label-md text-center whitespace-nowrap tap ${
            value === opt ? 'bg-primary-container text-on-primary shadow-e1' : 'text-on-surface-variant'
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  )
}

// ── Circular meter ────────────────────────────────────────────
export function RingMeter({ value = 82, size = 28, stroke = 3.2, label }) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90 shrink-0">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--color-surface-container)" strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="var(--color-primary)"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - value / 100)}
      />
      {label && <title>{label}</title>}
    </svg>
  )
}

// ── Progress bar ──────────────────────────────────────────────
export function ProgressBar({ value = 0, tone = 'primary', className = '' }) {
  const tones = { primary: 'bg-primary', secondary: 'bg-secondary', tertiary: 'bg-tertiary' }
  return (
    <div className={`h-2 rounded-full bg-surface-container overflow-hidden ${className}`}>
      <div
        className={`h-full rounded-full ${tones[tone]} transition-all duration-700`}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  )
}

// ── Countdown timer ───────────────────────────────────────────
export function Countdown({ seconds = 165, onEnd, className = '' }) {
  const [left, setLeft] = useState(seconds)
  const endedRef = useRef(false)
  useEffect(() => {
    const t = setInterval(() => setLeft((s) => (s <= 1 ? 0 : s - 1)), 1000)
    return () => clearInterval(t)
  }, [])
  useEffect(() => {
    if (left === 0 && !endedRef.current) {
      endedRef.current = true
      onEnd?.()
    }
  }, [left, onEnd])
  const mm = String(Math.floor(left / 60)).padStart(2, '0')
  const ss = String(left % 60).padStart(2, '0')
  return (
    <span className={`font-label font-bold tabular-nums ${className}`}>
      {mm}:{ss}
    </span>
  )
}

// ── Toast ─────────────────────────────────────────────────────
const ToastCtx = createContext(null)
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const push = useCallback((message, tone = 'primary') => {
    const id = Date.now() + Math.random()
    setToasts((t) => [...t, { id, message, tone }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2600)
  }, [])
  return (
    <ToastCtx.Provider value={push}>
      {children}
      <div className="absolute bottom-24 left-0 right-0 z-[80] flex flex-col items-center gap-2 px-4 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="rise flex items-center gap-2 px-4 py-2.5 rounded-full bg-inverse-surface text-inverse-on-surface text-body-md text-body-md shadow-e3 max-w-full"
          >
            <CheckCircle2 size={16} className={t.tone === 'secondary' ? 'text-secondary-fixed' : 'text-primary-fixed-dim'} />
            <span className="truncate">{t.message}</span>
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  )
}
export const useToast = () => useContext(ToastCtx) || (() => {})

// ── Modal ─────────────────────────────────────────────────────
export function Modal({ open, onClose, children, title }) {
  if (!open) return null
  return createPortal(
    <div className="absolute inset-0 z-[70] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-inverse-surface/60 backdrop-blur-sm" onClick={onClose} />
      <div className="rise relative w-full max-w-[330px] bg-surface-container-lowest rounded-3xl shadow-e3 p-6 flex flex-col gap-3">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low tap"
        >
          <X size={16} />
        </button>
        {title && <h3 className="font-headline-md text-headline-md text-on-surface pr-8">{title}</h3>}
        {children}
      </div>
    </div>,
    portalTarget(),
  )
}

// ── Bottom sheet ──────────────────────────────────────────────
export function BottomSheet({ open, onClose, title, children }) {
  if (!open) return null
  return createPortal(
    <div className="absolute inset-0 z-[70] flex flex-col justify-end">
      <div className="absolute inset-0 bg-inverse-surface/50 backdrop-blur-sm" onClick={onClose} />
      <div
        className="rise relative bg-surface-container-lowest rounded-t-3xl shadow-e3 p-5 pb-8 max-h-[75%] overflow-y-auto no-scrollbar"
        role="dialog"
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-headline-sm text-headline-sm text-on-surface">{title}</h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-9 h-9 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low tap"
          >
            <X size={16} />
          </button>
        </div>
        {children}
      </div>
    </div>,
    portalTarget(),
  )
}

// ── Empty state ───────────────────────────────────────────────
export function EmptyState({ icon: Icon = PackageOpen, title, sub, action, onAction }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-6 gap-2">
      <div className="w-14 h-14 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant">
        <Icon size={24} />
      </div>
      <p className="font-headline-sm text-headline-sm text-on-surface">{title}</p>
      {sub && <p className="text-body-sm text-body-sm text-on-surface-variant max-w-[260px]">{sub}</p>}
      {action && (
        <button
          onClick={onAction}
          className="mt-2 px-5 min-h-[44px] rounded-full bg-primary-fixed text-on-primary-fixed font-label-md text-label-md tap"
        >
          {action}
        </button>
      )}
    </div>
  )
}

// ── Loading state ─────────────────────────────────────────────
export function LoadingState({ label = 'Working…', sub } = {}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 gap-3">
      <Loader2 size={28} className="text-primary animate-spin" />
      <div>
        <p className="font-headline-sm text-headline-sm text-on-surface">{label}</p>
        {sub && <p className="text-body-sm text-body-sm text-on-surface-variant mt-1">{sub}</p>}
      </div>
    </div>
  )
}

// ── Offline state ─────────────────────────────────────────────
export function OfflineState({ note = 'Works offline · Local Vault', sub = 'Saved offline — will sync when connected' }) {
  return (
    <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-tertiary-fixed/60 text-on-tertiary-fixed">
      <div className="w-9 h-9 rounded-full bg-tertiary-container text-on-tertiary flex items-center justify-center shrink-0">
        <WifiOff size={18} />
      </div>
      <div className="min-w-0">
        <p className="font-label-md text-label-md font-bold flex items-center gap-1.5">
          <SignalHigh size={13} /> {note}
        </p>
        <p className="text-body-sm text-body-sm mt-0.5 leading-snug">{sub}</p>
      </div>
    </div>
  )
}

// ── Card wrapper ──────────────────────────────────────────────
export function Card({ children, className = '', tone = 'lowest', onClick }) {
  const tones = {
    lowest: 'bg-surface-container-lowest',
    low: 'bg-surface-container-low',
    container: 'bg-surface-container',
  }
  const Tag = onClick ? 'button' : 'div'
  return (
    <Tag
      onClick={onClick}
      className={`rounded-2xl shadow-e1 p-4 flex flex-col gap-2 text-left ${tones[tone]} ${className}`}
    >
      {children}
    </Tag>
  )
}
