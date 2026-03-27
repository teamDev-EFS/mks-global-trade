import React from 'react';
import { motion } from 'framer-motion';
import { Globe2, Users, Clock, Tag, BadgeCheck, Headphones } from 'lucide-react';

const reasons = [
  { icon: Globe2, label: 'Global Export Experience', desc: 'Decade of expertise across 50+ international markets.' },
  { icon: Users, label: 'Reliable Supplier Network', desc: 'Direct partnerships with verified farming communities.' },
  { icon: Clock, label: 'Timely Delivery', desc: 'On-schedule dispatch with proactive communication.' },
  { icon: Tag, label: 'Competitive Pricing', desc: 'Farm-direct sourcing keeps your costs optimized.' },
  { icon: BadgeCheck, label: 'Quality Assurance', desc: 'Lab-tested, certified, export-grade — every shipment.' },
  { icon: Headphones, label: 'Dedicated Support', desc: 'Single point of contact for quotes, samples, and updates.' },
];

const WhyChooseUs: React.FC = () => (
  <section id="why-services" className="scroll-mt-32 py-20 md:py-28 px-4 sm:px-6 bg-[#FAF7F2]">
    <div className="max-w-[min(100%,1200px)] mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6 }} className="text-center mb-14">
        <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-emerald-700 mb-3">Our Advantage</span>
        <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-[#0F3D2E] leading-tight">
          Why Choose <span className="bg-gradient-to-r from-emerald-700 to-green-500 bg-clip-text text-transparent">MSK Global Trade?</span>
        </h2>
        <div className="w-16 h-1 bg-gradient-to-r from-emerald-600 to-emerald-400 mx-auto rounded-full mt-5" />
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reasons.map(({ icon: Icon, label, desc }, i) => (
          <motion.div key={label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5, delay: i * 0.07 }} className="group flex gap-4 bg-white rounded-2xl border border-stone-200/60 p-6 shadow-[0_2px_16px_-6px_rgba(15,61,46,0.06)] hover:shadow-[0_8px_40px_-12px_rgba(15,61,46,0.12)] hover:border-emerald-200/60 transition-all duration-500">
            <motion.div whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }} className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0 group-hover:bg-gradient-to-br group-hover:from-[#0F3D2E] group-hover:to-[#1E7F5C] transition-all duration-500">
              <Icon className="w-6 h-6 text-emerald-700 group-hover:text-white transition-colors duration-500" />
            </motion.div>
            <div>
              <h3 className="text-base font-bold text-[#0F3D2E] mb-1">{label}</h3>
              <p className="text-sm text-stone-500 leading-relaxed">{desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
