import { Link } from 'react-router-dom';
import { StatusBadge } from '../components/StatusBadge';
import {
  daysUntil,
  formatDate,
  getProjectAttentionScore,
  getReadinessStatus,
  getUpcomingMilestones,
  operatingModules,
  projects,
  readinessItems,
  risks,
} from '../data/mockData';

export function Portfolio() {
  const redItems = readinessItems.filter((item) => getReadinessStatus(item) === 'Red');
  const yellowItems = readinessItems.filter((item) => getReadinessStatus(item) === 'Yellow');
  const upcomingMilestones = getUpcomingMilestones(8);
  const projectsByAttention = [...projects].sort((a, b) => getProjectAttentionScore(b) - getProjectAttentionScore(a));
  const attentionProjects = projectsByAttention
    .filter((project) => getProjectAttentionScore(project) >= 3 || project.risks.some((risk) => risk.trend === 'Increasing'))
    .slice(0, 5);
  const planningProjects = projectsByAttention.filter((project) => (
    !attentionProjects.some((attentionProject) => attentionProject.id === project.id)
    && project.readinessItems.some((item) => getReadinessStatus(item) === 'Yellow' || (item.active && daysUntil(item.dueDate) <= 30))
  ));
  const healthyProjects = Math.max(58, projects.length - attentionProjects.length - planningProjects.length);
  const emergingRisks = risks.filter((risk) => risk.trend === 'Increasing' || risk.likelihood === 'High');

  return (
    <section className="ops-page">
      <header className="ops-header">
        <div>
          <p className="eyebrow">Portfolio</p>
          <h1>Attention command center</h1>
        </div>
        <span>Manage intervention, planning, and healthy flow</span>
      </header>

      <section className="metric-strip" aria-label="Portfolio summary">
        <article><span>Attention Required</span><strong>{attentionProjects.length}</strong></article>
        <article><span>Planning Required</span><strong>{planningProjects.length}</strong></article>
        <article><span>Healthy Projects</span><strong>{healthyProjects}</strong></article>
        <article><span>Red Items</span><strong>{redItems.length}</strong></article>
        <article><span>Yellow Items</span><strong>{yellowItems.length}</strong></article>
      </section>

      <section className="ops-panel ops-panel--red">
        <div className="ops-panel__heading">
          <h2>Attention Required</h2>
          <span>Top projects requiring intervention</span>
        </div>
        <div className="attention-project-list">
          {attentionProjects.map((project, index) => {
            const topGap = project.readinessItems.find((item) => getReadinessStatus(item) === 'Red')
              ?? project.readinessItems.find((item) => getReadinessStatus(item) === 'Yellow');
            const nextMilestone = project.milestones.find((milestone) => milestone.state !== 'Complete');

            return (
              <Link to={`/projects/${project.id}`} className="attention-project" key={project.id}>
                <strong>{index + 1}</strong>
                <div>
                  <span>{project.projectNumber} - {project.name}</span>
                  <p>{topGap?.actionRequired ?? project.riskSummary}</p>
                </div>
                <div>
                  <small>Why it matters</small>
                  <span>{nextMilestone ? `${nextMilestone.name} ${formatDate(nextMilestone.date)}` : project.phase}</span>
                </div>
                <StatusBadge status={getProjectAttentionScore(project) >= 6 ? 'Red' : 'Yellow'} />
              </Link>
            );
          })}
        </div>
      </section>

      <section className="ops-panel ops-panel--yellow">
        <div className="ops-panel__heading">
          <h2>Planning Required</h2>
          <span>Needs attention within 30 days</span>
        </div>
        <div className="ops-table ops-table--planning">
          <div className="ops-table__header">
            <span>Project</span>
            <span>Planning Need</span>
            <span>Milestone</span>
            <span>Owner</span>
            <span>Due</span>
          </div>
          {planningProjects.map((project) => {
            const item = project.readinessItems.find((readinessItem) => getReadinessStatus(readinessItem) === 'Yellow')
              ?? project.readinessItems.find((readinessItem) => readinessItem.active);

            return (
              <Link className="ops-table__row" to={`/projects/${project.id}`} key={project.id}>
                <strong>{project.projectNumber} - {project.name}</strong>
                <span>{item?.actionRequired ?? project.riskSummary}</span>
                <span>{item?.milestoneName ?? project.phase}</span>
                <span>{item?.owner ?? project.manager}</span>
                <span>{item ? formatDate(item.dueDate) : 'This month'}</span>
              </Link>
            );
          })}
        </div>
      </section>

      <details className="ops-panel attention-disclosure">
        <summary>
          <span>
            <strong>Healthy Projects</strong>
            <small>{healthyProjects} projects operating inside expected readiness bands</small>
          </span>
          <span className="summary-metrics"><b>Expand for list</b></span>
        </summary>
        <div className="ops-list">
          <article className="ops-list__item">
            <strong>Stable execution group</strong>
            <span>Representative mock rollup for portfolio scale</span>
            <p>Projects without red readiness gaps or increasing risks remain summarized until a milestone, gap, or risk requires attention.</p>
          </article>
        </div>
      </details>

      <div className="ops-grid">
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
            <h2>Emerging Risks</h2>
            <span>Where management time should go</span>
          </div>
          <div className="ops-list">
            {emergingRisks.map((risk) => (
              <Link to={`/projects/${risk.projectId}`} className="ops-list__item" key={risk.id}>
                <strong>{risk.title}</strong>
                <span>{risk.projectNumber} - impacts {risk.milestoneImpact.join(' / ')}</span>
                <p>{risk.mitigation}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <section className="ops-panel">
        <div className="ops-panel__heading">
          <h2>Operating Modules</h2>
          <span>Decision support roadmap</span>
        </div>
        <div className="module-decision-grid">
          {operatingModules.map((module) => (
            <article className="module-decision" key={module.id}>
              <div className="item-title-row">
                <strong>{module.name}</strong>
                <StatusBadge status={module.status === 'Active' ? 'Green' : module.status === 'Watch' ? 'Yellow' : 'Upcoming'} label={module.status} />
              </div>
              <span>Decision: {module.decisionSupported}</span>
              <p>{module.output}</p>
              <small>{module.signals.join(' | ')}</small>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
