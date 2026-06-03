import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { StatusBadge } from '../components/StatusBadge';
import { daysUntil, formatDate, getReadinessStatus, getUpcomingMilestones, projects, readinessItems, type ReadinessItem } from '../data/mockData';

const allManagersValue = 'all-managers';

const sortByDueDate = (items: ReadinessItem[]) => [...items].sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

const WorkItemRow = ({ item }: { item: ReadinessItem }) => (
  <Link className="readiness-row readiness-row--work" to={`/projects/${item.projectId}`}>
    <StatusBadge status={getReadinessStatus(item)} />
    <div>
      <strong>{item.title}</strong>
      <p>{item.projectNumber} - {item.projectName}</p>
      <span>{item.actionRequired}</span>
    </div>
    <div className="row-meta">
      <span>{item.owner}</span>
      <strong>{formatDate(item.dueDate)}</strong>
      <span>{item.category}</span>
    </div>
  </Link>
);

export function PMWorkQueue() {
  const managers = Array.from(new Set(projects.map((project) => project.manager)));
  const [selectedManager, setSelectedManager] = useState(managers[0] ?? allManagersValue);

  const visibleItems = useMemo(
    () => sortByDueDate(readinessItems
      .filter((item) => selectedManager === allManagersValue || item.owner === selectedManager)
      .filter((item) => getReadinessStatus(item) !== 'Gray')
      .filter((item) => item.state !== 'Complete')),
    [selectedManager],
  );

  const thisWeekItems = visibleItems.filter((item) => daysUntil(item.dueDate) <= 7);
  const thisMonthItems = visibleItems.filter((item) => daysUntil(item.dueDate) > 7 && daysUntil(item.dueDate) <= 30);
  const laterItems = visibleItems.filter((item) => daysUntil(item.dueDate) > 30);
  const projectIds = new Set(visibleItems.map((item) => item.projectId));
  const upcomingMilestones = getUpcomingMilestones(8).filter((milestone) => projectIds.has(milestone.projectId));

  return (
    <section className="page-stack">
      <div className="hero-panel hero-panel--compact">
        <div>
          <p className="eyebrow">PM work queue</p>
          <h1>What do I need to do next?</h1>
          <p>
            Work is grouped by the two questions a PM asks every week: what must move now, and what needs planning this month.
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

      <section className="priority-panel priority-panel--red">
        <div className="section-heading">
          <div>
            <p className="eyebrow">This week</p>
            <h2>Do next</h2>
          </div>
          <span>{thisWeekItems.length} items</span>
        </div>
        <div className="item-list">
          {thisWeekItems.length === 0 && <p className="empty-inline">No readiness items due this week for this owner.</p>}
          {thisWeekItems.map((item) => (
            <WorkItemRow item={item} key={item.id} />
          ))}
        </div>
      </section>

      <section className="priority-panel priority-panel--yellow">
        <div className="section-heading">
          <div>
            <p className="eyebrow">This month</p>
            <h2>Plan and unblock</h2>
          </div>
          <span>{thisMonthItems.length} items</span>
        </div>
        <div className="item-list">
          {thisMonthItems.length === 0 && <p className="empty-inline">No readiness items due this month for this owner.</p>}
          {thisMonthItems.map((item) => (
            <WorkItemRow item={item} key={item.id} />
          ))}
        </div>
      </section>

      {laterItems.length > 0 && (
        <section className="priority-panel priority-panel--quiet">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Later</p>
              <h2>Keep visible, not urgent</h2>
            </div>
            <span>{laterItems.length} items</span>
          </div>
          <div className="item-list">
            {laterItems.map((item) => (
              <WorkItemRow item={item} key={item.id} />
            ))}
          </div>
        </section>
      )}

      <section className="table-card">
        <div className="section-heading section-heading--inset">
          <div>
            <p className="eyebrow">Upcoming milestones</p>
            <h2>Project dates that may affect the queue</h2>
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
                  <td>{milestone.projectNumber} - {milestone.projectName}</td>
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
