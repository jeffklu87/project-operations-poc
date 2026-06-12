import { useState } from 'react';
import { Link } from 'react-router-dom';
import { StatusBadge } from '../components/StatusBadge';
import {
  daysUntil,
  formatDate,
  getActionsRequired,
  getProjectAttentionScore,
  getReadinessStatus,
  getUpcomingMilestones,
  operatingModules,
  projects,
  readinessItems,
  resourceConstraints,
  risks,
} from '../data/mockData';

type Perspective = 'Executive' | 'Department Manager' | 'PM' | 'Project Team' | 'QAQC';

const perspectives: Perspective[] = ['Executive', 'Department Manager', 'PM', 'Project Team', 'QAQC'];

export function Portfolio() {
  const [perspective, setPerspective] = useState<Perspective>('Department Manager');
  const upcomingMilestones = getUpcomingMilestones(8);
  const actions = getActionsRequired();
  const redItems = readinessItems.filter((item) => getReadinessStatus(item) === 'Red');
  const yellowItems = readinessItems.filter((item) => getReadinessStatus(item) === 'Yellow');
  const projectsByAttention = [...projects].sort((a, b) => getProjectAttentionScore(b) - getProjectAttentionScore(a));
  const attentionProjects = projectsByAttention
    .filter((project) => getProjectAttentionScore(project) >= 3 || project.risks.some((risk) => risk.trend === 'Increasing'))
    .slice(0, 5);
  const planningProjects = projectsByAttention.filter((project) => (
    !attentionProjects.some((attentionProject) => attentionProject.id === project.id)
    && project.readinessItems.some((item) => getReadinessStatus(item) === 'Yellow' || (item.active && daysUntil(item.dueDate) <= 30))
  ));
  const emergingRisks = risks.filter((risk) => risk.trend === 'Increasing' || risk.likelihood === 'High');
  const todayActions = actions.filter((item) => daysUntil(item.dueDate) <= 0);
  const weekActions = actions.filter((item) => daysUntil(item.dueDate) > 0 && daysUntil(item.dueDate) <= 7);
  const nextThirtyActions = actions.filter((item) => daysUntil(item.dueDate) > 7 && daysUntil(item.dueDate) <= 30);
  const futureActions = actions.filter((item) => daysUntil(item.dueDate) > 30);
  const assignedDeliverables = projects
    .flatMap((project) => project.deliverables.map((deliverable) => ({ ...deliverable, projectId: project.id, projectName: project.name, projectNumber: project.projectNumber })))
    .filter((deliverable) => deliverable.state !== 'Complete')
    .sort((a, b) => new Date(`${a.dueDate ?? '2026-12-31'}T12:00:00`).getTime() - new Date(`${b.dueDate ?? '2026-12-31'}T12:00:00`).getTime());
  const qualityGates = projects.flatMap((project) => project.qualityGates.map((gate) => ({ ...gate, projectId: project.id, projectName: project.name, projectNumber: project.projectNumber })));
  const missingReviews = qualityGates.filter((gate) => gate.name.toLowerCase().includes('review') && gate.status !== 'Green');
  const missingSignoffs = qualityGates.filter((gate) => gate.vpEntryNeeded === 'Yes');
  const complianceGaps = qualityGates.filter((gate) => gate.qaqcEligible && gate.status !== 'Green');

  return (
    <section className="ops-page">
      <header className="ops-header">
        <div>
          <p className="eyebrow">Portfolio</p>
          <h1>Perspective command center</h1>
        </div>
        <span>Same project data, different attention model</span>
      </header>

      <section className="perspective-switcher" aria-label="Perspective switcher">
        <div>
          <strong>{perspective}</strong>
          <span>{getPerspectiveDescription(perspective)}</span>
        </div>
        <div role="tablist" aria-label="Operational perspectives">
          {perspectives.map((item) => (
            <button
              aria-selected={perspective === item}
              className={perspective === item ? 'active' : ''}
              key={item}
              onClick={() => setPerspective(item)}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      {perspective === 'Executive' && (
        <>
          <section className="metric-strip metric-strip--compact" aria-label="Executive summary">
            <article><span>Interventions</span><strong>{attentionProjects.length}</strong></article>
            <article><span>Major Risks</span><strong>{emergingRisks.length}</strong></article>
            <article><span>Resource Concerns</span><strong>{resourceConstraints.length}</strong></article>
            <article><span>Healthy Projects</span><strong>58</strong></article>
            <article><span>30 Day Gates</span><strong>{upcomingMilestones.length}</strong></article>
          </section>
          <div className="ops-grid ops-grid--thirds">
            <AttentionProjects projects={attentionProjects} />
            <RiskList title="Major Risks" subtitle="Leadership focus" risks={emergingRisks.slice(0, 5)} />
            <ResourceConcernList />
          </div>
        </>
      )}

      {perspective === 'Department Manager' && (
        <>
          <section className="metric-strip" aria-label="Department manager summary">
            <article><span>Attention Required</span><strong>{attentionProjects.length}</strong></article>
            <article><span>Planning Required</span><strong>{planningProjects.length}</strong></article>
            <article><span>Resource Constraints</span><strong>{resourceConstraints.length}</strong></article>
            <article><span>Red Items</span><strong>{redItems.length}</strong></article>
            <article><span>Yellow Items</span><strong>{yellowItems.length}</strong></article>
          </section>
          <AttentionProjects projects={attentionProjects} />
          <PlanningProjects projects={planningProjects} />
          <div className="ops-grid">
            <ResourceConcernList />
            <RiskList title="Emerging Risks" subtitle="Likely red in 30 days" risks={emergingRisks} />
          </div>
        </>
      )}

      {perspective === 'PM' && (
        <>
          <section className="metric-strip metric-strip--compact" aria-label="PM summary">
            <article><span>Today</span><strong>{todayActions.length}</strong></article>
            <article><span>This Week</span><strong>{weekActions.length}</strong></article>
            <article><span>Next 30 Days</span><strong>{nextThirtyActions.length}</strong></article>
            <article><span>Future</span><strong>{futureActions.length}</strong></article>
            <article><span>Milestones</span><strong>{upcomingMilestones.length}</strong></article>
          </section>
          <ActionTable title="Today" subtitle="Due or overdue" items={todayActions} />
          <ActionTable title="This Week" subtitle="Next commitments" items={weekActions} />
          <div className="ops-grid">
            <ActionTable title="Next 30 Days" subtitle="Planning horizon" items={nextThirtyActions} />
            <UpcomingMilestones milestones={upcomingMilestones} />
          </div>
        </>
      )}

      {perspective === 'Project Team' && (
        <>
          <section className="metric-strip metric-strip--compact" aria-label="Project team summary">
            <article><span>Deliverables</span><strong>{assignedDeliverables.length}</strong></article>
            <article><span>Assigned Actions</span><strong>{actions.length}</strong></article>
            <article><span>Due This Week</span><strong>{todayActions.length + weekActions.length}</strong></article>
            <article><span>At Risk Deliverables</span><strong>{assignedDeliverables.filter((item) => item.state === 'At risk' || item.state === 'Missing').length}</strong></article>
            <article><span>Upcoming Dates</span><strong>{upcomingMilestones.length}</strong></article>
          </section>
          <div className="ops-grid">
            <DeliverableTable deliverables={assignedDeliverables.slice(0, 8)} />
            <ActionTable title="Assigned Actions" subtitle="What should happen next" items={actions.slice(0, 8)} />
          </div>
          <UpcomingDueDates deliverables={assignedDeliverables} actions={actions} />
        </>
      )}

      {perspective === 'QAQC' && (
        <>
          <section className="metric-strip metric-strip--compact" aria-label="QAQC summary">
            <article><span>Missing Reviews</span><strong>{missingReviews.length}</strong></article>
            <article><span>Missing Signoffs</span><strong>{missingSignoffs.length}</strong></article>
            <article><span>Compliance Gaps</span><strong>{complianceGaps.length}</strong></article>
            <article><span>VP Entries</span><strong>{qualityGates.filter((gate) => gate.vpEntryNeeded !== 'No').length}</strong></article>
            <article><span>Eligible Gates</span><strong>{qualityGates.filter((gate) => gate.qaqcEligible).length}</strong></article>
          </section>
          <div className="ops-grid ops-grid--thirds">
            <QualityGateList title="Missing Reviews" gates={missingReviews} />
            <QualityGateList title="Missing Signoffs" gates={missingSignoffs} />
            <QualityGateList title="Compliance Gaps" gates={complianceGaps} />
          </div>
        </>
      )}

      <details className="ops-panel attention-disclosure">
        <summary>
          <span>
            <strong>Operating Modules</strong>
            <small>Decision support available behind every perspective</small>
          </span>
          <span className="summary-metrics"><b>Expand</b></span>
        </summary>
        <div className="module-decision-grid">
          {operatingModules.map((module) => (
            <article className="module-decision" key={module.id}>
              <div className="item-title-row">
                <strong>{module.name}</strong>
                <StatusBadge status={module.status === 'Active' ? 'Green' : module.status === 'Watch' ? 'Yellow' : 'Upcoming'} label={module.status} />
              </div>
              <span>Decision: {module.decisionSupported}</span>
              <p>{module.output}</p>
              <small>{module.signals.join(' | ')}</small>
            </article>
          ))}
        </div>
      </details>
    </section>
  );
}

function getPerspectiveDescription(perspective: Perspective) {
  const descriptions: Record<Perspective, string> = {
    Executive: 'Major risks, intervention needs, and resource concerns only.',
    'Department Manager': 'Intervention, planning, constraints, and emerging risk.',
    PM: 'Time horizon queue and upcoming milestones.',
    'Project Team': 'Assigned work, deliverables, and due dates.',
    QAQC: 'Missing reviews, signoffs, and compliance gaps.',
  };

  return descriptions[perspective];
}

function AttentionProjects({ projects: visibleProjects }: { projects: typeof projects }) {
  return (
    <section className="ops-panel ops-panel--red">
      <div className="ops-panel__heading">
        <h2>Projects Requiring Intervention</h2>
        <span>What requires attention</span>
      </div>
      <div className="attention-project-list">
        {visibleProjects.map((project, index) => {
          const topGap = project.readinessItems.find((item) => getReadinessStatus(item) === 'Red')
            ?? project.readinessItems.find((item) => getReadinessStatus(item) === 'Yellow');
          const nextMilestone = project.milestones.find((milestone) => milestone.state !== 'Complete');

          return (
            <Link to={`/projects/${project.id}`} className="attention-project" key={project.id}>
              <strong>{index + 1}</strong>
              <div>
                <span>{project.projectNumber} - {project.name}</span>
                <p>{topGap?.actionRequired ?? project.riskSummary}</p>
              </div>
              <div>
                <small>Why it matters</small>
                <span>{nextMilestone ? `${nextMilestone.name} ${formatDate(nextMilestone.date)}` : project.phase}</span>
              </div>
              <StatusBadge status={getProjectAttentionScore(project) >= 6 ? 'Red' : 'Yellow'} />
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function PlanningProjects({ projects: visibleProjects }: { projects: typeof projects }) {
  return (
    <section className="ops-panel ops-panel--yellow">
      <div className="ops-panel__heading">
        <h2>Planning Required</h2>
        <span>Needs attention within 30 days</span>
      </div>
      <div className="ops-table ops-table--planning">
        <div className="ops-table__header">
          <span>Project</span>
          <span>Planning Need</span>
          <span>Milestone</span>
          <span>Owner</span>
          <span>Due</span>
        </div>
        {visibleProjects.map((project) => {
          const item = project.readinessItems.find((readinessItem) => getReadinessStatus(readinessItem) === 'Yellow')
            ?? project.readinessItems.find((readinessItem) => readinessItem.active);

          return (
            <Link className="ops-table__row" to={`/projects/${project.id}`} key={project.id}>
              <strong>{project.projectNumber} - {project.name}</strong>
              <span>{item?.actionRequired ?? project.riskSummary}</span>
              <span>{item?.milestoneName ?? project.phase}</span>
              <span>{item?.owner ?? project.manager}</span>
              <span>{item ? formatDate(item.dueDate) : 'This month'}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function ActionTable({ title, subtitle, items }: { title: string; subtitle: string; items: typeof readinessItems }) {
  return (
    <section className="ops-panel">
      <div className="ops-panel__heading">
        <h2>{title}</h2>
        <span>{subtitle}</span>
      </div>
      <div className="ops-table ops-table--actions">
        <div className="ops-table__header">
          <span>Project</span>
          <span>Action</span>
          <span>Milestone</span>
          <span>Owner</span>
          <span>Due</span>
          <span>Status</span>
        </div>
        {items.map((item) => (
          <Link className="ops-table__row" to={`/projects/${item.projectId}`} key={item.id}>
            <strong>{item.projectNumber} - {item.projectName}</strong>
            <span>{item.actionRequired}</span>
            <span>{item.milestoneName}</span>
            <span>{item.owner}</span>
            <span>{formatDate(item.dueDate)}</span>
            <StatusBadge status={getReadinessStatus(item)} />
          </Link>
        ))}
      </div>
    </section>
  );
}

function UpcomingMilestones({ milestones }: { milestones: ReturnType<typeof getUpcomingMilestones> }) {
  return (
    <section className="ops-panel ops-panel--primary">
      <div className="ops-panel__heading">
        <h2>Upcoming Milestones</h2>
        <span>Decision horizon</span>
      </div>
      <div className="ops-table ops-table--mini-milestones">
        <div className="ops-table__header">
          <span>Project</span>
          <span>Milestone</span>
          <span>Date</span>
          <span>State</span>
        </div>
        {milestones.map((milestone) => (
          <Link className="ops-table__row" to={`/projects/${milestone.projectId}`} key={milestone.id}>
            <strong>{milestone.projectNumber} - {milestone.projectName}</strong>
            <span>{milestone.name}</span>
            <span>{formatDate(milestone.date)}</span>
            <StatusBadge status={milestone.state} />
          </Link>
        ))}
      </div>
    </section>
  );
}

function RiskList({ title, subtitle, risks: visibleRisks }: { title: string; subtitle: string; risks: typeof risks }) {
  return (
    <section className="ops-panel">
      <div className="ops-panel__heading">
        <h2>{title}</h2>
        <span>{subtitle}</span>
      </div>
      <div className="ops-list">
        {visibleRisks.map((risk) => (
          <Link to={`/projects/${risk.projectId}`} className="ops-list__item" key={risk.id}>
            <strong>{risk.title}</strong>
            <span>{risk.projectNumber} - impacts {risk.milestoneImpact.join(' / ')}</span>
            <p>{risk.mitigation}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

function ResourceConcernList() {
  return (
    <section className="ops-panel">
      <div className="ops-panel__heading">
        <h2>Resource Concerns</h2>
        <span>Capacity decisions</span>
      </div>
      <div className="ops-list">
        {resourceConstraints.map((constraint) => (
          <article className="ops-list__item" key={constraint.id}>
            <div className="item-title-row">
              <strong>{constraint.area}</strong>
              <StatusBadge status={constraint.severity} />
            </div>
            <span>{constraint.window}</span>
            <p>{constraint.constraint}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function DeliverableTable({ deliverables }: { deliverables: Array<(typeof projects)[number]['deliverables'][number] & { projectId: string; projectName: string; projectNumber: string }> }) {
  return (
    <section className="ops-panel">
      <div className="ops-panel__heading">
        <h2>Assigned Deliverables</h2>
        <span>What needs completion</span>
      </div>
      <div className="ops-table ops-table--deliverables">
        <div className="ops-table__header">
          <span>Deliverable</span>
          <span>Project</span>
          <span>Milestone</span>
          <span>Owner</span>
          <span>Due</span>
          <span>State</span>
        </div>
        {deliverables.map((deliverable) => (
          <Link className="ops-table__row" to={`/projects/${deliverable.projectId}`} key={deliverable.id}>
            <strong>{deliverable.name}</strong>
            <span>{deliverable.projectNumber}</span>
            <span>{deliverable.milestoneName}</span>
            <span>{deliverable.owner}</span>
            <span>{deliverable.dueDate ? formatDate(deliverable.dueDate) : 'Complete'}</span>
            <StatusBadge status={deliverable.state} />
          </Link>
        ))}
      </div>
    </section>
  );
}

function UpcomingDueDates({ deliverables, actions }: { deliverables: Array<(typeof projects)[number]['deliverables'][number] & { projectId: string; projectName: string; projectNumber: string }>; actions: typeof readinessItems }) {
  const dueDates = [
    ...actions.map((item) => ({ id: item.id, projectId: item.projectId, label: item.actionRequired, project: item.projectNumber, dueDate: item.dueDate, status: getReadinessStatus(item) })),
    ...deliverables.filter((item) => item.dueDate).map((item) => ({ id: item.id, projectId: item.projectId, label: item.name, project: item.projectNumber, dueDate: item.dueDate as string, status: item.state })),
  ].sort((a, b) => new Date(`${a.dueDate}T12:00:00`).getTime() - new Date(`${b.dueDate}T12:00:00`).getTime()).slice(0, 10);

  return (
    <section className="ops-panel">
      <div className="ops-panel__heading">
        <h2>Upcoming Due Dates</h2>
        <span>Next visible commitments</span>
      </div>
      <div className="ops-table ops-table--planning">
        <div className="ops-table__header">
          <span>Project</span>
          <span>Commitment</span>
          <span>Due</span>
          <span>Status</span>
          <span>Next</span>
        </div>
        {dueDates.map((item) => (
          <Link className="ops-table__row" to={`/projects/${item.projectId}`} key={item.id}>
            <strong>{item.project}</strong>
            <span>{item.label}</span>
            <span>{formatDate(item.dueDate)}</span>
            <StatusBadge status={item.status} />
            <span>Complete or escalate</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function QualityGateList({ title, gates }: { title: string; gates: Array<(typeof projects)[number]['qualityGates'][number] & { projectId: string; projectName: string; projectNumber: string }> }) {
  return (
    <section className="ops-panel">
      <div className="ops-panel__heading">
        <h2>{title}</h2>
        <span>QAQC attention</span>
      </div>
      <div className="ops-list">
        {gates.map((gate) => (
          <Link to={`/projects/${gate.projectId}`} className="ops-list__item" key={gate.id}>
            <div className="item-title-row">
              <strong>{gate.name}</strong>
              <StatusBadge status={gate.status} />
            </div>
            <span>{gate.projectNumber} - supports {gate.milestoneName}</span>
            <p>QAQC eligible: {gate.qaqcEligible ? 'Yes' : 'No'} | VP entry needed: {gate.vpEntryNeeded}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
