"use client";

import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Trash2, Minus, Plus, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function CartPage() {
    const cart = useCart();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const subtotal = cart.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <div className="pt-32 pb-20 min-h-screen bg-[#FAFAFA]">
            <div className="max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-12">
                <h1 className="font-sans font-bold text-3xl md:text-4xl uppercase tracking-tighter mb-12">
                    Shopping Bag ({cart.items.length})
                </h1>

                {cart.items.length === 0 ? (
                    <div className="text-center py-20 bg-white border border-gray-100">
                        <p className="text-gray-500 mb-6">Your bag is currently empty.</p>
                        <Link href="/shop">
                            <Button variant="premium" className="px-8 py-4">
                                Continue Shopping
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-12">

                        {/* Cart Items List */}
                        <div className="lg:w-2/3 space-y-6">
                            {cart.items.map((item) => (
                                <div key={`${item.id}-${item.size}-${item.color}`} className="bg-white border border-gray-100 p-6 flex gap-6 relative">
                                    <div className="relative w-24 h-32 bg-gray-100 flex-shrink-0">
                                        <Image src={item.image} alt={item.title} fill className="object-cover" />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-medium text-gray-900 uppercase tracking-wide text-sm">{item.title}</h3>
                                                <p className="text-sm text-gray-500 mt-1">{item.color} / {item.size}</p>
                                            </div>
                                            <p className="font-medium text-sm">${item.price.toFixed(2)}</p>
                                        </div>

                                        <div className="flex items-center justify-between mt-4">
                                            <div className="flex items-center border border-gray-200">
                                                <button className="p-2 hover:bg-gray-50" disabled>
                                                    <Minus size={14} className="text-gray-400" />
                                                </button>
                                                <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                                <button
                                                    onClick={() => cart.addItem(item)}
                                                    className="p-2 hover:bg-gray-50"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => cart.removeItem(item.id, item.size, item.color)}
                                                className="text-gray-400 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:w-1/3">
                            <div className="bg-white border border-gray-100 p-8 sticky top-32">
                                <h2 className="font-medium uppercase tracking-widest text-sm mb-6">Order Summary</h2>
                                <div className="space-y-4 text-sm mb-6">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Shipping</span>
                                        <span>Calculated at checkout</span>
                                    </div>
                                </div>
                                <div className="h-px bg-gray-100 mb-6" />
                                <div className="flex justify-between font-medium text-base mb-8">
                                    <span>Total</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <Link href="/checkout">
                                    <Button className="w-full h-12 bg-black text-white hover:bg-zinc-800 uppercase tracking-widest text-xs flex items-center justify-center gap-2">
                                        Checkout <ArrowRight size={16} />
                                    </Button>
                                </Link>
                                <div className="mt-6 text-xs text-center text-gray-400">
                                    Taxes included. Secure checkout.
                                </div>
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
}
