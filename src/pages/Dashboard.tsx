import { AlertTriangle, CalendarClock, CircleDot, ClipboardList, MessageSquareWarning } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ModuleSummaryCard } from '../components/ModuleSummaryCard';
import { ProjectCard } from '../components/ProjectCard';
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
  const greenItems = readinessItems.filter((item) => getReadinessStatus(item) === 'Green');
  const upcomingMilestones = getUpcomingMilestones(7);
  const projectsNeedingAttention = [...projects]
    .filter((project) => getProjectAttentionScore(project) > 0)
    .sort((a, b) => getProjectAttentionScore(b) - getProjectAttentionScore(a));
  const categorySummaries = getCategorySummaries();

  const portfolioMetrics = [
    { label: 'Red readiness items', value: redItems.length, detail: 'Require action or resolution in the next week', icon: AlertTriangle, tone: 'red' },
    { label: 'Yellow readiness items', value: yellowItems.length, detail: 'Require planning in the next 30 days', icon: CalendarClock, tone: 'yellow' },
    { label: 'Projects for huddle', value: projectsNeedingAttention.length, detail: 'Projects with red or yellow management items', icon: MessageSquareWarning, tone: 'blue' },
    { label: 'Green active items', value: greenItems.length, detail: 'Visible, but not driving manager attention', icon: ClipboardList, tone: 'green' },
  ];

  return (
    <section className="page-stack">
      <div className="hero-panel">
        <div>
          <p className="eyebrow">Portfolio dashboard</p>
          <h1>Manager huddle view for project readiness</h1>
          <p>
            Red and yellow readiness items are evaluated from due dates, active project facts, and completion state so managers can see what needs action this week and planning this month.
          </p>
        </div>
        <div className="hero-panel__callout">
          <span>Readiness logic</span>
          <strong>Red first</strong>
          <p>Projects are not manually colored. Their readiness items drive the attention view.</p>
        </div>
      </div>

      <div className="metric-grid">
        {portfolioMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <article className={`metric-card metric-card--${metric.tone}`} key={metric.label}>
              <span className="metric-card__icon">
                <Icon size={22} />
              </span>
              <div>
                <span>{metric.label}</span>
                <strong>{metric.value}</strong>
                <p>{metric.detail}</p>
              </div>
            </article>
          );
        })}
      </div>

      <div className="split-grid split-grid--priority">
        <section className="priority-panel priority-panel--red">
          <div className="section-heading">
            <div>
              <p className="eyebrow">This week</p>
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
                  <p>{item.projectNumber} · {item.projectName}</p>
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
              <p className="eyebrow">Next 30 days</p>
              <h2>Yellow readiness items</h2>
            </div>
            <span>{yellowItems.length} open</span>
          </div>
          <div className="item-list">
            {yellowItems.slice(0, 8).map((item) => (
              <Link className="readiness-row" to={`/projects/${item.projectId}`} key={item.id}>
                <StatusBadge status="Yellow" />
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.projectNumber} · {item.projectName}</p>
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

      <div className="split-grid">
        <section className="table-card">
          <div className="section-heading section-heading--inset">
            <div>
              <p className="eyebrow">Milestones</p>
              <h2>Upcoming portfolio milestones</h2>
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
                    <td>{milestone.projectNumber} · {milestone.projectName}</td>
                    <td>{formatDate(milestone.date)}</td>
                    <td><StatusBadge status={milestone.state} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="huddle-list">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Manager huddle</p>
              <h2>Projects needing attention</h2>
            </div>
          </div>
          {projectsNeedingAttention.map((project) => {
            const redCount = project.readinessItems.filter((item) => getReadinessStatus(item) === 'Red').length;
            const yellowCount = project.readinessItems.filter((item) => getReadinessStatus(item) === 'Yellow').length;
            return (
              <Link className="huddle-card" to={`/projects/${project.id}`} key={project.id}>
                <CircleDot size={18} />
                <div>
                  <strong>{project.name}</strong>
                  <p>{project.manager} · {project.phase}</p>
                </div>
                <div className="attention-counts">
                  <span className="count-pill count-pill--red">{redCount} red</span>
                  <span className="count-pill count-pill--yellow">{yellowCount} yellow</span>
                </div>
              </Link>
            );
          })}
        </section>
      </div>

      <div className="section-heading">
        <div>
          <p className="eyebrow">Category breakdown</p>
          <h2>Readiness by operating category</h2>
        </div>
      </div>
      <div className="module-grid">
        {categorySummaries.map((summary) => (
          <ModuleSummaryCard key={summary.category} module={summary} />
        ))}
      </div>

      <div className="section-heading">
        <div>
          <p className="eyebrow">Portfolio</p>
          <h2>Project cards</h2>
        </div>
        <span>{projects.length} active PoC projects</span>
      </div>
      <div className="project-grid">
        {projects.map((project) => (
          <ProjectCard project={project} key={project.id} />
        ))}
      </div>
    </section>
  );
}
