import { Link } from 'react-router-dom';
import { ModuleSummaryCard } from '../components/ModuleSummaryCard';
import { StatusBadge } from '../components/StatusBadge';
import {
  formatDate,
  getCategorySummaries,
  getProjectAttentionScore,
  getReadinessStatus,
  getUpcomingMilestones,
  projects,
  readinessItems,
  type ReadinessItem,
} from '../data/mockData';

const DiscussionItemRow = ({ item }: { item: ReadinessItem }) => (
  <Link className="compact-action-row" to={`/projects/${item.projectId}`}>
    <StatusBadge status={getReadinessStatus(item)} />
    <strong>{item.projectNumber}</strong>
    <span>{item.projectName}</span>
    <span>{item.category}</span>
    <span>{item.owner}</span>
    <strong>{formatDate(item.dueDate)}</strong>
    <span>{item.actionRequired}</span>
  </Link>
);

export function Dashboard() {
  const redItems = readinessItems.filter((item) => getReadinessStatus(item) === 'Red');
  const yellowItems = readinessItems.filter((item) => getReadinessStatus(item) === 'Yellow');
  const upcomingMilestones = getUpcomingMilestones(6);
  const projectsNeedingAttention = [...projects]
    .filter((project) => getProjectAttentionScore(project) > 0)
    .sort((a, b) => getProjectAttentionScore(b) - getProjectAttentionScore(a));
  const categorySummaries = getCategorySummaries();

  return (
    <section className="page-stack page-stack--dense">
      <header className="huddle-header">
        <div>
          <p className="eyebrow">Manager huddle</p>
          <h1>Discussion board</h1>
        </div>
        <div className="huddle-header__counts" aria-label="Huddle summary counts">
          <span className="count-pill count-pill--red">{redItems.length} red</span>
          <span className="count-pill count-pill--yellow">{yellowItems.length} yellow</span>
          <span>{projectsNeedingAttention.length} projects for discussion</span>
        </div>
      </header>

      <section className="dense-panel">
        <div className="dense-panel__heading">
          <h2>Projects requiring discussion</h2>
          <span>{projectsNeedingAttention.length} projects</span>
        </div>
        <div className="discussion-table" role="table" aria-label="Projects requiring huddle discussion">
          <div className="discussion-table__header" role="row">
            <span>Project</span>
            <span>PM</span>
            <span>Phase</span>
            <span>Red</span>
            <span>Yellow</span>
            <span>Primary discussion topic</span>
          </div>
          {projectsNeedingAttention.map((project) => {
            const redCount = project.readinessItems.filter((item) => getReadinessStatus(item) === 'Red').length;
            const yellowCount = project.readinessItems.filter((item) => getReadinessStatus(item) === 'Yellow').length;
            const topItem = project.readinessItems.find((item) => getReadinessStatus(item) === 'Red')
              ?? project.readinessItems.find((item) => getReadinessStatus(item) === 'Yellow');

            return (
              <Link className="discussion-table__row" to={`/projects/${project.id}`} key={project.id}>
                <strong>{project.projectNumber} - {project.name}</strong>
                <span>{project.manager}</span>
                <span>{project.phase}</span>
                <span className="count-pill count-pill--red">{redCount}</span>
                <span className="count-pill count-pill--yellow">{yellowCount}</span>
                <span>{topItem?.actionRequired ?? project.latestUpdate}</span>
              </Link>
            );
          })}
        </div>
      </section>

      <div className="split-grid split-grid--priority split-grid--dense">
        <section className="dense-panel dense-panel--red">
          <div className="dense-panel__heading">
            <h2>Red items</h2>
            <span>Action this week</span>
          </div>
          <div className="compact-action-list">
            <div className="compact-action-list__header">
              <span>Status</span>
              <span>No.</span>
              <span>Project</span>
              <span>Category</span>
              <span>Owner</span>
              <span>Due</span>
              <span>Action required</span>
            </div>
            {redItems.map((item) => (
              <DiscussionItemRow item={item} key={item.id} />
            ))}
          </div>
        </section>

        <section className="dense-panel dense-panel--yellow">
          <div className="dense-panel__heading">
            <h2>Yellow items</h2>
            <span>Plan this month</span>
          </div>
          <div className="compact-action-list">
            <div className="compact-action-list__header">
              <span>Status</span>
              <span>No.</span>
              <span>Project</span>
              <span>Category</span>
              <span>Owner</span>
              <span>Due</span>
              <span>Action required</span>
            </div>
            {yellowItems.map((item) => (
              <DiscussionItemRow item={item} key={item.id} />
            ))}
          </div>
        </section>
      </div>

      <div className="split-grid split-grid--support">
        <section className="dense-panel">
          <div className="dense-panel__heading">
            <h2>Upcoming milestones</h2>
            <span>{upcomingMilestones.length} next dates</span>
          </div>
          <div className="responsive-table responsive-table--compact">
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

        <section className="dense-panel">
          <div className="dense-panel__heading">
            <h2>Category scan</h2>
            <span>red/yellow concentration</span>
          </div>
          <div className="category-stack category-stack--compact">
            {categorySummaries.map((summary) => (
              <ModuleSummaryCard key={summary.category} module={summary} />
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
