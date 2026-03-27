import React from 'react';
import { motion } from 'framer-motion';
import { Search, FlaskConical, Package, Ship } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Sourcing',
    desc: 'Verified suppliers and crop windows matched to your programme requirements.',
  },
  {
    icon: FlaskConical,
    title: 'Quality',
    desc: 'Inspection, grading, and hygiene controls before packing — lab-tested purity.',
  },
  {
    icon: Package,
    title: 'Packaging',
    desc: 'Export-grade bags, custom labels, and batch traceability as required.',
  },
  {
    icon: Ship,
    title: 'Shipping',
    desc: 'Documentation, handover, and coordination to destination worldwide.',
  },
];

const HomeExportProcess: React.FC = () => {
  return (
    <section
      className="relative overflow-hidden py-20 sm:py-24 md:py-28"
      aria-labelledby="export-process-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a2e1f] via-[#0F3D2E] to-[#1a5c3f]" aria-hidden />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_80%_20%,rgba(30,127,92,0.15),transparent)]" aria-hidden />
      <div
        className="absolute inset-0 opacity-[0.03]"
        aria-hidden
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }}
      />

      <div className="relative mx-auto max-w-[min(100%,1280px)] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-emerald-300 mb-3">
            How We Export
          </span>
          <h2 id="export-process-heading" className="text-3xl font-bold text-white sm:text-4xl md:text-[2.75rem]">
            From Field to Freight
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-emerald-100/60 sm:text-lg">
            A transparent path your procurement team can align with — from first quote to landed cargo.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-emerald-400 to-emerald-300 mx-auto rounded-full mt-5" />
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-[52px] left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-emerald-500/25 to-transparent" aria-hidden />

          <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {steps.map(({ icon: Icon, title, desc }, i) => (
              <motion.li
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative flex flex-col items-center text-center"
              >
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.08, y: -4 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="relative z-[1] mb-5 flex h-[72px] w-[72px] items-center justify-center rounded-2xl border border-emerald-400/15 bg-emerald-500/10 text-emerald-300 backdrop-blur-sm"
                >
                  <span className="absolute -right-1.5 -top-1.5 flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500 text-xs font-bold text-white shadow-lg shadow-emerald-500/30">
                    {i + 1}
                  </span>
                  <Icon className="h-8 w-8" strokeWidth={1.5} aria-hidden />
                </motion.div>

                <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
                <p className="text-sm leading-relaxed text-emerald-100/55 max-w-[240px]">{desc}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default HomeExportProcess;
