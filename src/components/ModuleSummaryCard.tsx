import type { ModuleStatus } from '../data/mockData';
import { ProgressBar } from './ProgressBar';
import { StatusBadge } from './StatusBadge';

interface ModuleSummaryCardProps {
  module: ModuleStatus;
}

export function ModuleSummaryCard({ module }: ModuleSummaryCardProps) {
  const Icon = module.icon;

  return (
    <article className="module-card">
      <div className="module-card__topline">
        <span className="module-card__icon">
          <Icon size={20} />
        </span>
        <StatusBadge status={module.status} />
      </div>
      <h3>{module.label}</h3>
      <p>{module.summary}</p>
      <div className="module-card__owner">Owner: {module.owner}</div>
      <ProgressBar value={module.progress} label={`${module.label} progress`} />
      <strong>{module.progress}% ready</strong>
    </article>
  );
}
