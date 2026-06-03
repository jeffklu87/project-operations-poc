import { CalendarDays, CheckCircle2, ListChecks, UserRound } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { StatusBadge } from '../components/StatusBadge';
import { daysUntil, formatDate, getReadinessStatus, getUpcomingMilestones, projects, readinessItems } from '../data/mockData';

const allManagersValue = 'all-managers';

export function PMWorkQueue() {
  const managers = Array.from(new Set(projects.map((project) => project.manager)));
  const [selectedManager, setSelectedManager] = useState(managers[0] ?? allManagersValue);

  const visibleItems = useMemo(
    () => readinessItems
      .filter((item) => selectedManager === allManagersValue || item.owner === selectedManager)
      .filter((item) => getReadinessStatus(item) !== 'Gray')
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()),
    [selectedManager],
  );

  const redItems = visibleItems.filter((item) => getReadinessStatus(item) === 'Red');
  const yellowItems = visibleItems.filter((item) => getReadinessStatus(item) === 'Yellow');
  const dueThisWeek = visibleItems.filter((item) => daysUntil(item.dueDate) <= 7 && item.state !== 'Complete');
  const dueNext30 = visibleItems.filter((item) => daysUntil(item.dueDate) > 7 && daysUntil(item.dueDate) <= 30 && item.state !== 'Complete');
  const projectIds = new Set(visibleItems.map((item) => item.projectId));
  const upcomingMilestones = getUpcomingMilestones(12).filter((milestone) => projectIds.has(milestone.projectId));

  return (
    <section className="page-stack">
      <div className="hero-panel hero-panel--compact">
        <div>
          <p className="eyebrow">PM work queue</p>
          <h1>Priority list for readiness follow-through</h1>
          <p>
            A PM-focused view of evaluated readiness items: what needs to get done, when it is due, and what might otherwise be forgotten.
          </p>
        </div>
      </div>

      <div className="filter-panel filter-panel--compact" aria-label="PM work queue filters">
        <label>
          <span>Owner</span>
          <select value={selectedManager} onChange={(event) => setSelectedManager(event.target.value)}>
            {managers.map((manager) => (
              <option key={manager} value={manager}>{manager}</option>
            ))}
            <option value={allManagersValue}>All owners</option>
          </select>
        </label>
      </div>

      <div className="metric-grid">
        <article className="metric-card metric-card--red">
          <span className="metric-card__icon"><ListChecks size={22} /></span>
          <div>
            <span>My red items</span>
            <strong>{redItems.length}</strong>
            <p>Action or resolution needed this week.</p>
          </div>
        </article>
        <article className="metric-card metric-card--yellow">
          <span className="metric-card__icon"><CalendarDays size={22} /></span>
          <div>
            <span>My yellow items</span>
            <strong>{yellowItems.length}</strong>
            <p>Planning needed before the next month closes.</p>
          </div>
        </article>
        <article className="metric-card metric-card--blue">
          <span className="metric-card__icon"><UserRound size={22} /></span>
          <div>
            <span>Due this week</span>
            <strong>{dueThisWeek.length}</strong>
            <p>Open items within the seven-day action window.</p>
          </div>
        </article>
        <article className="metric-card metric-card--green">
          <span className="metric-card__icon"><CheckCircle2 size={22} /></span>
          <div>
            <span>Due next 30 days</span>
            <strong>{dueNext30.length}</strong>
            <p>Planning queue after the immediate action list.</p>
          </div>
        </article>
      </div>

      <div className="split-grid split-grid--priority">
        <section className="priority-panel priority-panel--red">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Focus now</p>
              <h2>My red items</h2>
            </div>
          </div>
          <div className="item-list">
            {redItems.length === 0 && <p className="empty-inline">No red items for this owner.</p>}
            {redItems.map((item) => (
              <Link className="readiness-row" to={`/projects/${item.projectId}`} key={item.id}>
                <StatusBadge status="Red" />
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.projectNumber} · {item.projectName}</p>
                  <span>{item.actionRequired}</span>
                </div>
                <div className="row-meta">
                  <span>{item.category}</span>
                  <strong>{formatDate(item.dueDate)}</strong>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="priority-panel priority-panel--yellow">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Plan next</p>
              <h2>My yellow items</h2>
            </div>
          </div>
          <div className="item-list">
            {yellowItems.length === 0 && <p className="empty-inline">No yellow items for this owner.</p>}
            {yellowItems.map((item) => (
              <Link className="readiness-row" to={`/projects/${item.projectId}`} key={item.id}>
                <StatusBadge status="Yellow" />
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.projectNumber} · {item.projectName}</p>
                  <span>{item.actionRequired}</span>
                </div>
                <div className="row-meta">
                  <span>{item.category}</span>
                  <strong>{formatDate(item.dueDate)}</strong>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <section className="table-card">
        <div className="section-heading section-heading--inset">
          <div>
            <p className="eyebrow">Action register</p>
            <h2>Owner, due date, category, project, action required</h2>
          </div>
          <span>{visibleItems.length} active items</span>
        </div>
        <div className="responsive-table">
          <table>
            <thead>
              <tr>
                <th>Status</th>
                <th>Action required</th>
                <th>Project</th>
                <th>Category</th>
                <th>Owner</th>
                <th>Due</th>
                <th>State</th>
              </tr>
            </thead>
            <tbody>
              {visibleItems.map((item) => (
                <tr key={item.id}>
                  <td><StatusBadge status={getReadinessStatus(item)} /></td>
                  <td>
                    <strong>{item.title}</strong>
                    <span>{item.actionRequired}</span>
                  </td>
                  <td>{item.projectNumber} · {item.projectName}</td>
                  <td>{item.category}</td>
                  <td>{item.owner}</td>
                  <td>{formatDate(item.dueDate)}</td>
                  <td><StatusBadge status={item.state} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="table-card">
        <div className="section-heading section-heading--inset">
          <div>
            <p className="eyebrow">Project milestones</p>
            <h2>Upcoming milestones for this queue</h2>
          </div>
        </div>
        <div className="responsive-table">
          <table>
            <thead>
              <tr>
                <th>Milestone</th>
                <th>Project</th>
                <th>Date</th>
                <th>State</th>
              </tr>
            </thead>
            <tbody>
              {upcomingMilestones.map((milestone) => (
                <tr key={milestone.id}>
                  <td><strong>{milestone.name}</strong></td>
                  <td>{milestone.projectNumber} · {milestone.projectName}</td>
                  <td>{formatDate(milestone.date)}</td>
                  <td><StatusBadge status={milestone.state} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
}
