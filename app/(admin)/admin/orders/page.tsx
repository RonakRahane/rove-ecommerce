"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Plus, Loader2, Eye, X } from "lucide-react";

type OrderStatus = "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";

interface OrderItem {
    id: string;
    title: string;
    price: number;
    quantity: number;
    image: string;
}

interface Order {
    id: string;
    customerName: string;
    customerEmail: string;
    status: OrderStatus;
    total: number;
    date: string;
    shippingAddress: string;
    items: OrderItem[];
}

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

    const fetchOrders = async () => {
        try {
            const res = await fetch("/api/orders");
            if (res.ok) {
                const data = await res.json();
                setOrders(data);
            }
        } catch (error) {
            console.error("Failed to fetch orders:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const updateOrderStatus = async (id: string, status: OrderStatus) => {
        setUpdatingStatus(id);
        try {
            const res = await fetch(`/api/orders/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            });
            if (res.ok) {
                setOrders(orders.map((o) =>
                    o.id === id ? { ...o, status } : o
                ));
            }
        } catch (error) {
            console.error("Failed to update status:", error);
        } finally {
            setUpdatingStatus(null);
        }
    };

    const statusColors: Record<OrderStatus, string> = {
        PENDING: "bg-yellow-100 text-yellow-800",
        PROCESSING: "bg-blue-100 text-blue-800",
        SHIPPED: "bg-purple-100 text-purple-800",
        DELIVERED: "bg-green-100 text-green-800",
        CANCELLED: "bg-red-100 text-red-800",
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-12">
                <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
                <Link href="/admin/orders/test">
                    <Button className="bg-black text-white hover:bg-zinc-800">
                        <Plus size={16} className="mr-2" />
                        Create Test Order
                    </Button>
                </Link>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-500 uppercase bg-gray-50">
                        <tr>
                            <th className="px-6 py-3">Order ID</th>
                            <th className="px-6 py-3">Customer</th>
                            <th className="px-6 py-3">Items</th>
                            <th className="px-6 py-3">Date</th>
                            <th className="px-6 py-3">Total</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                                    No orders found. <Link href="/admin/orders/test" className="text-blue-600 hover:underline">Create a test order</Link>
                                </td>
                            </tr>
                        ) : (
                            orders.map((order) => (
                                <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="px-6 py-4 font-mono text-xs">{order.id.slice(0, 8)}...</td>
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-gray-900">{order.customerName}</div>
                                        <div className="text-xs text-gray-500">{order.customerEmail}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-gray-600">{order.items.length} item(s)</span>
                                    </td>
                                    <td className="px-6 py-4">{new Date(order.date).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 font-medium">${order.total.toFixed(2)}</td>
                                    <td className="px-6 py-4">
                                        <select
                                            value={order.status}
                                            onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                                            disabled={updatingStatus === order.id}
                                            className={cn(
                                                "px-2 py-1 rounded-md text-xs font-medium border-none focus:ring-0 cursor-pointer",
                                                statusColors[order.status]
                                            )}
                                        >
                                            <option value="PENDING">Pending</option>
                                            <option value="PROCESSING">Processing</option>
                                            <option value="SHIPPED">Shipped</option>
                                            <option value="DELIVERED">Delivered</option>
                                            <option value="CANCELLED">Cancelled</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => setSelectedOrder(order)}
                                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                            title="View Details"
                                        >
                                            <Eye size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Order Details Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-6 border-b">
                            <h2 className="font-semibold text-lg">Order Details</h2>
                            <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-gray-100 rounded-full">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6 space-y-6">
                            {/* Order Info */}
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="text-gray-500">Order ID</span>
                                    <p className="font-mono">{selectedOrder.id}</p>
                                </div>
                                <div>
                                    <span className="text-gray-500">Date</span>
                                    <p>{new Date(selectedOrder.date).toLocaleString()}</p>
                                </div>
                                <div>
                                    <span className="text-gray-500">Status</span>
                                    <p className={cn("inline-block px-2 py-1 rounded-md text-xs font-medium mt-1", statusColors[selectedOrder.status])}>
                                        {selectedOrder.status}
                                    </p>
                                </div>
                                <div>
                                    <span className="text-gray-500">Total</span>
                                    <p className="font-semibold text-lg">${selectedOrder.total.toFixed(2)}</p>
                                </div>
                            </div>

                            {/* Customer Info */}
                            <div className="border-t pt-4">
                                <h3 className="font-medium mb-3">Customer Information</h3>
                                <div className="bg-gray-50 p-4 rounded-lg text-sm space-y-1">
                                    <p><strong>Name:</strong> {selectedOrder.customerName}</p>
                                    <p><strong>Email:</strong> {selectedOrder.customerEmail}</p>
                                    <p><strong>Address:</strong> {selectedOrder.shippingAddress}</p>
                                </div>
                            </div>

                            {/* Items */}
                            <div className="border-t pt-4">
                                <h3 className="font-medium mb-3">Order Items</h3>
                                <div className="space-y-3">
                                    {selectedOrder.items.map((item) => (
                                        <div key={item.id} className="flex gap-4 items-center bg-gray-50 p-3 rounded-lg">
                                            <div className="relative w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                                                <Image src={item.image} alt={item.title} fill className="object-cover" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-medium">{item.title}</p>
                                                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                            </div>
                                            <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
