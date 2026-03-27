import React, { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Bell,
  Inbox,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Globe,
} from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { adminFetch } from '../../api/adminClient';

const nav = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/notifications', label: 'Notifications', icon: Bell },
  { to: '/admin/enquiries', label: 'Enquiries', icon: Inbox },
  { to: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminLayout() {
  const { admin, logout } = useAdminAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(0);

  const loadUnread = () => {
    adminFetch<{ count: number }>('/api/admin/notifications/unread-count')
      .then((r) => setUnread(r.count))
      .catch(() => {});
  };

  useEffect(() => {
    loadUnread();
    const id = window.setInterval(loadUnread, 45000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen bg-[#f4f6f4] text-gray-900 flex">
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0f3d24] text-white transform transition-transform lg:translate-x-0 lg:static ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-4 py-5 border-b border-white/10">
          <span className="font-bold text-lg tracking-tight">MSK Admin</span>
          <button type="button" className="lg:hidden p-1" onClick={() => setOpen(false)} aria-label="Close menu">
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="p-3 space-y-1">
          {nav.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? 'bg-orange-500 text-white' : 'text-emerald-100 hover:bg-white/10'
                }`
              }
            >
              <Icon className="w-5 h-5 shrink-0" />
              {label}
            </NavLink>
          ))}
          <button
            type="button"
            onClick={() => {
              logout();
              navigate('/admin/login');
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-emerald-100 hover:bg-white/10"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </nav>
      </aside>

      {open && (
        <button
          type="button"
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          aria-label="Close overlay"
          onClick={() => setOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-gray-200 px-4 py-3 flex items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <button
              type="button"
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 shrink-0"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
            <div className="min-w-0">
              <p className="text-xs text-gray-500 uppercase tracking-wide">Console</p>
              <h1 className="text-lg font-semibold text-gray-900 truncate">MSK Global Trade</h1>
            </div>
          </div>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-emerald-900 border border-emerald-800/25 bg-white hover:bg-emerald-50 transition-colors shrink-0"
            aria-label="View public website as a visitor"
          >
            <Globe className="w-4 h-4 shrink-0" aria-hidden />
            <span className="hidden sm:inline">View website</span>
            <span className="sm:hidden">Site</span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <NavLink
              to="/admin/notifications"
              className="relative p-2 rounded-full hover:bg-gray-100 text-gray-700"
              aria-label="Notifications"
            >
              <Bell className="w-6 h-6" />
              {unread > 0 ? (
                <span className="absolute -top-0.5 -right-0.5 min-w-[1.25rem] h-5 px-1 rounded-full bg-orange-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {unread > 99 ? '99+' : unread}
                </span>
              ) : null}
            </NavLink>
            <div className="hidden sm:flex flex-col items-end text-right">
              <span className="text-sm font-medium text-gray-900">{admin?.name}</span>
              <span className="text-xs text-gray-500">{admin?.email}</span>
            </div>
            <div className="w-9 h-9 rounded-full bg-emerald-800 text-white flex items-center justify-center text-sm font-semibold">
              {(admin?.name || 'A').slice(0, 1)}
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          <Outlet context={{ refreshUnread: loadUnread }} />
        </main>
      </div>
    </div>
  );
}
