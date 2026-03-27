import React from 'react';
import { motion } from 'framer-motion';
import { Package, Users, ShieldCheck, Truck, Globe2, Link2, MapPin } from 'lucide-react';

const regions = [
  {
    name: 'India Services',
    subtitle: 'Sourcing & Origin',
    flag: '\u{1F1EE}\u{1F1F3}',
    gradient: 'from-[#0F3D2E] to-[#1E7F5C]',
    items: [
      { icon: Package, text: 'Bulk product sourcing from verified farmers' },
      { icon: Users, text: 'Supplier network management & coordination' },
      { icon: ShieldCheck, text: 'Quality inspection & lab testing' },
      { icon: Truck, text: 'Export-grade packaging & dispatch' },
    ],
  },
  {
    name: 'UAE & Global Services',
    subtitle: 'Distribution & Partnerships',
    flag: '\u{1F1E6}\u{1F1EA}',
    gradient: 'from-emerald-600 to-teal-700',
    items: [
      { icon: Globe2, text: 'Import/export coordination & compliance' },
      { icon: Link2, text: 'Buyer connection & partnership support' },
      { icon: Truck, text: 'Supply chain facilitation & tracking' },
      { icon: MapPin, text: 'Local distribution & market entry assistance' },
    ],
  },
];

const RegionWiseServices: React.FC = () => (
  <section id="regions" className="scroll-mt-32 py-20 md:py-28 px-4 sm:px-6 bg-white">
    <div className="max-w-[min(100%,1200px)] mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6 }} className="text-center mb-14">
        <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-emerald-700 mb-3">Regional Capabilities</span>
        <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-[#0F3D2E] leading-tight">
          Region-Wise Export <span className="bg-gradient-to-r from-emerald-700 to-green-500 bg-clip-text text-transparent">Capabilities</span>
        </h2>
        <div className="w-16 h-1 bg-gradient-to-r from-emerald-600 to-emerald-400 mx-auto rounded-full mt-5" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {regions.map((region, ri) => (
          <motion.div key={region.name} initial={{ opacity: 0, x: ri === 0 ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, delay: ri * 0.15 }} className="group bg-gradient-to-br from-white to-stone-50/50 rounded-2xl border border-stone-200/60 shadow-[0_2px_24px_-8px_rgba(15,61,46,0.06)] hover:shadow-[0_8px_40px_-12px_rgba(15,61,46,0.12)] hover:border-emerald-200/60 overflow-hidden transition-all duration-500">
            <div className={`bg-gradient-to-r ${region.gradient} px-7 py-5`}>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{region.flag}</span>
                <div>
                  <h3 className="text-lg font-bold text-white">{region.name}</h3>
                  <p className="text-sm text-emerald-100/60">{region.subtitle}</p>
                </div>
              </div>
            </div>
            <ul className="p-7 space-y-4">
              {region.items.map(({ icon: Icon, text }, ii) => (
                <motion.li key={text} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.2 + ii * 0.08 }} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0 group-hover:bg-emerald-100 transition-colors">
                    <Icon className="w-[18px] h-[18px] text-emerald-700" />
                  </div>
                  <span className="text-sm text-stone-600">{text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default RegionWiseServices;
