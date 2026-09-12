import { useNavigate } from 'react-router-dom'
import { Briefcase, IndianRupee, MapPin, Timer } from 'lucide-react'
import AppShell, { PageHeader } from '../../components/AppShell'
import { Card, Chip, EmptyState, MatchScore } from '../../components/ui'
import { workerJobs } from '../../data/mock'

export default function WorkerJobs() {
  const navigate = useNavigate()
  return (
    <AppShell mode="worker" title="Jobs">
      <PageHeader
        title="Open opportunities"
        sub="Instant dispatch · fair guild rates · no bidding"
        chips={
          <>
            <Chip tone="secondary" pulse>
              Auto-Dispatch ON
            </Chip>
            <Chip tone="surface">{workerJobs.length} jobs</Chip>
          </>
        }
      />
      <div className="px-4 pb-8 flex flex-col gap-3">
        {workerJobs.map((j, i) => (
          <Card
            key={j.id}
            className={`gap-2.5 ${i === 0 ? 'border border-secondary/40' : ''}`}
            onClick={() => navigate(`/worker/job/${j.id}`)}
          >
            <div className="flex items-center justify-between">
              <MatchScore value={j.match} size="sm" />
              <span className="font-label-sm text-label-sm text-outline">#{j.id}</span>
            </div>
            <p className="font-label-lg text-label-lg text-on-surface font-semibold leading-snug">{j.title}</p>
            <p className="text-body-sm text-body-sm text-on-surface-variant italic">“{j.problem}”</p>
            <div className="flex items-center gap-3 text-body-sm text-body-sm text-on-surface-variant">
              <span className="flex items-center gap-1">
                <MapPin size={13} /> {j.distanceKm} km
              </span>
              <span className="flex items-center gap-1">
                <Timer size={13} /> {j.etaMin} min
              </span>
              <span className="flex items-center gap-1 text-secondary font-semibold">
                <IndianRupee size={13} /> {j.payout}
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {j.skills.map((s) => (
                <Chip key={s} tone="surface">
                  {s}
                </Chip>
              ))}
            </div>
          </Card>
        ))}
        <EmptyState
          icon={Briefcase}
          title="That's everything within 5 km"
          sub="New jobs appear here automatically — the AI matches them to your Skill DNA, never to bids."
        />
      </div>
    </AppShell>
  )
}
