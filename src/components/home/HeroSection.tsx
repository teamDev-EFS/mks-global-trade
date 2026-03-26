import React from 'react';
import { Globe, ArrowRight } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-green-700 via-emerald-600 to-green-900 min-h-[520px] flex items-center overflow-hidden">
      {/* Organic overlay texture */}
      <div className="absolute inset-0 bg-[url('/organic-texture.png')] bg-repeat opacity-10 pointer-events-none" />
      <div className="max-w-[1320px] mx-auto w-full px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between py-20 md:py-28 relative z-10">
        {/* Left: Content */}
        <div className="flex-1 text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 drop-shadow-lg">
            Global Trade Solutions for <span className="text-orange-400">Natural & Agro Products</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-xl">
            Connecting you with the finest export-quality agro products worldwide. Trusted by importers, wholesalers, and food businesses in 50+ countries.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-3 rounded-full font-semibold bg-orange-500 text-white shadow-lg hover:bg-orange-600 transition-all text-lg group"
            >
              Get a Quote
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-3 rounded-full font-semibold border-2 border-white text-white hover:bg-white/10 hover:text-orange-400 transition-all text-lg"
            >
              Contact Us
            </a>
          </div>
        </div>
        {/* Right: Product collage or world map */}
        <div className="flex-1 flex justify-center items-center mt-12 md:mt-0">
          <div className="relative w-[340px] h-[340px] md:w-[420px] md:h-[420px]">
            <img
              src="/hero-world-map.png"
              alt="Global Export Map"
              className="absolute inset-0 w-full h-full object-contain opacity-90 drop-shadow-xl rounded-2xl border-4 border-white"
              loading="lazy"
            />
            {/* Example export lines or product icons could be added here for more visual appeal */}
            <div className="absolute bottom-4 left-4 flex items-center bg-white/90 rounded-lg px-4 py-2 shadow-lg">
              <Globe className="w-6 h-6 text-green-700 mr-2" />
              <span className="font-semibold text-green-800">50+ Countries Served</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
