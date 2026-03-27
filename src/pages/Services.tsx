import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ServicesHero from '../components/services/ServicesHero';
import ServicesJumpNav from '../components/services/ServicesJumpNav';
import ServicesOverview from '../components/services/ServicesOverview';
import RegionWiseServices from '../components/services/RegionWiseServices';
import ProcessFlow from '../components/services/ProcessFlow';
import WhyChooseUs from '../components/services/WhyChooseUs';
import ServicesCTA from '../components/services/ServicesCTA';
import Seo from '../components/seo/Seo';
import FaqSection from '../components/seo/FaqSection';
import { FaqJsonLd } from '../components/seo/JsonLd';
import { getStaticPageMeta } from '../seo/pageMeta';
import { SERVICES_FAQS } from '../seo/servicesFaq';

const VALID_SECTIONS = new Set([
  'export-solutions',
  'core-services',
  'regions',
  'export-process',
  'why-services',
  'services-cta',
]);

const Services: React.FC = () => {
  const { sectionSlug } = useParams<{ sectionSlug?: string }>();
  const meta = getStaticPageMeta('services');

  useEffect(() => {
    if (!sectionSlug || !VALID_SECTIONS.has(sectionSlug)) return;
    const id = sectionSlug;
    const run = () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    const t = window.setTimeout(run, 100);
    return () => window.clearTimeout(t);
  }, [sectionSlug]);

  return (
    <>
      <Seo {...meta} />
      <FaqJsonLd faqs={SERVICES_FAQS} />
      <div className="bg-[#F8F6F3] min-h-screen">
        <ServicesHero />
        <ServicesJumpNav />
        <ServicesOverview />
        <RegionWiseServices />
        <ProcessFlow />
        <WhyChooseUs />
        <FaqSection id="services-faq" title="Frequently asked questions — export & logistics" faqs={SERVICES_FAQS} />
        <ServicesCTA />
      </div>
    </>
  );
};

export default Services;
