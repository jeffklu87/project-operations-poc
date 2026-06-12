import { Link } from 'react-router-dom';
import { StatusBadge } from '../components/StatusBadge';
import {
  formatDate,
  getProjectAttentionScore,
  getReadinessStatus,
  projects,
  readinessItems,
  type ReadinessItem,
} from '../data/mockData';

const DiscussionItemRow = ({ item }: { item: ReadinessItem }) => (
  <Link className="ops-table__row" to={`/projects/${item.projectId}`}>
    <StatusBadge status={getReadinessStatus(item)} />
    <strong>{item.projectNumber}</strong>
    <span>{item.projectName}</span>
    <span>{item.category}</span>
    <span>{item.owner}</span>
    <strong>{formatDate(item.dueDate)}</strong>
    <span>{item.actionRequired}</span>
  </Link>
);

export function WeeklyReview() {
  const redItems = readinessItems.filter((item) => getReadinessStatus(item) === 'Red');
  const yellowItems = readinessItems.filter((item) => getReadinessStatus(item) === 'Yellow');
  const projectsRequiringDiscussion = [...projects]
    .filter((project) => getProjectAttentionScore(project) > 0)
    .sort((a, b) => getProjectAttentionScore(b) - getProjectAttentionScore(a));

  return (
    <section className="ops-page">
      <header className="ops-header">
        <div>
          <p className="eyebrow">Weekly Review</p>
          <h1>Manager huddle board</h1>
        </div>
        <div className="header-counts">
          <span className="count-pill count-pill--red">{redItems.length} red</span>
          <span className="count-pill count-pill--yellow">{yellowItems.length} yellow</span>
          <span>{projectsRequiringDiscussion.length} projects</span>
        </div>
      </header>

      <section className="ops-panel">
        <div className="ops-panel__heading">
          <h2>Projects Requiring Discussion</h2>
          <span>Review agenda</span>
        </div>
        <div className="ops-table ops-table--review-projects" role="table" aria-label="Projects requiring discussion">
          <div className="ops-table__header" role="row">
            <span>Project</span>
            <span>PM</span>
            <span>Phase</span>
            <span>Red</span>
            <span>Yellow</span>
            <span>Discussion Topic</span>
          </div>
          {projectsRequiringDiscussion.map((project) => {
            const redCount = project.readinessItems.filter((item) => getReadinessStatus(item) === 'Red').length;
            const yellowCount = project.readinessItems.filter((item) => getReadinessStatus(item) === 'Yellow').length;
            const topItem = project.readinessItems.find((item) => getReadinessStatus(item) === 'Red')
              ?? project.readinessItems.find((item) => getReadinessStatus(item) === 'Yellow');

            return (
              <Link className="ops-table__row" to={`/projects/${project.id}`} key={project.id}>
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

      <div className="ops-grid">
        <section className="ops-panel ops-panel--red">
          <div className="ops-panel__heading">
            <h2>Red Items</h2>
            <span>Discuss first</span>
          </div>
          <div className="ops-table ops-table--review-items">
            <div className="ops-table__header">
              <span>Status</span>
              <span>No.</span>
              <span>Project</span>
              <span>Category</span>
              <span>Owner</span>
              <span>Due</span>
              <span>Discussion Topic</span>
            </div>
            {redItems.map((item) => <DiscussionItemRow item={item} key={item.id} />)}
          </div>
        </section>

        <section className="ops-panel ops-panel--yellow">
          <div className="ops-panel__heading">
            <h2>Yellow Items</h2>
            <span>Plan this month</span>
          </div>
          <div className="ops-table ops-table--review-items">
            <div className="ops-table__header">
              <span>Status</span>
              <span>No.</span>
              <span>Project</span>
              <span>Category</span>
              <span>Owner</span>
              <span>Due</span>
              <span>Discussion Topic</span>
            </div>
            {yellowItems.map((item) => <DiscussionItemRow item={item} key={item.id} />)}
          </div>
        </section>
      </div>
    </section>
  );
}
