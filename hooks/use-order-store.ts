import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type OrderStatus = 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface OrderItem {
    id: string; // product id
    title: string;
    price: number;
    quantity: number;
    size?: string;
    color?: string;
    image: string;
}

export interface Order {
    id: string;
    customerName: string;
    customerEmail: string;
    total: number;
    status: OrderStatus;
    date: string;
    items: OrderItem[];
    shippingAddress: {
        street: string;
        city: string;
        zip: string;
        country: string;
    };
}

interface OrderStore {
    orders: Order[];
    addOrder: (order: Order) => void;
    updateOrderStatus: (id: string, status: OrderStatus) => void;
}

export const useOrderStore = create(
    persist<OrderStore>(
        (set) => ({
            orders: [],
            addOrder: (order) =>
                set((state) => ({ orders: [order, ...state.orders] })),
            updateOrderStatus: (id, status) =>
                set((state) => ({
                    orders: state.orders.map((o) =>
                        o.id === id ? { ...o, status } : o
                    ),
                })),
        }),
        {
            name: 'rove-order-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
