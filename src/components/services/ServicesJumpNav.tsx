import React from 'react';

const links = [
  { href: '#core-services', label: 'Core services' },
  { href: '#regions', label: 'Regions' },
  { href: '#export-process', label: 'Process' },
  { href: '#why-services', label: 'Why us' },
  { href: '#services-cta', label: 'Get in touch' },
] as const;

const ServicesJumpNav: React.FC = () => {
  return (
    <nav
      className="sticky top-16 z-30 bg-white/95 backdrop-blur border-b border-gray-200/80 shadow-sm hidden md:block"
      aria-label="On this page"
    >
      <div className="max-w-[min(100%,1200px)] mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="flex gap-1 sm:gap-4 py-2 overflow-x-auto">
          {links.map((l) => (
            <li key={l.href} className="shrink-0">
              <a
                href={l.href}
                className="inline-block px-3 py-1.5 rounded-lg text-sm font-medium text-emerald-900 hover:bg-emerald-50 hover:text-orange-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default ServicesJumpNav;
