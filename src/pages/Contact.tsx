import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

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

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) newErrors.email = 'Mail is required';
    else if (!/^[\w-.]+@[\w-]+\.[a-z]{2,}$/i.test(form.email)) newErrors.email = 'Invalid email';
    if (!form.phone.trim()) newErrors.phone = 'Phone is required';
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const message = `Hello MSK Global Trade,%0A%0AI would like to inquire about your products with the following details:%0A- Name: ${form.name}%0A- Mail: ${form.email}%0A- Phone: ${form.phone}%0A- Product: ${form.product || 'N/A'}%0A- Quantity: ${form.quantity || 'N/A'}%0A- Location: ${form.location || 'N/A'}%0A- Message: ${form.message || 'N/A'}%0A%0APlease get back to me at your earliest convenience.`;

    const url = `https://wa.me/919232091060?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-ivory-50 min-h-screen py-16 px-6 sm:px-10">
      <div className="max-w-[1240px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Left: Contact Form */}
        <div className="bg-white rounded-[20px] p-12 shadow-lg">
          <h2 className="text-4xl font-extrabold text-deepGreen-900 mb-10">Contact Us</h2>
          <form className="space-y-8" onSubmit={handleSubmit} noValidate>
            <Input
              label="Name"
              name="name"
              type="text"
              placeholder="Your full name"
              value={form.name}
              onChange={handleChange}
              required
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && <p className="text-red-600 text-sm -mt-6 mb-4">{errors.name}</p>}

            <Input
              label="Mail"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && <p className="text-red-600 text-sm -mt-6 mb-4">{errors.email}</p>}

            <Input
              label="Phone"
              name="phone"
              type="tel"
              placeholder="+91 92320 91060"
              value={form.phone}
              onChange={handleChange}
              required
              className={errors.phone ? 'border-red-500' : ''}
            />
            {errors.phone && <p className="text-red-600 text-sm -mt-6 mb-4">{errors.phone}</p>}

            <Input
              label="Product"
              name="product"
              type="text"
              placeholder="Product of interest"
              value={form.product}
              onChange={handleChange}
            />

            <Input
              label="Quantity"
              name="quantity"
              type="text"
              placeholder="Estimated quantity"
              value={form.quantity}
              onChange={handleChange}
            />

            <Input
              label="Location"
              name="location"
              type="text"
              placeholder="Your location"
              value={form.location}
              onChange={handleChange}
            />

            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-semibold text-deepGreen-900 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Write your message here..."
                value={form.message}
                onChange={handleChange}
                className="w-full rounded-lg border border-ivory-300 bg-ivory-100 px-4 py-3 text-deepGreen-900 placeholder-deepGreen-400 focus:outline-none focus:ring-2 focus:ring-deepGreen-600 transition-shadow shadow-inner resize-none"
              />
            </div>

            <Button type="submit" variant="primary" className="w-full py-4 text-lg font-semibold">
              Send Message
            </Button>
          </form>
        </div>

        {/* Right: Contact Details + WhatsApp */}
        <div className="flex flex-col justify-center space-y-10">
          <div className="bg-white rounded-[20px] p-10 shadow-lg">
            <h3 className="text-2xl font-bold text-deepGreen-900 mb-6">Contact Details</h3>
            <p className="text-deepGreen-800 mb-3">MSK Global Trade Pvt Ltd</p>
            <p className="text-deepGreen-800 mb-3">123 Export Lane, Trade City, India</p>
            <p className="text-deepGreen-800 mb-3">Phone: +91 92320 91060</p>
            <p className="text-deepGreen-800 mb-3">Mail: mskglobal26@gmail.com</p>
          </div>
          <div className="bg-white rounded-[20px] p-10 shadow-lg flex items-center space-x-5">
            <MessageSquare className="w-12 h-12 text-orange-500 flex-shrink-0" />
            <div>
              <h4 className="text-xl font-semibold text-deepGreen-900">WhatsApp Us</h4>
              <p className="text-deepGreen-800">Chat with our export specialists for quick assistance.</p>
              <button
                onClick={() => {
                  const url = 'https://wa.me/919232091060';
                  window.open(url, '_blank', 'noopener,noreferrer');
                }}
                className="mt-4 inline-block px-6 py-3 rounded-full bg-orange-500 text-white font-semibold shadow hover:bg-orange-600 transition-colors"
                type="button"
              >
                Start Chat
              </button>
            </div>
          </div>
          <div className="bg-white rounded-[20px] p-10 shadow-lg">
            <h3 className="text-2xl font-bold text-deepGreen-900 mb-6">Service Regions</h3>
            <p className="text-deepGreen-800">We proudly serve clients across India and UAE.</p>
            <div className="mt-6 grid grid-cols-2 gap-6">
              <div className="bg-ivory-100 rounded-lg p-6 text-center text-deepGreen-900 font-semibold shadow-inner">
                India
              </div>
              <div className="bg-ivory-100 rounded-lg p-6 text-center text-deepGreen-900 font-semibold shadow-inner">
                UAE
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
