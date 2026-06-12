import type { ReadinessStatus } from '../data/mockData';

interface StatusBadgeProps {
  status: ReadinessStatus | string;
  label?: string;
}

const statusClassMap: Record<string, string> = {
  Red: 'badge badge--red',
  Yellow: 'badge badge--yellow',
  Green: 'badge badge--green',
  Gray: 'badge badge--gray',
  Complete: 'badge badge--green',
  Upcoming: 'badge badge--blue',
  'At risk': 'badge badge--red',
  Blocked: 'badge badge--red',
  'Not Active': 'badge badge--gray',
  Missing: 'badge badge--red',
  'Not started': 'badge badge--gray',
  'In progress': 'badge badge--yellow',
  Waiting: 'badge badge--red',
};

export function StatusBadge({ status, label }: StatusBadgeProps) {
  return <span className={statusClassMap[status] ?? 'badge badge--gray'}>{label ?? status}</span>;
}
