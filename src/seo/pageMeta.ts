import type { InsightPost } from '../data/insightsPosts';
import type { Product } from '../types';

export type PageSeoPayload = {
  title: string;
  description: string;
  keywords: string;
  path: string;
};

type StaticPageKey = 'home' | 'products' | 'services' | 'about' | 'contact' | 'insights';

const STATIC: Record<StaticPageKey, PageSeoPayload> = {
  home: {
    path: '/',
    title: 'MSK Global Trade | Premium Agricultural Exports from India to UAE & 50+ Countries',
    description:
      'MSK Global Trade exports premium organic vermicompost, Indian spices, jaggery, fresh vegetables and bulk agricultural products from India to UAE, GCC, and 50+ countries. Direct farm sourcing, export-grade quality control, competitive bulk pricing, and reliable international logistics.',
    keywords:
      'agricultural export India, vermicompost exporter India, Indian spices supplier UAE, bulk jaggery exporter, organic farming products India, MSK Global Trade, India to UAE export, GCC agricultural supplier, premium agro exports, bulk commodity supplier India',
  },
  products: {
    path: '/products',
    title: 'Export Products — Vermicompost, Spices, Jaggery & Agro Commodities | MSK Global Trade',
    description:
      'Browse MSK Global Trade export product catalogue: organic vermicompost fertilizer, premium Indian spices (coriander, red chilli), natural jaggery, fresh onions, beetroot, carrots, soya beans & fuller\'s earth. Bulk supply from India to UAE, Middle East & worldwide.',
    keywords:
      'vermicompost exporter India, bulk Indian spices export, jaggery powder supplier UAE, organic agro products, coriander seeds exporter, red chilli powder export India, fresh vegetables export, MSK Global Trade products, onion exporter India',
  },
  services: {
    path: '/services',
    title: 'Agricultural Export Services & Logistics — India to UAE & Global | MSK Global Trade',
    description:
      'MSK Global Trade provides end-to-end agricultural export services: product sourcing from Indian farms, quality assurance & lab testing, hygienic export-standard packaging, customs documentation, and international shipping to UAE, GCC, Europe, Africa & Asia-Pacific.',
    keywords:
      'agricultural export services India, bulk supply logistics UAE, product sourcing India, international trade services, export documentation India, MSK Global Trade services, quality assurance agro exports',
  },
  about: {
    path: '/about',
    title: 'About MSK Global Trade — Trusted Indian Agricultural Export Company Since 2016',
    description:
      'MSK Global Trade Pvt Ltd is a leading Indian agricultural export company based in Indore, Madhya Pradesh. We connect Indian farmers with international buyers across 50+ countries, exporting organic vermicompost, spices, jaggery and fresh produce with a focus on quality, sustainability and fair trade.',
    keywords:
      'MSK Global Trade about, Indian agricultural export company, Indore exporter, organic agriculture exporter India, sustainable farming exports, trusted global trade partner',
  },
  contact: {
    path: '/contact',
    title: 'Contact MSK Global Trade — Bulk Export Enquiries | India & UAE',
    description:
      'Contact MSK Global Trade for bulk agricultural export quotes, product specifications, and international shipping enquiries. Phone: +91 92320 91060. Email: mskglobal26@gmail.com. Based in Indore, India — serving UAE, GCC & worldwide buyers.',
    keywords:
      'contact MSK Global Trade, agricultural export enquiry India, bulk export quote, WhatsApp agro supplier India, import agricultural products India, MSK Global Trade phone email',
  },
  insights: {
    path: '/insights',
    title: 'Insights & Articles — Organic Farming, Indian Exports & Agricultural Trade | MSK Global Trade',
    description:
      'Expert articles on organic farming in India, agricultural export processes, global demand for Indian spices, vermicompost benefits, and international trade trends — by MSK Global Trade.',
    keywords:
      'organic farming India articles, agricultural export process India, Indian spices global demand, vermicompost benefits, export trade insights, MSK Global Trade blog',
  },
};

export function getStaticPageMeta(key: StaticPageKey): PageSeoPayload {
  return { ...STATIC[key] };
}

export function buildProductMeta(product: Product): PageSeoPayload {
  const slug = product.slug;
  const title = `${product.name} Exporter from India — Premium Export Quality | MSK Global Trade`;
  const markets = product.exportMarkets?.join(', ') || 'UAE, GCC & global markets';
  const description = `Buy export-grade ${product.name} from India. ${product.shortDescription} Available in bulk for ${markets}. ${product.packing}. Enquire now for competitive pricing and reliable supply from MSK Global Trade.`;
  const trimmedDesc = description.length > 300 ? `${description.slice(0, 297).trim()}…` : description;
  const keywords = [
    `${product.name.toLowerCase()} exporter India`,
    `${product.name.toLowerCase()} supplier UAE`,
    `buy ${product.name.toLowerCase()} bulk`,
    `${product.name.toLowerCase()} export price`,
    bulkKeywordFor(product),
    `${product.category.toLowerCase()} export India`,
    'MSK Global Trade',
  ].join(', ');
  return { title, description: trimmedDesc, keywords, path: `/products/${slug}` };
}

/** Descriptive alt text for product imagery (image SEO). */
export function productImageAlt(product: Product): string {
  return `Export-quality ${product.name} from India — bulk supply for UAE, GCC & international markets | MSK Global Trade`;
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
  if (n.includes('vermicompost')) return 'organic vermicompost exporter India bulk supply';
  if (n.includes('jaggery')) return 'natural jaggery powder supplier India UAE';
  if (n.includes('spice') || n.includes('chilli') || n.includes('coriander')) {
    return 'premium Indian spices export wholesale';
  }
  if (n.includes('onion')) return 'fresh onion exporter India wholesale';
  if (n.includes('soya') || n.includes('soy')) return 'soya bean exporter India bulk';
  return 'bulk agricultural commodity export India';
}
