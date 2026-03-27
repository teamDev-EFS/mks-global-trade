import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Globe2, ShieldCheck, Truck } from 'lucide-react';

const badges = [
  { icon: Globe2, label: 'Global Export' },
  { icon: ShieldCheck, label: 'Quality Assured' },
  { icon: Truck, label: 'Reliable Logistics' },
];

const ServicesHero: React.FC = () => (
  <section
    id="export-solutions"
    className="relative overflow-hidden bg-gradient-to-br from-[#0a2e1f] via-[#0F3D2E] to-[#1a5c3f] py-24 md:py-32"
  >
    {/* Texture */}
    <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-emerald-500/8 rounded-full blur-[120px]" />
    <div className="absolute top-16 right-16 w-64 h-64 border border-emerald-400/[0.06] rounded-full" />

    <div className="relative max-w-[min(100%,1280px)] mx-auto px-4 sm:px-6 text-center">
      <motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center justify-center gap-2 text-sm text-emerald-300/60">
          <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
          <li><span className="mx-1">/</span></li>
          <li className="text-white font-medium">Services</li>
        </ol>
      </motion.nav>

      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-5 leading-[1.1] tracking-tight">
        Our Export{' '}
        <span className="bg-gradient-to-r from-emerald-300 via-green-200 to-emerald-400 bg-clip-text text-transparent">Services</span>
      </motion.h1>

      <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-lg text-emerald-100/65 max-w-2xl mx-auto mb-8 leading-relaxed">
        End-to-end sourcing, quality control, and global export solutions for premium agricultural and natural products.
      </motion.p>

      <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="w-20 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent mx-auto mb-8" />

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }} className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
        <Link to="/contact" className="group inline-flex items-center justify-center px-8 py-3.5 rounded-xl font-semibold bg-white text-[#0F3D2E] shadow-lg hover:shadow-xl hover:bg-emerald-50 transition-all">
          Get a Quote <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-0.5" />
        </Link>
        <Link to="/products" className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl font-semibold border border-white/15 bg-white/[0.05] text-white backdrop-blur-sm hover:bg-white/10 transition-all">
          Browse Products
        </Link>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }} className="flex flex-wrap justify-center gap-4">
        {badges.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] border border-white/[0.08]">
            <Icon className="w-4 h-4 text-emerald-300" />
            <span className="text-sm font-medium text-white/80">{label}</span>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default ServicesHero;
