import React from 'react';
import type { FaqItem } from '../../seo/productSeo';

type Props = {
  title: string;
  faqs: FaqItem[];
  id?: string;
};

const FaqSection: React.FC<Props> = ({ title, faqs, id = 'faq' }) => {
  return (
    <section id={id} className="scroll-mt-28 py-10 sm:py-12 border-t border-gray-100 bg-white" aria-labelledby={`${id}-heading`}>
      <div className="max-w-[min(100%,800px)] mx-auto px-4 sm:px-6">
        <h2 id={`${id}-heading`} className="text-2xl md:text-3xl font-bold text-emerald-950 mb-6">
          {title}
        </h2>
        <dl className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={`${faq.question}-${i}`} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
              <dt className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</dt>
              <dd className="text-gray-700 leading-relaxed pl-0">{faq.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default FaqSection;
