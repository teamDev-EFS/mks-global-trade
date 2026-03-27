import React from 'react';
import HeroSection from '../components/home/HeroSection';
import HighlightsSection from '../components/home/HighlightsSection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import CTABanner from '../components/home/CTABanner';

const Home: React.FC = () => {
  return (
    <div className="bg-ivory-50 min-h-screen">
      <HeroSection />
      <div className="max-w-[min(100%,1400px)] mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-10 space-y-8 sm:space-y-10">
        <HighlightsSection />
        <FeaturedProducts />
        <CTABanner />
      </div>
    </div>
  );
};

export default Home;
