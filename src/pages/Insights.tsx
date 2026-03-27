import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, BookOpen, Home, Sparkles } from 'lucide-react';
import Seo from '../components/seo/Seo';
import { getStaticPageMeta } from '../seo/pageMeta';
import { insightPosts } from '../data/insightsPosts';

/** Subtle grain overlay (SVG noise) for editorial depth — no external asset. */
const GrainOverlay = () => (
  <div
    className="pointer-events-none absolute inset-0 z-[1] opacity-[0.35] mix-blend-multiply"
    aria-hidden
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      backgroundSize: '200px 200px',
    }}
  />
);

const Insights: React.FC = () => {
  const meta = getStaticPageMeta('insights');
  const [featured, ...rest] = insightPosts;

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Seo {...meta} />

      {/* —— Page shell: warm ivory, gradients, radial light, grain —— */}
      <div className="fixed inset-0 -z-20 bg-[#f3ece3]" aria-hidden />
      <div
        className="fixed inset-0 -z-20 bg-gradient-to-b from-[#faf7f0] via-[#f5efe6] to-[#ebe3d6]"
        aria-hidden
      />
      <div
        className="fixed inset-0 -z-20 bg-[radial-gradient(ellipse_100%_60%_at_50%_0%,rgba(6,78,59,0.07),transparent_55%)]"
        aria-hidden
      />
      <div
        className="fixed inset-0 -z-20 bg-[radial-gradient(ellipse_60%_40%_at_100%_20%,rgba(180,130,90,0.06),transparent_50%)]"
        aria-hidden
      />
      <div className="fixed inset-0 -z-10 opacity-[0.4]">
        <GrainOverlay />
      </div>

      {/* —— Editorial hero —— */}
      <header className="relative border-b border-emerald-950/[0.08] shadow-[0_1px_0_rgba(255,255,255,0.06)_inset]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#022c1f] via-[#064e3b] to-[#042f2e]" aria-hidden />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_20%_-10%,rgba(251,191,36,0.12),transparent_50%)]"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_90%_100%,rgba(16,185,129,0.15),transparent_55%)]"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10" aria-hidden />
        <div className="absolute inset-0 opacity-[0.12] mix-blend-overlay">
          <GrainOverlay />
        </div>

        <div className="relative z-10 mx-auto max-w-[min(100%,1200px)] px-4 sm:px-6 lg:px-10 pt-8 pb-12 sm:pt-10 sm:pb-16 md:pt-12 md:pb-20">
          <nav
            className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-medium tracking-wide text-emerald-100/85"
            aria-label="Breadcrumb"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 rounded-md text-emerald-100/90 transition-colors hover:text-amber-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/80"
            >
              <Home className="h-3.5 w-3.5 shrink-0 opacity-90" aria-hidden />
              Home
            </Link>
            <span className="text-emerald-400/60" aria-hidden>
              /
            </span>
            <span className="text-amber-100/95">Insights</span>
          </nav>

          <p className="mb-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-200/90 sm:text-xs">
            <Sparkles className="h-3.5 w-3.5 text-amber-300/90" aria-hidden />
            Market intelligence · MSK Global Trade
          </p>

          <h1 className="max-w-3xl font-serif text-[2rem] font-semibold leading-[1.12] tracking-tight text-[#faf8f4] drop-shadow-sm sm:text-4xl md:text-5xl lg:text-[3.25rem]">
            Insights
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-emerald-50/90 sm:text-lg md:mt-8 md:text-[1.125rem] md:leading-[1.65]">
            Organic farming, export from India, and global demand for Indian agro products — practical briefings for
            buyers, partners, and trade teams.
          </p>

          <div className="mt-8 h-px w-24 bg-gradient-to-r from-amber-400/70 via-amber-200/40 to-transparent md:mt-10" aria-hidden />
        </div>
      </header>

      {/* —— Main: featured + list —— */}
      <main className="relative z-0">
        <div className="mx-auto max-w-[min(100%,1100px)] px-4 sm:px-6 lg:px-8">
          {/* Section intro strip */}
          <div className="relative -mt-6 mb-10 rounded-2xl border border-[#e8dfd2]/90 bg-gradient-to-br from-[#fffcf7]/95 via-[#faf6ef]/90 to-[#f3ebe0]/95 px-6 py-5 shadow-[0_4px_24px_-4px_rgba(28,25,23,0.08),0_0_0_1px_rgba(255,255,255,0.6)_inset] sm:-mt-8 sm:mb-14 sm:px-8 sm:py-6">
            <p className="text-center text-sm leading-relaxed text-stone-600 sm:text-[0.9375rem]">
              Executive notes on sourcing, compliance-minded supply, and long-term partnerships across{' '}
              <span className="font-medium text-emerald-900/90">India</span>,{' '}
              <span className="font-medium text-emerald-900/90">UAE &amp; GCC</span>, and{' '}
              <span className="font-medium text-emerald-900/90">global</span> markets.
            </p>
          </div>

          {featured ? (
            <article className="relative mb-12 sm:mb-16">
              <div className="absolute -left-3 top-6 hidden h-[calc(100%-3rem)] w-1 rounded-full bg-gradient-to-b from-emerald-700 via-emerald-600/80 to-amber-600/70 md:block" aria-hidden />
              <Link
                to={`/insights/${featured.slug}`}
                className="group relative block overflow-hidden rounded-3xl border border-[#ddd4c4]/90 bg-gradient-to-br from-white via-[#fffdfb] to-[#f7f0e6] p-8 shadow-[0_12px_40px_-12px_rgba(28,25,23,0.12),0_0_0_1px_rgba(255,255,255,0.9)_inset] transition-all duration-300 hover:-translate-y-1 hover:border-emerald-800/15 hover:shadow-[0_24px_48px_-16px_rgba(6,78,59,0.18)] sm:p-10 md:p-12"
              >
                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-emerald-600/[0.06] blur-3xl transition-opacity group-hover:opacity-100" aria-hidden />
                <div className="relative">
                  <div className="mb-4 flex flex-wrap items-center gap-3">
                    <span className="rounded-full border border-emerald-800/15 bg-emerald-50/80 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-900/90">
                      Featured
                    </span>
                    <span className="text-xs font-medium tracking-wide text-stone-500">
                      {featured.datePublished}
                      <span className="mx-2 text-stone-300">·</span>
                      {featured.readingTime}
                    </span>
                  </div>
                  <h2 className="font-serif text-2xl font-semibold leading-snug tracking-tight text-stone-900 transition-colors group-hover:text-emerald-950 sm:text-3xl md:text-[2rem] md:leading-tight">
                    {featured.title}
                  </h2>
                  <p className="mt-4 max-w-3xl text-base leading-relaxed text-stone-600 sm:text-lg">{featured.description}</p>
                  <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-emerald-900">
                    Read article
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-900 text-white shadow-md transition-transform duration-300 group-hover:translate-x-0.5 group-hover:bg-emerald-800">
                      <ArrowUpRight className="h-4 w-4" aria-hidden />
                    </span>
                  </span>
                </div>
              </Link>
            </article>
          ) : null}

          <div className="mb-10 flex items-end justify-between gap-4 border-b border-stone-200/80 pb-4">
            <div>
              <h2 className="font-serif text-xl font-semibold text-stone-900 sm:text-2xl">Latest briefings</h2>
              <p className="mt-1 text-sm text-stone-500">Curated updates for procurement and trade desks</p>
            </div>
          </div>

          <ul className="space-y-5 pb-6 sm:space-y-6 sm:pb-8">
            {rest.map((post) => (
              <li key={post.slug}>
                <Link
                  to={`/insights/${post.slug}`}
                  className="group relative flex flex-col gap-5 overflow-hidden rounded-2xl border border-[#e5dcd0] bg-gradient-to-br from-white/95 to-[#faf6ef]/80 p-6 shadow-[0_4px_20px_-6px_rgba(28,25,23,0.07)] transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-800/20 hover:shadow-[0_16px_40px_-12px_rgba(6,78,59,0.12)] sm:flex-row sm:items-stretch sm:justify-between sm:gap-8 sm:p-8"
                >
                  <div className="absolute left-0 top-0 h-full w-[3px] rounded-l-2xl bg-gradient-to-b from-emerald-700 via-emerald-600 to-amber-700/80 opacity-90" aria-hidden />
                  <div className="min-w-0 flex-1 pl-2 sm:pl-3">
                    <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-400">
                      {post.datePublished}
                      <span className="mx-2 font-normal text-stone-300">·</span>
                      {post.readingTime}
                    </p>
                    <h3 className="font-serif text-xl font-semibold leading-snug text-stone-900 transition-colors group-hover:text-emerald-950 sm:text-[1.35rem]">
                      {post.title}
                    </h3>
                    <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-stone-600 sm:text-[0.9375rem]">
                      {post.description}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center justify-end border-t border-stone-100/80 pt-4 sm:border-t-0 sm:border-l sm:border-stone-200/80 sm:pl-8 sm:pt-0">
                    <span className="inline-flex items-center gap-2 rounded-full border border-stone-200/90 bg-white/90 px-4 py-2.5 text-sm font-semibold text-emerald-900 shadow-sm transition-all duration-300 group-hover:border-emerald-800/25 group-hover:bg-emerald-50/90 group-hover:shadow-md">
                      Read
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* —— CTA band: grounded, intentional —— */}
        <section
          className="relative mt-4 border-t border-stone-200/90 bg-gradient-to-b from-[#ebe4d8]/80 via-[#e8dfd4] to-[#ddd2c4]/90 py-14 sm:py-16 md:py-20"
          aria-labelledby="insights-cta-heading"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(255,255,255,0.5),transparent_60%)]" aria-hidden />
          <div className="relative mx-auto max-w-[min(100%,960px)] px-4 sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-3xl border border-stone-300/40 bg-gradient-to-br from-[#1a3d32] via-[#0f2d26] to-[#0a1f1a] p-8 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.35)] sm:p-10 md:p-12">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" aria-hidden />
              <div className="absolute -bottom-16 left-1/4 h-40 w-40 rounded-full bg-amber-500/5 blur-2xl" aria-hidden />
              <div className="relative text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-300/90">Next step</p>
                <h2 id="insights-cta-heading" className="mt-3 font-serif text-2xl font-semibold text-[#faf8f4] sm:text-3xl">
                  Ready to align supply with your markets?
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-emerald-100/85 sm:text-base">
                  Explore export-grade products or speak with our team about bulk programmes, documentation, and
                  delivery corridors.
                </p>
                <div className="mt-10 flex flex-col items-stretch justify-center gap-4 sm:mt-12 sm:flex-row sm:items-center">
                  <Link
                    to="/products"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-8 py-3.5 text-sm font-semibold text-stone-950 shadow-lg shadow-amber-900/20 transition hover:from-amber-400 hover:to-amber-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f2d26]"
                  >
                    <BookOpen className="h-4 w-4" aria-hidden />
                    Explore export products
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-400/35 bg-emerald-950/40 px-8 py-3.5 text-sm font-semibold text-emerald-50 backdrop-blur-sm transition hover:border-emerald-300/50 hover:bg-emerald-900/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/80"
                  >
                    Enquire for bulk export
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Insights;
