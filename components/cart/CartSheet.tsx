"use client";

import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface CartSheetProps {
    isOpen: boolean;
    onClose: () => void;
}

export function CartSheet({ isOpen, onClose }: CartSheetProps) {
    const cart = useCart();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const subtotal = cart.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/30 backdrop-blur-md z-[60]"
                    />

                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "tween", duration: 0.4, ease: "easeOut" }}
                        className="fixed top-0 right-0 h-full w-full sm:w-[500px] bg-white z-[70] shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                            <h2 className="text-xl font-bold font-sans uppercase tracking-tight">Cart</h2>
                            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-8">
                            {cart.items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                    <p className="text-gray-500">Your cart is empty.</p>
                                    <Button onClick={onClose} variant="premium">Start Shopping</Button>
                                </div>
                            ) : (
                                cart.items.map((item) => (
                                    <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-4">
                                        {/* Image */}
                                        <div className="relative w-24 h-32 bg-gray-100 flex-shrink-0 overflow-hidden">
                                            <Image src={item.image} alt={item.title} fill className="object-cover" />
                                        </div>

                                        {/* Details */}
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h4 className="text-sm font-medium text-gray-900">{item.title}</h4>
                                                    <p className="text-xs text-gray-500 mt-1">{item.size && `${item.size} /`} {item.color}</p>
                                                </div>
                                                <button
                                                    onClick={() => cart.removeItem(item.id, item.size, item.color)}
                                                    className="text-xs text-red-500 hover:text-red-700 underline"
                                                >
                                                    Remove
                                                </button>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center border border-gray-200 rounded-sm">
                                                    <button
                                                        className="px-2 py-1 hover:bg-gray-50 text-gray-500 disabled:opacity-50"
                                                        disabled={item.quantity <= 1}
                                                    // Add decrement logic here if needed (e.g., custom hook method)
                                                    >
                                                        <Minus size={12} />
                                                    </button>
                                                    <span className="w-8 text-center text-xs font-medium">{item.quantity}</span>
                                                    <button
                                                        className="px-2 py-1 hover:bg-gray-50 text-gray-900"
                                                        onClick={() => cart.addItem(item)}
                                                    >
                                                        <Plus size={12} />
                                                    </button>
                                                </div>
                                                <p className="text-sm font-medium">${item.price.toFixed(2)}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {cart.items.length > 0 && (
                            <div className="p-6 border-t border-gray-100 bg-gray-50/50 space-y-4">
                                <h3 className="font-medium text-sm">Order Summary</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Taxes</span>
                                        <span>Calculated at checkout</span>
                                    </div>
                                </div>
                                <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
                                    <span>Total</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <Link href="/checkout" onClick={onClose} className="block w-full">
                                    <Button className="w-full h-12 bg-black text-white hover:bg-zinc-800 uppercase tracking-widest text-xs rounded-full">
                                        Proceed to Checkout
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
