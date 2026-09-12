import { useNavigate } from 'react-router-dom'
import { Bell, Building2, ChevronRight, Handshake, IdCard, LogOut, MessageSquare, Zap } from 'lucide-react'
import AppShell, { PageHeader } from '../../components/AppShell'
import { Card, Chip, EmptyState, PillButton, useToast } from '../../components/ui'
import { activity, customer, job, ravi } from '../../data/mock'

const CHATS = [
  { name: ravi.name, last: 'On my way via 100ft Rd 🏍️', time: '2m', unread: true },
  { name: 'ZORVA Dispatch', last: 'Your OTP for job #ZRV-JOB-942 is 4821', time: '1h', unread: true },
  { name: 'Sunita Patil', last: 'Thank you! Warranty details shared 🙏', time: 'Yest' },
]

export function Requests() {
  const navigate = useNavigate()
  return (
    <AppShell mode="customer" title="Requests">
      <PageHeader title="Your requests" sub="Open and past service requests" />
      <div className="px-4 pb-8 flex flex-col gap-3">
        <Card className="gap-2 border border-primary/20" onClick={() => navigate('/app/tracking')}>
          <div className="flex items-center justify-between">
            <Chip tone="tertiary" pulse>
              In Progress
            </Chip>
            <span className="font-label-sm text-label-sm text-outline">#{job.id}</span>
          </div>
          <p className="font-label-lg text-label-lg text-on-surface font-semibold">{job.title}</p>
          <p className="text-body-sm text-body-sm text-on-surface-variant">
            {ravi.name} · 96% match · ETA 24 min
          </p>
        </Card>
        <Card className="gap-2" onClick={() => navigate('/app/request')}>
          <div className="flex items-center justify-between">
            <Chip tone="surface">Draft</Chip>
            <ChevronRight size={16} className="text-outline" />
          </div>
          <p className="font-label-lg text-label-lg text-on-surface font-semibold">New request</p>
          <p className="text-body-sm text-body-sm text-on-surface-variant">
            Describe the issue by voice, photo or text — AI does the rest
          </p>
        </Card>
      </div>
    </AppShell>
  )
}

export function Activity() {
  const navigate = useNavigate()
  return (
    <AppShell mode="customer" title="Activity">
      <PageHeader title="Activity" sub="Your service history with the guild" />
      <div className="px-4 pb-8 flex flex-col gap-3">
        {activity.map((a) => (
          <Card key={a.title} className="gap-1.5" onClick={() => navigate('/app/payment')}>
            <div className="flex items-center justify-between">
              <p className="font-label-lg text-label-lg text-on-surface font-semibold">{a.title}</p>
              <span className="font-label-sm text-label-sm text-outline">{a.date}</span>
            </div>
            <p className="text-body-sm text-body-sm text-on-surface-variant">{a.sub}</p>
            <Chip tone={a.tone} className="self-start">
              Completed · Warranty active
            </Chip>
          </Card>
        ))}
      </div>
    </AppShell>
  )
}

export function Messages() {
  return (
    <AppShell mode="customer" title="Messages">
      <PageHeader title="Messages" sub="Chat with workers & co-op dispatch" />
      <div className="px-4 pb-8 flex flex-col gap-3">
        {CHATS.map((c) => (
          <Card key={c.name} className="gap-1" onClick={() => undefined}>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-primary-fixed text-on-primary-fixed font-label font-bold flex items-center justify-center shrink-0">
                {c.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-label-lg text-label-lg text-on-surface font-semibold truncate">{c.name}</p>
                  <span className="font-label-sm text-label-sm text-outline shrink-0">{c.time}</span>
                </div>
                <p className="text-body-sm text-body-sm text-on-surface-variant truncate flex items-center gap-1.5">
                  {c.unread && <span className="w-2 h-2 rounded-full bg-primary shrink-0" />}
                  {c.last}
                </p>
              </div>
            </div>
          </Card>
        ))}
        <EmptyState
          icon={MessageSquare}
          title="End-to-end encrypted"
          sub="Messages between you and guild workers are private — ZORVA never reads them."
        />
      </div>
    </AppShell>
  )
}

export function CustomerProfile() {
  const navigate = useNavigate()
  const toast = useToast()
  return (
    <AppShell mode="customer" title="Profile">
      <PageHeader title="Your profile" sub="Customer · Bengaluru South Co-op" />
      <div className="px-4 pb-8 flex flex-col gap-4">
        <Card className="items-center text-center gap-2 py-6">
          <div className="w-20 h-20 rounded-full bg-primary-fixed-dim ring-4 ring-primary-fixed flex items-center justify-center font-headline-md text-headline-md text-on-primary-fixed">
            AS
          </div>
          <div>
            <h2 className="font-headline-sm text-headline-sm text-on-surface">{customer.fullName}</h2>
            <p className="text-body-sm text-body-sm text-on-surface-variant">
              {customer.location} · Member since 2024
            </p>
          </div>
          <div className="flex gap-2 mt-1">
            <Chip tone="secondary" icon={Handshake}>
              Co-op Member
            </Chip>
            <Chip tone="primary">12 jobs booked</Chip>
          </div>
        </Card>

        <div className="flex flex-col gap-2">
          {[
            { icon: Bell, label: 'Notifications', note: 'Job updates, OTP alerts' },
            { icon: IdCard, label: 'Saved workers', note: 'Your trusted guild artisans' },
            { icon: Building2, label: 'Co-op details', note: 'Bengaluru South Co-op · Node #04' },
          ].map(({ icon: Icon, label, note }) => (
            <Card key={label} tone="low" className="gap-0" onClick={() => toast(label + ' — coming in full build')}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary shadow-e1 shrink-0">
                  <Icon size={17} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-label-lg text-label-lg text-on-surface font-semibold">{label}</p>
                  <p className="text-body-sm text-body-sm text-on-surface-variant">{note}</p>
                </div>
                <ChevronRight size={16} className="text-outline shrink-0" />
              </div>
            </Card>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <PillButton variant="surface" onClick={() => navigate('/worker/home')}>
            Switch to Worker view <Zap size={16} className="text-primary" />
          </PillButton>
          <PillButton variant="ghost" onClick={() => navigate('/')}>
            <LogOut size={16} /> Switch journey
          </PillButton>
        </div>
      </div>
    </AppShell>
  )
}
