import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Product } from '../../types';
import { InquiryListItem } from '../../store/useInquiryList';
import Button from '../ui/Button';
import Card from '../ui/Card';
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

  // Defensive check for inquiryList
  const safeInquiryList = Array.isArray(inquiryList) ? inquiryList : [];
  const isInInquiryList = safeInquiryList.some((item) => item.product.id === product.id);

  // Compose WhatsApp message for enquiry modal
  const composeMessage = (userDetails: { name: string; email: string; phone: string; quantity: string; location: string; message: string }) => {
    return (
      `Hello MSK Global Trade,\n\n` +
      `I am interested in the product: ${product.name}.\n` +
      `Category: ${product.category}\n` +
      `Packing: ${product.packing}\n` +
      `Quantity: ${userDetails.quantity || 'N/A'}\n` +
      `Location: ${userDetails.location || 'N/A'}\n\n` +
      `My Details:\n` +
      `Name: ${userDetails.name}\n` +
      `Email: ${userDetails.email}\n` +
      `Phone: ${userDetails.phone}\n` +
      `Additional Message: ${userDetails.message || 'N/A'}\n\n` +
      `Thank you.`
    );
  };

  const handleWhatsAppEnquiry = async (userDetails: {
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
            variant: product.variants[0] || '',
            quantity: userDetails.quantity,
          },
        ],
      });
      toast.success('Enquiry saved — we will contact you shortly');
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Could not save enquiry');
      return;
    }
    trackProductEnquiry(product.slug, 'product_card');
    trackWhatsAppClick('product_card_enquiry', { product_slug: product.slug });
    const message = composeMessage(userDetails);
    const whatsappUrl = `https://wa.me/919232091060?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setEnquiryOpen(false);
  };

  // Fix product image association: use product.image if defined, else fallback to a safe default
  const productImage = product.image || `/images/products/${product.name.toLowerCase().replace(/\s+/g, '-')}.jpg`;

  return (
    <Card className="flex flex-col hover:shadow-xl transition-shadow rounded-[20px] overflow-hidden">
      <div
        className="relative overflow-hidden rounded-t-[20px] cursor-pointer group"
        onClick={() => openQuickView && openQuickView(product)}
      >
        <img
          src={productImage}
          alt={productImageAlt(product)}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="text-lg font-semibold text-deepGreen-900">{product.name}</h3>
          <Link
            to={`/products/${product.slug}`}
            className="text-xs font-semibold text-orange-600 hover:text-orange-700 whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 rounded"
          >
            Details →
          </Link>
        </div>
        <p className="text-sm text-deepGreen-700 mb-2">{product.category}</p>
        <ul className="flex flex-col gap-1 flex-grow mb-3">
          {product.highlights.slice(0, 3).map((highlight, idx) => (
            <li key={idx} className="text-sm text-deepGreen-800 list-disc list-inside">
              {highlight}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2 mb-3">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="bg-ivory-100 text-deepGreen-700 text-xs font-medium px-2 py-1 rounded-full border border-ivory-300"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="text-sm text-deepGreen-900 font-semibold mb-4">Packing: {product.packing}</p>
        <div className="mt-auto flex flex-col gap-2.5 w-full">
          {isInInquiryList && removeProduct && addProduct ? (
            <Button
              variant="secondary"
              className="w-full justify-center"
              onClick={() => removeProduct(product.id)}
              aria-label={`Remove ${product.name} from inquiry list`}
            >
              Remove from inquiry list
            </Button>
          ) : addProduct ? (
            <Button
              variant="primary"
              className="w-full justify-center"
              onClick={() => addProduct(product)}
              aria-label={`Add ${product.name} to inquiry list`}
            >
              Add to Inquiry
            </Button>
          ) : null}
          <WhatsAppActionButton
            className="w-full"
            onClick={() => setEnquiryOpen(true)}
            aria-label={`Start WhatsApp enquiry for ${product.name}`}
          >
            WhatsApp enquiry
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
    </Card>
  );
};

export default ProductCard;
