import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle2, LifeBuoy, Lock, MessageSquare, Phone, Share2, ShieldCheck } from 'lucide-react'
import AppShell, { PageHeader } from '../../components/AppShell'
import { Avatar, Card, Chip, Countdown, MatchScore, PillButton, VerificationBadge } from '../../components/ui'
import { TrackingMap } from '../../components/MapPreview'
import { StatusTimeline } from '../../components/cards'
import { job, ravi, timeline } from '../../data/mock'

export default function Tracking() {
  const navigate = useNavigate()
  const [progress, setProgress] = useState(0.15)
  const [arrived, setArrived] = useState(false)

  useEffect(() => {
    const t = setInterval(() => {
      setProgress((p) => (p >= 0.95 ? 0.95 : p + 0.05))
    }, 3000)
    return () => clearInterval(t)
  }, [])

  return (
    <AppShell mode="customer" title="Live Tracking">
      <PageHeader
        title={arrived ? 'Ravi is at your door' : 'Ravi is on the way'}
        sub={`${job.title} · #${job.id}`}
        chips={
          <Chip tone="tertiary" pulse>
            ETA <Countdown seconds={299} onEnd={() => setArrived(true)} />
          </Chip>
        }
      />

      <div className="px-4 pb-8 flex flex-col gap-4">
        <TrackingMap progress={progress} />

        {/* Worker card */}
        <Card className="gap-3">
          <div className="flex items-start gap-3">
            <Avatar name={ravi.name} size="lg" verified />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h2 className="font-headline-sm text-headline-sm text-on-surface truncate">{ravi.name}</h2>
                <MatchScore value={ravi.match} size="sm" />
              </div>
              <p className="text-body-sm text-body-sm text-on-surface-variant">
                {ravi.levelLabel} · ★ {ravi.rating} ({ravi.reviews} co-op jobs)
              </p>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                <VerificationBadge>Zero Callbacks</VerificationBadge>
                <Chip tone="surface">{ravi.guild}</Chip>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { icon: Phone, label: 'Call' },
              { icon: MessageSquare, label: 'Message' },
              { icon: Share2, label: 'Share' },
            ].map(({ icon: Icon, label }) => (
              <button
                key={label}
                className="min-h-[44px] rounded-full bg-surface-container-low flex items-center justify-center gap-1.5 font-label-md text-label-md text-on-surface tap"
              >
                <Icon size={15} className="text-primary" /> {label}
              </button>
            ))}
          </div>
          <p className="text-body-sm text-body-sm text-on-surface-variant text-center">
            90% Direct Pay · ₹179 goes straight to {ravi.name.split(' ')[0]}'s co-op wallet
          </p>
        </Card>

        {/* OTP */}
        <div className="rounded-2xl bg-primary text-on-primary p-4 shadow-e2 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-full bg-on-primary/15 flex items-center justify-center shrink-0">
              <Lock size={18} />
            </div>
            <div className="min-w-0">
              <p className="font-label-sm text-label-sm uppercase tracking-wider opacity-80">Start Verification OTP</p>
              <p className="font-headline-sm text-headline-sm font-bold tracking-[0.3em]">{job.otp}</p>
            </div>
          </div>
          <p className="text-body-sm text-body-sm opacity-80 text-right leading-tight shrink-0 max-w-[110px]">
            Share only when the technician reaches your door
          </p>
        </div>

        {/* Progress timeline */}
        <Card className="gap-2">
          <p className="font-headline-sm text-headline-sm text-on-surface">Service progress</p>
          <StatusTimeline
            steps={timeline.map((s, i) => ({
              ...s,
              active: arrived ? false : i === 2 ? true : false,
              done: arrived ? i <= 2 : s.done,
            }))}
          />
        </Card>

        {/* Guarantee */}
        <div className="p-3.5 rounded-2xl bg-secondary-container/60 text-on-secondary-container flex items-start gap-2.5">
          <ShieldCheck size={20} className="shrink-0 mt-0.5" />
          <div>
            <p className="font-label-md text-label-md font-bold">Guild Trust & Fair Price Guarantee</p>
            <p className="text-body-sm text-body-sm leading-snug">
              Fixed tariff locked before extra work approval · 30-day no-quibble rework warranty · insurance covered.
            </p>
          </div>
        </div>

        {/* Help */}
        <Card tone="low" className="gap-1.5" onClick={() => navigate('/app/messages')}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary shadow-e1 shrink-0">
              <LifeBuoy size={18} />
            </div>
            <div className="min-w-0">
              <p className="font-label-lg text-label-lg text-on-surface font-semibold">Need help?</p>
              <p className="text-body-sm text-body-sm text-on-surface-variant">24/7 co-op dispatchers · avg reply 40s</p>
            </div>
          </div>
        </Card>

        <PillButton variant={arrived ? 'primary' : 'surface'} onClick={() => setArrived(true)} disabled={arrived}>
          {arrived ? 'Technician has arrived' : 'Simulate technician arrival'}
        </PillButton>
        {arrived && (
          <div className="rise flex flex-col gap-2">
            <PillButton onClick={() => navigate('/app/payment')}>
              Work complete · Verify OTP & Pay <CheckCircle2 size={17} />
            </PillButton>
            <p className="text-label-sm text-label-sm text-on-surface-variant text-center">
              OTP {job.otp} verified · 30-day warranty activated
            </p>
          </div>
        )}
      </div>
    </AppShell>
  )
}
