import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, QrCode, BarChart3, BellRing } from 'lucide-react';

const features = [
  { icon: ShieldCheck, title: 'Secure roles', text: 'JWT auth, protected routes, and role-based dashboards.' },
  { icon: QrCode, title: 'QR attendance', text: 'Teachers generate time-limited QR sessions for students.' },
  { icon: BarChart3, title: 'Analytics', text: 'Attendance summaries, charts, exports, and trends.' },
  { icon: BellRing, title: 'Realtime alerts', text: 'Socket-powered notifications and live attendance updates.' }
];

const HomePage = () => {
  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <section className="surface relative overflow-hidden rounded-[2rem] p-8 shadow-soft md:p-12">
        <div className="absolute inset-0 bg-hero-grid bg-[length:40px_40px] opacity-20" />
        <div className="relative z-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <div className="badge">Modern attendance management</div>
            <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="mt-6 max-w-3xl text-5xl font-black leading-tight text-white md:text-6xl">
              Manage classes, attendance, reports, and notifications from one dashboard.
            </motion.h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
              Built for admins, teachers, and students with a clean architecture backend, responsive frontend, QR attendance, analytics charts, and extensible modules for future AI and GPS features.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="btn-primary" to="/login">Login</Link>
              <Link className="btn-secondary" to="/register">Create account</Link>
              <Link className="btn-secondary" to="/dashboard">Open dashboard</Link>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {features.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-3xl border border-white/10 bg-slate-950/50 p-5">
                <Icon className="h-5 w-5 text-cyan-300" />
                <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm text-slate-400">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
