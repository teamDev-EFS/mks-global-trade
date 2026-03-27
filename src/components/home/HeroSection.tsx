import React from 'react';
import Button from '../ui/Button';

const HeroSection: React.FC = () => {
  // Background image URL for farming and agro products
  const backgroundImage = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80';

  return (
    <section
      className="relative overflow-hidden rounded-[20px] bg-gradient-to-br from-emerald-900 via-forestGreen-900 to-emerald-800 text-white"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-emerald-900/80 to-emerald-800/90 mix-blend-multiply pointer-events-none" />
      <div className="relative max-w-[1240px] mx-auto px-6 sm:px-10 py-24 flex flex-col md:flex-row items-center gap-12">
        {/* Left content */}
        <div className="flex-1 max-w-xl">
          <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight tracking-tight mb-6 text-ivory-50 drop-shadow-lg">
            Premium Agro Exports
            <br />
            Trusted Worldwide
          </h1>
          <p className="text-lg sm:text-xl text-ivory-200 max-w-md mb-8 leading-relaxed">
            Delivering quality agricultural products to over 50 countries with bulk supply readiness and unmatched expertise.
          </p>
          <div className="flex gap-4">
            <Button
              variant="primary"
              className="shadow-lg px-8 py-4 text-lg font-semibold"
              onClick={() => {
                // Scroll to products or enquiry section
                const el = document.getElementById('products-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Explore Products
            </Button>
            <Button
              variant="secondary"
              className="px-8 py-4 text-lg font-semibold border-2 border-ivory-100 text-ivory-100 hover:bg-ivory-100 hover:text-emerald-900 transition-colors"
              onClick={() => {
                // Scroll to contact or enquiry
                const el = document.getElementById('contact-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Contact Us
            </Button>
          </div>
          {/* Floating trust badges */}
          <div className="mt-12 flex gap-6">
            <div className="flex items-center gap-3 bg-ivory-50 bg-opacity-20 backdrop-blur-sm rounded-xl px-4 py-2 shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-emerald-300"
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
              <span className="text-ivory-100 font-semibold text-lg">50+ Countries Served</span>
            </div>
            <div className="flex items-center gap-3 bg-ivory-50 bg-opacity-20 backdrop-blur-sm rounded-xl px-4 py-2 shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-emerald-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 10h1l1 2h13l1-2h1"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 16v2a2 2 0 01-2 2H8a2 2 0 01-2-2v-2"
                />
              </svg>
              <span className="text-ivory-100 font-semibold text-lg">Bulk Supply Ready</span>
            </div>
          </div>
        </div>

        {/* Right visual */}
        <div className="flex-1 max-w-lg relative">
          <img
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Global agro export trade map"
            className="rounded-[20px] shadow-2xl object-cover w-full h-full"
            loading="lazy"
          />
          <div className="absolute inset-0 rounded-[20px] bg-gradient-to-t from-transparent via-emerald-900/40 to-emerald-900/80 pointer-events-none" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
