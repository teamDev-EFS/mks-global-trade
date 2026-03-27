import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { testimonials } from '../../data/testimonials';

const HomeTestimonials: React.FC = () => {
  return (
    <section className="relative py-16 sm:py-20 md:py-24" aria-labelledby="testimonials-heading">
      <div className="mx-auto max-w-[min(100%,1280px)] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-emerald-700 mb-3">
            Client Trust
          </span>
          <h2 id="testimonials-heading" className="text-3xl font-bold tracking-tight text-[#0F3D2E] sm:text-4xl md:text-[2.75rem]">
            What Partners Say
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-stone-500">
            Representative feedback from procurement and import teams we support.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-emerald-600 to-emerald-400 mx-auto rounded-full mt-5" />
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={t.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group flex h-full flex-col rounded-2xl border border-stone-200/60 bg-gradient-to-b from-white to-stone-50/50 p-8 shadow-[0_2px_24px_-8px_rgba(15,61,46,0.08)] transition-all duration-500 hover:border-emerald-200/60 hover:shadow-[0_12px_48px_-12px_rgba(15,61,46,0.15)]"
            >
              {/* Quote icon */}
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center mb-5 group-hover:bg-emerald-500 transition-colors duration-500">
                <Quote className="h-5 w-5 text-emerald-600 group-hover:text-white transition-colors duration-500" aria-hidden />
              </div>

              <p className="flex-1 text-[0.9375rem] leading-relaxed text-stone-600 italic">
                &ldquo;{t.feedback}&rdquo;
              </p>

              <footer className="mt-8 flex items-center gap-3 border-t border-stone-100 pt-6">
                <img
                  src={t.avatar}
                  alt=""
                  className="h-12 w-12 rounded-xl object-cover ring-2 ring-emerald-100"
                  width={48}
                  height={48}
                />
                <div className="text-left">
                  <cite className="not-italic text-base font-bold text-[#0F3D2E]">{t.name}</cite>
                  {t.company && <div className="text-sm text-stone-400">{t.company}</div>}
                </div>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeTestimonials;
