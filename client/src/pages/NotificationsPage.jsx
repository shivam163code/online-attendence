import React, { useEffect, useState } from 'react';
import AppLayout from '../components/layout/AppLayout';
import PageHeader from '../components/ui/PageHeader';
import api from '../services/api';
import Loader from '../components/ui/Loader';

const NotificationsPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get('/notifications');
        setItems(data.data || []);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <AppLayout>
      <PageHeader title="Notifications" subtitle="System announcements, attendance alerts, and reminders appear here." />
      {loading ? <Loader /> : <div className="space-y-3">{items.map((item) => <div key={item._id} className="surface rounded-3xl p-5"><div className="font-semibold text-white">{item.title}</div><div className="mt-1 text-sm text-slate-400">{item.message}</div></div>)}</div>}
    </AppLayout>
  );
};

export default NotificationsPage;
