import React from 'react';
import { SearchX } from 'lucide-react';

const EmptyProductsState: React.FC<{ onReset: () => void }> = ({ onReset }) => {
  return (
    <div className="flex flex-col items-center justify-center py-24">
      <SearchX className="w-16 h-16 text-orange-400 mb-4" />
      <h3 className="text-xl font-bold text-gray-800 mb-2">No products found</h3>
      <p className="text-gray-500 mb-4">Try adjusting your search or filters.</p>
      <button
        className="px-6 py-2 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-all"
        onClick={onReset}
      >
        Reset Filters
      </button>
    </div>
  );
};

export default EmptyProductsState;
