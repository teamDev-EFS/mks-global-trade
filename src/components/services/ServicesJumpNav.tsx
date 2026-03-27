import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const links = [
  { to: '/services/export-solutions', label: 'Overview' },
  { to: '/services/core-services', label: 'Core services' },
  { to: '/services/regions', label: 'Regions' },
  { to: '/services/export-process', label: 'Process' },
  { to: '/services/why-services', label: 'Why us' },
  { to: '/services/services-cta', label: 'Get in touch' },
] as const;

const ServicesJumpNav: React.FC = () => {
  const location = useLocation();

  return (
    <nav
      className="sticky top-16 z-30 bg-white/95 backdrop-blur border-b border-gray-200/80 shadow-sm hidden md:block"
      aria-label="On this page"
    >
      <div className="max-w-[min(100%,1200px)] mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="flex gap-1 sm:gap-4 py-2 overflow-x-auto">
          {links.map((l) => {
            const active = location.pathname === l.to || location.pathname.startsWith(l.to + '/');
            return (
              <li key={l.to} className="shrink-0">
                <Link
                  to={l.to}
                  className={`inline-block px-3 py-1.5 rounded-lg text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 ${
                    active ? 'bg-emerald-50 text-orange-700' : 'text-emerald-900 hover:bg-emerald-50 hover:text-orange-700'
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default ServicesJumpNav;
