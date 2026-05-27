import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/layout/AuthLayout';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student' });
  const [loading, setLoading] = useState(false);

  const getDashboardPath = (role) => {
    if (role === 'admin') return '/admin-dashboard';
    if (role === 'teacher') return '/teacher-dashboard';
    if (role === 'student') return '/student-dashboard';
    return '/dashboard';
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const authData = await register(form);
      navigate(getDashboardPath(authData.role), { replace: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Register" subtitle="Create a role-based account for the attendance platform.">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input className="input" placeholder="Full name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
        <input className="input" placeholder="Email" type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
        <input className="input" placeholder="Password" type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} />
        <select className="input" value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })}>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="admin">Admin</option>
        </select>
        <button className="btn-primary w-full" type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create account'}</button>
      </form>
      <div className="mt-4 text-sm text-slate-400">
        Already registered? <Link to="/login" className="text-white">Login</Link>
      </div>
    </AuthLayout>
  );
};

export default RegisterPage;
