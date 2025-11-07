import { Briefcase, LogOut } from 'lucide-react';
import { signOut } from '../../services/authService';

export default function Header() {
  const handleLogout = async () => {
    if (confirm('Are you sure you want to sign out?')) {
      try {
        await signOut();
      } catch (error) {
        console.error('Error signing out:', error);
        alert('Failed to sign out');
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-gray-700" strokeWidth={1.5} />
            <h1 className="text-lg font-semibold text-gray-900">Interno</h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            title="Sign out"
          >
            <LogOut className="h-4 w-4" strokeWidth={1.5} />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </div>
    </header>
  );
}

