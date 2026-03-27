import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, CheckCheck, ExternalLink } from 'lucide-react';
import { toast } from 'react-toastify';
import { adminFetch } from '../../api/adminClient';
import { Card, PageHeader, LoadingState, EmptyState, PrimaryButton, SecondaryButton } from '../../components/admin/AdminUI';

type NotificationRow = {
  _id: string;
  type: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  enquiryId?: { _id: string; enquiryId: string; customerName?: string; country?: string };
};

type FilterType = 'all' | 'unread';

const AdminNotificationsPage: React.FC = () => {
  const [filter, setFilter] = useState<FilterType>('unread');
  const [items, setItems] = useState<NotificationRow[]>([]);
  const [loading, setLoading] = useState(true);

  const loadNotifications = useCallback(() => {
    setLoading(true);
    const query = filter === 'unread' ? '?filter=unread' : '';
    adminFetch<{ items: NotificationRow[] }>(`/api/admin/notifications${query}`)
      .then((r) => setItems(r.items))
      .catch((e) => toast.error(e instanceof Error ? e.message : 'Failed'))
      .finally(() => setLoading(false));
  }, [filter]);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  const markAsRead = useCallback(async (id: string) => {
    try {
      await adminFetch(`/api/admin/notifications/${id}/read`, { method: 'PATCH' });
      toast.success('Marked as read');
      loadNotifications();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Error');
    }
  }, [loadNotifications]);

  const markAllAsRead = useCallback(async () => {
    try {
      await adminFetch('/api/admin/notifications/read-all', { method: 'PATCH' });
      toast.success('All marked as read');
      loadNotifications();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Error');
    }
  }, [loadNotifications]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Notifications"
        subtitle="New enquiries and updates"
        actions={
          <div className="flex flex-wrap gap-2">
            {(['unread', 'all'] as const).map((f) => (
              <SecondaryButton
                key={f}
                onClick={() => setFilter(f)}
                className={filter === f ? 'bg-[#0F3D2E] text-white border-[#0F3D2E] hover:bg-[#0d3526]' : ''}
              >
                {f === 'unread' ? 'Unread' : 'All'}
              </SecondaryButton>
            ))}
            <PrimaryButton onClick={markAllAsRead} className="inline-flex items-center gap-1.5">
              <CheckCheck className="w-4 h-4" />
              Mark all read
            </PrimaryButton>
          </div>
        }
      />

      <Card padding={false}>
        {loading ? (
          <LoadingState />
        ) : items.length === 0 ? (
          <EmptyState message="No notifications" icon={<Bell className="w-8 h-8" />} />
        ) : (
          <div className="divide-y divide-stone-100">
            {items.map((notification) => {
              const enquiry = notification.enquiryId && typeof notification.enquiryId === 'object'
                ? notification.enquiryId
                : null;

              return (
                <div
                  key={notification._id}
                  className={`px-5 py-4 flex flex-col sm:flex-row sm:items-start gap-4 transition-colors ${
                    !notification.isRead ? 'bg-emerald-50/40' : ''
                  }`}
                >
                  {/* Indicator */}
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    {!notification.isRead && (
                      <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 shrink-0" />
                    )}
                    <div className="min-w-0">
                      <p className="font-semibold text-stone-900 text-sm">{notification.title}</p>
                      <p className="text-sm text-stone-500 mt-1">{notification.message}</p>
                      <p className="text-xs text-stone-400 mt-2">
                        {new Date(notification.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 shrink-0">
                    {enquiry?._id && (
                      <Link
                        to={`/admin/enquiries/${enquiry._id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0F3D2E] text-white text-xs font-medium hover:bg-[#0d3526] transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Open
                      </Link>
                    )}
                    {!notification.isRead && (
                      <SecondaryButton
                        onClick={() => markAsRead(notification._id)}
                        className="px-3 py-1.5 text-xs"
                      >
                        Mark read
                      </SecondaryButton>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
};

export default AdminNotificationsPage;
