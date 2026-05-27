import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div className="flex min-h-screen items-center justify-center px-6">
    <div className="surface max-w-md rounded-3xl p-8 text-center">
      <h1 className="text-3xl font-bold text-white">Page not found</h1>
      <p className="mt-3 text-slate-400">The page you requested does not exist.</p>
      <Link className="btn-primary mt-6" to="/home">Go home</Link>
    </div>
  </div>
);

export default NotFoundPage;
