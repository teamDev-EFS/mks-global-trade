import React, { useState, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Eye,
  Rocket,
  Sprout,
  ShieldCheck,
  Handshake,
} from 'lucide-react';
import { missionVisionCards } from '../../data/aboutContent';

const iconMap: Record<string, React.ElementType> = {
  Eye,
  Rocket,
  Sprout,
  ShieldCheck,
  Handshake,
};

interface FlipCardProps {
  card: (typeof missionVisionCards)[number];
  index: number;
}

const FlipCard: React.FC<FlipCardProps> = ({ card, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const Icon = iconMap[card.icon] || Eye;

  const handleTap = useCallback(() => {
    setIsFlipped((v) => !v);
  }, []);

  const flipDeg = isFlipped ? 180 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="w-full"
      style={{ perspective: 1200 }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={handleTap}
    >
      {/* Inner rotating container */}
      <motion.div
        animate={{ rotateY: prefersReducedMotion ? 0 : flipDeg }}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        className="relative w-full h-[320px] sm:h-[340px] mx-auto cursor-pointer"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* ─── Front Face ─── */}
        <div
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white via-white to-emerald-50/50 border border-stone-200/60 shadow-[0_4px_32px_-8px_rgba(15,61,46,0.12)] flex flex-col items-center justify-center p-5 sm:p-6 text-center overflow-hidden"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          {/* Decorative ring */}
          <div className="absolute inset-3 rounded-xl border border-emerald-100/40 pointer-events-none" />

          <div className="relative z-10">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-700 flex items-center justify-center mb-4 sm:mb-5 mx-auto shadow-lg shadow-emerald-500/20">
              <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[#0F3D2E] mb-1">{card.title}</h3>
            <p className="text-xs sm:text-sm text-emerald-600/70 font-medium">{card.subtitle}</p>
          </div>

          {/* Hover / Tap hint */}
          <div className="absolute bottom-3 sm:bottom-4 text-[11px] text-stone-400 flex items-center gap-1">
            <span className="hidden sm:inline">Hover</span>
            <span className="sm:hidden">Tap</span>
            <span>to reveal</span>
          </div>
        </div>

        {/* ─── Back Face ─── */}
        <div
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#0F3D2E] via-[#145a3d] to-[#0F3D2E] border border-emerald-600/30 shadow-[0_4px_32px_-8px_rgba(15,61,46,0.25)] flex flex-col items-center justify-center p-5 sm:p-6 text-center overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {/* Decorative ring */}
          <div className="absolute inset-3 rounded-xl border border-emerald-400/15 pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-3 mx-auto">
              <Icon className="w-5 h-5 text-emerald-300" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">{card.title}</h3>
            <p className="text-emerald-100/80 text-xs sm:text-sm leading-relaxed">{card.description}</p>
          </div>
        </div>
      </motion.div>

      {/* Reduced-motion fallback */}
      {prefersReducedMotion && isFlipped && (
        <div className="mt-4 p-4 rounded-xl bg-[#0F3D2E] text-center">
          <p className="text-emerald-100/80 text-sm leading-relaxed">{card.description}</p>
        </div>
      )}
    </motion.div>
  );
};

const MissionVisionFlip: React.FC = () => (
  <section
    className="py-20 md:py-28 px-4 sm:px-6 bg-gradient-to-b from-[#FAF7F2] to-white"
    aria-labelledby="mission-vision-heading"
  >
    <div className="max-w-[min(100%,1280px)] mx-auto">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <span className="inline-block text-sm font-semibold uppercase tracking-widest text-emerald-700 mb-3">
          Our Foundation
        </span>
        <h2
          id="mission-vision-heading"
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F3D2E] mb-4 leading-tight"
        >
          Mission, Vision &{' '}
          <span className="bg-gradient-to-r from-emerald-700 to-green-500 bg-clip-text text-transparent">
            Purpose
          </span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Hover over each card to discover the principles that drive MSK Global Trade forward.
        </p>
        <div className="w-16 h-1 bg-gradient-to-r from-emerald-600 to-emerald-400 mx-auto rounded-full mt-4" />
      </motion.div>

      {/* Cards grid — 2 cols on mobile, 3 on tablet, 5 on desktop */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 md:gap-6">
        {missionVisionCards.map((card, i) => (
          <FlipCard key={card.id} card={card} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default MissionVisionFlip;
