import { Link } from 'react-router-dom';
import { StatusBadge } from '../components/StatusBadge';
import {
  daysUntil,
  formatDate,
  getActionsRequired,
  getProjectAttentionScore,
  getReadinessStatus,
  getUpcomingMilestones,
  projects,
  type ReadinessItem,
} from '../data/mockData';

const WorkTable = ({ items }: { items: ReadinessItem[] }) => (
  <div className="ops-table ops-table--actions">
    <div className="ops-table__header">
      <span>Project</span>
      <span>Action</span>
      <span>Category</span>
      <span>Owner</span>
      <span>Due Date</span>
      <span>Status</span>
    </div>
    {items.map((item) => (
      <Link className="ops-table__row" to={`/projects/${item.projectId}`} key={item.id}>
        <strong>{item.projectNumber} - {item.projectName}</strong>
        <span>{item.actionRequired}</span>
        <span>{item.category}</span>
        <span>{item.owner}</span>
        <span>{formatDate(item.dueDate)}</span>
        <StatusBadge status={getReadinessStatus(item)} />
      </Link>
    ))}
  </div>
);

export function PMWorkQueue() {
  const visibleItems = getActionsRequired();
  const doThisWeek = visibleItems.filter((item) => daysUntil(item.dueDate) <= 7);
  const planThisMonth = visibleItems.filter((item) => daysUntil(item.dueDate) > 7 && daysUntil(item.dueDate) <= 30);
  const upcomingMilestones = getUpcomingMilestones(8);
  const projectsNeedingAttention = [...projects]
    .filter((project) => getProjectAttentionScore(project) > 0)
    .sort((a, b) => getProjectAttentionScore(b) - getProjectAttentionScore(a));

  return (
    <section className="ops-page">
      <header className="ops-header">
        <div>
          <p className="eyebrow">My Work</p>
          <h1>PM work queue</h1>
        </div>
        <span>{visibleItems.length} open actions</span>
      </header>

      <section className="ops-panel ops-panel--red">
        <div className="ops-panel__heading">
          <h2>Do This Week</h2>
          <span>{doThisWeek.length} due now</span>
        </div>
        <WorkTable items={doThisWeek} />
      </section>

      <section className="ops-panel ops-panel--yellow">
        <div className="ops-panel__heading">
          <h2>Plan This Month</h2>
          <span>{planThisMonth.length} upcoming</span>
        </div>
        <WorkTable items={planThisMonth} />
      </section>

      <div className="ops-grid">
        <section className="ops-panel">
          <div className="ops-panel__heading">
            <h2>Upcoming Milestones</h2>
            <span>Next project dates</span>
          </div>
          <div className="ops-table ops-table--mini-milestones">
            <div className="ops-table__header">
              <span>Project</span>
              <span>Milestone</span>
              <span>Date</span>
              <span>State</span>
            </div>
            {upcomingMilestones.map((milestone) => (
              <Link className="ops-table__row" to={`/projects/${milestone.projectId}`} key={milestone.id}>
                <strong>{milestone.projectNumber} - {milestone.projectName}</strong>
                <span>{milestone.name}</span>
                <span>{formatDate(milestone.date)}</span>
                <StatusBadge status={milestone.state} />
              </Link>
            ))}
          </div>
        </section>

        <section className="ops-panel">
          <div className="ops-panel__heading">
            <h2>Projects Needing My Attention</h2>
            <span>Ranked by red/yellow load</span>
          </div>
          <div className="risk-rank">
            {projectsNeedingAttention.map((project, index) => (
              <Link to={`/projects/${project.id}`} className="risk-rank__row" key={project.id}>
                <strong>{index + 1}</strong>
                <div>
                  <span>{project.projectNumber} - {project.name}</span>
                  <p>{project.riskSummary}</p>
                </div>
                <StatusBadge status={getProjectAttentionScore(project) >= 6 ? 'Red' : 'Yellow'} />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
