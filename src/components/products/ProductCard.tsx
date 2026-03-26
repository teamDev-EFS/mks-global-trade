import React, { useState } from 'react';
import { Product } from '../../types';
import { BadgeCheck, Package, Leaf, MessageCircle, Eye, Plus, Check } from 'lucide-react';
import { useInquiryList } from '../../store/useInquiryList';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

const tagColors: Record<string, string> = {
  'Organic': 'bg-emerald-100 text-emerald-700',
  'Export Quality': 'bg-orange-100 text-orange-700',
  'Bulk Available': 'bg-yellow-100 text-yellow-700',
  'Natural Sweetener': 'bg-amber-100 text-amber-700',
  'Fresh': 'bg-green-100 text-green-700',
  'Long Shelf Life': 'bg-blue-100 text-blue-700',
  'Export Grade': 'bg-purple-100 text-purple-700',
  'Aromatic': 'bg-lime-100 text-lime-700',
  'Hygienic': 'bg-cyan-100 text-cyan-700',
  'Bulk Supply': 'bg-yellow-100 text-yellow-700',
  'Natural Clay': 'bg-stone-100 text-stone-700',
  'Cosmetic Use': 'bg-pink-100 text-pink-700',
  'Industrial Use': 'bg-gray-100 text-gray-700',
  'Rich Color': 'bg-red-100 text-red-700',
  'Strong Flavor': 'bg-orange-100 text-orange-700',
  'Seasonal': 'bg-teal-100 text-teal-700',
  'Export Supply': 'bg-indigo-100 text-indigo-700',
  'Nutrient Rich': 'bg-fuchsia-100 text-fuchsia-700',
  'Crunchy': 'bg-yellow-100 text-yellow-700',
  'Vitamin Rich': 'bg-rose-100 text-rose-700',
};

const getStatusBadge = (availability: string) => {
  if (availability.toLowerCase().includes('stock')) {
    return <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold border border-emerald-200">In Stock</span>;
  }
  if (availability.toLowerCase().includes('seasonal')) {
    return <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 text-xs font-semibold border border-orange-200">Seasonal</span>;
  }
  if (availability.toLowerCase().includes('bulk')) {
    return <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 text-xs font-semibold border border-yellow-200">Bulk Supply</span>;
  }
  return <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold border border-gray-200">{availability}</span>;
};

const getWhatsAppUrl = (product: Product, selectedVariant?: string) => {
  const variantText = selectedVariant && selectedVariant !== 'N/A' ? selectedVariant : 'N/A';
  const message = `Hello MSK Global Trade,%0A%0AI would like to inquire about the following product:%0A%0AProduct: ${product.name}%0ACategory: ${product.category}%0AVariant: ${variantText}%0ARequirement: I am interested in bulk supply. Please share details.%0ALocation: %0A%0APlease share pricing, MOQ, packing details, and export availability.%0A%0AThank you.`;
  return `https://wa.me/919232091060?text=${message}`;
};

const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { isInInquiryList, addToInquiryList, removeFromInquiryList } = useInquiryList();
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0] || 'N/A');
  const added = isInInquiryList(product.id, selectedVariant);

  return (
    <div className="group bg-white border border-gray-100 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col min-h-[520px]">
      <div className="relative w-full h-56 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">{getStatusBadge(product.availability)}</div>
      </div>
      <div className="flex-1 flex flex-col p-6">
        <h3 className="text-xl font-bold text-green-900 mb-1 line-clamp-1">{product.name}</h3>
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
        <ul className="mb-3 space-y-1 text-sm text-gray-700">
          {product.highlights.slice(0, 3).map((point, idx) => (
            <li key={idx} className="flex items-start"><span className="mr-1 text-green-700">•</span>{point}</li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2 mb-3">
          {product.tags.map((tag, idx) => (
            <span key={idx} className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${tagColors[tag] || 'bg-gray-100 text-gray-600 border-gray-200'}`}>{tag}</span>
          ))}
        </div>
        <div className="mb-2 text-xs text-gray-500"><span className="font-medium text-green-700">Packing:</span> {product.packing}</div>
        <div className="mb-2 text-xs text-gray-500"><span className="font-medium text-green-700">Export:</span> {product.exportMarkets.join(', ')}</div>
        <div className="mt-auto flex gap-2">
          <button
            className={`flex-1 flex items-center justify-center px-3 py-2 rounded-lg font-semibold text-sm shadow transition-all group ${added ? 'bg-emerald-100 text-emerald-700 border border-emerald-200 cursor-not-allowed' : 'bg-orange-500 text-white hover:bg-orange-600'}`}
            onClick={() => !added ? addToInquiryList(product, selectedVariant) : removeFromInquiryList(product.id, selectedVariant)}
            disabled={added}
            aria-label={added ? 'Added to Inquiry List' : 'Add to Inquiry List'}
          >
            {added ? <><Check className="w-4 h-4 mr-1" /> Added</> : <><Plus className="w-4 h-4 mr-1" /> Add to Inquiry List</>}
          </button>
          <a
            href={getWhatsAppUrl(product, selectedVariant)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center px-3 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-all text-sm shadow"
            aria-label="WhatsApp Inquiry"
          >
            <MessageCircle className="w-4 h-4 mr-1" /> WhatsApp
          </a>
          <button
            className="flex items-center justify-center px-3 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all text-sm shadow"
            onClick={() => onQuickView(product)}
            aria-label="Quick View"
            type="button"
          >
            <Eye className="w-4 h-4 mr-1" /> View
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
