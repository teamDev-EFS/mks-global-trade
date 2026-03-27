import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowRight, Leaf } from 'lucide-react';
import BrandLogo from '../brand/BrandLogo';

const navCols = [
  {
    title: 'Company',
    links: [
      { to: '/about', label: 'About Us' },
      { to: '/services', label: 'Services' },
      { to: '/insights', label: 'Insights' },
      { to: '/contact', label: 'Contact' },
    ],
  },
  {
    title: 'Products',
    links: [
      { to: '/products', label: 'All Products' },
      { to: '/products/vermicompost', label: 'Vermicompost' },
      { to: '/products/jaggery', label: 'Jaggery' },
      { to: '/products/indian-spices', label: 'Indian Spices' },
    ],
  },
];

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-[#071f15] text-emerald-100/90 overflow-hidden">
      {/* Subtle top border gradient */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />

      {/* Radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/[0.04] rounded-full blur-[100px]" />

      <div className="relative max-w-[min(100%,1400px)] mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-14">
          {/* Brand column */}
          <div className="lg:col-span-4">
            <Link to="/" className="inline-flex items-center gap-3 group mb-5">
              <div className="rounded-xl bg-white p-2 shadow-md ring-1 ring-white/10">
                <BrandLogo className="h-11 w-auto max-w-[160px]" alt="MSK Global Trade logo" />
              </div>
            </Link>
            <div className="mb-4">
              <h3 className="text-xl font-bold text-white mb-1">MSK Global Trade</h3>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-emerald-400/60">Premium Agricultural Exports</p>
            </div>
            <p className="text-sm text-emerald-200/60 leading-relaxed max-w-sm mb-6">
              Connecting India's finest agricultural produce with global markets through quality, sustainability, and trusted partnerships built to endure.
            </p>
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/8 border border-emerald-400/10 w-fit">
              <Leaf className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-medium text-emerald-300/80">Sustainable Sourcing Partner</span>
            </div>
          </div>

          {/* Nav columns */}
          {navCols.map((col) => (
            <div key={col.title} className="lg:col-span-2">
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400/70 mb-5">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="group text-sm text-emerald-200/70 hover:text-white transition-colors inline-flex items-center gap-1.5"
                    >
                      {l.label}
                      <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact column */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400/70 mb-5">Get in Touch</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-4 h-4 text-emerald-400" aria-hidden />
                </div>
                <div>
                  <div className="text-xs text-emerald-400/50 font-medium mb-0.5">Phone</div>
                  <a href="tel:+919232091060" className="text-emerald-100/80 hover:text-white transition-colors">
                    +91 92320 91060
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-4 h-4 text-emerald-400" aria-hidden />
                </div>
                <div>
                  <div className="text-xs text-emerald-400/50 font-medium mb-0.5">Email</div>
                  <a href="mailto:mskglobal26@gmail.com" className="text-emerald-100/80 hover:text-white transition-colors break-all">
                    mskglobal26@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-emerald-400" aria-hidden />
                </div>
                <div>
                  <div className="text-xs text-emerald-400/50 font-medium mb-0.5">Location</div>
                  <span className="text-emerald-100/80">India</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-emerald-800/30 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-emerald-500/50">
            &copy; {year} MSK Global Trade Pvt Ltd. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs">
            <span className="text-emerald-600/30 cursor-not-allowed">Privacy Policy</span>
            <span className="text-emerald-600/30 cursor-not-allowed">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
