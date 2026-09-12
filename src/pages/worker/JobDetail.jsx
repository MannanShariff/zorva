import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  BadgeCheck,
  CheckCircle2,
  ChevronRight,
  IndianRupee,
  Loader2,
  MapPin,
  Navigation,
  Quote,
  Timer,
  Zap,
} from 'lucide-react'
import AppShell, { PageHeader } from '../../components/AppShell'
import { Avatar, Card, Chip, Countdown, MatchScore, Modal, PillButton, ProgressBar } from '../../components/ui'
import { RoutePreview } from '../../components/MapPreview'
import { job, ravi, workerJobs } from '../../data/mock'

const WHY_CHOSEN = [
  'Required skills verified on your passport',
  'Optimal corridor — 2.4 km via 100ft Rd',
  'Instant dispatch status active',
  'Workload equity: 28 / 35 hrs — fair window',
]

export default function JobDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const j = workerJobs.find((x) => x.id === id) || workerJobs[0]
  const [stage, setStage] = useState('offer') // offer → accepted → enroute → done
  const [modal, setModal] = useState(false)
  const [accepting, setAccepting] = useState(false)

  const accept = () => {
    setAccepting(true)
    setTimeout(() => {
      setAccepting(false)
      setModal(true)
    }, 900)
  }

  return (
    <AppShell mode="worker" title="Job Details">
      <PageHeader
        title={stage === 'offer' ? 'New service opportunity' : stage === 'done' ? 'Work complete 🎉' : 'Active job'}
        sub={`Indiranagar Co-op Node #04 · #${j.id}`}
        chips={
          stage === 'offer' ? (
            <Chip tone="tertiary" pulse>
              Instant Dispatch · <Countdown seconds={195} onEnd={() => undefined} />
            </Chip>
          ) : (
            <Chip tone="secondary">Locked to you</Chip>
          )
        }
      />

      <div className="px-4 pb-8 flex flex-col gap-4">
        {/* Earnings banner */}
        <div className="rounded-2xl bg-gradient-to-br from-primary-container to-primary text-on-primary p-4 shadow-e2 flex flex-col gap-2">
          <div className="flex items-end justify-between">
            <div>
              <p className="font-label-sm text-label-sm uppercase tracking-wider opacity-80">You earn (90% direct)</p>
              <p className="font-headline-xl-mobile text-headline-xl-mobile font-bold">₹420</p>
            </div>
            <div className="text-right text-body-sm text-body-sm opacity-90">
              <p>₹380 base + stator servicing</p>
              <p>Zero platform fee · instant wallet settlement</p>
            </div>
          </div>
        </div>

        {/* Customer card */}
        <Card className="gap-2.5">
          <div className="flex items-center gap-3">
            <Avatar name={job.customerName} size="md" />
            <div className="flex-1 min-w-0">
              <p className="font-label-lg text-label-lg text-on-surface font-semibold">{job.customerName}</p>
              <p className="text-body-sm text-body-sm text-on-surface-variant">
                {job.address} · {j.distanceKm} km away
              </p>
            </div>
            <Chip tone="secondary">Verified</Chip>
          </div>
          <div className="p-3 rounded-xl bg-surface-container-low flex items-start gap-2">
            <Quote size={15} className="text-primary shrink-0 mt-0.5" />
            <p className="text-body-md text-body-md text-on-surface italic">“{j.problem}”</p>
          </div>
          <div className="p-3 rounded-xl bg-primary-fixed/50 flex items-start gap-2">
            <Zap size={15} className="text-primary shrink-0 mt-0.5" />
            <div>
              <p className="font-label-sm text-label-sm text-primary uppercase tracking-wider font-bold">
                AI Preliminary Diagnosis
              </p>
              <p className="text-body-sm text-body-sm text-on-surface">{job.diagnosis}</p>
            </div>
          </div>
        </Card>

        {/* Specs */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { k: 'Job type', v: 'Ceiling Fan · Electrical' },
            { k: 'Skill match', v: `${j.match}% Skill DNA` },
            { k: 'Travel', v: `${j.etaMin} min optimal corridor` },
            { k: 'On site', v: '~60 min estimated' },
          ].map(({ k, v }) => (
            <Card key={k} className="gap-1">
              <p className="font-label-sm text-label-sm text-on-surface-variant">{k}</p>
              <p className="font-label-md text-label-md text-on-surface font-semibold">{v}</p>
            </Card>
          ))}
        </div>

        {/* Passport qualification */}
        <Card className="gap-2.5">
          <div className="flex items-center justify-between">
            <p className="font-headline-sm text-headline-sm text-on-surface">Passport qualification</p>
            <span className="font-label-md text-label-md text-secondary font-bold">100%</span>
          </div>
          <ProgressBar value={100} tone="secondary" />
          {['Electrical Diagnosis — L4 (stator windings)', 'Appliance Repair — L3 (motor rewinding)'].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <BadgeCheck size={15} className="text-secondary shrink-0" />
              <span className="text-body-sm text-body-sm text-on-surface">{s}</span>
            </div>
          ))}
        </Card>

        {/* Route */}
        <Card className="gap-2.5">
          <div className="flex items-center justify-between">
            <p className="font-headline-sm text-headline-sm text-on-surface">Route to customer</p>
            <button
              onClick={() => navigate('/app/tracking')}
              className="inline-flex items-center gap-1 px-3 min-h-[36px] rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-semibold tap"
            >
              <Navigation size={13} /> Navigate
            </button>
          </div>
          <RoutePreview />
          <p className="text-body-sm text-body-sm text-on-surface-variant flex items-center gap-1.5">
            <MapPin size={13} /> {j.distanceKm} km · {j.etaMin} min trip · 100ft Rd corridor
          </p>
        </Card>

        {/* Why chosen */}
        <Card className="gap-2.5">
          <p className="font-headline-sm text-headline-sm text-on-surface">Why you were chosen</p>
          {WHY_CHOSEN.map((w) => (
            <div key={w} className="flex items-center gap-2">
              <CheckCircle2 size={15} className="text-secondary shrink-0" />
              <span className="text-body-sm text-body-sm text-on-surface">{w}</span>
            </div>
          ))}
          <p className="text-body-sm text-body-sm text-on-surface-variant">
            The same transparent formula every guild member sees — Skill Evidence 35% · Location 25% · Availability 20%
            · Reliability 10% · Fairness 10%.
          </p>
        </Card>

        {/* Stage-specific CTAs */}
        {stage === 'offer' && (
          <div className="grid grid-cols-2 gap-2 sticky bottom-0 bg-surface/95 backdrop-blur-xl p-3 -mx-3 border-t border-surface-container">
            <PillButton variant="outline" onClick={() => navigate('/worker/jobs')}>
              Decline · No penalty
            </PillButton>
            <PillButton onClick={accept} disabled={accepting}>
              {accepting ? (
                <>
                  <Loader2 size={17} className="animate-spin" /> Locking…
                </>
              ) : (
                'Accept Job'
              )}
            </PillButton>
          </div>
        )}

        {stage === 'accepted' && (
          <div className="rise flex flex-col gap-2">
            <PillButton onClick={() => setStage('enroute')}>
              <Navigation size={17} /> Start navigation to {job.customerName.split(' ')[0]}
            </PillButton>
            <p className="text-label-sm text-label-sm text-on-surface-variant text-center">
              ₹420 secured in escrow · customer OTP will unlock the job
            </p>
          </div>
        )}

        {stage === 'enroute' && (
          <div className="rise flex flex-col gap-2">
            <Card tone="low" className="gap-2">
              <div className="flex items-center justify-between">
                <p className="font-label-md text-label-md text-on-surface font-semibold">Job progress</p>
                <Chip tone="tertiary" pulse>
                  En route
                </Chip>
              </div>
              <ProgressBar value={55} />
              <p className="text-body-sm text-body-sm text-on-surface-variant">
                Navigating via 100ft Rd · light traffic · arrive in ~18 min
              </p>
            </Card>
            <PillButton onClick={() => setStage('done')}>Arrived · Mark work complete</PillButton>
          </div>
        )}

        {stage === 'done' && (
          <div className="rise flex flex-col gap-2">
            <Card className="items-center text-center gap-2 py-6">
              <div className="w-14 h-14 rounded-full bg-secondary-container flex items-center justify-center">
                <CheckCircle2 size={26} className="text-on-secondary-container" />
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">₹378 credited to your wallet</h3>
              <p className="text-body-sm text-body-sm text-on-surface-variant max-w-[280px]">
                Now capture evidence to turn this job into a permanent skill proof on your Living Skill Passport™.
              </p>
            </Card>
            <PillButton onClick={() => navigate('/worker/evidence')}>
              Capture work evidence <ChevronRight size={17} />
            </PillButton>
          </div>
        )}
      </div>

      {/* Accept modal */}
      <Modal open={modal} onClose={() => setModal(false)} title="Job Locked to You! 🔒">
        <div className="flex flex-col gap-3 items-center text-center">
          <div className="w-16 h-16 rounded-full bg-secondary-container flex items-center justify-center">
            <IndianRupee size={26} className="text-on-secondary-container" />
          </div>
          <p className="text-body-md text-body-md text-on-surface-variant">
            ₹420 secured in guild escrow. Customer {job.customerName} is notified and tracking you live.
          </p>
          <PillButton
            onClick={() => {
              setModal(false)
              setStage('accepted')
            }}
          >
            <Timer size={17} /> Start job
          </PillButton>
        </div>
      </Modal>
    </AppShell>
  )
}
