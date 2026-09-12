import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  Bot,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Flame,
  Gauge,
  Network,
  Radar,
  Route,
  Scale,
  TrendingUp,
  Wrench,
} from 'lucide-react'
import AppShell, { PageHeader } from '../../components/AppShell'
import { Card, Chip, RingMeter, SegmentedControl } from '../../components/ui'
import { ForecastMap } from '../../components/MapPreview'
import { forecast } from '../../data/mock'

const METRICS = [
  { k: 'Active Workers', v: '128', d: '+12', n: '100% guild verified', icon: Wrench, tone: 'bg-primary-fixed text-primary' },
  { k: 'Available Now', v: '84', d: '/128', n: '65.6% dispatch ready', tone: 'bg-secondary-container text-on-secondary-container', ready: true },
  { k: 'Open Requests', v: '36', d: '', n: 'Avg match 1.4 min', icon: Radar, ping: true },
  { k: 'Utilization', v: '82%', d: '', n: 'Fatigue guard active', ring: true },
]

const TRADE_TALLY = [
  { icon: Bot, v: 12, k: 'Electricians', tone: 'bg-primary-fixed text-primary' },
  { icon: Wrench, v: 8, k: 'Plumbers', tone: 'bg-secondary-container text-secondary' },
  { icon: Gauge, v: 5, k: 'Technicians', tone: 'bg-surface-container-high text-on-surface' },
]

const WEIGHTS = [
  { icon: TrendingUp, tone: 'text-primary', pct: '38%', title: 'Predicted Demand', note: 'Calibrated neural spikes via historic monsoon surges.' },
  { icon: Calendar, tone: 'text-secondary', pct: '26%', title: 'Worker Availability', note: 'Scheduled shifts paired with fatigue safety cap.' },
  { icon: Route, tone: 'text-tertiary', pct: '20%', title: 'Travel Constraints', note: 'Low-congestion arterial lines to cut dead mileage.' },
  { icon: Scale, tone: 'text-primary', pct: '16%', title: 'Workload Balance', note: 'Co-op parity logic preventing platform favoritism.' },
]

const MAP_NODES = [
  { x: 265, y: 50, label: 'Whitefield (92%)', color: 'var(--color-tertiary-container)', surge: true },
  { x: 170, y: 70, label: 'Indiranagar (68%)', color: 'var(--color-primary-container)' },
  { x: 110, y: 106, label: 'Koramangala', color: 'var(--color-secondary)' },
  { x: 210, y: 135, label: 'Electronic City (88%)', color: 'var(--color-tertiary-container)', surge: true },
]

export default function CoopIntelligence() {
  const navigate = useNavigate()
  const [range, setRange] = useState('Next 24h')

  return (
    <AppShell mode="coop" title="Cooperative Intelligence">
      <PageHeader
        title="Cooperative Intelligence"
        sub="Algorithmic collective bargaining & balanced demand forecasting"
        chips={
          <>
            <Chip tone="high" pulse>
              Live Telemetry · 2m ago
            </Chip>
            <Chip tone="primary">v2.4 Node</Chip>
          </>
        }
      />

      <div className="px-4 pb-8 flex flex-col gap-5">
        {/* Metrics 2x2 */}
        <div className="grid grid-cols-2 gap-3">
          {METRICS.map((m) => (
            <Card key={m.k} className="gap-2">
              <div className="flex items-center justify-between gap-1">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider truncate">
                  {m.k}
                </span>
                {m.icon ? (
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${m.tone || 'bg-surface-container text-on-surface-variant'}`}>
                    <m.icon size={15} />
                  </span>
                ) : m.ready ? (
                  <Chip tone="secondary">Ready</Chip>
                ) : m.ring ? (
                  <RingMeter value={82} />
                ) : null}
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-headline-xl-mobile text-headline-xl-mobile text-on-surface font-bold">{m.v}</span>
                {m.d && <span className="font-label-sm text-label-sm text-secondary font-semibold">{m.d}</span>}
                {m.ping && <span className="w-2 h-2 rounded-full bg-tertiary animate-ping" />}
              </div>
              <p className="text-body-sm text-body-sm text-on-surface-variant line-clamp-1">{m.n}</p>
            </Card>
          ))}
        </div>

        {/* Demand forecast */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-1.5">
              <TrendingUp size={18} className="text-primary" /> Demand Forecast
            </h2>
            <span className="font-label-sm text-label-sm text-on-surface-variant">Bengaluru SE Corridor</span>
          </div>
          <SegmentedControl options={['Next 24h', 'Weekend', '7-Day Cycle']} value={range} onChange={setRange} />
          <Card className="gap-3">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-label-md text-on-surface font-semibold flex items-center gap-1.5">
                <Flame size={15} className="text-tertiary" /> Anticipated Hub Density
              </span>
              <Chip tone="secondary">94.2% AI Confidence</Chip>
            </div>
            <ForecastMap nodes={MAP_NODES} />
            <div className="flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-tertiary" /> Surge (&gt;85%)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary" /> Balanced (50–80%)
              </span>
            </div>
          </Card>

          {/* Forecast cards */}
          {forecast.map((f) => (
            <Card key={f.area} className="gap-2.5">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="font-headline-sm text-headline-sm text-on-surface font-semibold truncate">
                    {f.area} <span className="font-label-sm text-label-sm text-on-surface-variant font-normal">· {f.sub}</span>
                  </p>
                  <p className="font-label-md text-label-md text-primary font-semibold mt-0.5">{f.trade}</p>
                </div>
                <Chip tone={f.tone === 'tertiary' ? 'tertiary' : 'primary'} className="shrink-0">
                  {f.level}
                </Chip>
              </div>
              <p className="text-body-sm text-body-sm text-on-surface-variant flex items-center gap-1.5">
                <Calendar size={13} /> {f.window}
              </p>
              <p className="text-body-sm text-body-sm text-on-surface">
                <span className="font-semibold">{f.expected}</span> · {f.detail}
              </p>
              <div className="flex items-center justify-between bg-surface-container-low/60 rounded-xl p-2.5">
                <span className="font-label-sm text-label-sm text-error font-bold flex items-center gap-1.5">
                  <span className="w-6 h-6 rounded-full bg-error-container text-on-error-container flex items-center justify-center">
                    <span className="text-label-sm">−</span>
                  </span>
                  Deficit: {f.deficit}
                </span>
                <button
                  onClick={() => navigate('/coop/allocation')}
                  className="text-primary font-label-md text-label-md font-semibold inline-flex items-center gap-0.5 min-h-[40px] tap"
                >
                  Mobilize <ChevronRight size={15} />
                </button>
              </div>
            </Card>
          ))}
        </section>

        {/* Workforce allocation */}
        <section className="flex flex-col gap-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h2 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-1.5">
                <Network size={18} className="text-primary" /> Workforce Allocation
              </h2>
              <p className="text-body-sm text-body-sm text-on-surface-variant">
                Recommended autonomous cluster rebalancing
              </p>
            </div>
            <Chip tone="secondary">AI Node Active</Chip>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {TRADE_TALLY.map(({ icon: Icon, v, k, tone }) => (
              <Card key={k} className="items-center text-center gap-1 py-3">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center ${tone}`}>
                  <Icon size={16} />
                </span>
                <span className="font-headline-md text-headline-md text-on-surface font-bold">{v}</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">{k}</span>
              </Card>
            ))}
          </div>

          {/* Advisory */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-primary-fixed/40 via-surface-container-lowest to-surface-container-low shadow-e1 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-primary-container flex items-center justify-center text-on-primary shrink-0">
                <Bot size={15} />
              </div>
              <h3 className="font-label-lg text-label-lg text-on-surface font-semibold">
                ZORVA Guild Positioning Advisory
              </h3>
            </div>
            <p className="text-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              “ZORVA recommends positioning workers where surge demand is anticipated — ahead of customer dispatch
              calls.”
            </p>
            <p className="text-body-sm text-body-sm text-secondary flex items-center gap-1.5">
              <CheckCircle2 size={14} /> Protects take-home dividends · Eliminates empty fuel corridors · Response &lt;15 min
            </p>
          </div>

          {/* Weightings */}
          <div className="flex flex-col gap-2">
            <span className="font-label-md text-label-md text-on-surface-variant font-semibold uppercase tracking-wider">
              Decision Model Weighting
            </span>
            <div className="grid grid-cols-2 gap-3">
              {WEIGHTS.map(({ icon: Icon, tone, pct, title, note }) => (
                <Card key={title} className="gap-1">
                  <div className="flex items-center justify-between">
                    <Icon size={17} className={tone} />
                    <span className={`font-label-sm text-label-sm font-bold ${tone}`}>{pct}</span>
                  </div>
                  <span className="font-label-md text-label-md text-on-surface font-semibold">{title}</span>
                  <p className="text-body-sm text-body-sm text-on-surface-variant leading-snug">{note}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <Card tone="low" className="items-center text-center gap-1 py-4" onClick={() => navigate('/coop/allocation')}>
          <p className="font-label-lg text-label-lg text-on-surface font-semibold">View Optimized Allocation</p>
          <ArrowRight size={17} className="text-primary" />
        </Card>
        <p className="flex items-center justify-center gap-1.5 text-label-sm text-label-sm text-on-surface-variant text-center">
          <CheckCircle2 size={12} /> Simulate dispatch corridor · Zero penalties for member opt-out
        </p>
      </div>
    </AppShell>
  )
}
