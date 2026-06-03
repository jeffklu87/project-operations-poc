import { ArrowRight, CalendarClock, UserRound } from 'lucide-react';
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

      <div className="project-card__meta-grid" aria-label={`${project.name} primary project information`}>
        <div>
          <span>
            <UserRound size={15} /> PM
          </span>
          <strong>{project.manager}</strong>
        </div>
        <div>
          <span>
            <CalendarClock size={15} /> Next milestone
          </span>
          <strong>{project.nextMilestone}</strong>
        </div>
      </div>

      <div className="project-card__modules" aria-label={`${project.name} module status summary`}>
        {supportingModules.map((module) => (
          <div className="module-status-row" key={module.key}>
            <span>{module.label}</span>
            <StatusBadge status={module.status} />
          </div>
        ))}
      </div>

      <div className="project-card__progress">
        <div>
          <span>Completion</span>
          <strong>{project.completion}%</strong>
        </div>
        <ProgressBar value={project.completion} label={`${project.name} completion`} />
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
