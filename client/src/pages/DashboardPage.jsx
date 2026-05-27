import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, GraduationCap, BookOpen, ClipboardCheck, Download, QrCode, BellRing } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import AppLayout from '../components/layout/AppLayout';
import PageHeader from '../components/ui/PageHeader';
import StatCard from '../components/ui/StatCard';
import AttendanceChart from '../components/charts/AttendanceChart';
import Loader from '../components/ui/Loader';

const roleCopy = {
  admin: {
    title: 'Admin Dashboard',
    subtitle: 'Monitor campus-wide attendance, manage staff and students, and review analytics in real time.'
  },
  teacher: {
    title: 'Teacher Dashboard',
    subtitle: 'Track assigned classes, open QR sessions, mark attendance, and follow up on student activity.'
  },
  student: {
    title: 'Student Dashboard',
    subtitle: 'Review attendance percentage, timetable, subject trends, and notifications from one place.'
  }
};

const DashboardPage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get('/dashboard/stats');
        setStats(data.data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const chartData = useMemo(
    () => ({
      labels: ['Present', 'Absent', 'Late'],
      values: [stats?.present || 0, stats?.absent || 0, stats?.late || 0]
    }),
    [stats]
  );

  const cards = [
    { label: 'Total students', value: stats?.students ?? 0, icon: Users, tone: 'emerald' },
    { label: 'Total teachers', value: stats?.teachers ?? 0, icon: GraduationCap, tone: 'cyan' },
    { label: 'Total classes', value: stats?.classes ?? 0, icon: BookOpen, tone: 'violet' },
    { label: 'Attendance records', value: (stats?.present || 0) + (stats?.absent || 0) + (stats?.late || 0), icon: ClipboardCheck, tone: 'amber' }
  ];

  if (loading) {
    return <AppLayout><Loader /></AppLayout>;
  }

  return (
    <AppLayout>
      <PageHeader
        title={roleCopy[user?.role || 'student'].title}
        subtitle={roleCopy[user?.role || 'student'].subtitle}
        action={
          <div className="flex flex-wrap gap-3">
            <Link className="btn-secondary" to="/reports"><Download className="h-4 w-4" /> Export reports</Link>
            {(user?.role === 'admin' || user?.role === 'teacher') ? <Link className="btn-primary" to="/qr-attendance"><QrCode className="h-4 w-4" /> QR Attendance</Link> : null}
          </div>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => <StatCard key={card.label} {...card} />)}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <AttendanceChart data={chartData} />
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="surface rounded-3xl p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Quick actions</h3>
            <BellRing className="h-5 w-5 text-cyan-300" />
          </div>
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            <div className="rounded-2xl bg-white/5 p-4">Open today’s lecture and start a QR attendance session in seconds.</div>
            <div className="rounded-2xl bg-white/5 p-4">Review attendance history, filters, and date-based reports.</div>
            <div className="rounded-2xl bg-white/5 p-4">Send notifications and announcements to classes or individual users.</div>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default DashboardPage;
