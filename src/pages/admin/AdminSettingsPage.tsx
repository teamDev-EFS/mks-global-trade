import React from 'react';
import { User, Mail, Shield } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { Card, CardTitle, PageHeader } from '../../components/admin/AdminUI';

const AdminSettingsPage: React.FC = () => {
  const { admin } = useAdminAuth();

  const fields = [
    { icon: User, label: 'Name', value: admin?.name },
    { icon: Mail, label: 'Email', value: admin?.email },
    { icon: Shield, label: 'Role', value: admin?.role },
  ] as const;

  return (
    <div className="max-w-lg space-y-6">
      <PageHeader title="Settings" subtitle="Account overview" />

      <Card>
        <CardTitle>Profile</CardTitle>
        <div className="space-y-4">
          {fields.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-stone-50 flex items-center justify-center shrink-0">
                <Icon className="w-4.5 h-4.5 text-stone-400" />
              </div>
              <div>
                <p className="text-xs font-medium text-stone-400 uppercase tracking-wider">{label}</p>
                <p className="text-sm font-medium text-stone-800 capitalize">{value || '—'}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <p className="text-xs text-stone-400 leading-relaxed">
        Password changes and advanced security options can be added in a future release.
      </p>
    </div>
  );
};

export default AdminSettingsPage;
