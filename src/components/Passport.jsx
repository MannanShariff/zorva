import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Award,
  BadgeCheck,
  Camera,
  CheckCircle2,
  Fingerprint,
  Lock,
  Plus,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react'
import { Avatar, Card, Chip, SkillLevelBar, VerificationBadge } from './ui'
import { ravi } from '../data/mock'

// Living Skill Passport — the product's strongest feature.
// Used in worker mode (own passport, with evidence CTA) and
// customer mode (read-only trust view before booking).
export default function Passport({ readOnly = false }) {
  const [tab, setTab] = useState('Skills')
  const tabs = ['Skills', `Evidence (${ravi.evidence.length * 6})`, 'History']

  return (
    <div className="flex flex-col gap-4">
      {/* Cryptographic banner */}
      <div className="rounded-2xl bg-primary-container text-on-primary p-3.5 shadow-e2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <ShieldCheck size={18} className="shrink-0" />
          <p className="font-label-md text-label-md font-bold truncate">
            Cryptographically Verified Co-op Credential
          </p>
        </div>
        <span className="font-label-sm text-label-sm bg-on-primary/15 px-2 py-0.5 rounded-full shrink-0">
          Bangalore Guild #04
        </span>
      </div>

      {/* Identity card */}
      <Card className="gap-3">
        <div className="flex items-start gap-3">
          <Avatar name={ravi.name} size="xl" verified />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="font-headline-sm text-headline-sm text-on-surface">{ravi.name}</h2>
              <Chip tone="secondary">Active Owner</Chip>
            </div>
            <p className="font-label-md text-label-md text-on-surface-variant mt-0.5">
              Verified Guild Artisan · {ravi.title}
            </p>
            <p className="text-body-sm text-body-sm text-on-surface-variant">
              {ravi.guild} · Member since {ravi.memberSince}
            </p>
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              <Chip tone="primary">Co-op Stake {ravi.equity} Equity</Chip>
              <Chip tone="surface">Passport ID {ravi.passportId}</Chip>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="p-2.5 rounded-xl bg-surface-container-low">
            <p className="font-label-sm text-label-sm text-on-surface-variant">Trust Status</p>
            <p className="font-label-md text-label-md text-secondary font-bold">High · {ravi.trust}</p>
          </div>
          <div className="p-2.5 rounded-xl bg-surface-container-low">
            <p className="font-label-sm text-label-sm text-on-surface-variant">Skill DNA</p>
            <p className="font-label-md text-label-md text-on-surface font-bold">Active · {ravi.callbacks}</p>
          </div>
        </div>
      </Card>

      {/* Metric grid */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { icon: TrendingUp, v: 'High', k: 'Trust' },
          { icon: Camera, v: ravi.workProofs, k: 'Proofs' },
          { icon: Award, v: ravi.peerAudits, k: 'Peer Audits' },
          { icon: ShieldCheck, v: ravi.warrantyRate, k: 'Warranty' },
        ].map(({ icon: Icon, v, k }) => (
          <div key={k} className="flex flex-col items-center gap-1 p-2.5 rounded-2xl bg-surface-container-lowest shadow-e1">
            <Icon size={16} className="text-primary" />
            <span className="font-label-md text-label-md text-on-surface font-bold">{v}</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant text-center leading-tight">{k}</span>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 p-1 rounded-full bg-surface-container-low">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t.split(' ')[0])}
            className={`flex-1 py-2 rounded-full font-label-md text-label-md tap truncate ${
              tab === t.split(' ')[0] ? 'bg-primary-container text-on-primary shadow-e1' : 'text-on-surface-variant'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'Skills' && (
        <div className="flex flex-col gap-3 rise">
          {ravi.skills.map((s) => (
            <Card key={s.name} className="gap-2.5">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="font-label-lg text-label-lg text-on-surface font-semibold">{s.name}</p>
                  <p className="text-body-sm text-body-sm text-on-surface-variant">
                    L{s.level} · {s.label}
                  </p>
                </div>
                <span className="font-label-md text-label-md text-secondary font-bold shrink-0">{s.confidence}%</span>
              </div>
              <SkillLevelBar level={s.level} />
              <div className="flex flex-wrap gap-1.5">
                {s.tags.map((t) => (
                  <Chip key={t} tone="surface">
                    {t}
                  </Chip>
                ))}
              </div>
              <div className="flex items-center justify-between text-body-sm text-body-sm text-on-surface-variant pt-1">
                <span className="flex items-center gap-1.5">
                  <Camera size={13} /> {s.evidenceCount} evidence items
                </span>
                <span>Updated {s.freshness}</span>
              </div>
            </Card>
          ))}
          {!readOnly && (
            <Link
              to="/worker/evidence"
              className="w-full min-h-[52px] rounded-2xl bg-gradient-to-r from-primary-container to-primary text-on-primary font-label-lg text-label-lg font-bold flex items-center justify-center gap-2 shadow-e2 tap"
            >
              <Plus size={18} /> Add Skill Evidence
            </Link>
          )}
        </div>
      )}

      {tab === 'Evidence' && (
        <div className="flex flex-col gap-3 rise">
          <p className="text-body-sm text-body-sm text-on-surface-variant px-1">
            Every claim is backed by tamper-proof work evidence — photos, telemetry, and peer consensus.
          </p>
          {ravi.evidence.map((e) => (
            <Card key={e.title} className="gap-2">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center text-on-primary-fixed shrink-0">
                    <Camera size={17} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-label-lg text-label-lg text-on-surface font-semibold truncate">{e.title}</p>
                    <p className="text-body-sm text-body-sm text-on-surface-variant truncate">
                      {e.client} · {e.date}
                    </p>
                  </div>
                </div>
                <VerificationBadge>{e.tag}</VerificationBadge>
              </div>
              <p className="text-body-sm text-body-sm text-on-surface-variant">{e.note}</p>
            </Card>
          ))}
        </div>
      )}

      {tab === 'History' && (
        <div className="flex flex-col gap-3 rise">
          {[
            { t: 'Level 4 Master Electrician', d: 'Sep 2026', n: 'Sustained ≥95% confidence across 12 evidence items' },
            { t: 'Peer Audit Passed', d: 'Aug 2026', n: 'Guild Inspector M. Raghavan · tamper-proof hash' },
            { t: 'Co-op Stake Accrued 4.2%', d: 'Aug 2026', n: 'Dividend allocation logged on guild ledger' },
            { t: 'Level 3 → Level 4 Promotion', d: 'Feb 2026', n: '3 independent validations · 30 verified outcomes' },
          ].map((h) => (
            <Card key={h.t} className="gap-1">
              <div className="flex items-center justify-between">
                <p className="font-label-lg text-label-lg text-on-surface font-semibold">{h.t}</p>
                <span className="font-label-sm text-label-sm text-outline">{h.d}</span>
              </div>
              <p className="text-body-sm text-body-sm text-on-surface-variant">{h.n}</p>
            </Card>
          ))}
        </div>
      )}

      {/* Verification explainer */}
      <div className="rounded-2xl bg-surface-container-low p-4 flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary shadow-e1 shrink-0">
          <Fingerprint size={18} />
        </div>
        <div className="min-w-0">
          <p className="font-label-md text-label-md text-on-surface font-semibold flex items-center gap-1.5">
            <Lock size={13} /> How verification works
          </p>
          <p className="text-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
            Identity confirms <em>who</em> submitted evidence — it does not by itself prove the skill. Each snapshot is
            signed with SHA-256 hardware hashes, cross-checked by peer consensus, and linked to this Living Skill
            Passport™.
          </p>
          <div className="flex items-center gap-1.5 mt-2 text-secondary">
            <CheckCircle2 size={14} />
            <span className="font-label-sm text-label-sm">Immutable Record #IND-04-2024-9428</span>
          </div>
        </div>
      </div>
    </div>
  )
}
