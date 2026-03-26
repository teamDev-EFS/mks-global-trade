import React from 'react';

const ProductFilters: React.FC = () => {
  return (
    <div className="flex items-center justify-between mb-4">
      <input
        type="text"
        placeholder="Search products..."
        className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500"
      />
      <select className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500">
        <option value="">All Categories</option>
        <option value="fertilizer">Fertilizer</option>
        <option value="sweetener">Sweetener</option>
        <option value="spices">Spices</option>
      </select>
    </div>
  );
};

export default ProductFilters;
