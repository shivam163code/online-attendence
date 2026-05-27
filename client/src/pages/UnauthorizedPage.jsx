import React from 'react';
import { Link } from 'react-router-dom';

const UnauthorizedPage = () => (
  <div className="flex min-h-screen items-center justify-center px-6">
    <div className="surface max-w-md rounded-3xl p-8 text-center">
      <h1 className="text-3xl font-bold text-white">Unauthorized</h1>
      <p className="mt-3 text-slate-400">You do not have access to this page.</p>
      <Link className="btn-primary mt-6" to="/dashboard">Back to dashboard</Link>
    </div>
  </div>
);

export default UnauthorizedPage;
