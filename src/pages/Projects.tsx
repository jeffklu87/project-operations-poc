import { Link } from 'react-router-dom';
import { StatusBadge } from '../components/StatusBadge';
import { formatDate, getProjectAttentionScore, getReadinessStatus, projects } from '../data/mockData';

export function Projects() {
  return (
    <section className="ops-page">
      <header className="ops-header">
        <div>
          <p className="eyebrow">Projects</p>
          <h1>Execution register</h1>
        </div>
        <span>{projects.length} active projects</span>
      </header>

      <section className="ops-panel">
        <div className="ops-panel__heading">
          <h2>Project List</h2>
          <span>Milestones, readiness, and risk</span>
        </div>
        <div className="ops-table ops-table--projects">
          <div className="ops-table__header">
            <span>Project</span>
            <span>PM</span>
            <span>Client</span>
            <span>Phase</span>
            <span>Next Milestone</span>
            <span>Red</span>
            <span>Yellow</span>
            <span>Risk</span>
          </div>
          {projects.map((project) => {
            const nextMilestone = project.milestones.find((milestone) => milestone.state !== 'Complete');
            const redCount = project.readinessItems.filter((item) => getReadinessStatus(item) === 'Red').length;
            const yellowCount = project.readinessItems.filter((item) => getReadinessStatus(item) === 'Yellow').length;

            return (
              <Link className="ops-table__row" to={`/projects/${project.id}`} key={project.id}>
                <strong>{project.projectNumber} - {project.name}</strong>
                <span>{project.manager}</span>
                <span>{project.client}</span>
                <span>{project.phase}</span>
                <span>{nextMilestone ? `${nextMilestone.name} ${formatDate(nextMilestone.date)}` : 'None'}</span>
                <span className="count-pill count-pill--red">{redCount}</span>
                <span className="count-pill count-pill--yellow">{yellowCount}</span>
                <StatusBadge status={getProjectAttentionScore(project) >= 6 ? 'Red' : getProjectAttentionScore(project) > 0 ? 'Yellow' : 'Green'} />
              </Link>
            );
          })}
        </div>
      </section>
    </section>
  );
}
