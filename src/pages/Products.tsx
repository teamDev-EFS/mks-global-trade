import React, { useState } from 'react';
import { products as allProducts } from '../data/products';
import ProductsHero from '../components/products/ProductsHero';
import ProductsToolbar from '../components/products/ProductsToolbar';
import ProductsFiltersSidebar from '../components/products/ProductsFiltersSidebar';
import ProductsMobileFiltersDrawer from '../components/products/ProductsMobileFiltersDrawer';
import ProductGrid from '../components/products/ProductGrid';
import InquiryListDrawer from '../components/products/InquiryListDrawer';
import QuickViewModal from '../components/products/QuickViewModal';
import EmptyProductsState from '../components/products/EmptyProductsState';
import { useInquiryList } from '../store/useInquiryList';
import ProductEnquiryModal from '../components/products/ProductEnquiryModal';
import { submitPublicEnquiry } from '../lib/publicEnquiryApi';
import { toast } from 'react-toastify';
import { useProductCatalogFilters } from '../hooks/useProductCatalogFilters';
import Seo from '../components/seo/Seo';
import { getStaticPageMeta } from '../seo/pageMeta';
import { trackWhatsAppClick } from '../lib/analytics';

const Products: React.FC = () => {
  const productsMeta = getStaticPageMeta('products');
  const {
    search, setSearch, categoryFilter, setCategoryFilter,
    variantFilter, setVariantFilter, tagFilter, setTagFilter,
    sortKey, setSortKey, filteredProducts, clearFilters, activeFilterCount,
  } = useProductCatalogFilters(allProducts);

  const { inquiryList, addProduct, removeProduct, clearList } = useInquiryList();
  const [quickViewProduct, setQuickViewProduct] = useState<(typeof allProducts)[number] | null>(null);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const handleEnquirySubmit = async (details: {
    name: string; email: string; phone: string; quantity: string; location: string; message: string;
  }) => {
    try {
      await submitPublicEnquiry({
        sourceType: 'inquiry_list',
        customerName: details.name.trim(),
        email: details.email.trim(),
        phone: details.phone.trim(),
        whatsappNumber: details.phone.trim(),
        location: details.location.trim(),
        message: details.message.trim(),
        products: inquiryList.length > 0
          ? inquiryList.map((item) => ({
              productId: item.product.id, productName: item.product.name,
              category: item.product.category, variant: item.variant, quantity: item.quantity,
            }))
          : [],
      });
      toast.success('Enquiry saved');
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Could not save enquiry');
      return;
    }

    const lines = inquiryList.length > 0
      ? inquiryList.map((item) => `- ${item.product.name} (${item.product.category})${item.variant ? ` · ${item.variant}` : ''}`).join('\n')
      : '';
    const text = inquiryList.length > 0
      ? `Hello MSK Global Trade,\n\nI am interested in these products:\n${lines}\n\nQuantity: ${details.quantity}\nLocation: ${details.location}\n\nName: ${details.name}\nEmail: ${details.email}\nPhone: ${details.phone}\n\nMessage: ${details.message || 'N/A'}\n\nThank you.`
      : `Hello MSK Global Trade,\n\nGeneral product enquiry.\n\nQuantity: ${details.quantity}\nLocation: ${details.location}\n\nName: ${details.name}\nEmail: ${details.email}\nPhone: ${details.phone}\n\nMessage: ${details.message || 'N/A'}\n\nThank you.`;

    trackWhatsAppClick('products_inquiry_list', { product_count: String(inquiryList.length) });
    window.open(`https://wa.me/919232091060?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
    setEnquiryOpen(false);
  };

  const filterFormProps = {
    search, setSearch, categoryFilter, setCategoryFilter,
    variantFilter, setVariantFilter, tagFilter, setTagFilter, onClear: clearFilters,
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Seo {...productsMeta} />
      <ProductsHero />

      <main
        id="main-content"
        className="max-w-[min(100%,1400px)] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-6 md:gap-8"
        tabIndex={-1}
      >
        {/* Sidebar */}
        <aside
          className="hidden md:block w-full md:w-64 bg-white rounded-2xl p-5 shadow-sm border border-stone-200/60 sticky top-24 self-start"
          aria-label="Product filters"
        >
          <ProductsFiltersSidebar {...filterFormProps} />
        </aside>

        {/* Main content */}
        <section
          className={`flex-1 flex flex-col min-w-0 ${inquiryList.length > 0 ? 'pb-24 sm:pb-20' : ''}`}
          aria-labelledby="products-heading"
        >
          <h2 id="products-heading" className="sr-only">Product catalogue</h2>

          <ProductsToolbar
            sortKey={sortKey}
            setSortKey={setSortKey}
            inquiryCount={inquiryList.length}
            resultCount={filteredProducts.length}
            totalCount={allProducts.length}
            onOpenMobileFilters={() => setMobileFiltersOpen(true)}
            activeFilterCount={activeFilterCount}
          />

          {filteredProducts.length === 0 ? (
            <EmptyProductsState onReset={clearFilters} />
          ) : (
            <ProductGrid
              products={filteredProducts}
              inquiryList={inquiryList}
              addProduct={addProduct}
              removeProduct={removeProduct}
              openQuickView={setQuickViewProduct}
            />
          )}
        </section>
      </main>

      <ProductsMobileFiltersDrawer open={mobileFiltersOpen} onClose={() => setMobileFiltersOpen(false)} {...filterFormProps} />
      <InquiryListDrawer inquiryList={inquiryList} clearList={clearList} openEnquiryModal={() => setEnquiryOpen(true)} />
      {quickViewProduct && <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />}
      {enquiryOpen && <ProductEnquiryModal product={null} inquiryList={inquiryList} onClose={() => setEnquiryOpen(false)} onSubmit={handleEnquirySubmit} />}
    </div>
  );
};

export default Products;
