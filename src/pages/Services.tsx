import React from 'react';
import ServicesHero from '../components/services/ServicesHero';
import ServicesOverview from '../components/services/ServicesOverview';
import RegionWiseServices from '../components/services/RegionWiseServices';
import ProcessFlow from '../components/services/ProcessFlow';
import WhyChooseUs from '../components/services/WhyChooseUs';
import ServicesCTA from '../components/services/ServicesCTA';

const Services: React.FC = () => {
  return (
    <div className="bg-[#F8F6F3] min-h-screen">
      <ServicesHero />
      <ServicesOverview />
      <RegionWiseServices />
      <ProcessFlow />
      <WhyChooseUs />
      <ServicesCTA />
    </div>
  );
};

export default Services;
