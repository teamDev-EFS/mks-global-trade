import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';

export default function RequireAdmin() {
  const { token, loading } = useAdminAuth();
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f4f6f4] text-gray-600">
        Loading…
      </div>
    );
  }
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  return <Outlet />;
}
