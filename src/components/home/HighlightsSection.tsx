import React from 'react';
import { motion } from 'framer-motion';
import { highlights } from '../../data/highlights';
import { Globe, CheckCircle, Package, Clock } from 'lucide-react';

const iconMap = { Globe, CheckCircle, Package, Clock };

const HighlightsSection: React.FC = () => {
  return (
    <section className="relative py-16 sm:py-20 md:py-24" aria-labelledby="highlights-heading">
      <div className="mx-auto max-w-[min(100%,1280px)] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center sm:mb-14"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-emerald-700 mb-3">
            Capabilities
          </span>
          <h2 id="highlights-heading" className="text-3xl font-bold tracking-tight text-[#0F3D2E] sm:text-4xl md:text-[2.75rem]">
            Built for International Scale
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-stone-500 sm:text-lg">
            Enterprise-grade export infrastructure from sourcing through final mile coordination.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-emerald-600 to-emerald-400 mx-auto rounded-full mt-5" />
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-7">
          {highlights.map(({ id, title, description, icon }, i) => {
            const IconComponent = iconMap[icon as keyof typeof iconMap];
            return (
              <motion.article
                key={id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative flex flex-col rounded-2xl border border-stone-200/60 bg-gradient-to-b from-white to-stone-50/50 p-7 shadow-[0_2px_24px_-8px_rgba(15,61,46,0.08)] transition-all duration-500 hover:-translate-y-1 hover:border-emerald-200/60 hover:shadow-[0_12px_48px_-12px_rgba(15,61,46,0.15)]"
              >
                {/* Top accent */}
                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r from-emerald-500 to-green-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0F3D2E] to-[#1E7F5C] text-white shadow-lg shadow-emerald-900/15"
                >
                  <IconComponent className="h-7 w-7" strokeWidth={1.75} aria-hidden />
                </motion.div>
                <h3 className="text-lg font-bold leading-snug text-[#0F3D2E] sm:text-xl">{title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-stone-500">{description}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HighlightsSection;
