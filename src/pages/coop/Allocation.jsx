import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  CheckCircle2,
  Lock,
  RefreshCw,
  Scale,
  SlidersHorizontal,
  Sparkles,
  TriangleAlert,
} from 'lucide-react'
import AppShell, { PageHeader } from '../../components/AppShell'
import { Avatar, Card, Chip, PillButton } from '../../components/ui'
import { CorridorMap } from '../../components/MapPreview'
import { allocations } from '../../data/mock'

const PRINCIPLES = [
  { t: 'Required skills & credentials', n: 'Exact verified living skill passport & hardware tier matching.' },
  { t: 'Worker availability & autonomy', n: 'Respecting opted-in shifts and active guild presence schedules.' },
  { t: 'Location & hyper-proximity', n: 'Hyperlocal corridor clustering strictly contained within 4.5 km.' },
  { t: 'Travel constraints & traffic bypass', n: 'Low-traffic arterial routes avoiding congested peak junctions.' },
  { t: 'Workload parity & fair earnings', n: 'Equitable earnings distribution with zero algorithmic favoritism.' },
]

export default function CoopAllocation() {
  const navigate = useNavigate()
  const [applying, setApplying] = useState(false)
  const [applied, setApplied] = useState(false)

  const apply = () => {
    setApplying(true)
    setTimeout(() => {
      setApplying(false)
      setApplied(true)
    }, 1100)
  }

  return (
    <AppShell mode="coop" title="Workforce Allocation">
      <PageHeader
        title="Optimized workforce allocation"
        sub="Cooperative Dispatch Hub · Algorithmic Parity Simulation"
        chips={
          <>
            <Chip tone="secondary" pulse>
              AI Optimized · Consensus #104
            </Chip>
          </>
        }
      />

      <div className="px-4 pb-8 flex flex-col gap-4">
        {/* Hero banner */}
        <Card className="gap-2.5">
          <div className="flex items-center gap-3.5">
            <Avatar name="Rajesh K." size="xl" verified />
            <div className="min-w-0 flex-1">
              <p className="font-headline-sm text-headline-sm text-on-surface truncate flex items-center gap-1.5">
                Rajesh K. & 3 Peers <CheckCircle2 size={16} className="text-secondary" />
              </p>
              <p className="text-body-sm text-body-sm text-on-surface-variant truncate">
                South Bengaluru Electricians Guild
              </p>
              <div className="flex items-center gap-2 mt-1.5">
                <Chip tone="primary">Co-op Stakeholders</Chip>
                <span className="font-label-sm text-label-sm text-secondary font-semibold">100% Ready</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Before / After */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between px-0.5">
            <h2 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2">
              <SlidersHorizontal size={18} className="text-primary" /> Dispatch Efficiency Impact
            </h2>
            <Chip tone="surface">Shift 09:00–18:00</Chip>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {/* Baseline */}
            <div className="flex flex-col rounded-2xl bg-surface-container-low p-3.5 justify-between gap-3">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm uppercase tracking-wide text-on-surface-variant">
                    Baseline
                  </span>
                  <Chip tone="surface">Legacy</Chip>
                </div>
                <p className="font-headline-sm text-headline-sm text-on-surface mt-1">Current</p>
              </div>
              <div className="flex flex-col gap-2.5">
                <div>
                  <span className="text-body-sm text-body-sm text-on-surface-variant">Travel distance</span>
                  <p className="font-headline-sm text-headline-sm text-on-surface">
                    182 <span className="font-label-sm text-label-sm text-on-surface-variant font-normal">km total</span>
                  </p>
                </div>
                <div>
                  <span className="text-body-sm text-body-sm text-on-surface-variant">Idle / transit</span>
                  <p className="font-headline-sm text-headline-sm text-on-surface">
                    4.8 <span className="font-label-sm text-label-sm text-on-surface-variant font-normal">hrs lost</span>
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-surface-variant text-on-surface-variant font-label-sm text-label-sm">
                  <TriangleAlert size={13} className="text-tertiary" /> Skewed load
                </span>
              </div>
            </div>
            {/* Optimized */}
            <div className="relative flex flex-col rounded-2xl bg-surface-container-lowest shadow-e2 p-3.5 justify-between gap-3 overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-primary-fixed/40 to-transparent rounded-tr-2xl pointer-events-none" />
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm uppercase tracking-wide text-primary font-semibold">
                    Consensus
                  </span>
                  <Chip tone="secondary">−31.8%</Chip>
                </div>
                <p className="font-headline-sm text-headline-sm text-primary mt-1">ZORVA AI</p>
              </div>
              <div className="flex flex-col gap-2.5">
                <div>
                  <span className="text-body-sm text-body-sm text-on-surface-variant">Travel distance</span>
                  <p className="font-headline-sm text-headline-sm text-secondary">
                    124 <span className="font-label-sm text-label-sm text-secondary font-medium">(−58 km)</span>
                  </p>
                </div>
                <div>
                  <span className="text-body-sm text-body-sm text-on-surface-variant">Idle / transit</span>
                  <p className="font-headline-sm text-headline-sm text-on-surface">
                    2.9 <span className="font-label-sm text-label-sm text-secondary font-medium">(−1.9 hrs)</span>
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">
                  <CheckCircle2 size={13} /> Equitable Parity
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-surface-container-high text-on-surface">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary shrink-0 shadow-e1">
              <Scale size={18} />
            </div>
            <div className="min-w-0">
              <p className="font-label-lg text-label-lg text-on-surface tracking-tight truncate">
                ₹1,420 Collective Fuel Saved
              </p>
              <p className="text-body-sm text-body-sm text-on-surface-variant">
                Cuts transit fatigue index by 38% across guild members
              </p>
            </div>
          </div>
        </section>

        {/* Corridor matrix */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between px-0.5">
            <h2 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2">
              <Sparkles size={18} className="text-primary" /> Bengaluru Corridor Matrix
            </h2>
            <span className="font-label-sm text-label-sm text-primary font-semibold">3 Allocations</span>
          </div>
          <CorridorMap />
          {allocations.map((a) => (
            <Card key={a.worker} className="gap-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <Avatar name={a.worker} size="md" color={a.tone === 'secondary' ? '#006c4a' : '#484455'} />
                  <div className="min-w-0">
                    <p className="font-headline-sm text-headline-sm text-on-surface truncate flex items-center gap-1.5">
                      {a.worker}
                      <Chip tone={a.tone === 'secondary' ? 'secondary' : 'surface'}>L{a.level}</Chip>
                    </p>
                    <p className="text-body-sm text-body-sm text-on-surface-variant truncate">{a.role}</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-label-lg text-label-lg text-primary">{a.distance}</span>
                  <p className="text-body-sm text-body-sm text-on-surface-variant">{a.eta} away</p>
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-surface-container-low flex flex-col gap-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-label-md text-label-md text-on-surface font-semibold truncate">{a.jobLabel}</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant shrink-0">{a.place}</span>
                </div>
                <p className="text-body-sm text-body-sm text-on-surface-variant flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-secondary shrink-0" />
                  <span className="truncate">{a.note}</span>
                </p>
              </div>
            </Card>
          ))}
        </section>

        {/* Principles */}
        <div className="flex flex-col gap-3 rounded-2xl bg-surface-container p-4">
          <h2 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2">
            <Lock size={18} className="text-primary" /> Allocation considers
          </h2>
          {PRINCIPLES.map((p) => (
            <div key={p.t} className="flex items-start gap-2.5">
              <CheckCircle2 size={17} className="text-secondary shrink-0 mt-0.5" />
              <div>
                <p className="font-label-md text-label-md text-on-surface font-semibold">{p.t}</p>
                <p className="text-body-sm text-body-sm text-on-surface-variant">{p.n}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Autonomy banner */}
        <div className="flex flex-col gap-2 p-3.5 rounded-2xl bg-surface-container-low text-on-surface-variant">
          <p className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-semibold flex items-center gap-1.5">
            <Lock size={13} /> Guild Member Autonomy Protected
          </p>
          <p className="text-body-sm text-body-sm">
            Workers retain 100% unilateral authority to accept, decline, or swap runs — without systemic scoring
            penalties or account suspensions.
          </p>
          <div className="flex items-center justify-between font-label-sm text-label-sm text-outline pt-1">
            <span>ZORVA Node #04 · South Bengaluru</span>
            <span>Consensus Hash: #9A24E</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2">
          <PillButton variant={applied ? 'secondary' : 'primary'} onClick={apply} disabled={applying || applied}>
            {applying ? (
              <>
                <RefreshCw size={17} className="animate-spin" /> Dispatching 3 workers…
              </>
            ) : applied ? (
              <>
                <CheckCircle2 size={18} /> Allocation Confirmed & Dispatched
              </>
            ) : (
              <>
                Apply allocation <ArrowRight size={17} />
              </>
            )}
          </PillButton>
          <PillButton variant="ghost" onClick={() => navigate('/coop')}>
            <SlidersHorizontal size={16} /> Adjust parameters or re-run
          </PillButton>
        </div>
      </div>
    </AppShell>
  )
}
