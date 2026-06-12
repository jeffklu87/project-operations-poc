import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { StatusBadge } from '../components/StatusBadge';
import {
  formatDate,
  getCategorySummaries,
  getProjectById,
  getReadinessStatus,
  type Milestone,
  type ReadinessItem,
} from '../data/mockData';

const sortByDueDate = (items: ReadinessItem[]) => [...items].sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

export function ProjectDetail() {
  const { projectId } = useParams();
  const project = getProjectById(projectId);

  if (!project) {
    return (
      <section className="empty-state">
        <h1>Project not found</h1>
        <p>The requested mock project does not exist.</p>
        <Link to="/">Return to portfolio</Link>
      </section>
    );
  }

  const redItems = project.readinessItems.filter((item) => getReadinessStatus(item) === 'Red');
  const yellowItems = project.readinessItems.filter((item) => getReadinessStatus(item) === 'Yellow');
  const actionsRequired = sortByDueDate(project.readinessItems.filter((item) => item.active && item.applicable && item.state !== 'Complete'));
  const categorySummaries = getCategorySummaries(project.readinessItems);
  const nextMilestone = project.milestones.find((milestone) => milestone.state === 'At risk' || milestone.state === 'Blocked')
    ?? project.milestones.find((milestone) => milestone.state === 'Upcoming')
    ?? project.milestones.find((milestone) => milestone.state !== 'Complete');

  const getMilestoneGaps = (milestone: Milestone) => actionsRequired.filter((item) => item.milestoneId === milestone.id);
  const currentGaps = nextMilestone ? getMilestoneGaps(nextMilestone) : [];
  const currentQualityGates = nextMilestone ? project.qualityGates.filter((gate) => gate.milestoneId === nextMilestone.id && gate.status !== 'Green') : [];
  const currentDeliverables = nextMilestone ? project.deliverables.filter((deliverable) => deliverable.milestoneId === nextMilestone.id && deliverable.state !== 'Complete') : [];
  const focusBlockers = [
    ...currentGaps.map((item) => item.actionRequired),
    ...currentDeliverables.map((deliverable) => `${deliverable.name} ${deliverable.state.toLowerCase()}`),
    ...currentQualityGates.map((gate) => gate.name),
  ].slice(0, 5);

  return (
    <section className="ops-page project-detail-page">
      <Link className="back-link" to="/">
        <ArrowLeft size={16} /> Portfolio
      </Link>

      <header className="project-header">
        <div>
          <p className="eyebrow">{project.projectNumber}</p>
          <h1>{project.name}</h1>
        </div>
        <dl>
          <div><dt>PM</dt><dd>{project.manager}</dd></div>
          <div><dt>Client</dt><dd>{project.client}</dd></div>
          <div><dt>Next Milestone</dt><dd>{nextMilestone ? `${nextMilestone.name} ${formatDate(nextMilestone.date)}` : 'None'}</dd></div>
          <div><dt>Red Count</dt><dd>{redItems.length}</dd></div>
          <div><dt>Yellow Count</dt><dd>{yellowItems.length}</dd></div>
        </dl>
      </header>

      {nextMilestone && (
        <section className="milestone-focus">
          <div className="milestone-focus__title">
            <p className="eyebrow">Current Milestone Focus</p>
            <h2>{nextMilestone.name}</h2>
            <span>Due {formatDate(nextMilestone.date)}</span>
            <StatusBadge status={nextMilestone.state} />
          </div>
          <div className="milestone-focus__blockers">
            <strong>Blocked By</strong>
            <ul>
              {focusBlockers.length > 0
                ? focusBlockers.map((blocker) => <li key={blocker}>{blocker}</li>)
                : <li>No known readiness blockers.</li>}
            </ul>
          </div>
          <div className="milestone-focus__impact">
            <strong>Impact</strong>
            <p>{project.riskSummary}</p>
          </div>
        </section>
      )}

      <section className="ops-panel">
        <div className="ops-panel__heading">
          <h2>Milestone Readiness Gates</h2>
          <span>Achievability by milestone</span>
        </div>
        <div className="timeline-row timeline-row--gates">
          {project.milestones.map((milestone) => {
            const gaps = getMilestoneGaps(milestone);
            const deliverableGaps = project.deliverables.filter((deliverable) => deliverable.milestoneId === milestone.id && deliverable.state !== 'Complete');
            const qualityGaps = project.qualityGates.filter((gate) => gate.milestoneId === milestone.id && gate.status !== 'Green');
            const gapCount = gaps.length + deliverableGaps.length + qualityGaps.length;
            const summary = gaps[0]?.title ?? deliverableGaps[0]?.name ?? qualityGaps[0]?.name ?? milestone.readinessGaps[0] ?? 'No open gaps';

            return (
              <article className="timeline-step timeline-step--gate" key={milestone.id}>
                <StatusBadge status={milestone.state} />
                <strong>{milestone.name}</strong>
                <span>{formatDate(milestone.date)}</span>
                <b>{gapCount} gaps</b>
                <p>{summary}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="ops-panel ops-panel--primary">
        <div className="ops-panel__heading">
          <h2>Readiness Gaps</h2>
          <span>Grouped by milestone</span>
        </div>
        <div className="milestone-gap-stack">
          {project.milestones.map((milestone) => {
            const gaps = getMilestoneGaps(milestone);

            if (gaps.length === 0) return null;

            return (
              <section className="milestone-gap-group" key={milestone.id}>
                <div className="milestone-gap-group__header">
                  <strong>{milestone.name}</strong>
                  <span>{formatDate(milestone.date)} - {gaps.length} gaps</span>
                </div>
                <div className="ops-table ops-table--gaps">
                  {gaps.map((item) => (
                    <article className="ops-table__row" key={item.id}>
                      <strong>{item.actionRequired}</strong>
                      <span>{item.category}</span>
                      <span>{item.owner}</span>
                      <span>{formatDate(item.dueDate)}</span>
                      <StatusBadge status={getReadinessStatus(item)} />
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </section>

      <section className="ops-panel">
        <div className="ops-panel__heading">
          <h2>Actions Required</h2>
          <span>{actionsRequired.length} milestone-linked actions</span>
        </div>
        <div className="ops-table ops-table--project-actions">
          <div className="ops-table__header">
            <span>Action</span>
            <span>Supports Milestone</span>
            <span>Category</span>
            <span>Owner</span>
            <span>Due</span>
            <span>Status</span>
          </div>
          {actionsRequired.map((item) => (
            <article className="ops-table__row" key={item.id}>
              <strong>{item.actionRequired}</strong>
              <span>{item.milestoneName}</span>
              <span>{item.category}</span>
              <span>{item.owner}</span>
              <span>{formatDate(item.dueDate)}</span>
              <StatusBadge status={getReadinessStatus(item)} />
            </article>
          ))}
        </div>
      </section>

      <div className="ops-grid">
        <section className="ops-panel">
          <div className="ops-panel__heading">
            <h2>Deliverables</h2>
            <span>Automation package readiness</span>
          </div>
          <div className="ops-table ops-table--deliverables">
            <div className="ops-table__header">
              <span>Deliverable</span>
              <span>Supports Milestone</span>
              <span>Owner</span>
              <span>Due Date</span>
              <span>State</span>
            </div>
            {project.deliverables.map((deliverable) => (
              <article className="ops-table__row" key={deliverable.id}>
                <strong>{deliverable.name}</strong>
                <span>{deliverable.milestoneName}</span>
                <span>{deliverable.owner}</span>
                <span>{deliverable.dueDate ? formatDate(deliverable.dueDate) : 'Complete'}</span>
                <StatusBadge status={deliverable.state} />
              </article>
            ))}
          </div>
        </section>

        <section className="ops-panel">
          <div className="ops-panel__heading">
            <h2>Quality Gates</h2>
            <span>Prepared for VantagePoint compliance</span>
          </div>
          <div className="ops-table ops-table--quality">
            <div className="ops-table__header">
              <span>Gate</span>
              <span>Supports</span>
              <span>QAQC Eligible</span>
              <span>Status</span>
              <span>VP Entry Needed</span>
            </div>
            {project.qualityGates.map((gate) => (
              <article className="ops-table__row" key={gate.id}>
                <strong>{gate.name}</strong>
                <span>{gate.milestoneName}</span>
                <span>{gate.qaqcEligible ? 'Yes' : 'No'}</span>
                <StatusBadge status={gate.status} />
                <span>{gate.vpEntryNeeded}</span>
              </article>
            ))}
          </div>
        </section>
      </div>

      <section className="category-indicator-row" aria-label="Readiness category indicators">
        {categorySummaries.map((summary) => (
          <span key={summary.category}>
            <strong>{summary.category}</strong>
            {summary.red > 0 ? `${summary.red} Red` : summary.yellow > 0 ? `${summary.yellow} Yellow` : `${summary.green} OK`}
          </span>
        ))}
      </section>

      <div className="ops-grid">
        <section className="ops-panel">
          <div className="ops-panel__heading">
            <h2>Risks</h2>
            <span>Future uncertainty by milestone impact</span>
          </div>
          <div className="ops-table ops-table--risks">
            <div className="ops-table__header">
              <span>Risk</span>
              <span>Impact</span>
              <span>Owner</span>
              <span>Trend</span>
            </div>
            {project.risks.map((risk) => (
              <article className="ops-table__row" key={risk.id}>
                <strong>{risk.title}</strong>
                <span>{risk.milestoneImpact.join(' / ')}</span>
                <span>{risk.owner}</span>
                <StatusBadge status={risk.trend === 'Increasing' ? 'Red' : 'Yellow'} label={risk.trend} />
              </article>
            ))}
          </div>
        </section>

        <section className="ops-panel">
          <div className="ops-panel__heading">
            <h2>Recent Activity</h2>
            <span>Latest updates and milestone changes</span>
          </div>
          <div className="activity-list">
            <span>{project.latestUpdate}</span>
            {project.recentActivity.map((activity) => (
              <span key={activity}>{activity}</span>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
