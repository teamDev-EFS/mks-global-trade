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

const Products: React.FC = () => {
  // Filter/sort/search state
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [variant, setVariant] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [availability, setAvailability] = useState('');
  const [region, setRegion] = useState('');
  const [sort, setSort] = useState('Default');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [inquiryDrawerOpen, setInquiryDrawerOpen] = useState(false);
  const { inquiryList } = useInquiryList();

  // Filtering logic
  const filteredProducts = useMemo(() => {
    let filtered = allProducts;
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.variants.some((v) => v.toLowerCase().includes(q))
      );
    }
    if (category && category !== 'All') {
      filtered = filtered.filter((p) => p.category === category);
    }
    if (variant) {
      filtered = filtered.filter((p) => p.variants.includes(variant));
    }
    if (tags.length > 0) {
      filtered = filtered.filter((p) => tags.every((tag) => p.tags.includes(tag)));
    }
    if (availability) {
      if (availability === 'Bulk Supply Available') {
        filtered = filtered.filter((p) => p.tags.includes('Bulk Available') || p.tags.includes('Bulk Supply') || p.availability.toLowerCase().includes('bulk'));
      } else {
        filtered = filtered.filter((p) => p.availability === availability);
      }
    }
    if (region) {
      filtered = filtered.filter((p) => p.exportMarkets.includes(region));
    }
    // Sort
    switch (sort) {
      case 'Product Name A-Z':
        filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'Product Name Z-A':
        filtered = [...filtered].sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'Category':
        filtered = [...filtered].sort((a, b) => a.category.localeCompare(b.category));
        break;
      case 'Export Priority':
        filtered = [...filtered].sort((a, b) => a.inquiryPriority - b.inquiryPriority);
        break;
      case 'Newest':
        filtered = [...filtered].sort((a, b) => Number(b.id) - Number(a.id));
        break;
      case 'Popular Inquiry':
        filtered = [...filtered].sort((a, b) => a.inquiryPriority - b.inquiryPriority);
        break;
      default:
        break;
    }
    return filtered;
  }, [search, category, variant, tags, availability, region, sort]);

  // Handlers
  const handleClearFilters = () => {
    setSearch('');
    setCategory('All');
    setVariant('');
    setTags([]);
    setAvailability('');
    setRegion('');
    setSort('Default');
  };

  // Sticky Inquiry List Button
  React.useEffect(() => {
    if (inquiryDrawerOpen && inquiryList.length === 0) {
      setInquiryDrawerOpen(false);
    }
  }, [inquiryList.length, inquiryDrawerOpen]);

  return (
    <div className="bg-[#F8F6F3] min-h-screen relative">
      <ProductsHero />
      <div className="max-w-[1320px] mx-auto px-4 sm:px-8 py-6">
        <ProductsToolbar
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          variant={variant}
          setVariant={setVariant}
          sort={sort}
          setSort={setSort}
          view={view}
          setView={setView}
          productCount={filteredProducts.length}
          onOpenFilters={() => setFiltersOpen(true)}
          onClearFilters={handleClearFilters}
          tags={tags}
          setTags={setTags}
        />
        <div className="flex gap-8 mt-6">
          {/* Sidebar (desktop) */}
          <div className="hidden lg:block w-72 flex-shrink-0">
            <ProductsFiltersSidebar
              search={search}
              setSearch={setSearch}
              category={category}
              setCategory={setCategory}
              variant={variant}
              setVariant={setVariant}
              tags={tags}
              setTags={setTags}
              availability={availability}
              setAvailability={setAvailability}
              region={region}
              setRegion={setRegion}
              onClearFilters={handleClearFilters}
            />
          </div>
          {/* Main content */}
          <div className="flex-1 min-w-0">
            {filteredProducts.length === 0 ? (
              <EmptyProductsState onReset={handleClearFilters} />
            ) : (
              <ProductGrid
                products={filteredProducts}
                view={view}
                onQuickView={setQuickViewProduct}
              />
            )}
          </div>
        </div>
        {/* Mobile filters drawer */}
        {filtersOpen && (
          <div className="fixed inset-0 z-50 bg-black/40 flex lg:hidden" onClick={() => setFiltersOpen(false)}>
            <div className="bg-white w-80 max-w-full h-full shadow-xl p-6" onClick={e => e.stopPropagation()}>
              <ProductsFiltersSidebar
                search={search}
                setSearch={setSearch}
                category={category}
                setCategory={setCategory}
                variant={variant}
                setVariant={setVariant}
                tags={tags}
                setTags={setTags}
                availability={availability}
                setAvailability={setAvailability}
                region={region}
                setRegion={setRegion}
                onClearFilters={handleClearFilters}
              />
              <button className="mt-4 w-full bg-orange-500 text-white py-2 rounded-lg font-semibold" onClick={() => setFiltersOpen(false)}>Apply Filters</button>
            </div>
          </div>
        )}
        {/* Inquiry List Drawer */}
        <InquiryListDrawer open={inquiryDrawerOpen} onClose={() => setInquiryDrawerOpen(false)} />
        {/* Quick View Modal */}
        <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
        {/* Sticky Inquiry List Button */}
        {inquiryList.length > 0 && (
          <button
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-full bg-orange-500 text-white font-semibold shadow-lg hover:bg-orange-600 transition-all text-base"
            onClick={() => setInquiryDrawerOpen(true)}
            aria-label="Open Inquiry List"
          >
            Inquiry List <span className="ml-2 bg-white text-orange-600 rounded-full px-2 py-0.5 text-xs font-bold">{inquiryList.length}</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Products;
