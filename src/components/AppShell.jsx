import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  Bell,
  Briefcase,
  FileText,
  Handshake,
  Home,
  IdCard,
  MessageSquare,
  ReceiptText,
  User,
  Wallet,
  Zap,
} from 'lucide-react'
import { BottomSheet, Chip, ToastProvider } from './ui'
import { notifications } from '../data/mock'

// ── Top bar ───────────────────────────────────────────────────
function TopBar({ title }) {
  const [lang, setLang] = useState(false)
  const [showNotifs, setShowNotifs] = useState(false)
  const [hindi, setHindi] = useState(false)

  return (
    <header className="shrink-0 z-40 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-20 px-4 flex items-center justify-between gap-2">
        <Link to="/" className="flex items-center gap-2.5 min-w-0 flex-1">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shrink-0 shadow-e1">
            <Zap size={18} className="text-on-primary" fill="currentColor" />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight">ZORVA</span>
              <Chip tone="secondary" pulse>
                Bengaluru South Co-op
              </Chip>
            </div>
            <span className="font-label-sm text-label-sm text-on-surface-variant tracking-wide uppercase truncate">
              {title}
            </span>
          </div>
        </Link>
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => {
              setLang(!lang)
              setHindi(!hindi)
            }}
            aria-label="Switch language"
            className="h-11 px-2.5 rounded-full bg-surface-container-low text-on-surface font-label-sm text-label-sm flex items-center gap-1 tap"
          >
            <span className="text-primary text-label-md">{hindi ? 'अ' : 'EN'}</span>
            <span>{hindi ? 'हिंदी / EN' : 'EN / हिंदी'}</span>
          </button>
          <button
            onClick={() => setShowNotifs(true)}
            aria-label="Notifications"
            className="relative w-11 h-11 rounded-full flex items-center justify-center text-on-surface-variant tap"
          >
            <Bell size={21} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-primary-container ring-2 ring-surface" />
          </button>
          <Link to="/app/profile" aria-label="Profile" className="pl-1">
            <div className="w-8 h-8 rounded-full bg-primary-fixed-dim ring-2 ring-primary-fixed flex items-center justify-center font-label font-bold text-on-primary-fixed text-label-sm">
              A
            </div>
          </Link>
        </div>
      </div>

      <BottomSheet open={showNotifs} onClose={() => setShowNotifs(false)} title="Notifications">
        <div className="flex flex-col gap-2.5">
          {notifications.map((n) => (
            <div key={n.title} className="flex items-start gap-3 p-3 rounded-xl bg-surface-container-low">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  n.tone === 'secondary'
                    ? 'bg-secondary-container text-on-secondary-container'
                    : 'bg-primary-fixed text-on-primary-fixed'
                }`}
              >
                <Zap size={15} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-label-md text-label-md text-on-surface font-semibold">{n.title}</p>
                <p className="text-body-sm text-body-sm text-on-surface-variant">{n.detail}</p>
              </div>
              <span className="text-label-sm text-label-sm text-outline shrink-0">{n.time}</span>
            </div>
          ))}
        </div>
      </BottomSheet>
    </header>
  )
}

// ── Bottom navigation (dual mode) ─────────────────────────────
const NAV = {
  customer: [
    { to: '/app/home', label: 'Home', icon: Home },
    { to: '/app/requests', label: 'Requests', icon: Handshake },
    { to: '/app/activity', label: 'Activity', icon: ReceiptText },
    { to: '/app/messages', label: 'Messages', icon: MessageSquare },
    { to: '/app/profile', label: 'Profile', icon: User },
  ],
  worker: [
    { to: '/worker/home', label: 'Home', icon: Home },
    { to: '/worker/jobs', label: 'Jobs', icon: Briefcase },
    { to: '/worker/passport', label: 'Passport', icon: IdCard },
    { to: '/worker/earnings', label: 'Earnings', icon: Wallet },
    { to: '/worker/profile', label: 'Profile', icon: User },
  ],
  coop: [
    { to: '/coop', label: 'Intelligence', icon: Home },
    { to: '/coop/allocation', label: 'Allocation', icon: Briefcase },
    { to: '/app/home', label: 'Customer', icon: User },
    { to: '/worker/home', label: 'Worker', icon: Wallet },
    { to: '/', label: 'Exit', icon: Zap },
  ],
}

function BottomNavigation({ mode = 'customer' }) {
  const { pathname } = useLocation()
  return (
    <nav className="shrink-0 z-40 bg-surface/90 backdrop-blur-xl shadow-[0_-4px_16px_rgba(89,37,220,0.05)]">
      <div className="flex justify-around items-center h-16 px-1">
        {NAV[mode].map(({ to, label, icon: Icon }) => {
          const active = pathname === to || (to !== '/' && pathname.startsWith(to))
          return (
            <Link
              key={label}
              to={to}
              aria-label={label}
              className={`flex flex-col items-center justify-center min-w-[56px] h-12 gap-0.5 tap ${
                active ? 'text-primary font-semibold' : 'text-on-surface-variant'
              }`}
            >
              <Icon size={22} strokeWidth={active ? 2.4 : 2} />
              <span className="font-label-sm text-label-sm">{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

// ── App shell ─────────────────────────────────────────────────
export default function AppShell({ mode = 'customer', title = 'Home', children, noNav = false }) {
  return (
    <div className="app-frame">
      <ToastProvider>
        <TopBar title={title} />
        <main className="flex-1 overflow-y-auto no-scrollbar bg-surface">{children}</main>
        {!noNav && <BottomNavigation mode={mode} />}
      </ToastProvider>
    </div>
  )
}

// ── Shared page sub-header with back button ───────────────────
export function PageHeader({ title, sub, chips, onBack = true, icon: Icon }) {
  const navigate = useNavigate()
  return (
    <div className="px-4 pt-3 pb-1 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        {onBack && (
          <button
            onClick={() => navigate(-1)}
            aria-label="Go back"
            className="w-11 h-11 rounded-full bg-surface-container-low flex items-center justify-center shadow-e1 tap"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        {chips && <div className="flex items-center gap-1.5">{chips}</div>}
      </div>
      <div>
        {title && <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface tracking-tight">{title}</h1>}
        {sub && (
          <p className="text-body-sm text-body-sm text-on-surface-variant flex items-center gap-1.5 mt-0.5">
            {Icon && <Icon size={15} className="text-primary shrink-0" />}
            {sub}
          </p>
        )}
      </div>
    </div>
  )
}
