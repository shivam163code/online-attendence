import React from 'react';
import AppLayout from '../components/layout/AppLayout';
import PageHeader from '../components/ui/PageHeader';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <AppLayout>
      <PageHeader title="Profile" subtitle="Review your identity, role, and account details." />
      <div className="surface rounded-3xl p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div><div className="text-sm text-slate-400">Name</div><div className="text-white">{user?.name}</div></div>
          <div><div className="text-sm text-slate-400">Email</div><div className="text-white">{user?.email}</div></div>
          <div><div className="text-sm text-slate-400">Role</div><div className="text-white capitalize">{user?.role}</div></div>
          <div><div className="text-sm text-slate-400">Status</div><div className="text-white">Active</div></div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ProfilePage;
