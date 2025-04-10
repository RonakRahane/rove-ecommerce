"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Plus, Minus, Trash2, Loader2, CheckCircle } from "lucide-react";
import Link from "next/link";

interface Product {
    id: string;
    title: string;
    price: number;
    image: string;
    category: string;
}

interface CartItem extends Product {
    quantity: number;
}

export default function TestCheckoutPage() {
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [orderId, setOrderId] = useState<string | null>(null);

    // Customer info
    const [customer, setCustomer] = useState({
        name: "Test Customer",
        address: "123 Test Street",
        city: "New York",
        zip: "10001",
        country: "USA",
    });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("/api/products");
                if (res.ok) {
                    const data = await res.json();
                    setProducts(data);
                }
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const addToCart = (product: Product) => {
        const existing = cart.find((item) => item.id === product.id);
        if (existing) {
            setCart(cart.map((item) =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ));
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    const updateQuantity = (id: string, delta: number) => {
        setCart(cart.map((item) =>
            item.id === id
                ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                : item
        ).filter((item) => item.quantity > 0));
    };

    const removeFromCart = (id: string) => {
        setCart(cart.filter((item) => item.id !== id));
    };

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const submitOrder = async () => {
        if (cart.length === 0) {
            alert("Please add items to cart first");
            return;
        }

        setIsSubmitting(true);

        try {
            const res = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    customer,
                    items: cart.map((item) => ({
                        productId: item.id,
                        title: item.title,
                        price: item.price,
                        quantity: item.quantity,
                    })),
                }),
            });

            if (res.ok) {
                const data = await res.json();
                setOrderId(data.id);
                setSuccess(true);
                setCart([]);
            } else {
                throw new Error("Failed to create order");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to create order");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (success) {
        return (
            <div className="max-w-2xl mx-auto text-center py-20 space-y-6">
                <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />
                <h1 className="text-3xl font-bold">Test Order Created!</h1>
                <p className="text-gray-500">Order ID: <code className="bg-gray-100 px-2 py-1 rounded">{orderId}</code></p>
                <div className="flex gap-4 justify-center pt-6">
                    <Button onClick={() => { setSuccess(false); setOrderId(null); }} variant="outline">
                        Create Another
                    </Button>
                    <Link href="/admin/orders">
                        <Button className="bg-black text-white hover:bg-zinc-800">
                            View All Orders
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-full">
                    <ChevronLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Test Checkout</h1>
                    <p className="text-gray-500 text-sm">Create test orders without payment to verify the order flow</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Product Selection */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <h2 className="font-semibold mb-4">Select Products</h2>
                        {isLoading ? (
                            <div className="flex justify-center py-8">
                                <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-[400px] overflow-y-auto">
                                {products.map((product) => (
                                    <button
                                        key={product.id}
                                        onClick={() => addToCart(product)}
                                        className="text-left border border-gray-200 rounded-lg p-3 hover:border-black transition-colors group"
                                    >
                                        <div className="relative aspect-square bg-gray-100 rounded-md overflow-hidden mb-2">
                                            <Image src={product.image} alt={product.title} fill className="object-cover" />
                                        </div>
                                        <p className="font-medium text-sm truncate">{product.title}</p>
                                        <p className="text-gray-500 text-xs">${product.price}</p>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Customer Info */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <h2 className="font-semibold mb-4">Test Customer Info</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                                <label className="text-sm text-gray-600">Name</label>
                                <input
                                    value={customer.name}
                                    onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="text-sm text-gray-600">Address</label>
                                <input
                                    value={customer.address}
                                    onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                                />
                            </div>
                            <div>
                                <label className="text-sm text-gray-600">City</label>
                                <input
                                    value={customer.city}
                                    onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                                />
                            </div>
                            <div>
                                <label className="text-sm text-gray-600">ZIP</label>
                                <input
                                    value={customer.zip}
                                    onChange={(e) => setCustomer({ ...customer, zip: e.target.value })}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="text-sm text-gray-600">Country</label>
                                <input
                                    value={customer.country}
                                    onChange={(e) => setCustomer({ ...customer, country: e.target.value })}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Cart Summary */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm sticky top-32">
                        <h2 className="font-semibold mb-4">Order Summary</h2>

                        {cart.length === 0 ? (
                            <p className="text-gray-500 text-sm text-center py-8">Click products to add to order</p>
                        ) : (
                            <div className="space-y-4">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex gap-3 items-center">
                                        <div className="relative w-12 h-12 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                                            <Image src={item.image} alt={item.title} fill className="object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-sm truncate">{item.title}</p>
                                            <p className="text-xs text-gray-500">${item.price} × {item.quantity}</p>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:bg-gray-100 rounded">
                                                <Minus size={14} />
                                            </button>
                                            <span className="w-6 text-center text-sm">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:bg-gray-100 rounded">
                                                <Plus size={14} />
                                            </button>
                                            <button onClick={() => removeFromCart(item.id)} className="p-1 hover:bg-red-50 text-red-500 rounded ml-1">
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                <div className="border-t pt-4 mt-4">
                                    <div className="flex justify-between font-semibold">
                                        <span>Total</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        <Button
                            onClick={submitOrder}
                            disabled={cart.length === 0 || isSubmitting}
                            className="w-full mt-6 bg-black text-white hover:bg-zinc-800"
                        >
                            {isSubmitting ? (
                                <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Creating Order...</>
                            ) : (
                                "Create Test Order"
                            )}
                        </Button>

                        <p className="text-xs text-gray-400 text-center mt-3">
                            No payment required - for testing only
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
