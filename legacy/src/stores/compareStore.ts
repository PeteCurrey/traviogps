import { create } from "zustand";
import type { Product } from "@/data/products";

interface CompareStore {
  items: Product[];
  add: (product: Product) => void;
  remove: (id: string) => void;
  clear: () => void;
  has: (id: string) => boolean;
}

// We can't use hooks outside React, so `has` is a plain method on the state
export const useCompareStore = create<CompareStore>((set, get) => ({
  items: [],
  add: (product) =>
    set((state) => {
      if (state.items.length >= 3 || state.items.find((p) => p.id === product.id)) return state;
      return { items: [...state.items, product] };
    }),
  remove: (id) => set((state) => ({ items: state.items.filter((p) => p.id !== id) })),
  clear: () => set({ items: [] }),
  has: (id) => get().items.some((p) => p.id === id),
}));
