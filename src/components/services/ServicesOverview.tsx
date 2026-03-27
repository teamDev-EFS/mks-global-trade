import React from 'react';
import { Package, ShieldCheck, Truck, Globe2 } from 'lucide-react';

const services = [
  {
    icon: <Package className="w-8 h-8 text-green-700" />, 
    title: 'Product Sourcing',
    desc: 'Bulk sourcing from trusted suppliers for global markets.'
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-green-700" />,
    title: 'Quality Assurance',
    desc: 'Rigorous inspection and quality control at every stage.'
  },
  {
    icon: <Truck className="w-8 h-8 text-green-700" />,
    title: 'Packaging & Logistics',
    desc: 'Secure packaging and efficient logistics for safe delivery.'
  },
  {
    icon: <Globe2 className="w-8 h-8 text-green-700" />,
    title: 'Global Export Management',
    desc: 'End-to-end export operations and compliance handling.'
  },
];

const ServicesOverview: React.FC = () => {
  return (
    <section id="core-services" className="scroll-mt-28 py-10 sm:py-12 bg-[#F8F6F3]">
      <div className="max-w-[min(100%,1200px)] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-green-900 mb-6 text-center">Our Core Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {services.map((service, idx) => (
            <div
              key={service.title}
              className="group bg-white rounded-2xl shadow-md border border-gray-100 px-7 py-10 flex flex-col items-center text-center hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-lg font-bold text-green-900 mb-2">{service.title}</h3>
              <p className="text-gray-600 text-sm">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
