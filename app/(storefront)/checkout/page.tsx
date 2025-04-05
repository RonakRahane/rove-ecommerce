"use client";

import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function CheckoutPage() {
    const cart = useCart();
    const subtotal = cart.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <div className="min-h-screen bg-[#FAFAFA] pt-24 pb-20">
            <div className="max-w-screen-xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">

                {/* Left: Forms */}
                <div className="space-y-10">
                    <div>
                        <h2 className="text-lg font-medium uppercase tracking-widest mb-6">Contact</h2>
                        <input type="email" placeholder="Email" className="w-full p-3 border border-gray-300 rounded-sm focus:outline-none focus:border-black transition-colors" />
                    </div>

                    <div>
                        <h2 className="text-lg font-medium uppercase tracking-widest mb-6">Shipping Address</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <input type="text" placeholder="First Name" className="w-full p-3 border border-gray-300 rounded-sm focus:outline-none focus:border-black" />
                            <input type="text" placeholder="Last Name" className="w-full p-3 border border-gray-300 rounded-sm focus:outline-none focus:border-black" />
                            <input type="text" placeholder="Address" className="col-span-2 w-full p-3 border border-gray-300 rounded-sm focus:outline-none focus:border-black" />
                            <input type="text" placeholder="City" className="w-full p-3 border border-gray-300 rounded-sm focus:outline-none focus:border-black" />
                            <input type="text" placeholder="Postal Code" className="w-full p-3 border border-gray-300 rounded-sm focus:outline-none focus:border-black" />
                        </div>
                    </div>

                    <div>
                        <h2 className="text-lg font-medium uppercase tracking-widest mb-6">Payment</h2>
                        <div className="bg-gray-100 p-8 text-center text-gray-500 text-sm border border-gray-200">
                            Payment Gateway Integration Pending
                        </div>
                    </div>

                    <Button className="w-full h-14 bg-black text-white hover:bg-zinc-800 uppercase tracking-widest text-sm">
                        Pay Now ${subtotal.toFixed(2)}
                    </Button>
                </div>

                {/* Right: Summary */}
                <div className="bg-gray-50 p-8 lg:p-12 h-fit border border-gray-200/50">
                    <div className="space-y-6 mb-8">
                        {cart.items.map((item) => (
                            <div key={`${item.id}-${item.size}`} className="flex gap-4 items-center">
                                <div className="relative w-16 h-20 bg-white border border-gray-200 flex-shrink-0">
                                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                                    <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                        {item.quantity}
                                    </span>
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-medium text-sm">{item.title}</h4>
                                    <p className="text-xs text-gray-500">{item.size} / {item.color}</p>
                                </div>
                                <p className="font-medium text-sm">${item.price.toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                    <div className="h-px bg-gray-200 mb-6" />
                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-500">Subtotal</span>
                            <span className="font-medium">${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Shipping</span>
                            <span className="font-medium">Free</span>
                        </div>
                    </div>
                    <div className="h-px bg-gray-200 my-6" />
                    <div className="flex justify-between text-lg font-medium">
                        <span>Total</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                </div>

            </div>
        </div>
    );
}
