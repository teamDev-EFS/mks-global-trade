import React from 'react';

const stats = [
  { label: 'Global Reach', value: '50+ Countries' },
  { label: 'Products Exported', value: '1000+ Tons' },
  { label: 'Satisfied Clients', value: '500+' },
];

const CompanyStats: React.FC = () => {
  return (
    <section className="py-12 bg-surface-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Achievements</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-4xl font-bold text-emerald-500">{stat.value}</p>
              <p className="text-gray-600 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyStats;