import React from 'react';
import { Users, Globe, Package, CheckCircle, Clock, Network, ShieldCheck, Layers, Briefcase, MessageCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const partners = [
  {
    name: 'Kundan Patel',
    role: 'Partner',
    avatar: 'https://i.pravatar.cc/150?img=4',
  },
  {
    name: 'Shubham Patel',
    role: 'Partner',
    avatar: 'https://i.pravatar.cc/150?img=5',
  },
  {
    name: 'Mohit Choudhary',
    role: 'Partner',
    avatar: 'https://i.pravatar.cc/150?img=6',
  },
];

const whyChoose = [
  {
    icon: <Globe className="w-7 h-7 text-green-700" />, 
    title: 'Global Export Network',
    desc: 'Serving buyers across multiple continents with seamless export operations.'
  },
  {
    icon: <Package className="w-7 h-7 text-green-700" />, 
    title: 'Bulk Supply Capability',
    desc: 'Efficiently handling large-scale orders for international clients.'
  },
  {
    icon: <ShieldCheck className="w-7 h-7 text-green-700" />, 
    title: 'Quality Assurance',
    desc: 'Strict quality checks at every stage for consistent excellence.'
  },
  {
    icon: <Clock className="w-7 h-7 text-green-700" />, 
    title: 'Timely Delivery',
    desc: 'Reliable logistics and on-time shipments, every time.'
  },
  {
    icon: <Users className="w-7 h-7 text-green-700" />, 
    title: 'Trusted Supplier Network',
    desc: 'Strong relationships with vetted producers and suppliers.'
  },
];

const stats = [
  { label: 'Countries Served', value: '50+' },
  { label: 'Product Categories', value: '6+' },
  { label: 'Bulk Supply Capacity', value: '1000+ Tons/Year' },
  { label: 'Years of Experience', value: '10+' },
];

const whatsappUrl =
  'https://wa.me/919232091060?text=' +
  encodeURIComponent(
    `Hello MSK Global Trade,%0A%0AI would like to inquire about your export services. Please contact me with more details.%0A%0AThank you.`
  );

const About: React.FC = () => {
  return (
    <div className="bg-[#F8F6F3] min-h-screen">
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-green-700 via-emerald-600 to-green-900 min-h-[320px] flex items-center overflow-hidden border-b border-green-900/10">
        <div className="absolute inset-0 bg-[url('/organic-texture.png')] bg-repeat opacity-10 pointer-events-none" />
        <div className="max-w-[1200px] mx-auto w-full px-4 sm:px-8 py-16 md:py-24 relative z-10 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">About MSK Global Trade</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl">Your trusted partner for agro and natural product exports</p>
        </div>
      </section>

      {/* COMPANY INTRODUCTION */}
      <section className="py-12 bg-[#F8F6F3]">
        <div className="max-w-2xl mx-auto px-4 sm:px-8">
          <p className="text-lg text-gray-800 leading-relaxed text-center">
            <span className="font-semibold text-green-900">MSK Global Trade</span> is a merchant exporter specializing in high-quality agro and natural products. We serve global markets with a commitment to quality, reliability, and long-term partnerships. Our focus is on building trust with every shipment, ensuring our clients receive only the best products and service.
          </p>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-8 flex flex-col items-center text-center">
            <h3 className="text-xl font-bold text-green-900 mb-2">Our Mission</h3>
            <p className="text-gray-700 text-base">Deliver high-quality export products with consistency and trust.</p>
          </div>
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-8 flex flex-col items-center text-center">
            <h3 className="text-xl font-bold text-green-900 mb-2">Our Vision</h3>
            <p className="text-gray-700 text-base">Become a globally recognized export partner for agro and natural products.</p>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-green-900 mb-8 text-center">Why Choose MSK Global Trade?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {whyChoose.map((item, idx) => (
              <div key={item.title} className="flex flex-col items-center bg-white rounded-xl shadow p-6 min-h-[180px] hover:shadow-lg transition-all text-center border border-gray-100">
                <div className="mb-3">{item.icon}</div>
                <h4 className="font-semibold text-green-900 text-base mb-1">{item.title}</h4>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPANY STATS */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {stats.map((stat, idx) => (
              <div key={stat.label} className="flex flex-col items-center">
                <span className="text-4xl md:text-5xl font-extrabold text-emerald-600 mb-2">{stat.value}</span>
                <span className="text-gray-700 text-base font-medium">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS SECTION */}
      <section className="py-12 bg-[#F8F6F3]">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-green-900 mb-8 text-center">Our Partners</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {partners.map((partner) => (
              <div key={partner.name} className="bg-white rounded-xl shadow-md border border-gray-100 p-6 flex flex-col items-center text-center">
                <img
                  src={partner.avatar}
                  alt={partner.name}
                  className="w-20 h-20 rounded-full mb-4 border-2 border-emerald-100 shadow"
                />
                <h3 className="text-lg font-semibold text-green-900 mb-1">{partner.name}</h3>
                <span className="text-gray-500 text-sm">{partner.role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-gradient-to-r from-green-700 via-emerald-600 to-green-900 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Let’s build long-term business relationships</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-3 rounded-full font-semibold bg-orange-500 text-white shadow-lg hover:bg-orange-600 transition-all text-lg group"
            >
              Contact Us
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-3 rounded-full font-semibold border-2 border-white text-white hover:bg-white/10 hover:text-orange-400 transition-all text-lg"
            >
              Get Quote
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 rounded-full font-semibold bg-green-600 text-white shadow-lg hover:bg-green-700 transition-all text-lg group"
            >
              <MessageCircle className="mr-2 w-5 h-5" /> WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
