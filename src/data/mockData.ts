import type { LucideIcon } from 'lucide-react';
import { FileWarning, FileText, HardHat, PackageCheck, ShieldCheck, Users } from 'lucide-react';

export type ReadinessCategory = 'Procurement' | 'Resources' | 'Startup' | 'Documentation' | 'Quality' | 'Issues';
export type ReadinessStatus = 'Red' | 'Yellow' | 'Green' | 'Gray';
export type ItemState = 'Not started' | 'In progress' | 'Waiting' | 'Complete';
export type MilestoneState = 'Complete' | 'Upcoming' | 'At risk';

export interface Milestone {
  id: string;
  name: string;
  date: string;
  state: MilestoneState;
  readinessGaps: string[];
}

export interface ReadinessItem {
  id: string;
  projectId: string;
  projectName: string;
  projectNumber: string;
  category: ReadinessCategory;
  title: string;
  owner: string;
  dueDate: string;
  actionRequired: string;
  latestUpdate: string;
  sourceReference?: string;
  state: ItemState;
  active: boolean;
  applicable: boolean;
}

export interface Project {
  id: string;
  projectNumber: string;
  name: string;
  client: string;
  location: string;
  manager: string;
  phase: string;
  contractValue: string;
  latestUpdate: string;
  riskSummary: string;
  milestones: Milestone[];
  readinessItems: ReadinessItem[];
  risks: ProjectRisk[];
  recentActivity: string[];
}

export interface ProjectRisk {
  id: string;
  projectId: string;
  projectName: string;
  projectNumber: string;
  title: string;
  category: ReadinessCategory | 'Schedule' | 'Commercial';
  likelihood: 'Low' | 'Medium' | 'High';
  impact: 'Medium' | 'High';
  owner: string;
  mitigation: string;
  trend: 'Stable' | 'Increasing';
}

export interface ResourceConstraint {
  id: string;
  area: string;
  constraint: string;
  window: string;
  affectedProjects: string[];
  severity: 'Red' | 'Yellow';
}

export interface CategorySummary {
  category: ReadinessCategory;
  icon: LucideIcon;
  red: number;
  yellow: number;
  green: number;
  gray: number;
  totalActive: number;
  attention: string;
}

export const today = new Date('2026-06-03T12:00:00');

export const readinessCategories: ReadinessCategory[] = [
  'Procurement',
  'Resources',
  'Startup',
  'Documentation',
  'Quality',
  'Issues',
];

export const categoryIcons: Record<ReadinessCategory, LucideIcon> = {
  Procurement: PackageCheck,
  Resources: Users,
  Startup: HardHat,
  Documentation: FileText,
  Quality: ShieldCheck,
  Issues: FileWarning,
};

const item = (
  project: Pick<Project, 'id' | 'name' | 'projectNumber'>,
  itemData: Omit<ReadinessItem, 'projectId' | 'projectName' | 'projectNumber'>,
): ReadinessItem => ({
  ...itemData,
  projectId: project.id,
  projectName: project.name,
  projectNumber: project.projectNumber,
});

const projectShells = [
  { id: 'elmhc-bundle-5', projectNumber: 'POC-2401', name: 'ELMHC Bundle 5' },
  { id: 'rolme-ls3', projectNumber: 'POC-2402', name: 'ROLME LS3' },
  { id: 'huntv-well-13', projectNumber: 'POC-2403', name: 'HUNTV Well 13' },
  { id: 'waukc-beechnut', projectNumber: 'POC-2404', name: 'WAUKC Beechnut' },
  { id: 'nppwd-pfas', projectNumber: 'POC-2405', name: 'NPPWD PFAS' },
];

export const projects: Project[] = [
  {
    ...projectShells[0],
    client: 'East Lake Municipal Health Campus',
    location: 'East Lake, TX',
    manager: 'Avery Grant',
    phase: 'Field mobilization',
    contractValue: '$8.4M',
    latestUpdate: 'Field teams are mobilized. Switchgear release and FAT planning are the two management items to clear this week.',
    riskSummary: 'Switchgear release and FAT planning are driving operational risk.',
    milestones: [
      { id: 'm-101', name: 'Award', date: '2026-04-22', state: 'Complete', readinessGaps: [] },
      { id: 'm-102', name: 'Kickoff', date: '2026-05-01', state: 'Complete', readinessGaps: [] },
      { id: 'm-103', name: 'Design', date: '2026-06-07', state: 'At risk', readinessGaps: ['Open design comments'] },
      { id: 'm-104', name: 'Procurement', date: '2026-07-12', state: 'Upcoming', readinessGaps: ['Switchgear PR approval'] },
      { id: 'm-105', name: 'FAT', date: '2026-07-28', state: 'Upcoming', readinessGaps: ['FAT requirement unconfirmed'] },
      { id: 'm-106', name: 'Startup', date: '2026-08-19', state: 'Upcoming', readinessGaps: ['Startup specialist not reserved'] },
      { id: 'm-107', name: 'Closeout', date: '2026-10-15', state: 'Upcoming', readinessGaps: [] },
    ],
    readinessItems: [
      item(projectShells[0], { id: 'RI-101', category: 'Procurement', title: 'Purchase request submitted', owner: 'Avery Grant', dueDate: '2026-06-06', actionRequired: 'Approve switchgear PR and confirm accounting code.', latestUpdate: 'PR is drafted with vendor quote attached.', sourceReference: 'Procurement SOP 2.3', state: 'In progress', active: true, applicable: true }),
      item(projectShells[0], { id: 'RI-102', category: 'Startup', title: 'FAT required determined', owner: 'Sam Rivera', dueDate: '2026-06-10', actionRequired: 'Confirm FAT requirement with controls lead and client.', latestUpdate: 'Controls package includes witness test language.', sourceReference: 'Startup Playbook FAT gate', state: 'Waiting', active: true, applicable: true }),
      item(projectShells[0], { id: 'RI-103', category: 'Resources', title: 'Startup resource assigned', owner: 'Jordan Patel', dueDate: '2026-06-25', actionRequired: 'Reserve startup specialist for August window.', latestUpdate: 'Resource manager has two available names.', state: 'Not started', active: true, applicable: true }),
      item(projectShells[0], { id: 'RI-104', category: 'Documentation', title: 'Design review complete', owner: 'Riley Chen', dueDate: '2026-06-04', actionRequired: 'Close final three design review comments.', latestUpdate: 'Two comments require engineer response.', sourceReference: 'Design Quality Checklist', state: 'In progress', active: true, applicable: true }),
      item(projectShells[0], { id: 'RI-105', category: 'Quality', title: 'Site readiness reviewed', owner: 'Avery Grant', dueDate: '2026-07-09', actionRequired: 'Schedule site readiness walk with superintendent.', latestUpdate: 'Walk not needed until procurement release is locked.', state: 'Not started', active: false, applicable: true }),
    ],
    risks: [
      { id: 'R-101', projectId: projectShells[0].id, projectName: projectShells[0].name, projectNumber: projectShells[0].projectNumber, title: 'FAT incomplete before procurement release', category: 'Startup', likelihood: 'Medium', impact: 'High', owner: 'Sam Rivera', mitigation: 'Confirm witness testing requirement and lock FAT window.', trend: 'Increasing' },
      { id: 'R-102', projectId: projectShells[0].id, projectName: projectShells[0].name, projectNumber: projectShells[0].projectNumber, title: 'Startup resource not assigned', category: 'Resources', likelihood: 'Medium', impact: 'High', owner: 'Jordan Patel', mitigation: 'Reserve August specialist from central pool.', trend: 'Stable' },
    ],
    recentActivity: ['Switchgear quote attached to procurement request.', 'Controls lead flagged FAT witness language.', 'Two design review comments were closed.'],
  },
  {
    ...projectShells[1],
    client: 'Rolme County Utilities',
    location: 'Rolme County, OK',
    manager: 'Nina Brooks',
    phase: 'Procurement release',
    contractValue: '$3.1M',
    latestUpdate: 'Pump package is driving risk. The team needs a vendor decision and client kickoff confirmation before next huddle.',
    riskSummary: 'Vendor decision is blocking procurement and startup planning.',
    milestones: [
      { id: 'm-201', name: 'Award', date: '2026-05-03', state: 'Complete', readinessGaps: [] },
      { id: 'm-202', name: 'Kickoff', date: '2026-06-05', state: 'At risk', readinessGaps: ['Transition meeting open'] },
      { id: 'm-203', name: 'Design', date: '2026-06-18', state: 'Upcoming', readinessGaps: ['Controls narrative due'] },
      { id: 'm-204', name: 'Procurement', date: '2026-07-02', state: 'Upcoming', readinessGaps: ['Pump vendor decision'] },
      { id: 'm-205', name: 'FAT', date: '2026-08-14', state: 'Upcoming', readinessGaps: ['FAT applicability unknown'] },
      { id: 'm-206', name: 'Startup', date: '2026-09-09', state: 'Upcoming', readinessGaps: ['Startup plan not drafted'] },
      { id: 'm-207', name: 'Closeout', date: '2026-11-01', state: 'Upcoming', readinessGaps: [] },
    ],
    readinessItems: [
      item(projectShells[1], { id: 'RI-201', category: 'Procurement', title: 'Long lead items identified', owner: 'Nina Brooks', dueDate: '2026-06-07', actionRequired: 'Decide whether pump package is early release.', latestUpdate: 'Two quotes received; third vendor has not responded.', sourceReference: 'Long Lead Procurement Standard', state: 'Waiting', active: true, applicable: true }),
      item(projectShells[1], { id: 'RI-202', category: 'Procurement', title: 'Purchase request submitted', owner: 'Nina Brooks', dueDate: '2026-06-12', actionRequired: 'Submit PR once vendor decision is made.', latestUpdate: 'PR shell exists but cannot route without award decision.', state: 'Not started', active: true, applicable: true }),
      item(projectShells[1], { id: 'RI-203', category: 'Startup', title: 'Startup plan complete', owner: 'Sam Rivera', dueDate: '2026-06-27', actionRequired: 'Draft startup sequence around controls narrative.', latestUpdate: 'Controls narrative due from design on Jun 14.', sourceReference: 'Startup Planning Standard', state: 'Not started', active: true, applicable: true }),
      item(projectShells[1], { id: 'RI-204', category: 'Documentation', title: 'Sales-to-PM transition meeting complete', owner: 'Nina Brooks', dueDate: '2026-06-04', actionRequired: 'Hold transition meeting and capture assumptions.', latestUpdate: 'Estimator is available Thursday afternoon.', state: 'In progress', active: true, applicable: true }),
      item(projectShells[1], { id: 'RI-205', category: 'Quality', title: 'FAT procedure complete', owner: 'Sam Rivera', dueDate: '2026-08-01', actionRequired: 'No action until FAT requirement is confirmed.', latestUpdate: 'FAT may not apply to selected pump package.', state: 'Not started', active: false, applicable: false }),
    ],
    risks: [
      { id: 'R-201', projectId: projectShells[1].id, projectName: projectShells[1].name, projectNumber: projectShells[1].projectNumber, title: 'Procurement delay from pump vendor decision', category: 'Procurement', likelihood: 'High', impact: 'High', owner: 'Nina Brooks', mitigation: 'Set decision date and prepare alternate quote path.', trend: 'Increasing' },
      { id: 'R-202', projectId: projectShells[1].id, projectName: projectShells[1].name, projectNumber: projectShells[1].projectNumber, title: 'Startup planning without controls narrative', category: 'Startup', likelihood: 'Medium', impact: 'Medium', owner: 'Sam Rivera', mitigation: 'Use draft design sequence for first-pass startup plan.', trend: 'Stable' },
    ],
    recentActivity: ['Third pump vendor missed quote response.', 'PR shell created but held from routing.', 'Estimator confirmed long-lead concern.'],
  },
  {
    ...projectShells[2],
    client: 'Hunt Valley Water Authority',
    location: 'Hunt Valley, NM',
    manager: 'Elena Wright',
    phase: 'Construction',
    contractValue: '$5.7M',
    latestUpdate: 'Construction is stable, but July technician availability and shipment tracking need planning before the month-end resource review.',
    riskSummary: 'July field staffing is tight around FAT and shipment tracking.',
    milestones: [
      { id: 'm-301', name: 'Award', date: '2026-03-28', state: 'Complete', readinessGaps: [] },
      { id: 'm-302', name: 'Kickoff', date: '2026-04-08', state: 'Complete', readinessGaps: [] },
      { id: 'm-303', name: 'Design', date: '2026-05-23', state: 'Complete', readinessGaps: [] },
      { id: 'm-304', name: 'Procurement', date: '2026-06-21', state: 'Upcoming', readinessGaps: ['VFD ship date pending'] },
      { id: 'm-305', name: 'FAT', date: '2026-07-15', state: 'Upcoming', readinessGaps: ['Controls witness unassigned'] },
      { id: 'm-306', name: 'Startup', date: '2026-08-05', state: 'Upcoming', readinessGaps: ['Technician double-booked'] },
      { id: 'm-307', name: 'Closeout', date: '2026-08-18', state: 'Upcoming', readinessGaps: [] },
    ],
    readinessItems: [
      item(projectShells[2], { id: 'RI-301', category: 'Resources', title: 'Startup resource assigned', owner: 'Elena Wright', dueDate: '2026-06-14', actionRequired: 'Confirm instrumentation technician availability for July.', latestUpdate: 'Shared technician is currently double-booked.', state: 'Waiting', active: true, applicable: true }),
      item(projectShells[2], { id: 'RI-302', category: 'Procurement', title: 'Shipment tracking confirmed', owner: 'Elena Wright', dueDate: '2026-06-20', actionRequired: 'Get VFD ship date from supplier.', latestUpdate: 'Supplier promised tracking by Jun 12.', state: 'In progress', active: true, applicable: true }),
      item(projectShells[2], { id: 'RI-303', category: 'Startup', title: 'FAT resources assigned', owner: 'Sam Rivera', dueDate: '2026-06-28', actionRequired: 'Assign controls witness for FAT date.', latestUpdate: 'FAT date is tentative pending VFD tracking.', state: 'Not started', active: true, applicable: true }),
      item(projectShells[2], { id: 'RI-304', category: 'Documentation', title: 'Design review complete', owner: 'Riley Chen', dueDate: '2026-05-22', actionRequired: 'No action required.', latestUpdate: 'Review closed with comments archived.', state: 'Complete', active: true, applicable: true }),
    ],
    risks: [
      { id: 'R-301', projectId: projectShells[2].id, projectName: projectShells[2].name, projectNumber: projectShells[2].projectNumber, title: 'Resource conflict for instrumentation technician', category: 'Resources', likelihood: 'High', impact: 'Medium', owner: 'Elena Wright', mitigation: 'Resolve shared technician booking before FAT assignments.', trend: 'Increasing' },
    ],
    recentActivity: ['Supplier committed to VFD tracking by Jun 12.', 'Design review closed and comments archived.', 'FAT date remains tentative.'],
  },
  {
    ...projectShells[3],
    client: 'Wauk County Public Works',
    location: 'Beechnut, KS',
    manager: 'Marcus Stone',
    phase: 'Design closeout',
    contractValue: '$6.2M',
    latestUpdate: 'Permit response and early-release valve boundaries are the current execution blockers. Design package can proceed after those decisions.',
    riskSummary: 'Permit response and valve release boundary are gating design closeout.',
    milestones: [
      { id: 'm-401', name: 'Award', date: '2026-05-12', state: 'Complete', readinessGaps: [] },
      { id: 'm-402', name: 'Kickoff', date: '2026-05-20', state: 'Complete', readinessGaps: [] },
      { id: 'm-403', name: 'Design', date: '2026-06-09', state: 'At risk', readinessGaps: ['Permit response matrix'] },
      { id: 'm-404', name: 'Procurement', date: '2026-07-18', state: 'Upcoming', readinessGaps: ['Valve release boundary'] },
      { id: 'm-405', name: 'FAT', date: '2026-08-11', state: 'Upcoming', readinessGaps: ['Controls test date tentative'] },
      { id: 'm-406', name: 'Startup', date: '2026-09-03', state: 'Upcoming', readinessGaps: [] },
      { id: 'm-407', name: 'Closeout', date: '2026-10-20', state: 'Upcoming', readinessGaps: [] },
    ],
    readinessItems: [
      item(projectShells[3], { id: 'RI-401', category: 'Documentation', title: 'Design review complete', owner: 'Marcus Stone', dueDate: '2026-06-06', actionRequired: 'Consolidate county permit response matrix.', latestUpdate: 'Responses live in three separate review logs.', sourceReference: 'Design Quality Checklist', state: 'In progress', active: true, applicable: true }),
      item(projectShells[3], { id: 'RI-402', category: 'Procurement', title: 'Long lead items identified', owner: 'Marcus Stone', dueDate: '2026-06-16', actionRequired: 'Decide early-release valve package boundaries.', latestUpdate: 'Estimator flagged potential valve lead time issue.', state: 'Not started', active: true, applicable: true }),
      item(projectShells[3], { id: 'RI-403', category: 'Issues', title: 'Client kickoff scheduled', owner: 'Marcus Stone', dueDate: '2026-06-03', actionRequired: 'Confirm recurring decision meeting with client.', latestUpdate: 'Client requested a new recurring time.', state: 'Waiting', active: true, applicable: true }),
      item(projectShells[3], { id: 'RI-404', category: 'Quality', title: 'Punchlist complete', owner: 'Riley Chen', dueDate: '2026-09-15', actionRequired: 'No action until construction work starts.', latestUpdate: 'Punchlist phase is not active.', state: 'Not started', active: false, applicable: true }),
    ],
    risks: [
      { id: 'R-401', projectId: projectShells[3].id, projectName: projectShells[3].name, projectNumber: projectShells[3].projectNumber, title: 'Design closeout slips from permit response churn', category: 'Documentation', likelihood: 'Medium', impact: 'High', owner: 'Marcus Stone', mitigation: 'Consolidate response matrix and assign single client approver.', trend: 'Increasing' },
    ],
    recentActivity: ['County permit comments consolidated from three logs.', 'Estimator flagged valve lead time exposure.', 'Client requested new recurring decision slot.'],
  },
  {
    ...projectShells[4],
    client: 'North Plains Public Water District',
    location: 'North Plains, CO',
    manager: 'Priya Shah',
    phase: 'Startup planning',
    contractValue: '$12.8M',
    latestUpdate: 'Startup is trending well. Documentation closeout and warranty letter timing need planning before the SAT window.',
    riskSummary: 'Startup path is stable; documentation timing needs attention.',
    milestones: [
      { id: 'm-501', name: 'Award', date: '2026-02-18', state: 'Complete', readinessGaps: [] },
      { id: 'm-502', name: 'Kickoff', date: '2026-02-28', state: 'Complete', readinessGaps: [] },
      { id: 'm-503', name: 'Design', date: '2026-04-24', state: 'Complete', readinessGaps: [] },
      { id: 'm-504', name: 'Procurement', date: '2026-06-02', state: 'Complete', readinessGaps: [] },
      { id: 'm-505', name: 'FAT', date: '2026-06-18', state: 'Upcoming', readinessGaps: ['Procedure approval'] },
      { id: 'm-506', name: 'Startup', date: '2026-07-08', state: 'Upcoming', readinessGaps: ['Sampling roles in plan'] },
      { id: 'm-507', name: 'Closeout', date: '2026-09-05', state: 'Upcoming', readinessGaps: ['Warranty letter draft'] },
    ],
    readinessItems: [
      item(projectShells[4], { id: 'RI-501', category: 'Documentation', title: 'Warranty letter sent', owner: 'Priya Shah', dueDate: '2026-06-17', actionRequired: 'Draft warranty letter for client review.', latestUpdate: 'Contract terms confirmed with legal.', state: 'Not started', active: true, applicable: true }),
      item(projectShells[4], { id: 'RI-502', category: 'Startup', title: 'Startup plan complete', owner: 'Priya Shah', dueDate: '2026-06-21', actionRequired: 'Add sampling roles to startup plan.', latestUpdate: 'Vendor rep and lab courier confirmed.', sourceReference: 'Startup Planning Standard', state: 'In progress', active: true, applicable: true }),
      item(projectShells[4], { id: 'RI-503', category: 'Quality', title: 'FAT procedure complete', owner: 'Sam Rivera', dueDate: '2026-06-08', actionRequired: 'Approve PFAS media skid FAT procedure.', latestUpdate: 'Procedure is in final technical review.', state: 'In progress', active: true, applicable: true }),
      item(projectShells[4], { id: 'RI-504', category: 'Documentation', title: 'Project closeout complete', owner: 'Riley Chen', dueDate: '2026-09-05', actionRequired: 'No current action required.', latestUpdate: 'Closeout phase opens after SAT.', state: 'Not started', active: false, applicable: true }),
    ],
    risks: [
      { id: 'R-501', projectId: projectShells[4].id, projectName: projectShells[4].name, projectNumber: projectShells[4].projectNumber, title: 'Warranty letter timing compresses SAT closeout', category: 'Documentation', likelihood: 'Medium', impact: 'Medium', owner: 'Priya Shah', mitigation: 'Draft warranty letter before FAT completion.', trend: 'Stable' },
    ],
    recentActivity: ['Legal confirmed warranty terms.', 'Vendor rep and lab courier confirmed.', 'FAT procedure moved to final technical review.'],
  },
];

export const readinessItems = projects.flatMap((project) => project.readinessItems);
export const risks = projects.flatMap((project) => project.risks);

export const resourceConstraints: ResourceConstraint[] = [
  { id: 'RC-1', area: 'Startup staffing', constraint: 'Two August startups competing for one specialist.', window: 'Aug 5 - Aug 19', affectedProjects: ['ELMHC Bundle 5', 'HUNTV Well 13'], severity: 'Red' },
  { id: 'RC-2', area: 'Controls engineering capacity', constraint: 'FAT witness coverage not assigned for July dates.', window: 'Jul 15 - Jul 28', affectedProjects: ['ELMHC Bundle 5', 'HUNTV Well 13'], severity: 'Yellow' },
  { id: 'RC-3', area: 'FAT scheduling conflicts', constraint: 'Pump package FAT applicability remains undecided.', window: 'Aug planning', affectedProjects: ['ROLME LS3'], severity: 'Yellow' },
];

const dayInMs = 1000 * 60 * 60 * 24;

export const daysUntil = (date: string) => Math.ceil((new Date(`${date}T12:00:00`).getTime() - today.getTime()) / dayInMs);

export const getReadinessStatus = (readinessItem: ReadinessItem): ReadinessStatus => {
  if (!readinessItem.applicable || !readinessItem.active) {
    return 'Gray';
  }

  if (readinessItem.state === 'Complete') {
    return 'Green';
  }

  const days = daysUntil(readinessItem.dueDate);

  if (days <= 7) {
    return 'Red';
  }

  if (days <= 30) {
    return 'Yellow';
  }

  return 'Green';
};

export const formatDate = (date: string) => new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(new Date(`${date}T12:00:00`));

export const getProjectById = (id: string | undefined) => projects.find((project) => project.id === id);

export const getUpcomingMilestones = (limit = 8) => projects
  .flatMap((project) => project.milestones.map((milestone) => ({ ...milestone, projectId: project.id, projectName: project.name, projectNumber: project.projectNumber, manager: project.manager })))
  .filter((milestone) => milestone.state !== 'Complete')
  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  .slice(0, limit);

export const getActionsRequired = (limit?: number) => {
  const actions = readinessItems
    .filter((item) => item.active && item.applicable && item.state !== 'Complete')
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

  return typeof limit === 'number' ? actions.slice(0, limit) : actions;
};

export const getCategorySummaries = (items = readinessItems): CategorySummary[] => readinessCategories.map((category) => {
  const categoryItems = items.filter((readinessItem) => readinessItem.category === category);
  const counts = categoryItems.reduce(
    (summary, readinessItem) => {
      summary[getReadinessStatus(readinessItem).toLowerCase() as Lowercase<ReadinessStatus>] += 1;
      return summary;
    },
    { red: 0, yellow: 0, green: 0, gray: 0 },
  );

  return {
    category,
    icon: categoryIcons[category],
    ...counts,
    totalActive: categoryItems.filter((readinessItem) => getReadinessStatus(readinessItem) !== 'Gray').length,
    attention: counts.red > 0 ? 'Action this week' : counts.yellow > 0 ? 'Plan this month' : 'No current attention',
  };
});

export const getProjectAttentionScore = (project: Project) => project.readinessItems.reduce((score, readinessItem) => {
  const status = getReadinessStatus(readinessItem);
  if (status === 'Red') return score + 3;
  if (status === 'Yellow') return score + 1;
  return score;
}, 0);
