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
}) => {
  return (
    <div className="flex flex-col gap-3 bg-white rounded-xl shadow-sm border border-gray-100 px-3 sm:px-4 py-3 mb-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center justify-between gap-3 min-w-0">
          <div className="flex items-center gap-2 text-sm text-gray-600 min-w-0">
            <SlidersHorizontal className="w-4 h-4 text-emerald-700 shrink-0" aria-hidden />
            <span className="truncate">
              <span className="font-semibold text-gray-900">{resultCount}</span>
              <span className="text-gray-500"> / {totalCount} products</span>
            </span>
          </div>
          {onOpenMobileFilters ? (
            <button
              type="button"
              onClick={onOpenMobileFilters}
              className="md:hidden inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-emerald-800/30 text-emerald-900 text-sm font-medium bg-emerald-50/80 hover:bg-emerald-100 shrink-0"
            >
              <ListFilter className="w-4 h-4" aria-hidden />
              Filters
              {activeFilterCount > 0 ? (
                <span className="min-w-[1.25rem] h-5 px-1 rounded-full bg-orange-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {activeFilterCount}
                </span>
              ) : null}
            </button>
          ) : null}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <label htmlFor="product-sort" className="sr-only">
            Sort products
          </label>
          <select
            id="product-sort"
            className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white min-w-[180px]"
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as ProductSortKey)}
          >
            <option value="inquiryPriority">Export priority</option>
            <option value="name">Name (A–Z)</option>
          </select>
          {inquiryCount > 0 ? (
            <span className="inline-flex items-center rounded-full bg-orange-100 text-orange-800 text-xs font-semibold px-3 py-1.5 border border-orange-200">
              {inquiryCount} in inquiry list
            </span>
          ) : null}
        </div>
      </div>
      <p className="text-xs text-gray-500 hidden sm:block">
        Sort by export priority (featured order) or alphabetically. Filters apply to the list below.
      </p>
    </div>
  );
};

export default ProductsToolbar;
