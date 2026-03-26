import React, { useState } from 'react';
import { Product } from '../../types';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { Whatsapp } from 'lucide-react';
import ProductEnquiryModal from './ProductEnquiryModal';

interface ProductCardProps {
  product: Product;
  inquiryList: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
  openQuickView: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, inquiryList, addProduct, removeProduct, openQuickView }) => {
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  const isInInquiryList = inquiryList.some((p) => p.id === product.id);

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
        onClick={() => openQuickView(product)}
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
          {isInInquiryList ? (
            <Button
              variant="secondary"
              onClick={() => removeProduct(product.id)}
              aria-label={`Remove ${product.name} from inquiry list`}
            >
              Remove Inquiry
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={() => addProduct(product)}
              aria-label={`Add ${product.name} to inquiry list`}
            >
              Add to Inquiry
            </Button>
          )}
          <Button
            variant="tertiary"
            onClick={() => setEnquiryOpen(true)}
            aria-label={`WhatsApp enquiry for ${product.name}`}
            className="flex items-center gap-2 text-orange-500 hover:text-orange-600"
          >
            <Whatsapp className="w-5 h-5" /> WhatsApp Enquiry
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
