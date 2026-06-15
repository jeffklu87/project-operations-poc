import type { LucideIcon } from 'lucide-react';
import { FileWarning, FileText, HardHat, PackageCheck, ShieldCheck, Users } from 'lucide-react';

export type ReadinessCategory = 'Procurement' | 'Resources' | 'Startup' | 'Documentation' | 'Quality' | 'Issues';
export type ReadinessStatus = 'Red' | 'Yellow' | 'Green' | 'Gray';
export type ItemState = 'Not started' | 'In progress' | 'Waiting' | 'Complete';
export type MilestoneState = 'Complete' | 'Upcoming' | 'At risk' | 'Blocked' | 'Not Active';
export type DeliverableState = 'Complete' | 'Upcoming' | 'At risk' | 'Missing';
export type QualityGateStatus = 'Red' | 'Yellow' | 'Green' | 'Upcoming';
export type WorkAreaState = 'Attention' | 'Planning' | 'Healthy';

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
  milestoneId: string;
  milestoneName: string;
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
  deliverables: Deliverable[];
  qualityGates: QualityGate[];
}

export interface Deliverable {
  id: string;
  name: string;
  milestoneId: string;
  milestoneName: string;
  owner: string;
  dueDate?: string;
  state: DeliverableState;
}

export interface QualityGate {
  id: string;
  name: string;
  milestoneId: string;
  milestoneName: string;
  qaqcEligible: boolean;
  status: QualityGateStatus;
  vpEntryNeeded: 'Yes' | 'Future' | 'No';
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
  milestoneImpact: string[];
}

export interface ResourceConstraint {
  id: string;
  area: string;
  constraint: string;
  window: string;
  affectedProjects: string[];
  severity: 'Red' | 'Yellow';
}

export interface OperatingModule {
  id: string;
  name: string;
  decisionSupported: string;
  signals: string[];
  output: string;
  status: 'Active' | 'Planning' | 'Watch';
}

export interface WorkArea {
  id: string;
  projectId: string;
  name: string;
  owner: string;
  state: WorkAreaState;
  currentFocus: string;
  nextMilestone: string;
  attentionReason: string;
  milestones: string[];
  blockers: string[];
  actions: string[];
  risks: string[];
  decisions: string[];
  unknowns: string[];
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
  { id: 'nssd1-pfas', projectNumber: 'POC-2405', name: 'NSSD1 PFAS' },
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
      item(projectShells[0], { id: 'RI-101', category: 'Procurement', milestoneId: 'm-104', milestoneName: 'Procurement', title: 'Purchase request submitted', owner: 'Avery Grant', dueDate: '2026-06-06', actionRequired: 'Approve switchgear PR and confirm accounting code.', latestUpdate: 'PR is drafted with vendor quote attached.', sourceReference: 'Procurement SOP 2.3', state: 'In progress', active: true, applicable: true }),
      item(projectShells[0], { id: 'RI-102', category: 'Startup', milestoneId: 'm-105', milestoneName: 'FAT', title: 'FAT required determined', owner: 'Sam Rivera', dueDate: '2026-06-10', actionRequired: 'Confirm FAT requirement with controls lead and client.', latestUpdate: 'Controls package includes witness test language.', sourceReference: 'Startup Playbook FAT gate', state: 'Waiting', active: true, applicable: true }),
      item(projectShells[0], { id: 'RI-103', category: 'Resources', milestoneId: 'm-106', milestoneName: 'Startup', title: 'Startup resource assigned', owner: 'Jordan Patel', dueDate: '2026-06-25', actionRequired: 'Reserve startup specialist for August window.', latestUpdate: 'Resource manager has two available names.', state: 'Not started', active: true, applicable: true }),
      item(projectShells[0], { id: 'RI-104', category: 'Documentation', milestoneId: 'm-103', milestoneName: 'Design', title: 'Design review complete', owner: 'Riley Chen', dueDate: '2026-06-04', actionRequired: 'Close final three design review comments.', latestUpdate: 'Two comments require engineer response.', sourceReference: 'Design Quality Checklist', state: 'In progress', active: true, applicable: true }),
      item(projectShells[0], { id: 'RI-105', category: 'Quality', milestoneId: 'm-106', milestoneName: 'Startup', title: 'Site readiness reviewed', owner: 'Avery Grant', dueDate: '2026-07-09', actionRequired: 'Schedule site readiness walk with superintendent.', latestUpdate: 'Walk not needed until procurement release is locked.', state: 'Not started', active: false, applicable: true }),
    ],
    risks: [
      { id: 'R-101', projectId: projectShells[0].id, projectName: projectShells[0].name, projectNumber: projectShells[0].projectNumber, title: 'FAT incomplete before procurement release', category: 'Startup', likelihood: 'Medium', impact: 'High', owner: 'Sam Rivera', mitigation: 'Confirm witness testing requirement and lock FAT window.', trend: 'Increasing', milestoneImpact: ['FAT', 'Startup'] },
      { id: 'R-102', projectId: projectShells[0].id, projectName: projectShells[0].name, projectNumber: projectShells[0].projectNumber, title: 'Startup resource not assigned', category: 'Resources', likelihood: 'Medium', impact: 'High', owner: 'Jordan Patel', mitigation: 'Reserve August specialist from central pool.', trend: 'Stable', milestoneImpact: ['Startup'] },
    ],
    recentActivity: ['Switchgear quote attached to procurement request.', 'Controls lead flagged FAT witness language.', 'Two design review comments were closed.'],
    deliverables: [
      { id: 'D-101', name: 'Control Description', milestoneId: 'm-103', milestoneName: 'Design', owner: 'Riley Chen', dueDate: '2026-06-04', state: 'At risk' },
      { id: 'D-102', name: 'Network Diagram', milestoneId: 'm-103', milestoneName: 'Design', owner: 'Avery Grant', state: 'Complete' },
      { id: 'D-103', name: 'Panel Drawings', milestoneId: 'm-104', milestoneName: 'Procurement', owner: 'Riley Chen', dueDate: '2026-06-10', state: 'Upcoming' },
      { id: 'D-104', name: 'FAT Procedure', milestoneId: 'm-105', milestoneName: 'FAT', owner: 'Sam Rivera', dueDate: '2026-06-18', state: 'At risk' },
      { id: 'D-105', name: 'Startup Plan', milestoneId: 'm-106', milestoneName: 'Startup', owner: 'Jordan Patel', dueDate: '2026-07-24', state: 'Upcoming' },
      { id: 'D-106', name: 'O&M / Closeout Package', milestoneId: 'm-107', milestoneName: 'Closeout', owner: 'Riley Chen', dueDate: '2026-09-15', state: 'Upcoming' },
    ],
    qualityGates: [
      { id: 'Q-101', name: 'Design Review Signoff', milestoneId: 'm-103', milestoneName: 'Design', qaqcEligible: true, status: 'Red', vpEntryNeeded: 'Yes' },
      { id: 'Q-102', name: 'FAT Procedure Approval', milestoneId: 'm-105', milestoneName: 'FAT', qaqcEligible: true, status: 'Yellow', vpEntryNeeded: 'Future' },
      { id: 'Q-103', name: 'Startup Readiness Review', milestoneId: 'm-106', milestoneName: 'Startup', qaqcEligible: true, status: 'Upcoming', vpEntryNeeded: 'Future' },
    ],
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
      item(projectShells[1], { id: 'RI-201', category: 'Procurement', milestoneId: 'm-204', milestoneName: 'Procurement', title: 'Long lead items identified', owner: 'Nina Brooks', dueDate: '2026-06-07', actionRequired: 'Decide whether pump package is early release.', latestUpdate: 'Two quotes received; third vendor has not responded.', sourceReference: 'Long Lead Procurement Standard', state: 'Waiting', active: true, applicable: true }),
      item(projectShells[1], { id: 'RI-202', category: 'Procurement', milestoneId: 'm-204', milestoneName: 'Procurement', title: 'Purchase request submitted', owner: 'Nina Brooks', dueDate: '2026-06-12', actionRequired: 'Submit PR once vendor decision is made.', latestUpdate: 'PR shell exists but cannot route without award decision.', state: 'Not started', active: true, applicable: true }),
      item(projectShells[1], { id: 'RI-203', category: 'Startup', milestoneId: 'm-206', milestoneName: 'Startup', title: 'Startup plan complete', owner: 'Sam Rivera', dueDate: '2026-06-27', actionRequired: 'Draft startup sequence around controls narrative.', latestUpdate: 'Controls narrative due from design on Jun 14.', sourceReference: 'Startup Planning Standard', state: 'Not started', active: true, applicable: true }),
      item(projectShells[1], { id: 'RI-204', category: 'Documentation', milestoneId: 'm-202', milestoneName: 'Kickoff', title: 'Sales-to-PM transition meeting complete', owner: 'Nina Brooks', dueDate: '2026-06-04', actionRequired: 'Hold transition meeting and capture assumptions.', latestUpdate: 'Estimator is available Thursday afternoon.', state: 'In progress', active: true, applicable: true }),
      item(projectShells[1], { id: 'RI-205', category: 'Quality', milestoneId: 'm-205', milestoneName: 'FAT', title: 'FAT procedure complete', owner: 'Sam Rivera', dueDate: '2026-08-01', actionRequired: 'No action until FAT requirement is confirmed.', latestUpdate: 'FAT may not apply to selected pump package.', state: 'Not started', active: false, applicable: false }),
    ],
    risks: [
      { id: 'R-201', projectId: projectShells[1].id, projectName: projectShells[1].name, projectNumber: projectShells[1].projectNumber, title: 'Procurement delay from pump vendor decision', category: 'Procurement', likelihood: 'High', impact: 'High', owner: 'Nina Brooks', mitigation: 'Set decision date and prepare alternate quote path.', trend: 'Increasing', milestoneImpact: ['Procurement', 'Startup'] },
      { id: 'R-202', projectId: projectShells[1].id, projectName: projectShells[1].name, projectNumber: projectShells[1].projectNumber, title: 'Startup planning without controls narrative', category: 'Startup', likelihood: 'Medium', impact: 'Medium', owner: 'Sam Rivera', mitigation: 'Use draft design sequence for first-pass startup plan.', trend: 'Stable', milestoneImpact: ['Startup'] },
    ],
    recentActivity: ['Third pump vendor missed quote response.', 'PR shell created but held from routing.', 'Estimator confirmed long-lead concern.'],
    deliverables: [
      { id: 'D-201', name: 'Control Description', milestoneId: 'm-203', milestoneName: 'Design', owner: 'Riley Chen', dueDate: '2026-06-14', state: 'Upcoming' },
      { id: 'D-202', name: 'Network Diagram', milestoneId: 'm-203', milestoneName: 'Design', owner: 'Nina Brooks', dueDate: '2026-06-18', state: 'Upcoming' },
      { id: 'D-203', name: 'Panel Drawings', milestoneId: 'm-204', milestoneName: 'Procurement', owner: 'Riley Chen', dueDate: '2026-06-21', state: 'Upcoming' },
      { id: 'D-204', name: 'FAT Procedure', milestoneId: 'm-205', milestoneName: 'FAT', owner: 'Sam Rivera', dueDate: '2026-08-01', state: 'Missing' },
      { id: 'D-205', name: 'Startup Plan', milestoneId: 'm-206', milestoneName: 'Startup', owner: 'Sam Rivera', dueDate: '2026-06-27', state: 'At risk' },
      { id: 'D-206', name: 'O&M / Closeout Package', milestoneId: 'm-207', milestoneName: 'Closeout', owner: 'Nina Brooks', dueDate: '2026-10-15', state: 'Upcoming' },
    ],
    qualityGates: [
      { id: 'Q-201', name: 'Transition Acceptance', milestoneId: 'm-202', milestoneName: 'Kickoff', qaqcEligible: false, status: 'Red', vpEntryNeeded: 'No' },
      { id: 'Q-202', name: 'FAT Applicability Review', milestoneId: 'm-205', milestoneName: 'FAT', qaqcEligible: true, status: 'Yellow', vpEntryNeeded: 'Future' },
      { id: 'Q-203', name: 'Startup Readiness Review', milestoneId: 'm-206', milestoneName: 'Startup', qaqcEligible: true, status: 'Upcoming', vpEntryNeeded: 'Future' },
    ],
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
      item(projectShells[2], { id: 'RI-301', category: 'Resources', milestoneId: 'm-306', milestoneName: 'Startup', title: 'Startup resource assigned', owner: 'Elena Wright', dueDate: '2026-06-14', actionRequired: 'Confirm instrumentation technician availability for July.', latestUpdate: 'Shared technician is currently double-booked.', state: 'Waiting', active: true, applicable: true }),
      item(projectShells[2], { id: 'RI-302', category: 'Procurement', milestoneId: 'm-304', milestoneName: 'Procurement', title: 'Shipment tracking confirmed', owner: 'Elena Wright', dueDate: '2026-06-20', actionRequired: 'Get VFD ship date from supplier.', latestUpdate: 'Supplier promised tracking by Jun 12.', state: 'In progress', active: true, applicable: true }),
      item(projectShells[2], { id: 'RI-303', category: 'Startup', milestoneId: 'm-305', milestoneName: 'FAT', title: 'FAT resources assigned', owner: 'Sam Rivera', dueDate: '2026-06-28', actionRequired: 'Assign controls witness for FAT date.', latestUpdate: 'FAT date is tentative pending VFD tracking.', state: 'Not started', active: true, applicable: true }),
      item(projectShells[2], { id: 'RI-304', category: 'Documentation', milestoneId: 'm-303', milestoneName: 'Design', title: 'Design review complete', owner: 'Riley Chen', dueDate: '2026-05-22', actionRequired: 'No action required.', latestUpdate: 'Review closed with comments archived.', state: 'Complete', active: true, applicable: true }),
    ],
    risks: [
      { id: 'R-301', projectId: projectShells[2].id, projectName: projectShells[2].name, projectNumber: projectShells[2].projectNumber, title: 'Resource conflict for instrumentation technician', category: 'Resources', likelihood: 'High', impact: 'Medium', owner: 'Elena Wright', mitigation: 'Resolve shared technician booking before FAT assignments.', trend: 'Increasing', milestoneImpact: ['FAT', 'Startup'] },
    ],
    recentActivity: ['Supplier committed to VFD tracking by Jun 12.', 'Design review closed and comments archived.', 'FAT date remains tentative.'],
    deliverables: [
      { id: 'D-301', name: 'Control Description', milestoneId: 'm-303', milestoneName: 'Design', owner: 'Riley Chen', state: 'Complete' },
      { id: 'D-302', name: 'Network Diagram', milestoneId: 'm-303', milestoneName: 'Design', owner: 'Riley Chen', state: 'Complete' },
      { id: 'D-303', name: 'Panel Drawings', milestoneId: 'm-304', milestoneName: 'Procurement', owner: 'Elena Wright', dueDate: '2026-06-21', state: 'Upcoming' },
      { id: 'D-304', name: 'FAT Procedure', milestoneId: 'm-305', milestoneName: 'FAT', owner: 'Sam Rivera', dueDate: '2026-07-08', state: 'Upcoming' },
      { id: 'D-305', name: 'Startup Plan', milestoneId: 'm-306', milestoneName: 'Startup', owner: 'Elena Wright', dueDate: '2026-07-24', state: 'Upcoming' },
      { id: 'D-306', name: 'O&M / Closeout Package', milestoneId: 'm-307', milestoneName: 'Closeout', owner: 'Riley Chen', dueDate: '2026-08-10', state: 'Upcoming' },
    ],
    qualityGates: [
      { id: 'Q-301', name: 'Procurement Release Check', milestoneId: 'm-304', milestoneName: 'Procurement', qaqcEligible: false, status: 'Yellow', vpEntryNeeded: 'No' },
      { id: 'Q-302', name: 'FAT Witness Assignment', milestoneId: 'm-305', milestoneName: 'FAT', qaqcEligible: true, status: 'Yellow', vpEntryNeeded: 'Future' },
      { id: 'Q-303', name: 'Startup Readiness Review', milestoneId: 'm-306', milestoneName: 'Startup', qaqcEligible: true, status: 'Red', vpEntryNeeded: 'Future' },
    ],
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
      item(projectShells[3], { id: 'RI-401', category: 'Documentation', milestoneId: 'm-403', milestoneName: 'Design', title: 'Design review complete', owner: 'Marcus Stone', dueDate: '2026-06-06', actionRequired: 'Consolidate county permit response matrix.', latestUpdate: 'Responses live in three separate review logs.', sourceReference: 'Design Quality Checklist', state: 'In progress', active: true, applicable: true }),
      item(projectShells[3], { id: 'RI-402', category: 'Procurement', milestoneId: 'm-404', milestoneName: 'Procurement', title: 'Long lead items identified', owner: 'Marcus Stone', dueDate: '2026-06-16', actionRequired: 'Decide early-release valve package boundaries.', latestUpdate: 'Estimator flagged potential valve lead time issue.', state: 'Not started', active: true, applicable: true }),
      item(projectShells[3], { id: 'RI-403', category: 'Issues', milestoneId: 'm-403', milestoneName: 'Design', title: 'Client kickoff scheduled', owner: 'Marcus Stone', dueDate: '2026-06-03', actionRequired: 'Confirm recurring decision meeting with client.', latestUpdate: 'Client requested a new recurring time.', state: 'Waiting', active: true, applicable: true }),
      item(projectShells[3], { id: 'RI-404', category: 'Quality', milestoneId: 'm-406', milestoneName: 'Startup', title: 'Punchlist complete', owner: 'Riley Chen', dueDate: '2026-09-15', actionRequired: 'No action until construction work starts.', latestUpdate: 'Punchlist phase is not active.', state: 'Not started', active: false, applicable: true }),
    ],
    risks: [
      { id: 'R-401', projectId: projectShells[3].id, projectName: projectShells[3].name, projectNumber: projectShells[3].projectNumber, title: 'Design closeout slips from permit response churn', category: 'Documentation', likelihood: 'Medium', impact: 'High', owner: 'Marcus Stone', mitigation: 'Consolidate response matrix and assign single client approver.', trend: 'Increasing', milestoneImpact: ['Design', 'Procurement'] },
    ],
    recentActivity: ['County permit comments consolidated from three logs.', 'Estimator flagged valve lead time exposure.', 'Client requested new recurring decision slot.'],
    deliverables: [
      { id: 'D-401', name: 'Control Description', milestoneId: 'm-403', milestoneName: 'Design', owner: 'Marcus Stone', dueDate: '2026-06-06', state: 'At risk' },
      { id: 'D-402', name: 'Network Diagram', milestoneId: 'm-403', milestoneName: 'Design', owner: 'Riley Chen', dueDate: '2026-06-09', state: 'Upcoming' },
      { id: 'D-403', name: 'Panel Drawings', milestoneId: 'm-404', milestoneName: 'Procurement', owner: 'Marcus Stone', dueDate: '2026-06-20', state: 'Upcoming' },
      { id: 'D-404', name: 'FAT Procedure', milestoneId: 'm-405', milestoneName: 'FAT', owner: 'Sam Rivera', dueDate: '2026-07-28', state: 'Upcoming' },
      { id: 'D-405', name: 'Startup Plan', milestoneId: 'm-406', milestoneName: 'Startup', owner: 'Marcus Stone', dueDate: '2026-08-12', state: 'Upcoming' },
      { id: 'D-406', name: 'O&M / Closeout Package', milestoneId: 'm-407', milestoneName: 'Closeout', owner: 'Riley Chen', dueDate: '2026-10-02', state: 'Upcoming' },
    ],
    qualityGates: [
      { id: 'Q-401', name: 'Design Review Signoff', milestoneId: 'm-403', milestoneName: 'Design', qaqcEligible: true, status: 'Red', vpEntryNeeded: 'Yes' },
      { id: 'Q-402', name: 'Procurement Release Check', milestoneId: 'm-404', milestoneName: 'Procurement', qaqcEligible: false, status: 'Yellow', vpEntryNeeded: 'No' },
      { id: 'Q-403', name: 'Startup Readiness Review', milestoneId: 'm-406', milestoneName: 'Startup', qaqcEligible: true, status: 'Upcoming', vpEntryNeeded: 'Future' },
    ],
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
      item(projectShells[4], { id: 'RI-501', category: 'Documentation', milestoneId: 'm-507', milestoneName: 'Closeout', title: 'Warranty letter sent', owner: 'Priya Shah', dueDate: '2026-06-17', actionRequired: 'Draft warranty letter for client review.', latestUpdate: 'Contract terms confirmed with legal.', state: 'Not started', active: true, applicable: true }),
      item(projectShells[4], { id: 'RI-502', category: 'Startup', milestoneId: 'm-506', milestoneName: 'Startup', title: 'Startup plan complete', owner: 'Priya Shah', dueDate: '2026-06-21', actionRequired: 'Add sampling roles to startup plan.', latestUpdate: 'Vendor rep and lab courier confirmed.', sourceReference: 'Startup Planning Standard', state: 'In progress', active: true, applicable: true }),
      item(projectShells[4], { id: 'RI-503', category: 'Quality', milestoneId: 'm-505', milestoneName: 'FAT', title: 'FAT procedure complete', owner: 'Sam Rivera', dueDate: '2026-06-08', actionRequired: 'Approve PFAS media skid FAT procedure.', latestUpdate: 'Procedure is in final technical review.', state: 'In progress', active: true, applicable: true }),
      item(projectShells[4], { id: 'RI-504', category: 'Documentation', milestoneId: 'm-507', milestoneName: 'Closeout', title: 'Project closeout complete', owner: 'Riley Chen', dueDate: '2026-09-05', actionRequired: 'No current action required.', latestUpdate: 'Closeout phase opens after SAT.', state: 'Not started', active: false, applicable: true }),
    ],
    risks: [
      { id: 'R-501', projectId: projectShells[4].id, projectName: projectShells[4].name, projectNumber: projectShells[4].projectNumber, title: 'Warranty letter timing compresses SAT closeout', category: 'Documentation', likelihood: 'Medium', impact: 'Medium', owner: 'Priya Shah', mitigation: 'Draft warranty letter before FAT completion.', trend: 'Stable', milestoneImpact: ['Startup', 'Closeout'] },
    ],
    recentActivity: ['Legal confirmed warranty terms.', 'Vendor rep and lab courier confirmed.', 'FAT procedure moved to final technical review.'],
    deliverables: [
      { id: 'D-501', name: 'Control Description', milestoneId: 'm-503', milestoneName: 'Design', owner: 'Riley Chen', state: 'Complete' },
      { id: 'D-502', name: 'Network Diagram', milestoneId: 'm-503', milestoneName: 'Design', owner: 'Riley Chen', state: 'Complete' },
      { id: 'D-503', name: 'Panel Drawings', milestoneId: 'm-504', milestoneName: 'Procurement', owner: 'Priya Shah', state: 'Complete' },
      { id: 'D-504', name: 'FAT Procedure', milestoneId: 'm-505', milestoneName: 'FAT', owner: 'Sam Rivera', dueDate: '2026-06-08', state: 'At risk' },
      { id: 'D-505', name: 'Startup Plan', milestoneId: 'm-506', milestoneName: 'Startup', owner: 'Priya Shah', dueDate: '2026-06-21', state: 'Upcoming' },
      { id: 'D-506', name: 'O&M / Closeout Package', milestoneId: 'm-507', milestoneName: 'Closeout', owner: 'Riley Chen', dueDate: '2026-09-05', state: 'Upcoming' },
    ],
    qualityGates: [
      { id: 'Q-501', name: 'FAT Procedure Approval', milestoneId: 'm-505', milestoneName: 'FAT', qaqcEligible: true, status: 'Red', vpEntryNeeded: 'Yes' },
      { id: 'Q-502', name: 'Startup Readiness Review', milestoneId: 'm-506', milestoneName: 'Startup', qaqcEligible: true, status: 'Yellow', vpEntryNeeded: 'Future' },
      { id: 'Q-503', name: 'Closeout Compliance Package', milestoneId: 'm-507', milestoneName: 'Closeout', qaqcEligible: true, status: 'Upcoming', vpEntryNeeded: 'Future' },
    ],
  },
];

export const readinessItems = projects.flatMap((project) => project.readinessItems);
export const risks = projects.flatMap((project) => project.risks);

export const resourceConstraints: ResourceConstraint[] = [
  { id: 'RC-1', area: 'Startup staffing', constraint: 'Two August startups competing for one specialist.', window: 'Aug 5 - Aug 19', affectedProjects: ['ELMHC Bundle 5', 'HUNTV Well 13'], severity: 'Red' },
  { id: 'RC-2', area: 'Controls engineering capacity', constraint: 'FAT witness coverage not assigned for July dates.', window: 'Jul 15 - Jul 28', affectedProjects: ['ELMHC Bundle 5', 'HUNTV Well 13'], severity: 'Yellow' },
  { id: 'RC-3', area: 'FAT scheduling conflicts', constraint: 'Pump package FAT applicability remains undecided.', window: 'Aug planning', affectedProjects: ['ROLME LS3'], severity: 'Yellow' },
];

export const operatingModules: OperatingModule[] = [
  {
    id: 'project-intelligence',
    name: 'Project Intelligence',
    decisionSupported: 'What am I missing?',
    signals: ['Meeting analysis', 'Procurement analysis', 'Site report analysis', 'Design review analysis'],
    output: 'Suggested actions, missing readiness items, and milestone impacts.',
    status: 'Planning',
  },
  {
    id: 'fat-readiness',
    name: 'FAT Readiness',
    decisionSupported: 'Can we successfully execute FAT?',
    signals: ['FAT readiness score', 'Open FAT gaps', 'Witness planning', 'Test procedures'],
    output: 'FAT blockers, witness gaps, and procedure approval needs.',
    status: 'Active',
  },
  {
    id: 'startup-readiness',
    name: 'Startup Readiness',
    decisionSupported: 'Can we successfully startup?',
    signals: ['Resource readiness', 'Training readiness', 'Documentation readiness', 'Startup blockers'],
    output: 'Startup confidence and blocker list by project.',
    status: 'Active',
  },
  {
    id: 'procurement-operations',
    name: 'Procurement Operations',
    decisionSupported: 'What procurement issues threaten delivery?',
    signals: ['Long lead watchlist', 'Delivery risks', 'Startup-impacting deliveries', 'Vendor concerns'],
    output: 'Portfolio-wide delivery threats and vendor escalation targets.',
    status: 'Watch',
  },
  {
    id: 'qaqc-compliance',
    name: 'QAQC & Compliance',
    decisionSupported: 'Are we meeting quality and compliance expectations?',
    signals: ['QAQC gates', 'Compliance status', 'VP-required signoffs', 'Missing reviews'],
    output: 'Execution-ready compliance packets for VantagePoint record entry.',
    status: 'Planning',
  },
  {
    id: 'resource-planning',
    name: 'Resource Planning',
    decisionSupported: 'Do we have capacity?',
    signals: ['Startup loading', 'Engineering loading', 'FAT staffing', 'Resource conflicts'],
    output: 'Capacity conflicts before they become milestone blockers.',
    status: 'Active',
  },
  {
    id: 'executive-view',
    name: 'Executive View',
    decisionSupported: 'Where should leadership focus?',
    signals: ['Portfolio health', 'Critical risks', 'Major milestones', 'Resource concerns'],
    output: 'Leadership focus list generated from operational data.',
    status: 'Watch',
  },
];

export const projectWorkAreas: Record<string, WorkArea[]> = {
  'elmhc-bundle-5': [
    {
      id: 'wa-elmhc-design',
      projectId: 'elmhc-bundle-5',
      name: 'Design & Controls Package',
      owner: 'Riley Chen',
      state: 'Attention',
      currentFocus: 'Close design package for procurement release.',
      nextMilestone: 'Design',
      attentionReason: 'Open comments and control description gaps are threatening Design Complete.',
      milestones: ['Design', 'Procurement', 'FAT'],
      blockers: ['Open design review comments', 'Control description incomplete', 'QAQC design review signoff pending'],
      actions: ['Close final three design review comments', 'Complete control description', 'Route QAQC design signoff'],
      risks: ['FAT planning may start from incomplete controls basis'],
      decisions: ['Confirm design package can release with two marked-up comments'],
      unknowns: ['Whether client will require a supplemental control narrative review'],
    },
    {
      id: 'wa-elmhc-procurement',
      projectId: 'elmhc-bundle-5',
      name: 'Procurement Release',
      owner: 'Avery Grant',
      state: 'Attention',
      currentFocus: 'Release switchgear PR and accounting code.',
      nextMilestone: 'Procurement',
      attentionReason: 'Switchgear PR approval is blocking procurement readiness.',
      milestones: ['Procurement', 'FAT'],
      blockers: ['Switchgear PR approval', 'Accounting code confirmation'],
      actions: ['Approve switchgear PR and confirm accounting code', 'Confirm vendor quote validity window'],
      risks: ['Procurement release may compress FAT schedule'],
      decisions: ['Approve early release before design comments are fully closed'],
      unknowns: ['Vendor shipment date after PR approval'],
    },
    {
      id: 'wa-elmhc-startup',
      projectId: 'elmhc-bundle-5',
      name: 'FAT & Startup Readiness',
      owner: 'Sam Rivera',
      state: 'Planning',
      currentFocus: 'Confirm FAT requirement and reserve startup specialist.',
      nextMilestone: 'FAT',
      attentionReason: 'FAT and startup staffing need planning before they become blockers.',
      milestones: ['FAT', 'Startup'],
      blockers: ['FAT requirement unconfirmed', 'Startup specialist not reserved'],
      actions: ['Confirm FAT requirement with controls lead and client', 'Reserve startup specialist for August window'],
      risks: ['Startup resource not assigned'],
      decisions: ['Whether FAT will be witnessed by client'],
      unknowns: ['Client witness availability for July FAT'],
    },
    {
      id: 'wa-elmhc-closeout',
      projectId: 'elmhc-bundle-5',
      name: 'Closeout Package',
      owner: 'Riley Chen',
      state: 'Healthy',
      currentFocus: 'Keep O&M package visible for later closeout.',
      nextMilestone: 'Closeout',
      attentionReason: 'No immediate attention required.',
      milestones: ['Closeout'],
      blockers: [],
      actions: ['Draft O&M index after FAT procedure approval'],
      risks: [],
      decisions: [],
      unknowns: ['Final as-built drawing count'],
    },
  ],
  'rolme-ls3': [
    {
      id: 'wa-rolme-transition',
      projectId: 'rolme-ls3',
      name: 'Kickoff & Transition',
      owner: 'Nina Brooks',
      state: 'Attention',
      currentFocus: 'Complete sales-to-PM transition and lock assumptions.',
      nextMilestone: 'Kickoff',
      attentionReason: 'Transition assumptions are blocking kickoff readiness.',
      milestones: ['Kickoff', 'Design'],
      blockers: ['Transition meeting incomplete', 'Estimator assumptions not captured'],
      actions: ['Hold transition meeting and capture assumptions'],
      risks: ['Kickoff decisions may be made without estimate context'],
      decisions: ['Accept current assumptions or pause kickoff until estimator review'],
      unknowns: ['Client availability for recurring decision cadence'],
    },
    {
      id: 'wa-rolme-procurement',
      projectId: 'rolme-ls3',
      name: 'Pump Procurement',
      owner: 'Nina Brooks',
      state: 'Attention',
      currentFocus: 'Make pump vendor decision for early release.',
      nextMilestone: 'Procurement',
      attentionReason: 'Vendor selection is blocking PR routing and delivery planning.',
      milestones: ['Procurement', 'Startup'],
      blockers: ['Pump vendor decision', 'Third quote missing', 'PR shell cannot route'],
      actions: ['Decide whether pump package is early release', 'Submit PR once vendor decision is made'],
      risks: ['Procurement delay from pump vendor decision'],
      decisions: ['Select vendor from two quotes or wait for third quote'],
      unknowns: ['Final pump lead time after award'],
    },
    {
      id: 'wa-rolme-startup',
      projectId: 'rolme-ls3',
      name: 'Startup Planning',
      owner: 'Sam Rivera',
      state: 'Planning',
      currentFocus: 'Draft startup sequence around controls narrative.',
      nextMilestone: 'Startup',
      attentionReason: 'Startup plan depends on controls narrative due this month.',
      milestones: ['Design', 'FAT', 'Startup'],
      blockers: ['Controls narrative due from design', 'FAT applicability unknown'],
      actions: ['Draft startup sequence around controls narrative'],
      risks: ['Startup planning without controls narrative'],
      decisions: ['Use draft design sequence for first-pass startup plan'],
      unknowns: ['Whether selected pump package requires FAT'],
    },
  ],
  'huntv-well-13': [
    {
      id: 'wa-huntv-field',
      projectId: 'huntv-well-13',
      name: 'Field Startup Staffing',
      owner: 'Elena Wright',
      state: 'Attention',
      currentFocus: 'Resolve instrumentation technician conflict.',
      nextMilestone: 'Startup',
      attentionReason: 'Shared technician is double-booked for startup window.',
      milestones: ['FAT', 'Startup'],
      blockers: ['Instrumentation technician availability'],
      actions: ['Confirm instrumentation technician availability for July'],
      risks: ['Resource conflict for instrumentation technician'],
      decisions: ['Reassign shared technician or request backup support'],
      unknowns: ['Backup technician availability'],
    },
    {
      id: 'wa-huntv-procurement',
      projectId: 'huntv-well-13',
      name: 'VFD Delivery',
      owner: 'Elena Wright',
      state: 'Planning',
      currentFocus: 'Confirm VFD ship date.',
      nextMilestone: 'Procurement',
      attentionReason: 'Delivery tracking drives FAT date confidence.',
      milestones: ['Procurement', 'FAT'],
      blockers: ['VFD ship date pending'],
      actions: ['Get VFD ship date from supplier'],
      risks: ['FAT date may remain tentative without tracking'],
      decisions: ['Hold FAT date or move after tracking confirmation'],
      unknowns: ['Carrier pickup date'],
    },
  ],
  'waukc-beechnut': [
    {
      id: 'wa-waukc-design',
      projectId: 'waukc-beechnut',
      name: 'Permit & Design Closeout',
      owner: 'Marcus Stone',
      state: 'Attention',
      currentFocus: 'Consolidate permit response matrix.',
      nextMilestone: 'Design',
      attentionReason: 'Permit response churn is delaying design closeout.',
      milestones: ['Design', 'Procurement'],
      blockers: ['Permit response matrix', 'Client decision cadence'],
      actions: ['Consolidate county permit response matrix', 'Confirm recurring decision meeting with client'],
      risks: ['Design closeout slips from permit response churn'],
      decisions: ['Assign single client approver for permit responses'],
      unknowns: ['Which comments require engineering revision'],
    },
    {
      id: 'wa-waukc-valves',
      projectId: 'waukc-beechnut',
      name: 'Valve Package',
      owner: 'Marcus Stone',
      state: 'Planning',
      currentFocus: 'Decide early-release valve boundaries.',
      nextMilestone: 'Procurement',
      attentionReason: 'Valve lead time may affect procurement complete.',
      milestones: ['Procurement', 'FAT'],
      blockers: ['Valve release boundary not decided'],
      actions: ['Decide early-release valve package boundaries'],
      risks: ['Valve lead time issue'],
      decisions: ['Release valve package before final design closeout'],
      unknowns: ['Confirmed valve lead time'],
    },
  ],
  'nssd1-pfas': [
    {
      id: 'wa-nssd1-fat',
      projectId: 'nssd1-pfas',
      name: 'FAT Execution',
      owner: 'Sam Rivera',
      state: 'Attention',
      currentFocus: 'Approve PFAS media skid FAT procedure.',
      nextMilestone: 'FAT',
      attentionReason: 'FAT procedure approval is the active quality gate.',
      milestones: ['FAT', 'Startup'],
      blockers: ['FAT procedure approval', 'VP entry needed for FAT approval'],
      actions: ['Approve PFAS media skid FAT procedure'],
      risks: ['FAT approval delay may compress startup readiness'],
      decisions: ['Approve procedure with current technical comments or return to vendor'],
      unknowns: ['Whether client will request additional FAT test cases'],
    },
    {
      id: 'wa-nssd1-startup',
      projectId: 'nssd1-pfas',
      name: 'Startup & Sampling',
      owner: 'Priya Shah',
      state: 'Planning',
      currentFocus: 'Add sampling roles to startup plan.',
      nextMilestone: 'Startup',
      attentionReason: 'Sampling plan must be complete before startup readiness review.',
      milestones: ['Startup', 'Closeout'],
      blockers: ['Sampling roles not in startup plan'],
      actions: ['Add sampling roles to startup plan'],
      risks: ['Warranty letter timing compresses SAT closeout'],
      decisions: ['Assign sampling ownership to vendor rep or internal startup lead'],
      unknowns: ['Lab courier pickup window during startup'],
    },
    {
      id: 'wa-nssd1-closeout',
      projectId: 'nssd1-pfas',
      name: 'Warranty & Closeout',
      owner: 'Riley Chen',
      state: 'Healthy',
      currentFocus: 'Prepare closeout package after SAT.',
      nextMilestone: 'Closeout',
      attentionReason: 'No immediate attention required.',
      milestones: ['Closeout'],
      blockers: [],
      actions: ['Draft warranty letter for client review'],
      risks: [],
      decisions: ['Confirm warranty letter timing with legal'],
      unknowns: ['Final closeout attachment list'],
    },
  ],
};

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
