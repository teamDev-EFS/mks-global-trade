import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Mail, MapPin, Phone, MessageCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import PageHero from '../components/layout/PageHero';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { WhatsAppActionLink } from '../components/ui/WhatsAppActionButton';
import { validateContactFormFields } from '../lib/formValidation';
import { submitPublicEnquiry } from '../lib/publicEnquiryApi';
import Seo from '../components/seo/Seo';
import { ContactPageJsonLd } from '../components/seo/JsonLd';
import { getStaticPageMeta } from '../seo/pageMeta';
import { trackContactFormSubmit, trackWhatsAppClick } from '../lib/analytics';
import { BRAND } from '../seo/siteConfig';

const WHATSAPP = '919232091060';

const Contact: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    product: '',
    quantity: '',
    location: '',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[e.target.name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateContactFormFields({
      name: form.name,
      email: form.email,
      phone: form.phone,
      product: form.product,
      quantity: form.quantity,
      location: form.location,
      message: form.message,
    });
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    try {
      const res = await submitPublicEnquiry({
        sourceType: 'contact_form',
        customerName: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        whatsappNumber: form.phone.trim(),
        location: form.location.trim(),
        message: form.message.trim(),
        products: [
          {
            productName: form.product,
            category: '',
            variant: '',
            quantity: form.quantity,
          },
        ],
      });
      toast.success(`Enquiry saved — ${res.enquiryId}`);
      trackContactFormSubmit();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to submit');
      return;
    }

    const message =
      `Hello MSK Global Trade,\n\n` +
      `I would like to inquire about your products with the following details:\n` +
      `- Name: ${form.name}\n` +
      `- Mail: ${form.email}\n` +
      `- Phone: ${form.phone}\n` +
      `- Product: ${form.product || 'N/A'}\n` +
      `- Quantity: ${form.quantity || 'N/A'}\n` +
      `- Location: ${form.location || 'N/A'}\n` +
      `- Message: ${form.message || 'N/A'}\n\n` +
      `Please get back to me at your earliest convenience.`;

    trackWhatsAppClick('contact_form', { stage: 'after_submit' });
    const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const contactMeta = getStaticPageMeta('contact');

  return (
    <div className="bg-[#F8F6F3] min-h-screen pb-12">
      <Seo {...contactMeta} />
      <ContactPageJsonLd />
      <PageHero
        title="Contact Us"
        subtitle="Tell us what you need — bulk supply, product specs, or export destinations. We reply quickly."
        breadcrumbs={[{ label: 'Contact' }]}
      />

      <div className="max-w-[min(100%,1200px)] mx-auto px-4 sm:px-6 lg:px-8 -mt-4 sm:-mt-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Sidebar: info cards */}
          <aside className="lg:col-span-4 space-y-4 order-2 lg:order-1">
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100/90">
              <h3 className="text-lg font-bold text-emerald-900 mb-4">MSK Global Trade Pvt Ltd</h3>
              <ul className="space-y-4 text-sm text-gray-700">
                <li className="flex gap-3">
                  <MapPin className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" aria-hidden />
                  <span>{BRAND.officeAddressLine}</span>
                </li>
                <li className="flex gap-3">
                  <Phone className="w-5 h-5 text-orange-500 shrink-0" aria-hidden />
                  <a href="tel:+919232091060" className="hover:text-emerald-800 font-medium">
                    +91 92320 91060
                  </a>
                </li>
                <li className="flex gap-3">
                  <Mail className="w-5 h-5 text-orange-500 shrink-0" aria-hidden />
                  <a href="mailto:mskglobal26@gmail.com" className="hover:text-emerald-800 break-all">
                    mskglobal26@gmail.com
                  </a>
                </li>
                <li className="flex gap-3">
                  <Clock className="w-5 h-5 text-orange-500 shrink-0" aria-hidden />
                  <span>We respond within one business day for most enquiries.</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100/90">
              <div className="flex items-start gap-3 mb-3">
                <MessageCircle className="w-8 h-8 text-[#25D366] shrink-0" aria-hidden />
                <div>
                  <h4 className="font-bold text-emerald-900">WhatsApp</h4>
                  <p className="text-sm text-gray-600 mt-1">Fast answers for MOQ, packing, and shipping.</p>
                </div>
              </div>
              <WhatsAppActionLink
                href={`https://wa.me/${WHATSAPP}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center"
                onClick={() => trackWhatsAppClick('contact_sidebar')}
              >
                Chat on WhatsApp
              </WhatsAppActionLink>
            </div>

            <div className="bg-emerald-900 rounded-2xl p-6 text-white shadow-md">
              <h4 className="font-bold mb-2">Browse the catalogue</h4>
              <p className="text-sm text-emerald-100/95 mb-4">See agro, spices, and seasonal lines before you write to us.</p>
              <Link
                to="/products"
                className="inline-flex items-center justify-center w-full py-2.5 rounded-xl bg-white text-emerald-900 font-semibold text-sm hover:bg-emerald-50 transition-colors"
              >
                View products
              </Link>
            </div>
          </aside>

          {/* Form */}
          <div className="lg:col-span-8 order-1 lg:order-2">
            <div className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 shadow-md border border-gray-100/90">
              <h2 className="text-xl sm:text-2xl font-extrabold text-emerald-950 mb-1">Send an enquiry</h2>
              <p className="text-gray-600 text-sm mb-8">
                Fields marked by validation on submit. You can also reach us on WhatsApp after saving.
              </p>
              <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Name"
                    name="name"
                    type="text"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={handleChange}
                    error={errors.name}
                    autoComplete="name"
                  />
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    error={errors.email}
                    autoComplete="email"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Phone"
                    name="phone"
                    type="tel"
                    placeholder="+91 92320 91060"
                    value={form.phone}
                    onChange={handleChange}
                    error={errors.phone}
                    autoComplete="tel"
                  />
                  <Input
                    label="Product interest"
                    name="product"
                    type="text"
                    placeholder="e.g. Vermicompost, Jaggery"
                    value={form.product}
                    onChange={handleChange}
                    error={errors.product}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Quantity"
                    name="quantity"
                    type="text"
                    inputMode="decimal"
                    placeholder="e.g. 500 kg"
                    value={form.quantity}
                    onChange={handleChange}
                    error={errors.quantity}
                  />
                  <Input
                    label="Location"
                    name="location"
                    type="text"
                    placeholder="City, country"
                    value={form.location}
                    onChange={handleChange}
                    error={errors.location}
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-sm font-semibold text-deepGreen-900 mb-2">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    maxLength={2000}
                    placeholder="Requirements, timeline, destination port…"
                    value={form.message}
                    onChange={handleChange}
                    aria-invalid={errors.message ? 'true' : undefined}
                    className={`w-full rounded-xl border bg-ivory-50 px-4 py-3 text-deepGreen-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-shadow shadow-inner resize-y min-h-[120px] ${
                      errors.message ? 'border-red-500 focus:ring-red-400' : 'border-ivory-300 focus:ring-emerald-600'
                    }`}
                  />
                  {errors.message ? (
                    <p role="alert" className="text-red-600 text-sm mt-1.5">
                      {errors.message}
                    </p>
                  ) : null}
                </div>
                <Button type="submit" variant="primary" className="w-full sm:w-auto min-w-[200px] py-3.5 text-base font-semibold mt-2">
                  Send message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
