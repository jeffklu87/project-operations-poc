import type { CategorySummary } from '../data/mockData';
import { StatusBadge } from './StatusBadge';

interface ModuleSummaryCardProps {
  module: CategorySummary;
}

export function ModuleSummaryCard({ module }: ModuleSummaryCardProps) {
  const Icon = module.icon;

  return (
    <article className="module-card">
      <div className="module-card__topline">
        <span className="module-card__icon">
          <Icon size={20} />
        </span>
        <StatusBadge status={module.red > 0 ? 'Red' : module.yellow > 0 ? 'Yellow' : 'Green'} label={module.attention} />
      </div>
      <h3>{module.category}</h3>
      <p>{module.red} require action this week, {module.yellow} require planning this month, {module.green} are currently green.</p>
      <div className="readiness-mix" aria-label={`${module.category} readiness mix`}>
        <span className="mix-bar mix-bar--red" style={{ width: `${module.totalActive ? (module.red / module.totalActive) * 100 : 0}%` }} />
        <span className="mix-bar mix-bar--yellow" style={{ width: `${module.totalActive ? (module.yellow / module.totalActive) * 100 : 0}%` }} />
        <span className="mix-bar mix-bar--green" style={{ width: `${module.totalActive ? (module.green / module.totalActive) * 100 : 0}%` }} />
      </div>
      <div className="module-card__owner">{module.gray} gray / not active</div>
    </article>
  );
}
