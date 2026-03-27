import React from 'react';
import { motion } from 'framer-motion';
import { UserCheck, PackageSearch, ShieldCheck, Package, Truck } from 'lucide-react';

const steps = [
  { icon: UserCheck, label: 'Requirement Understanding', desc: 'We analyze your specifications, volumes, and destination requirements.' },
  { icon: PackageSearch, label: 'Product Sourcing', desc: 'Verified suppliers matched to your crop windows and quality standards.' },
  { icon: ShieldCheck, label: 'Quality Inspection', desc: 'Multi-stage testing for purity, moisture, and compliance.' },
  { icon: Package, label: 'Packaging', desc: 'Export-grade bags, custom labels, and batch traceability.' },
  { icon: Truck, label: 'Logistics & Export', desc: 'Documentation, dispatch, and coordination to destination.' },
];

const ProcessFlow: React.FC = () => (
  <section id="export-process" className="scroll-mt-32 py-20 md:py-28 px-4 sm:px-6 bg-gradient-to-b from-[#0F3D2E] via-[#0d3526] to-[#0a2e1f] relative overflow-hidden">
    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M0 40L40 0H20L0 20M40 40V20L20 40\'/%3E%3C/g%3E%3C/svg%3E")' }} />

    <div className="relative max-w-[min(100%,1280px)] mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6 }} className="text-center mb-14">
        <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-emerald-300 mb-3">Our Process</span>
        <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-white leading-tight">
          How Our Export Process <span className="bg-gradient-to-r from-emerald-300 to-green-200 bg-clip-text text-transparent">Works</span>
        </h2>
        <div className="w-16 h-1 bg-gradient-to-r from-emerald-400 to-emerald-300 mx-auto rounded-full mt-5" />
      </motion.div>

      <div className="relative">
        <div className="hidden lg:block absolute top-[52px] left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-emerald-500/25 to-transparent" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4">
          {steps.map(({ icon: Icon, label, desc }, i) => (
            <motion.div key={label} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5, delay: i * 0.1 }} className="relative text-center">
              <div className="text-5xl font-extrabold text-emerald-500/10 absolute top-0 left-1/2 -translate-x-1/2 select-none">{String(i + 1).padStart(2, '0')}</div>
              <motion.div whileHover={{ scale: 1.08, y: -4 }} transition={{ type: 'spring', stiffness: 300 }} className="relative z-10 w-16 h-16 mx-auto rounded-2xl bg-emerald-500/10 border border-emerald-400/15 flex items-center justify-center mb-4">
                <span className="absolute -right-1 -top-1 w-6 h-6 rounded-lg bg-emerald-500 text-white text-xs font-bold flex items-center justify-center shadow">{i + 1}</span>
                <Icon className="w-7 h-7 text-emerald-300" />
              </motion.div>
              <h3 className="text-base font-bold text-white mb-2">{label}</h3>
              <p className="text-emerald-100/50 text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default ProcessFlow;
