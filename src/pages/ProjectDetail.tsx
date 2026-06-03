import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { ModuleSummaryCard } from '../components/ModuleSummaryCard';
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
        <Link to="/">Return to dashboard</Link>
      </section>
    );
  }

  const redItems = project.readinessItems.filter((item) => getReadinessStatus(item) === 'Red');
  const yellowItems = project.readinessItems.filter((item) => getReadinessStatus(item) === 'Yellow');
  const discussionItems = [...redItems, ...yellowItems];
  const categorySummaries = getCategorySummaries(project.readinessItems);
  const nextMilestone = project.milestones.find((milestone) => milestone.state !== 'Complete');

  return (
    <section className="page-stack">
      <Link className="back-link" to="/">
        <ArrowLeft size={16} /> Back to manager huddle
      </Link>

      <div className="detail-hero detail-hero--focused">
        <div>
          <p className="eyebrow">{project.projectNumber} - {project.manager}</p>
          <div className="detail-hero__title">
            <h1>{project.name}</h1>
            <div className="attention-counts">
              <span className="count-pill count-pill--red">{redItems.length} red</span>
              <span className="count-pill count-pill--yellow">{yellowItems.length} yellow</span>
            </div>
          </div>
          <p>{project.latestUpdate}</p>
        </div>
        <div className="hero-panel__callout">
          <span>Next milestone</span>
          <strong>{nextMilestone?.name ?? 'None active'}</strong>
          {nextMilestone && <p>{formatDate(nextMilestone.date)} - {nextMilestone.state}</p>}
        </div>
      </div>

      <section className="priority-panel priority-panel--red">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Discuss first</p>
            <h2>Project discussion items</h2>
          </div>
          <span>{discussionItems.length} red/yellow items</span>
        </div>
        <div className="item-list">
          {discussionItems.length === 0 && <p className="empty-inline">No red or yellow discussion items for this project.</p>}
          {discussionItems.map((item) => (
            <article className="readiness-row" key={item.id}>
              <StatusBadge status={getReadinessStatus(item)} />
              <div>
                <strong>{item.title}</strong>
                <p>{item.category} - {item.actionRequired}</p>
                <span>{item.latestUpdate}</span>
              </div>
              <div className="row-meta">
                <span>{item.owner}</span>
                <strong>{formatDate(item.dueDate)}</strong>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="table-card">
        <div className="section-heading section-heading--inset">
          <div>
            <p className="eyebrow">Timeline</p>
            <h2>Key milestones</h2>
          </div>
        </div>
        <div className="milestone-strip">
          {project.milestones.map((milestone) => (
            <article className="milestone-card" key={milestone.id}>
              <StatusBadge status={milestone.state} />
              <strong>{milestone.name}</strong>
              <span>{formatDate(milestone.date)}</span>
            </article>
          ))}
        </div>
      </section>

      <div className="section-heading">
        <div>
          <p className="eyebrow">Readiness categories</p>
          <h2>Category cards</h2>
        </div>
      </div>
      <div className="module-grid">
        {categorySummaries.map((summary) => (
          <ModuleSummaryCard key={summary.category} module={summary} />
        ))}
      </div>

      <section className="table-card">
        <div className="section-heading section-heading--inset">
          <div>
            <p className="eyebrow">Readiness item table</p>
            <h2>All actions, owners, due dates, and updates</h2>
          </div>
          <span>{project.readinessItems.length} tracked items</span>
        </div>
        <div className="responsive-table">
          <table>
            <thead>
              <tr>
                <th>Status</th>
                <th>Item</th>
                <th>Category</th>
                <th>Owner</th>
                <th>Due</th>
                <th>Action required</th>
                <th>Latest update</th>
                <th>Source</th>
              </tr>
            </thead>
            <tbody>
              {project.readinessItems.map((item) => (
                <tr key={item.id}>
                  <td><StatusBadge status={getReadinessStatus(item)} /></td>
                  <td>
                    <strong>{item.title}</strong>
                    <span>{item.state}</span>
                  </td>
                  <td>{item.category}</td>
                  <td>{item.owner}</td>
                  <td>{formatDate(item.dueDate)}</td>
                  <td>{item.actionRequired}</td>
                  <td>{item.latestUpdate}</td>
                  <td>{item.sourceReference ?? 'Project readiness rules'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="project-metadata">
        <span>{project.client}</span>
        <span>{project.location}</span>
        <span>{project.phase}</span>
        <span>{project.contractValue}</span>
      </section>
    </section>
  );
}
