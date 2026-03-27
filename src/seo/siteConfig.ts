/** Base site URL — set VITE_SITE_URL in production (no trailing slash). */
export function getSiteUrl(): string {
  const raw = import.meta.env.VITE_SITE_URL as string | undefined;
  if (raw && raw.trim()) {
    return raw.replace(/\/+$/, '');
  }
  if (typeof window !== 'undefined') {
    return `${window.location.protocol}//${window.location.host}`;
  }
  return 'https://msk-global-trade.example.com';
}

export const SITE_NAME = 'MSK Global Trade';

export const BRAND = {
  legalName: 'MSK Global Trade Pvt Ltd',
  name: SITE_NAME,
  description:
    'Trusted exporter of premium agricultural products from India — organic vermicompost, spices, jaggery, and bulk commodities for UAE, GCC, and global markets.',
  logoPath: '/og-image.jpg',
  phone: '+919232091060',
  email: 'mskglobal26@gmail.com',
  sameAs: [] as string[],
  areaServed: ['India', 'United Arab Emirates', 'Worldwide'] as const,
};

export function absoluteUrl(path: string): string {
  const base = getSiteUrl();
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${base}${p}`;
}
