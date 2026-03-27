import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { leadershipTeam } from '../../data/aboutContent';

function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

const variantGradients: Record<string, string> = {
  director: 'from-emerald-600 to-green-800',
  technical: 'from-teal-600 to-emerald-800',
  operations: 'from-green-600 to-emerald-900',
};

const variantAccents: Record<string, string> = {
  director: 'bg-amber-400',
  technical: 'bg-emerald-400',
  operations: 'bg-teal-400',
};

const LeadershipSection: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 bg-gradient-to-b from-[#FAF7F2] to-white" aria-labelledby="leadership-heading">
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
            Our Leaders
          </span>
          <h2 id="leadership-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F3D2E] mb-4 leading-tight">
            Leadership Driving Global Trade with{' '}
            <span className="bg-gradient-to-r from-emerald-700 to-green-500 bg-clip-text text-transparent">
              Trust & Quality
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Meet the experienced professionals steering MSK Global Trade toward a future of excellence and impact.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-emerald-600 to-emerald-400 mx-auto rounded-full mt-4" />
        </motion.div>

        {/* Director cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {leadershipTeam.map((member, i) => {
            const isExpanded = expandedIndex === i;
            const gradient = variantGradients[member.variant] || variantGradients.director;
            const accent = variantAccents[member.variant] || variantAccents.director;

            return (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="group relative bg-white rounded-2xl border border-stone-200/60 shadow-[0_4px_32px_-8px_rgba(15,61,46,0.08)] hover:shadow-[0_12px_48px_-12px_rgba(15,61,46,0.18)] overflow-hidden transition-all duration-500"
              >
                {/* Top gradient band */}
                <div className={`h-32 bg-gradient-to-br ${gradient} relative overflow-hidden`}>
                  {/* Subtle pattern */}
                  <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

                  {/* Decorative elements */}
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full border border-white/10" />
                  <div className="absolute top-4 left-4 w-3 h-3 rounded-full bg-white/20" />
                </div>

                {/* Avatar */}
                <div className="flex justify-center -mt-14 relative z-10">
                  <div className={`w-28 h-28 rounded-2xl bg-gradient-to-br ${gradient} border-4 border-white shadow-lg flex items-center justify-center`}>
                    <span className="text-3xl font-bold text-white/90">{initialsFromName(member.name)}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 pt-4 text-center">
                  <h3 className="text-xl font-bold text-[#0F3D2E] mb-1">{member.name}</h3>
                  <p className="text-emerald-700 font-medium text-sm mb-2">{member.role}</p>

                  {/* Focus badge */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 mb-4">
                    <div className={`w-1.5 h-1.5 rounded-full ${accent}`} />
                    <span className="text-xs font-medium text-emerald-700">{member.focusArea}</span>
                  </div>

                  {/* Expand trigger */}
                  <button
                    onClick={() => setExpandedIndex(isExpanded ? null : i)}
                    className="flex items-center justify-center gap-1.5 mx-auto text-sm text-emerald-600 hover:text-emerald-800 transition-colors"
                    aria-expanded={isExpanded}
                  >
                    <span>{isExpanded ? 'Less' : 'More'} details</span>
                    <motion.span animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
                      <ChevronDown className="w-4 h-4" />
                    </motion.span>
                  </button>

                  {/* Expanded bio */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="mt-4 pt-4 border-t border-stone-100 text-gray-600 text-sm leading-relaxed text-left">
                          {member.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Bottom accent */}
                <div className="h-1 bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LeadershipSection;
