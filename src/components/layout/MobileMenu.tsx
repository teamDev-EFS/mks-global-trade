import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Shield, ArrowRight } from 'lucide-react';
import BrandLogo from '../brand/BrandLogo';

interface MobileMenuProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/insights', label: 'Insights' },
  { to: '/contact', label: 'Contact' },
];

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, toggleMenu }) => {
  const location = useLocation();

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-[#0F3D2E]/20 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={toggleMenu}
      />

      {/* Panel */}
      <div
        className={`absolute inset-y-0 left-0 w-full max-w-sm bg-white shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-5 py-4 border-b border-stone-100">
          <Link to="/" onClick={toggleMenu} className="flex items-center gap-2.5" aria-label="Home">
            <div className="rounded-lg bg-white p-1 shadow-sm ring-1 ring-stone-200/60">
              <BrandLogo className="h-9 w-auto max-w-[120px]" alt="" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-extrabold text-[#0F3D2E] leading-tight">MSK Global Trade</span>
              <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-emerald-600/70">Premium Exports</span>
            </div>
          </Link>
          <button
            onClick={toggleMenu}
            className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-stone-100 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-6 h-6 text-stone-500" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col p-5 gap-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={toggleMenu}
                className={`px-4 py-3 rounded-xl text-base font-semibold transition-all duration-200 ${
                  isActive
                    ? 'text-[#0F3D2E] bg-emerald-50'
                    : 'text-stone-600 hover:text-[#0F3D2E] hover:bg-stone-50'
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <div className="mt-4 pt-4 border-t border-stone-100 space-y-3">
            <Link
              to="/admin/login"
              onClick={toggleMenu}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-stone-500 hover:bg-stone-50 transition-colors"
            >
              <Shield className="w-4 h-4" aria-hidden />
              Admin Login
            </Link>
            <Link
              to="/contact"
              onClick={toggleMenu}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-[#0F3D2E] to-[#1a5c3f] text-white shadow-md"
            >
              Get Quote
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;
