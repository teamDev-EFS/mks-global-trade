import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Product } from '../../types';
import { InquiryListItem } from '../../store/useInquiryList';
import { WhatsAppActionButton } from '../ui/WhatsAppActionButton';
import ProductEnquiryModal from './ProductEnquiryModal';
import { submitPublicEnquiry } from '../../lib/publicEnquiryApi';
import { productImageAlt } from '../../seo/pageMeta';
import { trackProductEnquiry, trackWhatsAppClick } from '../../lib/analytics';

interface ProductCardProps {
  product: Product;
  inquiryList?: InquiryListItem[];
  addProduct?: (product: Product) => void;
  removeProduct?: (productId: string) => void;
  openQuickView?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, inquiryList = [], addProduct, removeProduct, openQuickView }) => {
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const safeInquiryList = Array.isArray(inquiryList) ? inquiryList : [];
  const isInList = safeInquiryList.some((item) => item.product.id === product.id);
  const productImage = product.image || `/images/products/${product.name.toLowerCase().replace(/\s+/g, '-')}.jpg`;

  const handleWhatsAppEnquiry = async (userDetails: {
    name: string; email: string; phone: string; quantity: string; location: string; message: string;
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
        products: [{
          productId: product.id, productName: product.name,
          category: product.category, variant: product.variants[0] || '', quantity: userDetails.quantity,
        }],
      });
      toast.success('Enquiry saved — we will contact you shortly');
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Could not save enquiry');
      return;
    }
    trackProductEnquiry(product.slug, 'product_card');
    trackWhatsAppClick('product_card_enquiry', { product_slug: product.slug });
    const message =
      `Hello MSK Global Trade,\n\nI am interested in: ${product.name}.\nCategory: ${product.category}\nPacking: ${product.packing}\nQuantity: ${userDetails.quantity || 'N/A'}\nLocation: ${userDetails.location || 'N/A'}\n\nName: ${userDetails.name}\nEmail: ${userDetails.email}\nPhone: ${userDetails.phone}\nMessage: ${userDetails.message || 'N/A'}\n\nThank you.`;
    window.open(`https://wa.me/919232091060?text=${encodeURIComponent(message)}`, '_blank');
    setEnquiryOpen(false);
  };

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-stone-200/60 bg-white shadow-[0_2px_16px_-6px_rgba(15,61,46,0.06)] hover:shadow-[0_12px_48px_-12px_rgba(15,61,46,0.18)] hover:border-emerald-200/60 transition-all duration-500">
      {/* Image */}
      <div
        className="relative overflow-hidden cursor-pointer"
        onClick={() => openQuickView?.(product)}
      >
        <img
          src={productImage}
          alt={productImageAlt(product)}
          className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {product.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="rounded-lg bg-[#0F3D2E]/85 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white/90 backdrop-blur-sm">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="text-base font-bold text-[#0F3D2E]">{product.name}</h3>
          <Link
            to={`/products/${product.slug}`}
            className="text-xs font-semibold text-emerald-600 hover:text-emerald-800 whitespace-nowrap shrink-0 transition-colors"
          >
            Details &rarr;
          </Link>
        </div>
        <p className="text-xs text-emerald-600/70 font-medium mb-2">{product.category}</p>

        <ul className="flex flex-col gap-1 flex-grow mb-3">
          {product.highlights.slice(0, 3).map((h) => (
            <li key={h} className="flex items-start gap-2 text-xs text-stone-500">
              <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-500 shrink-0" />
              {h}
            </li>
          ))}
        </ul>

        <p className="text-xs text-stone-500 mb-4">
          <span className="font-semibold text-stone-700">Packing:</span> {product.packing}
        </p>

        {/* Actions */}
        <div className="mt-auto flex flex-col gap-2 w-full">
          {isInList && removeProduct ? (
            <button
              type="button"
              onClick={() => removeProduct(product.id)}
              className="w-full py-2.5 rounded-xl text-sm font-medium border border-stone-200 text-stone-600 hover:bg-stone-50 transition-colors"
              aria-label={`Remove ${product.name} from inquiry list`}
            >
              Remove from inquiry list
            </button>
          ) : addProduct ? (
            <button
              type="button"
              onClick={() => addProduct(product)}
              className="w-full py-2.5 rounded-xl text-sm font-semibold bg-[#0F3D2E] text-white shadow-sm hover:bg-[#0d3526] transition-colors"
              aria-label={`Add ${product.name} to inquiry list`}
            >
              Add to Inquiry
            </button>
          ) : null}
          <WhatsAppActionButton
            className="w-full"
            onClick={() => setEnquiryOpen(true)}
            aria-label={`Start WhatsApp enquiry for ${product.name}`}
          >
            WhatsApp Enquiry
          </WhatsAppActionButton>
        </div>
      </div>

      {enquiryOpen && (
        <ProductEnquiryModal
          product={product}
          inquiryList={[]}
          onClose={() => setEnquiryOpen(false)}
          onSubmit={handleWhatsAppEnquiry}
        />
      )}
    </div>
  );
};

export default ProductCard;
