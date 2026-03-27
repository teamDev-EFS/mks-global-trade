import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Plus, Package, MapPin, CheckCircle2 } from 'lucide-react';
import PageHero from '../components/layout/PageHero';
import { getProductBySlugOrId } from '../lib/products';
import { useInquiryList } from '../store/useInquiryList';
import Button from '../components/ui/Button';
import { WhatsAppActionButton } from '../components/ui/WhatsAppActionButton';
import ProductEnquiryModal from '../components/products/ProductEnquiryModal';
import { submitPublicEnquiry } from '../lib/publicEnquiryApi';
import { toast } from 'react-toastify';

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlugOrId(slug);
  const { isInInquiryList, addToInquiryList } = useInquiryList();
  const [variant, setVariant] = useState(product?.variants[0] ?? 'N/A');
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  useEffect(() => {
    if (product) {
      setVariant(product.variants[0] ?? 'N/A');
      document.title = `${product.name} · MSK Global Trade`;
    } else {
      document.title = 'Product · MSK Global Trade';
    }
    return () => {
      document.title = 'MSK Global Trade';
    };
  }, [product]);

  if (!product) {
    return (
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
    );
  }

  const img = product.image || `/images/products/${product.slug}.jpg`;
  const inList = isInInquiryList(product.id, variant);

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
              <img src={img} alt={product.name} className="w-full h-full object-cover" />
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
      </article>

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
