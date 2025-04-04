import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface CartItem {
    id: string;
    title: string;
    price: number;
    image: string;
    size?: string;
    color?: string;
    quantity: number;
}

interface CartStore {
    items: CartItem[];
    addItem: (data: CartItem) => void;
    removeItem: (id: string, size?: string, color?: string) => void;
    removeAll: () => void;
}

export const useCart = create(
    persist<CartStore>(
        (set, get) => ({
            items: [],
            addItem: (data: CartItem) => {
                const currentItems = get().items;
                const existingItem = currentItems.find(
                    (item) => item.id === data.id && item.size === data.size && item.color === data.color
                );

                if (existingItem) {
                    // If item exists, increase quantity
                    const updatedItems = currentItems.map((item) =>
                        item.id === data.id && item.size === data.size && item.color === data.color
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    );
                    set({ items: updatedItems });
                    // Optional: Toast "Item updated"
                } else {
                    set({ items: [...get().items, { ...data, quantity: 1 }] });
                    // Optional: Toast "Item added"
                }
            },
            removeItem: (id: string, size?: string, color?: string) => {
                set({
                    items: [...get().items.filter((item) => !(item.id === id && item.size === size && item.color === color))],
                });
            },
            removeAll: () => set({ items: [] }),
        }),
        {
            name: 'rove-cart-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
