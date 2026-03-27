import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { adminFetch } from '../../api/adminClient';
import { toast } from 'react-toastify';

type Row = {
  _id: string;
  type: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  enquiryId?: { _id: string; enquiryId: string; customerName?: string; country?: string };
};

export default function AdminNotificationsPage() {
  const [filter, setFilter] = useState<'all' | 'unread'>('unread');
  const [items, setItems] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    const q = filter === 'unread' ? '?filter=unread' : '';
    adminFetch<{ items: Row[] }>(`/api/admin/notifications${q}`)
      .then((r) => setItems(r.items))
      .catch((e) => toast.error(e instanceof Error ? e.message : 'Failed'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, [filter]);

  const markRead = async (id: string) => {
    try {
      await adminFetch(`/api/admin/notifications/${id}/read`, { method: 'PATCH' });
      toast.success('Marked read');
      load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Error');
    }
  };

  const markAll = async () => {
    try {
      await adminFetch('/api/admin/notifications/read-all', { method: 'PATCH' });
      toast.success('All marked read');
      load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
          <p className="text-gray-500 text-sm">New enquiries and updates</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setFilter('unread')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === 'unread' ? 'bg-emerald-800 text-white' : 'bg-white border border-gray-200'}`}
          >
            Unread
          </button>
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === 'all' ? 'bg-emerald-800 text-white' : 'bg-white border border-gray-200'}`}
          >
            All
          </button>
          <button
            type="button"
            onClick={markAll}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-orange-500 text-white hover:bg-orange-600"
          >
            Mark all read
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm divide-y divide-gray-100">
        {loading ? (
          <p className="p-8 text-gray-500">Loading…</p>
        ) : items.length === 0 ? (
          <p className="p-8 text-gray-500">No notifications</p>
        ) : (
          items.map((n) => {
            const enq = n.enquiryId && typeof n.enquiryId === 'object' ? n.enquiryId : null;
            const href = enq?._id ? `/admin/enquiries/${enq._id}` : '#';
            return (
              <div
                key={n._id}
                className={`p-4 flex flex-col sm:flex-row sm:items-start gap-4 ${!n.isRead ? 'bg-orange-50/50' : ''}`}
              >
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900">{n.title}</p>
                  <p className="text-sm text-gray-600 mt-1">{n.message}</p>
                  <p className="text-xs text-gray-400 mt-2">{new Date(n.createdAt).toLocaleString()}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  {enq?._id ? (
                    <Link
                      to={href}
                      className="px-3 py-1.5 rounded-lg bg-emerald-800 text-white text-sm font-medium"
                    >
                      Open enquiry
                    </Link>
                  ) : null}
                  {!n.isRead ? (
                    <button type="button" onClick={() => markRead(n._id)} className="px-3 py-1.5 rounded-lg border border-gray-300 text-sm">
                      Mark read
                    </button>
                  ) : null}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
