import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award,
  Scale,
  Leaf,
  Clock,
  Users,
  Globe,
} from 'lucide-react';
import { coreValues } from '../../data/aboutContent';

const iconMap: Record<string, React.ElementType> = {
  Award,
  Scale,
  Leaf,
  Clock,
  Users,
  Globe,
};

const CoreValuesSection: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 bg-white" aria-labelledby="values-heading">
      <div className="max-w-[min(100%,1200px)] mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-semibold uppercase tracking-widest text-emerald-700 mb-3">
            What We Stand For
          </span>
          <h2 id="values-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F3D2E] mb-4 leading-tight">
            Core Values That{' '}
            <span className="bg-gradient-to-r from-emerald-700 to-green-500 bg-clip-text text-transparent">
              Define Us
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Principles that guide every decision, every shipment, and every partnership we build.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-emerald-600 to-emerald-400 mx-auto rounded-full mt-4" />
        </motion.div>

        {/* Values grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreValues.map((value, i) => {
            const Icon = iconMap[value.icon] || Award;
            const isExpanded = expandedIndex === i;

            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                onMouseEnter={() => setExpandedIndex(i)}
                onMouseLeave={() => setExpandedIndex(null)}
                onClick={() => setExpandedIndex(isExpanded ? null : i)}
                className="group relative bg-gradient-to-br from-white to-stone-50/50 rounded-2xl p-7 border border-stone-200/60 shadow-[0_2px_20px_-6px_rgba(15,61,46,0.06)] hover:shadow-[0_12px_48px_-12px_rgba(15,61,46,0.15)] hover:border-emerald-200/60 transition-all duration-500 cursor-pointer"
              >
                {/* Top accent bar */}
                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r from-emerald-500 to-green-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                <div className="flex items-start gap-4">
                  <motion.div
                    whileHover={{ rotate: 5, scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center shrink-0 group-hover:from-emerald-500 group-hover:to-green-700 transition-all duration-500"
                  >
                    <Icon className="w-6 h-6 text-emerald-700 group-hover:text-white transition-colors duration-500" />
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-[#0F3D2E] mb-1.5 group-hover:text-emerald-800 transition-colors">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{value.desc}</p>

                    {/* Expanded detail */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-3 pt-3 border-t border-emerald-100">
                            <p className="text-emerald-800/70 text-sm leading-relaxed">{value.detail}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CoreValuesSection;
