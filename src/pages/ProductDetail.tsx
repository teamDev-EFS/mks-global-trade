import React, { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, Plus, Package, MapPin, CheckCircle2 } from 'lucide-react';
import PageHero from '../components/layout/PageHero';
import { getProductBySlugOrId } from '../lib/products';
import { useInquiryList } from '../store/useInquiryList';
import Button from '../components/ui/Button';
import { WhatsAppActionButton } from '../components/ui/WhatsAppActionButton';
import ProductEnquiryModal from '../components/products/ProductEnquiryModal';
import { submitPublicEnquiry } from '../lib/publicEnquiryApi';
import { toast } from 'react-toastify';
import Seo from '../components/seo/Seo';
import FaqSection from '../components/seo/FaqSection';
import { BreadcrumbJsonLd, FaqJsonLd, ProductJsonLd } from '../components/seo/JsonLd';
import { buildProductMeta, getStaticPageMeta, productImageAlt } from '../seo/pageMeta';
import { getProductFaqs } from '../seo/productSeo';
import { trackProductEnquiry, trackWhatsAppClick } from '../lib/analytics';

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlugOrId(slug);
  const { isInInquiryList, addToInquiryList } = useInquiryList();
  const [variant, setVariant] = useState(product?.variants[0] ?? 'N/A');
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  useEffect(() => {
    if (product) setVariant(product.variants[0] ?? 'N/A');
  }, [product]);

  if (!product) {
    const notFoundMeta = getStaticPageMeta('products');
    return (
      <>
        <Seo
          title="Product not found | MSK Global Trade"
          description="This product may have been removed. Browse our export catalogue for vermicompost, spices, jaggery and more."
          keywords={notFoundMeta.keywords}
          path="/products"
          noindex
        />
        <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 bg-[#F8F6F3]">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Product not found</h1>
          <p className="text-gray-600 mb-6 text-center max-w-md">
            This product may have been removed or the link is incorrect.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to products
          </Link>
        </div>
      </>
    );
  }

  if (slug && slug !== product.slug) {
    return <Navigate to={`/products/${product.slug}`} replace />;
  }

  const meta = buildProductMeta(product);
  const faqs = getProductFaqs(product.slug);
  const img = product.image || `/images/products/${product.slug}.jpg`;
  const inList = isInInquiryList(product.id, variant);
  const imgAlt = productImageAlt(product);

  const handleWhatsAppSubmit = async (userDetails: {
    name: string;
    email: string;
    phone: string;
    quantity: string;
    location: string;
    message: string;
  }) => {
    try {
      await submitPublicEnquiry({
        sourceType: 'product_modal',
        customerName: userDetails.name.trim(),
        email: userDetails.email.trim(),
        phone: userDetails.phone.trim(),
        whatsappNumber: userDetails.phone.trim(),
        location: userDetails.location.trim(),
        message: userDetails.message.trim(),
        products: [
          {
            productId: product.id,
            productName: product.name,
            category: product.category,
            variant,
            quantity: userDetails.quantity,
          },
        ],
      });
      toast.success('Enquiry saved — we will contact you shortly');
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Could not save enquiry');
      return;
    }
    trackProductEnquiry(product.slug, 'product_detail_modal');
    trackWhatsAppClick('product_detail_enquiry', { product_slug: product.slug });
    const message =
      `Hello MSK Global Trade,\n\nI am interested in: ${product.name}\n` +
      `Category: ${product.category}\nVariant: ${variant}\n` +
      `Quantity: ${userDetails.quantity}\nLocation: ${userDetails.location}\n\n` +
      `Name: ${userDetails.name}\nEmail: ${userDetails.email}\nPhone: ${userDetails.phone}\n` +
      `Message: ${userDetails.message || 'N/A'}\n\nThank you.`;
    window.open(`https://wa.me/919232091060?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    setEnquiryOpen(false);
  };

  return (
    <div className="bg-[#F8F6F3] min-h-screen pb-12">
      <Seo {...meta} ogImage={product.image} type="product" />
      <ProductJsonLd product={product} />
      <FaqJsonLd faqs={faqs} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', path: '/' },
          { name: 'Products', path: '/products' },
          { name: product.name, path: meta.path },
        ]}
      />

      <PageHero
        variant="gradient"
        title={product.name}
        subtitle={product.shortDescription}
        breadcrumbs={[
          { label: 'Products', to: '/products' },
          { label: product.name },
        ]}
      />

      <article className="max-w-[min(100%,1100px)] mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0 md:gap-8">
            <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[320px] bg-gray-100">
              <img
                src={img}
                alt={imgAlt}
                className="w-full h-full object-cover"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </div>
            <div className="p-6 sm:p-8 flex flex-col">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-emerald-800 bg-emerald-50 px-2 py-1 rounded">
                  <Package className="w-3.5 h-3.5" />
                  {product.category}
                </span>
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded ${
                    product.availability === 'In Stock'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-amber-100 text-amber-900'
                  }`}
                >
                  {product.availability}
                </span>
              </div>

              {product.variants.length > 0 && product.variants[0] !== 'N/A' ? (
                <div className="mb-4">
                  <label htmlFor="product-variant" className="block text-sm font-medium text-gray-700 mb-1">
                    Variant
                  </label>
                  <select
                    id="product-variant"
                    className="w-full max-w-xs px-3 py-2 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-emerald-500"
                    value={variant}
                    onChange={(e) => setVariant(e.target.value)}
                  >
                    {product.variants.map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </select>
                </div>
              ) : null}

              <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>

              <ul className="space-y-2 mb-6">
                {product.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-sm text-gray-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" aria-hidden />
                    {h}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2 mb-4">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="grid sm:grid-cols-2 gap-3 text-sm text-gray-600 mb-6 border-t border-gray-100 pt-4">
                <div>
                  <span className="font-semibold text-gray-900">Packing</span>
                  <p>{product.packing}</p>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" aria-hidden />
                  <div>
                    <span className="font-semibold text-gray-900">Export markets</span>
                    <p>{product.exportMarkets.join(', ')}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2.5 mt-auto w-full max-w-md">
                <Button
                  variant="primary"
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto min-h-[44px]"
                  disabled={inList}
                  onClick={() => !inList && addToInquiryList(product, variant)}
                >
                  <Plus className="w-4 h-4" />
                  {inList ? 'In inquiry list' : 'Add to inquiry list'}
                </Button>
                <WhatsAppActionButton className="w-full sm:w-auto min-h-[44px]" onClick={() => setEnquiryOpen(true)}>
                  WhatsApp enquiry
                </WhatsAppActionButton>
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-emerald-900 hover:bg-emerald-50 border border-emerald-800/20 w-full sm:w-auto"
                >
                  <ArrowLeft className="w-4 h-4" />
                  All products
                </Link>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-8 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8" aria-labelledby="export-links-heading">
          <h2 id="export-links-heading" className="text-xl font-bold text-emerald-950 mb-3">
            Bulk export &amp; sourcing
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            MSK Global Trade supplies export-grade {product.name} from India to the UAE, GCC, and worldwide. Learn how we{' '}
            <Link to="/services/export-process" className="text-orange-700 font-semibold hover:underline">
              manage export and logistics
            </Link>
            , explore our{' '}
            <Link to="/services" className="text-orange-700 font-semibold hover:underline">
              full agricultural export services
            </Link>
            , or{' '}
            <Link to="/contact" className="text-orange-700 font-semibold hover:underline">
              enquire for bulk export
            </Link>{' '}
            with your volume and destination.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-orange-500 text-white font-semibold text-sm hover:bg-orange-600 transition-colors"
          >
            Enquire for bulk export
          </Link>
        </section>
      </article>

      <FaqSection id="product-faq" title={`${product.name} export — common questions`} faqs={faqs} />

      {enquiryOpen && (
        <ProductEnquiryModal
          product={product}
          inquiryList={[]}
          onClose={() => setEnquiryOpen(false)}
          onSubmit={handleWhatsAppSubmit}
        />
      )}
    </div>
  );
}
