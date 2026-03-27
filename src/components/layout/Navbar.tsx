import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import MobileMenu from './MobileMenu';

const navLinks = [
  { to: '/products', label: 'Products' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-gray-100 shadow-md">
      <nav className="max-w-[1240px] mx-auto px-6 sm:px-10 flex items-center justify-between h-20">
        <Link to="/" className="flex items-center text-2xl font-extrabold text-green-800 tracking-tight">
          <span className="bg-gradient-to-r from-green-700 to-emerald-500 bg-clip-text text-transparent">MSK Global Trade</span>
        </Link>
        <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`relative px-4 py-2 font-medium text-gray-700 hover:text-green-800 transition-colors duration-200 ${location.pathname.startsWith(link.to) ? 'text-green-800' : ''}`}
            >
              <span className="inline-block">
                {link.label}
                <span className={`absolute left-0 -bottom-1 w-full h-0.5 bg-orange-500 rounded transition-all duration-300 ${location.pathname.startsWith(link.to) ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'} group-hover:opacity-100 group-hover:scale-x-100`}></span>
              </span>
            </Link>
          ))}
          <Link
            to="/contact"
            className="ml-4 px-6 py-2 rounded-full font-semibold bg-orange-500 text-white shadow-lg hover:bg-orange-600 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-orange-400"
          >
            Get Quote
          </Link>
        </div>
        <button
          className="md:hidden flex items-center justify-center p-2 rounded hover:bg-gray-100 focus:outline-none"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="w-7 h-7 text-green-800" />
        </button>
        <MobileMenu isOpen={mobileOpen} toggleMenu={() => setMobileOpen(false)} />
      </nav>
    </header>
  );
};

export default Navbar;
