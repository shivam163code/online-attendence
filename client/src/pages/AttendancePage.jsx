import React, { useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';
import QRCode from 'react-qr-code';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import AppLayout from '../components/layout/AppLayout';
import PageHeader from '../components/ui/PageHeader';
import EmptyState from '../components/ui/EmptyState';

const AttendancePage = () => {
  const { user } = useAuth();
  const [session, setSession] = useState(null);
  const [token, setToken] = useState('');
  const [form, setForm] = useState({ classId: '', subjectId: '', teacherId: '', studentId: '', status: 'present' });
  const [loading, setLoading] = useState(false);

  const canManage = user?.role === 'admin' || user?.role === 'teacher';

  const generateSession = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const payload = { classId: form.classId, subjectId: form.subjectId, teacherId: form.teacherId || undefined, expiresInMinutes: 10 };
      const { data } = await api.post('/attendance/qr-session', payload);
      setSession(data.data);
      setToken(data.data.token);
      toast.success('QR session created');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const scanAttendance = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await api.post('/attendance/scan', {
        token,
        studentId: form.studentId,
        status: form.status
      });
      toast.success('Attendance marked');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const qrValue = useMemo(() => session?.token || token || 'attendance-session', [session, token]);

  return (
    <AppLayout>
      <PageHeader
        title="Attendance"
        subtitle="Generate QR attendance sessions, mark records, and support quick student scanning workflows."
      />

      <div className="grid gap-6 xl:grid-cols-[1fr_0.8fr]">
        <div className="space-y-6">
          <div className="surface rounded-3xl p-6">
            <h3 className="text-xl font-semibold text-white">Attendance actions</h3>
            <p className="mt-2 text-sm text-slate-400">Use this form to create a QR session or mark a scanned token.</p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <input className="input" placeholder="Class ID" value={form.classId} onChange={(e) => setForm({ ...form, classId: e.target.value })} />
              <input className="input" placeholder="Subject ID" value={form.subjectId} onChange={(e) => setForm({ ...form, subjectId: e.target.value })} />
              <input className="input" placeholder="Teacher ID" value={form.teacherId} onChange={(e) => setForm({ ...form, teacherId: e.target.value })} />
              <input className="input" placeholder="Student ID" value={form.studentId} onChange={(e) => setForm({ ...form, studentId: e.target.value })} />
              <select className="input md:col-span-2" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                <option value="present">Present</option>
                <option value="absent">Absent</option>
                <option value="late">Late</option>
              </select>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              {canManage ? <button className="btn-primary" onClick={generateSession} disabled={loading} type="button">Generate QR session</button> : null}
              <button className="btn-secondary" onClick={scanAttendance} disabled={loading} type="button">Submit scan</button>
            </div>
          </div>

          <div className="surface rounded-3xl p-6">
            <h3 className="text-lg font-semibold text-white">Attendance history</h3>
            <p className="mt-2 text-sm text-slate-400">Connect this page to attendance history filters and editing actions.</p>
            <div className="mt-4">
              <EmptyState
                title="No recent records loaded"
                description="Fetch attendance history from the API here if you want a live log on this page."
              />
            </div>
          </div>
        </div>

        <div className="surface rounded-3xl p-6">
          <h3 className="text-lg font-semibold text-white">QR session</h3>
          <p className="mt-2 text-sm text-slate-400">Students scan the code before it expires.</p>
          <div className="mt-6 flex justify-center rounded-3xl bg-white p-6">
            <QRCode value={qrValue} size={220} />
          </div>
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300 break-all">{qrValue}</div>
          {session ? <div className="mt-4 text-sm text-emerald-300">Expires at {new Date(session.expiresAt).toLocaleString()}</div> : null}
        </div>
      </div>
    </AppLayout>
  );
};

export default AttendancePage;
