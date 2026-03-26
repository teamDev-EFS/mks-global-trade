import React, { useState, useMemo } from 'react';
import { products as allProducts } from '../data/products';
import { Product } from '../types';
import ProductsHero from '../components/products/ProductsHero';
import ProductsToolbar from '../components/products/ProductsToolbar';
import ProductsFiltersSidebar from '../components/products/ProductsFiltersSidebar';
import ProductGrid from '../components/products/ProductGrid';
import InquiryListDrawer from '../components/products/InquiryListDrawer';
import QuickViewModal from '../components/products/QuickViewModal';
import EmptyProductsState from '../components/products/EmptyProductsState';
import { useInquiryList } from '../store/useInquiryList';
import ProductEnquiryModal from '../components/products/ProductEnquiryModal';

const Products: React.FC = () => {
  // Filter/sort/search state
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [variantFilter, setVariantFilter] = useState<string | null>(null);
  const [tagFilter, setTagFilter] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<'name' | 'inquiryPriority'>('inquiryPriority');

  // Inquiry list state
  const { inquiryList, addProduct, removeProduct, clearList } = useInquiryList();

  // Quick view modal
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Product enquiry modal
  const [enquiryProduct, setEnquiryProduct] = useState<Product | null>(null);
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = allProducts;
    if (search.trim()) {
      const lower = search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(lower) ||
          p.category.toLowerCase().includes(lower) ||
          p.tags.some((tag) => tag.toLowerCase().includes(lower))
      );
    }
    if (categoryFilter) {
      filtered = filtered.filter((p) => p.category === categoryFilter);
    }
    if (variantFilter) {
      filtered = filtered.filter((p) => p.variants.includes(variantFilter));
    }
    if (tagFilter) {
      filtered = filtered.filter((p) => p.tags.includes(tagFilter));
    }
    if (sortKey === 'name') {
      filtered = filtered.slice().sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortKey === 'inquiryPriority') {
      filtered = filtered.slice().sort((a, b) => a.inquiryPriority - b.inquiryPriority);
    }
    return filtered;
  }, [search, categoryFilter, variantFilter, tagFilter, sortKey]);

  const openEnquiryModal = (product: Product) => {
    setEnquiryProduct(product);
    setEnquiryOpen(true);
  };

  return (
    <div className="bg-ivory-50 min-h-screen py-12 px-6 sm:px-10">
      <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 bg-white rounded-[20px] p-6 shadow-lg sticky top-24 self-start">
          <ProductsFiltersSidebar
            search={search}
            setSearch={setSearch}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            variantFilter={variantFilter}
            setVariantFilter={setVariantFilter}
            tagFilter={tagFilter}
            setTagFilter={setTagFilter}
          />
        </aside>

        {/* Main content */}
        <section className="flex-1 flex flex-col">
          <ProductsToolbar
            sortKey={sortKey}
            setSortKey={setSortKey}
            inquiryCount={inquiryList.length}
          />

          {filteredProducts.length === 0 ? (
            <EmptyProductsState />
          ) : (
            <ProductGrid
              products={filteredProducts}
              inquiryList={inquiryList}
              addProduct={addProduct}
              removeProduct={removeProduct}
              openQuickView={setQuickViewProduct}
              openEnquiryModal={openEnquiryModal}
            />
          )}
        </section>
      </div>

      {/* Inquiry List Drawer */}
      <InquiryListDrawer
        inquiryList={inquiryList}
        removeProduct={removeProduct}
        clearList={clearList}
        openEnquiryModal={() => {
          setEnquiryProduct(null); // null means inquiry list flow
          setEnquiryOpen(true);
        }}
      />

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          openEnquiryModal={openEnquiryModal}
        />
      )}

      {/* Product Enquiry Modal */}
      {enquiryOpen && (
        <ProductEnquiryModal
          product={enquiryProduct}
          inquiryList={inquiryList}
          onClose={() => setEnquiryOpen(false)}
        />
      )}
    </div>
  );
};

export default Products;
