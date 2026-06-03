import { ArrowLeft, BriefcaseBusiness, CalendarDays, MapPin, UserRound } from 'lucide-react';
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
  const categorySummaries = getCategorySummaries(project.readinessItems);
  const nextMilestone = project.milestones.find((milestone) => milestone.state !== 'Complete');

  return (
    <section className="page-stack">
      <Link className="back-link" to="/">
        <ArrowLeft size={16} /> Back to portfolio dashboard
      </Link>

      <div className="detail-hero">
        <div>
          <p className="eyebrow">Project detail / {project.projectNumber}</p>
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
          {nextMilestone && <p>{formatDate(nextMilestone.date)} · {nextMilestone.state}</p>}
        </div>
      </div>

      <div className="overview-grid">
        <article>
          <BriefcaseBusiness size={20} />
          <span>Client</span>
          <strong>{project.client}</strong>
        </article>
        <article>
          <MapPin size={20} />
          <span>Location</span>
          <strong>{project.location}</strong>
        </article>
        <article>
          <UserRound size={20} />
          <span>Project manager</span>
          <strong>{project.manager}</strong>
        </article>
        <article>
          <CalendarDays size={20} />
          <span>Contract value</span>
          <strong>{project.contractValue}</strong>
        </article>
      </div>

      <section className="table-card">
        <div className="section-heading section-heading--inset">
          <div>
            <p className="eyebrow">Key milestones</p>
            <h2>Project readiness timeline</h2>
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
            <p className="eyebrow">Readiness item list</p>
            <h2>Actions, owners, due dates, and latest update</h2>
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

      <section className="notes-panel">
        <div>
          <p className="eyebrow">Latest update</p>
          <h2>Manager note</h2>
        </div>
        <p>{project.latestUpdate}</p>
      </section>
    </section>
  );
}
