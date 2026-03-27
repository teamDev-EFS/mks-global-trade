import React from 'react';
import { motion } from 'framer-motion';
import { Package, ShieldCheck, Truck, Globe2 } from 'lucide-react';

const services = [
  { icon: Package, title: 'Product Sourcing', desc: 'Bulk sourcing from verified farming partners across India with full traceability and crop-window planning.' },
  { icon: ShieldCheck, title: 'Quality Assurance', desc: 'Multi-stage inspection, lab testing, and certification at every stage — from raw material to final packaging.' },
  { icon: Truck, title: 'Packaging & Logistics', desc: 'Export-grade packaging, custom labeling, and coordinated logistics from dispatch to destination port.' },
  { icon: Globe2, title: 'Global Export Management', desc: 'End-to-end export operations including documentation, compliance, and international shipping coordination.' },
];

const ServicesOverview: React.FC = () => (
  <section id="core-services" className="scroll-mt-32 py-20 md:py-28 px-4 sm:px-6 bg-[#FAF7F2]">
    <div className="max-w-[min(100%,1280px)] mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6 }} className="text-center mb-14">
        <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-emerald-700 mb-3">What We Do</span>
        <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-[#0F3D2E] leading-tight">
          Our Core <span className="bg-gradient-to-r from-emerald-700 to-green-500 bg-clip-text text-transparent">Services</span>
        </h2>
        <p className="text-stone-500 max-w-2xl mx-auto mt-3">Comprehensive export infrastructure designed for reliability, compliance, and scale.</p>
        <div className="w-16 h-1 bg-gradient-to-r from-emerald-600 to-emerald-400 mx-auto rounded-full mt-5" />
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map(({ icon: Icon, title, desc }, i) => (
          <motion.div key={title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5, delay: i * 0.1 }} className="group relative bg-white rounded-2xl border border-stone-200/60 p-7 shadow-[0_2px_20px_-6px_rgba(15,61,46,0.06)] hover:shadow-[0_12px_48px_-12px_rgba(15,61,46,0.15)] hover:border-emerald-200/60 hover:-translate-y-1 transition-all duration-500 text-center">
            <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r from-emerald-500 to-green-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            <motion.div whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }} className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0F3D2E] to-[#1E7F5C] flex items-center justify-center mx-auto mb-5 shadow-lg shadow-emerald-900/15">
              <Icon className="w-7 h-7 text-white" />
            </motion.div>
            <h3 className="text-lg font-bold text-[#0F3D2E] mb-2">{title}</h3>
            <p className="text-stone-500 text-sm leading-relaxed">{desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesOverview;
