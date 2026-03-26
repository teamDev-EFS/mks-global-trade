import React from 'react';
import HeroSection from '../components/home/HeroSection';
import HighlightsSection from '../components/home/HighlightsSection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import CTABanner from '../components/home/CTABanner';

const Home: React.FC = () => {
  return (
    <div className="bg-ivory-50 min-h-screen">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-10 py-12">
        <HeroSection />
        <HighlightsSection />
        <FeaturedProducts />
        <CTABanner />
      </div>
    </div>
  );
};

export default Home;
