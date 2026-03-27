import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone } from 'lucide-react';
import BrandLogo from '../brand/BrandLogo';

const footerLinks = [
  { to: '/products', label: 'Products' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/insights', label: 'Insights' },
  { to: '/contact', label: 'Contact' },
];

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-emerald-950 to-[#0a1f14] text-emerald-100/95 border-t border-emerald-800/40">
      <div className="max-w-[min(100%,1400px)] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 lg:justify-between">
          <div className="flex flex-col sm:flex-row sm:items-start gap-6 max-w-lg">
            <div className="bg-white rounded-xl p-3 shadow-md shrink-0 ring-1 ring-white/20">
              <BrandLogo className="h-12 sm:h-14 w-auto max-w-[180px]" alt="MSK Global Trade logo" />
            </div>
            <div>
              <p className="font-semibold text-white text-lg mb-2">MSK Global Trade</p>
              <p className="text-sm text-emerald-200/90 leading-relaxed">
                Premium agricultural exports from India — trusted quality, bulk supply, and global reach.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-16">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-400/90 mb-4">Explore</h3>
              <ul className="space-y-2.5">
                {footerLinks.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="text-sm hover:text-white transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-400/90 mb-4">Contact</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <Phone className="w-4 h-4 shrink-0 mt-0.5 text-orange-400" aria-hidden />
                  <a href="tel:+919232091060" className="hover:text-white transition-colors">
                    +91 92320 91060
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <Mail className="w-4 h-4 shrink-0 mt-0.5 text-orange-400" aria-hidden />
                  <a href="mailto:mskglobal26@gmail.com" className="hover:text-white transition-colors break-all">
                    mskglobal26@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-emerald-800/50 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-emerald-400/80">
          <p>&copy; {year} MSK Global Trade Pvt Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="text-emerald-500/50 cursor-not-allowed">Privacy Policy</span>
            <span className="text-emerald-500/50 cursor-not-allowed">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
