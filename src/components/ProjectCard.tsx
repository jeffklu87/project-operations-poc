import { ArrowRight, BriefcaseBusiness, CalendarClock, MapPin, UserRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDate, getProjectAttentionScore, getReadinessStatus, type Project } from '../data/mockData';
import { StatusBadge } from './StatusBadge';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const redItems = project.readinessItems.filter((item) => getReadinessStatus(item) === 'Red');
  const yellowItems = project.readinessItems.filter((item) => getReadinessStatus(item) === 'Yellow');
  const nextMilestone = project.milestones.find((milestone) => milestone.state !== 'Complete');
  const topAttentionItem = [...redItems, ...yellowItems][0];
  const attentionScore = getProjectAttentionScore(project);

  return (
    <article className="project-card">
      <div className="project-card__header">
        <div>
          <p className="eyebrow">{project.projectNumber}</p>
          <h3>{project.name}</h3>
        </div>
        <div className="attention-counts" aria-label={`${project.name} readiness attention counts`}>
          <span className="count-pill count-pill--red">{redItems.length} red</span>
          <span className="count-pill count-pill--yellow">{yellowItems.length} yellow</span>
        </div>
      </div>

      <dl className="project-card__facts" aria-label={`${project.name} key facts`}>
        <div>
          <dt>
            <BriefcaseBusiness size={15} /> Client
          </dt>
          <dd>{project.client}</dd>
        </div>
        <div>
          <dt>
            <UserRound size={15} /> PM
          </dt>
          <dd>{project.manager}</dd>
        </div>
        <div>
          <dt>
            <MapPin size={15} /> Location
          </dt>
          <dd>{project.location}</dd>
        </div>
        <div>
          <dt>
            <CalendarClock size={15} /> Next milestone
          </dt>
          <dd>{nextMilestone ? `${nextMilestone.name} - ${formatDate(nextMilestone.date)}` : 'No active milestones'}</dd>
        </div>
      </dl>

      <div className="attention-panel">
        <span>Huddle reason</span>
        {topAttentionItem ? (
          <>
            <strong>{topAttentionItem.title}</strong>
            <p>{topAttentionItem.actionRequired}</p>
            <div className="attention-panel__meta">
              <StatusBadge status={getReadinessStatus(topAttentionItem)} />
              <span>{topAttentionItem.category}</span>
              <span>Due {formatDate(topAttentionItem.dueDate)}</span>
            </div>
          </>
        ) : (
          <>
            <strong>No current management attention</strong>
            <p>Active readiness items are green or not yet applicable.</p>
          </>
        )}
      </div>

      <div className="project-card__footer">
        <span>{project.phase} · attention score {attentionScore}</span>
        <Link to={`/projects/${project.id}`} aria-label={`View ${project.name} details`}>
          View details <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}
