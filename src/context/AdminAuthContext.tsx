import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { adminFetch, clearAdminToken, getAdminToken, setAdminToken } from '../api/adminClient';

type AdminUser = { id: string; name: string; email: string; role: string };

type Ctx = {
  token: string | null;
  admin: AdminUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshMe: () => Promise<void>;
};

const AdminAuthContext = createContext<Ctx | null>(null);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => getAdminToken());
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshMe = useCallback(async () => {
    const t = getAdminToken();
    if (!t) {
      setAdmin(null);
      setLoading(false);
      return;
    }
    try {
      const data = await adminFetch<{ admin: AdminUser }>('/api/admin/auth/me');
      setAdmin(data.admin);
    } catch {
      setAdmin(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshMe();
  }, [refreshMe]);

  const login = useCallback(async (email: string, password: string) => {
    const apiBase = import.meta.env.VITE_API_URL ?? '';
    const res = await fetch(`${apiBase}/api/admin/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error((data as { error?: string }).error || 'Login failed');
    const tok = (data as { token: string }).token;
    setAdminToken(tok);
    setToken(tok);
    setAdmin((data as { admin: AdminUser }).admin);
  }, []);

  const logout = useCallback(() => {
    clearAdminToken();
    setToken(null);
    setAdmin(null);
  }, []);

  const value = useMemo(
    () => ({ token, admin, loading, login, logout, refreshMe }),
    [token, admin, loading, login, logout, refreshMe]
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth requires provider');
  return ctx;
}
