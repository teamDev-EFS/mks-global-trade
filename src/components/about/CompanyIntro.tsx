import React from 'react';
import { motion } from 'framer-motion';
import { companyIntroBlocks, companyStats } from '../../data/aboutContent';

const CompanyIntro: React.FC = () => (
  <section className="py-20 md:py-28 px-4 sm:px-6 bg-[#FAF7F2]" aria-labelledby="intro-heading">
    <div className="max-w-[min(100%,1200px)] mx-auto">
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <span className="inline-block text-sm font-semibold uppercase tracking-widest text-emerald-700 mb-3">
          Who We Are
        </span>
        <h2 id="intro-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F3D2E] mb-4 leading-tight">
          Connecting Indian Farms to{' '}
          <span className="bg-gradient-to-r from-emerald-700 to-green-500 bg-clip-text text-transparent">
            Global Markets
          </span>
        </h2>
        <div className="w-16 h-1 bg-gradient-to-r from-emerald-600 to-emerald-400 mx-auto rounded-full" />
      </motion.div>

      {/* Content blocks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
        {companyIntroBlocks.map((block, i) => (
          <motion.div
            key={block.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="group relative bg-white rounded-2xl p-8 border border-stone-200/60 shadow-[0_2px_24px_-8px_rgba(15,61,46,0.08)] hover:shadow-[0_8px_40px_-12px_rgba(15,61,46,0.15)] hover:border-emerald-200/60 transition-all duration-500"
          >
            {/* Top accent */}
            <div className="absolute top-0 left-8 right-8 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700 font-bold text-lg">
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3 className="text-xl font-bold text-[#0F3D2E]">{block.title}</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">{block.text}</p>
          </motion.div>
        ))}
      </div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7 }}
        className="bg-gradient-to-r from-[#0F3D2E] via-[#145a3d] to-[#0F3D2E] rounded-2xl p-8 md:p-10"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {companyStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-emerald-300 mb-2">
                {stat.value}
              </div>
              <div className="text-emerald-100/70 text-sm font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

export default CompanyIntro;
