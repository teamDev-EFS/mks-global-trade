import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { trackWhatsAppClick } from '../../lib/analytics';

const whatsappUrl =
  'https://wa.me/919232091060?text=' +
  encodeURIComponent('Hello MSK Global Trade,\n\nI would like to inquire about your export services. Please contact me with more details.\n\nThank you.');

const ServicesCTA: React.FC = () => (
  <section id="services-cta" className="scroll-mt-32 relative py-20 md:py-28 px-4 sm:px-6 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-[#0a2e1f] via-[#0F3D2E] to-[#1a5c3f]" />
    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/8 rounded-full blur-[100px]" />

    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative max-w-3xl mx-auto text-center">
      <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-emerald-300 mb-4">Let's Work Together</span>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
        Looking for a Reliable <span className="bg-gradient-to-r from-emerald-300 to-green-200 bg-clip-text text-transparent">Export Partner?</span>
      </h2>
      <p className="text-emerald-100/60 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
        Contact us today to discuss your requirements and get a custom export solution tailored to your business.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/contact" className="group inline-flex items-center justify-center px-8 py-3.5 rounded-xl font-semibold bg-white text-[#0F3D2E] shadow-lg hover:shadow-xl hover:bg-emerald-50 transition-all">
          Get a Quote <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-0.5" />
        </Link>
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl font-semibold bg-emerald-600 text-white shadow-lg hover:bg-emerald-700 transition-all" onClick={() => trackWhatsAppClick('services_cta')}>
          <MessageCircle className="mr-2 w-5 h-5" /> WhatsApp
        </a>
      </div>
    </motion.div>
  </section>
);

export default ServicesCTA;
