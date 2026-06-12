import { StatusBadge } from '../components/StatusBadge';
import { resourceConstraints } from '../data/mockData';

export function Resources() {
  return (
    <section className="ops-page">
      <header className="ops-header">
        <div>
          <p className="eyebrow">Resources</p>
          <h1>Constraint monitor</h1>
        </div>
        <span>Future planning module</span>
      </header>

      <section className="ops-panel">
        <div className="ops-panel__heading">
          <h2>Resource Constraints</h2>
          <span>Placeholder operating view</span>
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
