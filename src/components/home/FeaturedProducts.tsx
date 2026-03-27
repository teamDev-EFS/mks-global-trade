import React from 'react';
import ProductCard from '../products/ProductCard';
import { products } from '../../data/products';

const FeaturedProducts: React.FC = () => {
  return (
    <section id="products-section" className="py-6 sm:py-8 rounded-2xl bg-[#F8F6F3] px-4 sm:px-8 border border-gray-100/50">
      <h2 className="text-2xl sm:text-3xl font-bold text-green-900 mb-6 sm:mb-8 text-left">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
        {products.slice(0, 6).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
