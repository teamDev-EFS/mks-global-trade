import React from 'react';
import { Globe2, Users, Clock, BadgeCheck, Tag } from 'lucide-react';

const reasons = [
  {
    icon: <Globe2 className="w-7 h-7 text-green-700" />,
    label: 'Global export experience',
  },
  {
    icon: <Users className="w-7 h-7 text-green-700" />,
    label: 'Reliable supplier network',
  },
  {
    icon: <Clock className="w-7 h-7 text-green-700" />,
    label: 'Timely delivery',
  },
  {
    icon: <Tag className="w-7 h-7 text-green-700" />,
    label: 'Competitive pricing',
  },
  {
    icon: <BadgeCheck className="w-7 h-7 text-green-700" />,
    label: 'Quality assurance',
  },
];

const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-14 bg-white border-y border-gray-100">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-green-900 mb-8 text-center">Why Choose MSK Global Trade?</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {reasons.map((reason, idx) => (
            <div
              key={reason.label}
              className="flex flex-col items-center bg-surface-1 rounded-xl shadow p-6 min-w-[180px] max-w-xs hover:shadow-lg transition-all"
            >
              <div className="mb-3">{reason.icon}</div>
              <span className="text-green-900 font-semibold text-base text-center">{reason.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
