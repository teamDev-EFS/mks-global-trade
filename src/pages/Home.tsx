import React from 'react';
import HeroSection from '../components/home/HeroSection';
import HighlightsSection from '../components/home/HighlightsSection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import CTABanner from '../components/home/CTABanner';

const Home: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-white to-gray-100 min-h-screen">
      <HeroSection />
      <HighlightsSection />
      <FeaturedProducts />
      <CTABanner />
    </div>
  );
};

export default Home;
