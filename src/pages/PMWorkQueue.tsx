import { Link } from 'react-router-dom';
import { StatusBadge } from '../components/StatusBadge';
import {
  daysUntil,
  formatDate,
  getActionsRequired,
  getProjectAttentionScore,
  getReadinessStatus,
  projects,
  type ReadinessItem,
} from '../data/mockData';

const WorkTable = ({ items }: { items: ReadinessItem[] }) => (
  <div className="ops-table ops-table--actions">
    <div className="ops-table__header">
      <span>Project</span>
      <span>Action</span>
      <span>Milestone</span>
      <span>Owner</span>
      <span>Due Date</span>
      <span>Status</span>
    </div>
    {items.map((item) => (
      <Link className="ops-table__row" to={`/projects/${item.projectId}`} key={item.id}>
        <strong>{item.projectNumber} - {item.projectName}</strong>
        <span>{item.actionRequired}</span>
        <span>{item.milestoneName}</span>
        <span>{item.owner}</span>
        <span>{formatDate(item.dueDate)}</span>
        <StatusBadge status={getReadinessStatus(item)} />
      </Link>
    ))}
  </div>
);

export function PMWorkQueue() {
  const visibleItems = getActionsRequired();
  const todayItems = visibleItems.filter((item) => daysUntil(item.dueDate) <= 0);
  const thisWeekItems = visibleItems.filter((item) => daysUntil(item.dueDate) > 0 && daysUntil(item.dueDate) <= 7);
  const nextThirtyItems = visibleItems.filter((item) => daysUntil(item.dueDate) > 7 && daysUntil(item.dueDate) <= 30);
  const futureItems = visibleItems.filter((item) => daysUntil(item.dueDate) > 30);
  const projectsNeedingAttention = [...projects]
    .filter((project) => getProjectAttentionScore(project) > 0)
    .sort((a, b) => getProjectAttentionScore(b) - getProjectAttentionScore(a));

  return (
    <section className="ops-page">
      <header className="ops-header">
        <div>
          <p className="eyebrow">My Work</p>
          <h1>Time horizon queue</h1>
        </div>
        <span>{visibleItems.length} open actions</span>
      </header>

      <section className="ops-panel ops-panel--red">
        <div className="ops-panel__heading">
          <h2>Today</h2>
          <span>{todayItems.length} due or overdue</span>
        </div>
        <WorkTable items={todayItems} />
      </section>

      <section className="ops-panel ops-panel--yellow">
        <div className="ops-panel__heading">
          <h2>This Week</h2>
          <span>{thisWeekItems.length} next commitments</span>
        </div>
        <WorkTable items={thisWeekItems} />
      </section>

      <section className="ops-panel">
        <div className="ops-panel__heading">
          <h2>Next 30 Days</h2>
          <span>{nextThirtyItems.length} planning items</span>
        </div>
        <WorkTable items={nextThirtyItems} />
      </section>

      <details className="ops-panel attention-disclosure">
        <summary>
          <span>
            <strong>Future</strong>
            <small>{futureItems.length} items beyond 30 days</small>
          </span>
          <span className="summary-metrics"><b>Expand when planning capacity</b></span>
        </summary>
        <WorkTable items={futureItems} />
      </details>

      <section className="ops-panel">
        <div className="ops-panel__heading">
          <h2>Projects Needing My Attention</h2>
          <span>Why and next step</span>
        </div>
        <div className="risk-rank">
          {projectsNeedingAttention.map((project, index) => {
            const nextAction = project.readinessItems.find((item) => getReadinessStatus(item) === 'Red')
              ?? project.readinessItems.find((item) => getReadinessStatus(item) === 'Yellow');

            return (
              <Link to={`/projects/${project.id}`} className="risk-rank__row" key={project.id}>
                <strong>{index + 1}</strong>
                <div>
                  <span>{project.projectNumber} - {project.name}</span>
                  <p>{nextAction?.actionRequired ?? project.riskSummary}</p>
                </div>
                <StatusBadge status={getProjectAttentionScore(project) >= 6 ? 'Red' : 'Yellow'} />
              </Link>
            );
          })}
        </div>
      </section>
    </section>
  );
}
