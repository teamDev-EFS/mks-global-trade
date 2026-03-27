import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHero from '../layout/PageHero';

const ServicesHero: React.FC = () => {
  return (
    <PageHero
      id="export-solutions"
      variant="gradient-map"
      title="Our Export Services"
      subtitle="End-to-end sourcing, quality control, and global export solutions for agro and natural products."
      breadcrumbs={[{ label: 'Services' }]}
    >
      <div className="mt-6 flex flex-col sm:flex-row flex-wrap gap-3">
        <Link
          to="/contact"
          className="inline-flex items-center justify-center px-8 py-3 rounded-full font-semibold bg-orange-500 text-white shadow-lg hover:bg-orange-600 transition-all text-lg group"
        >
          Get a Quote
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
        <Link
          to="/products"
          className="inline-flex items-center justify-center px-8 py-3 rounded-full font-semibold border-2 border-white/80 text-white hover:bg-white/10 transition-all text-lg"
        >
          Browse products
        </Link>
      </div>
    </PageHero>
  );
};

export default ServicesHero;
