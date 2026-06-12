import { Link } from 'react-router-dom';
import { StatusBadge } from '../components/StatusBadge';
import {
  formatDate,
  getActionsRequired,
  getProjectAttentionScore,
  getReadinessStatus,
  getUpcomingMilestones,
  projects,
  readinessItems,
  resourceConstraints,
  risks,
} from '../data/mockData';

export function Portfolio() {
  const redItems = readinessItems.filter((item) => getReadinessStatus(item) === 'Red');
  const yellowItems = readinessItems.filter((item) => getReadinessStatus(item) === 'Yellow');
  const upcomingMilestones = getUpcomingMilestones(8);
  const actionsThisWeek = getActionsRequired(8);
  const projectsAtRisk = [...projects]
    .filter((project) => getProjectAttentionScore(project) > 0 || project.risks.some((risk) => risk.trend === 'Increasing'))
    .sort((a, b) => getProjectAttentionScore(b) - getProjectAttentionScore(a));
  const emergingRisks = risks.filter((risk) => risk.trend === 'Increasing' || risk.likelihood === 'High');

  return (
    <section className="ops-page">
      <header className="ops-header">
        <div>
          <p className="eyebrow">Portfolio</p>
          <h1>Project operating system</h1>
        </div>
        <span>Department execution view</span>
      </header>

      <section className="metric-strip" aria-label="Portfolio summary">
        <article><span>Active Projects</span><strong>{projects.length}</strong></article>
        <article><span>Red Items</span><strong>{redItems.length}</strong></article>
        <article><span>Yellow Items</span><strong>{yellowItems.length}</strong></article>
        <article><span>Upcoming Milestones</span><strong>{upcomingMilestones.length}</strong></article>
        <article><span>Projects At Risk</span><strong>{projectsAtRisk.length}</strong></article>
      </section>

      <section className="ops-panel ops-panel--primary">
        <div className="ops-panel__heading">
          <h2>Upcoming Milestones</h2>
          <span>Readiness gates by date</span>
        </div>
        <div className="ops-table ops-table--milestones" role="table" aria-label="Upcoming milestones">
          <div className="ops-table__header" role="row">
            <span>Project</span>
            <span>Milestone</span>
            <span>Date</span>
            <span>Readiness Gaps</span>
            <span>Risk State</span>
          </div>
          {upcomingMilestones.map((milestone) => (
            <Link className="ops-table__row" to={`/projects/${milestone.projectId}`} key={milestone.id}>
              <strong>{milestone.projectNumber} - {milestone.projectName}</strong>
              <span>{milestone.name}</span>
              <span>{formatDate(milestone.date)}</span>
              <span>{milestone.readinessGaps.length ? milestone.readinessGaps.join(', ') : 'No open gaps'}</span>
              <StatusBadge status={milestone.state} />
            </Link>
          ))}
        </div>
      </section>

      <section className="ops-panel">
        <div className="ops-panel__heading">
          <h2>Actions Required This Week</h2>
          <span>{actionsThisWeek.length} owner commitments</span>
        </div>
        <div className="ops-table ops-table--actions" role="table" aria-label="Actions required this week">
          <div className="ops-table__header" role="row">
            <span>Project</span>
            <span>Action</span>
            <span>Category</span>
            <span>Owner</span>
            <span>Due Date</span>
            <span>Status</span>
          </div>
          {actionsThisWeek.map((item) => (
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
      </section>

      <div className="ops-grid ops-grid--thirds">
        <section className="ops-panel">
          <div className="ops-panel__heading">
            <h2>Emerging Risks</h2>
            <span>Likely red in 30 days</span>
          </div>
          <div className="ops-list">
            {emergingRisks.map((risk) => (
              <Link to={`/projects/${risk.projectId}`} className="ops-list__item" key={risk.id}>
                <strong>{risk.title}</strong>
                <span>{risk.projectNumber} - {risk.category} - {risk.owner}</span>
                <p>{risk.mitigation}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="ops-panel">
          <div className="ops-panel__heading">
            <h2>Projects At Risk</h2>
            <span>Operational ranking</span>
          </div>
          <div className="risk-rank">
            {projectsAtRisk.map((project, index) => (
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

        <section className="ops-panel">
          <div className="ops-panel__heading">
            <h2>Resource Constraints</h2>
            <span>Future module placeholder</span>
          </div>
          <div className="ops-list">
            {resourceConstraints.map((constraint) => (
              <article className="ops-list__item" key={constraint.id}>
                <div className="item-title-row">
                  <strong>{constraint.area}</strong>
                  <StatusBadge status={constraint.severity} />
                </div>
                <span>{constraint.window}</span>
                <p>{constraint.constraint}</p>
                <small>{constraint.affectedProjects.join(', ')}</small>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
