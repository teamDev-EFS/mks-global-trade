import React from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Sprout,
  Mountain,
  Recycle,
} from 'lucide-react';
import { impactStats, impactAreas } from '../../data/aboutContent';

const iconMap: Record<string, React.ElementType> = {
  Users,
  Sprout,
  Mountain,
  Recycle,
};

const ImpactSustainability: React.FC = () => (
  <section className="py-20 md:py-28 px-4 sm:px-6 bg-[#FAF7F2]" aria-labelledby="impact-heading">
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
          Making a Difference
        </span>
        <h2 id="impact-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F3D2E] mb-4 leading-tight">
          Impact &{' '}
          <span className="bg-gradient-to-r from-emerald-700 to-green-500 bg-clip-text text-transparent">
            Sustainability
          </span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Our commitment goes beyond business — we're building a positive legacy for farmers, communities, and the environment.
        </p>
        <div className="w-16 h-1 bg-gradient-to-r from-emerald-600 to-emerald-400 mx-auto rounded-full mt-4" />
      </motion.div>

      {/* Impact stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
        {impactStats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-white rounded-2xl p-6 border border-stone-200/60 shadow-[0_2px_20px_-6px_rgba(15,61,46,0.06)] text-center"
          >
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-600 mb-2">{stat.value}</div>
            <div className="text-gray-600 text-sm font-medium">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Impact areas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {impactAreas.map((area, i) => {
          const Icon = iconMap[area.icon] || Sprout;

          return (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group bg-white rounded-2xl p-7 border border-stone-200/60 shadow-[0_2px_20px_-6px_rgba(15,61,46,0.06)] hover:shadow-[0_8px_40px_-12px_rgba(15,61,46,0.12)] hover:border-emerald-200/60 transition-all duration-500 flex gap-5"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center shrink-0 group-hover:from-emerald-500 group-hover:to-green-700 transition-all duration-500">
                <Icon className="w-7 h-7 text-emerald-700 group-hover:text-white transition-colors duration-500" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#0F3D2E] mb-2">{area.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{area.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default ImpactSustainability;
