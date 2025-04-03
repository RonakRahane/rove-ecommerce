import prisma from "@/lib/prisma";
import { products as fallbackProducts } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ProductDetailClient } from "./ProductDetailClient";

interface ProductPageProps {
    params: Promise<{ slug: string }>;
}

async function getProduct(slug: string) {
    try {
        const product = await prisma.product.findFirst({
            where: { slug },
            include: { category: true },
        });

        if (product) {
            return {
                id: product.id,
                title: product.title,
                slug: product.slug,
                description: product.description,
                price: Number(product.price),
                image: product.images[0] || "/images/placeholder.jpg",
                images: product.images.length > 0 ? product.images : ["/images/placeholder.jpg"],
                category: product.category?.name || "Uncategorized",
                sizes: ["XS", "S", "M", "L", "XL"],
                colors: ["Black", "White"],
                features: product.features,
            };
        }
    } catch (error) {
        console.warn("Database connection failed, falling back to mock data:", error);
    }

    const fallbackProduct = fallbackProducts.find((p) => p.slug === slug);
    if (!fallbackProduct) return null;

    return {
        id: fallbackProduct.id,
        title: fallbackProduct.title,
        slug: fallbackProduct.slug,
        description: fallbackProduct.description,
        price: fallbackProduct.price,
        image: fallbackProduct.image,
        images: fallbackProduct.images,
        category: fallbackProduct.category,
        sizes: fallbackProduct.sizes,
        colors: fallbackProduct.colors,
        features: fallbackProduct.features,
    };
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { slug } = await params;
    const product = await getProduct(slug);

    if (!product) {
        notFound();
    }

    return <ProductDetailClient product={product} />;
}
