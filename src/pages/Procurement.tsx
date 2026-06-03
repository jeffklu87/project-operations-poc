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
