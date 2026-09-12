import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Camera, CheckCircle2, IndianRupee, Loader2, Mic, Square, Sparkles } from 'lucide-react'
import AppShell, { PageHeader } from '../../components/AppShell'
import { Card, Chip, PillButton, SegmentedControl, useToast } from '../../components/ui'
import { LocationPreview } from '../../components/MapPreview'

const LANGS = ['English', 'हिन्दी', 'ಕನ್ನಡ', 'தமிழ்']
const SYMPTOMS = ['⚡ Power tripping', '💧 Water leak', '🔇 Strange noise', '❄️ Not cooling']
const SLOTS = ['Today · 45 min', 'Tomorrow', 'Custom']

export default function RequestService() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const toast = useToast()
  const [lang, setLang] = useState('English')
  const [recording, setRecording] = useState(false)
  const [text, setText] = useState(state?.prefill || '')
  const [slot, setSlot] = useState(SLOTS[0])
  const [searching, setSearching] = useState(false)

  useEffect(() => {
    if (!recording) return
    const t = setTimeout(() => {
      setRecording(false)
      setText((prev) => (prev ? prev : 'My ceiling fan stops working after 10 minutes.'))
      toast('Voice captured in ' + lang + ' · transcribed to text')
    }, 2600)
    return () => clearTimeout(t)
  }, [recording, lang, toast])

  const findWorker = () => {
    setSearching(true)
    setTimeout(() => navigate('/app/understanding'), 1600)
  }

  return (
    <AppShell mode="customer" title="Request Service">
      <PageHeader title="Request a service" sub="Describe it any way you like — ZORVA AI does the rest" />

      <div className="px-4 pb-8 flex flex-col gap-4">
        {/* Voice capture */}
        <Card className="gap-3">
          <div className="flex items-center justify-between">
            <p className="font-headline-sm text-headline-sm text-on-surface">Speak your problem</p>
            <Chip tone="secondary">{lang}</Chip>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {LANGS.map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`shrink-0 px-3 min-h-[36px] rounded-full font-label-md text-label-md tap ${
                  lang === l ? 'bg-primary text-on-primary' : 'bg-surface-container-low text-on-surface-variant'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
          <div className="rounded-xl bg-surface-container-low p-4 flex flex-col items-center gap-3">
            <div className="flex items-end gap-1 h-10" aria-hidden>
              {[0.5, 0.9, 0.4, 1, 0.7, 0.3, 0.85, 0.55, 0.95, 0.45, 0.75, 0.35, 0.9, 0.6, 0.8, 0.5, 1, 0.4, 0.7, 0.65].map(
                (h, i) => (
                  <span
                    key={i}
                    className={`w-1 rounded-full ${recording ? 'wave-bar bg-primary' : 'bg-outline-variant'}`}
                    style={{ height: `${h * 100}%`, animationDelay: `${i * 60}ms` }}
                  />
                ),
              )}
            </div>
            <button
              onClick={() => setRecording((r) => !r)}
              aria-label={recording ? 'Stop recording' : 'Start recording'}
              className={`relative w-14 h-14 rounded-full flex items-center justify-center shadow-e2 tap ${
                recording ? 'bg-error text-on-error' : 'bg-primary text-on-primary'
              }`}
            >
              {recording && <span className="absolute inset-0 rounded-full bg-error/40 pulse-ring" />}
              {recording ? <Square size={20} fill="currentColor" /> : <Mic size={22} />}
            </button>
            <p className="font-label-sm text-label-sm text-on-surface-variant">
              {recording ? `Listening in ${lang}… tap to stop` : 'Tap and describe the issue in your language'}
            </p>
          </div>
        </Card>

        {/* Photo diagnosis */}
        <Card tone="low" className="gap-2" onClick={() => toast('Photo analysed: Havells 32A MCB Board detected')}>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-surface-container-lowest flex items-center justify-center text-primary shadow-e1 shrink-0">
              <Camera size={20} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-label-lg text-label-lg text-on-surface font-semibold">Add a photo</p>
              <p className="text-body-sm text-body-sm text-on-surface-variant">AI auto-detects the appliance & model</p>
            </div>
            <Chip tone="primary">Fast</Chip>
          </div>
        </Card>

        {/* Text + symptoms */}
        <Card className="gap-3">
          <p className="font-headline-sm text-headline-sm text-on-surface">Or type it out</p>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
            placeholder="e.g. My ceiling fan stops working after 10 minutes…"
            className="w-full rounded-xl bg-surface-container-low p-3 text-body-md text-body-md text-on-surface outline-none focus:ring-2 focus:ring-primary/40 transition-all placeholder:text-outline resize-none"
          />
          <div className="flex flex-wrap gap-1.5">
            {SYMPTOMS.map((s) => (
              <Chip key={s} tone="surface" onClick={() => setText((t) => (t ? `${t} ${s}` : s))}>
                {s}
              </Chip>
            ))}
          </div>
        </Card>

        {/* Location */}
        <Card className="gap-3">
          <p className="font-headline-sm text-headline-sm text-on-surface">Service location</p>
          <LocationPreview />
        </Card>

        {/* Time slot */}
        <div className="flex flex-col gap-2">
          <p className="font-headline-sm text-headline-sm text-on-surface">When do you need it?</p>
          <SegmentedControl options={SLOTS} value={slot} onChange={setSlot} />
        </div>

        {/* Rate strip */}
        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-secondary-container/60 text-on-secondary-container">
          <div className="flex items-center gap-2">
            <IndianRupee size={18} />
            <div>
              <p className="font-label-md text-label-md font-bold">₹199 base rate · Zero Surge pricing</p>
              <p className="text-body-sm text-body-sm">90% direct payout to the worker</p>
            </div>
          </div>
          <Chip tone="surface">Locked</Chip>
        </div>

        {/* CTA */}
        <PillButton onClick={findWorker} disabled={searching}>
          {searching ? (
            <>
              <Loader2 size={18} className="animate-spin" /> Scanning guild network…
            </>
          ) : (
            <>
              Find the best worker <Sparkles size={17} />
            </>
          )}
        </PillButton>
        <p className="flex items-center justify-center gap-1.5 text-label-sm text-label-sm text-on-surface-variant">
          <CheckCircle2 size={13} className="text-secondary" /> Transparent co-op matching · no commission bidding
        </p>
      </div>
    </AppShell>
  )
}
