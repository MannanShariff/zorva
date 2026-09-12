import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Camera,
  CheckCircle2,
  Cpu,
  FileText,
  Loader2,
  Lock,
  ScanLine,
  Users,
  Video,
  WifiOff,
} from 'lucide-react'
import AppShell, { PageHeader } from '../../components/AppShell'
import { Avatar, Card, Chip, OfflineState, PillButton, ProgressBar } from '../../components/ui'
import { ravi } from '../../data/mock'

const METHODS = [
  { icon: Camera, title: 'Take photos', sub: 'Conduits, terminal joints, breaker boxes', tag: 'Fastest AI scan' },
  { icon: Video, title: 'Record video (60s)', sub: 'Spatial walkthrough of the work', tag: '+15% confidence' },
  { icon: FileText, title: 'Upload document', sub: 'PDF / JPG / CSV — OCR meter serials', tag: 'Telemetry' },
]

const PIPELINE = [
  { title: 'Telemetry Capture & Upload', note: '1.4 MB · signed with device hash' },
  { title: 'Deep Visual Diagnostic', note: 'Busbar symmetry & crimp integrity scan' },
  { title: 'IS 732 Compliance Extraction', note: 'Safety codes auto-recognised' },
  { title: 'Peer Consensus Validation', note: 'Guild master consensus 2-of-3' },
]

const CHECKLIST = ['Clear view of the finished work', 'Wire colour codes visible', 'Belongs to the skill domain', 'Daylight-grade lighting']

export default function EvidenceCapture() {
  const navigate = useNavigate()
  const [capturing, setCapturing] = useState(false)
  const [step, setStep] = useState(0) // pipeline progress 0..4

  useEffect(() => {
    if (!capturing) return
    if (step >= PIPELINE.length) return
    const t = setTimeout(() => setStep((s) => s + 1), 1300)
    return () => clearTimeout(t)
  }, [capturing, step])

  const done = step >= PIPELINE.length

  return (
    <AppShell mode="worker" title="Evidence Capture">
      <PageHeader
        title="Add evidence"
        sub="Electrical Wiring · show your work so ZORVA can verify your skill"
        chips={<Chip tone="tertiary">Offline OK</Chip>}
      />

      <div className="px-4 pb-8 flex flex-col gap-4">
        {/* Offline card */}
        <OfflineState />

        {/* Capture methods */}
        <div className="flex flex-col gap-2.5">
          {METHODS.map(({ icon: Icon, title, sub, tag }) => (
            <Card key={title} tone="low" className="gap-1.5" onClick={() => setCapturing(true)}>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-surface-container-lowest flex items-center justify-center text-primary shadow-e1 shrink-0">
                  <Icon size={19} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-label-lg text-label-lg text-on-surface font-semibold">{title}</p>
                  <p className="text-body-sm text-body-sm text-on-surface-variant truncate">{sub}</p>
                </div>
                <Chip tone="primary" className="shrink-0">
                  {tag}
                </Chip>
              </div>
            </Card>
          ))}
        </div>

        {/* AI validation pipeline */}
        <Card className="gap-3">
          <div className="flex items-center justify-between">
            <p className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-1.5">
              <Cpu size={17} className="text-primary" /> AI Validation Pipeline
            </p>
            {done && <Chip tone="secondary">Complete</Chip>}
          </div>
          {PIPELINE.map((p, i) => {
            const state = step > i ? 'done' : step === i && capturing ? 'active' : 'idle'
            return (
              <div key={p.title} className="flex items-start gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    state === 'done'
                      ? 'bg-secondary text-on-secondary'
                      : state === 'active'
                        ? 'bg-primary text-on-primary'
                        : 'bg-surface-container-high text-on-surface-variant'
                  }`}
                >
                  {state === 'done' ? (
                    <CheckCircle2 size={15} />
                  ) : state === 'active' ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <span className="font-label-sm text-label-sm font-bold">{i + 1}</span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className={`font-label-md text-label-md font-semibold ${state === 'idle' ? 'text-on-surface-variant' : 'text-on-surface'}`}>
                    {p.title}
                  </p>
                  <p className="text-body-sm text-body-sm text-on-surface-variant">{p.note}</p>
                </div>
                {state === 'done' && <span className="font-label-sm text-label-sm text-secondary font-bold shrink-0">✓</span>}
              </div>
            )
          })}
          {capturing && !done && <ProgressBar value={(step / PIPELINE.length) * 100} />}
        </Card>

        {/* Checklist */}
        <Card className="gap-2">
          <p className="font-headline-sm text-headline-sm text-on-surface">Level 4 evidence checklist</p>
          {CHECKLIST.map((c) => (
            <div key={c} className="flex items-center gap-2">
              <CheckCircle2 size={15} className="text-secondary shrink-0" />
              <span className="text-body-sm text-body-sm text-on-surface">{c}</span>
            </div>
          ))}
        </Card>

        {/* Identity banner */}
        <Card tone="low" className="gap-1">
          <div className="flex items-center gap-3">
            <Avatar name={ravi.name} size="md" verified />
            <div className="min-w-0">
              <p className="font-label-lg text-label-lg text-on-surface font-semibold">{ravi.name}</p>
              <p className="text-body-sm text-body-sm text-on-surface-variant truncate">
                Submitting as · {ravi.passportId}
              </p>
            </div>
            <ScanLine size={18} className="text-primary ml-auto shrink-0" />
          </div>
        </Card>

        {/* Privacy note */}
        <div className="rounded-2xl bg-surface-container-low p-4 flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary shadow-e1 shrink-0">
            <Users size={17} />
          </div>
          <p className="text-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            Identity verification confirms <em>who</em> submitted the evidence — it does not by itself prove the skill.
            Each snapshot is signed with SHA-256 cryptographic hardware hashes and linked to your Living Skill
            Passport™.
          </p>
        </div>

        {/* CTA */}
        {done ? (
          <div className="rise flex flex-col gap-2">
            <PillButton variant="secondary" onClick={() => navigate('/worker/passport-updated')}>
              <CheckCircle2 size={18} /> Evidence verified — see passport update
            </PillButton>
            <p className="flex items-center justify-center gap-1.5 text-label-sm text-label-sm text-on-surface-variant">
              <Lock size={12} /> 256-bit encrypted · end-to-end guild ledger
            </p>
          </div>
        ) : (
          <PillButton onClick={() => setCapturing(true)} disabled={capturing}>
            {capturing ? (
              <>
                <Loader2 size={17} className="animate-spin" /> Validating with AI…
              </>
            ) : (
              <>
                <Camera size={17} /> Capture evidence
              </>
            )}
          </PillButton>
        )}
        {capturing && !done && (
          <div className="flex items-center justify-center gap-1.5">
            <WifiOff size={13} className="text-tertiary" />
            <p className="font-label-sm text-label-sm text-tertiary">
              Saved offline — will sync when connected
            </p>
          </div>
        )}
      </div>
    </AppShell>
  )
}
