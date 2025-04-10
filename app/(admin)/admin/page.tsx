"use client";

import { useOrderStore } from "@/hooks/use-order-store";
import { useProductStore } from "@/hooks/use-product-store";
import { useEffect, useState } from "react";
import { DollarSign, ShoppingBag, ShoppingCart, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Assuming these exist or I'll use div
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
    const { orders } = useOrderStore();
    const { products } = useProductStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        useProductStore.persist.rehydrate();
        setMounted(true);
    }, []);

    if (!mounted) return <div className="p-8">Loading Dashboard...</div>;

    const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);
    const totalOrders = orders.length;
    const totalProducts = products.length;

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="Total Revenue"
                    value={`$${totalRevenue.toLocaleString()}`}
                    icon={DollarSign}
                    trend="+20.1% from last month"
                />
                <StatCard
                    title="Orders"
                    value={totalOrders.toString()}
                    icon={ShoppingCart}
                    trend="+180.1% from last month"
                />
                <StatCard
                    title="Products"
                    value={totalProducts.toString()}
                    icon={ShoppingBag}
                    trend="+12 this week"
                />
                <StatCard
                    title="Active Now"
                    value="573"
                    icon={TrendingUp}
                    trend="+201 since last hour"
                />
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="font-semibold text-lg">Recent Orders</h3>
                    <Button variant="outline" className="text-xs">View All</Button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-500 uppercase bg-gray-50">
                            <tr>
                                <th className="px-6 py-3">Order ID</th>
                                <th className="px-6 py-3">Customer</th>
                                <th className="px-6 py-3">Date</th>
                                <th className="px-6 py-3">Amount</th>
                                <th className="px-6 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                        No orders found.
                                    </td>
                                </tr>
                            ) : (
                                orders.slice(0, 5).map((order) => (
                                    <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium">{order.id.slice(0, 8)}...</td>
                                        <td className="px-6 py-4">{order.customerName}</td>
                                        <td className="px-6 py-4">{new Date(order.date).toLocaleDateString()}</td>
                                        <td className="px-6 py-4">${order.total.toFixed(2)}</td>
                                        <td className="px-6 py-4">
                                            <span className={cn(
                                                "px-2.5 py-0.5 rounded-full text-xs font-medium",
                                                order.status === 'Delivered' ? "bg-green-100 text-green-800" :
                                                    order.status === 'Processing' ? "bg-blue-100 text-blue-800" :
                                                        order.status === 'Shipped' ? "bg-purple-100 text-purple-800" :
                                                            "bg-gray-100 text-gray-800"
                                            )}>
                                                {order.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, icon: Icon, trend }: { title: string, value: string, icon: any, trend: string }) {
    return (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between pb-2">
                <span className="text-sm font-medium text-gray-500">{title}</span>
                <Icon size={16} className="text-gray-400" />
            </div>
            <div className="text-2xl font-bold">{value}</div>
            <p className="text-xs text-gray-500 mt-1">{trend}</p>
        </div>
    );
}

import { cn } from "@/lib/utils";
