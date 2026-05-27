import React from 'react';
import AppLayout from '../components/layout/AppLayout';
import PageHeader from '../components/ui/PageHeader';
import { useTheme } from '../context/ThemeContext';

const SettingsPage = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <AppLayout>
      <PageHeader title="Settings" subtitle="Configure app preferences, theming, and notification behavior." />
      <div className="surface rounded-3xl p-6">
        <div className="flex items-center justify-between rounded-2xl bg-white/5 p-4">
          <div>
            <div className="font-semibold text-white">Theme</div>
            <div className="text-sm text-slate-400">Currently set to {theme}</div>
          </div>
          <button className="btn-secondary" onClick={toggleTheme} type="button">Toggle theme</button>
        </div>
      </div>
    </AppLayout>
  );
};

export default SettingsPage;
