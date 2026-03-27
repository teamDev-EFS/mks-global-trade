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
  /** Adds product with its first variant (convenience for product cards). */
  addProduct: (product: Product) => void;
  removeFromInquiryList: (productId: string, variant: string) => void;
  /** Removes first matching line item for this product id. */
  removeProduct: (productId: string) => void;
  isInInquiryList: (productId: string, variant: string) => boolean;
  updateInquiryItem: (productId: string, variant: string, update: Partial<InquiryListItem>) => void;
  clearInquiryList: () => void;
  clearList: () => void;
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
      addProduct: (product) => {
        const variant = product.variants[0] || 'Standard';
        get().addToInquiryList(product, variant);
      },
      removeFromInquiryList: (productId, variant) => {
        set((state) => ({
          inquiryList: state.inquiryList.filter(
            (item) => !(item.product.id === productId && item.variant === variant)
          ),
        }));
      },
      removeProduct: (productId) => {
        const item = get().inquiryList.find((i) => i.product.id === productId);
        if (item) get().removeFromInquiryList(productId, item.variant);
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
      clearList: () => set({ inquiryList: [] }),
    }),
    { name: 'inquiry-list' }
  )
);
