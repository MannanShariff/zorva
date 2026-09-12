import { useNavigate } from 'react-router-dom'
import { ChevronRight, IndianRupee, LogOut, TrendingUp, Wallet, Zap } from 'lucide-react'
import AppShell, { PageHeader } from '../../components/AppShell'
import { Card, Chip, PillButton, useToast } from '../../components/ui'
import { ravi } from '../../data/mock'

const LEDGER = [
  { t: 'Ceiling Fan Stator Repair', d: 'Today · #ZRV-JOB-942', amt: 378, tone: 'secondary' },
  { t: 'DB Overload Rectification', d: 'Sep 9 · #ZRV-JOB-918', amt: 512 },
  { t: 'Inverter Health Check', d: 'Sep 7 · #ZRV-JOB-903', amt: 297 },
  { t: 'Co-op Dividend Payout', d: 'Sep 5 · Quarterly', amt: 1240, tone: 'primary' },
]

export function Earnings() {
  return (
    <AppShell mode="worker" title="Earnings">
      <PageHeader title="Earnings" sub="Transparent ledger · 90% of every rupee" />
      <div className="px-4 pb-8 flex flex-col gap-4">
        <div className="rounded-2xl bg-gradient-to-br from-primary-container to-primary text-on-primary p-5 shadow-e2">
          <p className="font-label-sm text-label-sm uppercase tracking-wider opacity-80">This week</p>
          <p className="font-headline-xl text-headline-xl font-bold">₹14,850</p>
          <div className="flex items-center gap-2 mt-1">
            <Chip tone="surface">+18% vs last week</Chip>
            <Chip tone="surface">Dividend Friday 💰</Chip>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            { k: 'Guild dividend', v: '₹1,240', n: 'Quarterly payout' },
            { k: 'Co-op stake', v: ravi.equity, n: 'Equity accrued' },
            { k: 'Avg payout/job', v: '₹416', n: '90% direct share' },
            { k: 'Instant settlements', v: '47/47', n: 'Zero delays' },
          ].map((s) => (
            <Card key={s.k} className="gap-1">
              <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">{s.k}</p>
              <p className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-bold">{s.v}</p>
              <p className="text-body-sm text-body-sm text-on-surface-variant">{s.n}</p>
            </Card>
          ))}
        </div>

        <div className="flex flex-col gap-2.5">
          <p className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-1.5">
            <IndianRupee size={17} className="text-primary" /> Payout ledger
          </p>
          {LEDGER.map((l) => (
            <Card key={l.t} tone="low" className="gap-0.5">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-label-md text-label-md text-on-surface font-semibold truncate">{l.t}</p>
                  <p className="text-body-sm text-body-sm text-on-surface-variant">{l.d}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-label-lg text-label-lg text-secondary font-bold">+₹{l.amt}</p>
                  {l.tone === 'primary' && <span className="font-label-sm text-label-sm text-primary">Dividend</span>}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  )
}

export function WorkerProfile() {
  const navigate = useNavigate()
  const toast = useToast()
  return (
    <AppShell mode="worker" title="Profile">
      <PageHeader title="Worker profile" sub="Verified Guild Artisan" />
      <div className="px-4 pb-8 flex flex-col gap-4">
        <Card className="items-center text-center gap-2 py-6">
          <div className="w-20 h-20 rounded-full bg-primary-fixed-dim ring-4 ring-primary-fixed flex items-center justify-center font-headline-md text-headline-md text-on-primary-fixed">
            RK
          </div>
          <div>
            <h2 className="font-headline-sm text-headline-sm text-on-surface">{ravi.name}</h2>
            <p className="text-body-sm text-body-sm text-on-surface-variant">
              {ravi.title} · {ravi.guild}
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-1.5 mt-1">
            <Chip tone="secondary">{ravi.levelLabel}</Chip>
            <Chip tone="primary">Co-op Stake {ravi.equity}</Chip>
          </div>
        </Card>

        <div className="flex flex-col gap-2">
          {[
            { icon: Wallet, label: 'Payout settings', note: 'HDFC Co-op Bank •••• 9214' },
            { icon: TrendingUp, label: 'Dispatch preferences', note: '5 km range · Auto-dispatch ON' },
            { icon: Zap, label: 'Skills & services', note: '4 verified skill domains' },
          ].map(({ icon: Icon, label, note }) => (
            <Card
              key={label}
              tone="low"
              className="gap-0"
              onClick={() => toast(label + ' — coming in full build')}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary shadow-e1 shrink-0">
                  <Icon size={17} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-label-lg text-label-lg text-on-surface font-semibold">{label}</p>
                  <p className="text-body-sm text-body-sm text-on-surface-variant truncate">{note}</p>
                </div>
                <ChevronRight size={16} className="text-outline shrink-0" />
              </div>
            </Card>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <PillButton variant="surface" onClick={() => navigate('/app/home')}>
            Switch to Customer view <Zap size={16} className="text-primary" />
          </PillButton>
          <PillButton variant="ghost" onClick={() => navigate('/')}>
            <LogOut size={16} /> Switch journey
          </PillButton>
        </div>
      </div>
    </AppShell>
  )
}
