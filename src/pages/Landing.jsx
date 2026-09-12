import { Link } from 'react-router-dom'
import { ArrowRight, Building2, Handshake, ShieldCheck, Sparkles, User, Zap } from 'lucide-react'
import { app } from '../data/mock'

const journeys = [
  {
    to: '/app/home',
    icon: User,
    title: "I'm a Customer",
    sub: 'Request a verified worker · track live · pay transparently',
    tone: 'bg-primary-fixed text-on-primary-fixed',
  },
  {
    to: '/worker/home',
    icon: Handshake,
    title: "I'm a Worker",
    sub: 'Build your Living Skill Passport™ · grow with the guild',
    tone: 'bg-secondary-container text-on-secondary-container',
  },
  {
    to: '/coop',
    icon: Building2,
    title: 'Cooperative View',
    sub: 'Demand forecasting · fair workforce allocation',
    tone: 'bg-tertiary-fixed text-on-tertiary-fixed',
  },
]

export default function Landing() {
  return (
    <div className="app-frame">
      <main className="flex-1 overflow-y-auto no-scrollbar bg-surface relative flex flex-col">
        {/* Hero */}
        <div className="relative overflow-hidden bg-gradient-to-b from-primary-fixed/70 via-surface to-surface px-6 pt-14 pb-8 text-center">
          <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-secondary-container/40 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-primary-fixed-dim/50 blur-3xl pointer-events-none" />
          <div className="relative flex flex-col items-center gap-3 rise">
            <div className="w-16 h-16 rounded-3xl bg-primary flex items-center justify-center shadow-e2">
              <Zap size={30} className="text-on-primary" fill="currentColor" />
            </div>
            <div>
              <h1 className="font-headline-xl-mobile text-headline-xl-mobile text-on-surface tracking-tight">
                ZORVA Intelligence
              </h1>
              <p className="text-body-md text-body-md text-on-surface-variant mt-1 max-w-[280px] mx-auto leading-relaxed">
                {app.tagline}
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-lowest shadow-e1">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="font-label-sm text-label-sm text-on-surface">{app.coop} · Live</span>
            </div>
          </div>
        </div>

        {/* Journey cards */}
        <div className="px-5 pb-6 flex flex-col gap-3">
          <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest text-center">
            Choose your journey
          </p>
          {journeys.map(({ to, icon: Icon, title, sub, tone }, i) => (
            <Link
              key={to}
              to={to}
              className={`rise flex items-center gap-4 p-4 rounded-2xl bg-surface-container-lowest shadow-e1 tap`}
              style={{ animationDelay: `${i * 90}ms` }}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${tone}`}>
                <Icon size={22} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-headline-sm text-headline-sm text-on-surface">{title}</p>
                <p className="text-body-sm text-body-sm text-on-surface-variant leading-snug">{sub}</p>
              </div>
              <ArrowRight size={18} className="text-primary shrink-0" />
            </Link>
          ))}
        </div>

        {/* Value strip */}
        <div className="mt-auto px-5 pb-8">
          <div className="rounded-2xl bg-surface-container-low p-4 flex flex-col gap-2.5">
            {[
              { icon: ShieldCheck, text: 'Living Skill Passport™ — evidence-backed skills, not self-claims' },
              { icon: Sparkles, text: 'Explainable AI matching — you always see why a worker was chosen' },
              { icon: Building2, text: 'Cooperative intelligence — 90% payout, fair allocation, real dividends' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary shrink-0 shadow-e1">
                  <Icon size={15} />
                </div>
                <p className="text-body-sm text-body-sm text-on-surface leading-snug">{text}</p>
              </div>
            ))}
          </div>
          <p className="text-label-sm text-label-sm text-outline text-center mt-4">
            Demo prototype · simulated data · offline-ready
          </p>
        </div>
      </main>
    </div>
  )
}
