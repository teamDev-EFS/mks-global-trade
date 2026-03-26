import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const whatsappUrl =
  'https://wa.me/919232091060?text=' +
  encodeURIComponent(
    `Hello MSK Global Trade,%0A%0AI would like to inquire about your export services. Please contact me with more details.%0A%0AThank you.`
  );

const ServicesCTA: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-green-700 via-emerald-600 to-green-900 py-12 mt-10">
      <div className="max-w-[900px] mx-auto px-4 sm:px-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Looking for a reliable export partner?</h2>
        <p className="text-lg text-white/90 mb-8">Contact us today to discuss your requirements and get a custom export solution.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-8 py-3 rounded-full font-semibold bg-orange-500 text-white shadow-lg hover:bg-orange-600 transition-all text-lg group"
          >
            Get a Quote
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-3 rounded-full font-semibold bg-green-600 text-white shadow-lg hover:bg-green-700 transition-all text-lg group"
          >
            <MessageCircle className="mr-2 w-5 h-5" /> WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServicesCTA;
