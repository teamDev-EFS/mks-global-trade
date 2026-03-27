/** Static content for About page — icons resolved in About.tsx */

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

export type AboutWhyIcon = 'globe' | 'package' | 'shield' | 'clock' | 'users';

export const aboutWhyChoose: { icon: AboutWhyIcon; title: string; desc: string }[] = [
  {
    icon: 'globe',
    title: 'Global Export Network',
    desc: 'Serving buyers across multiple continents with seamless export operations.',
  },
  {
    icon: 'package',
    title: 'Bulk Supply Capability',
    desc: 'Efficiently handling large-scale orders for international clients.',
  },
  {
    icon: 'shield',
    title: 'Quality Assurance',
    desc: 'Strict quality checks at every stage for consistent excellence.',
  },
  {
    icon: 'clock',
    title: 'Timely Delivery',
    desc: 'Reliable logistics and on-time shipments, every time.',
  },
  {
    icon: 'users',
    title: 'Trusted Supplier Network',
    desc: 'Strong relationships with vetted producers and suppliers.',
  },
];

export const aboutStats = [
  { label: 'Countries Served', value: '50+' },
  { label: 'Product Categories', value: '6+' },
  { label: 'Bulk Supply Capacity', value: '1000+ Tons/Year' },
  { label: 'Years of Experience', value: '10+' },
] as const;

export const aboutMissionVision = [
  {
    title: 'Our Mission',
    body: 'Deliver high-quality export products with consistency and trust.',
  },
  {
    title: 'Our Vision',
    body: 'Become a globally recognized export partner for agro and natural products.',
  },
] as const;
