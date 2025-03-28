
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Twitter, ArrowRight } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-background border-t border-gray-100 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">

                    {/* Brand Column */}
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="font-display text-2xl tracking-tight mb-4 inline-block">
                            Rove
                        </Link>
                        <p className="text-gray-500 text-sm leading-relaxed mt-4">
                            Elevating everyday essentials with sustainable integrity and timeless design.
                        </p>
                    </div>

                    {/* Links Column 1 */}
                    <div>
                        <h3 className="font-medium text-sm uppercase tracking-widest mb-6">Shop</h3>
                        <ul className="space-y-3 text-sm text-gray-500">
                            <li><Link href="/products?category=new" className="hover:text-black transition-colors">New Arrivals</Link></li>
                            <li><Link href="/products?category=clothing" className="hover:text-black transition-colors">Clothing</Link></li>
                            <li><Link href="/products?category=accessories" className="hover:text-black transition-colors">Accessories</Link></li>
                            <li><Link href="/collections" className="hover:text-black transition-colors">Collections</Link></li>
                        </ul>
                    </div>

                    {/* Links Column 2 */}
                    <div>
                        <h3 className="font-medium text-sm uppercase tracking-widest mb-6">About</h3>
                        <ul className="space-y-3 text-sm text-gray-500">
                            <li><Link href="/about" className="hover:text-black transition-colors">Our Story</Link></li>
                            <li><Link href="/sustainability" className="hover:text-black transition-colors">Sustainability</Link></li>
                            <li><Link href="/stores" className="hover:text-black transition-colors">Stores</Link></li>
                            <li><Link href="/contact" className="hover:text-black transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter Column */}
                    <div>
                        <h3 className="font-medium text-sm uppercase tracking-widest mb-6">Newsletter</h3>
                        <p className="text-gray-500 text-sm mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
                        <form className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 min-w-0 px-3 py-2 text-sm border-b border-gray-300 focus:outline-none focus:border-black bg-transparent"
                            />
                            <button type="submit" className="text-sm font-medium hover:text-gray-600 transition-colors">
                                <ArrowRight size={16} />
                            </button>
                        </form>
                        <div className="flex space-x-4 mt-6">
                            <Link href="#" className="text-gray-400 hover:text-black transition-colors"><Instagram size={20} /></Link>
                            <Link href="#" className="text-gray-400 hover:text-black transition-colors"><Twitter size={20} /></Link>
                            <Link href="#" className="text-gray-400 hover:text-black transition-colors"><Facebook size={20} /></Link>
                        </div>
                    </div>

                </div>

                <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Rove. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link href="/privacy" className="hover:text-black transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-black transition-colors">Terms of Service</Link>
                    </div>
                </div>

                {/* Large Brand Watermark */}
                <div className="mt-12 text-center pointer-events-none select-none opacity-[0.13]">
                    <span className="font-display text-[12vw] leading-none tracking-tighter color-black">
                        ROVE
                    </span>
                </div>
            </div>
        </footer>
    );
}
