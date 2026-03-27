import React from 'react';
import { motion } from 'framer-motion';
import {
  Globe,
  Package,
  Award,
  Cpu,
} from 'lucide-react';
import { futureGoals } from '../../data/aboutContent';

const iconMap: Record<string, React.ElementType> = {
  Globe,
  Package,
  Award,
  Cpu,
};

const FutureVision: React.FC = () => (
  <section className="py-20 md:py-28 px-4 sm:px-6 bg-white" aria-labelledby="future-heading">
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
          Looking Ahead
        </span>
        <h2 id="future-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F3D2E] mb-4 leading-tight">
          Future Goals &{' '}
          <span className="bg-gradient-to-r from-emerald-700 to-green-500 bg-clip-text text-transparent">
            Growth Vision
          </span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Our ambitious roadmap for expanding MSK Global Trade's impact across the world.
        </p>
        <div className="w-16 h-1 bg-gradient-to-r from-emerald-600 to-emerald-400 mx-auto rounded-full mt-4" />
      </motion.div>

      {/* Timeline / Roadmap */}
      <div className="relative">
        {/* Vertical timeline line */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-200 via-emerald-400 to-emerald-200" />

        <div className="space-y-8 md:space-y-0">
          {futureGoals.map((goal, i) => {
            const Icon = iconMap[goal.icon] || Globe;
            const isLeft = i % 2 === 0;

            return (
              <motion.div
                key={goal.title}
                initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className={`relative md:flex md:items-center md:mb-12 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Content card */}
                <div className={`md:w-[calc(50%-2rem)] ${isLeft ? 'md:pr-0' : 'md:pl-0'}`}>
                  <div className="group bg-gradient-to-br from-white to-emerald-50/30 rounded-2xl p-7 border border-stone-200/60 shadow-[0_2px_24px_-8px_rgba(15,61,46,0.08)] hover:shadow-[0_8px_40px_-12px_rgba(15,61,46,0.15)] hover:border-emerald-200/60 transition-all duration-500">
                    <div className="flex items-start gap-4">
                      <motion.div
                        whileHover={{ scale: 1.08 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                        className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-700 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/15"
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </motion.div>
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold text-[#0F3D2E]">{goal.title}</h3>
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-100 text-xs font-semibold text-emerald-700">
                            {goal.year}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed">{goal.description}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timeline dot (desktop) */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-emerald-500 border-4 border-white shadow-md z-10" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);

export default FutureVision;
