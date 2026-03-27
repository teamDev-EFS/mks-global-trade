import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Leaf, Globe2 } from 'lucide-react';

const trustBadges = [
  { icon: ShieldCheck, label: 'Export Quality' },
  { icon: Leaf, label: 'Sustainable Sourcing' },
  { icon: Globe2, label: 'Global Supply Reliability' },
];

const AboutHero: React.FC = () => (
  <section className="relative overflow-hidden bg-gradient-to-br from-[#0a2e1f] via-[#0F3D2E] to-[#1a5c3f] py-24 md:py-32 lg:py-40">
    {/* Subtle texture overlay */}
    <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />

    {/* Radial glow */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[120px]" />

    {/* Decorative circles */}
    <div className="absolute top-16 right-16 w-72 h-72 border border-emerald-400/10 rounded-full" />
    <div className="absolute bottom-16 left-16 w-48 h-48 border border-emerald-400/8 rounded-full" />

    <div className="relative max-w-[min(100%,1280px)] mx-auto px-4 sm:px-6 text-center">
      {/* Breadcrumb */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
        aria-label="Breadcrumb"
      >
        <ol className="flex items-center justify-center gap-2 text-sm text-emerald-300/70">
          <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
          <li><span className="mx-1">/</span></li>
          <li className="text-white font-medium">About Us</li>
        </ol>
      </motion.nav>

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/20 text-emerald-200 text-sm font-medium mb-6"
      >
        <Leaf className="w-4 h-4" />
        Trusted Agricultural Export Partner
      </motion.div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight"
      >
        About{' '}
        <span className="bg-gradient-to-r from-emerald-300 via-green-200 to-emerald-400 bg-clip-text text-transparent">
          MSK Global Trade
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="text-lg sm:text-xl text-emerald-100/80 max-w-2xl mx-auto mb-10 leading-relaxed"
      >
        Bridging India's agricultural excellence with global markets through quality,
        sustainability, and trusted partnerships built to endure.
      </motion.p>

      {/* Decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="w-24 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent mx-auto mb-10"
      />

      {/* Trust Badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="flex flex-wrap justify-center gap-4 sm:gap-6"
      >
        {trustBadges.map((badge) => (
          <div
            key={badge.label}
            className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-white/[0.06] border border-white/[0.08] backdrop-blur-sm"
          >
            <badge.icon className="w-5 h-5 text-emerald-300" />
            <span className="text-sm font-medium text-white/90">{badge.label}</span>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default AboutHero;
