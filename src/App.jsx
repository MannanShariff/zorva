// Route table — one coherent product across three journeys.
import Landing from './pages/Landing'

// Customer journey
import CustomerHome from './pages/customer/Home'
import RequestService from './pages/customer/Request'
import AiUnderstanding from './pages/customer/Understanding'
import Matches from './pages/customer/Matches'
import WhyMatch from './pages/customer/WhyMatch'
import Booking from './pages/customer/Booking'
import Tracking from './pages/customer/Tracking'
import Payment from './pages/customer/Payment'
import Feedback from './pages/customer/Feedback'
import PassportView from './pages/customer/PassportView'
import { Requests, Activity, Messages, CustomerProfile } from './pages/customer/Stubs'

// Worker journey
import WorkerHome from './pages/worker/Home'
import WorkerJobs from './pages/worker/Jobs'
import JobDetail from './pages/worker/JobDetail'
import EvidenceCapture from './pages/worker/Evidence'
import WorkerPassport from './pages/worker/Passport'
import PassportUpdated from './pages/worker/PassportUpdated'
import { Earnings, WorkerProfile } from './pages/worker/Stubs'

// Cooperative journey
import CoopIntelligence from './pages/coop/Intelligence'
import CoopAllocation from './pages/coop/Allocation'

export default [
  { path: '/', element: <Landing /> },

  // Customer
  { path: '/app/home', element: <CustomerHome /> },
  { path: '/app/request', element: <RequestService /> },
  { path: '/app/understanding', element: <AiUnderstanding /> },
  { path: '/app/matches', element: <Matches /> },
  { path: '/app/why-match', element: <WhyMatch /> },
  { path: '/app/booking', element: <Booking /> },
  { path: '/app/tracking', element: <Tracking /> },
  { path: '/app/payment', element: <Payment /> },
  { path: '/app/feedback', element: <Feedback /> },
  { path: '/app/passport/:workerId', element: <PassportView /> },
  { path: '/app/requests', element: <Requests /> },
  { path: '/app/activity', element: <Activity /> },
  { path: '/app/messages', element: <Messages /> },
  { path: '/app/profile', element: <CustomerProfile /> },

  // Worker
  { path: '/worker/home', element: <WorkerHome /> },
  { path: '/worker/jobs', element: <WorkerJobs /> },
  { path: '/worker/job/:id', element: <JobDetail /> },
  { path: '/worker/evidence', element: <EvidenceCapture /> },
  { path: '/worker/passport', element: <WorkerPassport /> },
  { path: '/worker/passport-updated', element: <PassportUpdated /> },
  { path: '/worker/earnings', element: <Earnings /> },
  { path: '/worker/profile', element: <WorkerProfile /> },

  // Cooperative
  { path: '/coop', element: <CoopIntelligence /> },
  { path: '/coop/allocation', element: <CoopAllocation /> },

  { path: '*', element: <Landing /> },
]
