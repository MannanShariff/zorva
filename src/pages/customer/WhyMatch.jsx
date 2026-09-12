import { useLocation, useNavigate } from 'react-router-dom'
import { Clock, IndianRupee, MapPin, Quote, Scale, ShieldCheck, Sparkles, Star, Zap } from 'lucide-react'
import AppShell, { PageHeader } from '../../components/AppShell'
import { Avatar, Card, Chip, MatchScore, PillButton, ProgressBar } from '../../components/ui'
import { matchFactors, matchFormula, ravi } from '../../data/mock'

const ICONS = { zap: Zap, shield: ShieldCheck, 'map-pin': MapPin, clock: Clock, star: Star, balance: Scale }
const TONES = {
  primary: 'bg-primary-fixed text-on-primary-fixed',
  secondary: 'bg-secondary-container text-on-secondary-container',
  tertiary: 'bg-tertiary-fixed text-on-tertiary-fixed',
}

export default function WhyMatch() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const worker = state?.worker || ravi
  const score = state?.score || ravi.match

  return (
    <AppShell mode="customer" title="Why This Match">
      <PageHeader
        title="Why this match"
        sub="Explainable Match Protocol — every factor, every weight"
        chips={<Chip tone="secondary">Guild Governance Audited</Chip>}
      />

      <div className="px-4 pb-28 flex flex-col gap-4">
        {/* Score hero */}
        <Card className="gap-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <Avatar name={worker.name} size="lg" verified />
              <div className="min-w-0">
                <h2 className="font-headline-sm text-headline-sm text-on-surface truncate">{worker.name}</h2>
                <p className="text-body-sm text-body-sm text-on-surface-variant truncate">
                  {worker.levelLabel || ravi.levelLabel} · {ravi.guild}
                </p>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="font-headline-xl-mobile text-headline-xl-mobile text-primary font-bold leading-none">
                {score}%
              </p>
              <p className="font-label-sm text-label-sm text-on-surface-variant">Fit Score</p>
            </div>
          </div>
          <ProgressBar value={score} />
          <p className="font-label-sm text-label-sm text-secondary font-semibold">
            High-confidence guild recommendation
          </p>
        </Card>

        {/* Recommendation quote */}
        <div className="relative p-4 rounded-2xl bg-surface-container-low flex flex-col gap-2">
          <Quote size={18} className="text-primary absolute top-3 right-3" />
          <p className="font-label-sm text-label-sm text-primary uppercase tracking-wider font-bold">
            ZORVA Recommendation
          </p>
          <p className="text-body-md text-body-md text-on-surface leading-relaxed">
            “{worker.name.split(' ')[0]} has the required electrical skills, strong verified evidence, is nearby and
            available now.”
          </p>
          <Chip tone="primary" icon={Sparkles} className="self-start">
            Generated from 6 transparent factors — no black boxes
          </Chip>
        </div>

        {/* Factor cards */}
        <div className="flex flex-col gap-3">
          {matchFactors.map((f) => {
            const Icon = ICONS[f.icon]
            return (
              <Card key={f.title} className="gap-1.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${TONES[f.tone]}`}>
                      <Icon size={17} />
                    </div>
                    <p className="font-label-lg text-label-lg text-on-surface font-semibold truncate">{f.title}</p>
                  </div>
                  <span className="font-label-md text-label-md text-primary font-bold shrink-0">{f.value}</span>
                </div>
                <p className="text-body-sm text-body-sm text-on-surface-variant pl-12">{f.detail}</p>
              </Card>
            )
          })}
        </div>

        {/* Formula */}
        <Card className="gap-3">
          <p className="font-headline-sm text-headline-sm text-on-surface">How matching works</p>
          <div className="flex flex-col gap-2.5">
            {matchFormula.map((f) => (
              <div key={f.label} className="flex items-center gap-3">
                <span className="font-label-md text-label-md text-on-surface-variant w-28 shrink-0">{f.label}</span>
                <ProgressBar value={f.value} className="flex-1" />
                <span className="font-label-md text-label-md text-primary font-bold w-10 text-right shrink-0">
                  {f.weight}%
                </span>
              </div>
            ))}
          </div>
          <div className="p-3 rounded-xl bg-surface-container-low flex items-center justify-between">
            <span className="font-label-md text-label-md text-on-surface-variant">Weighted total</span>
            <MatchScore value={score} />
          </div>
          <p className="text-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            Weights are voted on quarterly by the guild assembly. Any member can audit the formula — algorithmic
            decisions belong to the cooperative, not a platform.
          </p>
        </Card>

        {/* Price note */}
        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-secondary-container/60 text-on-secondary-container">
          <div className="flex items-center gap-2 min-w-0">
            <IndianRupee size={18} className="shrink-0" />
            <div className="min-w-0">
              <p className="font-label-md text-label-md font-bold">₹199 Standard Guild Rate</p>
              <p className="text-body-sm text-body-sm">90% goes directly to {worker.name.split(' ')[0]}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="sticky bottom-0 left-0 right-0 bg-surface/95 backdrop-blur-xl p-4 border-t border-surface-container shadow-[0_-4px_16px_rgba(89,37,220,0.06)]">
        <PillButton onClick={() => navigate('/app/booking', { state: { worker, score } })}>
          Book {worker.name} · ₹199
        </PillButton>
      </div>
    </AppShell>
  )
}
