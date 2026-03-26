import React from 'react';
import ServiceCard from './ServiceCard';
import { Truck, Package, Globe } from 'lucide-react';

const services = [
  {
    title: 'Product Sourcing',
    description: 'We source the best quality products from trusted suppliers.',
    icon: <Package />, 
  },
  {
    title: 'Quality Inspection',
    description: 'Our team ensures all products meet international standards.',
    icon: <Globe />, 
  },
  {
    title: 'Logistics & Packaging',
    description: 'Efficient logistics and secure packaging for safe delivery.',
    icon: <Truck />, 
  },
];

const ServiceSection: React.FC = () => {
  return (
    <section className="py-12 bg-surface-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;