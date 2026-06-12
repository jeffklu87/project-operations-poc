import { StatusBadge } from '../components/StatusBadge';
import { resourceConstraints } from '../data/mockData';

export function Resources() {
  const redConstraints = resourceConstraints.filter((constraint) => constraint.severity === 'Red');

  return (
    <section className="ops-page">
      <header className="ops-header">
        <div>
          <p className="eyebrow">Resources</p>
          <h1>Resource planning</h1>
        </div>
        <span>Decision supported: Do we have capacity?</span>
      </header>

      <section className="metric-strip metric-strip--compact" aria-label="Resource planning summary">
        <article><span>Startup Loading</span><strong>2</strong></article>
        <article><span>Engineering Conflicts</span><strong>1</strong></article>
        <article><span>FAT Staffing</span><strong>2</strong></article>
        <article><span>Red Constraints</span><strong>{redConstraints.length}</strong></article>
        <article><span>Planning Window</span><strong>30d</strong></article>
      </section>

      <section className="ops-panel">
        <div className="ops-panel__heading">
          <h2>Resource Constraints</h2>
          <span>Capacity decisions before milestone impact</span>
        </div>
        <div className="ops-table ops-table--resources">
          <div className="ops-table__header">
            <span>Area</span>
            <span>Constraint</span>
            <span>Window</span>
            <span>Affected Projects</span>
            <span>Severity</span>
          </div>
          {resourceConstraints.map((constraint) => (
            <article className="ops-table__row" key={constraint.id}>
              <strong>{constraint.area}</strong>
              <span>{constraint.constraint}</span>
              <span>{constraint.window}</span>
              <span>{constraint.affectedProjects.join(', ')}</span>
              <StatusBadge status={constraint.severity} />
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
