// ─────────────────────────────────────────────────────────────
// ZORVA Intelligence — central mock data
// One coherent demo narrative: Ananya's ceiling-fan job #ZRV-JOB-942
// flows through every journey (Customer → Worker → Co-op).
// ─────────────────────────────────────────────────────────────

export const app = {
  name: 'ZORVA',
  tagline: 'Verified Skills. Real Opportunities. Stronger Cooperatives.',
  coop: 'Bengaluru South Co-op',
  node: 'Guild Node #04',
}

export const customer = {
  name: 'Ananya',
  fullName: 'Ananya Sharma',
  greeting: 'Good morning, Ananya 👋',
  location: 'Indiranagar 100ft Rd',
  area: 'Bengaluru East, 560038',
  flat: 'Flat 4B, Silver Oak Apts',
}

export const ravi = {
  id: 'ravi',
  name: 'Ravi Kumar',
  title: 'Master Electrician',
  level: 4,
  levelLabel: 'Level 4 Master',
  guild: 'Indiranagar Electrical Co-op Guild #04',
  memberSince: 'Aug 2022',
  equity: '4.2%',
  rating: 4.93,
  reviews: 142,
  completedJobs: 142,
  disputes: 0,
  match: 96,
  distanceKm: 2.4,
  etaMin: 24,
  trust: '99.4%',
  confidence: '99.2%',
  workProofs: 47,
  peerAudits: 3,
  warrantyRate: '100%',
  callbacks: 'Zero Callbacks (30d)',
  passportId: 'ZRV-EL-2024-8891',
  color: '#4100b6',
  skills: [
    {
      name: 'Electrical Wiring',
      level: 4,
      label: 'Advanced Master',
      confidence: 99,
      freshness: '8d ago',
      evidenceCount: 12,
      tags: ['3-Phase Circuitry', 'Concealed Conduit', 'Havells / Schneider DB'],
    },
    {
      name: 'Fault Diagnosis',
      level: 4,
      label: 'Master Specialist',
      confidence: 98,
      freshness: '12d ago',
      evidenceCount: 18,
      tags: ['Capacitor Testing', 'Short-Circuit Tripping', 'Motor Insulation'],
    },
    {
      name: 'Safety Compliance',
      level: 3,
      label: 'Certified',
      confidence: 96,
      freshness: '15d ago',
      evidenceCount: 9,
      tags: ['IS 732 Earthing', 'Surge Protection', 'PPE Compliance'],
    },
    {
      name: 'Appliance Repair',
      level: 3,
      label: 'Certified Technician',
      confidence: 94,
      freshness: '21d ago',
      evidenceCount: 8,
      tags: ['Ceiling Fan Regulators', 'Inverter PCB Repair'],
    },
  ],
  evidence: [
    {
      title: 'Fan Capacitor & Coil Stator',
      client: 'Ananya S.',
      note: 'Client sign-off · warranty activated',
      date: 'Sep 2026',
      tag: 'Customer Verified',
    },
    {
      title: 'Main DB Overload Rectification',
      client: 'Guild Peer Audit',
      note: 'Multimeter telemetry · peer consensus',
      date: 'Aug 2026',
      tag: 'Peer Audited',
    },
    {
      title: 'Guild Inspector Audit',
      client: 'M. Raghavan',
      note: 'Tamper-proof hash #IND-04-2024-9428',
      date: 'Aug 2026',
      tag: 'Inspector Signed',
    },
  ],
}

export const matches = [
  {
    worker: ravi,
    score: 96,
    rate: 199,
    reason: 'Level 4 Master Electrician · highest skill affinity for MCB, stator & inverter repair',
    eta: '24 min',
    jobsDone: 142,
  },
  {
    worker: {
      ...ravi,
      id: 'suresh',
      name: 'Suresh M.',
      title: 'Electrician',
      level: 3,
      levelLabel: 'Level 3 Senior',
      rating: 4.88,
      reviews: 89,
      color: '#006c4a',
      distanceKm: 1.1,
    },
    score: 87,
    rate: 199,
    reason: '89 verified repairs · strong capacitor & armature diagnostics',
    eta: '14 min',
    jobsDone: 89,
  },
  {
    worker: {
      ...ravi,
      id: 'imran',
      name: 'Imran Khan',
      title: 'Electrician',
      level: 4,
      levelLabel: 'Level 4 Master',
      rating: 4.95,
      reviews: 210,
      color: '#672a00',
      distanceKm: 4.8,
    },
    score: 80,
    rate: 199,
    reason: '210 verified repairs · copper winding specialist',
    eta: '38 min',
    jobsDone: 210,
  },
]

export const trustedWorkers = [
  {
    name: 'Rajesh Kumar',
    title: 'Master Electrician',
    level: 4,
    rating: 4.9,
    reviews: 142,
    certified: 'Skill DNA Certified',
    why: '98% skill affinity for MCB & inverter repairs',
    skills: 'Level 4 Master Electrician · High-Voltage Inverters · 3 Peer Certificates',
  },
  {
    name: 'Sunita Patil',
    title: 'RO & Water Specialist',
    level: 3,
    rating: 5.0,
    reviews: 89,
    certified: 'Skill DNA Certified',
    why: '97% skill affinity for RO purification & leaks',
    skills: 'Level 3 RO Specialist · Water Pressure Audits · 2 Peer Certificates',
  },
]

export const services = [
  { name: 'Electrician', price: 199, rating: 4.9, icon: 'zap' },
  { name: 'Plumber', price: 149, rating: 4.8, icon: 'droplets' },
  { name: 'Appliance Repair', price: 299, rating: 4.9, icon: 'wrench' },
  { name: 'Deep Cleaning', price: 399, rating: 4.9, icon: 'sparkles' },
]

export const job = {
  id: 'ZRV-JOB-942',
  title: 'Ceiling Fan Electrical Repair',
  problem: 'My ceiling fan stops working after 10 minutes.',
  diagnosis: 'Capacitor thermal cutoff or stator winding overheat detected',
  category: 'Electrical Repair',
  severity: 'Medium',
  estimate: '30–45 min',
  customerName: 'Ananya S.',
  address: 'Flat 4B, Palm Grove Apts',
  distanceKm: 2.4,
  etaMin: 24,
  onSiteMin: 60,
  match: 96,
  base: 199,
  extra: 180,
  hardware: 41,
  total: 420,
  workerShare: 378,
  otp: 4821,
  invoice: 'INV-ZRV-2024-942',
  lineItems: [
    { title: 'Service Estimate & Diagnosis', note: 'Capacitor check, terminal load balancing', amount: 199 },
    { title: 'Additional Work Approved', note: 'Stator winding desoldering & coil bench test', amount: 180 },
    { title: 'Guild Certified Hardware', note: 'Heavy duty 2.5µF capacitor (#CAP-849)', amount: 41 },
  ],
}

export const matchFormula = [
  { label: 'Skill Evidence', weight: 35, value: 100 },
  { label: 'Location & ETA', weight: 25, value: 92 },
  { label: 'Availability', weight: 20, value: 100 },
  { label: 'Reliability', weight: 10, value: 98 },
  { label: 'Fairness', weight: 10, value: 80 },
]

export const matchFactors = [
  { icon: 'zap', title: 'Skill Fit', value: '100%', detail: 'Level 4 Electrical Wiring + Fault Diagnosis — exact match for this job', tone: 'primary' },
  { icon: 'shield', title: 'Evidence Confidence', value: 'High · 98%', detail: '3 validated work outcomes, fresh evidence within the last 14 days', tone: 'secondary' },
  { icon: 'map-pin', title: 'Distance', value: '2.4 km · ETA 24 min', detail: 'Lowest carbon transit node in the corridor', tone: 'primary' },
  { icon: 'clock', title: 'Availability', value: 'Available now', detail: 'Instant dispatch active · shift until 6 PM', tone: 'tertiary' },
  { icon: 'star', title: 'Reliability', value: '4.93 / 5.0', detail: '142 completed co-op jobs · zero disputes', tone: 'secondary' },
  { icon: 'balance', title: 'Workload Fairness', value: 'Balanced', detail: '28 / 35 hrs this week — fair dispatch window open', tone: 'tertiary' },
]

export const workerJobs = [
  {
    id: 'ZRV-JOB-942',
    title: 'Electrical Repair — Ceiling Fan Stator / Tripping',
    match: 96,
    distanceKm: 2.4,
    etaMin: 24,
    payout: '₹380–₹450',
    skills: ['L4 Wiring', 'Capacitor Diagnostics'],
    problem: job.problem,
  },
  {
    id: 'ZRV-JOB-955',
    title: 'Panel Board Inspection — 3-Phase Load Audit',
    match: 91,
    distanceKm: 1.8,
    etaMin: 16,
    payout: '₹650',
    skills: ['L4 DB Panels', 'Thermal Meter'],
    problem: 'DB heating up when geyser runs on phase 2.',
  },
  {
    id: 'ZRV-JOB-961',
    title: 'Inverter Earthing Audit — Voltage Fluctuation',
    match: 88,
    distanceKm: 3.1,
    etaMin: 27,
    payout: '₹420',
    skills: ['L3 Earthing', 'IS 732'],
    problem: 'Inverter shows fluctuating output during monsoon.',
  },
]

export const workerStats = [
  { label: 'Co-op Jobs', value: '47', delta: '+4 this week', note: '100% warranty' },
  { label: 'AI Confidence', value: '99.2%', delta: 'L4 Master', note: 'Verified skill DNA' },
  { label: 'Trust Status', value: 'Verified', delta: 'Zero complaints', note: 'Guild audited' },
  { label: 'Earnings', value: '₹14,850', delta: '+18%', note: 'Dividend Friday' },
]

export const forecast = [
  {
    area: 'Whitefield',
    sub: 'East Hub',
    trade: 'Electrician',
    level: 'High Demand',
    tone: 'tertiary',
    window: 'Saturday evening · 6 PM – 10 PM',
    expected: '+42 expected requests',
    detail: 'Stator & circuit overload during peak evening grid shifts.',
    deficit: '-6 technicians',
  },
  {
    area: 'Indiranagar',
    sub: 'Central-East',
    trade: 'Plumber',
    level: 'Medium',
    tone: 'primary',
    window: 'Saturday afternoon · 1 PM – 5 PM',
    expected: '+18 expected requests',
    detail: 'Low-pressure booster installs & main line pressure audits.',
    deficit: '-2 technicians',
  },
  {
    area: 'Electronic City',
    sub: 'South Hub',
    trade: 'Appliance Repair',
    level: 'High Demand',
    tone: 'tertiary',
    window: 'Sunday · 10 AM – 6 PM',
    expected: '+29 expected requests',
    detail: 'Refrigerator inverter PCBs & microwave thermal failure.',
    deficit: '-5 technicians',
  },
]

export const allocations = [
  {
    worker: 'Ravi Kumar',
    level: 4,
    role: 'Master Electrician · 6.4 yr Guild Tenor',
    distance: '1.8 km',
    eta: '14 min',
    jobLabel: 'Job A: Ceiling Fan Stator Repair',
    place: 'Indiranagar 100ft',
    note: 'Skill Match: 99.5% · Optimal arterial bypass',
    tone: 'secondary',
  },
  {
    worker: 'Suresh Patil',
    level: 3,
    role: 'Hydraulics & Pipe Specialist · 4.1 yr Tenor',
    distance: '2.4 km',
    eta: '18 min',
    jobLabel: 'Job B: Main Line Pressure Valve',
    place: 'Domlur Layout',
    note: 'Zero dead mileage · Direct adjacent return node',
    tone: 'neutral',
  },
  {
    worker: 'Imran Baig',
    level: 4,
    role: 'Appliance & PCB Diagnostics · 5.8 yr Tenor',
    distance: '3.1 km',
    eta: '21 min',
    jobLabel: 'Job C: Inverter PCB Diagnostics',
    place: 'Koramangala 4th Block',
    note: 'Fatigue Guard Verified · High complexity dividend match',
    tone: 'secondary',
  },
]

export const notifications = [
  { title: 'Job #ZRV-JOB-942 matched', detail: 'Ravi Kumar · 96% skill match · ETA 24 min', time: '2m', tone: 'primary' },
  { title: 'Co-op dividend credited', detail: '₹1,240 added to your guild wallet', time: '1h', tone: 'secondary' },
  { title: 'Demand surge near you', detail: 'Electrical demand peak 6–9 PM · stand by at 100ft Rd', time: '3h', tone: 'tertiary' },
]

export const timeline = [
  { title: 'Job Confirmed', time: '10:14', note: '₹199 locked in escrow', done: true },
  { title: 'Technician Matched', time: '10:15', note: 'Skill DNA routing · Ravi Kumar', done: true },
  { title: 'On the Way', time: 'Now', note: 'Navigating via 100ft Road', active: true },
  { title: 'Arrival & OTP Check-in', time: '~10:35', note: 'Share OTP 4821 at the door' },
  { title: 'Digital Completion', time: 'Pending', note: 'Sign-off · dividend · 30-day warranty' },
]

export const activity = [
  { title: 'Ceiling Fan Repair', sub: 'Ravi Kumar · ₹420 · 5.0★', date: 'Today', tone: 'secondary' },
  { title: 'Inverter Health Check', sub: 'Imran Khan · ₹299 · 4.8★', date: 'Sep 2', tone: 'primary' },
  { title: 'RO Filter Replacement', sub: 'Sunita Patil · ₹349 · 5.0★', date: 'Aug 21', tone: 'secondary' },
]
