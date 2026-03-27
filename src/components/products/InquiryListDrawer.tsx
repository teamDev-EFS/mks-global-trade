import React from 'react';
import { InquiryListItem } from '../../store/useInquiryList';
import { MessageCircle, Trash2, ShoppingBag } from 'lucide-react';

interface InquiryListDrawerProps {
  inquiryList: InquiryListItem[];
  clearList: () => void;
  openEnquiryModal: () => void;
}

const InquiryListDrawer: React.FC<InquiryListDrawerProps> = ({ inquiryList, clearList, openEnquiryModal }) => {
  if (inquiryList.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pointer-events-none">
      <div className="max-w-[min(100%,1400px)] mx-auto pointer-events-auto">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-2xl border border-emerald-200/60 bg-white/95 backdrop-blur-md shadow-[0_-4px_24px_-8px_rgba(15,61,46,0.12)] px-5 py-3.5">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
              <ShoppingBag className="w-5 h-5 text-emerald-700" aria-hidden />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-stone-800">
                {inquiryList.length} product{inquiryList.length === 1 ? '' : 's'} in inquiry list
              </p>
              <p className="text-xs text-stone-400 truncate">
                {inquiryList.map((i) => i.product.name).join(' · ')}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 justify-end">
            <button
              type="button"
              onClick={clearList}
              className="inline-flex items-center gap-1.5 text-sm text-red-600 hover:text-red-800 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Clear
            </button>
            <button
              type="button"
              onClick={openEnquiryModal}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0F3D2E] text-white text-sm font-semibold px-5 py-2.5 shadow-md shadow-emerald-900/10 hover:bg-[#0d3526] transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Enquire via WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InquiryListDrawer;
