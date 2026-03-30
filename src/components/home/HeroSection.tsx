import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  ArrowRight,
  Globe2,
  ShieldCheck,
  TrendingUp,
  Leaf,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import productImageOnion from '../../assets/Onion.webp';

/* ── Carousel slides — agriculture, export, spices, logistics ── */
const SLIDES = [
  {
    src: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1200&q=85",
    alt: "Golden wheat fields at sunrise representing premium Indian agricultural exports",
    caption: "Premium Agricultural Sourcing",
    sub: "Direct from India's finest farmlands",
  },
  {
    src: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1200&q=85",
    alt: "Colorful Indian spices in market showcasing export-grade spice varieties",
    caption: "Export-Grade Indian Spices",
    sub: "Aromatic, lab-tested, globally certified",
  },
  {
    src: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=85",
    alt: "Shipping containers at international port for global agricultural trade",
    caption: "Global Logistics Network",
    sub: "Reliable delivery to 50+ countries",
  },
  {
    src: productImageOnion,
    alt: "Organic farming and sustainable agriculture practices in India",
    caption: "Sustainable & Organic",
    sub: "Eco-friendly farming at scale",
  },
  {
    src: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1200&q=85",
    alt: "Modern warehouse with export-ready packaged agricultural products",
    caption: "Export-Ready Packaging",
    sub: "Hygienic processing & custom labeling",
  },
] as const;

const INTERVAL_MS = 5000;

const trustItems = [
  { icon: ShieldCheck, label: "Export Quality Certified" },
  { icon: Leaf, label: "Sustainable Sourcing" },
  { icon: TrendingUp, label: "Bulk Supply Ready" },
];

const HeroSection: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback(
    (idx: number) => {
      setDirection(idx > current ? 1 : -1);
      setCurrent(idx);
    },
    [current],
  );

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c + 1) % SLIDES.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  // Auto-advance
  useEffect(() => {
    const id = window.setInterval(next, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [next]);

  const slide = SLIDES[current];

  return (
    <section className="relative isolate min-h-[min(94vh,960px)] overflow-hidden text-white flex items-center">
      {/* ── Background — crossfade carousel behind everything ── */}
      <div className="absolute inset-0" aria-hidden>
        <AnimatePresence mode="popLayout">
          <motion.img
            key={current}
            src={slide.src}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1.03 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            fetchPriority={current === 0 ? "high" : undefined}
            decoding="async"
          />
        </AnimatePresence>

        {/* Overlays */}
        <div className="absolute inset-0 bg-[#061f14]/88" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#061f14]/95 via-[#061f14]/70 to-[#061f14]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#061f14]/70 via-transparent to-[#061f14]/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_70%_at_15%_50%,rgba(30,127,92,0.15),transparent_70%)]" />
        {/* Noise */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      {/* ── Decorative geometry ── */}
      <div
        className="absolute top-[10%] right-[8%] w-[400px] h-[400px] border border-emerald-400/[0.04] rounded-full"
        aria-hidden
      />
      <div
        className="absolute top-[15%] right-[12%] w-[300px] h-[300px] border border-emerald-400/[0.03] rounded-full"
        aria-hidden
      />
      <div
        className="absolute bottom-[15%] left-[5%] w-[200px] h-[200px] border border-emerald-400/[0.03] rounded-full"
        aria-hidden
      />

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto w-full max-w-[min(100%,1400px)] px-4 py-20 sm:px-6 sm:py-24 md:py-28 lg:px-8 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ── Left column ── */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2.5 rounded-full bg-white/[0.06] border border-white/[0.08] backdrop-blur-sm px-4 py-2"
            >
              <Globe2 className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200/70">
                India &middot; UAE &middot; Worldwide
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-[2rem] font-extrabold leading-[1.08] tracking-tight sm:text-[2.75rem] md:text-[3.25rem] lg:text-[3.75rem]"
            >
              <span className="text-white">MSK Global Trade</span>
              <br />
              <span className="bg-gradient-to-r from-emerald-300 via-green-200 to-emerald-400 bg-clip-text text-transparent">
                Premium Agricultural
              </span>
              <br />
              <span className="text-white/90">Export Solutions.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 max-w-lg text-[1.05rem] leading-relaxed text-emerald-100/55 sm:text-lg"
            >
              Delivering export-grade agricultural products with reliable bulk
              supply, global logistics, and unmatched consistency — trusted by
              buyers across 50+ countries.
            </motion.p>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 w-20 h-[2px] bg-gradient-to-r from-emerald-500 to-emerald-400/50 origin-left"
            />

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Link
                to="/contact"
                className="group inline-flex min-h-[52px] items-center justify-center rounded-xl bg-white px-8 py-3.5 text-[0.95rem] font-bold text-[#0F3D2E] shadow-[0_4px_24px_-4px_rgba(255,255,255,0.15)] transition-all hover:shadow-[0_8px_32px_-4px_rgba(255,255,255,0.2)] hover:bg-emerald-50 active:scale-[0.98]"
              >
                Get a Quote
                <ArrowRight className="ml-2.5 w-[18px] h-[18px] transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/products"
                className="inline-flex min-h-[52px] items-center justify-center rounded-xl border border-white/15 bg-white/[0.05] backdrop-blur-sm px-8 py-3.5 text-[0.95rem] font-semibold text-white/90 transition-all hover:bg-white/10 hover:border-white/25"
              >
                Explore Products
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-10 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-3"
            >
              {trustItems.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.03] px-3.5 py-2 text-[13px] font-medium text-emerald-100/60"
                >
                  <Icon
                    className="w-4 h-4 shrink-0 text-emerald-400/70"
                    aria-hidden
                  />
                  {label}
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right column — Image carousel ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="flex flex-col items-center lg:items-end"
          >
            <div className="w-full max-w-[520px]">
              {/* Carousel frame */}
              <div className="relative rounded-2xl border border-white/[0.1] bg-white/[0.04] backdrop-blur-md p-2 shadow-[0_8px_60px_-16px_rgba(0,0,0,0.4)] overflow-hidden">
                {/* Image viewport */}
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-emerald-950/50">
                  <AnimatePresence mode="popLayout" custom={direction}>
                    <motion.img
                      key={current}
                      src={slide.src}
                      alt={slide.alt}
                      custom={direction}
                      initial={{ opacity: 0, x: direction * 40, scale: 1.05 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: direction * -40, scale: 0.98 }}
                      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading={current === 0 ? "eager" : "lazy"}
                      decoding="async"
                    />
                  </AnimatePresence>

                  {/* Gradient overlay on image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {/* Caption on image */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={current}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.4 }}
                      >
                        <p className="text-white font-bold text-sm sm:text-base">
                          {slide.caption}
                        </p>
                        <p className="text-white/60 text-xs sm:text-sm">
                          {slide.sub}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Nav arrows */}
                  <button
                    type="button"
                    onClick={prev}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-black/30 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-black/50 transition-all"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-black/30 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-black/50 transition-all"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Bottom bar — dots + counter */}
                <div className="flex items-center justify-between px-3 pt-3 pb-1">
                  {/* Dots */}
                  <div className="flex gap-1.5">
                    {SLIDES.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => goTo(i)}
                        aria-label={`Go to slide ${i + 1}`}
                        className={`h-1.5 rounded-full transition-all duration-500 ${i === current
                          ? "w-6 bg-emerald-400"
                          : "w-1.5 bg-white/20 hover:bg-white/40"
                          }`}
                      />
                    ))}
                  </div>
                  {/* Counter */}
                  <span className="text-[11px] font-medium text-white/30 tabular-nums">
                    {String(current + 1).padStart(2, "0")} /{" "}
                    {String(SLIDES.length).padStart(2, "0")}
                  </span>
                </div>
              </div>

              {/* Stats row below carousel */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-5 grid grid-cols-3 gap-3"
              >
                {[
                  { value: "50+", label: "Countries" },
                  { value: "1000+", label: "Tons/Year" },
                  { value: "10+", label: "Years" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="text-center rounded-xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm py-3 px-2"
                  >
                    <div className="text-lg sm:text-xl font-extrabold text-emerald-300">
                      {stat.value}
                    </div>
                    <div className="text-[10px] font-medium text-white/35 uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#FAF7F2] to-transparent z-20"
        aria-hidden
      />
    </section>
  );
};

export default HeroSection;
