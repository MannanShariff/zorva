import { Link } from 'react-router-dom'
import {
  CheckCircle2,
  Droplets,
  IndianRupee,
  ShieldCheck,
  Sparkles,
  Star,
  Wrench,
  Zap,
} from 'lucide-react'
import { Avatar, Card, Chip, Stars, VerificationBadge } from './ui'

const SERVICE_ICONS = { zap: Zap, droplets: Droplets, wrench: Wrench, sparkles: Sparkles }

// ── Popular service tile (screen 1) ──────────────────────────
export function ServiceCard({ name, price, rating, icon, onClick }) {
  const Icon = SERVICE_ICONS[icon] || Zap
  return (
    <button
      onClick={onClick}
      className="flex flex-col gap-2 p-4 rounded-2xl bg-surface-container-lowest shadow-e1 text-left tap"
    >
      <div className="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center text-on-primary-fixed">
        <Icon size={20} />
      </div>
      <div>
        <p className="font-label-lg text-label-lg text-on-surface">{name}</p>
        <p className="text-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
          from <IndianRupee size={11} className="-mt-0.5" />
          <span className="font-label-md font-semibold text-on-surface">{price}</span>
          <Star size={11} className="text-tertiary fill-current" /> {rating}
        </p>
      </div>
    </button>
  )
}

// ── Trusted worker card (screen 1) ───────────────────────────
export function WorkerCard({ worker, onBook, onView }) {
  return (
    <Card className="gap-3">
      <div className="flex items-start gap-3">
        <Avatar name={worker.name} size="lg" verified />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-headline-sm text-headline-sm text-on-surface truncate">{worker.name}</h3>
            <span className="font-label-md text-label-md text-primary font-bold shrink-0 flex items-center gap-0.5">
              ★ {worker.rating}
            </span>
          </div>
          <p className="text-body-sm text-body-sm text-on-surface-variant">
            {worker.title} · {worker.reviews} co-op jobs
          </p>
          <div className="flex flex-wrap gap-1.5 mt-1.5">
            <VerificationBadge>{worker.certified}</VerificationBadge>
            <Chip tone="surface">L{worker.level}</Chip>
          </div>
        </div>
      </div>
      <p className="text-body-sm text-body-sm text-on-surface leading-snug">{worker.skills}</p>
      <Chip tone="primary" icon={Sparkles} className="self-start">
        {worker.why}
      </Chip>
      <div className="grid grid-cols-2 gap-2 pt-1">
        <button
          onClick={onBook}
          className="min-h-[44px] rounded-full bg-primary text-on-primary font-label-md text-label-md font-semibold shadow-e1 tap"
        >
          Book
        </button>
        <Link
          to="/app/passport/ravi"
          className="min-h-[44px] rounded-full bg-surface-container-low text-on-surface font-label-md text-label-md font-semibold tap flex items-center justify-center"
        >
          View Skill DNA
        </Link>
      </div>
    </Card>
  )
}

// ── Cooperative guarantee banner (screen 1) ──────────────────
export function GuaranteeBanner() {
  const items = [
    { icon: ShieldCheck, title: 'Verified Skills', sub: 'No fake ratings' },
    { icon: IndianRupee, title: '90% To Worker', sub: 'Fair dividend' },
    { icon: CheckCircle2, title: 'Insurance', sub: '₹25k protection' },
  ]
  return (
    <div className="rounded-2xl bg-gradient-to-br from-primary-fixed/70 via-surface-container-lowest to-secondary-container/50 p-4 shadow-e1">
      <p className="font-headline-sm text-headline-sm text-on-surface">The Cooperative Guarantee</p>
      <div className="grid grid-cols-3 gap-2 mt-3">
        {items.map(({ icon: Icon, title, sub }) => (
          <div key={title} className="flex flex-col items-center text-center gap-1">
            <div className="w-9 h-9 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary shadow-e1">
              <Icon size={16} />
            </div>
            <p className="font-label-sm text-label-sm text-on-surface font-semibold leading-tight">{title}</p>
            <p className="text-body-sm text-body-sm text-on-surface-variant">{sub}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Active service tracker (screen 1) ────────────────────────
export function ActiveServiceCard({ worker, onTrack }) {
  const steps = ['Assigned', 'On the Way', 'Arrival', 'Payment']
  return (
    <Card className="gap-3">
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0">
          <Chip tone="tertiary" pulse>
            In Progress
          </Chip>
          <h3 className="font-headline-sm text-headline-sm text-on-surface mt-1.5 truncate">
            Emergency Circuit Breaker Repair
          </h3>
          <p className="text-body-sm text-body-sm text-on-surface-variant">
            {worker.name} · 14 min · 1.8 km
          </p>
        </div>
        <Avatar name={worker.name} size="md" verified />
      </div>
      <div className="flex items-center gap-1.5">
        {steps.map((s, i) => (
          <div key={s} className="flex-1 flex flex-col gap-1.5">
            <div className={`h-1.5 rounded-full ${i <= 1 ? 'bg-primary' : 'bg-surface-container-high'}`} />
            <span
              className={`font-label-sm text-label-sm text-center ${
                i <= 1 ? 'text-primary font-semibold' : 'text-on-surface-variant'
              }`}
            >
              {s}
            </span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2 pt-1">
        <button className="min-h-[44px] rounded-full bg-surface-container-low flex items-center justify-center gap-1.5 font-label-md text-label-md text-on-surface tap">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.9.6 2.8.7a2 2 0 0 1 1.8 2Z" />
          </svg>
          Call
        </button>
        <button className="min-h-[44px] rounded-full bg-surface-container-low flex items-center justify-center font-label-md text-label-md text-on-surface tap">
          Map
        </button>
        <button
          onClick={onTrack}
          className="min-h-[44px] rounded-full bg-primary text-on-primary font-label-md text-label-md font-semibold shadow-e1 tap"
        >
          Track
        </button>
      </div>
    </Card>
  )
}

// ── Service progress timeline (screen 10) ────────────────────
export function StatusTimeline({ steps }) {
  return (
    <div className="flex flex-col">
      {steps.map((s, i) => (
        <div key={s.title} className="flex gap-3">
          <div className="flex flex-col items-center">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                s.done
                  ? 'bg-secondary text-on-secondary'
                  : s.active
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container-high text-on-surface-variant'
              }`}
            >
              {s.done ? (
                <CheckCircle2 size={15} />
              ) : s.active ? (
                <span className="w-2.5 h-2.5 rounded-full bg-on-primary animate-pulse" />
              ) : (
                <span className="w-2 h-2 rounded-full bg-current" />
              )}
            </div>
            {i < steps.length - 1 && (
              <div className={`w-0.5 flex-1 min-h-[24px] ${s.done ? 'bg-secondary' : 'bg-surface-container-high'}`} />
            )}
          </div>
          <div className={`pb-4 min-w-0 flex-1 ${i === steps.length - 1 ? 'pb-1' : ''}`}>
            <div className="flex items-baseline justify-between gap-2">
              <p
                className={`font-label-md text-label-md font-semibold ${
                  s.done || s.active ? 'text-on-surface' : 'text-on-surface-variant'
                }`}
              >
                {s.title}
                {s.active && <span className="text-primary"> · Live</span>}
              </p>
              <span className="font-label-sm text-label-sm text-outline shrink-0">{s.time}</span>
            </div>
            <p className="text-body-sm text-body-sm text-on-surface-variant">{s.note}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

// ── Rating summary row ───────────────────────────────────────
export function RatingRow({ value, count }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-body-sm text-body-sm text-on-surface-variant">
      <Stars value={value} />
      <span className="font-label-md text-label-md text-on-surface font-semibold">{value.toFixed(2)}</span>
      <span>({count})</span>
    </span>
  )
}
