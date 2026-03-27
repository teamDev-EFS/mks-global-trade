import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const HeroSection: React.FC = () => {
  const backgroundImage =
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80';

  return (
    <section
      className="relative overflow-hidden text-white"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-emerald-900/85 to-emerald-800/95 mix-blend-multiply pointer-events-none" />
      <div className="relative max-w-[min(100%,1400px)] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 md:py-16 lg:py-20 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
        <div className="flex-1 min-w-0 max-w-xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-4 sm:mb-5 text-ivory-50 drop-shadow-lg">
            Premium Agro Exports
            <br />
            Trusted Worldwide
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-ivory-200 max-w-2xl mb-6 sm:mb-8 leading-relaxed">
            Delivering quality agricultural products to over 50 countries with bulk supply readiness and unmatched expertise.
          </p>
          <div className="flex flex-wrap gap-3 sm:gap-4">
            <Link to="/products" className="inline-flex">
              <Button
                as="span"
                variant="primary"
                className="shadow-lg px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold"
              >
                Explore Products
              </Button>
            </Link>
            <Link to="/contact" className="inline-flex">
              <Button
                as="span"
                variant="secondary"
                className="px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold border-2 border-ivory-100 text-ivory-100 hover:bg-ivory-100 hover:text-emerald-900 transition-colors"
              >
                Contact Us
              </Button>
            </Link>
          </div>
          <div className="mt-8 sm:mt-10 flex flex-wrap gap-3 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3 bg-ivory-50/15 backdrop-blur-sm rounded-xl px-3 sm:px-4 py-2 shadow-md max-w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 sm:h-8 sm:w-8 text-emerald-300 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8c-1.657 0-3 1.343-3 3 0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.657-1.343-3-3-3z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 2v2m0 16v2m8-10h2M2 12H4m14.364-7.364l1.414 1.414M4.222 19.778l1.414-1.414m12.728 0l-1.414-1.414M6.636 6.636L5.222 5.222"
                />
              </svg>
              <span className="text-ivory-100 font-semibold text-sm sm:text-base">50+ Countries Served</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 bg-ivory-50/15 backdrop-blur-sm rounded-xl px-3 sm:px-4 py-2 shadow-md max-w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 sm:h-8 sm:w-8 text-emerald-300 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h1l1 2h13l1-2h1" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 16v2a2 2 0 01-2 2H8a2 2 0 01-2-2v-2" />
              </svg>
              <span className="text-ivory-100 font-semibold text-sm sm:text-base">Bulk Supply Ready</span>
            </div>
          </div>
        </div>

        <div className="flex-1 w-full max-w-lg lg:max-w-xl">
          <img
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Global agro export trade"
            className="rounded-2xl shadow-2xl object-cover w-full aspect-[4/3] sm:aspect-auto sm:h-80 object-center"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
