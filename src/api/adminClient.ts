const apiBase = import.meta.env.VITE_API_URL ?? '';
const TOKEN_KEY = 'msk_admin_token';

export function getAdminToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setAdminToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearAdminToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export async function adminFetch<T>(path: string, opts: RequestInit = {}): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(opts.headers as Record<string, string>),
  };
  const t = getAdminToken();
  if (t) headers.Authorization = `Bearer ${t}`;
  const res = await fetch(`${apiBase}${path}`, { ...opts, headers });
  const data = await res.json().catch(() => ({}));
  if (res.status === 401) {
    clearAdminToken();
    window.location.href = '/admin/login';
    throw new Error('Session expired');
  }
  if (!res.ok) {
    throw new Error((data as { error?: string }).error || res.statusText);
  }
  return data as T;
}
