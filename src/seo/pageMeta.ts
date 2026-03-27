import type { InsightPost } from '../data/insightsPosts';
import type { Product } from '../types';

export type PageSeoPayload = {
  title: string;
  description: string;
  keywords: string;
  path: string;
};

type StaticPageKey = 'home' | 'products' | 'services' | 'about' | 'contact' | 'insights';

const STATIC: Record<StaticPageKey, Omit<PageSeoPayload, 'path'> & { path: string }> = {
  home: {
    path: '/',
    title: 'MSK Global Trade | India to UAE & Global Agricultural Exports',
    description:
      'Premium agro exports from India: organic vermicompost, spices, jaggery, vegetables & bulk supply. Trusted partner for UAE, GCC & worldwide buyers with quality & logistics.',
    keywords:
      'agricultural export India, UAE agro supplier, vermicompost exporter India, organic spices export, bulk jaggery supplier, MSK Global Trade, India to global export',
  },
  products: {
    path: '/products',
    title: 'Export Products | Vermicompost, Spices & Agro Commodities | MSK Global Trade',
    description:
      'Browse export-grade vermicompost, Indian spices, jaggery, fresh produce & minerals. Bulk supply from India to UAE, Middle East & global markets.',
    keywords:
      'vermicompost exporter India, bulk spices export, jaggery powder supplier UAE, organic agro products India, export catalogue MSK Global Trade',
  },
  services: {
    path: '/services',
    title: 'Export Services & Logistics | India → UAE → Global | MSK Global Trade',
    description:
      'Sourcing, quality assurance, packaging & global export management for agro products. India sourcing, UAE coordination, and worldwide delivery.',
    keywords:
      'export logistics India, bulk supply UAE, agricultural sourcing India, international trade services, MSK Global Trade export services',
  },
  about: {
    path: '/about',
    title: 'About MSK Global Trade | Organic Agriculture & Global Export Partner',
    description:
      'MSK Global Trade connects Indian farmers with global buyers. Vision, mission, leadership & commitment to sustainable agriculture and export excellence.',
    keywords:
      'MSK Global Trade about, India export company, organic agriculture exporter, sustainable agro trade, global supply partner',
  },
  contact: {
    path: '/contact',
    title: 'Contact | Bulk Export Enquiries | India & UAE | MSK Global Trade',
    description:
      'Contact MSK Global Trade for bulk export quotes, product specs & shipping to UAE, GCC & worldwide. WhatsApp & email enquiries welcome.',
    keywords:
      'contact agricultural exporter India, UAE import enquiry, bulk export quote MSK Global Trade, WhatsApp agro supplier',
  },
  insights: {
    path: '/insights',
    title: 'Insights | Organic Farming & Export from India | MSK Global Trade',
    description:
      'Articles on organic farming, India export process, global demand for Indian spices & agro commodities — from MSK Global Trade.',
    keywords:
      'organic farming India, export process India, Indian spices global demand, agricultural trade insights, MSK Global Trade blog',
  },
};

export function getStaticPageMeta(key: StaticPageKey): PageSeoPayload {
  const s = STATIC[key];
  return { title: s.title, description: s.description, keywords: s.keywords, path: s.path };
}

export function buildProductMeta(product: Product): PageSeoPayload {
  const slug = product.slug;
  const title = `Premium ${product.name} Exporter from India | MSK Global Trade`;
  const body = `${product.shortDescription} ${product.category}. Export-quality supply from India to UAE, GCC & global markets. Enquire for bulk export.`;
  const description = body.length > 160 ? `${body.slice(0, 157).trim()}…` : body;
  const keywords = [
    `${product.name.toLowerCase()} exporter India`,
    `${product.name.toLowerCase()} supplier UAE`,
    bulkKeywordFor(product),
    `${product.category} export India`,
    'MSK Global Trade',
  ].join(', ');
  return {
    title,
    description,
    keywords,
    path: `/products/${slug}`,
  };
}

/** Descriptive alt text for product imagery (image SEO). */
export function productImageAlt(product: Product): string {
  return `Export quality ${product.name} from India — bulk supply for UAE, GCC & global markets | MSK Global Trade`;
}

export function buildInsightMeta(post: InsightPost): PageSeoPayload {
  return {
    title: `${post.title} | MSK Global Trade Insights`,
    description: post.description,
    keywords: post.keywords,
    path: `/insights/${post.slug}`,
  };
}

function bulkKeywordFor(product: Product): string {
  const n = product.name.toLowerCase();
  if (n.includes('vermicompost')) return 'vermicompost exporter from India bulk';
  if (n.includes('jaggery')) return 'bulk jaggery powder supplier UAE';
  if (n.includes('spice') || n.includes('chilli') || n.includes('coriander')) {
    return 'organic spices export India';
  }
  return 'bulk agricultural export India';
}
