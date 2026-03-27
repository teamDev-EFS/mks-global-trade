import React from 'react';
import ProductCard from '../products/ProductCard';
import { products } from '../../data/products';

const FeaturedProducts: React.FC = () => {
  return (
    <section className="py-16 bg-[#F8F6F3]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
        <h2 className="text-3xl font-bold text-green-900 mb-8 text-left">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.slice(0, 6).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
