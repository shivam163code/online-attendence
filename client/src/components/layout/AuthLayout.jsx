import React from 'react';
import { motion } from 'framer-motion';

const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden overflow-hidden border-r border-white/10 bg-slate-950 lg:flex lg:flex-col lg:justify-between">
        <div className="absolute inset-0 bg-hero-grid bg-[length:36px_36px] opacity-30" />
        <div className="relative z-10 p-10">
          <div className="badge">Online Attendance Platform</div>
          <motion.h1 initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="mt-8 max-w-xl text-5xl font-black leading-tight text-white">
            Smart attendance for modern campuses.
          </motion.h1>
          <p className="mt-6 max-w-lg text-lg text-slate-300">
            Admins, teachers, and students work from one secure system with dashboards, analytics, QR attendance, reports, and notifications.
          </p>
        </div>
        <div className="relative z-10 p-10 text-sm text-slate-400">Role-based access • Realtime updates • Mobile-friendly workflows</div>
      </div>
      <div className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-lg">
          <div className="mb-6 lg:hidden">
            <div className="badge">Online Attendance Platform</div>
            <h1 className="mt-4 text-3xl font-black text-white">{title}</h1>
            <p className="mt-2 text-sm text-slate-400">{subtitle}</p>
          </div>
          <div className="surface rounded-3xl p-6 shadow-soft sm:p-8">
            <h2 className="text-2xl font-bold text-white">{title}</h2>
            <p className="mt-2 text-sm text-slate-400">{subtitle}</p>
            <div className="mt-6">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
