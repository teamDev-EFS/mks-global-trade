import React, { useState } from 'react';
import { Product } from '../../types';
import Button from '../ui/Button';
import Card from '../ui/Card';
import ProductEnquiryModal from './ProductEnquiryModal';

const WhatsAppIcon = () => (
  <svg viewBox="0 0 32 32" className="w-5 h-5 fill-green-500" aria-hidden="true" focusable="false">
    <path d="M16 .4C7.5.4.4 7.5.4 16c0 2.8.7 5.4 2.1 7.7L0 32l8.6-2.5c2.2 1.2 4.7 1.9 7.4 1.9 8.5 0 15.6-7.1 15.6-15.6S24.5.4 16 .4zm0 28.6c-2.4 0-4.7-.6-6.7-1.8l-.5-.3-5.1 1.5 1.4-5-.3-.5C3.6 20.7 3 18.4 3 16 3 8.8 8.8 3 16 3s13 5.8 13 13-5.8 13-13 13zm7.2-9.8c-.4-.2-2.3-1.1-2.7-1.3-.4-.1-.7-.2-1 .2-.3.4-1.1 1.3-1.3 1.5-.2.2-.5.3-.9.1-.4-.2-1.6-.6-3-1.9-1.1-1-1.9-2.3-2.1-2.7-.2-.4 0-.6.2-.8.2-.2.4-.5.6-.7.2-.2.3-.4.5-.7.2-.3.1-.6 0-.8-.1-.2-1-2.4-1.4-3.3-.4-.9-.8-.8-1-.8h-.9c-.3 0-.8.1-1.2.6-.4.4-1.6 1.6-1.6 3.9s1.7 4.6 1.9 4.9c.2.3 3.4 5.1 8.2 7.1 1.1.5 2 .8 2.7 1 .9.3 1.7.3 2.3.2.7-.1 2.3-.9 2.6-1.8.3-.9.3-1.7.2-1.8-.1-.2-.4-.3-.8-.5z"/>
  </svg>
);

interface ProductCardProps {
  product: Product;
  inquiryList?: Product[];
  addProduct?: (product: Product) => void;
  removeProduct?: (productId: string) => void;
  openQuickView?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, inquiryList = [], addProduct, removeProduct, openQuickView }) => {
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  const isInInquiryList = inquiryList?.some ? inquiryList.some((p) => p.id === product.id) : false;

  // Compose WhatsApp message for enquiry modal
  const composeMessage = (userDetails: { name: string; email: string; phone: string; quantity: string; location: string; message: string }) => {
    return `Hello MSK Global Trade,%0A%0AI am interested in the product: ${product.name}.%0A` +
      `Category: ${product.category}%0A` +
      `Packing: ${product.packing}%0A` +
      `Quantity: ${userDetails.quantity || 'N/A'}%0A` +
      `Location: ${userDetails.location || 'N/A'}%0A%0A` +
      `My Details:%0AName: ${userDetails.name}%0AEmail: ${userDetails.email}%0APhone: ${userDetails.phone}%0A` +
      `Additional Message: ${userDetails.message || 'N/A'}%0A%0AThank you.`;
  };

  const handleWhatsAppEnquiry = (userDetails: { name: string; email: string; phone: string; quantity: string; location: string; message: string }) => {
    const message = composeMessage(userDetails);
    const whatsappUrl = `https://wa.me/919232091060?text=${message}`;
    window.open(whatsappUrl, '_blank');
    setEnquiryOpen(false);
  };

  return (
    <Card className="flex flex-col hover:shadow-xl transition-shadow rounded-[20px] overflow-hidden">
      <div
        className="relative overflow-hidden rounded-t-[20px] cursor-pointer group"
        onClick={() => openQuickView && openQuickView(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-deepGreen-900 mb-1">{product.name}</h3>
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
        <div className="mt-auto flex items-center justify-between">
          {isInInquiryList && removeProduct && addProduct ? (
            <Button
              variant="secondary"
              onClick={() => removeProduct(product.id)}
              aria-label={`Remove ${product.name} from inquiry list`}
            >
              Remove Inquiry
            </Button>
          ) : addProduct ? (
            <Button
              variant="primary"
              onClick={() => addProduct(product)}
              aria-label={`Add ${product.name} to inquiry list`}
            >
              Add to Inquiry
            </Button>
          ) : null}
          <Button
            variant="tertiary"
            onClick={() => setEnquiryOpen(true)}
            aria-label={`WhatsApp enquiry for ${product.name}`}
            className="flex items-center gap-2 text-orange-500 hover:text-orange-600"
          >
            <WhatsAppIcon /> WhatsApp Enquiry
          </Button>
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
