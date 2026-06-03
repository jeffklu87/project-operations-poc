import { AlertTriangle, ClipboardList, PackageX, Rocket } from 'lucide-react';
import { ModuleSummaryCard } from '../components/ModuleSummaryCard';
import { ProjectCard } from '../components/ProjectCard';
import { projects, type StatusLevel } from '../data/mockData';

const moduleKeys = ['overall', 'procurement', 'resources', 'startup', 'documentation'] as const;

const getModuleAverage = (key: (typeof moduleKeys)[number]) => {
  const total = projects.reduce((sum, project) => sum + (project.modules.find((module) => module.key === key)?.progress ?? 0), 0);
  return Math.round(total / projects.length);
};

const atRiskProjects = projects.filter((project) =>
  project.modules.some((module) => module.status === 'At Risk' || module.status === 'Blocked'),
).length;

const procurementIssues = projects.filter((project) => {
  const procurement = project.modules.find((module) => module.key === 'procurement');
  return procurement?.status === 'Watch' || procurement?.status === 'At Risk' || procurement?.status === 'Blocked';
}).length;

const startupReadiness = getModuleAverage('startup');

const dashboardMetrics = [
  { label: 'Active Projects', value: projects.length, icon: ClipboardList, detail: 'Projects in the current operations portfolio' },
  { label: 'At Risk Projects', value: atRiskProjects, icon: AlertTriangle, detail: 'Projects with a red module status requiring escalation' },
  { label: 'Procurement Issues', value: procurementIssues, icon: PackageX, detail: 'Projects with procurement watch or risk indicators' },
  { label: 'Startup Readiness', value: `${startupReadiness}%`, icon: Rocket, detail: 'Average startup module readiness across projects' },
];

export function Dashboard() {
  const portfolioModules = moduleKeys.map((key) => {
    const sample = projects[0].modules.find((module) => module.key === key)!;
    const progress = getModuleAverage(key);
    const status: StatusLevel = progress >= 65 ? 'On Track' : progress >= 45 ? 'Watch' : 'At Risk';

    return {
      ...sample,
      progress,
      summary: `Portfolio average readiness for ${sample.label.toLowerCase()} across all mock projects.`,
      owner: 'Operations PMO',
      status,
    };
  });

  return (
    <section className="page-stack">
      <div className="dashboard-intro">
        <div>
          <p className="eyebrow">Portfolio control center</p>
          <h2>Project health, operational risk, and module readiness at a glance</h2>
        </div>
        <p>
          A mock-data dashboard focused on project operations, procurement pressure, resources, startup readiness, and documentation follow-through.
        </p>
      </div>

      <div className="metric-grid">
        {dashboardMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <article className="metric-card" key={metric.label}>
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

      <div className="section-heading">
        <div>
          <p className="eyebrow">Projects</p>
          <h2>Operations portfolio</h2>
        </div>
        <span>{projects.length} active projects</span>
      </div>
      <div className="project-grid">
        {projects.map((project) => (
          <ProjectCard project={project} key={project.id} />
        ))}
      </div>

      <div className="section-heading">
        <div>
          <p className="eyebrow">Module health</p>
          <h2>Portfolio status summary</h2>
        </div>
      </div>
      <div className="module-grid">
        {portfolioModules.map((module) => (
          <ModuleSummaryCard key={module.key} module={module} />
        ))}
      </div>
    </section>
  );
}
