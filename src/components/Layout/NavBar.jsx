import { Link, useLocation } from 'react-router-dom';
import { LayoutList, BarChart3 } from 'lucide-react';

export default function NavBar() {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  const navItems = [
    { path: '/', label: 'Tracker', icon: LayoutList },
    { path: '/analytics', label: 'Analytics', icon: BarChart3 }
  ];
  
  return (
    <>
      {/* Desktop Navigation - Top */}
      <nav className="hidden sm:block border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-6">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`
                  flex items-center gap-2 border-b-2 px-1 py-3 text-sm font-medium transition-colors
                  ${isActive(path)
                    ? 'border-gray-900 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }
                `}
              >
                <Icon className="h-4 w-4" strokeWidth={1.5} />
                {label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation - Bottom */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white/95 backdrop-blur-sm">
        <div className="flex justify-around">
          {navItems.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className={`
                flex flex-1 flex-col items-center gap-1 py-3 text-xs font-medium transition-colors
                ${isActive(path)
                  ? 'text-gray-900'
                  : 'text-gray-500'
                }
              `}
            >
              <Icon 
                className={`h-5 w-5 ${isActive(path) ? 'stroke-2' : ''}`}
                strokeWidth={isActive(path) ? 2 : 1.5}
              />
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
