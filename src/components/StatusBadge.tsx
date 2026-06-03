import type { StatusLevel } from '../data/mockData';

interface StatusBadgeProps {
  status: StatusLevel | 'Low' | 'Medium' | 'High' | string;
}

const statusClassMap: Record<string, string> = {
  'On Track': 'badge badge--success',
  Watch: 'badge badge--warning',
  'At Risk': 'badge badge--danger',
  Blocked: 'badge badge--blocked',
  Low: 'badge badge--success',
  Medium: 'badge badge--warning',
  High: 'badge badge--danger',
  Draft: 'badge badge--neutral',
  Submitted: 'badge badge--warning',
  Approved: 'badge badge--success',
  Ordered: 'badge badge--info',
  'Spec Review': 'badge badge--neutral',
  RFQ: 'badge badge--warning',
  'PO Issued': 'badge badge--info',
  'In Transit': 'badge badge--info',
  Delivered: 'badge badge--success',
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return <span className={statusClassMap[status] ?? 'badge badge--neutral'}>{status}</span>;
}
