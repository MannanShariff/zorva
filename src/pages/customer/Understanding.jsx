import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  BadgeCheck,
  Bot,
  BrainCircuit,
  CheckCircle2,
  IndianRupee,
  Loader2,
  MapPin,
  Wrench,
} from 'lucide-react'
import AppShell, { PageHeader } from '../../components/AppShell'
import { Card, Chip, PillButton } from '../../components/ui'
import { job } from '../../data/mock'

const CHECKLIST = [
  { title: 'Electrical diagnosis', note: 'L3+ Certified skill domain' },
  { title: 'Appliance & fan motor overhaul', note: 'Specialized' },
  { title: 'Capacitor & voltage tolerance testing', note: 'Digital Multimeter verified' },
]

const PROTOCOL = [
  { title: 'Request parsed', note: 'Intent, urgency & skill tier extracted' },
  { title: 'Guild scanned', note: '12 verified electricians nearby' },
  { title: 'Fair ranking', note: 'Skill · proximity · workload equity' },
]

export default function AiUnderstanding() {
  const navigate = useNavigate()
  const [phase, setPhase] = useState(0) // 0 analyzing → 1 done → 2 full reveal

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 1900)
    const t2 = setTimeout(() => setPhase(2), 2300)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  return (
    <AppShell mode="customer" title="AI Understanding">
      <PageHeader title="AI Task Understanding" sub="Transparent analysis — see exactly what the AI understood" />

      <div className="px-4 pb-8 flex flex-col gap-4">
        {/* Status banner */}
        <div
          className={`flex items-center justify-between p-3.5 rounded-2xl shadow-e1 ${
            phase >= 1 ? 'bg-secondary-container text-on-secondary-container' : 'bg-surface-container-low text-on-surface-variant'
          }`}
        >
          <div className="flex items-center gap-2 min-w-0">
            {phase >= 1 ? <CheckCircle2 size={18} /> : <Loader2 size={18} className="animate-spin" />}
            <span className="font-label-md text-label-md font-bold truncate">
              {phase >= 1 ? 'AI Analysis Complete · 99.1% Confidence' : 'Analysing your request…'}
            </span>
          </div>
          {phase >= 1 && <Chip tone="surface">Hinglish v4.2 NLP</Chip>}
        </div>

        {/* Original prompt */}
        <Card tone="low" className="gap-2">
          <div className="flex items-center justify-between">
            <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Your request</p>
            <Bot size={15} className="text-primary" />
          </div>
          <p className="text-body-lg text-body-lg text-on-surface italic">“{job.problem}”</p>
        </Card>

        {phase < 2 ? (
          <Card className="gap-2.5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-4 rounded-full shimmer" style={{ width: `${90 - i * 18}%` }} />
            ))}
          </Card>
        ) : (
          <>
            {/* Diagnosis */}
            <Card className="gap-3 rise">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed">
                  <BrainCircuit size={16} />
                </div>
                <p className="font-headline-sm text-headline-sm text-on-surface">Preliminary diagnosis</p>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { k: 'Category', v: job.category },
                  { k: 'Severity', v: job.severity },
                  { k: 'Est. time', v: job.estimate },
                ].map(({ k, v }) => (
                  <div key={k} className="p-2.5 rounded-xl bg-surface-container-low text-center">
                    <p className="font-label-sm text-label-sm text-on-surface-variant">{k}</p>
                    <p className="font-label-md text-label-md text-on-surface font-semibold mt-0.5">{v}</p>
                  </div>
                ))}
              </div>
              <p className="text-body-md text-body-md text-on-surface-variant leading-relaxed">
                <span className="font-semibold text-on-surface">Inferred mechanical cause:</span> ceiling-fan motor
                overheating — thermal cutoff or capacitor degradation. Routed to Level 4 guild electricians with thermal
                diagnostic meters.
              </p>
            </Card>

            {/* Skill DNA checklist */}
            <Card className="gap-3 rise" >
              <p className="font-headline-sm text-headline-sm text-on-surface">Required Skill DNA</p>
              {CHECKLIST.map((c) => (
                <div key={c.title} className="flex items-center gap-2.5">
                  <CheckCircle2 size={18} className="text-secondary shrink-0" />
                  <div className="min-w-0">
                    <p className="font-label-md text-label-md text-on-surface font-semibold">{c.title}</p>
                    <p className="text-body-sm text-body-sm text-on-surface-variant">{c.note}</p>
                  </div>
                </div>
              ))}
            </Card>

            {/* Guild node */}
            <Card tone="low" className="gap-2 rise">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-primary" />
                <p className="font-label-md text-label-md text-on-surface font-semibold">
                  Guild Node #04 · 12 verified electricians nearby
                </p>
              </div>
              <div className="flex items-center gap-2 text-on-secondary-container">
                <IndianRupee size={16} />
                <p className="font-label-md text-label-md font-bold">₹199 guild rate · Zero Surge guarantee</p>
              </div>
              <div className="flex items-center gap-2 text-on-surface-variant">
                <BadgeCheck size={16} className="text-secondary" />
                <p className="text-body-sm text-body-sm">
                  Transparent co-op matching — ranking factors are public to every member.
                </p>
              </div>
            </Card>

            {/* Dispatch protocol */}
            <Card className="gap-3 rise">
              <p className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-1.5">
                <Wrench size={17} className="text-primary" /> Dispatch protocol
              </p>
              {PROTOCOL.map((p, i) => (
                <div key={p.title} className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-secondary text-on-secondary font-label-sm text-label-sm font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-label-md text-label-md text-on-surface font-semibold">{p.title}</p>
                    <p className="text-body-sm text-body-sm text-on-surface-variant">{p.note}</p>
                  </div>
                </div>
              ))}
            </Card>

            {/* CTAs */}
            <div className="flex flex-col gap-2 pt-1 rise">
              <PillButton onClick={() => navigate('/app/matches')}>
                Show best matches <CheckCircle2 size={17} />
              </PillButton>
              <PillButton variant="surface" onClick={() => navigate('/app/request')}>
                Edit request or add photos
              </PillButton>
            </div>
          </>
        )}
      </div>
    </AppShell>
  )
}
