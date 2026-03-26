import React from 'react';
import Button from '../ui/Button';
import { Globe, CheckCircle, Package } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-emerald-800 to-green-900 rounded-3xl shadow-lg overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-10 py-20 flex flex-col lg:flex-row items-center gap-12">
        {/* Left: Text + CTA */}
        <div className="flex-1 text-ivory-50">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight mb-6">
            Premium Global Export Solutions
          </h1>
          <p className="text-lg sm:text-xl max-w-xl mb-8 opacity-90">
            Trusted partner for quality products, bulk supply, and worldwide reach.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button className="px-8 py-4 text-lg font-semibold shadow-lg" as="a" href="/contact">
              Get a Quote
            </Button>
            <Button variant="secondary" className="px-8 py-4 text-lg font-semibold">
              Explore Products
            </Button>
          </div>
          {/* Trust indicators */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
              <Globe className="w-8 h-8 text-orange-400" />
              <div>
                <h3 className="font-semibold text-lg">Global Reach</h3>
                <p className="text-sm opacity-90">Serving 50+ countries worldwide</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <CheckCircle className="w-8 h-8 text-orange-400" />
              <div>
                <h3 className="font-semibold text-lg">Export Quality</h3>
                <p className="text-sm opacity-90">Certified premium products</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Package className="w-8 h-8 text-orange-400" />
              <div>
                <h3 className="font-semibold text-lg">Bulk Supply</h3>
                <p className="text-sm opacity-90">Reliable large order fulfillment</p>
              </div>
            </div>
          </div>
        </div>
        {/* Right: Visual */}
        <div className="flex-1 max-w-lg lg:max-w-xl">
          <img
            src="/images/world-export-map.png"
            alt="Global export map"
            className="w-full rounded-3xl shadow-2xl object-cover hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>
      </div>
      {/* Subtle textured overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-emerald-900/20 to-transparent mix-blend-overlay"></div>
    </section>
  );
};

export default HeroSection;
