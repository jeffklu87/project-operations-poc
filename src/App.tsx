import { Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout';
import { Dashboard } from './pages/Dashboard';
import { Procurement } from './pages/Procurement';
import { ProjectDetail } from './pages/ProjectDetail';

const projectOperationsRoutes = (
  <Route element={<AppLayout />}>
    <Route index element={<Dashboard />} />
    <Route path="projects/:projectId" element={<ProjectDetail />} />
    <Route path="procurement" element={<Procurement />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Route>
);

export default function App() {
  return <Routes>{projectOperationsRoutes}</Routes>;
}
