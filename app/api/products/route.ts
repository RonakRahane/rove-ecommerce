import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { products as fallbackProducts } from "@/lib/data";
import { auth } from "@/auth";

// GET all products
export async function GET() {
    try {
        const products = await prisma.product.findMany({
            include: {
                category: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        if (products.length > 0) {
            // Transform to match existing frontend format
            const formattedProducts = products.map((p) => ({
                id: p.id,
                title: p.title,
                slug: p.slug,
                description: p.description,
                price: Number(p.price),
                image: p.images[0] || "/images/placeholder.jpg",
                images: p.images,
                category: p.category?.name || "Uncategorized",
                sizes: ["XS", "S", "M", "L", "XL"],
                colors: ["Black", "White"],
                features: p.features,
                isFeatured: p.isFeatured,
            }));

            return NextResponse.json(formattedProducts);
        }
    } catch (error) {
        console.warn("Error fetching products from DB, returning fallback products:", error);
    }

    return NextResponse.json(fallbackProducts);
}

// POST - Create new product
export async function POST(req: NextRequest) {
    try {
        // Auth Check
        const session = await auth();
        if (!session?.user || session.user.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { title, price, category, image, description, features = [], isFeatured = false } = body;

        // Find or create category
        let categoryRecord = await prisma.category.findFirst({
            where: { name: category },
        });

        if (!categoryRecord) {
            categoryRecord = await prisma.category.create({
                data: {
                    name: category,
                    slug: category.toLowerCase().replace(/\s+/g, "-"),
                },
            });
        }

        // Create product
        const product = await prisma.product.create({
            data: {
                title,
                slug: title.toLowerCase().replace(/\s+/g, "-"),
                description: description || "",
                price: price,
                images: image ? [image] : [],
                features: features,
                categoryId: categoryRecord.id,
                isFeatured: isFeatured,
            },
        });

        return NextResponse.json({
            id: product.id,
            title: product.title,
            slug: product.slug,
            description: product.description,
            price: Number(product.price),
            image: product.images[0] || "/images/placeholder.jpg",
            images: product.images,
            category: category,
            sizes: ["XS", "S", "M", "L", "XL"],
            colors: ["Black", "White"],
            features: product.features,
            isFeatured: product.isFeatured,
        });
    } catch (error) {
        console.error("Error creating product:", error);
        return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
    }
}
