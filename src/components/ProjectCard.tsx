import { ArrowRight, BriefcaseBusiness, CalendarClock, MapPin, UserRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { ModuleKey, ModuleStatus, Project } from '../data/mockData';
import { ProgressBar } from './ProgressBar';
import { StatusBadge } from './StatusBadge';

interface ProjectCardProps {
  project: Project;
}

const moduleOrder: ModuleKey[] = ['procurement', 'resources', 'startup', 'documentation'];

export function ProjectCard({ project }: ProjectCardProps) {
  const overall = project.modules.find((module) => module.key === 'overall');
  const supportingModules = moduleOrder
    .map((key) => project.modules.find((module) => module.key === key))
    .filter((module): module is ModuleStatus => Boolean(module));

  return (
    <article className="project-card">
      <div className="project-card__header">
        <div>
          <p className="eyebrow">{project.projectNumber}</p>
          <h3>{project.name}</h3>
        </div>
        {overall && <StatusBadge status={overall.status} />}
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
          <dd>{project.nextMilestone}</dd>
        </div>
      </dl>

      <div className="project-card__progress">
        <div>
          <span>Completion</span>
          <strong>{project.completion}%</strong>
        </div>
        <ProgressBar value={project.completion} label={`${project.name} completion`} />
      </div>

      <div className="project-card__modules" aria-label={`${project.name} module status summary`}>
        {supportingModules.map((module) => (
          <div key={module.key}>
            <span>{module.label}</span>
            <StatusBadge status={module.status} />
          </div>
        ))}
      </div>

      <div className="project-card__footer">
        <span>{project.phase}</span>
        <Link to={`/projects/${project.id}`} aria-label={`View ${project.name} details`}>
          View details <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}
