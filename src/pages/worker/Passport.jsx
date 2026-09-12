import AppShell, { PageHeader } from '../../components/AppShell'
import Passport from '../../components/Passport'
import { Chip } from '../../components/ui'
import { ravi } from '../../data/mock'

export default function WorkerPassport() {
  return (
    <AppShell mode="worker" title="Passport">
      <PageHeader
        title="Living Skill Passport™"
        sub={`ID: ${ravi.passportId} · your skills, permanently provable`}
        chips={
          <>
            <Chip tone="secondary" pulse>
              Skill DNA Active
            </Chip>
          </>
        }
      />
      <div className="px-4 pb-8">
        <Passport />
      </div>
    </AppShell>
  )
}
