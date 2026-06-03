import type { StatusLevel } from '../data/mockData';

interface StatusBadgeProps {
  status: StatusLevel | 'Low' | 'Medium' | 'High' | string;
}

const statusClassMap: Record<string, string> = {
  'On Track': 'badge status-chip status-chip--green',
  Watch: 'badge status-chip status-chip--yellow',
  'At Risk': 'badge status-chip status-chip--red',
  Blocked: 'badge status-chip status-chip--red',
  Low: 'badge status-chip status-chip--green',
  Medium: 'badge status-chip status-chip--yellow',
  High: 'badge status-chip status-chip--red',
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
