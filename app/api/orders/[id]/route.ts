import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

// GET single order
export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        if (!session?.user || session.user.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;

        const order = await prisma.order.findUnique({
            where: { id },
            include: {
                user: true,
                orderItems: {
                    include: {
                        product: true,
                    },
                },
            },
        });

        if (!order) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        return NextResponse.json({
            id: order.id,
            status: order.status,
            total: Number(order.total),
            customerName: order.shippingName,
            customerEmail: order.user?.email || "Guest",
            shippingAddress: order.shippingAddress,
            shippingCity: order.shippingCity,
            shippingZip: order.shippingZip,
            shippingCountry: order.shippingCountry,
            createdAt: order.createdAt,
            items: order.orderItems.map((item) => ({
                id: item.id,
                title: item.title,
                price: Number(item.price),
                quantity: item.quantity,
                productId: item.productId,
                image: item.product?.images?.[0] || "/images/placeholder.jpg",
            })),
        });
    } catch (error) {
        console.error("Error fetching order:", error);
        return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 });
    }
}

// PATCH - Update order status
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

        const order = await prisma.order.update({
            where: { id },
            data: { status: body.status },
        });

        return NextResponse.json({
            id: order.id,
            status: order.status,
        });
    } catch (error) {
        console.error("Error updating order:", error);
        return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
    }
}
