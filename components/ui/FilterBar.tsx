"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, SlidersHorizontal } from "lucide-react";

const categories = ["All", "New Arrivals", "Coats", "Jackets", "Knitwear", "Bottoms", "Accessories"];
const sortOptions = ["Newest", "Price: Low to High", "Price: High to Low", "Best Sellers"];

export function FilterBar() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [isSortOpen, setIsSortOpen] = useState(false);

    return (
        <div className="sticky top-20 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 py-4 transition-all duration-300">
            <div className="max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">

                {/* Categories (Desktop) */}
                <div className="hidden md:flex items-center gap-8 overflow-x-auto no-scrollbar">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={cn(
                                "text-xs font-medium uppercase tracking-widest whitespace-nowrap transition-colors",
                                activeCategory === cat ? "text-black border-b border-black pb-1" : "text-gray-500 hover:text-black"
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Mobile Categories & Filter Toggle */}
                <div className="flex md:hidden w-full items-center justify-between">
                    <span className="text-xs uppercase font-medium tracking-widest text-black">{activeCategory}</span>
                    <button className="flex items-center gap-2 text-xs uppercase font-medium tracking-widest">
                        Filter <SlidersHorizontal size={14} />
                    </button>
                </div>

                {/* Sort Dropdown */}
                <div className="relative ml-auto">
                    <button
                        onClick={() => setIsSortOpen(!isSortOpen)}
                        className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest hover:text-gray-600 transition-colors"
                    >
                        Sort By <ChevronDown size={14} />
                    </button>

                    {isSortOpen && (
                        <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 shadow-lg p-2 flex flex-col gap-1">
                            {sortOptions.map((option) => (
                                <button
                                    key={option}
                                    className="text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-black transition-colors"
                                    onClick={() => setIsSortOpen(false)}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
