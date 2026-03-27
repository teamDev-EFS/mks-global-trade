import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export type BreadcrumbItem = { label: string; to?: string };

type PageHeroProps = {
  /** Root section id for deep linking (e.g. services sections). */
  id?: string;
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  /** Optional extra content below subtitle (e.g. CTA) */
  children?: React.ReactNode;
  /** Visual variant */
  variant?: 'gradient' | 'gradient-map';
  className?: string;
};

const PageHero: React.FC<PageHeroProps> = ({
  id,
  title,
  subtitle,
  breadcrumbs,
  children,
  variant = 'gradient',
  className = '',
}) => {
  const bg =
    variant === 'gradient-map'
      ? "bg-[url('/hero-world-map.png')] bg-cover bg-center opacity-10"
      : "bg-[url('/organic-texture.png')] bg-repeat opacity-10";

  return (
    <section
      id={id}
      className={`relative bg-gradient-to-br from-green-700 via-emerald-600 to-green-900 min-h-[200px] sm:min-h-[240px] flex items-center overflow-hidden border-b border-green-900/10 ${className}`}
      aria-labelledby="page-hero-title"
    >
      <div className={`absolute inset-0 pointer-events-none ${bg}`} aria-hidden />
      <div className="max-w-[min(100%,1320px)] mx-auto w-full px-4 sm:px-8 py-10 md:py-14 relative z-10">
        {breadcrumbs && breadcrumbs.length > 0 ? (
          <nav className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-white/80 mb-4" aria-label="Breadcrumb">
            <Link to="/" className="inline-flex items-center hover:text-orange-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 rounded">
              <Home className="w-4 h-4 mr-1 shrink-0" aria-hidden />
              Home
            </Link>
            {breadcrumbs.map((crumb, i) => (
              <React.Fragment key={`${crumb.label}-${i}`}>
                <span className="text-white/50" aria-hidden>
                  /
                </span>
                {crumb.to ? (
                  <Link to={crumb.to} className="hover:text-orange-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 rounded">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-orange-200 font-semibold">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        ) : null}
        <h1 id="page-hero-title" className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-2 drop-shadow-lg">
          {title}
        </h1>
        {subtitle ? <p className="text-lg text-white/90 max-w-2xl leading-relaxed">{subtitle}</p> : null}
        {children}
      </div>
    </section>
  );
};

export default PageHero;
