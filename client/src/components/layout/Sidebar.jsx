import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, CalendarClock, Bell, ClipboardList, Settings, FileText, QrCode } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['admin', 'teacher', 'student'] },
  { to: '/attendance', label: 'Attendance', icon: ClipboardList, roles: ['admin', 'teacher', 'student'] },
  { to: '/reports', label: 'Reports', icon: FileText, roles: ['admin', 'teacher', 'student'] },
  { to: '/notifications', label: 'Notifications', icon: Bell, roles: ['admin', 'teacher', 'student'] },
  { to: '/profile', label: 'Profile', icon: Users, roles: ['admin', 'teacher', 'student'] },
  { to: '/settings', label: 'Settings', icon: Settings, roles: ['admin', 'teacher', 'student'] },
  { to: '/qr-attendance', label: 'QR Attendance', icon: QrCode, roles: ['teacher', 'student'] },
  { to: '/classes', label: 'Classes', icon: CalendarClock, roles: ['admin', 'teacher'] }
];

const Sidebar = () => {
  const { user } = useAuth();
  const visibleLinks = links.filter((link) => !link.roles || link.roles.includes(user?.role));

  return (
    <aside className="hidden w-72 shrink-0 border-r border-white/5 bg-slate-950/75 px-4 py-6 lg:block">
      <div className="mb-8 rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/15 to-cyan-500/10 p-5 shadow-soft">
        <div className="text-xs uppercase tracking-[0.25em] text-emerald-300/70">Attendance OS</div>
        <h1 className="mt-2 text-2xl font-bold">Campus Flow</h1>
        <p className="mt-2 text-sm text-slate-300">Role-based management for attendance, classes, analytics, and reports.</p>
      </div>

      <nav className="space-y-1">
        {visibleLinks.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                isActive ? 'bg-emerald-500/15 text-emerald-300' : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <Icon className="h-4 w-4" />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
