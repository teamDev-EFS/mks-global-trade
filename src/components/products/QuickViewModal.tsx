import React from 'react';
import { Link } from 'react-router-dom';
import { X, Plus, CheckCircle2 } from 'lucide-react';
import { WhatsAppActionLink } from '../ui/WhatsAppActionButton';
import { Product } from '../../types';
import { useInquiryList } from '../../store/useInquiryList';
import { trackWhatsAppClick } from '../../lib/analytics';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

function buildWhatsAppUrl(product: Product, variant?: string): string {
  const v = variant && variant !== 'N/A' ? variant : 'N/A';
  const msg = `Hello MSK Global Trade,\n\nI would like to inquire about:\n\nProduct: ${product.name}\nCategory: ${product.category}\nVariant: ${v}\nRequirement: Bulk supply. Please share details.\n\nThank you.`;
  return `https://wa.me/919232091060?text=${encodeURIComponent(msg)}`;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  const { isInInquiryList, addToInquiryList } = useInquiryList();
  const [selectedVariant, setSelectedVariant] = React.useState(product?.variants[0] || 'N/A');

  React.useEffect(() => {
    if (product) setSelectedVariant(product.variants[0] || 'N/A');
  }, [product]);

  React.useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [product, onClose]);

  if (!product) return null;
  const added = isInInquiryList(product.id, selectedVariant);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" role="presentation" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="quick-view-title"
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full relative overflow-hidden max-h-[90vh] overflow-y-auto border border-stone-200/60"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-lg hover:bg-stone-100 transition-colors z-10" onClick={onClose} aria-label="Close">
          <X className="w-5 h-5 text-stone-500" />
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Image */}
          <div className="md:w-1/2 bg-stone-50 flex items-center justify-center p-6">
            <img
              src={product.image || `/images/products/${product.slug}.jpg`}
              alt={product.name}
              className="w-full max-w-[280px] aspect-square object-cover rounded-xl"
            />
          </div>

          {/* Details */}
          <div className="md:w-1/2 p-6 flex flex-col">
            <h2 id="quick-view-title" className="text-xl font-bold text-[#0F3D2E] mb-1">{product.name}</h2>
            <p className="text-xs text-emerald-600/70 font-medium mb-3">{product.category}</p>

            {product.variants.length > 1 && (
              <select
                className="mb-3 border border-stone-200 bg-stone-50 rounded-lg px-3 py-2 text-sm text-stone-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
                value={selectedVariant}
                onChange={(e) => setSelectedVariant(e.target.value)}
              >
                {product.variants.map((v) => <option key={v} value={v}>{v}</option>)}
              </select>
            )}

            <Link
              to={`/products/${product.slug}`}
              onClick={onClose}
              className="mb-3 inline-block text-sm font-semibold text-emerald-700 hover:text-emerald-900 transition-colors"
            >
              Open full product page &rarr;
            </Link>

            <p className="text-stone-600 text-sm leading-relaxed mb-3">{product.description}</p>

            <ul className="mb-3 space-y-1.5">
              {product.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-stone-600">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  {h}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-1.5 mb-3">
              {product.tags.map((tag) => (
                <span key={tag} className="px-2 py-0.5 rounded-md text-xs font-medium bg-stone-50 text-stone-500 border border-stone-200">{tag}</span>
              ))}
            </div>

            <div className="text-xs text-stone-400 space-y-1 mb-4">
              <p><span className="font-medium text-stone-600">Packing:</span> {product.packing}</p>
              <p><span className="font-medium text-stone-600">Export:</span> {product.exportMarkets.join(', ')}</p>
            </div>

            <div className="flex gap-2 mt-auto">
              <button
                type="button"
                className={`flex-1 flex items-center justify-center px-3 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                  added
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-not-allowed'
                    : 'bg-[#0F3D2E] text-white hover:bg-[#0d3526] shadow-sm'
                }`}
                onClick={() => !added && addToInquiryList(product, selectedVariant)}
                disabled={added}
              >
                <Plus className="w-4 h-4 mr-1" />
                {added ? 'Added' : 'Add to Inquiry'}
              </button>
              <WhatsAppActionLink
                href={buildWhatsAppUrl(product, selectedVariant)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center min-h-[44px]"
                onClick={() => trackWhatsAppClick('quick_view', { product_slug: product.slug })}
              >
                WhatsApp
              </WhatsAppActionLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
