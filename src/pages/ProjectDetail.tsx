import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { StatusBadge } from '../components/StatusBadge';
import {
  formatDate,
  getProjectById,
  getReadinessStatus,
  projectWorkAreas,
  type WorkArea,
} from '../data/mockData';

type DetailTab = 'Overview' | 'Work Areas';

const tabs: DetailTab[] = ['Overview', 'Work Areas'];

export function ProjectDetail() {
  const { projectId } = useParams();
  const [activeTab, setActiveTab] = useState<DetailTab>('Overview');
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

  const workAreas = projectWorkAreas[project.id] ?? [];
  const attentionWorkAreas = workAreas.filter((workArea) => workArea.state === 'Attention');
  const planningWorkAreas = workAreas.filter((workArea) => workArea.state === 'Planning');
  const healthyWorkAreas = workAreas.filter((workArea) => workArea.state === 'Healthy');
  const nextMilestone = project.milestones.find((milestone) => milestone.state === 'At risk' || milestone.state === 'Blocked')
    ?? project.milestones.find((milestone) => milestone.state === 'Upcoming')
    ?? project.milestones.find((milestone) => milestone.state !== 'Complete');
  const currentFocus = attentionWorkAreas[0] ?? planningWorkAreas[0] ?? workAreas[0];
  const redItems = project.readinessItems.filter((item) => getReadinessStatus(item) === 'Red');
  const yellowItems = project.readinessItems.filter((item) => getReadinessStatus(item) === 'Yellow');
  const topBlockers = workAreas.flatMap((workArea) => workArea.blockers.map((blocker) => ({ blocker, workArea }))).slice(0, 5);
  const topActions = workAreas.flatMap((workArea) => workArea.actions.map((action) => ({ action, workArea }))).slice(0, 5);
  const topRisks = workAreas.flatMap((workArea) => workArea.risks.map((risk) => ({ risk, workArea }))).slice(0, 4);
  const topDecisions = workAreas.flatMap((workArea) => workArea.decisions.map((decision) => ({ decision, workArea }))).slice(0, 4);
  const topUnknowns = workAreas.flatMap((workArea) => workArea.unknowns.map((unknown) => ({ unknown, workArea }))).slice(0, 4);

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
          <div><dt>Attention Areas</dt><dd>{attentionWorkAreas.length}</dd></div>
          <div><dt>Red / Yellow</dt><dd>{redItems.length} / {yellowItems.length}</dd></div>
        </dl>
      </header>

      <nav className="detail-tabs" aria-label="Project detail sections">
        {tabs.map((tab) => (
          <button className={activeTab === tab ? 'active' : ''} key={tab} onClick={() => setActiveTab(tab)} type="button">
            {tab}
          </button>
        ))}
      </nav>

      {activeTab === 'Overview' && currentFocus && (
        <>
          <section className="workarea-focus">
            <div>
              <p className="eyebrow">Current Focus</p>
              <h2>{currentFocus.name}</h2>
              <span>{currentFocus.currentFocus}</span>
              <StatusBadge status={currentFocus.state === 'Attention' ? 'Red' : currentFocus.state === 'Planning' ? 'Yellow' : 'Green'} label={currentFocus.state} />
            </div>
            <div>
              <strong>Attention</strong>
              <p>{currentFocus.attentionReason}</p>
            </div>
            <div>
              <strong>Next Milestone</strong>
              <p>{currentFocus.nextMilestone}{nextMilestone ? ` - ${formatDate(nextMilestone.date)}` : ''}</p>
            </div>
          </section>

          <section className="ops-panel ops-panel--primary">
            <div className="ops-panel__heading">
              <h2>Work Areas Requiring Attention</h2>
              <span>{attentionWorkAreas.length} expanded operational areas</span>
            </div>
            <div className="workarea-attention-list">
              {attentionWorkAreas.map((workArea) => (
                <WorkAreaSummary workArea={workArea} key={workArea.id} />
              ))}
            </div>
          </section>

          <div className="ops-grid">
            <SignalList title="Top Blockers" items={topBlockers.map((item) => ({ text: item.blocker, meta: item.workArea.name }))} />
            <SignalList title="Top Actions" items={topActions.map((item) => ({ text: item.action, meta: item.workArea.owner }))} />
          </div>

          <div className="ops-grid ops-grid--thirds">
            <SignalList title="Risks" items={topRisks.map((item) => ({ text: item.risk, meta: item.workArea.name }))} />
            <SignalList title="Decisions" items={topDecisions.map((item) => ({ text: item.decision, meta: item.workArea.owner }))} />
            <SignalList title="Unknowns" items={topUnknowns.map((item) => ({ text: item.unknown, meta: item.workArea.name }))} />
          </div>
        </>
      )}

      {activeTab === 'Work Areas' && (
        <section className="workarea-stack">
          {attentionWorkAreas.map((workArea) => (
            <WorkAreaDetail workArea={workArea} expanded key={workArea.id} />
          ))}
          {planningWorkAreas.map((workArea) => (
            <WorkAreaDetail workArea={workArea} expanded key={workArea.id} />
          ))}
          {healthyWorkAreas.length > 0 && (
            <details className="ops-panel attention-disclosure">
              <summary>
                <span>
                  <strong>Healthy Work Areas</strong>
                  <small>{healthyWorkAreas.length} summarized areas</small>
                </span>
                <span className="summary-metrics"><b>Expand for reference</b></span>
              </summary>
              <div className="workarea-healthy-list">
                {healthyWorkAreas.map((workArea) => (
                  <WorkAreaSummary workArea={workArea} key={workArea.id} />
                ))}
              </div>
            </details>
          )}
        </section>
      )}
    </section>
  );
}

function WorkAreaSummary({ workArea }: { workArea: WorkArea }) {
  return (
    <article className="workarea-summary">
      <div>
        <strong>{workArea.name}</strong>
        <span>{workArea.currentFocus}</span>
      </div>
      <div>
        <small>Next</small>
        <span>{workArea.nextMilestone}</span>
      </div>
      <StatusBadge status={workArea.state === 'Attention' ? 'Red' : workArea.state === 'Planning' ? 'Yellow' : 'Green'} label={workArea.state} />
    </article>
  );
}

function WorkAreaDetail({ workArea, expanded }: { workArea: WorkArea; expanded?: boolean }) {
  return (
    <details className={`ops-panel workarea-detail workarea-detail--${workArea.state.toLowerCase()}`} open={expanded}>
      <summary>
        <span>
          <strong>{workArea.name}</strong>
          <small>{workArea.currentFocus}</small>
        </span>
        <span className="summary-metrics">
          <b>{workArea.nextMilestone}</b>
          <StatusBadge status={workArea.state === 'Attention' ? 'Red' : workArea.state === 'Planning' ? 'Yellow' : 'Green'} label={workArea.state} />
        </span>
      </summary>
      <div className="workarea-detail-grid">
        <SignalList title="Milestones" items={workArea.milestones.map((item) => ({ text: item }))} />
        <SignalList title="Blockers" items={workArea.blockers.map((item) => ({ text: item }))} />
        <SignalList title="Actions" items={workArea.actions.map((item) => ({ text: item, meta: workArea.owner }))} />
        <SignalList title="Risks" items={workArea.risks.map((item) => ({ text: item }))} />
        <SignalList title="Decisions" items={workArea.decisions.map((item) => ({ text: item }))} />
        <SignalList title="Unknowns" items={workArea.unknowns.map((item) => ({ text: item }))} />
      </div>
    </details>
  );
}

function SignalList({ title, items }: { title: string; items: Array<{ text: string; meta?: string }> }) {
  return (
    <section className="ops-panel signal-list">
      <div className="ops-panel__heading">
        <h2>{title}</h2>
        <span>{items.length} items</span>
      </div>
      <div>
        {items.length > 0 ? items.map((item) => (
          <article className="signal-row" key={`${title}-${item.text}`}>
            <strong>{item.text}</strong>
            {item.meta && <span>{item.meta}</span>}
          </article>
        )) : (
          <article className="signal-row signal-row--empty">
            <strong>No current items</strong>
          </article>
        )}
      </div>
    </section>
  );
}
