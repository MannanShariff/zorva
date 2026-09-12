import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CheckCircle2,
  CreditCard,
  Download,
  IndianRupee,
  Landmark,
  Loader2,
  Lock,
  Receipt,
  Eye,
  Wallet,
} from 'lucide-react'
import AppShell, { PageHeader } from '../../components/AppShell'
import { Avatar, Card, Chip, PillButton, VerificationBadge, useToast } from '../../components/ui'
import { job, ravi } from '../../data/mock'

const METHODS = [
  { id: 'upi', icon: Wallet, title: 'UPI Auto-pay / Instant', sub: 'GPay, PhonePe, Paytm, BHIM' },
  { id: 'bank', icon: Landmark, title: 'Saved Cooperative Account', sub: 'HDFC Co-op Bank UPI •••• 9214' },
  { id: 'card', icon: CreditCard, title: 'Digital Payment / Razorpay', sub: 'Credit / Debit cards, NetBanking' },
]

export default function Payment() {
  const navigate = useNavigate()
  const toast = useToast()
  const [method, setMethod] = useState('upi')
  const [paying, setPaying] = useState(false)
  const [paid, setPaid] = useState(false)

  const pay = () => {
    setPaying(true)
    setTimeout(() => {
      setPaying(false)
      setPaid(true)
      toast('₹420 settled · ₹378 sent to Ravi instantly', 'secondary')
    }, 1600)
  }

  return (
    <AppShell mode="customer" title="Payment">
      <PageHeader
        title="Service completed"
        sub={`${job.title} · Flat 4B, Palm Grove`}
        chips={
          <>
            <Chip tone="high">#{job.id}</Chip>
            <Chip tone="secondary">Work Tested</Chip>
          </>
        }
      />

      <div className="px-4 pb-8 flex flex-col gap-4">
        {/* Worker trust */}
        <Card className="gap-3">
          <div className="flex items-start gap-3">
            <Avatar name={ravi.name} size="lg" verified />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h2 className="font-headline-sm text-headline-sm text-on-surface truncate">{ravi.name}</h2>
                <span className="font-label-md text-label-md text-primary font-bold shrink-0">★ {ravi.rating}</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                <VerificationBadge>Verified Guild Master</VerificationBadge>
                <Chip tone="surface">Indiranagar #04</Chip>
              </div>
              <p className="text-body-sm text-body-sm text-on-surface-variant mt-1">
                142 completed co-op jobs · 0 disputes
              </p>
            </div>
          </div>
          <div className="p-2.5 rounded-xl bg-surface-container-low flex items-center justify-between gap-2">
            <span className="font-label-sm text-label-sm text-on-surface flex items-center gap-1.5 min-w-0">
              <CheckCircle2 size={15} className="text-secondary shrink-0" /> Customer OTP #{job.otp} verified
            </span>
            <Chip tone="secondary">30-Day Warranty Active</Chip>
          </div>
        </Card>

        {/* Transparent tariff */}
        <Card className="gap-3">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="font-headline-sm text-headline-sm text-on-surface">Transparent Cooperative Tariff</h2>
              <p className="text-body-sm text-body-sm text-on-surface-variant">No hidden costs · audited by Guild #04</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-primary-fixed text-primary flex items-center justify-center shrink-0">
              <Receipt size={16} />
            </div>
          </div>
          <div className="flex flex-col gap-2.5">
            {job.lineItems.map((item) => (
              <div key={item.title} className="flex justify-between items-start gap-3">
                <div className="min-w-0">
                  <p className="text-body-md text-body-md text-on-surface font-medium">{item.title}</p>
                  <p className="text-body-sm text-body-sm text-on-surface-variant">{item.note}</p>
                </div>
                <span className="font-label-lg text-label-lg text-on-surface shrink-0">₹{item.amount}</span>
              </div>
            ))}
          </div>
          <div className="p-3 rounded-xl bg-surface-container flex items-center justify-between">
            <div>
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block">
                Final amount due
              </span>
              <span className="font-headline-lg-mobile text-headline-lg-mobile text-primary font-bold">₹{job.total}</span>
            </div>
            <Chip tone="secondary" icon={Lock}>
              Zero Markups
            </Chip>
          </div>
          <div className="p-3 rounded-xl bg-primary-fixed/50 flex items-start gap-2.5">
            <IndianRupee size={18} className="text-primary shrink-0 mt-0.5" />
            <p className="text-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              <span className="font-semibold text-on-surface">90% (₹{job.workerShare})</span> goes directly to{' '}
              {ravi.name.split(' ')[0]}'s verified co-op wallet instantly. 10% (₹42) sustains emergency tool pools & the
              30-day warranty fund. <span className="font-semibold text-on-surface">0% corporate cut.</span>
            </p>
          </div>
        </Card>

        {/* Payment methods */}
        <Card className="gap-3">
          <div className="flex items-center justify-between">
            <h2 className="font-headline-sm text-headline-sm text-on-surface">Select payment method</h2>
            <Chip tone="secondary">Instant Settled</Chip>
          </div>
          <div className="flex flex-col gap-2.5">
            {METHODS.map(({ id, icon: Icon, title, sub }) => (
              <label
                key={id}
                className={`p-3 rounded-xl cursor-pointer flex items-center justify-between gap-3 shadow-e1 tap ${
                  method === id ? 'bg-primary-fixed/50' : 'bg-surface-container-low'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary shadow-e1 shrink-0">
                    <Icon size={19} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-label-lg text-label-lg text-on-surface font-semibold truncate">{title}</p>
                    <p className="text-body-sm text-body-sm text-on-surface-variant truncate">{sub}</p>
                  </div>
                </div>
                <input
                  type="radio"
                  name="payment-method"
                  checked={method === id}
                  onChange={() => setMethod(id)}
                  className="w-5 h-5 accent-[#4100b6] shrink-0"
                />
              </label>
            ))}
          </div>
          <div className="flex items-center gap-2 p-2 rounded-xl bg-surface-container-low">
            <span className="text-primary font-headline-md ml-1">@</span>
            <input
              placeholder="Enter UPI ID (e.g. mobile@okhdfcbank)"
              className="bg-transparent text-body-md text-body-md text-on-surface flex-1 outline-none min-w-0 placeholder:text-on-surface-variant/60"
            />
            <button
              onClick={() => toast('UPI ID verified')}
              className="px-3 py-1.5 rounded-full bg-primary-fixed text-primary font-label-sm text-label-sm font-semibold shrink-0 tap"
            >
              Verify
            </button>
          </div>
        </Card>

        {/* Pay CTA */}
        <div className="flex flex-col gap-2">
          <PillButton
            variant={paid ? 'secondary' : 'primary'}
            onClick={pay}
            disabled={paying || paid}
          >
            {paying ? (
              <>
                <Loader2 size={18} className="animate-spin" /> Securing transaction…
              </>
            ) : paid ? (
              <>
                <CheckCircle2 size={19} /> Payment of ₹{job.total} settled!
              </>
            ) : (
              <>
                <Lock size={17} /> Pay ₹{job.total} securely →
              </>
            )}
          </PillButton>
          <p className="flex items-center justify-center gap-1.5 text-label-sm text-label-sm text-on-surface-variant">
            <CheckCircle2 size={13} className="text-secondary" /> 256-bit encrypted · instant wallet settlement to{' '}
            {ravi.name}
          </p>
        </div>

        {/* Invoice */}
        {paid && (
          <Card className="rise gap-3">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-headline-sm text-headline-sm text-on-surface">Invoice & Warranty Certificate</h2>
                <span className="font-label-sm text-label-sm text-secondary font-semibold">
                  #{job.invoice} Ready
                </span>
              </div>
              <div className="w-9 h-9 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
                <Receipt size={17} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => toast('Invoice preview opened')}
                className="min-h-[44px] rounded-full bg-surface-container-low flex items-center justify-center gap-1.5 font-label-sm text-label-sm text-on-surface shadow-e1 tap"
              >
                <Eye size={16} className="text-primary" /> View invoice
              </button>
              <button
                onClick={() => toast('Invoice sent to email & WhatsApp', 'secondary')}
                className="min-h-[44px] rounded-full bg-surface-container-low flex items-center justify-center gap-1.5 font-label-sm text-label-sm text-on-surface shadow-e1 tap"
              >
                <Download size={16} className="text-primary" /> Download & share
              </button>
            </div>
            <p className="text-body-sm text-body-sm text-on-surface-variant text-center">
              Cryptographically signed invoice sent to your registered email & WhatsApp.
            </p>
            <PillButton variant="container" onClick={() => navigate('/app/feedback')}>
              Rate your service →
            </PillButton>
          </Card>
        )}
      </div>
    </AppShell>
  )
}
