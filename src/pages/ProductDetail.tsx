import React, { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, Plus, Package, MapPin, CheckCircle2 } from 'lucide-react';
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
        <Seo title="Product not found | MSK Global Trade" description="This product may have been removed." keywords={notFoundMeta.keywords} path="/products" noindex />
        <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 bg-[#FAF7F2]">
          <div className="w-16 h-16 rounded-2xl bg-stone-100 flex items-center justify-center mb-5">
            <Package className="w-8 h-8 text-stone-400" />
          </div>
          <h1 className="text-2xl font-bold text-stone-900 mb-2">Product not found</h1>
          <p className="text-stone-500 mb-6 text-center max-w-md text-sm">This product may have been removed or the link is incorrect.</p>
          <Link to="/products" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0F3D2E] text-white text-sm font-semibold hover:bg-[#0d3526] transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to products
          </Link>
        </div>
      </>
    );
  }

  if (slug && slug !== product.slug) return <Navigate to={`/products/${product.slug}`} replace />;

  const meta = buildProductMeta(product);
  const faqs = getProductFaqs(product.slug);
  const img = product.image || `/images/products/${product.slug}.jpg`;
  const inList = isInInquiryList(product.id, variant);
  const imgAlt = productImageAlt(product);

  const handleWhatsAppSubmit = async (userDetails: {
    name: string; email: string; phone: string; quantity: string; location: string; message: string;
  }) => {
    try {
      await submitPublicEnquiry({
        sourceType: 'product_modal',
        customerName: userDetails.name.trim(), email: userDetails.email.trim(),
        phone: userDetails.phone.trim(), whatsappNumber: userDetails.phone.trim(),
        location: userDetails.location.trim(), message: userDetails.message.trim(),
        products: [{ productId: product.id, productName: product.name, category: product.category, variant, quantity: userDetails.quantity }],
      });
      toast.success('Enquiry saved — we will contact you shortly');
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Could not save enquiry');
      return;
    }
    trackProductEnquiry(product.slug, 'product_detail_modal');
    trackWhatsAppClick('product_detail_enquiry', { product_slug: product.slug });
    const message = `Hello MSK Global Trade,\n\nI am interested in: ${product.name}\nCategory: ${product.category}\nVariant: ${variant}\nQuantity: ${userDetails.quantity}\nLocation: ${userDetails.location}\n\nName: ${userDetails.name}\nEmail: ${userDetails.email}\nPhone: ${userDetails.phone}\nMessage: ${userDetails.message || 'N/A'}\n\nThank you.`;
    window.open(`https://wa.me/919232091060?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    setEnquiryOpen(false);
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen pb-12">
      <Seo {...meta} ogImage={product.image} type="product" />
      <ProductJsonLd product={product} />
      <FaqJsonLd faqs={faqs} />
      <BreadcrumbJsonLd items={[{ name: 'Home', path: '/' }, { name: 'Products', path: '/products' }, { name: product.name, path: meta.path }]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0a2e1f] via-[#0F3D2E] to-[#1a5c3f] py-14 md:py-18">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
        <div className="relative max-w-[min(100%,1100px)] mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-emerald-300/60 mb-4">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <span>/</span>
            <Link to="/products" className="hover:text-white transition-colors">Products</Link>
            <span>/</span>
            <span className="text-white font-medium">{product.name}</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{product.name}</h1>
          <p className="text-emerald-100/60 max-w-2xl">{product.shortDescription}</p>
        </div>
      </section>

      {/* Content */}
      <article className="max-w-[min(100%,1100px)] mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        <div className="bg-white rounded-2xl shadow-[0_4px_32px_-8px_rgba(15,61,46,0.1)] border border-stone-200/60 overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0 md:gap-8">
            <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[320px] bg-stone-50">
              <img src={img} alt={imgAlt} className="w-full h-full object-cover" loading="eager" fetchPriority="high" decoding="async" />
            </div>
            <div className="p-6 sm:p-8 flex flex-col">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
                  <Package className="w-3.5 h-3.5" /> {product.category}
                </span>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg border ${product.availability === 'In Stock' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100'}`}>
                  {product.availability}
                </span>
              </div>

              {product.variants.length > 0 && product.variants[0] !== 'N/A' && (
                <div className="mb-4">
                  <label htmlFor="product-variant" className="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1.5">Variant</label>
                  <select id="product-variant" className="w-full max-w-xs px-3.5 py-2.5 rounded-lg border border-stone-200 bg-stone-50 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all" value={variant} onChange={(e) => setVariant(e.target.value)}>
                    {product.variants.map((v) => <option key={v} value={v}>{v}</option>)}
                  </select>
                </div>
              )}

              <p className="text-stone-600 leading-relaxed mb-6 text-sm">{product.description}</p>

              <ul className="space-y-2 mb-6">
                {product.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-sm text-stone-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" aria-hidden /> {h}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {product.tags.map((tag) => (
                  <span key={tag} className="text-xs font-medium px-2.5 py-1 rounded-lg bg-stone-50 text-stone-500 border border-stone-200">{tag}</span>
                ))}
              </div>

              <div className="grid sm:grid-cols-2 gap-3 text-sm text-stone-500 mb-6 border-t border-stone-100 pt-4">
                <div>
                  <span className="font-semibold text-stone-700">Packing</span>
                  <p>{product.packing}</p>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" aria-hidden />
                  <div>
                    <span className="font-semibold text-stone-700">Export markets</span>
                    <p>{product.exportMarkets.join(', ')}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2.5 mt-auto w-full max-w-md">
                <Button variant="primary" className="inline-flex items-center justify-center gap-2 w-full sm:w-auto min-h-[44px]" disabled={inList} onClick={() => !inList && addToInquiryList(product, variant)}>
                  <Plus className="w-4 h-4" /> {inList ? 'In inquiry list' : 'Add to inquiry list'}
                </Button>
                <WhatsAppActionButton className="w-full sm:w-auto min-h-[44px]" onClick={() => setEnquiryOpen(true)}>
                  WhatsApp enquiry
                </WhatsAppActionButton>
                <Link to="/products" className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-stone-600 hover:bg-stone-50 border border-stone-200 w-full sm:w-auto transition-colors">
                  <ArrowLeft className="w-4 h-4" /> All products
                </Link>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-8 bg-white rounded-2xl border border-stone-200/60 shadow-sm p-6 sm:p-8">
          <h2 className="text-xl font-bold text-[#0F3D2E] mb-3">Bulk Export &amp; Sourcing</h2>
          <p className="text-stone-600 leading-relaxed mb-4 text-sm">
            MSK Global Trade supplies export-grade {product.name} from India to the UAE, GCC, and worldwide. Learn how we{' '}
            <Link to="/services/export-process" className="text-emerald-700 font-semibold hover:text-emerald-900">manage export and logistics</Link>,
            explore our <Link to="/services" className="text-emerald-700 font-semibold hover:text-emerald-900">full agricultural export services</Link>,
            or <Link to="/contact" className="text-emerald-700 font-semibold hover:text-emerald-900">enquire for bulk export</Link> with your volume and destination.
          </p>
          <Link to="/contact" className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-[#0F3D2E] text-white text-sm font-semibold hover:bg-[#0d3526] transition-colors">
            Enquire for Bulk Export
          </Link>
        </section>
      </article>

      <FaqSection id="product-faq" title={`${product.name} export — common questions`} faqs={faqs} />
      {enquiryOpen && <ProductEnquiryModal product={product} inquiryList={[]} onClose={() => setEnquiryOpen(false)} onSubmit={handleWhatsAppSubmit} />}
    </div>
  );
}
