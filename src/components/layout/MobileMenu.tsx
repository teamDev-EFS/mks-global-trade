import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Shield } from 'lucide-react';
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
      className={`fixed inset-0 z-50 bg-white/95 backdrop-blur transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
    >
      <div className="flex justify-between items-center p-4 border-b gap-3">
        <Link to="/" onClick={toggleMenu} className="flex items-center shrink-0" aria-label="Home">
          <BrandLogo className="h-10 w-auto max-w-[140px] rounded-md" alt="" />
        </Link>
        <button onClick={toggleMenu} className="focus:outline-none p-2 rounded hover:bg-gray-100">
          <X className="w-7 h-7 text-gray-700" />
        </button>
      </div>
      <nav className="flex flex-col p-6 space-y-4">
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            onClick={toggleMenu}
            className={`text-lg font-medium px-2 py-2 rounded transition-colors duration-200 ${location.pathname === link.to ? 'text-orange-600' : 'text-green-800 hover:text-orange-600'}`}
          >
            {link.label}
          </Link>
        ))}
        <Link
          to="/admin/login"
          onClick={toggleMenu}
          className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-emerald-900 border border-emerald-800/25 hover:bg-emerald-50"
        >
          <Shield className="w-4 h-4" aria-hidden />
          Admin login
        </Link>
        <Link
          to="/contact"
          onClick={toggleMenu}
          className="mt-4 px-5 py-2 rounded-full font-semibold bg-orange-500 text-white shadow-md hover:bg-orange-600 transition-all duration-200"
        >
          Get Quote
        </Link>
      </nav>
    </div>
  );
};

export default MobileMenu;
