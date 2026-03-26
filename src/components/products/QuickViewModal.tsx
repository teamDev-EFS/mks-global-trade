import React from 'react';
import { X, MessageCircle, Plus } from 'lucide-react';
import { Product } from '../../types';
import { useInquiryList } from '../../store/useInquiryList';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

const getWhatsAppUrl = (product: Product, selectedVariant?: string) => {
  const variantText = selectedVariant && selectedVariant !== 'N/A' ? selectedVariant : 'N/A';
  const message = `Hello MSK Global Trade,%0A%0AI would like to inquire about the following product:%0A%0AProduct: ${product.name}%0ACategory: ${product.category}%0AVariant: ${variantText}%0ARequirement: I am interested in bulk supply. Please share details.%0ALocation: %0A%0APlease share pricing, MOQ, packing details, and export availability.%0A%0AThank you.`;
  return `https://wa.me/919232091060?text=${message}`;
};

const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  const { isInInquiryList, addToInquiryList } = useInquiryList();
  const [selectedVariant, setSelectedVariant] = React.useState(product?.variants[0] || 'N/A');

  React.useEffect(() => {
    if (product) setSelectedVariant(product.variants[0] || 'N/A');
  }, [product]);

  if (!product) return null;
  const added = isInInquiryList(product.id, selectedVariant);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full relative overflow-hidden">
        <button className="absolute top-3 right-3 p-2 rounded hover:bg-gray-100" onClick={onClose} aria-label="X">
          <X className="w-6 h-6 text-gray-700" />
        </button>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 flex items-center justify-center p-6">
            <img src={product.image} alt={product.name} className="w-64 h-64 object-cover rounded-xl border" />
          </div>
          <div className="md:w-1/2 p-6 flex flex-col">
            <h2 className="text-2xl font-bold text-green-900 mb-2">{product.name}</h2>
            <div className="text-xs text-gray-400 mb-2">{product.category}</div>
            {product.variants && product.variants.length > 1 && (
              <select
                className="mb-2 border border-gray-200 rounded px-2 py-1 text-xs text-gray-700 focus:ring-2 focus:ring-emerald-400"
                value={selectedVariant}
                onChange={e => setSelectedVariant(e.target.value)}
              >
                {product.variants.map((v) => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            )}
            <div className="mb-3 text-gray-700 text-sm">{product.description}</div>
            <ul className="mb-3 space-y-1 text-sm text-gray-700">
              {product.highlights.map((point, idx) => (
                <li key={idx} className="flex items-start"><span className="mr-1 text-green-700">•</span>{point}</li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2 mb-3">
              {product.tags.map((tag, idx) => (
                <span key={idx} className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border bg-gray-100 text-gray-600 border-gray-200">{tag}</span>
              ))}
            </div>
            <div className="mb-2 text-xs text-gray-500"><span className="font-medium text-green-700">Packing:</span> {product.packing}</div>
            <div className="mb-2 text-xs text-gray-500"><span className="font-medium text-green-700">Export:</span> {product.exportMarkets.join(', ')}</div>
            <div className="flex gap-2 mt-4">
              <button
                className={`flex-1 flex items-center justify-center px-3 py-2 rounded-lg font-semibold text-sm shadow transition-all group ${added ? 'bg-emerald-100 text-emerald-700 border border-emerald-200 cursor-not-allowed' : 'bg-orange-500 text-white hover:bg-orange-600'}`}
                onClick={() => !added && addToInquiryList(product, selectedVariant)}
                disabled={added}
                aria-label={added ? 'Added to Inquiry List' : 'Add to Inquiry List'}
              >
                <Plus className="w-4 h-4 mr-1" /> {added ? 'Added' : 'Add to Inquiry List'}
              </button>
              <a
                href={getWhatsAppUrl(product, selectedVariant)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-all text-sm shadow"
                aria-label="WhatsApp Inquiry"
              >
                <MessageCircle className="w-4 h-4 mr-1" /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
