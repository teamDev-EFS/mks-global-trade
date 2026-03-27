import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const links = [
  { to: '/services/export-solutions', label: 'Overview' },
  { to: '/services/core-services', label: 'Core Services' },
  { to: '/services/regions', label: 'Regions' },
  { to: '/services/export-process', label: 'Process' },
  { to: '/services/why-services', label: 'Why Us' },
  { to: '/services/services-cta', label: 'Get in Touch' },
] as const;

const ServicesJumpNav: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="sticky top-[68px] md:top-[72px] z-30 bg-white/95 backdrop-blur-md border-b border-stone-200/60 shadow-sm hidden md:block" aria-label="On this page">
      <div className="max-w-[min(100%,1280px)] mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="flex gap-1 py-2.5 overflow-x-auto">
          {links.map((l) => {
            const active = location.pathname === l.to || location.pathname.startsWith(l.to + '/');
            return (
              <li key={l.to} className="shrink-0">
                <Link to={l.to} className={`inline-block px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${active ? 'bg-emerald-50 text-[#0F3D2E]' : 'text-stone-500 hover:text-[#0F3D2E] hover:bg-stone-50'}`}>
                  {l.label}
                  {active && <span className="block w-full h-0.5 bg-emerald-600 rounded-full mt-0.5" />}
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
