import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { products as fallbackProducts } from "@/lib/data";
import { auth } from "@/auth";

// GET individual product
export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const product = await prisma.product.findUnique({
            where: { id },
            include: { category: true },
        });

        if (product) {
            return NextResponse.json({
                id: product.id,
                title: product.title,
                slug: product.slug,
                description: product.description,
                price: Number(product.price),
                image: product.images[0] || "/images/placeholder.jpg",
                images: product.images,
                category: product.category?.name || "Uncategorized",
                features: product.features,
                isFeatured: product.isFeatured,
            });
        }
    } catch (error) {
        console.warn("Error fetching product from DB, checking fallback data:", error);
    }

    const fallbackProduct = fallbackProducts.find((p) => p.id === id || p.slug === id);
    if (fallbackProduct) {
        return NextResponse.json(fallbackProduct);
    }

    return NextResponse.json({ error: "Product not found" }, { status: 404 });
}

// PATCH - Update product (toggle featured, etc.)
export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        if (!session?.user || session.user.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        const body = await req.json();

        const product = await prisma.product.update({
            where: { id },
            data: body,
        });

        return NextResponse.json({
            id: product.id,
            title: product.title,
            isFeatured: product.isFeatured,
        });
    } catch (error) {
        console.error("Error updating product:", error);
        return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
    }
}

// DELETE product
export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        if (!session?.user || session.user.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;

        await prisma.product.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting product:", error);
        return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
    }
}
