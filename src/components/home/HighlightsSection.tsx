import React from 'react';
import { highlights } from '../../data/highlights';
import { Globe, CheckCircle, Package, Clock } from 'lucide-react';
import Card from '../ui/Card';

const iconMap = {
  Globe: Globe,
  CheckCircle: CheckCircle,
  Package: Package,
  Clock: Clock,
};

const HighlightsSection: React.FC = () => {
  return (
    <section className="py-8 sm:py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {highlights.map(({ id, title, description, icon }) => {
          const IconComponent = iconMap[icon as keyof typeof iconMap];
          return (
            <Card
              key={id}
              className="flex flex-col items-center text-center p-5 sm:p-6 bg-gradient-to-tr from-ivory-50 to-ivory-100 border border-ivory-200/80 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="bg-emerald-900/10 rounded-full p-3 mb-3">
                <IconComponent className="w-9 h-9 sm:w-10 sm:h-10 text-emerald-800" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-emerald-900 mb-2">{title}</h3>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed max-w-xs">
                {description}
              </p>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default HighlightsSection;
