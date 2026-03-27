import React from 'react';
import { SearchX } from 'lucide-react';

const EmptyProductsState: React.FC<{ onReset?: () => void }> = ({ onReset }) => (
  <div className="flex flex-col items-center justify-center py-24 text-center">
    <div className="w-16 h-16 rounded-2xl bg-stone-100 flex items-center justify-center mb-5">
      <SearchX className="w-8 h-8 text-stone-400" />
    </div>
    <h3 className="text-xl font-bold text-stone-800 mb-2">No products found</h3>
    <p className="text-stone-500 text-sm mb-6 max-w-sm">Try adjusting your search or filters to find what you're looking for.</p>
    {onReset && (
      <button
        type="button"
        className="px-6 py-2.5 rounded-xl bg-[#0F3D2E] text-white text-sm font-semibold hover:bg-[#0d3526] transition-colors"
        onClick={onReset}
      >
        Reset Filters
      </button>
    )}
  </div>
);

export default EmptyProductsState;
