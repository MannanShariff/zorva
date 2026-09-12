import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Loader2,
  MessageSquare,
  CalendarClock,
  ShieldCheck,
  Zap,
} from 'lucide-react'
import AppShell, { PageHeader } from '../../components/AppShell'
import { Avatar, Card, Chip, PillButton, StarRating, useToast } from '../../components/ui'
import { job, ravi } from '../../data/mock'

const CRITERIA = [
  { icon: Zap, title: 'Skill Quality', sub: 'Diagnosis accuracy & clean wire finish', opts: ['Adequate', 'Proficient', 'Exceptional'], def: 2 },
  { icon: MessageSquare, title: 'Communication', sub: 'Explained capacitor issue & tariff beforehand', opts: ['Vague', 'Polite', 'Crystal Clear'], def: 2 },
  { icon: CalendarClock, title: 'Timeliness', sub: 'Arrived within estimated 18 min corridor', opts: ['Delayed', 'Acceptable', 'Punctual'], def: 2 },
  { icon: ShieldCheck, title: 'Professionalism', sub: 'Verified OTP, clean workspace & toolbag protocol', opts: ['Average', 'Safe', 'Exemplary'], def: 2 },
]

const COMPLIMENTS = ['⚡ Fast diagnosis', '✨ Spotless cleanup', '🗣️ Clear explanation', '🔧 Expert tools']

export default function Feedback() {
  const navigate = useNavigate()
  const toast = useToast()
  const [rating, setRating] = useState(5)
  const [scores, setScores] = useState(CRITERIA.map((c) => c.def))
  const [completed, setCompleted] = useState('yes')
  const [tags, setTags] = useState([])
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  const submit = () => {
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setDone(true)
      toast('Recorded in Guild Registry', 'secondary')
    }, 1200)
  }

  return (
    <AppShell mode="customer" title="Feedback">
      <PageHeader
        title={done ? 'Feedback recorded 🎉' : 'How was your service?'}
        sub={`${job.title} · #${job.id}`}
        chips={<Chip tone="secondary">Post-Service Verification</Chip>}
      />

      <div className="px-4 pb-8 flex flex-col gap-4">
        {/* Worker + overall rating */}
        <Card className="gap-3 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-36 h-36 rounded-full bg-secondary-container/40 blur-2xl pointer-events-none" />
          <div className="relative flex items-start gap-3">
            <Avatar name={ravi.name} size="lg" verified />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h2 className="font-headline-sm text-headline-sm text-on-surface">{ravi.name}</h2>
                <Chip tone="secondary">{ravi.levelLabel}</Chip>
              </div>
              <p className="text-body-sm text-body-sm text-on-surface-variant mt-0.5">
                Indiranagar Node #04 · 99.2% Guild Reliability
              </p>
            </div>
          </div>
          <div className="relative bg-surface-container-low/70 rounded-xl p-3">
            <p className="text-body-md text-body-md text-on-surface font-medium">
              Thank you for supporting cooperative gig work! How did {ravi.name.split(' ')[0]} do today?
            </p>
            <div className="mt-3 flex items-center justify-between gap-2 flex-wrap">
              <StarRating value={rating} onChange={setRating} />
              <span className="px-2.5 py-1 rounded-full bg-surface-container-lowest shadow-e1 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-secondary" />
                <span className="font-label-md text-label-md text-on-surface font-semibold">
                  {['', 'Needs Attention (1.0)', 'Fair (2.0)', 'Good (3.0)', 'Very Good (4.0)', 'Excellent (5.0)'][rating]}
                </span>
              </span>
            </div>
          </div>
        </Card>

        {!done ? (
          <>
            {/* Structured audit */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <p className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-1.5">
                  <CheckCircle2 size={17} className="text-primary" /> Skill & Experience Audit
                </p>
                <span className="font-label-sm text-label-sm text-on-surface-variant">Peer Validation</span>
              </div>
              {CRITERIA.map((c, ci) => (
                <Card key={c.title} className="gap-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <c.icon size={16} className="text-primary" />
                        <p className="font-label-lg text-label-lg text-on-surface font-semibold">{c.title}</p>
                      </div>
                      <p className="text-body-sm text-body-sm text-on-surface-variant">{c.sub}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 pt-1">
                    {c.opts.map((opt, oi) => (
                      <button
                        key={opt}
                        onClick={() => setScores((s) => s.map((v, i) => (i === ci ? oi : v)))}
                        className={`flex-1 py-1.5 min-h-[36px] rounded-lg font-label-sm text-label-sm tap ${
                          scores[ci] === oi ? 'bg-primary text-on-primary shadow-e1' : 'bg-surface-container-low text-on-surface'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </Card>
              ))}
            </div>

            {/* Completion toggle */}
            <Card className="gap-3">
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">
                  Did the worker complete the requested work?
                </h3>
                <p className="text-body-sm text-body-sm text-on-surface-variant mt-0.5">
                  Covered under ZORVA 30-Day Guild Warranty.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setCompleted('yes')}
                  className={`p-3 rounded-xl flex flex-col items-center justify-center gap-1 tap ${
                    completed === 'yes'
                      ? 'bg-primary-fixed/60 text-on-primary-fixed shadow-e1'
                      : 'bg-surface-container-low text-on-surface-variant'
                  }`}
                >
                  <span className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center">
                    <CheckCircle2 size={18} />
                  </span>
                  <span className="font-label-lg text-label-lg font-bold">Yes, fully solved</span>
                  <span className="font-label-sm text-label-sm">Ready for sign-off</span>
                </button>
                <button
                  onClick={() => setCompleted('no')}
                  className={`p-3 rounded-xl flex flex-col items-center justify-center gap-1 tap ${
                    completed === 'no'
                      ? 'bg-tertiary-fixed/70 text-on-tertiary-fixed shadow-e1'
                      : 'bg-surface-container-low text-on-surface-variant'
                  }`}
                >
                  <span className="w-8 h-8 rounded-full bg-surface-dim text-on-surface flex items-center justify-center">
                    <ShieldCheck size={18} />
                  </span>
                  <span className="font-label-lg text-label-lg font-semibold">Needs follow-up</span>
                  <span className="font-label-sm text-label-sm">Rework warranty</span>
                </button>
              </div>
            </Card>

            {/* Comment + compliments */}
            <Card className="gap-3">
              <div className="flex items-center justify-between">
                <label className="font-headline-sm text-headline-sm text-on-surface" htmlFor="review-comment">
                  Add a comment (optional)
                </label>
                <span className="font-label-sm text-label-sm text-on-surface-variant">Guild visible</span>
              </div>
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
                {COMPLIMENTS.map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      const has = tags.includes(c)
                      setTags(has ? tags.filter((x) => x !== c) : [...tags, c])
                      setComment((cm) =>
                        has ? cm.replace(` • ${c}`, '').replace(c, '') : cm ? `${cm} • ${c}` : c,
                      )
                    }}
                    className={`shrink-0 px-2.5 py-1.5 rounded-full font-label-sm text-label-sm tap ${
                      tags.includes(c) ? 'bg-secondary-container text-on-secondary-container' : 'bg-surface-container-low text-on-surface'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <textarea
                id="review-comment"
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="e.g. Ravi was very polite, quickly diagnosed the fan capacitor, and left the room spotless…"
                className="w-full rounded-xl bg-surface-container-low p-3 text-body-md text-body-md text-on-surface outline-none focus:ring-2 focus:ring-primary/40 placeholder:text-outline resize-none"
              />
            </Card>

            {/* Passport note */}
            <div className="bg-surface-container-high/60 rounded-2xl p-4 shadow-e1 flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center shrink-0">
                <BadgeCheck size={20} />
              </div>
              <div className="min-w-0">
                <p className="font-label-lg text-label-lg text-on-surface font-semibold leading-tight">
                  Your feedback feeds the Living Skill Passport™
                </p>
                <p className="text-body-sm text-body-sm text-on-surface-variant mt-1">
                  Verified reviews directly boost {ravi.name.split(' ')[0]}'s guild standing and fair dispatch priority
                  — with 0% corporate bias.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <PillButton variant="container" onClick={submit} disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader2 size={17} className="animate-spin" /> Registering on Passport…
                  </>
                ) : (
                  <>
                    Submit feedback <ArrowRight size={17} />
                  </>
                )}
              </PillButton>
              <button
                onClick={() => navigate('/app/home')}
                className="min-h-[44px] text-center text-on-surface-variant font-label-md text-label-md tap"
              >
                I'll do this later
              </button>
            </div>
          </>
        ) : (
          /* Success state */
          <Card className="rise items-center text-center gap-3 py-8">
            <div className="w-16 h-16 rounded-full bg-secondary-container flex items-center justify-center">
              <CheckCircle2 size={30} className="text-on-secondary-container" />
            </div>
            <div>
              <h3 className="font-headline-md text-headline-md text-on-surface">Recorded in Guild Registry</h3>
              <p className="text-body-md text-body-md text-on-surface-variant mt-1 max-w-[280px]">
                {ravi.name.split(' ')[0]}'s Living Skill Passport™ just improved — verified outcome #{ravi.workProofs + 1}{' '}
                logged on the guild ledger.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-1.5">
              <Chip tone="secondary">Confidence +0.3%</Chip>
              <Chip tone="surface">Fair dispatch priority ↑</Chip>
              <Chip tone="primary">30-Day Warranty</Chip>
            </div>
            <div className="w-full flex flex-col gap-2 pt-2">
              <PillButton onClick={() => navigate('/app/home')}>Back to Home</PillButton>
              <PillButton variant="surface" onClick={() => navigate('/worker/passport-updated')}>
                See how Ravi's passport grew →
              </PillButton>
            </div>
          </Card>
        )}
      </div>
    </AppShell>
  )
}
