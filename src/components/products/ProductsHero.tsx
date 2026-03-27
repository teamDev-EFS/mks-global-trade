import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const ProductsHero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-green-700 via-emerald-600 to-green-900 min-h-[220px] flex items-center overflow-hidden border-b border-green-900/10">
      <div className="absolute inset-0 bg-[url('/organic-texture.png')] bg-repeat opacity-10 pointer-events-none" />
      <div className="max-w-[1320px] mx-auto w-full px-4 sm:px-8 py-12 md:py-16 relative z-10">
        <nav className="flex items-center text-sm text-white/80 mb-4 gap-2">
          <Link to="/" className="flex items-center hover:text-orange-400"><Home className="w-4 h-4 mr-1" /> Home</Link>
          <span className="mx-2">/</span>
          <span className="text-orange-200 font-semibold">Products</span>
        </nav>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2 drop-shadow-lg">Our Products</h1>
        <p className="text-lg text-white/90 max-w-2xl">Explore our export-quality agro, food, spice, and natural products for bulk international supply.</p>
      </div>
    </section>
  );
};

export default ProductsHero;
