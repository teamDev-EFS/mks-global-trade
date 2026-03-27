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
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] md:hidden" role="dialog" aria-modal="true" aria-labelledby="mobile-filters-title">
      <button
        type="button"
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        aria-label="Close filters"
        onClick={onClose}
      />
      <div className="absolute inset-y-0 right-0 w-[min(100%,360px)] bg-white shadow-2xl flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <h2 id="mobile-filters-title" className="text-lg font-bold text-green-900">
            Filters
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-700"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <ProductsFiltersForm {...formProps} idPrefix="m-pf" />
        </div>
      </div>
    </div>
  );
};

export default ProductsMobileFiltersDrawer;
