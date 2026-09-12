import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ChevronRight,
  Flame,
  IdCard,
  MapPin,
  Search,
  TrendingUp,
  Zap,
} from 'lucide-react'
import AppShell from '../../components/AppShell'
import { Card, Chip, MatchScore, PillButton, SectionHeader, SkillLevelBar, useToast } from '../../components/ui'
import { DemandHeatMap } from '../../components/MapPreview'
import { workerJobs, workerStats } from '../../data/mock'

export default function WorkerHome() {
  const navigate = useNavigate()
  const toast = useToast()
  const [available, setAvailable] = useState(true)
  const top = workerJobs[0]

  return (
    <AppShell mode="worker" title="Worker Home">
      <div className="px-4 pt-3 pb-8 flex flex-col gap-5">
        {/* Greeting */}
        <div>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface tracking-tight">
            Good morning, Ravi 👋
          </h1>
          <p className="text-body-sm text-body-sm text-on-surface-variant mt-1 flex items-center gap-1.5">
            <MapPin size={14} className="text-primary" /> Indiranagar Guild Node #04 · Co-op Equity 4.2%
          </p>
        </div>

        {/* Availability */}
        <Card className="gap-3">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="font-headline-sm text-headline-sm text-on-surface">Available for work</p>
              <p className="text-body-sm text-body-sm text-on-surface-variant">
                {available ? 'Accepting instant dispatch' : 'Paused — no new dispatches'}
              </p>
            </div>
            {/* Toggle */}
            <button
              role="switch"
              aria-checked={available}
              aria-label="Toggle availability"
              onClick={() => {
                setAvailable((a) => !a)
                toast(available ? 'Instant dispatch paused' : 'You are live — instant dispatch ON', available ? 'primary' : 'secondary')
              }}
              className={`relative w-14 h-8 rounded-full shrink-0 transition-colors tap ${
                available ? 'bg-secondary' : 'bg-surface-container-high'
              }`}
            >
              <span
                className={`absolute top-1 w-6 h-6 rounded-full bg-surface-container-lowest shadow-e1 transition-all ${
                  available ? 'left-7' : 'left-1'
                }`}
              />
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <Chip tone={available ? 'secondary' : 'surface'} pulse={available}>
              Auto-Dispatch {available ? 'ON' : 'OFF'}
            </Chip>
            <Chip tone="surface">Max range 5 km</Chip>
            <Chip tone="surface">Shift 8AM–6PM · 3.5 hrs left</Chip>
          </div>
        </Card>

        {/* Opportunity */}
        <div className="flex flex-col gap-2">
          <SectionHeader
            icon={Zap}
            title="Opportunities"
            sub="Fair dispatch · zero bidding wars"
            action="View all"
            onAction={() => navigate('/worker/jobs')}
          />
          <Card className="gap-3 border border-secondary/30">
            <div className="flex items-center justify-between">
              <MatchScore value={top.match} />
              <Chip tone="tertiary" pulse>
                New
              </Chip>
            </div>
            <div>
              <p className="font-label-lg text-label-lg text-on-surface font-semibold leading-snug">{top.title}</p>
              <p className="text-body-sm text-body-sm text-on-surface-variant mt-0.5">
                {top.distanceKm} km · ETA {top.etaMin} min · ₹380–₹450
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {top.skills.map((s) => (
                <Chip key={s} tone="secondary">
                  {s}
                </Chip>
              ))}
            </div>
            <div className="flex items-center justify-between text-body-sm text-body-sm text-on-surface-variant">
              <span>90% direct payout</span>
              <span className="text-secondary font-semibold">Auto-refreshes in 42s</span>
            </div>
            <PillButton onClick={() => navigate(`/worker/job/${top.id}`)}>View job details</PillButton>
          </Card>
          <p className="text-body-sm text-body-sm text-on-surface-variant text-center">
            +2 more nearby · Panel Board ₹650 (1.8 km) · Inverter Earthing ₹420 (3.1 km)
          </p>
        </div>

        {/* Performance grid */}
        <div className="grid grid-cols-2 gap-3">
          {workerStats.map((s) => (
            <Card key={s.label} className="gap-1">
              <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">{s.label}</p>
              <p className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-bold">{s.value}</p>
              <p className="font-label-sm text-label-sm text-secondary font-semibold">{s.delta}</p>
              <p className="text-body-sm text-body-sm text-on-surface-variant">{s.note}</p>
            </Card>
          ))}
        </div>

        {/* Passport link */}
        <Card tone="low" className="gap-2.5" onClick={() => navigate('/worker/passport')}>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-primary-fixed flex items-center justify-center text-on-primary-fixed shrink-0">
              <IdCard size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-label-lg text-label-lg text-on-surface font-semibold">Living Skill Passport™</p>
              <p className="text-body-sm text-body-sm text-on-surface-variant">
                4 skills · 47 verified proofs · 99.2% confidence
              </p>
              <SkillLevelBar level={4} className="mt-2 max-w-[160px]" />
            </div>
            <ChevronRight size={18} className="text-outline shrink-0" />
          </div>
        </Card>

        {/* Demand heat map */}
        <div className="flex flex-col gap-2">
          <SectionHeader icon={Flame} title="Demand near you" sub="Position yourself ahead of surges" />
          <Card className="gap-2.5">
            <DemandHeatMap />
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <p className="font-label-md text-label-md text-on-surface font-bold flex items-center gap-1.5">
                  <Flame size={15} className="text-tertiary" /> Electrical Demand Surge
                </p>
                <Chip tone="tertiary">Peak 6–9 PM</Chip>
              </div>
              <p className="text-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Pre-monsoon capacitor failures are rising. Standby zone: 100ft Road junction — highest expected dispatch
                density tonight.
              </p>
              <p className="text-body-sm text-body-sm text-secondary flex items-center gap-1.5">
                <TrendingUp size={14} /> Fair dispatch — surges never skew rankings, only your position
              </p>
            </div>
          </Card>
        </div>

        <PillButton variant="surface" onClick={() => navigate('/worker/evidence')}>
          <Search size={16} className="text-primary" /> Add evidence · grow your passport
        </PillButton>
      </div>
    </AppShell>
  )
}
