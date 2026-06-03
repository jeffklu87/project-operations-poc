import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './layouts/AppLayout'
import { Dashboard } from './pages/Dashboard'
import { PMWorkQueue } from './pages/PMWorkQueue'
import { ProjectDetail } from './pages/ProjectDetail'

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="projects/:projectId" element={<ProjectDetail />} />
        <Route path="pm-queue" element={<PMWorkQueue />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
