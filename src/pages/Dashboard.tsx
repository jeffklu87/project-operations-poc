import { Activity, AlertTriangle, CheckCircle2, ClipboardList } from 'lucide-react';
import { ModuleSummaryCard } from '../components/ModuleSummaryCard';
import { ProjectCard } from '../components/ProjectCard';
import { projects, type StatusLevel } from '../data/mockData';

const moduleKeys = ['overall', 'procurement', 'resources', 'startup', 'documentation'] as const;

const getModuleAverage = (key: (typeof moduleKeys)[number]) => {
  const total = projects.reduce((sum, project) => sum + (project.modules.find((module) => module.key === key)?.progress ?? 0), 0);
  return Math.round(total / projects.length);
};

const dashboardMetrics = [
  { label: 'Active projects', value: projects.length, icon: ClipboardList, detail: 'Across water, utility, and campus work' },
  { label: 'On-track modules', value: projects.flatMap((project) => project.modules).filter((module) => module.status === 'On Track').length, icon: CheckCircle2, detail: 'Operational modules in good standing' },
  { label: 'Watch / at-risk modules', value: projects.flatMap((project) => project.modules).filter((module) => module.status === 'Watch' || module.status === 'At Risk').length, icon: AlertTriangle, detail: 'Need project team attention' },
  { label: 'Average completion', value: `${Math.round(projects.reduce((sum, project) => sum + project.completion, 0) / projects.length)}%`, icon: Activity, detail: 'Portfolio construction readiness' },
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
      <div className="hero-panel">
        <div>
          <p className="eyebrow">Project Operations PoC</p>
          <h1>Operational status command center</h1>
          <p>
            Monitor procurement, resources, startup readiness, and documentation health using realistic mock data before backend integration.
          </p>
        </div>
        <div className="hero-panel__callout">
          <span>Portfolio pulse</span>
          <strong>Managed visibility</strong>
          <p>Built for weekly project reviews and executive status standups.</p>
        </div>
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
          <p className="eyebrow">Dashboard</p>
          <h2>Project cards</h2>
        </div>
        <span>{projects.length} mock projects</span>
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
