import { useCallback } from 'react';
import create from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../types';

export interface InquiryListItem {
  product: Product;
  variant: string;
  quantity: number;
  notes?: string;
}

interface InquiryListState {
  inquiryList: InquiryListItem[];
  addToInquiryList: (product: Product, variant: string) => void;
  removeFromInquiryList: (productId: string, variant: string) => void;
  isInInquiryList: (productId: string, variant: string) => boolean;
  updateInquiryItem: (productId: string, variant: string, update: Partial<InquiryListItem>) => void;
  clearInquiryList: () => void;
}

export const useInquiryList = create<InquiryListState>()(
  persist(
    (set, get) => ({
      inquiryList: [],
      addToInquiryList: (product, variant) => {
        const exists = get().inquiryList.some(
          (item) => item.product.id === product.id && item.variant === variant
        );
        if (!exists) {
          set((state) => ({
            inquiryList: [
              ...state.inquiryList,
              { product, variant, quantity: 1 },
            ],
          }));
        }
      },
      removeFromInquiryList: (productId, variant) => {
        set((state) => ({
          inquiryList: state.inquiryList.filter(
            (item) => !(item.product.id === productId && item.variant === variant)
          ),
        }));
      },
      isInInquiryList: (productId, variant) => {
        return get().inquiryList.some(
          (item) => item.product.id === productId && item.variant === variant
        );
      },
      updateInquiryItem: (productId, variant, update) => {
        set((state) => ({
          inquiryList: state.inquiryList.map((item) =>
            item.product.id === productId && item.variant === variant
              ? { ...item, ...update }
              : item
          ),
        }));
      },
      clearInquiryList: () => set({ inquiryList: [] }),
    }),
    { name: 'inquiry-list' }
  )
);
