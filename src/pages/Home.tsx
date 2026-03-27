import React from 'react';
import HeroSection from '../components/home/HeroSection';
import HighlightsSection from '../components/home/HighlightsSection';
import HomeGlobalReach from '../components/home/HomeGlobalReach';
import FeaturedProducts from '../components/home/FeaturedProducts';
import HomeWhyChoose from '../components/home/HomeWhyChoose';
import HomeExportProcess from '../components/home/HomeExportProcess';
import HomeTestimonials from '../components/home/HomeTestimonials';
import CTABanner from '../components/home/CTABanner';
import Seo from '../components/seo/Seo';
import { getStaticPageMeta } from '../seo/pageMeta';

const Home: React.FC = () => {
  const meta = getStaticPageMeta('home');

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Seo {...meta} />

      {/* Hero */}
      <HeroSection />

      {/* Main content shell */}
      <div className="relative mx-auto max-w-[min(100%,1440px)] px-4 pb-16 sm:px-6 sm:pb-20 lg:px-10 lg:pb-24">
        {/* Frosted glass container */}
        <div className="relative rounded-[2rem] border border-stone-200/50 bg-white/50 shadow-[0_4px_40px_-20px_rgba(15,61,46,0.06)] backdrop-blur-[2px]">
          <div className="rounded-[2rem] bg-gradient-to-b from-white/80 to-[#FAF7F2]/20 px-3 py-10 sm:px-5 sm:py-12 md:px-8 md:py-16">
            <HighlightsSection />

            <div className="mx-auto my-6 max-w-[min(100%,1100px)] border-t border-stone-200/60" aria-hidden />
            <HomeGlobalReach />

            <div className="mx-auto my-6 max-w-[min(100%,1100px)] border-t border-stone-200/60" aria-hidden />
            <FeaturedProducts />

            <div className="mx-auto my-6 max-w-[min(100%,1100px)] border-t border-stone-200/60" aria-hidden />
            <HomeWhyChoose />
          </div>
        </div>

        {/* Full-bleed export process band */}
        <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen max-w-[100vw]">
          <HomeExportProcess />
        </div>

        {/* Second frosted container */}
        <div className="relative mx-auto max-w-[min(100%,1440px)] px-0 sm:px-0 lg:px-0">
          <div className="relative rounded-[2rem] border border-stone-200/50 bg-white/50 shadow-[0_4px_40px_-20px_rgba(15,61,46,0.06)] backdrop-blur-[2px]">
            <div className="rounded-[2rem] bg-gradient-to-b from-white/80 to-[#FAF7F2]/20 px-3 py-10 sm:px-5 sm:py-12 md:px-8 md:py-16">
              <HomeTestimonials />

              <div className="mt-12 sm:mt-16">
                <CTABanner />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
