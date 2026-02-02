
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { label: '🏠 Home', path: '/' },
    { label: '🔗 External Games', path: '/external' },
    { label: '⚙️ Admin', path: '/admin' }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-3xl">🎮</span>
            <h1 className="text-2xl font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
              Team Game Night
            </h1>
          </Link>
          <nav className="flex gap-1 sm:gap-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  location.pathname === item.path
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-8">
        {children}
      </main>

      <footer className="bg-white border-t py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-slate-500 text-sm">
            Built for better team bonding. Optimized for Zoom, Google Meet, and Microsoft Teams.
          </p>
        </div>
      </footer>
    </div>
  );
};
