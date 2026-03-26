import React from 'react';
import { CheckCircle, Globe, Package, Clock } from 'lucide-react';

const highlights = [
  {
    icon: <Globe className="w-7 h-7 text-green-700" />,
    title: 'Global Export Network',
    desc: 'Expanding our reach to over 50 countries.'
  },
  {
    icon: <CheckCircle className="w-7 h-7 text-green-700" />,
    title: 'Quality Assurance',
    desc: 'Ensuring top-notch quality for all products.'
  },
  {
    icon: <Package className="w-7 h-7 text-green-700" />,
    title: 'Bulk Supply Capability',
    desc: 'Handling large orders with ease.'
  },
  {
    icon: <Clock className="w-7 h-7 text-green-700" />,
    title: 'Timely Delivery',
    desc: 'On-time delivery for every order.'
  },
];

const HighlightsSection: React.FC = () => {
  return (
    <section className="bg-[#F8F6F3] py-12 border-b border-gray-100">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center bg-white rounded-xl shadow-sm border border-gray-100 px-6 py-8 hover:shadow-md transition-all"
            >
              <div className="mb-3">{item.icon}</div>
              <h3 className="text-lg font-bold text-green-900 mb-1">{item.title}</h3>
              <p className="text-gray-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HighlightsSection;
