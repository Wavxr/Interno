import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import Header from './components/Layout/Header';
import NavBar from './components/Layout/NavBar';
import InternshipTrackerPage from './pages/InternshipTrackerPage';
import AnalyticsPage from './pages/AnalyticsPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import { useAuth } from './hooks/useAuth';
import { signIn } from './services/authService';
import './index.css';

function App() {
  const { user, loading } = useAuth();

  const handleLogin = async (email, password) => {
    await signIn(email, password);
  };

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-gray-400" strokeWidth={1.5} />
          <p className="mt-3 text-sm text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  // Show login page if not authenticated
  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // Show app if authenticated
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white">
        <Header />
        <NavBar />
        <main>
          <Routes>
            <Route path="/" element={<InternshipTrackerPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
