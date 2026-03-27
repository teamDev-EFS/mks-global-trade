import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const CTABanner: React.FC = () => {
  return (
    <section
      id="contact-section"
      className="relative overflow-hidden rounded-2xl border border-emerald-700/20 shadow-[0_8px_48px_-16px_rgba(15,61,46,0.25)]"
      aria-labelledby="cta-bulk-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a2e1f] via-[#0F3D2E] to-[#1a5c3f]" aria-hidden />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_100%_0%,rgba(30,127,92,0.15),transparent_50%)]" aria-hidden />
      <div
        className="absolute inset-0 opacity-[0.03]"
        aria-hidden
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }}
      />

      {/* Decorative */}
      <div className="absolute top-8 right-8 w-40 h-40 border border-emerald-400/[0.06] rounded-full" aria-hidden />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto max-w-3xl px-6 py-14 text-center sm:px-10 sm:py-16 md:py-20"
      >
        <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-emerald-300 mb-4">
          Partner with MSK
        </span>
        <h2 id="cta-bulk-heading" className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-[2.75rem]">
          Scale Your Agro Supply with Confidence
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-emerald-100/60 sm:text-lg">
          Request a quotation for bulk volumes, specifications, and destination — our trade desk responds
          with clarity and timelines.
        </p>
        <div className="mt-10 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
          <Link
            to="/contact"
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-3.5 text-base font-bold text-[#0F3D2E] shadow-lg shadow-black/15 transition-all hover:shadow-xl hover:bg-emerald-50 active:scale-[0.98]"
          >
            Get a Quote
            <ArrowRight className="h-4.5 w-4.5 shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
          <Link
            to="/services"
            className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] backdrop-blur-sm px-8 py-3.5 text-base font-semibold text-white transition-all hover:bg-white/12 hover:border-white/25"
          >
            Export Services
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default CTABanner;
