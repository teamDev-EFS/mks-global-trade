import React from 'react';
import { SlidersHorizontal, ListFilter } from 'lucide-react';
import type { ProductSortKey } from '../../hooks/useProductCatalogFilters';

interface ProductsToolbarProps {
  sortKey: ProductSortKey;
  setSortKey: (k: ProductSortKey) => void;
  inquiryCount: number;
  resultCount: number;
  totalCount: number;
  onOpenMobileFilters?: () => void;
  activeFilterCount?: number;
}

const ProductsToolbar: React.FC<ProductsToolbarProps> = ({
  sortKey,
  setSortKey,
  inquiryCount,
  resultCount,
  totalCount,
  onOpenMobileFilters,
  activeFilterCount = 0,
}) => (
  <div className="bg-white rounded-xl border border-stone-200/60 shadow-sm px-4 py-3 mb-5">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div className="flex items-center justify-between gap-3 min-w-0">
        <div className="flex items-center gap-2 text-sm text-stone-500 min-w-0">
          <SlidersHorizontal className="w-4 h-4 text-emerald-600 shrink-0" aria-hidden />
          <span className="truncate">
            <span className="font-bold text-stone-800">{resultCount}</span>
            <span className="text-stone-400"> / {totalCount} products</span>
          </span>
        </div>
        {onOpenMobileFilters && (
          <button
            type="button"
            onClick={onOpenMobileFilters}
            className="md:hidden inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-stone-200 text-stone-700 text-sm font-medium hover:bg-stone-50 shrink-0 transition-colors"
          >
            <ListFilter className="w-4 h-4" aria-hidden />
            Filters
            {activeFilterCount > 0 && (
              <span className="min-w-[20px] h-5 px-1 rounded-md bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <label htmlFor="product-sort" className="sr-only">Sort products</label>
        <select
          id="product-sort"
          className="px-3 py-2 rounded-lg border border-stone-200 text-sm text-stone-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none bg-white min-w-[180px] transition-colors"
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value as ProductSortKey)}
        >
          <option value="inquiryPriority">Export priority</option>
          <option value="name">Name (A–Z)</option>
        </select>
        {inquiryCount > 0 && (
          <span className="inline-flex items-center rounded-lg bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1.5 border border-emerald-200">
            {inquiryCount} in inquiry list
          </span>
        )}
      </div>
    </div>
  </div>
);

export default ProductsToolbar;
