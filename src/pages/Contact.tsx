import React from 'react';
import { Whatsapp } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const Contact: React.FC = () => {
  return (
    <div className="bg-ivory-50 min-h-screen py-12 px-6 sm:px-10">
      <div className="max-w-[1240px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left: Contact Form */}
        <div className="bg-white rounded-[20px] p-10 shadow-lg">
          <h2 className="text-3xl font-extrabold text-deepGreen-900 mb-8">Contact Us</h2>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <Input label="Name" name="name" type="text" placeholder="Your full name" required />
            <Input label="Mail" name="email" type="email" placeholder="you@example.com" required />
            <Input label="Phone" name="phone" type="tel" placeholder="+1 234 567 890" required />
            <Input label="Product" name="product" type="text" placeholder="Product of interest" />
            <Input label="Quantity" name="quantity" type="text" placeholder="Estimated quantity" />
            <Input label="Location" name="location" type="text" placeholder="Your location" />
            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-semibold text-deepGreen-900 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Write your message here..."
                className="w-full rounded-lg border border-ivory-300 bg-ivory-100 px-4 py-3 text-deepGreen-900 placeholder-deepGreen-400 focus:outline-none focus:ring-2 focus:ring-deepGreen-600 transition-shadow shadow-inner resize-none"
              />
            </div>
            <Button type="submit" variant="primary" className="w-full py-3 text-lg font-semibold">
              Send Message
            </Button>
          </form>
        </div>

        {/* Right: Contact Details + WhatsApp */}
        <div className="flex flex-col justify-center space-y-8">
          <div className="bg-white rounded-[20px] p-8 shadow-lg">
            <h3 className="text-xl font-bold text-deepGreen-900 mb-4">Contact Details</h3>
            <p className="text-deepGreen-800 mb-2">MSK Global Trade Pvt Ltd</p>
            <p className="text-deepGreen-800 mb-2">123 Export Lane, Trade City, India</p>
            <p className="text-deepGreen-800 mb-2">Phone: +91 98765 43210</p>
            <p className="text-deepGreen-800 mb-2">Mail: info@mskglobaltrade.com</p>
          </div>
          <div className="bg-white rounded-[20px] p-8 shadow-lg flex items-center space-x-4">
            <Whatsapp className="w-10 h-10 text-orange-500" />
            <div>
              <h4 className="text-lg font-semibold text-deepGreen-900">WhatsApp Us</h4>
              <p className="text-deepGreen-800">Chat with our export specialists for quick assistance.</p>
              <a
                href="https://wa.me/919876543210?text=Hello%20MSK%20Global%20Trade,%20I%20would%20like%20to%20inquire%20about%20your%20products."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 px-5 py-2 rounded-full bg-orange-500 text-white font-semibold shadow hover:bg-orange-600 transition-colors"
              >
                Start Chat
              </a>
            </div>
          </div>
          <div className="bg-white rounded-[20px] p-8 shadow-lg">
            <h3 className="text-xl font-bold text-deepGreen-900 mb-4">Service Regions</h3>
            <p className="text-deepGreen-800">We proudly serve clients across India, UAE, and global export markets.</p>
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="bg-ivory-100 rounded-lg p-4 text-center text-deepGreen-900 font-semibold shadow-inner">
                India
              </div>
              <div className="bg-ivory-100 rounded-lg p-4 text-center text-deepGreen-900 font-semibold shadow-inner">
                UAE
              </div>
              <div className="bg-ivory-100 rounded-lg p-4 text-center text-deepGreen-900 font-semibold shadow-inner">
                Global Export
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
