import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SplashPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate('/home'), 1500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="surface rounded-[2rem] px-10 py-12 text-center shadow-soft">
        <div className="mx-auto mb-5 h-16 w-16 rounded-3xl bg-gradient-to-br from-emerald-500 to-cyan-500" />
        <h1 className="text-3xl font-black text-white">Campus Flow</h1>
        <p className="mt-3 text-slate-400">Loading attendance management system...</p>
      </div>
    </div>
  );
};

export default SplashPage;
