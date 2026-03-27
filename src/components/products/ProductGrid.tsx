import React from 'react';
import { Product } from '../../types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  onQuickView: (product: Product) => void;
  view: 'grid' | 'list';
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onQuickView, view }) => {
  if (view === 'list') {
    return (
      <div className="space-y-6">
        {products.map((product) => (
          <div key={product.id} className="">
            <ProductCard product={product} onQuickView={onQuickView} />
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onQuickView={onQuickView} />
      ))}
    </div>
  );
};

export default ProductGrid;
