import React from 'react';

interface ProductsFiltersSidebarProps {
  search: string;
  setSearch: (v: string) => void;
  category: string;
  setCategory: (v: string) => void;
  variant: string;
  setVariant: (v: string) => void;
  tags: string[];
  setTags: (tags: string[]) => void;
  availability: string;
  setAvailability: (v: string) => void;
  region: string;
  setRegion: (v: string) => void;
  onClearFilters: () => void;
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
const tagsList = [
  'Organic',
  'Export Quality',
  'Bulk Available',
  'Fresh',
  'Natural',
  'Industrial Use',
  'Cosmetic Use',
];
const availabilityOptions = [
  '',
  'In Stock',
  'Seasonal',
  'Bulk Supply Available',
];
const regions = [
  '',
  'India',
  'UAE',
  'Global Export',
];

const ProductsFiltersSidebar: React.FC<ProductsFiltersSidebarProps> = ({
  search,
  setSearch,
  category,
  setCategory,
  variant,
  setVariant,
  tags,
  setTags,
  availability,
  setAvailability,
  region,
  setRegion,
  onClearFilters,
}) => {
  // Defensive checks for tags array
  const safeTags = Array.isArray(tags) ? tags : [];

  return (
    <aside className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-28">
      <h3 className="text-lg font-bold text-green-900 mb-4">Filters</h3>
      <div className="mb-4">
        <label className="block text-xs font-medium text-gray-500 mb-1">Search</label>
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 text-sm"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-xs font-medium text-gray-500 mb-1">Category</label>
        <select
          className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-xs font-medium text-gray-500 mb-1">Variant</label>
        <select
          className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
          value={variant}
          onChange={e => setVariant(e.target.value)}
        >
          {variants.map((v) => (
            <option key={v} value={v}>{v || 'All Variants'}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-xs font-medium text-gray-500 mb-1">Tags</label>
        <div className="flex flex-wrap gap-2">
          {tagsList.map((tag) => (
            <button
              key={tag}
              type="button"
              className={`px-2 py-1 rounded-full text-xs font-semibold border ${safeTags.includes(tag) ? 'bg-orange-100 text-orange-700 border-orange-200' : 'bg-gray-100 text-gray-600 border-gray-200'}`}
              onClick={() =>
                safeTags.includes(tag)
                  ? setTags(safeTags.filter((t) => t !== tag))
                  : setTags([...safeTags, tag])
              }
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-xs font-medium text-gray-500 mb-1">Availability</label>
        <select
          className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
          value={availability}
          onChange={e => setAvailability(e.target.value)}
        >
          {availabilityOptions.map((a) => (
            <option key={a} value={a}>{a || 'All'}</option>
          ))}
        </select>
      </div>
      <div className="mb-6">
        <label className="block text-xs font-medium text-gray-500 mb-1">Region Suitability</label>
        <select
          className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
          value={region}
          onChange={e => setRegion(e.target.value)}
        >
          {regions.map((r) => (
            <option key={r} value={r}>{r || 'All'}</option>
          ))}
        </select>
      </div>
      <button
        className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition-all"
        onClick={onClearFilters}
        type="button"
      >
        Clear All Filters
      </button>
    </aside>
  );
};

export default ProductsFiltersSidebar;
