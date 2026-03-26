import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle, Smartphone, Send, CheckCircle, ArrowRight } from 'lucide-react';
import { products } from '../data/products';

const PRODUCT_OPTIONS = products.map((p) => ({ value: p.name, label: p.name }));

const initialForm = {
  name: '',
  email: '',
  phone: '',
  product: '',
  quantity: '',
  location: '',
  message: '',
};

const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
const validatePhone = (phone: string) => /^[+]?\d{8,15}$/.test(phone.replace(/\s/g, ''));

const getWhatsAppUrl = (form: typeof initialForm) => {
  const message = `Hello MSK Global Trade,%0A%0AI would like to inquire about the following:%0A%0AName: ${form.name}%0AProduct: ${form.product}%0AQuantity: ${form.quantity || '-'}%0ALocation: ${form.location}%0ARequirement: ${form.message}%0A%0APlease share details.`;
  return `https://wa.me/919232091060?text=${message}`;
};

const Contact: React.FC = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const errs: { [k: string]: string } = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Mail is required';
    else if (!validateEmail(form.email)) errs.email = 'Invalid email';
    if (!form.phone.trim()) errs.phone = 'Phone is required';
    else if (!validatePhone(form.phone)) errs.phone = 'Invalid phone';
    if (!form.product.trim()) errs.product = 'Product is required';
    if (!form.location.trim()) errs.location = 'Location is required';
    if (!form.message.trim()) errs.message = 'Message is required';
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setForm(initialForm);
    }, 1200);
  };

  // For mobile call button
  const phoneHref = 'tel:+919232091060';
  const emailHref = 'mailto:mskglobal26@gmail.com';
  const whatsappUrl = getWhatsAppUrl(form);

  return (
    <div className="bg-[#F8F6F3] min-h-screen">
      {/* HERO SECTION */}
      <section className="bg-gradient-to-br from-green-700 via-emerald-600 to-green-900 py-12 border-b border-green-900/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3 drop-shadow-lg">Contact Us</h1>
          <p className="text-lg md:text-xl text-white/90">Get in touch for bulk export inquiries</p>
        </div>
      </section>

      {/* MAIN LAYOUT */}
      <section className="max-w-5xl mx-auto px-4 sm:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-10">
          {/* LEFT: Contact Form */}
          <div className="flex-1 bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <h2 className="text-2xl font-bold text-green-900 mb-6">Send Us an Inquiry</h2>
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12">
                <CheckCircle className="w-12 h-12 text-emerald-600 mb-2" />
                <h3 className="text-xl font-bold text-green-800 mb-2">Thank you!</h3>
                <p className="text-gray-600 mb-4">Your inquiry has been submitted. We will contact you soon.</p>
                <button
                  className="px-6 py-2 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-all"
                  onClick={() => setSubmitted(false)}
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name <span className="text-red-500">*</span></label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-400' : 'border-gray-200'} focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 text-base bg-gray-50`}
                    required
                    autoComplete="name"
                  />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mail <span className="text-red-500">*</span></label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-400' : 'border-gray-200'} focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 text-base bg-gray-50`}
                    required
                    autoComplete="email"
                  />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone <span className="text-red-500">*</span></label>
                  <input
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.phone ? 'border-red-400' : 'border-gray-200'} focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 text-base bg-gray-50`}
                    required
                    autoComplete="tel"
                  />
                  {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product <span className="text-red-500">*</span></label>
                  <select
                    name="product"
                    value={form.product}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.product ? 'border-red-400' : 'border-gray-200'} focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 text-base bg-gray-50`}
                    required
                  >
                    <option value="">Select product</option>
                    {PRODUCT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  {errors.product && <p className="text-xs text-red-500 mt-1">{errors.product}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                  <input
                    name="quantity"
                    type="text"
                    value={form.quantity}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 text-base bg-gray-50"
                    placeholder="e.g. 1000 kg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location <span className="text-red-500">*</span></label>
                  <input
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.location ? 'border-red-400' : 'border-gray-200'} focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 text-base bg-gray-50`}
                    required
                    placeholder="Country / City"
                  />
                  {errors.location && <p className="text-xs text-red-500 mt-1">{errors.location}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message <span className="text-red-500">*</span></label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.message ? 'border-red-400' : 'border-gray-200'} focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 text-base bg-gray-50`}
                    rows={4}
                    required
                    placeholder="Describe your requirement..."
                  />
                  {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                </div>
                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <button
                    type="submit"
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-orange-500 text-white font-semibold text-lg shadow-md hover:bg-orange-600 transition-all disabled:opacity-60"
                    disabled={submitting}
                  >
                    <Send className="w-5 h-5" /> {submitting ? 'Sending...' : 'Send Inquiry'}
                  </button>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-green-600 text-white font-semibold text-lg shadow-md hover:bg-green-700 transition-all"
                  >
                    <MessageCircle className="w-5 h-5" /> WhatsApp Now
                  </a>
                </div>
              </form>
            )}
          </div>

          {/* RIGHT: Contact Details + Quick Cards */}
          <div className="flex-1 flex flex-col gap-8">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-green-900 mb-4">Contact Details</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-green-700" />
                  <a href={emailHref} className="text-base text-gray-800 hover:text-orange-600 transition-all">mskglobal26@gmail.com</a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-green-700" />
                  <a href={phoneHref} className="text-base text-gray-800 hover:text-orange-600 transition-all">+91 9232091060</a>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-green-700" />
                  <span className="text-base text-gray-800">India | UAE</span>
                </div>
                <div className="flex gap-3 mt-6">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-green-600 text-white font-semibold shadow hover:bg-green-700 transition-all text-base"
                  >
                    <MessageCircle className="w-5 h-5" /> WhatsApp
                  </a>
                  <a
                    href={phoneHref}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-orange-500 text-white font-semibold shadow hover:bg-orange-600 transition-all text-base md:hidden"
                  >
                    <Smartphone className="w-5 h-5" /> Call
                  </a>
                </div>
              </div>
            </div>
            {/* QUICK CONTACT CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Call Us */}
              <div className="bg-white rounded-xl shadow border border-gray-100 p-5 flex flex-col items-center text-center">
                <Phone className="w-7 h-7 text-orange-500 mb-2" />
                <div className="font-semibold text-green-900 mb-1">Call Us</div>
                <div className="text-gray-600 text-sm mb-2">+91 9232091060</div>
                <a href={phoneHref} className="px-4 py-2 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-all text-sm">Call Now</a>
              </div>
              {/* Mail Us */}
              <div className="bg-white rounded-xl shadow border border-gray-100 p-5 flex flex-col items-center text-center">
                <Mail className="w-7 h-7 text-green-700 mb-2" />
                <div className="font-semibold text-green-900 mb-1">Mail Us</div>
                <div className="text-gray-600 text-sm mb-2">mskglobal26@gmail.com</div>
                <a href={emailHref} className="px-4 py-2 rounded-full bg-green-600 text-white font-semibold hover:bg-green-700 transition-all text-sm">Mail Now</a>
              </div>
              {/* WhatsApp Us */}
              <div className="bg-white rounded-xl shadow border border-gray-100 p-5 flex flex-col items-center text-center">
                <MessageCircle className="w-7 h-7 text-green-700 mb-2" />
                <div className="font-semibold text-green-900 mb-1">WhatsApp Us</div>
                <div className="text-gray-600 text-sm mb-2">+91 9232091060</div>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-full bg-green-600 text-white font-semibold hover:bg-green-700 transition-all text-sm">Chat Now</a>
              </div>
            </div>
            {/* MAP (OPTIONAL) */}
            <div className="rounded-xl overflow-hidden shadow border border-gray-100 mt-4">
              <iframe
                title="MSK Global Trade Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.001234!2d77.1024901!3d28.5355161!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1d7e9c4e1b3b%3A0x7d1f1c1f1c1f1c1f!2sIndia!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
                width="100%"
                height="180"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-gradient-to-r from-green-700 via-emerald-600 to-green-900 py-10">
        <div className="max-w-2xl mx-auto px-4 sm:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Need bulk supply?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 rounded-full font-semibold bg-green-600 text-white shadow-lg hover:bg-green-700 transition-all text-lg group"
            >
              <MessageCircle className="mr-2 w-5 h-5" /> WhatsApp Now
            </a>
            <a
              href="#contact-form"
              className="inline-flex items-center justify-center px-8 py-3 rounded-full font-semibold bg-orange-500 text-white shadow-lg hover:bg-orange-600 transition-all text-lg group"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Get Quote <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
