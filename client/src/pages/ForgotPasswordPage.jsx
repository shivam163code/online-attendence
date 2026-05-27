import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/layout/AuthLayout';
import api from '../services/api';
import toast from 'react-hot-toast';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await api.post('/auth/forgot-password', { email });
      toast.success('Reset instructions queued');
      setEmail('');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Forgot password" subtitle="Request a password reset link from your registered email.">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input className="input" placeholder="Email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        <button className="btn-primary w-full" type="submit" disabled={loading}>{loading ? 'Sending...' : 'Send reset link'}</button>
      </form>
      <div className="mt-4 text-sm text-slate-400">
        Back to <Link to="/login" className="text-white">Login</Link>
      </div>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
