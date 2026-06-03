import { CircleDot } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ModuleSummaryCard } from '../components/ModuleSummaryCard';
import { StatusBadge } from '../components/StatusBadge';
import {
  formatDate,
  getCategorySummaries,
  getProjectAttentionScore,
  getReadinessStatus,
  getUpcomingMilestones,
  projects,
  readinessItems,
} from '../data/mockData';

export function Dashboard() {
  const redItems = readinessItems.filter((item) => getReadinessStatus(item) === 'Red');
  const yellowItems = readinessItems.filter((item) => getReadinessStatus(item) === 'Yellow');
  const upcomingMilestones = getUpcomingMilestones(6);
  const projectsNeedingAttention = [...projects]
    .filter((project) => getProjectAttentionScore(project) > 0)
    .sort((a, b) => getProjectAttentionScore(b) - getProjectAttentionScore(a));
  const categorySummaries = getCategorySummaries();

  return (
    <section className="page-stack">
      <div className="hero-panel hero-panel--compact">
        <div>
          <p className="eyebrow">Manager huddle</p>
          <h1>What needs attention before the next project huddle?</h1>
          <p>
            Start with red items, then yellow planning items, then the projects that need discussion. Supporting context stays below the action list.
          </p>
        </div>
      </div>

      <div className="split-grid split-grid--priority">
        <section className="priority-panel priority-panel--red">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Action this week</p>
              <h2>Red readiness items</h2>
            </div>
            <span>{redItems.length} open</span>
          </div>
          <div className="item-list">
            {redItems.map((item) => (
              <Link className="readiness-row" to={`/projects/${item.projectId}`} key={item.id}>
                <StatusBadge status="Red" />
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.projectNumber} - {item.projectName}</p>
                  <span>{item.actionRequired}</span>
                </div>
                <div className="row-meta">
                  <span>{item.owner}</span>
                  <strong>{formatDate(item.dueDate)}</strong>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="priority-panel priority-panel--yellow">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Plan this month</p>
              <h2>Yellow readiness items</h2>
            </div>
            <span>{yellowItems.length} open</span>
          </div>
          <div className="item-list">
            {yellowItems.map((item) => (
              <Link className="readiness-row" to={`/projects/${item.projectId}`} key={item.id}>
                <StatusBadge status="Yellow" />
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.projectNumber} - {item.projectName}</p>
                  <span>{item.actionRequired}</span>
                </div>
                <div className="row-meta">
                  <span>{item.owner}</span>
                  <strong>{formatDate(item.dueDate)}</strong>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <section className="huddle-list">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Discussion list</p>
            <h2>Projects requiring huddle discussion</h2>
          </div>
          <span>{projectsNeedingAttention.length} projects</span>
        </div>
        <div className="huddle-grid">
          {projectsNeedingAttention.map((project) => {
            const redCount = project.readinessItems.filter((item) => getReadinessStatus(item) === 'Red').length;
            const yellowCount = project.readinessItems.filter((item) => getReadinessStatus(item) === 'Yellow').length;
            const topItem = project.readinessItems.find((item) => getReadinessStatus(item) === 'Red')
              ?? project.readinessItems.find((item) => getReadinessStatus(item) === 'Yellow');

            return (
              <Link className="huddle-card" to={`/projects/${project.id}`} key={project.id}>
                <CircleDot size={18} />
                <div>
                  <strong>{project.name}</strong>
                  <p>{project.manager} - {topItem?.actionRequired ?? project.phase}</p>
                </div>
                <div className="attention-counts">
                  <span className="count-pill count-pill--red">{redCount} red</span>
                  <span className="count-pill count-pill--yellow">{yellowCount} yellow</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <div className="split-grid">
        <section className="table-card">
          <div className="section-heading section-heading--inset">
            <div>
              <p className="eyebrow">Supporting context</p>
              <h2>Upcoming milestones</h2>
            </div>
          </div>
          <div className="responsive-table">
            <table>
              <thead>
                <tr>
                  <th>Milestone</th>
                  <th>Project</th>
                  <th>Date</th>
                  <th>State</th>
                </tr>
              </thead>
              <tbody>
                {upcomingMilestones.map((milestone) => (
                  <tr key={milestone.id}>
                    <td><strong>{milestone.name}</strong></td>
                    <td>{milestone.projectNumber} - {milestone.projectName}</td>
                    <td>{formatDate(milestone.date)}</td>
                    <td><StatusBadge status={milestone.state} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <div className="section-heading">
            <div>
              <p className="eyebrow">Category scan</p>
              <h2>Where attention is concentrated</h2>
            </div>
          </div>
          <div className="category-stack">
            {categorySummaries.map((summary) => (
              <ModuleSummaryCard key={summary.category} module={summary} />
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
