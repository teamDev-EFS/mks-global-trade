import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Shield, ArrowRight } from 'lucide-react';
import BrandLogo from '../brand/BrandLogo';
import MobileMenu from './MobileMenu';

const navLinks = [
  { to: '/products', label: 'Products' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/insights', label: 'Insights' },
  { to: '/contact', label: 'Contact' },
];

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-xl border-b border-stone-200/60 shadow-[0_1px_12px_-4px_rgba(15,61,46,0.08)]'
          : 'bg-white/80 backdrop-blur-md border-b border-transparent'
      }`}
    >
      <nav className="max-w-[min(100%,1400px)] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-[68px] md:h-[72px]">
        {/* Brand */}
        <Link
          to="/"
          className="flex items-center gap-3 min-w-0 shrink-0 group"
          aria-label="MSK Global Trade home"
        >
          <div className="rounded-xl bg-white p-1.5 shadow-sm ring-1 ring-stone-200/60 transition-shadow group-hover:shadow-md">
            <BrandLogo className="h-9 w-auto md:h-10 max-h-10 max-w-[120px] sm:max-w-[140px]" alt="" />
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-[1.1rem] md:text-xl font-extrabold tracking-tight text-[#0F3D2E] leading-tight">
              MSK Global Trade
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-emerald-600/70 leading-none">
              Premium Agricultural Exports
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to || (link.to !== '/' && location.pathname.startsWith(link.to));
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`relative px-3.5 lg:px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'text-[#0F3D2E] bg-emerald-50/80'
                    : 'text-stone-600 hover:text-[#0F3D2E] hover:bg-stone-50'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full bg-emerald-600" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/admin/login"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-stone-500 hover:text-emerald-800 hover:bg-stone-50 transition-all"
          >
            <Shield className="w-3.5 h-3.5" aria-hidden />
            Admin
          </Link>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-[#0F3D2E] to-[#1a5c3f] text-white shadow-md shadow-emerald-900/15 hover:shadow-lg hover:shadow-emerald-900/20 transition-all duration-300"
          >
            Get Quote
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl hover:bg-stone-100 transition-colors"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6 text-[#0F3D2E]" />
        </button>

        <MobileMenu isOpen={mobileOpen} toggleMenu={() => setMobileOpen(false)} />
      </nav>
    </header>
  );
};

export default Navbar;
