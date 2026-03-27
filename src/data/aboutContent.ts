/** About page — narrative and lists */

export const aboutTagline =
  'Empowering Global Trade with Sustainable Indian Agriculture.';

export const companyOverviewParagraphs = [
  'MSK Global Trade is a trusted exporter of premium-quality agricultural products from India. We specialize in delivering sustainable, organic, and export-grade products to global markets with a strong commitment to quality, reliability, and international standards.',
  'We connect farmers to global buyers while ensuring transparency, efficiency, and long-term value in every transaction.',
];

export const aboutVision =
  'To become a trusted global supplier of high-quality Indian agricultural products, recognized for excellence, reliability, and sustainable practices.';

export const aboutMissionBullets = [
  'Promote organic and eco-friendly agricultural products',
  'Deliver consistent quality with full transparency',
  'Build long-term international partnerships and trust',
];

export const coreValues = [
  { title: 'Quality First', desc: 'Strict adherence to global quality standards' },
  { title: 'Sustainability', desc: 'Focus on eco-friendly and organic farming' },
  { title: 'Integrity', desc: 'Transparent and ethical business practices' },
  { title: 'Reliability', desc: 'Timely delivery and dependable supply' },
  { title: 'Partnership', desc: 'Building long-term relationships with global clients' },
];

export const whatWeDoIntro =
  'We export a wide range of agricultural products including:';

export const whatWeDoProducts = [
  'Vermicompost (100% organic soil enhancer)',
  'Soya Bean (high-protein export-quality product)',
  'Indian Spices (premium quality with strong aroma)',
  'Jaggery Powder (natural and chemical-free sweetener)',
];

export const whyGlobalBullets = [
  'Rising demand for organic farming solutions worldwide',
  'Increasing shift toward chemical-free food consumption',
  'Strong global demand for Indian spices and grains',
  'Sustainable agriculture helps reduce environmental impact',
];

export const competitiveAdvantages = [
  'Direct sourcing from farmers',
  'Competitive and transparent pricing',
  'Timely and reliable delivery',
  'Focus on long-term buyer relationships',
];

export const qualityPackagingBullets = [
  'Strict quality control processes',
  'Hygienic processing standards',
  'Export-grade packaging',
  'Custom labeling and bulk supply solutions',
];

export const ourImpactBullets = [
  'Supporting rural farmers and livelihoods',
  'Promoting organic farming practices',
  'Reducing soil degradation',
  'Encouraging eco-friendly agriculture',
];

export const futureGoals = [
  'Expand into new international markets',
  'Increase product portfolio',
  'Build a strong global brand presence',
];

export type LeadershipVariant = 'director' | 'technical' | 'operations';

export const leadershipTeam: {
  name: string;
  role: string;
  variant: LeadershipVariant;
}[] = [
  { name: 'Kundan Patel', role: 'Managing Director', variant: 'director' },
  { name: 'Subham Patel', role: 'Technical Head', variant: 'technical' },
  { name: 'Mohit Choudhary', role: 'Operations Manager', variant: 'operations' },
];

export const aboutStats = [
  { label: 'Countries Served', value: '50+' },
  { label: 'Product Categories', value: '6+' },
  { label: 'Bulk Supply Capacity', value: '1000+ Tons/Year' },
  { label: 'Years of Experience', value: '10+' },
] as const;
