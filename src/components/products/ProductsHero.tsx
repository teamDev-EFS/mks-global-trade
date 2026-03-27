import React from 'react';
import { motion } from 'framer-motion';
import { Package, ShieldCheck, Globe2 } from 'lucide-react';

const badges = [
  { icon: Package, label: 'Export-Grade Products' },
  { icon: ShieldCheck, label: 'Quality Certified' },
  { icon: Globe2, label: 'Bulk Supply Ready' },
];

const ProductsHero: React.FC = () => (
  <section className="relative overflow-hidden bg-gradient-to-br from-[#0a2e1f] via-[#0F3D2E] to-[#1a5c3f] py-20 md:py-24">
    <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/8 rounded-full blur-[100px]" />

    <div className="relative max-w-[min(100%,1280px)] mx-auto px-4 sm:px-6 text-center">
      <motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="mb-5" aria-label="Breadcrumb">
        <ol className="flex items-center justify-center gap-2 text-sm text-emerald-300/60">
          <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
          <li><span className="mx-1">/</span></li>
          <li className="text-white font-medium">Products</li>
        </ol>
      </motion.nav>

      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-[1.1] tracking-tight">
        Our <span className="bg-gradient-to-r from-emerald-300 via-green-200 to-emerald-400 bg-clip-text text-transparent">Products</span>
      </motion.h1>

      <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-lg text-emerald-100/60 max-w-2xl mx-auto mb-8">
        Explore our export-quality agricultural, food, spice, and natural products for bulk international supply.
      </motion.p>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="flex flex-wrap justify-center gap-3">
        {badges.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] border border-white/[0.08]">
            <Icon className="w-4 h-4 text-emerald-300" />
            <span className="text-sm font-medium text-white/75">{label}</span>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default ProductsHero;
