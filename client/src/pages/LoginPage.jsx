import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/layout/AuthLayout';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
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
      const authData = await login(form);
      navigate(getDashboardPath(authData.role), { replace: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Login" subtitle="Access your role-based attendance dashboard.">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input className="input" placeholder="Email" type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
        <input className="input" placeholder="Password" type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} />
        <button className="btn-primary w-full" type="submit" disabled={loading}>{loading ? 'Signing in...' : 'Sign in'}</button>
      </form>
      <div className="mt-4 flex items-center justify-between text-sm text-slate-400">
        <Link to="/forgot-password" className="hover:text-white">Forgot password?</Link>
        <Link to="/register" className="hover:text-white">Create account</Link>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
