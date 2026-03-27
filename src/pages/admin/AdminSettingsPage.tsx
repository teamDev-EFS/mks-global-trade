import React from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';

export default function AdminSettingsPage() {
  const { admin } = useAdminAuth();
  return (
    <div className="max-w-lg space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
        <p className="text-gray-500 text-sm">Account overview</p>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-3">
        <div>
          <p className="text-xs text-gray-500 uppercase">Name</p>
          <p className="font-medium text-gray-900">{admin?.name}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase">Email</p>
          <p className="font-medium text-gray-900">{admin?.email}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase">Role</p>
          <p className="font-medium text-gray-900 capitalize">{admin?.role}</p>
        </div>
      </div>
      <p className="text-sm text-gray-500">
        Password changes and advanced security options can be added in a future release.
      </p>
    </div>
  );
}
