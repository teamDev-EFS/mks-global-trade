import React from 'react';
import Seo from '../components/seo/Seo';
import { getStaticPageMeta } from '../seo/pageMeta';
import AboutHero from '../components/about/AboutHero';
import CompanyIntro from '../components/about/CompanyIntro';
import MissionVisionFlip from '../components/about/MissionVisionFlip';
import CoreValuesSection from '../components/about/CoreValuesSection';
import LeadershipSection from '../components/about/LeadershipSection';
import WhyChooseUsSection from '../components/about/WhyChooseUsSection';
import QualityStandards from '../components/about/QualityStandards';
import ImpactSustainability from '../components/about/ImpactSustainability';
import FutureVision from '../components/about/FutureVision';
import AboutCTA from '../components/about/AboutCTA';

const About: React.FC = () => {
  const meta = getStaticPageMeta('about');

  return (
    <div className="min-h-screen">
      <Seo {...meta} />

      {/* 1. Premium Hero */}
      <AboutHero />

      {/* 2. Company Introduction */}
      <CompanyIntro />

      {/* 3. Mission & Vision (Interactive 3D Flip) */}
      <MissionVisionFlip />

      {/* 4. Core Values */}
      <CoreValuesSection />

      {/* 5. Directors / Leadership */}
      <LeadershipSection />

      {/* 6. Why Choose Us */}
      <WhyChooseUsSection />

      {/* 7. Quality, Packaging & Global Standards */}
      <QualityStandards />

      {/* 8. Impact & Sustainability */}
      <ImpactSustainability />

      {/* 9. Future Goals / Growth Vision */}
      <FutureVision />

      {/* 10. Premium CTA */}
      <AboutCTA />
    </div>
  );
};

export default About;
