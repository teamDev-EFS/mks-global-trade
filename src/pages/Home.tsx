import React from 'react';
import HeroSection from '../components/home/HeroSection';
import HighlightsSection from '../components/home/HighlightsSection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import CTABanner from '../components/home/CTABanner';

const Home: React.FC = () => {
  // WhatsApp number and message for homepage CTA
  const whatsappNumber = '+1234567890'; // Replace with actual number
  const whatsappMessage = encodeURIComponent('Hello MSK Global Trade, I am interested in your products. Please provide more information.');
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="bg-ivory-50 min-h-screen py-16">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-10">
        <HeroSection />
        <HighlightsSection />
        <FeaturedProducts whatsappLink={whatsappLink} />
        <CTABanner />
      </div>
    </div>
  );
};

export default Home;
