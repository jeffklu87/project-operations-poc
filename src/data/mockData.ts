import type { LucideIcon } from 'lucide-react';
import { ClipboardCheck, FileText, HardHat, PackageCheck, Users } from 'lucide-react';

export type StatusLevel = 'On Track' | 'Watch' | 'At Risk' | 'Blocked';

export type ModuleKey = 'overall' | 'procurement' | 'resources' | 'startup' | 'documentation';

export interface ModuleStatus {
  key: ModuleKey;
  label: string;
  status: StatusLevel;
  progress: number;
  summary: string;
  owner: string;
  icon: LucideIcon;
}

export interface ProjectIssue {
  id: string;
  title: string;
  module: string;
  severity: 'Low' | 'Medium' | 'High';
  dueDate: string;
}

export interface Project {
  id: string;
  projectNumber: string;
  name: string;
  client: string;
  location: string;
  manager: string;
  phase: string;
  budget: string;
  completion: number;
  nextMilestone: string;
  modules: ModuleStatus[];
  issues: ProjectIssue[];
}

export interface PurchaseRequest {
  id: string;
  projectId: string;
  projectName: string;
  description: string;
  requester: string;
  status: 'Draft' | 'Submitted' | 'Approved' | 'Ordered';
  requiredBy: string;
  value: string;
}

export interface MaterialItem {
  id: string;
  projectId: string;
  projectName: string;
  item: string;
  supplier: string;
  status: 'Spec Review' | 'RFQ' | 'PO Issued' | 'In Transit' | 'Delivered';
  needDate: string;
  risk: 'Low' | 'Medium' | 'High';
}

const moduleIcons: Record<ModuleKey, LucideIcon> = {
  overall: ClipboardCheck,
  procurement: PackageCheck,
  resources: Users,
  startup: HardHat,
  documentation: FileText,
};

const createModules = (
  statuses: Array<Omit<ModuleStatus, 'icon'> & { key: ModuleKey }>,
): ModuleStatus[] => statuses.map((module) => ({ ...module, icon: moduleIcons[module.key] }));

export const projects: Project[] = [
  {
    id: 'elmhc-bundle-5',
    projectNumber: 'POC-2401',
    name: 'ELMHC Bundle 5',
    client: 'East Lake Municipal Health Campus',
    location: 'East Lake, TX',
    manager: 'Avery Grant',
    phase: 'Field mobilization',
    budget: '$8.4M',
    completion: 64,
    nextMilestone: 'Temporary power inspection - Jun 18',
    modules: createModules([
      { key: 'overall', label: 'Overall status', status: 'On Track', progress: 68, summary: 'Milestones are sequencing cleanly with field teams mobilized.', owner: 'Avery Grant' },
      { key: 'procurement', label: 'Procurement', status: 'Watch', progress: 55, summary: 'Switchgear submittals need approval before release.', owner: 'Morgan Lee' },
      { key: 'resources', label: 'Resources', status: 'On Track', progress: 72, summary: 'Civil and electrical crews are staffed for the next three weeks.', owner: 'Jordan Patel' },
      { key: 'startup', label: 'Startup', status: 'Watch', progress: 38, summary: 'Startup plan drafted; commissioning dates depend on equipment release.', owner: 'Sam Rivera' },
      { key: 'documentation', label: 'Documentation', status: 'On Track', progress: 81, summary: 'Daily reports and permit logs are current.', owner: 'Riley Chen' },
    ]),
    issues: [
      { id: 'ISS-101', title: 'Confirm utility shutdown window for east tie-in', module: 'Startup', severity: 'Medium', dueDate: 'Jun 10' },
      { id: 'ISS-102', title: 'Resolve switchgear comments with engineer of record', module: 'Procurement', severity: 'High', dueDate: 'Jun 12' },
    ],
  },
  {
    id: 'rolme-ls3',
    projectNumber: 'POC-2402',
    name: 'ROLME LS3',
    client: 'Rolme County Utilities',
    location: 'Rolme County, OK',
    manager: 'Nina Brooks',
    phase: 'Procurement release',
    budget: '$3.1M',
    completion: 42,
    nextMilestone: 'Pump package award - Jun 21',
    modules: createModules([
      { key: 'overall', label: 'Overall status', status: 'Watch', progress: 44, summary: 'Design approvals are complete; procurement float is tightening.', owner: 'Nina Brooks' },
      { key: 'procurement', label: 'Procurement', status: 'At Risk', progress: 31, summary: 'Long-lead pump package has one incomplete vendor quote.', owner: 'Morgan Lee' },
      { key: 'resources', label: 'Resources', status: 'On Track', progress: 66, summary: 'Core project team is assigned and subcontractor slots are reserved.', owner: 'Luis Garcia' },
      { key: 'startup', label: 'Startup', status: 'Watch', progress: 22, summary: 'Startup checklist is awaiting final controls narrative.', owner: 'Sam Rivera' },
      { key: 'documentation', label: 'Documentation', status: 'On Track', progress: 73, summary: 'Submittal register is active with weekly client distribution.', owner: 'Riley Chen' },
    ]),
    issues: [
      { id: 'ISS-201', title: 'Receive third quote for vertical turbine pump package', module: 'Procurement', severity: 'High', dueDate: 'Jun 7' },
      { id: 'ISS-202', title: 'Finalize controls startup narrative', module: 'Startup', severity: 'Medium', dueDate: 'Jun 15' },
    ],
  },
  {
    id: 'huntv-well-13',
    projectNumber: 'POC-2403',
    name: 'HUNTV Well 13',
    client: 'Hunt Valley Water Authority',
    location: 'Hunt Valley, NM',
    manager: 'Elena Wright',
    phase: 'Construction',
    budget: '$5.7M',
    completion: 58,
    nextMilestone: 'Wellhead mechanical rough-in - Jun 24',
    modules: createModules([
      { key: 'overall', label: 'Overall status', status: 'On Track', progress: 61, summary: 'Civil work is complete and mechanical rough-in is progressing.', owner: 'Elena Wright' },
      { key: 'procurement', label: 'Procurement', status: 'On Track', progress: 69, summary: 'Major equipment has purchase orders issued and tracked delivery dates.', owner: 'Morgan Lee' },
      { key: 'resources', label: 'Resources', status: 'Watch', progress: 54, summary: 'Instrumentation technician availability is constrained in July.', owner: 'Jordan Patel' },
      { key: 'startup', label: 'Startup', status: 'Watch', progress: 35, summary: 'Factory test dates are tentative pending VFD confirmation.', owner: 'Sam Rivera' },
      { key: 'documentation', label: 'Documentation', status: 'On Track', progress: 77, summary: 'Inspection records and RFIs are up to date.', owner: 'Riley Chen' },
    ]),
    issues: [
      { id: 'ISS-301', title: 'Confirm July instrumentation technician coverage', module: 'Resources', severity: 'Medium', dueDate: 'Jun 14' },
    ],
  },
  {
    id: 'waukc-beechnut',
    projectNumber: 'POC-2404',
    name: 'WAUKC Beechnut',
    client: 'Wauk County Public Works',
    location: 'Beechnut, KS',
    manager: 'Marcus Stone',
    phase: 'Design closeout',
    budget: '$6.2M',
    completion: 35,
    nextMilestone: '90% design package - Jun 28',
    modules: createModules([
      { key: 'overall', label: 'Overall status', status: 'Watch', progress: 37, summary: 'Design package is close, but permitting comments remain open.', owner: 'Marcus Stone' },
      { key: 'procurement', label: 'Procurement', status: 'Watch', progress: 29, summary: 'Procurement strategy is drafted for early valve release.', owner: 'Morgan Lee' },
      { key: 'resources', label: 'Resources', status: 'On Track', progress: 63, summary: 'Estimating and project controls support are assigned.', owner: 'Luis Garcia' },
      { key: 'startup', label: 'Startup', status: 'On Track', progress: 18, summary: 'Startup scope is identified with no immediate constraints.', owner: 'Sam Rivera' },
      { key: 'documentation', label: 'Documentation', status: 'At Risk', progress: 41, summary: 'Permit response matrix needs consolidation before resubmittal.', owner: 'Riley Chen' },
    ]),
    issues: [
      { id: 'ISS-401', title: 'Consolidate county permit response matrix', module: 'Documentation', severity: 'High', dueDate: 'Jun 9' },
      { id: 'ISS-402', title: 'Decide early-release valve package boundaries', module: 'Procurement', severity: 'Medium', dueDate: 'Jun 16' },
    ],
  },
  {
    id: 'nppwd-pfas',
    projectNumber: 'POC-2405',
    name: 'NPPWD PFAS',
    client: 'North Plains Public Water District',
    location: 'North Plains, CO',
    manager: 'Priya Shah',
    phase: 'Startup planning',
    budget: '$12.8M',
    completion: 71,
    nextMilestone: 'Media vessel delivery - Jun 19',
    modules: createModules([
      { key: 'overall', label: 'Overall status', status: 'On Track', progress: 74, summary: 'Treatment train installation is trending ahead of baseline.', owner: 'Priya Shah' },
      { key: 'procurement', label: 'Procurement', status: 'On Track', progress: 83, summary: 'PFAS media vessels are in transit with receiving crew scheduled.', owner: 'Morgan Lee' },
      { key: 'resources', label: 'Resources', status: 'On Track', progress: 79, summary: 'Startup specialists and vendor representatives are confirmed.', owner: 'Jordan Patel' },
      { key: 'startup', label: 'Startup', status: 'On Track', progress: 57, summary: 'Startup sequence is approved and sampling plan is in review.', owner: 'Sam Rivera' },
      { key: 'documentation', label: 'Documentation', status: 'Watch', progress: 62, summary: 'O&M manual drafts are missing two vendor sections.', owner: 'Riley Chen' },
    ]),
    issues: [
      { id: 'ISS-501', title: 'Receive missing vendor O&M manual sections', module: 'Documentation', severity: 'Medium', dueDate: 'Jun 17' },
    ],
  },
];

export const purchaseRequests: PurchaseRequest[] = [
  { id: 'PR-2401', projectId: 'elmhc-bundle-5', projectName: 'ELMHC Bundle 5', description: 'Medium voltage switchgear release package', requester: 'Morgan Lee', status: 'Submitted', requiredBy: 'Jun 12', value: '$410K' },
  { id: 'PR-2402', projectId: 'rolme-ls3', projectName: 'ROLME LS3', description: 'Vertical turbine pump package', requester: 'Nina Brooks', status: 'Draft', requiredBy: 'Jun 21', value: '$285K' },
  { id: 'PR-2403', projectId: 'huntv-well-13', projectName: 'HUNTV Well 13', description: 'VFD and controls cabinet', requester: 'Elena Wright', status: 'Approved', requiredBy: 'Jun 18', value: '$165K' },
  { id: 'PR-2404', projectId: 'waukc-beechnut', projectName: 'WAUKC Beechnut', description: 'Early-release valve package', requester: 'Marcus Stone', status: 'Submitted', requiredBy: 'Jun 26', value: '$92K' },
  { id: 'PR-2405', projectId: 'nppwd-pfas', projectName: 'NPPWD PFAS', description: 'Startup sampling kits and lab coolers', requester: 'Priya Shah', status: 'Ordered', requiredBy: 'Jun 15', value: '$18K' },
];

export const materialItems: MaterialItem[] = [
  { id: 'MAT-118', projectId: 'elmhc-bundle-5', projectName: 'ELMHC Bundle 5', item: 'ATS control panels', supplier: 'Metro Controls', status: 'RFQ', needDate: 'Jul 8', risk: 'Medium' },
  { id: 'MAT-119', projectId: 'rolme-ls3', projectName: 'ROLME LS3', item: 'Vertical turbine pumps', supplier: 'Summit Pumpworks', status: 'Spec Review', needDate: 'Aug 2', risk: 'High' },
  { id: 'MAT-120', projectId: 'huntv-well-13', projectName: 'HUNTV Well 13', item: 'Stainless discharge piping', supplier: 'High Desert Pipe', status: 'PO Issued', needDate: 'Jul 1', risk: 'Low' },
  { id: 'MAT-121', projectId: 'waukc-beechnut', projectName: 'WAUKC Beechnut', item: 'Butterfly valves', supplier: 'Prairie Valve Co.', status: 'RFQ', needDate: 'Aug 16', risk: 'Medium' },
  { id: 'MAT-122', projectId: 'nppwd-pfas', projectName: 'NPPWD PFAS', item: 'PFAS media vessels', supplier: 'ClearWater Systems', status: 'In Transit', needDate: 'Jun 19', risk: 'Low' },
];

export const getProjectById = (id: string | undefined) => projects.find((project) => project.id === id);
