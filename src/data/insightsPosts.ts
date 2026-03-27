export type InsightPost = {
  slug: string;
  title: string;
  description: string;
  keywords: string;
  datePublished: string;
  readingTime: string;
  paragraphs: string[];
};

export const insightPosts: InsightPost[] = [
  {
    slug: 'benefits-of-organic-farming',
    title: 'Why Organic Farming Matters for Export & Soil Health',
    description:
      'How organic practices improve soil, meet global buyer expectations, and support sustainable agriculture from India to UAE and beyond.',
    keywords:
      'organic farming India, sustainable agriculture export, soil health vermicompost, eco-friendly farming MSK Global Trade',
    datePublished: '2025-11-15',
    readingTime: '4 min read',
    paragraphs: [
      'Organic farming reduces chemical load, improves soil structure, and aligns with rising global demand for clean-label and traceable agro products.',
      'For exporters, organic certification and consistent quality help unlock premium markets in the UAE, GCC, Europe, and other regions.',
      'MSK Global Trade works with sourcing partners who prioritize sustainable practices and export-grade quality for bulk buyers.',
    ],
  },
  {
    slug: 'export-process-from-india',
    title: 'How Agricultural Export Works from India: A Practical Overview',
    description:
      'From sourcing and quality checks to packing and documentation — what buyers should know about India-to-global agro exports.',
    keywords:
      'export process India, agricultural logistics, bulk supply documentation, India to UAE trade MSK Global Trade',
    datePublished: '2025-12-01',
    readingTime: '5 min read',
    paragraphs: [
      'Successful export starts with clear product specs, MOQ, packing, and destination requirements — so sourcing and quality teams can align early.',
      'Quality inspection, hygienic processing, and export-grade packaging reduce risk at customs and protect product integrity in transit.',
      'MSK Global Trade supports export coordination, buyer communication, and reliable supply for bulk orders across categories.',
    ],
  },
  {
    slug: 'global-demand-indian-spices',
    title: 'Global Demand for Indian Spices: Trends for Buyers & Wholesalers',
    description:
      'Why Indian spices remain in demand worldwide and how bulk buyers evaluate aroma, purity, and supply consistency.',
    keywords:
      'Indian spices export, bulk coriander chilli supplier UAE, organic spices global demand, MSK Global Trade',
    datePublished: '2026-01-10',
    readingTime: '4 min read',
    paragraphs: [
      'Indian spices are sought for aroma, variety, and scale — with buyers in food manufacturing, retail, and wholesale prioritizing consistency and documentation.',
      'Regions such as the UAE and wider Middle East continue to import strong volumes of spices for processing and redistribution.',
      'MSK Global Trade supplies export-quality spices with hygiene-focused processing and flexible bulk options for international partners.',
    ],
  },
];

export function getInsightBySlug(slug: string | undefined): InsightPost | undefined {
  if (!slug) return undefined;
  return insightPosts.find((p) => p.slug === slug);
}
