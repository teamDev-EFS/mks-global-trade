import React from 'react';

const CTABanner: React.FC = () => {
  return (
    <section className="bg-primary text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Looking for Bulk Supply?</h2>
        <p className="text-lg mb-8">Contact us today to discuss your requirements.</p>
        <a href="#contact" className="bg-white text-primary font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl">Contact Us</a>
      </div>
    </section>
  );
};

export default CTABanner;