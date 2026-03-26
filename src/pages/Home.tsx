import React from 'react';
import HeroSection from '../components/home/HeroSection';
import HighlightsSection from '../components/home/HighlightsSection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import CTABanner from '../components/home/CTABanner';

const Home: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <HighlightsSection />
      <FeaturedProducts />
      <CTABanner />
    </div>
  );
};

export default Home;