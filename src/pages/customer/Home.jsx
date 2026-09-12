import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Camera, ChevronRight, IndianRupee, MapPin, Mic, Navigation, Sparkles } from 'lucide-react'
import AppShell from '../../components/AppShell'
import { Chip, PillButton, SectionHeader, useToast } from '../../components/ui'
import { ActiveServiceCard, GuaranteeBanner, ServiceCard, WorkerCard } from '../../components/cards'
import { customer, ravi, services, trustedWorkers } from '../../data/mock'

export default function CustomerHome() {
  const navigate = useNavigate()
  const toast = useToast()
  const [text, setText] = useState('')

  return (
    <AppShell mode="customer" title="Home">
      <div className="flex flex-col gap-5 px-4 pt-3 pb-8">
        {/* Greeting + location */}
        <div>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface tracking-tight">
            {customer.greeting}
          </h1>
          <button
            onClick={() => toast('Location locked: Indiranagar 100ft Rd')}
            className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-low shadow-e1 tap"
          >
            <MapPin size={14} className="text-primary" />
            <span className="font-label-md text-label-md text-on-surface">
              {customer.location} · {customer.area}
            </span>
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
          </button>
        </div>

        {/* Hero request card */}
        <div className="rounded-3xl bg-surface-container-lowest shadow-e2 p-4 flex flex-col gap-3">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
            placeholder="e.g. Inverter tripping when AC starts…"
            className="w-full rounded-xl bg-surface-container-low p-3 text-body-md text-body-md text-on-surface outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/40 transition-all placeholder:text-outline resize-none"
          />
          <div className="flex items-center gap-2">
            <button
              onClick={() => toast('Camera opened — AI photo diagnosis ready')}
              className="flex-1 min-h-[44px] rounded-full bg-surface-container-low flex items-center justify-center gap-1.5 font-label-md text-label-md text-on-surface tap"
            >
              <Camera size={16} className="text-primary" /> Add Photo
            </button>
            <button
              onClick={() => navigate('/app/request')}
              aria-label="Voice note"
              className="relative w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-e2 tap"
            >
              <span className="absolute inset-0 rounded-full bg-primary/40 pulse-ring" />
              <Mic size={20} />
            </button>
            <button
              onClick={() => toast('Voice note attached (Hinglish supported)')}
              className="flex-1 min-h-[44px] rounded-full bg-surface-container-low flex items-center justify-center gap-1.5 font-label-md text-label-md text-on-surface tap"
            >
              Audio-Note
            </button>
          </div>
          <Chip tone="primary" icon={Sparkles} className="self-start">
            AI instantly extracts: Issue Type · Urgency · Guild Certification
          </Chip>
          <PillButton
            onClick={() =>
              navigate('/app/request', { state: { prefill: text } })
            }
          >
            Find a Verified Worker <ChevronRight size={18} />
          </PillButton>
        </div>

        {/* Active service */}
        <div className="flex flex-col gap-2">
          <SectionHeader
            icon={Navigation}
            title="Active service"
            action="Track"
            onAction={() => navigate('/app/tracking')}
          />
          <ActiveServiceCard worker={ravi} onTrack={() => navigate('/app/tracking')} />
        </div>

        {/* Popular services */}
        <div className="flex flex-col gap-2">
          <SectionHeader title="Popular services" sub="Fair guild rates · no hidden costs" />
          <div className="grid grid-cols-2 gap-3">
            {services.map((s) => (
              <ServiceCard key={s.name} {...s} onClick={() => navigate('/app/request', { state: { prefill: `${s.name} needed — ` } })} />
            ))}
          </div>
        </div>

        {/* Trusted workers */}
        <div className="flex flex-col gap-2">
          <SectionHeader title="Trusted workers" sub="Verified by guild evidence, not ads" />
          <div className="flex flex-col gap-3">
            {trustedWorkers.map((w) => (
              <WorkerCard
                key={w.name}
                worker={w}
                onBook={() => navigate('/app/request', { state: { prefill: `${w.title} needed — ` } })}
              />
            ))}
          </div>
        </div>

        {/* Guarantee */}
        <GuaranteeBanner />

        <p className="flex items-center justify-center gap-1 text-label-sm text-label-sm text-on-surface-variant">
          <IndianRupee size={12} /> 90% of every rupee goes directly to the worker
        </p>
      </div>
    </AppShell>
  )
}
