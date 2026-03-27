import React from 'react';
import { Briefcase, Cpu, Settings2 } from 'lucide-react';
import type { LeadershipVariant } from '../../data/aboutContent';

const styles: Record<
  LeadershipVariant,
  { gradient: string; ring: string; Icon: typeof Briefcase }
> = {
  director: {
    gradient: 'from-emerald-700 via-teal-600 to-emerald-900',
    ring: 'ring-emerald-400/40',
    Icon: Briefcase,
  },
  technical: {
    gradient: 'from-sky-600 via-indigo-600 to-violet-800',
    ring: 'ring-sky-400/40',
    Icon: Cpu,
  },
  operations: {
    gradient: 'from-amber-600 via-orange-600 to-amber-900',
    ring: 'ring-amber-400/40',
    Icon: Settings2,
  },
};

type Props = {
  variant: LeadershipVariant;
  /** Two letters for initials fallback inside the visual */
  initials: string;
};

/**
 * Decorative animated “avatar” — gradients + motion, no stock photos.
 */
const AnimatedTeamVisual: React.FC<Props> = ({ variant, initials }) => {
  const { gradient, ring, Icon } = styles[variant];

  return (
    <div
      className={`relative mx-auto mb-5 w-36 h-36 sm:w-40 sm:h-40 rounded-2xl shadow-xl ring-4 ${ring} overflow-hidden bg-gray-900`}
      aria-hidden
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-95`} />
      {/* Orbiting soft highlight */}
      <div
        className="absolute -inset-[40%] rounded-full bg-gradient-to-tr from-white/25 via-transparent to-white/10 animate-msk-orbit opacity-60"
        style={{ animationDuration: '22s' }}
      />
      <div className="absolute inset-0 flex items-center justify-center animate-msk-float">
        <Icon className="w-14 h-14 sm:w-16 sm:h-16 text-white/95 drop-shadow-md" strokeWidth={1.25} />
      </div>
      {/* Floating particles */}
      <div
        className="absolute top-3 right-4 w-3 h-3 rounded-full bg-white/50 animate-msk-pulse-soft"
        style={{ animationDelay: '0.5s' }}
      />
      <div
        className="absolute bottom-5 left-5 w-2 h-2 rounded-full bg-white/40 animate-msk-pulse-soft"
        style={{ animationDelay: '1.2s' }}
      />
      <div className="absolute bottom-3 right-6 text-[10px] font-bold tracking-widest text-white/80 uppercase">
        {initials}
      </div>
    </div>
  );
};

export default AnimatedTeamVisual;
