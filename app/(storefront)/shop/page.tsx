import { FilterBar } from "@/components/ui/FilterBar";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/product/ProductGrid";
import prisma from "@/lib/prisma";
import { products as fallbackProducts } from "@/lib/data";

// Fetch all products from database server-side with fallback to static mock data
async function getProducts() {
    try {
        const products = await prisma.product.findMany({
            include: { category: true },
            orderBy: { createdAt: "desc" },
        });

        if (products.length > 0) {
            return products.map((p) => ({
                id: p.id,
                title: p.title,
                price: Number(p.price),
                category: p.category?.name || "Uncategorized",
                image: p.images[0] || "/images/placeholder.jpg",
                slug: p.slug,
            }));
        }
    } catch (error) {
        console.warn("Database connection failed, falling back to mock data:", error);
    }

    return fallbackProducts.map((p) => ({
        id: p.id,
        title: p.title,
        price: p.price,
        category: p.category,
        image: p.image,
        slug: p.slug,
    }));
}

export default async function ShopPage() {
    const products = await getProducts();

    return (
        <div className="pt-24 pb-20 min-h-screen bg-[#FAFAFA]">

            {/* Header */}
            <div className="max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-12 py-12 md:py-20 text-center">
                <h1 className="font-sans font-bold text-4xl md:text-5xl uppercase tracking-tighter mb-4">
                    Shop All
                </h1>
                <p className="text-gray-500 max-w-lg mx-auto text-sm md:text-base">
                    Discover our latest collection of timeless essentials, crafted with precision and care for the modern wardrobe.
                </p>
            </div>

            {/* Filter Bar */}
            <FilterBar />

            {/* Product Grid */}
            <div className="max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
                <ProductGrid products={products} />

                {/* Load More */}
                <div className="mt-20 text-center">
                    <Button variant="outline" className="px-12 py-6 uppercase tracking-widest text-xs border-gray-300 hover:border-black hover:bg-black hover:text-white transition-colors">
                        Load More
                    </Button>
                </div>
            </div>

        </div>
    );
}
