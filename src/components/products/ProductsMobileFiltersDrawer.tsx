import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import ProductsFiltersForm, { ProductsFiltersFormProps } from './ProductsFiltersForm';

type Props = ProductsFiltersFormProps & {
  open: boolean;
  onClose: () => void;
};

const ProductsMobileFiltersDrawer: React.FC<Props> = ({ open, onClose, ...formProps }) => {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] md:hidden" role="dialog" aria-modal="true" aria-labelledby="mobile-filters-title">
      <button type="button" className="absolute inset-0 bg-black/30 backdrop-blur-sm" aria-label="Close filters" onClick={onClose} />
      <div className="absolute inset-y-0 right-0 w-[min(100%,360px)] bg-white shadow-2xl flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100">
          <h2 id="mobile-filters-title" className="text-base font-bold text-[#0F3D2E]">Filters</h2>
          <button type="button" onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-stone-100 text-stone-500 transition-colors" aria-label="Close">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5">
          <ProductsFiltersForm {...formProps} idPrefix="m-pf" />
        </div>
      </div>
    </div>
  );
};

export default ProductsMobileFiltersDrawer;
