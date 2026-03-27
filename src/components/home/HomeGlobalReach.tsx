import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

const regions = [
  { label: 'India', sub: 'Sourcing & Origin', accent: 'bg-emerald-500' },
  { label: 'UAE & GCC', sub: 'Primary Corridors', accent: 'bg-amber-500' },
  { label: 'Middle East', sub: 'Distribution Hub', accent: 'bg-emerald-400' },
  { label: 'Europe', sub: 'Bulk Programmes', accent: 'bg-teal-500' },
  { label: 'Africa', sub: 'Growing Lanes', accent: 'bg-green-500' },
  { label: 'Asia-Pacific', sub: 'Select Markets', accent: 'bg-emerald-600' },
];

const HomeGlobalReach: React.FC = () => {
  return (
    <section
      className="relative overflow-hidden py-16 sm:py-20 md:py-24"
      aria-labelledby="global-reach-heading"
    >
      <div className="mx-auto max-w-[min(100%,1280px)] px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-emerald-700 mb-3">
              Global Reach
            </span>
            <h2 id="global-reach-heading" className="text-3xl font-bold tracking-tight text-[#0F3D2E] sm:text-4xl md:text-[2.75rem] leading-tight">
              Supply Corridors Across{' '}
              <span className="bg-gradient-to-r from-emerald-700 to-green-500 bg-clip-text text-transparent">
                Continents
              </span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-stone-500 sm:text-lg">
              MSK Global Trade coordinates export programmes from Indian origins into UAE and GCC hubs,
              with onward placement for international buyers who require traceability, volume, and
              repeatable quality.
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full mt-6" />

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {regions.map((r, i) => (
                <motion.div
                  key={r.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="group flex items-start gap-2.5 rounded-xl border border-stone-200/60 bg-white px-3.5 py-3 shadow-sm hover:border-emerald-200/60 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${r.accent} shrink-0`} />
                    <div>
                      <div className="text-sm font-bold text-[#0F3D2E]">{r.label}</div>
                      <div className="text-xs text-stone-400">{r.sub}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-md rounded-2xl border border-stone-200/60 bg-gradient-to-br from-white to-[#FAF7F2] p-8 shadow-[0_8px_40px_-16px_rgba(15,61,46,0.12)]">
              <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-emerald-700 mb-6">
                Export Flow
              </p>

              {/* Flow diagram */}
              <div className="flex items-center justify-between gap-2">
                {[
                  { label: 'India', sub: 'Origin', color: 'from-[#0F3D2E] to-[#1E7F5C]' },
                  { label: 'UAE / Hub', sub: 'Gateway', color: 'from-emerald-500 to-green-600' },
                  { label: 'Global', sub: 'Markets', color: 'from-amber-500 to-amber-600' },
                ].map((node, i) => (
                  <React.Fragment key={node.label}>
                    <div className="flex flex-col items-center text-center flex-1">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${node.color} flex items-center justify-center shadow-lg mb-3`}>
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-sm font-bold text-[#0F3D2E]">{node.label}</span>
                      <span className="text-xs text-stone-400">{node.sub}</span>
                    </div>
                    {i < 2 && (
                      <div className="flex-shrink-0 w-8">
                        <svg viewBox="0 0 32 12" className="w-full text-emerald-300">
                          <path d="M0 6h24m0 0l-5-4m5 4l-5 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Bottom label */}
              <div className="mt-8 pt-5 border-t border-stone-100">
                <p className="text-center text-sm text-stone-400">
                  Origin consolidation → Export documentation → International delivery
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HomeGlobalReach;
