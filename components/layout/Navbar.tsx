"use client";

import Link from "next/link";
import { User, ShoppingBag, Search, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useCart } from "@/hooks/use-cart";
import { CartSheet } from "@/components/cart/CartSheet";
import { AuthSheet } from "@/components/account/AuthSheet";
import { usePathname } from "next/navigation";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const isHomePage = pathname === "/";

    // Sheet States
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isAuthOpen, setIsAuthOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        const handleOpenCart = () => {
            console.log("Navbar: Received open-cart event");
            setIsCartOpen(true);
        };

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("open-cart", handleOpenCart);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("open-cart", handleOpenCart);
        }
    }, []);

    // Text color logic
    const textColorClass = (scrolled || !isHomePage) ? "text-gray-900" : "text-white";
    const hoverColorClass = (scrolled || !isHomePage) ? "hover:text-black" : "hover:text-white/80";

    return (
        <>
            <nav
                className={cn(
                    "fixed w-full z-50 transition-all duration-300 border-b border-transparent",
                    scrolled
                        ? "bg-white/5 backdrop-blur-md border-white/5 shadow-sm supports-[backdrop-filter]:bg-white/5"
                        : "bg-transparent",
                    textColorClass
                )}
            >
                {/* Changed max-w-7xl to max-w-screen-2xl to move items further away from center */}
                <div className="max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-12">
                    <div className="grid grid-cols-3 h-20 md:h-24 items-center">

                        {/* LEFT: Nav Links (Desktop) & Menu (Mobile) */}
                        <div className="flex items-center justify-start">
                            {/* Desktop Links */}
                            <div className="hidden lg:flex items-center gap-12">
                                {['Home', 'Shop', 'Collections', 'About'].map((item) => (
                                    <Link
                                        key={item}
                                        href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                        className={cn(
                                            "text-[11px] font-medium tracking-[0.15em] uppercase transition-colors",
                                            textColorClass,
                                            hoverColorClass
                                        )}
                                    >
                                        {item}
                                    </Link>
                                ))}
                            </div>

                            {/* Mobile Menu Button */}
                            <div className="flex lg:hidden">
                                <button
                                    onClick={() => setIsOpen(!isOpen)}
                                    className={cn("focus:outline-none", textColorClass)}
                                >
                                    <Menu size={24} />
                                </button>
                            </div>
                        </div>

                        {/* CENTER: Logo */}
                        <div className="flex justify-center">
                            <Link href="/" className={cn("font-display text-lg sm:text-2xl md:text-3xl font-bold tracking-tight uppercase", textColorClass)}>
                                Rove
                            </Link>
                        </div>

                        {/* RIGHT: Icons */}
                        <div className="flex items-center justify-end gap-6">
                            <button className={cn("transition-colors", hoverColorClass)}>
                                <Search size={18} strokeWidth={1.5} />
                            </button>
                            <button
                                onClick={() => setIsAuthOpen(true)}
                                className={cn("transition-colors hidden lg:block", hoverColorClass)}
                            >
                                <User size={18} strokeWidth={1.5} />
                            </button>
                            <button
                                onClick={() => setIsCartOpen(true)}
                                className={cn("relative transition-colors", hoverColorClass)}
                            >
                                <ShoppingBag size={18} strokeWidth={1.5} />
                                <CartBadge />
                            </button>
                        </div>

                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="lg:hidden bg-white/20 backdrop-blur-md border-t border-white/20 overflow-hidden text-black shadow-2xl supports-[backdrop-filter]:bg-white/20"
                        >
                            <div className="px-6 py-8 flex flex-col space-y-6">
                                {['Home', 'Shop', 'Collections', 'About'].map((item) => (
                                    <Link
                                        key={item}
                                        href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                        className="text-lg font-medium tracking-widest uppercase text-gray-900"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item}
                                    </Link>
                                ))}
                                <div className="h-px bg-gray-100 w-full my-2" />
                                <div className="flex items-center gap-6 pt-2">
                                    <Search size={20} strokeWidth={1.5} />
                                    <button onClick={() => { setIsOpen(false); setIsAuthOpen(true); }}><User size={20} strokeWidth={1.5} /></button>
                                    <button onClick={() => { setIsOpen(false); setIsCartOpen(true); }} className="relative">
                                        <ShoppingBag size={20} strokeWidth={1.5} />
                                        <CartBadge />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* Sheets */}
            <CartSheet isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
            <AuthSheet isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
        </>
    );
}

function CartBadge() {
    const cart = useCart();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted || cart.items.length === 0) return null;

    const count = cart.items.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <span className={cn(
            "absolute -top-1.5 -right-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-black text-[9px] font-medium text-white ring-1",
            // If we want dynamic ring, we'd need to pass props. accessible from usePathname? 
            // Ideally we pass `isHomePage` prop to it or useContext. For now let's just make it ring-white always, it's fine.
            "ring-white"
        )}>
            {count}
        </span>
    );
}
