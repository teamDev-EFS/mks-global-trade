import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CTABanner: React.FC = () => {
  return (
    <section
      id="contact-section"
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-800 text-white shadow-lg border border-emerald-600/30"
      aria-labelledby="cta-bulk-heading"
    >
      <div className="absolute inset-0 opacity-20 bg-[url('/organic-texture.png')] bg-repeat pointer-events-none" aria-hidden />
      <div className="relative max-w-3xl mx-auto px-4 sm:px-8 py-10 sm:py-12 text-center">
        <h2 id="cta-bulk-heading" className="text-2xl sm:text-3xl font-bold mb-3 tracking-tight">
          Looking for Bulk Supply?
        </h2>
        <p className="text-base sm:text-lg mb-8 text-white/95 max-w-xl mx-auto leading-relaxed">
          India → UAE → global: export-grade agro supply. Explore our catalogue or enquire for bulk export.
        </p>
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center items-center">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-800"
          >
            Enquire for bulk export
            <ArrowRight className="w-5 h-5 shrink-0" aria-hidden />
          </Link>
          <Link
            to="/products"
            className="inline-flex items-center justify-center gap-2 border-2 border-white/90 text-white font-semibold px-8 py-3.5 rounded-full hover:bg-white/10 transition-colors"
          >
            View products
          </Link>
          <Link to="/services" className="text-sm font-medium text-white/90 underline underline-offset-2 hover:text-white">
            Export services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
