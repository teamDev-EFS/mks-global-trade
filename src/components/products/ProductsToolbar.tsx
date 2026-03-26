import React from 'react';
import { Search, LayoutGrid, List, X } from 'lucide-react';

interface ProductsToolbarProps {
  search: string;
  setSearch: (v: string) => void;
  category: string;
  setCategory: (v: string) => void;
  variant: string;
  setVariant: (v: string) => void;
  sort: string;
  setSort: (v: string) => void;
  view: 'grid' | 'list';
  setView: (v: 'grid' | 'list') => void;
  productCount: number;
  onOpenFilters: () => void;
  onClearFilters: () => void;
  tags: string[];
  setTags: (tags: string[]) => void;
}

const categories = [
  'All',
  'Agro Products',
  'Food Products',
  'Fresh Vegetables',
  'Spices',
  'Natural Minerals',
  'Seasonal Products',
];
const variants = [
  '',
  'Solid',
  'Cube',
  'Powder',
  'Flakes',
  'Seeds',
  'Fresh',
];
const sortOptions = [
  'Default',
  'Product Name A-Z',
  'Product Name Z-A',
  'Category',
  'Export Priority',
  'Newest',
  'Popular Inquiry',
];

const ProductsToolbar: React.FC<ProductsToolbarProps> = ({
  search,
  setSearch,
  category,
  setCategory,
  variant,
  setVariant,
  sort,
  setSort,
  view,
  setView,
  productCount,
  onOpenFilters,
  onClearFilters,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white rounded-xl shadow-sm border border-gray-100 px-4 py-3 sticky top-4 z-20">
      <div className="flex flex-1 items-center gap-2">
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            className="pl-9 pr-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 text-sm w-full"
            value={search}
            onChange={e => setSearch(e.target.value)}
            aria-label="Search products"
          />
        </div>
        <select
          className="ml-2 px-3 py-2 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <select
          className="ml-2 px-3 py-2 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
          value={variant}
          onChange={e => setVariant(e.target.value)}
        >
          {variants.map((v) => (
            <option key={v} value={v}>{v || 'All Variants'}</option>
          ))}
        </select>
        <button
          className="ml-2 px-3 py-2 rounded-lg border border-gray-200 text-sm bg-gray-50 hover:bg-orange-50 transition-all md:hidden"
          onClick={onOpenFilters}
          type="button"
        >
          Filters
        </button>
      </div>
      <div className="flex items-center gap-2 mt-2 md:mt-0">
        <select
          className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
          value={sort}
          onChange={e => setSort(e.target.value)}
        >
          {sortOptions.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <button
          className={`ml-2 p-2 rounded-lg border border-gray-200 ${view === 'grid' ? 'bg-orange-100 text-orange-700' : 'bg-white text-gray-700'} hover:bg-orange-50 transition-all`}
          onClick={() => setView('grid')}
          aria-label="LayoutGrid view"
        >
          <LayoutGrid className="w-5 h-5" />
        </button>
        <button
          className={`p-2 rounded-lg border border-gray-200 ${view === 'list' ? 'bg-orange-100 text-orange-700' : 'bg-white text-gray-700'} hover:bg-orange-50 transition-all`}
          onClick={() => setView('list')}
          aria-label="List view"
        >
          <List className="w-5 h-5" />
        </button>
        <button
          className="ml-2 px-3 py-2 rounded-lg border border-gray-200 text-sm bg-gray-50 hover:bg-orange-50 transition-all flex items-center gap-1"
          onClick={onClearFilters}
          type="button"
        >
          <X className="w-4 h-4" /> Clear Filters
        </button>
        <span className="ml-4 text-sm text-gray-500 hidden md:inline">Showing <span className="font-semibold text-green-700">{productCount}</span> products</span>
      </div>
    </div>
  );
};

export default ProductsToolbar;
