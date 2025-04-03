import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { products as initialProducts, Product } from '@/lib/data';

interface ProductStore {
    products: Product[];
    addProduct: (product: Product) => void;
    removeProduct: (id: string) => void;
    updateProduct: (id: string, updatedData: Partial<Product>) => void;
}

export const useProductStore = create(
    persist<ProductStore>(
        (set) => ({
            products: initialProducts, // Start with data from lib/data.ts
            addProduct: (product) =>
                set((state) => ({ products: [product, ...state.products] })),
            removeProduct: (id) =>
                set((state) => ({ products: state.products.filter((p) => p.id !== id) })),
            updateProduct: (id, updatedData) =>
                set((state) => ({
                    products: state.products.map((p) =>
                        p.id === id ? { ...p, ...updatedData } : p
                    ),
                })),
        }),
        {
            name: 'rove-product-storage',
            storage: createJSONStorage(() => localStorage),
            skipHydration: true,
        }
    )
);
