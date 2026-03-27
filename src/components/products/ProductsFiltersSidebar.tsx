import React from 'react';
import ProductsFiltersForm from './ProductsFiltersForm';

export type ProductsFiltersSidebarProps = React.ComponentProps<typeof ProductsFiltersForm>;

const ProductsFiltersSidebar: React.FC<ProductsFiltersSidebarProps> = (props) => {
  return <ProductsFiltersForm {...props} idPrefix="d-pf" />;
};

export default ProductsFiltersSidebar;
