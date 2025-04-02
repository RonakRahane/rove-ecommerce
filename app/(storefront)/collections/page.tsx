import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const collections = [
    {
        title: "New Arrivals",
        description: "The latest essentials for the modern wardrobe.",
        image: "/images/0UKj9f7pUpqZt7MywNLmzwOVA0.jpg",
        href: "/shop?ref=new"
    },
    {
        title: "Coats & Jackets",
        description: "Outerwear designed for timeless elegance.",
        image: "/images/83ADROPdXlydiFMtuiZlrOSAih4.jpg",
        href: "/shop?category=coats"
    },
    {
        title: "Knitwear",
        description: "Luxurious cashmere and wool blends.",
        image: "/images/0ybfh4vJr9EDuvvmRXXunj7ilo.jpg",
        href: "/shop?category=knitwear"
    },
    {
        title: "Dresses",
        description: "Silhouette-defining pieces for every occasion.",
        image: "/images/pv47qK687aQshuR1RoOgay17mNs.jpg",
        href: "/shop?category=dresses"
    }
];

export default function CollectionsPage() {
    return (
        <div className="pt-24 pb-20 min-h-screen bg-[#FAFAFA]">
            <div className="max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-12 py-12 md:py-20 text-center">
                <h1 className="font-sans font-bold text-4xl md:text-5xl uppercase tracking-tighter mb-4">
                    Collections
                </h1>
                <p className="text-gray-500 max-w-lg mx-auto text-sm md:text-base">
                    Curated edits of our finest pieces, designed to function as the foundation of a sophisticated wardrobe.
                </p>
            </div>

            <div className="max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12">
                    {collections.map((collection, idx) => (
                        <Link
                            key={collection.title}
                            href={collection.href}
                            className="group relative aspect-[4/5] md:aspect-[3/4] overflow-hidden bg-gray-100 block"
                        >
                            <Image
                                src={collection.image}
                                alt={collection.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />

                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 text-white">
                                <h2 className="text-2xl md:text-4xl font-bold font-sans uppercase tracking-tight mb-2">
                                    {collection.title}
                                </h2>
                                <p className="text-white/90 text-sm md:text-base max-w-xs mb-8 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                                    {collection.description}
                                </p>
                                <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-black uppercase tracking-widest text-xs h-12 px-8">
                                    View Collection
                                </Button>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
