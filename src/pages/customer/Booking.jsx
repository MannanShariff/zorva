import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { CheckCircle2, Clock, IndianRupee, Loader2, MapPin, ShieldCheck } from 'lucide-react'
import AppShell, { PageHeader } from '../../components/AppShell'
import { Avatar, Card, Chip, PillButton, VerificationBadge } from '../../components/ui'
import { job, ravi } from '../../data/mock'

export default function Booking() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const worker = state?.worker || ravi
  const score = state?.score || ravi.match
  const [confirming, setConfirming] = useState(false)

  const confirm = () => {
    setConfirming(true)
    setTimeout(() => navigate('/app/tracking'), 1500)
  }

  return (
    <AppShell mode="customer" title="Confirm Booking">
      <PageHeader
        title="Confirm your booking"
        sub={`${job.title} · ${job.id}`}
        chips={<Chip tone="secondary">{score}% skill match</Chip>}
      />

      <div className="px-4 pb-8 flex flex-col gap-4">
        {/* Worker */}
        <Card className="gap-3">
          <div className="flex items-center gap-3">
            <Avatar name={worker.name} size="lg" verified />
            <div className="min-w-0 flex-1">
              <h2 className="font-headline-sm text-headline-sm text-on-surface truncate">{worker.name}</h2>
              <p className="text-body-sm text-body-sm text-on-surface-variant">
                {worker.levelLabel || ravi.levelLabel} · {ravi.guild}
              </p>
              <div className="mt-1.5">
                <VerificationBadge>Background Verified</VerificationBadge>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { icon: MapPin, k: 'Distance', v: '2.4 km' },
              { icon: Clock, k: 'ETA', v: '24 min' },
              { icon: IndianRupee, k: 'Rate', v: '₹199' },
            ].map(({ icon: Icon, k, v }) => (
              <div key={k} className="p-2.5 rounded-xl bg-surface-container-low text-center">
                <Icon size={15} className="mx-auto text-primary" />
                <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">{k}</p>
                <p className="font-label-md text-label-md text-on-surface font-semibold">{v}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Booking summary */}
        <Card className="gap-2.5">
          <p className="font-headline-sm text-headline-sm text-on-surface">Booking summary</p>
          {[
            ['Service', `${job.title}`],
            ['When', 'Today · within 45 min'],
            ['Where', `${job.address}, Indiranagar`],
            ['Payment', 'After completion · transparent ledger'],
            ['Coverage', '30-day guild warranty included'],
          ].map(([k, v]) => (
            <div key={k} className="flex items-start justify-between gap-3">
              <span className="text-body-sm text-body-sm text-on-surface-variant shrink-0">{k}</span>
              <span className="font-label-md text-label-md text-on-surface font-medium text-right">{v}</span>
            </div>
          ))}
          <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low mt-1">
            <span className="font-label-md text-label-md text-on-surface-variant">Base rate (locked)</span>
            <span className="font-headline-sm text-headline-sm text-primary font-bold">₹199</span>
          </div>
        </Card>

        {/* Trust strip */}
        <div className="p-3.5 rounded-2xl bg-secondary-container/60 text-on-secondary-container flex items-start gap-2.5">
          <ShieldCheck size={20} className="shrink-0 mt-0.5" />
          <p className="text-body-sm text-body-sm leading-relaxed">
            <span className="font-bold">₹199 is held in guild escrow</span> — released only after you verify the work
            with an OTP at your door. Any extra work needs your approval first.
          </p>
        </div>

        <PillButton onClick={confirm} disabled={confirming}>
          {confirming ? (
            <>
              <Loader2 size={18} className="animate-spin" /> Locking job & dispatching…
            </>
          ) : (
            <>
              Confirm & Dispatch <CheckCircle2 size={17} />
            </>
          )}
        </PillButton>
        <p className="text-label-sm text-label-sm text-on-surface-variant text-center">
          You'll receive an OTP when {worker.name.split(' ')[0]} arrives
        </p>
      </div>
    </AppShell>
  )
}
