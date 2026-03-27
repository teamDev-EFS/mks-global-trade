import React from 'react';
import { Product } from '../../types';
import { InquiryListItem } from '../../store/useInquiryList';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  inquiryList: InquiryListItem[];
  addProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
  openQuickView: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  inquiryList,
  addProduct,
  removeProduct,
  openQuickView,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          inquiryList={inquiryList}
          addProduct={addProduct}
          removeProduct={removeProduct}
          openQuickView={openQuickView}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
