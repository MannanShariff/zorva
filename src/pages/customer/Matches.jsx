import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronDown, ChevronRight, CheckCircle2, Clock, IndianRupee, Sparkles, Star } from 'lucide-react'
import AppShell, { PageHeader } from '../../components/AppShell'
import { Avatar, Card, Chip, MatchScore, PillButton, VerificationBadge } from '../../components/ui'
import { MatchingMap } from '../../components/MapPreview'
import { matches, ravi } from '../../data/mock'

const WEIGHTS = [
  { label: 'Skill DNA', pct: '40%' },
  { label: 'Hyperlocal Proximity', pct: '30%' },
  { label: 'Fair Co-op Workload Balancing', pct: '30%' },
]

const RAVI_CHECKS = ['All required skills verified', 'Closest dispatch at 2.4 km', 'Zero callback history']

export default function Matches() {
  const navigate = useNavigate()
  const [openWhy, setOpenWhy] = useState(false)
  const top = matches[0]

  return (
    <AppShell mode="customer" title="Matching Results">
      <PageHeader
        title="Your verified matches"
        sub="Ranked by evidence-backed skill, not bids"
        chips={
          <>
            <Chip tone="high">3 artisans within 5 km</Chip>
            <Chip tone="secondary">Zero Surge</Chip>
          </>
        }
      />

      <div className="px-4 pb-8 flex flex-col gap-4">
        <MatchingMap />

        {/* Why these matches — explainable accordion */}
        <Card className="gap-2">
          <button onClick={() => setOpenWhy((o) => !o)} className="flex items-center justify-between w-full tap">
            <span className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-1.5">
              <Sparkles size={17} className="text-primary" /> Why these matches?
            </span>
            <ChevronDown size={18} className={`text-on-surface-variant transition-transform ${openWhy ? 'rotate-180' : ''}`} />
          </button>
          {openWhy && (
            <div className="flex flex-col gap-2 pt-1 rise">
              {WEIGHTS.map((w) => (
                <div key={w.label} className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-low">
                  <span className="font-label-md text-label-md text-on-surface">{w.label}</span>
                  <span className="font-label-md text-label-md text-primary font-bold">{w.pct}</span>
                </div>
              ))}
              <p className="text-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                The ranking formula is published to every guild member — the same weights apply to every dispatch,
                with zero paid promotion.
              </p>
            </div>
          )}
        </Card>

        {/* Top recommended */}
        <Card className="gap-3 border border-primary/20">
          <div className="flex items-center justify-between">
            <Chip tone="primarySolid">Top Recommended</Chip>
            <MatchScore value={top.score} />
          </div>
          <div className="flex items-start gap-3">
            <Avatar name={ravi.name} size="lg" verified />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-headline-sm text-headline-sm text-on-surface truncate">{ravi.name}</h3>
                <span className="font-label-md text-label-md text-primary font-bold flex items-center gap-0.5 shrink-0">
                  <Star size={12} className="fill-current" /> {ravi.rating}
                </span>
              </div>
              <p className="text-body-sm text-body-sm text-on-surface-variant">
                {ravi.levelLabel} Electrician · {ravi.reviews} jobs
              </p>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                <VerificationBadge>Living Skill Passport™</VerificationBadge>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            {RAVI_CHECKS.map((c) => (
              <div key={c} className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-secondary shrink-0" />
                <span className="text-body-sm text-body-sm text-on-surface">{c}</span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { k: 'ETA', v: '24 min' },
              { k: 'Certified', v: 'L4 Master' },
              { k: 'Co-op stake', v: ravi.equity },
            ].map(({ k, v }) => (
              <div key={k} className="p-2.5 rounded-xl bg-surface-container-low text-center">
                <p className="font-label-sm text-label-sm text-on-surface-variant">{k}</p>
                <p className="font-label-md text-label-md text-on-surface font-semibold mt-0.5">{v}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1.5 text-on-surface-variant">
            <IndianRupee size={15} />
            <p className="text-body-sm text-body-sm">₹199 Standard Guild Rate · 90% direct payout</p>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-1">
            <PillButton onClick={() => navigate('/app/why-match')}>Select & Book {ravi.name.split(' ')[0]}</PillButton>
            <Link
              to="/app/passport/ravi"
              className="min-h-[48px] rounded-full bg-surface-container-low text-on-surface font-label-lg text-label-lg flex items-center justify-center text-center leading-tight shadow-e1 tap px-3"
            >
              View Skill Passport
            </Link>
          </div>
        </Card>

        {/* Other artisans */}
        <div className="flex flex-col gap-3">
          {matches.slice(1).map((m) => (
            <Card key={m.worker.id} className="gap-2.5">
              <div className="flex items-start gap-3">
                <Avatar name={m.worker.name} size="md" color={m.worker.color} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-label-lg text-label-lg text-on-surface font-semibold truncate">{m.worker.name}</h3>
                    <MatchScore value={m.score} size="sm" />
                  </div>
                  <p className="text-body-sm text-body-sm text-on-surface-variant">
                    ★ {m.worker.rating} · {m.jobsDone} verified repairs · ETA {m.eta}
                  </p>
                  <p className="text-body-sm text-body-sm text-on-surface mt-1">{m.reason}</p>
                </div>
              </div>
              <button
                onClick={() => navigate('/app/why-match', { state: { worker: m.worker, score: m.score } })}
                className="self-end inline-flex items-center gap-1 text-label-md text-label-md text-primary font-semibold min-h-[40px] tap"
              >
                Why {m.score}%? <ChevronRight size={15} />
              </button>
            </Card>
          ))}
        </div>

        <div className="p-3.5 rounded-2xl bg-primary-fixed/50 flex items-start gap-2.5">
          <Clock size={18} className="text-primary shrink-0 mt-0.5" />
          <p className="text-body-sm text-body-sm text-on-surface-variant">
            <span className="font-semibold text-on-surface">Cooperative guarantee:</span> 90% of your ₹199 service fee
            goes directly to the technician — 0% corporate cut.
          </p>
        </div>
      </div>
    </AppShell>
  )
}
