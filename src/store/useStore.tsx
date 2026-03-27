import create from 'zustand';
import { persist } from 'zustand/middleware';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  product: string;
  quantity: number;
  location: string;
  message: string;
}

interface StoreState {
  products: Product[];
  inquiries: Inquiry[];
  addProduct: (product: Product) => void;
  addInquiry: (inquiry: Inquiry) => void;
}

export const useStore = create<StoreState>(
  persist(
    (set) => ({
      products: [],
      inquiries: [],
      addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
      addInquiry: (inquiry) => set((state) => ({ inquiries: [...state.inquiries, inquiry] })),
    }),
    {
      name: 'store',
    }
  )
);