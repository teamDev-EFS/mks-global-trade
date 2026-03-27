import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Truck, Users, Award, FileCheck, Headphones } from 'lucide-react';

const items = [
  {
    icon: ShieldCheck,
    title: 'Export-Grade Specifications',
    body: 'Products aligned with buyer specs, packing norms, and destination requirements for seamless import clearance.',
  },
  {
    icon: FileCheck,
    title: 'Documentation Discipline',
    body: 'Structured paperwork and communication for customs-aware, audit-friendly supply chain transparency.',
  },
  {
    icon: Truck,
    title: 'Logistics Coordination',
    body: 'Hand-offs from dispatch through port channels with timeline visibility and real-time tracking.',
  },
  {
    icon: Users,
    title: 'Farmer & Supplier Network',
    body: 'Direct sourcing relationships that support volume without compromising traceability or quality.',
  },
  {
    icon: Award,
    title: 'Consistency at Scale',
    body: 'Repeatable quality for distributors, processors, and industrial procurement teams worldwide.',
  },
  {
    icon: Headphones,
    title: 'Responsive Trade Desk',
    body: 'Clear points of contact for quotations, samples, and shipment updates — prompt, professional service.',
  },
];

const HomeWhyChoose: React.FC = () => {
  return (
    <section className="relative py-16 sm:py-20 md:py-24" aria-labelledby="why-choose-heading">
      <div className="mx-auto max-w-[min(100%,1280px)] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center mb-12"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-emerald-700 mb-3">
            Why MSK Global Trade
          </span>
          <h2 id="why-choose-heading" className="text-3xl font-bold tracking-tight text-[#0F3D2E] sm:text-4xl md:text-[2.75rem]">
            Why Enterprises Choose Us
          </h2>
          <p className="mt-4 text-base text-stone-500 sm:text-lg">
            A partner model designed for B2B buyers who need reliability, not one-off transactions.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-emerald-600 to-emerald-400 mx-auto rounded-full mt-5" />
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {items.map(({ icon: Icon, title, body }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="group flex gap-4 rounded-2xl border border-stone-200/60 bg-white p-6 shadow-[0_2px_16px_-6px_rgba(15,61,46,0.06)] transition-all duration-500 hover:border-emerald-200/60 hover:shadow-[0_8px_40px_-12px_rgba(15,61,46,0.12)]"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 text-emerald-700 group-hover:from-[#0F3D2E] group-hover:to-[#1E7F5C] group-hover:text-white transition-all duration-500"
              >
                <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
              </motion.div>
              <div>
                <h3 className="text-lg font-bold text-[#0F3D2E]">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-500">{body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeWhyChoose;
