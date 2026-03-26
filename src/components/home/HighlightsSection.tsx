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
    <section className="max-w-[1240px] mx-auto px-6 sm:px-10 py-16 bg-ivory-50">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {highlights.map(({ id, title, description, icon }) => {
          const IconComponent = iconMap[icon as keyof typeof iconMap];
          return (
            <Card
              key={id}
              className="flex flex-col items-center text-center p-8 bg-gradient-to-tr from-ivory-50 to-ivory-100 border-ivory-300 shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="bg-emerald-900 bg-opacity-10 rounded-full p-4 mb-4">
                <IconComponent className="w-10 h-10 text-emerald-800" />
              </div>
              <h3 className="text-xl font-semibold text-emerald-900 mb-2">{title}</h3>
              <p className="text-ivory-700 text-sm leading-relaxed max-w-xs">
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
