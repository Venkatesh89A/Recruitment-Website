import { Navigate, Route, Routes } from 'react-router-dom';
import JobDetailsPage from '../pages/JobDetailsPage.jsx';
import JobListingPage from '../pages/JobListingPage.jsx';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/jobs" replace />} />
      <Route path="/jobs" element={<JobListingPage />} />
      <Route path="/jobs/:jobId" element={<JobDetailsPage />} />
      <Route path="*" element={<Navigate to="/jobs" replace />} />
    </Routes>
  );
}

export default AppRoutes;
