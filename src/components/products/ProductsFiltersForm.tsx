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
  idPrefix?: string;
}

const inputCls = 'w-full px-3.5 py-2.5 rounded-lg border border-stone-200 bg-stone-50 text-sm text-stone-800 placeholder:text-stone-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:bg-white outline-none transition-all';
const labelCls = 'block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1.5';

const ProductsFiltersForm: React.FC<ProductsFiltersFormProps> = ({
  search, setSearch, categoryFilter, setCategoryFilter,
  variantFilter, setVariantFilter, tagFilter, setTagFilter,
  onClear, idPrefix = 'pf',
}) => {
  const categories = useMemo(() => [...new Set(catalog.map((p) => p.category))].sort(), []);
  const variants = useMemo(() => [...new Set(catalog.flatMap((p) => p.variants))].sort(), []);
  const tags = useMemo(() => [...new Set(catalog.flatMap((p) => p.tags))].sort(), []);

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold text-[#0F3D2E]">Filters</h3>
      <div>
        <label htmlFor={`${idPrefix}-search`} className={labelCls}>Search</label>
        <input id={`${idPrefix}-search`} type="search" placeholder="Name, category, tag..." className={inputCls} value={search} onChange={(e) => setSearch(e.target.value)} autoComplete="off" />
      </div>
      <div>
        <label htmlFor={`${idPrefix}-cat`} className={labelCls}>Category</label>
        <select id={`${idPrefix}-cat`} className={inputCls} value={categoryFilter || ''} onChange={(e) => setCategoryFilter(e.target.value || null)}>
          <option value="">All categories</option>
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor={`${idPrefix}-var`} className={labelCls}>Variant</label>
        <select id={`${idPrefix}-var`} className={inputCls} value={variantFilter || ''} onChange={(e) => setVariantFilter(e.target.value || null)}>
          <option value="">All variants</option>
          {variants.map((v) => <option key={v} value={v}>{v}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor={`${idPrefix}-tag`} className={labelCls}>Tag</label>
        <select id={`${idPrefix}-tag`} className={inputCls} value={tagFilter || ''} onChange={(e) => setTagFilter(e.target.value || null)}>
          <option value="">All tags</option>
          {tags.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>
      <button type="button" className="w-full text-sm bg-stone-100 text-stone-600 py-2.5 rounded-lg font-medium hover:bg-stone-200 border border-stone-200/60 transition-colors" onClick={onClear}>
        Clear filters
      </button>
    </div>
  );
};

export default ProductsFiltersForm;
