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
          Contact us today to discuss your requirements.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-800"
        >
          Contact Us
          <ArrowRight className="w-5 h-5 shrink-0" aria-hidden />
        </Link>
      </div>
    </section>
  );
};

export default CTABanner;
