import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './layouts/AppLayout'
import { Portfolio } from './pages/Portfolio'
import { PMWorkQueue } from './pages/PMWorkQueue'
import { ProjectDetail } from './pages/ProjectDetail'
import { Projects } from './pages/Projects'
import { Resources } from './pages/Resources'
import { WeeklyReview } from './pages/WeeklyReview'

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Portfolio />} />
        <Route path="my-work" element={<PMWorkQueue />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/:projectId" element={<ProjectDetail />} />
        <Route path="resources" element={<Resources />} />
        <Route path="weekly-review" element={<WeeklyReview />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
