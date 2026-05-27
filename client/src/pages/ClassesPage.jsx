import React from 'react';
import AppLayout from '../components/layout/AppLayout';
import PageHeader from '../components/ui/PageHeader';

const ClassesPage = () => {
  const classes = [
    { name: 'Grade 10 - A', teacher: 'Mr. Carter', subject: 'Mathematics' },
    { name: 'Grade 11 - B', teacher: 'Ms. Diaz', subject: 'Computer Science' }
  ];

  return (
    <AppLayout>
      <PageHeader title="Classes" subtitle="Manage class assignments, teachers, and subjects." />
      <div className="grid gap-4 md:grid-cols-2">
        {classes.map((item) => (
          <div key={item.name} className="surface rounded-3xl p-6">
            <div className="text-xl font-semibold text-white">{item.name}</div>
            <div className="mt-2 text-sm text-slate-400">Teacher: {item.teacher}</div>
            <div className="mt-1 text-sm text-slate-400">Subject: {item.subject}</div>
          </div>
        ))}
      </div>
    </AppLayout>
  );
};

export default ClassesPage;
