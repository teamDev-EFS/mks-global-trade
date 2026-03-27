import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServicesHero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-green-700 via-emerald-600 to-green-900 min-h-[320px] flex items-center overflow-hidden border-b border-green-900/10">
      <div className="absolute inset-0 bg-[url('/hero-world-map.png')] bg-cover bg-center opacity-10 pointer-events-none" />
      <div className="max-w-[1200px] mx-auto w-full px-4 sm:px-8 py-16 md:py-24 relative z-10 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">Our Export Services</h1>
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl">End-to-end sourcing, quality control, and global export solutions</p>
        <Link
          to="/contact"
          className="inline-flex items-center justify-center px-8 py-3 rounded-full font-semibold bg-orange-500 text-white shadow-lg hover:bg-orange-600 transition-all text-lg group"
        >
          Get a Quote
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
};

export default ServicesHero;
