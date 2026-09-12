import { useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  Award,
  Scale,
  BadgeCheck,
  CheckCircle2,
  Search,
  TrendingUp,
  Verified,
  Zap,
} from 'lucide-react'
import AppShell, { PageHeader } from '../../components/AppShell'
import { Avatar, Card, Chip, PillButton } from '../../components/ui'
import { ravi } from '../../data/mock'

const PERKS = [
  {
    icon: Zap,
    tone: 'bg-secondary-container text-on-secondary-container',
    title: 'Dispatch Priority',
    value: '+4.8% Priority',
    note: 'Ranked first for inverter & stator failure dispatches within 4.5 km of Indiranagar.',
  },
  {
    icon: Award,
    tone: 'bg-primary-fixed text-on-primary-fixed',
    title: 'Master Diagnostic Tier',
    value: 'Tier Unlocked',
    note: 'Autonomous routing now includes Level 4 complex high-voltage domestic diagnostics.',
  },
  {
    icon: Scale,
    tone: 'bg-tertiary-fixed text-on-tertiary-fixed',
    title: 'Co-op Workload Equity',
    value: '3.2% Stake Accrued',
    note: 'Zero platform rejection penalties · full dividend allocation logged on the ledger.',
  },
]

export default function PassportUpdated() {
  const navigate = useNavigate()

  return (
    <AppShell mode="worker" title="Passport Updated">
      <PageHeader title="" sub="" onBack chips={<Chip tone="secondary" pulse>Autonomous Verification Confirmed</Chip>} />

      <div className="px-4 pb-8 flex flex-col gap-4">
        {/* Hero */}
        <div className="flex flex-col items-center text-center gap-2 rise">
          <div className="relative w-36 h-36 flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full spin-slow" fill="none" viewBox="0 0 160 160">
              <circle cx="80" cy="80" r="74" stroke="#5925dc" strokeDasharray="4 6" strokeWidth="1.2" opacity="0.25" />
              <circle cx="80" cy="80" r="62" stroke="#85f8c4" strokeDasharray="12 4" strokeWidth="1.5" opacity="0.4" />
              <circle cx="80" cy="80" r="48" stroke="#5925dc" strokeWidth="1" opacity="0.15" />
            </svg>
            <div className="relative z-10 w-24 h-24 rounded-full bg-surface-container-lowest shadow-e3 flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-secondary-container flex items-center justify-center">
                <Verified size={32} className="text-on-secondary-container" />
              </div>
              <span className="absolute -bottom-1.5 px-2.5 py-0.5 rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm shadow-e1">
                NODE #04
              </span>
            </div>
          </div>
          <p className="inline-flex items-center gap-1 text-secondary font-label-md text-label-md">
            <BadgeCheck size={15} /> Cryptographic Guild Ledger Sync
          </p>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface tracking-tight max-w-xs">
            Your skill passport improved
          </h1>
          <p className="text-body-md text-body-md text-on-surface-variant max-w-sm leading-relaxed">
            Your completed work becomes evidence that improves future matching.
          </p>
        </div>

        {/* Worker pill */}
        <div className="bg-surface-container-low rounded-2xl p-3 flex items-center justify-between shadow-e1">
          <div className="flex items-center gap-3 min-w-0">
            <Avatar name={ravi.name} size="md" />
            <div className="flex flex-col min-w-0">
              <span className="font-label-lg text-label-lg text-on-surface truncate">{ravi.name}</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant truncate">
                Level 4 Master Electrician · Indiranagar Node
              </span>
            </div>
          </div>
          <Chip tone="high">Active Owner</Chip>
        </div>

        {/* Credential updates */}
        <Card className="gap-3">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
              Credential domain
            </span>
            <span className="font-label-sm text-label-sm text-secondary bg-secondary-container/50 px-2 py-0.5 rounded-full">
              Validated just now
            </span>
          </div>
          <div>
            <p className="font-headline-sm text-headline-sm text-on-surface">Electrical Wiring & Diagnostic Repair</p>
            <p className="text-body-sm text-body-sm text-on-surface-variant">
              Validated via Indiranagar Node #04 Autonomous Validator
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-surface-container-low rounded-xl p-3">
              <p className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1.5">
                <Award size={13} className="text-primary" /> Guild Tier
              </p>
              <p className="font-headline-sm text-headline-sm text-on-surface mt-1">
                Level 4 <span className="font-label-sm text-label-sm text-secondary font-medium">confirmed</span>
              </p>
              <p className="text-body-sm text-body-sm text-on-surface-variant">Threshold sustained</p>
            </div>
            <div className="bg-surface-container-low rounded-xl p-3">
              <p className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1.5">
                <TrendingUp size={13} className="text-secondary" /> Match confidence
              </p>
              <p className="font-headline-sm text-headline-sm text-primary mt-1">
                99.5% <span className="font-label-sm text-label-sm text-secondary font-medium">+0.3%</span>
              </p>
              <p className="text-body-sm text-body-sm text-on-surface-variant">Hardware & client proof</p>
            </div>
          </div>
          <div className="bg-surface-container rounded-xl p-3 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <p className="font-label-md text-label-md text-on-surface flex items-center gap-1.5">
                <Verified size={15} className="text-primary" /> New verified work outcome (+1)
              </p>
              <span className="font-label-sm text-label-sm text-on-surface-variant">#ZRV-JOB-942</span>
            </div>
            <p className="text-body-sm text-body-sm text-on-surface leading-snug">
              Ceiling Fan Stator Diagnostic & Hardware Replacement with multi-meter load testing verified.
            </p>
            <div className="flex flex-wrap gap-1.5">
              <Chip tone="surface">48 Verified Jobs</Chip>
              <Chip tone="secondary">100% 30-Day Warranty</Chip>
              <Chip tone="outline">Zero Callback Flag</Chip>
            </div>
          </div>
        </Card>

        {/* Dispatch perks */}
        <Card className="gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed">
              <Zap size={16} />
            </div>
            <div>
              <h2 className="font-headline-sm text-headline-sm text-on-surface">What this means for your dispatch</h2>
              <p className="text-body-sm text-body-sm text-on-surface-variant">Transparent weightings · Bengaluru East</p>
            </div>
          </div>
          {PERKS.map(({ icon: Icon, tone, title, value, note }) => (
            <div key={title} className="flex items-start gap-3 p-3 rounded-xl bg-surface-container-low">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${tone}`}>
                <Icon size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-label-md text-label-md text-on-surface">{title}</span>
                  <span className="font-label-md text-label-md text-primary font-semibold shrink-0">{value}</span>
                </div>
                <p className="text-body-sm text-body-sm text-on-surface-variant mt-0.5">{note}</p>
              </div>
            </div>
          ))}
        </Card>

        {/* Guild consensus */}
        <div className="bg-primary-container text-on-primary rounded-2xl p-4 shadow-e2 relative overflow-hidden">
          <div className="flex flex-col min-w-0 relative z-10">
            <span className="font-label-sm text-label-sm uppercase tracking-wider opacity-80">Guild Consensus</span>
            <span className="font-headline-sm text-headline-sm mt-0.5">Certified Peer Sign-Off</span>
            <p className="text-body-sm text-body-sm opacity-90 mt-1">
              Confirmed by Lead Inspector V. Sunder & 3 peer nodes on chain.
            </p>
          </div>
          <div className="absolute right-0 bottom-0 w-36 h-36 bg-surface-tint opacity-30 rounded-full blur-2xl" />
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-2">
          <PillButton onClick={() => navigate('/worker/passport')}>
            View my passport <ArrowRight size={17} />
          </PillButton>
          <PillButton variant="surface" onClick={() => navigate('/worker/jobs')}>
            <Search size={16} className="text-primary" /> Find more opportunities
          </PillButton>
        </div>

        <p className="flex items-center justify-center gap-1.5 text-label-sm text-label-sm text-on-surface-variant text-center pt-2">
          <CheckCircle2 size={12} /> Immutable Record #IND-04-2024-9428 · Bengaluru South Guild
        </p>
      </div>
    </AppShell>
  )
}
