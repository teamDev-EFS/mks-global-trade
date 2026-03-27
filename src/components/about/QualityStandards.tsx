import React from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  FlaskConical,
  Factory,
  PackageCheck,
  Ship,
} from 'lucide-react';
import { qualityProcess } from '../../data/aboutContent';

const iconMap: Record<string, React.ElementType> = {
  Search,
  FlaskConical,
  Factory,
  PackageCheck,
  Ship,
};

const QualityStandards: React.FC = () => (
  <section className="py-20 md:py-28 px-4 sm:px-6 bg-gradient-to-b from-[#0F3D2E] via-[#0d3526] to-[#0a2e1f] relative overflow-hidden" aria-labelledby="quality-heading">
    {/* Subtle texture */}
    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M0 40L40 0H20L0 20M40 40V20L20 40\'/%3E%3C/g%3E%3C/svg%3E")' }} />

    <div className="relative max-w-[min(100%,1200px)] mx-auto">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <span className="inline-block text-sm font-semibold uppercase tracking-widest text-emerald-300 mb-3">
          Our Process
        </span>
        <h2 id="quality-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
          Quality, Packaging &{' '}
          <span className="bg-gradient-to-r from-emerald-300 to-green-200 bg-clip-text text-transparent">
            Global Standards
          </span>
        </h2>
        <p className="text-emerald-100/60 max-w-2xl mx-auto">
          From farm to port, every step in our process is designed for excellence.
        </p>
        <div className="w-16 h-1 bg-gradient-to-r from-emerald-400 to-emerald-300 mx-auto rounded-full mt-4" />
      </motion.div>

      {/* Process timeline */}
      <div className="relative">
        {/* Connecting line (desktop) */}
        <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4">
          {qualityProcess.map((step, i) => {
            const Icon = iconMap[step.icon] || PackageCheck;

            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative text-center"
              >
                {/* Step number */}
                <div className="text-6xl font-extrabold text-emerald-500/10 absolute top-0 left-1/2 -translate-x-1/2 select-none">
                  {String(step.step).padStart(2, '0')}
                </div>

                {/* Icon circle */}
                <motion.div
                  whileHover={{ scale: 1.08, y: -4 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="relative z-10 w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-emerald-400/20 to-emerald-600/20 border border-emerald-400/20 flex items-center justify-center mb-5 group-hover:border-emerald-400/40 group-hover:bg-emerald-400/25 transition-all duration-500"
                >
                  <Icon className="w-7 h-7 text-emerald-300 group-hover:text-emerald-200 transition-colors" />
                </motion.div>

                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-emerald-100/60 text-sm leading-relaxed">{step.description}</p>

                {/* Arrow (between steps on desktop) */}
                {i < qualityProcess.length - 1 && (
                  <div className="hidden lg:block absolute top-[60px] -right-3 text-emerald-500/30">
                    <svg width="20" height="12" viewBox="0 0 20 12" fill="none"><path d="M1 6h16m0 0L13 1m4 5l-4 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-wrap justify-center gap-4 mt-16"
      >
        {['FSSAI Compliant', 'ISO Standards', 'Phytosanitary Certified', 'Custom Labeling', 'Bulk Supply Ready'].map((badge) => (
          <div
            key={badge}
            className="px-5 py-2 rounded-full bg-emerald-500/10 border border-emerald-400/15 text-emerald-200 text-sm font-medium"
          >
            {badge}
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default QualityStandards;
