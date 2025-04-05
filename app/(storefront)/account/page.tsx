"use client";

import { Button } from "@/components/ui/button";
import { User, Package, LogOut } from "lucide-react";

export default function AccountPage() {
    return (
        <div className="pt-32 pb-20 min-h-screen bg-[#FAFAFA]">
            <div className="max-w-4xl mx-auto px-6 sm:px-8">
                <div className="flex items-center justify-between mb-12">
                    <h1 className="font-sans font-bold text-3xl md:text-4xl uppercase tracking-tighter">
                        My Account
                    </h1>
                    <Button variant="outline" className="text-xs uppercase tracking-widest flex items-center gap-2">
                        <LogOut size={16} /> Sign Out
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Sidebar mockup */}
                    <div className="md:col-span-1 space-y-2">
                        <button className="w-full flex items-center gap-3 px-4 py-3 bg-black text-white rounded-sm text-sm font-medium">
                            <Package size={18} /> Orders
                        </button>
                        <button className="w-full flex items-center gap-3 px-4 py-3 bg-white text-gray-600 border border-transparent hover:border-gray-200 rounded-sm text-sm font-medium transition-all">
                            <User size={18} /> Profile
                        </button>
                    </div>

                    {/* Content (Orders) */}
                    <div className="md:col-span-2 space-y-6">
                        <div className="bg-white border border-gray-100 p-8 text-center min-h-[300px] flex flex-col items-center justify-center">
                            <Package size={48} className="text-gray-200 mb-4" strokeWidth={1} />
                            <h3 className="font-medium text-lg mb-2">No orders yet</h3>
                            <p className="text-gray-500 text-sm mb-6">You haven't placed any orders yet.</p>
                            <Button variant="premium">
                                Start Shopping
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
