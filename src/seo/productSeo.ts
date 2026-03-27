export type FaqItem = { question: string; answer: string };

/** Per-product FAQs for AEO / FAQ schema (conversational, snippet-friendly). */
const DEFAULT_FAQS: FaqItem[] = [
  {
    question: 'Do you export in bulk from India to UAE and other countries?',
    answer:
      'Yes. MSK Global Trade supplies bulk export orders with export-grade packing, documentation support, and reliable logistics for UAE, GCC, and global destinations.',
  },
  {
    question: 'How can I request a quotation?',
    answer:
      'Use the enquiry form or WhatsApp on our website. Share product name, quantity, destination port, and packing preference — our team responds with pricing and lead times.',
  },
];

const BY_SLUG: Record<string, FaqItem[]> = {
  vermicompost: [
    {
      question: 'Do you export vermicompost in bulk?',
      answer:
        'Yes. We provide bulk export of 100% organic vermicompost with hygienic processing and export-grade packing suitable for agriculture and soil improvement worldwide.',
    },
    {
      question: 'Is your vermicompost suitable for organic farming?',
      answer:
        'Our vermicompost is organic and rich in nutrients, supporting sustainable and organic farming practices in India, UAE, and global markets.',
    },
    {
      question: 'What regions do you supply vermicompost to?',
      answer:
        'We supply buyers in India, UAE, the Middle East, and other international markets with consistent quality and timely dispatch.',
    },
  ],
  jaggery: [
    {
      question: 'Do you supply jaggery powder for bulk export to UAE?',
      answer:
        'Yes. We offer natural jaggery in solid, cube, and powder forms for bulk export with chemical-free processing and custom packing where required.',
    },
    {
      question: 'Is jaggery available in powder form for food industry buyers?',
      answer:
        'Yes. Multiple variants including powder are available for food industry and wholesale buyers seeking natural sweeteners.',
    },
  ],
  coriander: [
    {
      question: 'Do you export Indian coriander seeds and powder?',
      answer:
        'Yes. We export premium coriander seeds and hygienically processed powder with strong aroma, suitable for spice traders and food manufacturers globally.',
    },
  ],
  'red-chilli': [
    {
      question: 'Do you export red chilli powder and flakes in bulk?',
      answer:
        'Yes. Red chilli is available as powder and flakes with hygienic processing for export to UAE, GCC, and worldwide buyers.',
    },
  ],
  onion: [
    {
      question: 'Do you supply export-quality onions in bulk?',
      answer:
        'Yes. We offer export-grade onions with packing options suited for processing and retail channels in international markets.',
    },
  ],
};

export function getProductFaqs(slug: string): FaqItem[] {
  const specific = BY_SLUG[slug];
  if (specific?.length) {
    return [...specific, ...DEFAULT_FAQS.slice(0, 1)];
  }
  return DEFAULT_FAQS;
}
