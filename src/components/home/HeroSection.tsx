import React from 'react';
import Button from '../ui/Button';
import { BadgeCheck } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section
      className="relative bg-gradient-to-br from-emerald-900 via-forestGreen-900 to-emerald-800 text-ivory-50 overflow-hidden rounded-[20px] shadow-xl max-w-[1240px] mx-auto px-6 sm:px-10 py-20 flex flex-col md:flex-row items-center gap-12"
      style={{
        backgroundImage: `
          linear-gradient(rgba(10, 40, 20, 0.85), rgba(10, 40, 20, 0.85)),
          url('/textures/soft-leaf-overlay.png')
        `,
        backgroundBlendMode: 'overlay',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Left content */}
      <div className="flex-1 max-w-xl">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-ivory-50 drop-shadow-lg">
          Empowering Global Trade with <br />
          <span className="text-orange-400">Premium Indian Exports</span>
        </h1>
        <p className="mt-6 text-lg max-w-md text-ivory-200 leading-relaxed">
          Trusted by businesses worldwide for quality, reliability, and bulk supply.
          Join our network to expand your global reach.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button
            variant="primary"
            className="px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-2xl transition-shadow"
          >
            Get a Quote
          </Button>
          <Button
            variant="secondary"
            className="px-8 py-4 text-lg font-semibold border-orange-400 text-orange-400 hover:bg-orange-50 hover:text-orange-600 transition-colors"
          >
            Learn More
          </Button>
        </div>

        {/* Floating trust badges */}
        <div className="mt-12 flex gap-6">
          <div className="flex items-center bg-ivory-100 bg-opacity-20 backdrop-blur-md rounded-full px-5 py-3 shadow-md">
            <BadgeCheck className="w-6 h-6 text-orange-400 mr-3" />
            <span className="font-semibold text-ivory-100">50+ Countries Served</span>
          </div>
          <div className="flex items-center bg-ivory-100 bg-opacity-20 backdrop-blur-md rounded-full px-5 py-3 shadow-md">
            <BadgeCheck className="w-6 h-6 text-orange-400 mr-3" />
            <span className="font-semibold text-ivory-100">Bulk Supply Ready</span>
          </div>
        </div>
      </div>

      {/* Right visual */}
      <div className="flex-1 max-w-lg relative">
        <img
          src="/images/export-world-map.png"
          alt="Global Export Map"
          className="rounded-[20px] shadow-2xl border border-ivory-300 hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>
    </section>
  );
};

export default HeroSection;
