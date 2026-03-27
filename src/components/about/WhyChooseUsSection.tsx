import React from 'react';
import { motion } from 'framer-motion';
import {
  Tractor,
  TrendingDown,
  Truck,
  Heart,
  BadgeCheck,
  Boxes,
} from 'lucide-react';
import { whyChooseUs } from '../../data/aboutContent';

const iconMap: Record<string, React.ElementType> = {
  Tractor,
  TrendingDown,
  Truck,
  Heart,
  BadgeCheck,
  Boxes,
};

const WhyChooseUsSection: React.FC = () => (
  <section className="py-20 md:py-28 px-4 sm:px-6 bg-white" aria-labelledby="why-choose-heading">
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
          Competitive Edge
        </span>
        <h2 id="why-choose-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F3D2E] mb-4 leading-tight">
          Why Choose{' '}
          <span className="bg-gradient-to-r from-emerald-700 to-green-500 bg-clip-text text-transparent">
            MSK Global Trade
          </span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Our competitive advantages that set us apart in the global agricultural export landscape.
        </p>
        <div className="w-16 h-1 bg-gradient-to-r from-emerald-600 to-emerald-400 mx-auto rounded-full mt-4" />
      </motion.div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {whyChooseUs.map((item, i) => {
          const Icon = iconMap[item.icon] || BadgeCheck;

          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative bg-gradient-to-br from-white to-emerald-50/30 rounded-2xl p-7 border border-stone-200/60 shadow-[0_2px_20px_-6px_rgba(15,61,46,0.06)] hover:shadow-[0_8px_40px_-12px_rgba(15,61,46,0.14)] hover:border-emerald-200/60 hover:-translate-y-1 transition-all duration-500"
            >
              {/* Number badge */}
              <div className="absolute top-5 right-5 text-5xl font-extrabold text-emerald-50 group-hover:text-emerald-100/80 transition-colors duration-500 select-none leading-none">
                {String(i + 1).padStart(2, '0')}
              </div>

              <div className="relative z-10">
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-700 flex items-center justify-center mb-5 shadow-lg shadow-emerald-500/15"
                >
                  <Icon className="w-7 h-7 text-white" />
                </motion.div>

                <h3 className="text-lg font-bold text-[#0F3D2E] mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default WhyChooseUsSection;
