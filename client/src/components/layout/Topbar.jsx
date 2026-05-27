import React from 'react';
import { MoonStar, SunMedium, LogOut, BellRing } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const Topbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-20 border-b border-white/5 bg-slate-950/70 px-4 py-4 backdrop-blur xl:px-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Online Attendance Management</div>
          <h2 className="text-lg font-semibold text-white">Welcome back, {user?.name || 'User'}</h2>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-secondary px-3 py-2" onClick={toggleTheme} type="button">
            {theme === 'dark' ? <SunMedium className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
          </button>
          <button className="btn-secondary px-3 py-2" type="button">
            <BellRing className="h-4 w-4" />
          </button>
          <button className="btn-secondary px-3 py-2" onClick={logout} type="button">
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
