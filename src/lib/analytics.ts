import { getSiteUrl } from '../seo/siteConfig';

type GtagArgs = [string, string, Record<string, unknown>?];

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: GtagArgs) => void;
  }
}

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;

export function initGoogleAnalytics(): void {
  if (!GA_ID || typeof document === 'undefined') return;
  if (document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${GA_ID}"]`)) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: GtagArgs) {
    window.dataLayer!.push(args);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_ID, {
    send_page_view: false,
    page_path: window.location.pathname + window.location.search,
  });

  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`;
  document.head.appendChild(s);
}

/** GA4 custom event + dataLayer for GTM / Search Console–aligned tracking */
export function trackEvent(
  name: 'whatsapp_click' | 'product_enquiry' | 'contact_form_submit' | 'page_view',
  params?: Record<string, string | number | boolean | undefined>
): void {
  const payload = {
    ...params,
    page_path: typeof window !== 'undefined' ? window.location.pathname : '',
    site_url: getSiteUrl(),
  };
  if (typeof window !== 'undefined' && window.gtag && GA_ID) {
    window.gtag('event', name, payload);
  }
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: name, ...payload });
  }
}

export function trackWhatsAppClick(context: string, extra?: Record<string, string>): void {
  trackEvent('whatsapp_click', { context, ...extra });
}

export function trackProductEnquiry(productSlug: string, source: string): void {
  trackEvent('product_enquiry', { product_slug: productSlug, source });
}

export function trackContactFormSubmit(): void {
  trackEvent('contact_form_submit', {});
}

/** Call on SPA navigation after gtag is loaded (see RouteTracker). */
export function trackPageView(path: string): void {
  if (path.startsWith('/admin')) return;
  if (typeof window === 'undefined' || !GA_ID) return;
  const pagePath = path.startsWith('/') ? path : `/${path}`;
  const pageLocation = `${getSiteUrl()}${pagePath}`;
  if (window.gtag) {
    window.gtag('config', GA_ID, { page_path: pagePath });
    window.gtag('event', 'page_view', { page_path: pagePath, page_location: pageLocation });
  }
}
