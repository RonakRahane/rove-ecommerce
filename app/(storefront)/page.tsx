import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/ProductCard";
import { ArrowRight } from "lucide-react";
import prisma from "@/lib/prisma";
import { products as fallbackProducts } from "@/lib/data";

// Fetch products server-side from database with fallback to static mock data
async function getBestSellers() {
  try {
    const products = await prisma.product.findMany({
      where: { isFeatured: true },
      take: 8,
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

  return fallbackProducts.slice(0, 8).map((p) => ({
    id: p.id,
    title: p.title,
    price: p.price,
    category: p.category,
    image: p.image,
    slug: p.slug,
  }));
}

export default async function Home() {
  const bestSellers = await getBestSellers();

  return (
    <div className="flex flex-col gap-24 pb-20">

      {/* Hero Section */}
      <section className="relative h-[90vh] w-full flex items-center justify-center overflow-hidden">
        <Image
          src="/images/lz7VevuK2xSIXPDgDMoYCoIeCKU.jpg"
          alt="Rove Campaign Hero"
          fill
          className="object-cover object-[center_10%]"
          priority
        />
        <div className="absolute inset-0 bg-black/25" />
        <div className="relative z-10 text-center text-white space-y-6 max-w-4xl px-4">
          <p className="uppercase tracking-[0.2em] text-sm md:text-base font-medium">New Collection 2026</p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-none">
            Quiet <br className="hidden md:block" /> Luxury
          </h1>
          <div className="pt-8">
            <Link href="/shop">
              <Button variant="premium" className="px-10 py-6 text-sm">
                Discover Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Best Sellers - Horizontal Scroll */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-3xl md:text-4xl">Best Sellers</h2>
          <Link href="/shop" className="group flex items-center text-sm font-medium hover:text-gray-600 transition-colors">
            View All <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>

      {/* Editorial Slices / Collections */}
      <section className="grid grid-cols-1 md:grid-cols-2 h-[80vh] w-full">
        <div className="relative h-full w-full group overflow-hidden">
          <Image
            src="/images/7b15QPGvjNwIjzzRqyypwuGdibU.jpg"
            alt="Women's Collection"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
          <div className="absolute bottom-12 left-12 text-white">
            <h3 className="font-display text-4xl mb-2">Women</h3>
            <Link href="/collections/women" className="inline-block border-b border-white pb-1 hover:border-gray-300 transition-colors">
              Explore Category
            </Link>
          </div>
        </div>
        <div className="relative h-full w-full group overflow-hidden">
          <Image
            src="/images/83ADROPdXlydiFMtuiZlrOSAih4.jpg"
            alt="Accessories Collection"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
          <div className="absolute bottom-12 left-12 text-white">
            <h3 className="font-display text-4xl mb-2">Accessories</h3>
            <Link href="/collections/accessories" className="inline-block border-b border-white pb-1 hover:border-gray-300 transition-colors">
              Explore Category
            </Link>
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12">
        <div className="bg-[#F3F3F3] rounded-sm overflow-hidden flex flex-col md:flex-row">
          <div className="md:w-1/2 relative min-h-[400px]">
            <Image
              src="/images/f4jH3VSqGbIGRhlqeSoVLlYY5r4.jpg"
              alt="Sustainable Fabrics"
              fill
              className="object-cover"
            />
          </div>
          <div className="md:w-1/2 p-12 md:p-20 flex flex-col justify-center items-start">
            <span className="uppercase tracking-widest text-xs text-mute mb-4">Sustainability</span>
            <h2 className="font-display text-3xl md:text-5xl mb-6 leading-tight">Conscious by Design</h2>
            <p className="text-gray-600 mb-8 leading-relaxed max-w-md">
              We believe in full transparency. From our zero-waste knitting process to our biodegradable packaging, every decision is made with the planet in mind.
            </p>
            <div className="grid grid-cols-2 gap-8 mb-8 w-full">
              <div>
                <h4 className="font-medium text-lg mb-1">100%</h4>
                <p className="text-sm text-gray-500">Organic Cotton</p>
              </div>
              <div>
                <h4 className="font-medium text-lg mb-1">Zero</h4>
                <p className="text-sm text-gray-500">Plastic Packaging</p>
              </div>
            </div>
            <Button variant="outline" className="rounded-none border-black hover:bg-black hover:text-white transition-all">
              Read Our Report
            </Button>
          </div>
        </div>
      </section>

      {/* Social Proof / Instagram */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl mb-4">#RoveOnYou</h2>
          <p className="text-gray-500">Join our community. Tag us to be featured.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="aspect-square relative overflow-hidden group">
            <Image src="/images/kAEBCK1xRNbyB2zyTaVtYHLDI.jpg" alt="UGC 1" fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
          </div>
          <div className="aspect-square relative overflow-hidden group">
            <Image src="/images/pv47qK687aQshuR1RoOgay17mNs.jpg" alt="UGC 2" fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
          </div>
          <div className="aspect-square relative overflow-hidden group">
            <Image src="/images/qIBMbIBackRRA5jBU3ZYeuwT8pY.jpg" alt="UGC 3" fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
          </div>
          <div className="aspect-square relative overflow-hidden group">
            <Image src="/images/svSFNEad4UHBs5T9l1QXvF8mZ4.jpg" alt="UGC 4" fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
          </div>
        </div>
      </section>

    </div>
  );
}
