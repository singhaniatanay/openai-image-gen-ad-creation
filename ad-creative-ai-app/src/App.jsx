import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';
import { useAuth } from './contexts/AuthContext';
// import { Button } from '@/components/ui/button'; // No longer needed here
import { DashboardPage } from './pages/DashboardPage'; // <-- Import DashboardPage
import { BrandKitPage } from './pages/BrandKitPage'; // <-- Import BrandKitPage

// Dashboard component is now in DashboardPage.tsx, so we can remove it from here.

function ProtectedRoute({ children }) {
  const { session, loading } = useAuth();

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!session) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route 
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/dashboard/brand-kits" // <-- Add this new route
          element={
            <ProtectedRoute>
              <BrandKitPage />
            </ProtectedRoute>
          }
        />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;