import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { StatusBadge } from '../components/StatusBadge';
import { formatDate, getCategorySummaries, getProjectById, getReadinessStatus } from '../data/mockData';

export function ProjectDetail() {
  const { projectId } = useParams();
  const project = getProjectById(projectId);

  if (!project) {
    return (
      <section className="empty-state">
        <h1>Project not found</h1>
        <p>The requested mock project does not exist.</p>
        <Link to="/">Return to portfolio</Link>
      </section>
    );
  }

  const redItems = project.readinessItems.filter((item) => getReadinessStatus(item) === 'Red');
  const yellowItems = project.readinessItems.filter((item) => getReadinessStatus(item) === 'Yellow');
  const actionsRequired = project.readinessItems
    .filter((item) => item.active && item.applicable && item.state !== 'Complete')
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  const categorySummaries = getCategorySummaries(project.readinessItems);
  const nextMilestone = project.milestones.find((milestone) => milestone.state !== 'Complete');

  return (
    <section className="ops-page">
      <Link className="back-link" to="/">
        <ArrowLeft size={16} /> Portfolio
      </Link>

      <header className="project-header">
        <div>
          <p className="eyebrow">{project.projectNumber}</p>
          <h1>{project.name}</h1>
        </div>
        <dl>
          <div><dt>PM</dt><dd>{project.manager}</dd></div>
          <div><dt>Client</dt><dd>{project.client}</dd></div>
          <div><dt>Next Milestone</dt><dd>{nextMilestone ? `${nextMilestone.name} ${formatDate(nextMilestone.date)}` : 'None'}</dd></div>
          <div><dt>Red Count</dt><dd>{redItems.length}</dd></div>
          <div><dt>Yellow Count</dt><dd>{yellowItems.length}</dd></div>
        </dl>
      </header>

      <section className="ops-panel">
        <div className="ops-panel__heading">
          <h2>Milestone Timeline</h2>
          <span>Dates, state, and readiness gaps</span>
        </div>
        <div className="timeline-row">
          {project.milestones.map((milestone) => (
            <article className="timeline-step" key={milestone.id}>
              <StatusBadge status={milestone.state} />
              <strong>{milestone.name}</strong>
              <span>{formatDate(milestone.date)}</span>
              <p>{milestone.readinessGaps.length ? milestone.readinessGaps.join(', ') : 'No open gaps'}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="ops-panel ops-panel--primary">
        <div className="ops-panel__heading">
          <h2>Actions Required</h2>
          <span>{actionsRequired.length} open actions</span>
        </div>
        <div className="ops-table ops-table--project-actions">
          <div className="ops-table__header">
            <span>Action</span>
            <span>Category</span>
            <span>Owner</span>
            <span>Due</span>
            <span>Status</span>
          </div>
          {actionsRequired.map((item) => (
            <article className="ops-table__row" key={item.id}>
              <strong>{item.actionRequired}</strong>
              <span>{item.category}</span>
              <span>{item.owner}</span>
              <span>{formatDate(item.dueDate)}</span>
              <StatusBadge status={getReadinessStatus(item)} />
            </article>
          ))}
        </div>
      </section>

      <section className="ops-panel">
        <div className="ops-panel__heading">
          <h2>Readiness Categories</h2>
          <span>Compact category indicators</span>
        </div>
        <div className="ops-table ops-table--categories">
          <div className="ops-table__header">
            <span>Category</span>
            <span>Red</span>
            <span>Yellow</span>
            <span>Green/OK</span>
            <span>Current Concern</span>
          </div>
          {categorySummaries.map((summary) => (
            <article className="ops-table__row" key={summary.category}>
              <strong>{summary.category}</strong>
              <span className="count-pill count-pill--red">{summary.red}</span>
              <span className="count-pill count-pill--yellow">{summary.yellow}</span>
              <span>{summary.green}</span>
              <span>{summary.attention}</span>
            </article>
          ))}
        </div>
      </section>

      <div className="ops-grid">
        <section className="ops-panel">
          <div className="ops-panel__heading">
            <h2>Risks</h2>
            <span>Known project risks</span>
          </div>
          <div className="ops-list">
            {project.risks.map((risk) => (
              <article className="ops-list__item" key={risk.id}>
                <div className="item-title-row">
                  <strong>{risk.title}</strong>
                  <StatusBadge status={risk.trend === 'Increasing' ? 'Red' : 'Yellow'} label={risk.trend} />
                </div>
                <span>{risk.category} - {risk.owner} - {risk.likelihood} likelihood / {risk.impact} impact</span>
                <p>{risk.mitigation}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="ops-panel">
          <div className="ops-panel__heading">
            <h2>Recent Activity</h2>
            <span>Latest updates and changes</span>
          </div>
          <div className="activity-list">
            {project.recentActivity.map((activity) => (
              <span key={activity}>{activity}</span>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
