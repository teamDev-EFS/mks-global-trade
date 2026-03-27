import React, { useCallback, useEffect, useState } from 'react';
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
  ChevronRight,
} from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { adminFetch } from '../../api/adminClient';

const NAV_ITEMS = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/notifications', label: 'Notifications', icon: Bell },
  { to: '/admin/enquiries', label: 'Enquiries', icon: Inbox },
  { to: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
] as const;

const AdminLayout: React.FC = () => {
  const { admin, logout } = useAdminAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchUnreadCount = useCallback(() => {
    adminFetch<{ count: number }>('/api/admin/notifications/unread-count')
      .then((r) => setUnreadCount(r.count))
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetchUnreadCount();
    const interval = window.setInterval(fetchUnreadCount, 45_000);
    return () => window.clearInterval(interval);
  }, [fetchUnreadCount]);

  const handleLogout = useCallback(() => {
    logout();
    navigate('/admin/login');
  }, [logout, navigate]);

  const closeSidebar = useCallback(() => setSidebarOpen(false), []);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex">
      {/* ── Sidebar ── */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[260px] bg-[#0a2e1f] text-white flex flex-col transform transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] lg:translate-x-0 lg:static ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-white/[0.06]">
          <div>
            <h1 className="text-base font-bold tracking-tight text-white">MSK Admin</h1>
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-emerald-400/50 mt-0.5">
              Console
            </p>
          </div>
          <button
            type="button"
            className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
            onClick={closeSidebar}
            aria-label="Close sidebar"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={closeSidebar}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-emerald-500/15 text-emerald-300'
                    : 'text-emerald-100/60 hover:bg-white/[0.06] hover:text-white'
                }`
              }
            >
              <Icon className="w-[18px] h-[18px] shrink-0" />
              <span className="flex-1">{label}</span>
              {label === 'Notifications' && unreadCount > 0 && (
                <span className="min-w-[20px] h-5 px-1.5 rounded-md bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {unreadCount > 99 ? '99+' : unreadCount}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* User + Logout */}
        <div className="p-3 border-t border-white/[0.06]">
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-300 flex items-center justify-center text-xs font-bold">
              {(admin?.name || 'A').charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-medium text-white truncate">{admin?.name}</p>
              <p className="text-[11px] text-emerald-200/40 truncate">{admin?.email}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium text-emerald-100/50 hover:bg-white/[0.06] hover:text-white transition-colors"
          >
            <LogOut className="w-[18px] h-[18px]" />
            Sign out
          </button>
        </div>
      </aside>

      {/* Mobile backdrop */}
      {sidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
          aria-label="Close sidebar overlay"
          onClick={closeSidebar}
        />
      )}

      {/* ── Main area ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-stone-200/60 px-4 sm:px-6 h-[60px] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <button
              type="button"
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-stone-100 transition-colors"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5 text-stone-600" />
            </button>
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-stone-400">
              <span>Admin</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-stone-600 font-medium">Console</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-stone-500 border border-stone-200 hover:bg-stone-50 transition-colors"
              title="View public website"
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">View site</span>
            </Link>
            <NavLink
              to="/admin/notifications"
              className="relative w-9 h-9 flex items-center justify-center rounded-lg hover:bg-stone-100 text-stone-500 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-[18px] h-[18px]" />
              {unreadCount > 0 && (
                <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-emerald-500" />
              )}
            </NavLink>
            <div className="w-8 h-8 rounded-lg bg-[#0F3D2E] text-white flex items-center justify-center text-xs font-bold">
              {(admin?.name || 'A').charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          <Outlet context={{ refreshUnread: fetchUnreadCount }} />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
