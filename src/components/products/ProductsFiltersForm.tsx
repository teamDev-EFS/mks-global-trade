import React, { useMemo } from 'react';
import { products as catalog } from '../../data/products';

export interface ProductsFiltersFormProps {
  search: string;
  setSearch: (v: string) => void;
  categoryFilter: string | null;
  setCategoryFilter: (v: string | null) => void;
  variantFilter: string | null;
  setVariantFilter: (v: string | null) => void;
  tagFilter: string | null;
  setTagFilter: (v: string | null) => void;
  onClear: () => void;
  /** Unique id prefix for inputs when two forms exist on page (desktop + mobile) */
  idPrefix?: string;
}

const ProductsFiltersForm: React.FC<ProductsFiltersFormProps> = ({
  search,
  setSearch,
  categoryFilter,
  setCategoryFilter,
  variantFilter,
  setVariantFilter,
  tagFilter,
  setTagFilter,
  onClear,
  idPrefix = 'pf',
}) => {
  const categories = useMemo(
    () => [...new Set(catalog.map((p) => p.category))].sort(),
    []
  );
  const variants = useMemo(
    () => [...new Set(catalog.flatMap((p) => p.variants))].sort(),
    []
  );
  const tags = useMemo(() => [...new Set(catalog.flatMap((p) => p.tags))].sort(), []);

  return (
    <div className="space-y-4">
      <h3 className="text-base font-bold text-green-900">Filters</h3>
      <div>
        <label htmlFor={`${idPrefix}-search`} className="block text-xs font-medium text-gray-500 mb-1">
          Search
        </label>
        <input
          id={`${idPrefix}-search`}
          type="search"
          placeholder="Name, category, tag…"
          className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          autoComplete="off"
        />
      </div>
      <div>
        <label htmlFor={`${idPrefix}-cat`} className="block text-xs font-medium text-gray-500 mb-1">
          Category
        </label>
        <select
          id={`${idPrefix}-cat`}
          className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-emerald-500 bg-white"
          value={categoryFilter || ''}
          onChange={(e) => setCategoryFilter(e.target.value || null)}
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor={`${idPrefix}-var`} className="block text-xs font-medium text-gray-500 mb-1">
          Variant
        </label>
        <select
          id={`${idPrefix}-var`}
          className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-emerald-500 bg-white"
          value={variantFilter || ''}
          onChange={(e) => setVariantFilter(e.target.value || null)}
        >
          <option value="">All variants</option>
          {variants.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor={`${idPrefix}-tag`} className="block text-xs font-medium text-gray-500 mb-1">
          Tag
        </label>
        <select
          id={`${idPrefix}-tag`}
          className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-emerald-500 bg-white"
          value={tagFilter || ''}
          onChange={(e) => setTagFilter(e.target.value || null)}
        >
          <option value="">All tags</option>
          {tags.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
      <button
        type="button"
        className="w-full text-sm bg-gray-100 text-gray-800 py-2.5 rounded-lg font-medium hover:bg-gray-200 transition-colors"
        onClick={onClear}
      >
        Clear filters
      </button>
    </div>
  );
};

export default ProductsFiltersForm;
