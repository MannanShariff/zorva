import { useNavigate, useParams } from 'react-router-dom'
import { ArrowRight, BadgeCheck } from 'lucide-react'
import AppShell, { PageHeader } from '../../components/AppShell'
import { Chip, PillButton } from '../../components/ui'
import Passport from '../../components/Passport'
import { ravi } from '../../data/mock'

// Customer-facing read-only view of a worker's Living Skill Passport.
export default function PassportView() {
  const { workerId } = useParams()
  const navigate = useNavigate()
  const worker = workerId === 'ravi' ? ravi : ravi // single-persona demo

  return (
    <AppShell mode="customer" title="Skill Passport">
      <PageHeader
        title="Living Skill Passport™"
        sub={`ID: ${worker.passportId} · ${worker.name}`}
        chips={
          <>
            <Chip tone="secondary" icon={BadgeCheck}>
              Verified Credential
            </Chip>
          </>
        }
      />

      <div className="px-4 pb-8">
        <Passport readOnly />
        <div className="mt-4 flex flex-col gap-2">
          <PillButton onClick={() => navigate(-1)}>
            Back to matches <ArrowRight size={17} />
          </PillButton>
        </div>
      </div>
    </AppShell>
  )
}
