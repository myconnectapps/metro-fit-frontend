import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import WellnessProfilePage from './features/wellness-profile/WellnessProfilePage';

/**
 * Root router.
 * Future feature routes are added here.
 */
function App() {
  return (
    <Routes>
      <Route path="/wellness-profile" element={<WellnessProfilePage />} />
      {/* Default redirect to wellness profile setup */}
      <Route path="*" element={<Navigate to="/wellness-profile" replace />} />
    </Routes>
  );
}

export default App;
