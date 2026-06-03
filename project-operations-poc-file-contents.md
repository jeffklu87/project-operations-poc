# Project Operations PoC file contents

Files are listed in the requested order.

## package.json

```json
{
  "name": "project-operations-poc",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "node scripts/build.mjs",
    "lint": "eslint .",
    "preview": "vite preview",
    "build:vite": "vite build"
  },
  "dependencies": {
    "@vitejs/plugin-react": "latest",
    "vite": "latest",
    "typescript": "latest",
    "react": "latest",
    "react-dom": "latest",
    "react-router-dom": "latest",
    "lucide-react": "latest"
  },
  "devDependencies": {
    "eslint": "latest",
    "@eslint/js": "latest",
    "typescript-eslint": "latest",
    "globals": "latest",
    "@types/react": "latest",
    "@types/react-dom": "latest"
  }
}

```

## src/App.tsx

```tsx
import { Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout';
import { Dashboard } from './pages/Dashboard';
import { Procurement } from './pages/Procurement';
import { ProjectDetail } from './pages/ProjectDetail';

const projectOperationsRoutes = (
  <Route element={<AppLayout />}>
    <Route index element={<Dashboard />} />
    <Route path="projects/:projectId" element={<ProjectDetail />} />
    <Route path="procurement" element={<Procurement />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Route>
);

export default function App() {
  return <Routes>{projectOperationsRoutes}</Routes>;
}

```

## src/main.tsx

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);

```

## src/index.css

```css
:root {
  color: #14213d;
  background: #f4f7fb;
  font-family:
    Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
}

button,
a {
  font: inherit;
}

a {
  color: inherit;
  text-decoration: none;
}

.app-shell {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  position: sticky;
  top: 0;
  display: flex;
  flex: 0 0 280px;
  flex-direction: column;
  height: 100vh;
  padding: 24px;
  color: #f8fafc;
  background: linear-gradient(180deg, #10233f 0%, #172f55 58%, #23416d 100%);
}

.sidebar__brand,
.mobile-header__brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-mark {
  display: grid;
  width: 44px;
  height: 44px;
  place-items: center;
  border-radius: 14px;
  color: #0f2744;
  background: #7dd3fc;
  font-weight: 800;
  letter-spacing: -0.04em;
}

.sidebar__brand span {
  display: block;
  margin-top: 2px;
  color: #b8c7dd;
  font-size: 0.82rem;
}

.sidebar__nav {
  display: grid;
  gap: 8px;
  margin-top: 40px;
}

.sidebar__nav a {
  padding: 13px 14px;
  border: 1px solid transparent;
  border-radius: 14px;
  color: #dbe7f6;
  font-weight: 700;
}

.sidebar__nav a.active,
.sidebar__nav a:hover {
  border-color: rgb(125 211 252 / 35%);
  color: #fff;
  background: rgb(255 255 255 / 10%);
}

.sidebar__footer {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: auto;
  padding: 14px;
  border: 1px solid rgb(255 255 255 / 12%);
  border-radius: 16px;
  color: #cbd5e1;
  background: rgb(255 255 255 / 7%);
  font-size: 0.9rem;
}

.mobile-header {
  display: none;
}

.content-shell {
  width: 100%;
  padding: 32px;
}

.page-stack {
  display: grid;
  gap: 28px;
  max-width: 1440px;
  margin: 0 auto;
}

.hero-panel,
.detail-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 24px;
  align-items: stretch;
  padding: 32px;
  border: 1px solid #dce5f0;
  border-radius: 28px;
  background:
    radial-gradient(circle at top right, rgb(14 165 233 / 16%), transparent 30%),
    #fff;
  box-shadow: 0 24px 60px rgb(15 23 42 / 8%);
}

.hero-panel--compact {
  grid-template-columns: 1fr;
}

.hero-panel h1,
.detail-hero h1,
.empty-state h1 {
  margin: 0;
  color: #0f172a;
  font-size: clamp(2rem, 4vw, 3.6rem);
  letter-spacing: -0.06em;
  line-height: 1;
}

.hero-panel p,
.detail-hero p,
.empty-state p {
  max-width: 780px;
  color: #64748b;
  font-size: 1.03rem;
  line-height: 1.7;
}

.eyebrow {
  margin: 0 0 10px;
  color: #0369a1;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.hero-panel__callout,
.detail-hero__progress {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 24px;
  border-radius: 22px;
  color: #e0f2fe;
  background: linear-gradient(145deg, #0f2744, #164a75);
}

.hero-panel__callout span,
.detail-hero__progress span {
  color: #93c5fd;
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
}

.hero-panel__callout strong,
.detail-hero__progress strong {
  margin-top: 8px;
  color: #fff;
  font-size: 2rem;
}

.hero-panel__callout p {
  color: #bfdbfe;
}

.metric-grid,
.overview-grid,
.procurement-summary {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

.metric-card,
.overview-grid article,
.procurement-summary article,
.filter-panel,
.module-card,
.project-card,
.table-card,
.empty-state {
  border: 1px solid #dce5f0;
  border-radius: 22px;
  background: #fff;
  box-shadow: 0 18px 42px rgb(15 23 42 / 6%);
}

.metric-card,
.procurement-summary article {
  display: flex;
  gap: 16px;
  padding: 20px;
}

.metric-card__icon,
.module-card__icon {
  display: grid;
  flex: 0 0 auto;
  width: 44px;
  height: 44px;
  place-items: center;
  border-radius: 14px;
  color: #0369a1;
  background: #e0f2fe;
}

.metric-card span,
.overview-grid span,
.procurement-summary span {
  color: #64748b;
  font-size: 0.9rem;
  font-weight: 700;
}

.metric-card strong,
.overview-grid strong,
.procurement-summary strong {
  display: block;
  margin-top: 6px;
  color: #0f172a;
  font-size: 1.7rem;
  line-height: 1;
}

.metric-card p {
  margin: 10px 0 0;
  color: #64748b;
  font-size: 0.9rem;
  line-height: 1.45;
}

.section-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 16px;
}

.section-heading h2 {
  margin: 0;
  color: #0f172a;
  font-size: clamp(1.55rem, 3vw, 2.2rem);
  letter-spacing: -0.04em;
}

.section-heading > span {
  color: #64748b;
  font-weight: 700;
}

.project-grid,
.module-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.module-grid {
  grid-template-columns: repeat(5, minmax(0, 1fr));
}

.project-card,
.module-card {
  padding: 22px;
}

.project-card__header,
.module-card__topline,
.project-card__progress > div,
.project-card__footer,
.detail-hero__title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
}

.project-card h3,
.module-card h3 {
  margin: 0;
  color: #0f172a;
  font-size: 1.2rem;
  letter-spacing: -0.03em;
}

.project-card__facts {
  display: grid;
  gap: 12px;
  margin: 20px 0;
}

.project-card__facts div {
  display: grid;
  gap: 4px;
}

.project-card__facts dt {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #64748b;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.project-card__facts dd {
  margin: 0;
  color: #1e293b;
  font-size: 0.95rem;
  font-weight: 700;
  line-height: 1.35;
}

.project-card__progress span,
.module-card__owner {
  color: #64748b;
  font-size: 0.88rem;
  font-weight: 700;
}

.project-card__modules {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin-top: 18px;
}

.project-card__modules div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 10px;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  background: #f8fafc;
}

.project-card__modules span {
  color: #475569;
  font-size: 0.78rem;
  font-weight: 800;
}

.project-card__footer {
  margin-top: 18px;
  padding-top: 18px;
  border-top: 1px solid #e2e8f0;
  color: #64748b;
  font-size: 0.9rem;
}

.project-card__footer a,
.back-link,
.empty-state a {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #0369a1;
  font-weight: 800;
}

.progress {
  width: 100%;
  height: 9px;
  overflow: hidden;
  margin-top: 10px;
  border-radius: 999px;
  background: #e2e8f0;
}

.progress span {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #0284c7, #22c55e);
}

.module-card {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.module-card p {
  min-height: 70px;
  margin: 0;
  color: #64748b;
  font-size: 0.94rem;
  line-height: 1.55;
}

.module-card > strong {
  color: #0f172a;
  font-size: 0.92rem;
}

.badge {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  border-radius: 999px;
  padding: 6px 10px;
  font-size: 0.76rem;
  font-weight: 800;
  white-space: nowrap;
}

.badge--success {
  color: #166534;
  background: #dcfce7;
}

.badge--warning {
  color: #92400e;
  background: #fef3c7;
}

.badge--danger {
  color: #991b1b;
  background: #fee2e2;
}

.badge--blocked {
  color: #581c87;
  background: #f3e8ff;
}

.badge--neutral {
  color: #475569;
  background: #e2e8f0;
}

.badge--info {
  color: #075985;
  background: #e0f2fe;
}

.overview-grid article,
.procurement-summary article {
  padding: 20px;
}

.filter-panel {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  padding: 20px;
}

.filter-panel label {
  display: grid;
  gap: 8px;
}

.filter-panel span {
  color: #475569;
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.filter-panel select {
  width: 100%;
  min-height: 44px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  padding: 0 12px;
  color: #0f172a;
  background: #fff;
  font: inherit;
}

.table-empty {
  margin: 0;
  padding: 20px;
  color: #64748b;
  font-weight: 700;
}

.overview-grid article {
  display: grid;
  gap: 8px;
}

.overview-grid svg,
.procurement-summary svg {
  color: #0284c7;
}

.overview-grid strong {
  font-size: 1rem;
  line-height: 1.35;
}

.table-card {
  overflow: hidden;
}

.responsive-table {
  overflow-x: auto;
}

table {
  width: 100%;
  min-width: 760px;
  border-collapse: collapse;
}

th,
td {
  padding: 16px 18px;
  border-bottom: 1px solid #e2e8f0;
  text-align: left;
  vertical-align: middle;
}

th {
  color: #475569;
  background: #f8fafc;
  font-size: 0.78rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

td {
  color: #334155;
  font-size: 0.92rem;
}

td strong,
td span {
  display: block;
}

td span {
  margin-top: 4px;
  color: #64748b;
}

tr:last-child td {
  border-bottom: 0;
}

.empty-state {
  max-width: 720px;
  margin: 80px auto;
  padding: 40px;
  text-align: center;
}

.mobile-drawer {
  position: fixed;
  inset: 0;
  z-index: 20;
  display: none;
  background: rgb(15 23 42 / 55%);
}

.mobile-drawer__panel {
  width: min(88vw, 340px);
  min-height: 100%;
  padding: 20px;
  color: #f8fafc;
  background: #10233f;
}

.mobile-drawer__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
}

.icon-button {
  display: inline-grid;
  width: 44px;
  height: 44px;
  place-items: center;
  border: 0;
  border-radius: 14px;
  color: #0f172a;
  background: #e0f2fe;
  cursor: pointer;
}

@media (max-width: 1180px) {
  .module-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .project-grid,
  .metric-grid,
  .overview-grid,
  .procurement-summary,
  .filter-panel {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 820px) {
  .app-shell {
    display: block;
  }

  .sidebar {
    display: none;
  }

  .mobile-header {
    position: sticky;
    top: 0;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 18px;
    border-bottom: 1px solid #dce5f0;
    background: rgb(255 255 255 / 92%);
    backdrop-filter: blur(16px);
  }

  .mobile-drawer {
    display: block;
  }

  .content-shell {
    padding: 18px;
  }

  .hero-panel,
  .detail-hero {
    grid-template-columns: 1fr;
    padding: 24px;
    border-radius: 22px;
  }

  .metric-grid,
  .overview-grid,
  .procurement-summary,
  .filter-panel,
  .project-grid,
  .module-grid {
    grid-template-columns: 1fr;
  }

  .section-heading {
    align-items: start;
    flex-direction: column;
  }

  .detail-hero__title {
    align-items: flex-start;
    flex-direction: column;
  }
}

@media (max-width: 520px) {
  .project-card__modules {
    grid-template-columns: 1fr;
  }
}

```

## src/pages/Dashboard.tsx

```tsx
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

```

## src/pages/Procurement.tsx

```tsx
import { ClipboardList, PackageSearch } from 'lucide-react';
import { useMemo, useState } from 'react';
import { StatusBadge } from '../components/StatusBadge';
import { materialItems, projects, purchaseRequests } from '../data/mockData';

const allProjectsValue = 'all-projects';
const allStatusesValue = 'all-statuses';

const purchaseRequestStatuses = ['Draft', 'Submitted', 'Approved', 'Ordered'];
const materialStatuses = ['Spec Review', 'RFQ', 'PO Issued', 'In Transit', 'Delivered'];

export function Procurement() {
  const [selectedProjectId, setSelectedProjectId] = useState(allProjectsValue);
  const [selectedPurchaseStatus, setSelectedPurchaseStatus] = useState(allStatusesValue);
  const [selectedMaterialStatus, setSelectedMaterialStatus] = useState(allStatusesValue);

  const filteredPurchaseRequests = useMemo(
    () => purchaseRequests.filter((request) => {
      const matchesProject = selectedProjectId === allProjectsValue || request.projectId === selectedProjectId;
      const matchesStatus = selectedPurchaseStatus === allStatusesValue || request.status === selectedPurchaseStatus;
      return matchesProject && matchesStatus;
    }),
    [selectedProjectId, selectedPurchaseStatus],
  );

  const filteredMaterialItems = useMemo(
    () => materialItems.filter((material) => {
      const matchesProject = selectedProjectId === allProjectsValue || material.projectId === selectedProjectId;
      const matchesStatus = selectedMaterialStatus === allStatusesValue || material.status === selectedMaterialStatus;
      return matchesProject && matchesStatus;
    }),
    [selectedMaterialStatus, selectedProjectId],
  );

  return (
    <section className="page-stack">
      <div className="hero-panel hero-panel--compact">
        <div>
          <p className="eyebrow">Procurement</p>
          <h1>Purchasing and material readiness</h1>
          <p>Track purchase requests and material items for the mock project portfolio without backend dependencies.</p>
        </div>
      </div>

      <div className="procurement-summary">
        <article>
          <ClipboardList size={24} />
          <span>Purchase requests shown</span>
          <strong>{filteredPurchaseRequests.length}</strong>
        </article>
        <article>
          <PackageSearch size={24} />
          <span>Material items shown</span>
          <strong>{filteredMaterialItems.length}</strong>
        </article>
      </div>

      <div className="filter-panel" aria-label="Procurement filters">
        <label>
          <span>Project</span>
          <select value={selectedProjectId} onChange={(event) => setSelectedProjectId(event.target.value)}>
            <option value={allProjectsValue}>All projects</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>{project.projectNumber} - {project.name}</option>
            ))}
          </select>
        </label>
        <label>
          <span>Purchase request status</span>
          <select value={selectedPurchaseStatus} onChange={(event) => setSelectedPurchaseStatus(event.target.value)}>
            <option value={allStatusesValue}>All PR statuses</option>
            {purchaseRequestStatuses.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </label>
        <label>
          <span>Material status</span>
          <select value={selectedMaterialStatus} onChange={(event) => setSelectedMaterialStatus(event.target.value)}>
            <option value={allStatusesValue}>All material statuses</option>
            {materialStatuses.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="section-heading">
        <div>
          <p className="eyebrow">PR register</p>
          <h2>Purchase request list</h2>
        </div>
      </div>
      <div className="table-card">
        <div className="responsive-table">
          <table>
            <thead>
              <tr>
                <th>PR</th>
                <th>Project</th>
                <th>Description</th>
                <th>Requester</th>
                <th>Status</th>
                <th>Required</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {filteredPurchaseRequests.map((request) => (
                <tr key={request.id}>
                  <td><strong>{request.id}</strong></td>
                  <td>{request.projectName}</td>
                  <td>{request.description}</td>
                  <td>{request.requester}</td>
                  <td><StatusBadge status={request.status} /></td>
                  <td>{request.requiredBy}</td>
                  <td>{request.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredPurchaseRequests.length === 0 && <p className="table-empty">No purchase requests match the selected filters.</p>}
        </div>
      </div>

      <div className="section-heading">
        <div>
          <p className="eyebrow">Material register</p>
          <h2>Material item list</h2>
        </div>
      </div>
      <div className="table-card">
        <div className="responsive-table">
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Project</th>
                <th>Material</th>
                <th>Supplier</th>
                <th>Status</th>
                <th>Need date</th>
                <th>Risk</th>
              </tr>
            </thead>
            <tbody>
              {filteredMaterialItems.map((material) => (
                <tr key={material.id}>
                  <td><strong>{material.id}</strong></td>
                  <td>{material.projectName}</td>
                  <td>{material.item}</td>
                  <td>{material.supplier}</td>
                  <td><StatusBadge status={material.status} /></td>
                  <td>{material.needDate}</td>
                  <td><StatusBadge status={material.risk} /></td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredMaterialItems.length === 0 && <p className="table-empty">No material items match the selected filters.</p>}
        </div>
      </div>
    </section>
  );
}

```

## src/pages/ProjectDetail.tsx

```tsx
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

```

## src/components/ModuleSummaryCard.tsx

```tsx
import type { ModuleStatus } from '../data/mockData';
import { ProgressBar } from './ProgressBar';
import { StatusBadge } from './StatusBadge';

interface ModuleSummaryCardProps {
  module: ModuleStatus;
}

export function ModuleSummaryCard({ module }: ModuleSummaryCardProps) {
  const Icon = module.icon;

  return (
    <article className="module-card">
      <div className="module-card__topline">
        <span className="module-card__icon">
          <Icon size={20} />
        </span>
        <StatusBadge status={module.status} />
      </div>
      <h3>{module.label}</h3>
      <p>{module.summary}</p>
      <div className="module-card__owner">Owner: {module.owner}</div>
      <ProgressBar value={module.progress} label={`${module.label} progress`} />
      <strong>{module.progress}% ready</strong>
    </article>
  );
}

```

## src/components/ProgressBar.tsx

```tsx
interface ProgressBarProps {
  value: number;
  label?: string;
}

export function ProgressBar({ value, label }: ProgressBarProps) {
  return (
    <div className="progress" aria-label={label ?? `Progress ${value}%`}>
      <span style={{ width: `${value}%` }} />
    </div>
  );
}

```

## src/components/ProjectCard.tsx

```tsx
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

```

## src/components/StatusBadge.tsx

```tsx
import type { StatusLevel } from '../data/mockData';

interface StatusBadgeProps {
  status: StatusLevel | 'Low' | 'Medium' | 'High' | string;
}

const statusClassMap: Record<string, string> = {
  'On Track': 'badge badge--success',
  Watch: 'badge badge--warning',
  'At Risk': 'badge badge--danger',
  Blocked: 'badge badge--blocked',
  Low: 'badge badge--success',
  Medium: 'badge badge--warning',
  High: 'badge badge--danger',
  Draft: 'badge badge--neutral',
  Submitted: 'badge badge--warning',
  Approved: 'badge badge--success',
  Ordered: 'badge badge--info',
  'Spec Review': 'badge badge--neutral',
  RFQ: 'badge badge--warning',
  'PO Issued': 'badge badge--info',
  'In Transit': 'badge badge--info',
  Delivered: 'badge badge--success',
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return <span className={statusClassMap[status] ?? 'badge badge--neutral'}>{status}</span>;
}

```

## src/data/mockData.ts

```ts
import type { LucideIcon } from 'lucide-react';
import { ClipboardCheck, FileText, HardHat, PackageCheck, Users } from 'lucide-react';

export type StatusLevel = 'On Track' | 'Watch' | 'At Risk' | 'Blocked';

export type ModuleKey = 'overall' | 'procurement' | 'resources' | 'startup' | 'documentation';

export interface ModuleStatus {
  key: ModuleKey;
  label: string;
  status: StatusLevel;
  progress: number;
  summary: string;
  owner: string;
  icon: LucideIcon;
}

export interface ProjectIssue {
  id: string;
  title: string;
  module: string;
  severity: 'Low' | 'Medium' | 'High';
  dueDate: string;
}

export interface Project {
  id: string;
  projectNumber: string;
  name: string;
  client: string;
  location: string;
  manager: string;
  phase: string;
  budget: string;
  completion: number;
  nextMilestone: string;
  modules: ModuleStatus[];
  issues: ProjectIssue[];
}

export interface PurchaseRequest {
  id: string;
  projectId: string;
  projectName: string;
  description: string;
  requester: string;
  status: 'Draft' | 'Submitted' | 'Approved' | 'Ordered';
  requiredBy: string;
  value: string;
}

export interface MaterialItem {
  id: string;
  projectId: string;
  projectName: string;
  item: string;
  supplier: string;
  status: 'Spec Review' | 'RFQ' | 'PO Issued' | 'In Transit' | 'Delivered';
  needDate: string;
  risk: 'Low' | 'Medium' | 'High';
}

const moduleIcons: Record<ModuleKey, LucideIcon> = {
  overall: ClipboardCheck,
  procurement: PackageCheck,
  resources: Users,
  startup: HardHat,
  documentation: FileText,
};

const createModules = (
  statuses: Array<Omit<ModuleStatus, 'icon'> & { key: ModuleKey }>,
): ModuleStatus[] => statuses.map((module) => ({ ...module, icon: moduleIcons[module.key] }));

export const projects: Project[] = [
  {
    id: 'elmhc-bundle-5',
    projectNumber: 'POC-2401',
    name: 'ELMHC Bundle 5',
    client: 'East Lake Municipal Health Campus',
    location: 'East Lake, TX',
    manager: 'Avery Grant',
    phase: 'Field mobilization',
    budget: '$8.4M',
    completion: 64,
    nextMilestone: 'Temporary power inspection - Jun 18',
    modules: createModules([
      { key: 'overall', label: 'Overall status', status: 'On Track', progress: 68, summary: 'Milestones are sequencing cleanly with field teams mobilized.', owner: 'Avery Grant' },
      { key: 'procurement', label: 'Procurement', status: 'Watch', progress: 55, summary: 'Switchgear submittals need approval before release.', owner: 'Morgan Lee' },
      { key: 'resources', label: 'Resources', status: 'On Track', progress: 72, summary: 'Civil and electrical crews are staffed for the next three weeks.', owner: 'Jordan Patel' },
      { key: 'startup', label: 'Startup', status: 'Watch', progress: 38, summary: 'Startup plan drafted; commissioning dates depend on equipment release.', owner: 'Sam Rivera' },
      { key: 'documentation', label: 'Documentation', status: 'On Track', progress: 81, summary: 'Daily reports and permit logs are current.', owner: 'Riley Chen' },
    ]),
    issues: [
      { id: 'ISS-101', title: 'Confirm utility shutdown window for east tie-in', module: 'Startup', severity: 'Medium', dueDate: 'Jun 10' },
      { id: 'ISS-102', title: 'Resolve switchgear comments with engineer of record', module: 'Procurement', severity: 'High', dueDate: 'Jun 12' },
    ],
  },
  {
    id: 'rolme-ls3',
    projectNumber: 'POC-2402',
    name: 'ROLME LS3',
    client: 'Rolme County Utilities',
    location: 'Rolme County, OK',
    manager: 'Nina Brooks',
    phase: 'Procurement release',
    budget: '$3.1M',
    completion: 42,
    nextMilestone: 'Pump package award - Jun 21',
    modules: createModules([
      { key: 'overall', label: 'Overall status', status: 'Watch', progress: 44, summary: 'Design approvals are complete; procurement float is tightening.', owner: 'Nina Brooks' },
      { key: 'procurement', label: 'Procurement', status: 'At Risk', progress: 31, summary: 'Long-lead pump package has one incomplete vendor quote.', owner: 'Morgan Lee' },
      { key: 'resources', label: 'Resources', status: 'On Track', progress: 66, summary: 'Core project team is assigned and subcontractor slots are reserved.', owner: 'Luis Garcia' },
      { key: 'startup', label: 'Startup', status: 'Watch', progress: 22, summary: 'Startup checklist is awaiting final controls narrative.', owner: 'Sam Rivera' },
      { key: 'documentation', label: 'Documentation', status: 'On Track', progress: 73, summary: 'Submittal register is active with weekly client distribution.', owner: 'Riley Chen' },
    ]),
    issues: [
      { id: 'ISS-201', title: 'Receive third quote for vertical turbine pump package', module: 'Procurement', severity: 'High', dueDate: 'Jun 7' },
      { id: 'ISS-202', title: 'Finalize controls startup narrative', module: 'Startup', severity: 'Medium', dueDate: 'Jun 15' },
    ],
  },
  {
    id: 'huntv-well-13',
    projectNumber: 'POC-2403',
    name: 'HUNTV Well 13',
    client: 'Hunt Valley Water Authority',
    location: 'Hunt Valley, NM',
    manager: 'Elena Wright',
    phase: 'Construction',
    budget: '$5.7M',
    completion: 58,
    nextMilestone: 'Wellhead mechanical rough-in - Jun 24',
    modules: createModules([
      { key: 'overall', label: 'Overall status', status: 'On Track', progress: 61, summary: 'Civil work is complete and mechanical rough-in is progressing.', owner: 'Elena Wright' },
      { key: 'procurement', label: 'Procurement', status: 'On Track', progress: 69, summary: 'Major equipment has purchase orders issued and tracked delivery dates.', owner: 'Morgan Lee' },
      { key: 'resources', label: 'Resources', status: 'Watch', progress: 54, summary: 'Instrumentation technician availability is constrained in July.', owner: 'Jordan Patel' },
      { key: 'startup', label: 'Startup', status: 'Watch', progress: 35, summary: 'Factory test dates are tentative pending VFD confirmation.', owner: 'Sam Rivera' },
      { key: 'documentation', label: 'Documentation', status: 'On Track', progress: 77, summary: 'Inspection records and RFIs are up to date.', owner: 'Riley Chen' },
    ]),
    issues: [
      { id: 'ISS-301', title: 'Confirm July instrumentation technician coverage', module: 'Resources', severity: 'Medium', dueDate: 'Jun 14' },
    ],
  },
  {
    id: 'waukc-beechnut',
    projectNumber: 'POC-2404',
    name: 'WAUKC Beechnut',
    client: 'Wauk County Public Works',
    location: 'Beechnut, KS',
    manager: 'Marcus Stone',
    phase: 'Design closeout',
    budget: '$6.2M',
    completion: 35,
    nextMilestone: '90% design package - Jun 28',
    modules: createModules([
      { key: 'overall', label: 'Overall status', status: 'Watch', progress: 37, summary: 'Design package is close, but permitting comments remain open.', owner: 'Marcus Stone' },
      { key: 'procurement', label: 'Procurement', status: 'Watch', progress: 29, summary: 'Procurement strategy is drafted for early valve release.', owner: 'Morgan Lee' },
      { key: 'resources', label: 'Resources', status: 'On Track', progress: 63, summary: 'Estimating and project controls support are assigned.', owner: 'Luis Garcia' },
      { key: 'startup', label: 'Startup', status: 'On Track', progress: 18, summary: 'Startup scope is identified with no immediate constraints.', owner: 'Sam Rivera' },
      { key: 'documentation', label: 'Documentation', status: 'At Risk', progress: 41, summary: 'Permit response matrix needs consolidation before resubmittal.', owner: 'Riley Chen' },
    ]),
    issues: [
      { id: 'ISS-401', title: 'Consolidate county permit response matrix', module: 'Documentation', severity: 'High', dueDate: 'Jun 9' },
      { id: 'ISS-402', title: 'Decide early-release valve package boundaries', module: 'Procurement', severity: 'Medium', dueDate: 'Jun 16' },
    ],
  },
  {
    id: 'nppwd-pfas',
    projectNumber: 'POC-2405',
    name: 'NPPWD PFAS',
    client: 'North Plains Public Water District',
    location: 'North Plains, CO',
    manager: 'Priya Shah',
    phase: 'Startup planning',
    budget: '$12.8M',
    completion: 71,
    nextMilestone: 'Media vessel delivery - Jun 19',
    modules: createModules([
      { key: 'overall', label: 'Overall status', status: 'On Track', progress: 74, summary: 'Treatment train installation is trending ahead of baseline.', owner: 'Priya Shah' },
      { key: 'procurement', label: 'Procurement', status: 'On Track', progress: 83, summary: 'PFAS media vessels are in transit with receiving crew scheduled.', owner: 'Morgan Lee' },
      { key: 'resources', label: 'Resources', status: 'On Track', progress: 79, summary: 'Startup specialists and vendor representatives are confirmed.', owner: 'Jordan Patel' },
      { key: 'startup', label: 'Startup', status: 'On Track', progress: 57, summary: 'Startup sequence is approved and sampling plan is in review.', owner: 'Sam Rivera' },
      { key: 'documentation', label: 'Documentation', status: 'Watch', progress: 62, summary: 'O&M manual drafts are missing two vendor sections.', owner: 'Riley Chen' },
    ]),
    issues: [
      { id: 'ISS-501', title: 'Receive missing vendor O&M manual sections', module: 'Documentation', severity: 'Medium', dueDate: 'Jun 17' },
    ],
  },
];

export const purchaseRequests: PurchaseRequest[] = [
  { id: 'PR-2401', projectId: 'elmhc-bundle-5', projectName: 'ELMHC Bundle 5', description: 'Medium voltage switchgear release package', requester: 'Morgan Lee', status: 'Submitted', requiredBy: 'Jun 12', value: '$410K' },
  { id: 'PR-2402', projectId: 'rolme-ls3', projectName: 'ROLME LS3', description: 'Vertical turbine pump package', requester: 'Nina Brooks', status: 'Draft', requiredBy: 'Jun 21', value: '$285K' },
  { id: 'PR-2403', projectId: 'huntv-well-13', projectName: 'HUNTV Well 13', description: 'VFD and controls cabinet', requester: 'Elena Wright', status: 'Approved', requiredBy: 'Jun 18', value: '$165K' },
  { id: 'PR-2404', projectId: 'waukc-beechnut', projectName: 'WAUKC Beechnut', description: 'Early-release valve package', requester: 'Marcus Stone', status: 'Submitted', requiredBy: 'Jun 26', value: '$92K' },
  { id: 'PR-2405', projectId: 'nppwd-pfas', projectName: 'NPPWD PFAS', description: 'Startup sampling kits and lab coolers', requester: 'Priya Shah', status: 'Ordered', requiredBy: 'Jun 15', value: '$18K' },
];

export const materialItems: MaterialItem[] = [
  { id: 'MAT-118', projectId: 'elmhc-bundle-5', projectName: 'ELMHC Bundle 5', item: 'ATS control panels', supplier: 'Metro Controls', status: 'RFQ', needDate: 'Jul 8', risk: 'Medium' },
  { id: 'MAT-119', projectId: 'rolme-ls3', projectName: 'ROLME LS3', item: 'Vertical turbine pumps', supplier: 'Summit Pumpworks', status: 'Spec Review', needDate: 'Aug 2', risk: 'High' },
  { id: 'MAT-120', projectId: 'huntv-well-13', projectName: 'HUNTV Well 13', item: 'Stainless discharge piping', supplier: 'High Desert Pipe', status: 'PO Issued', needDate: 'Jul 1', risk: 'Low' },
  { id: 'MAT-121', projectId: 'waukc-beechnut', projectName: 'WAUKC Beechnut', item: 'Butterfly valves', supplier: 'Prairie Valve Co.', status: 'RFQ', needDate: 'Aug 16', risk: 'Medium' },
  { id: 'MAT-122', projectId: 'nppwd-pfas', projectName: 'NPPWD PFAS', item: 'PFAS media vessels', supplier: 'ClearWater Systems', status: 'In Transit', needDate: 'Jun 19', risk: 'Low' },
];

export const getProjectById = (id: string | undefined) => projects.find((project) => project.id === id);

```
