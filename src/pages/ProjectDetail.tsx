import { ArrowLeft, CalendarDays, DollarSign, MapPin, UserRound } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { ModuleSummaryCard } from '../components/ModuleSummaryCard';
import { ProgressBar } from '../components/ProgressBar';
import { StatusBadge } from '../components/StatusBadge';
import { getProjectById } from '../data/mockData';

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

  const overall = project.modules.find((module) => module.key === 'overall');

  return (
    <section className="page-stack">
      <Link className="back-link" to="/">
        <ArrowLeft size={16} /> Back to dashboard
      </Link>

      <div className="detail-hero">
        <div>
          <p className="eyebrow">Project detail / {project.projectNumber}</p>
          <div className="detail-hero__title">
            <h1>{project.name}</h1>
            {overall && <StatusBadge status={overall.status} />}
          </div>
          <p>{overall?.summary}</p>
        </div>
        <div className="detail-hero__progress">
          <span>Completion</span>
          <strong>{project.completion}%</strong>
          <ProgressBar value={project.completion} label={`${project.name} completion`} />
        </div>
      </div>

      <div className="overview-grid">
        <article>
          <MapPin size={20} />
          <span>Location</span>
          <strong>{project.location}</strong>
        </article>
        <article>
          <UserRound size={20} />
          <span>PM</span>
          <strong>{project.manager}</strong>
        </article>
        <article>
          <DollarSign size={20} />
          <span>Budget</span>
          <strong>{project.budget}</strong>
        </article>
        <article>
          <CalendarDays size={20} />
          <span>Next milestone</span>
          <strong>{project.nextMilestone}</strong>
        </article>
      </div>

      <div className="section-heading">
        <div>
          <p className="eyebrow">Operational modules</p>
          <h2>Module summary cards</h2>
        </div>
      </div>
      <div className="module-grid">
        {project.modules.map((module) => (
          <ModuleSummaryCard key={module.key} module={module} />
        ))}
      </div>

      <div className="section-heading">
        <div>
          <p className="eyebrow">Action tracking</p>
          <h2>Open issues</h2>
        </div>
        <span>{project.issues.length} open</span>
      </div>
      <div className="table-card">
        <div className="responsive-table">
          <table>
            <thead>
              <tr>
                <th>Issue</th>
                <th>Module</th>
                <th>Severity</th>
                <th>Due</th>
              </tr>
            </thead>
            <tbody>
              {project.issues.map((issue) => (
                <tr key={issue.id}>
                  <td>
                    <strong>{issue.id}</strong>
                    <span>{issue.title}</span>
                  </td>
                  <td>{issue.module}</td>
                  <td>
                    <StatusBadge status={issue.severity} />
                  </td>
                  <td>{issue.dueDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
