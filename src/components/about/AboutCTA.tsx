import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, Package } from 'lucide-react';
import { trackWhatsAppClick } from '../../lib/analytics';

const whatsappUrl =
  'https://wa.me/919232091060?text=' +
  encodeURIComponent(
    'Hello MSK Global Trade,\n\nI would like to inquire about your export services. Please contact me with more details.\n\nThank you.'
  );

const AboutCTA: React.FC = () => (
  <section className="relative py-20 md:py-28 px-4 sm:px-6 overflow-hidden" aria-labelledby="cta-heading">
    {/* Background */}
    <div className="absolute inset-0 bg-gradient-to-br from-[#0a2e1f] via-[#0F3D2E] to-[#1a5c3f]" />

    {/* Texture overlay */}
    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />

    {/* Glow */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/8 rounded-full blur-[100px]" />

    {/* Decorative elements */}
    <div className="absolute top-12 right-12 w-48 h-48 border border-emerald-400/8 rounded-full" />
    <div className="absolute bottom-12 left-12 w-32 h-32 border border-emerald-400/6 rounded-full" />

    <div className="relative max-w-3xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <span className="inline-block text-sm font-semibold uppercase tracking-widest text-emerald-300 mb-4">
          Let's Grow Together
        </span>

        <h2 id="cta-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
          Partner with{' '}
          <span className="bg-gradient-to-r from-emerald-300 to-green-200 bg-clip-text text-transparent">
            MSK Global Trade
          </span>
        </h2>

        <p className="text-emerald-100/70 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          Ready to source premium Indian agricultural products? Let's start a conversation about how we can deliver quality, reliability, and value to your business.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/contact"
            className="group inline-flex items-center justify-center px-8 py-3.5 rounded-xl font-semibold bg-white text-[#0F3D2E] shadow-lg hover:shadow-xl hover:bg-emerald-50 transition-all duration-300 text-base"
          >
            Contact Us
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/products"
            className="group inline-flex items-center justify-center px-8 py-3.5 rounded-xl font-semibold bg-emerald-500/20 text-white border border-emerald-400/25 hover:bg-emerald-500/30 hover:border-emerald-400/40 transition-all duration-300 text-base"
          >
            <Package className="mr-2 w-5 h-5" />
            Explore Products
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl font-semibold bg-green-600 text-white shadow-lg hover:bg-green-700 transition-all duration-300 text-base"
            onClick={() => trackWhatsAppClick('about_cta')}
          >
            <MessageCircle className="mr-2 w-5 h-5" />
            Get a Quote
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

export default AboutCTA;
