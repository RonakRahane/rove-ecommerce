import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

// GET all orders
export async function GET() {
    try {
        const session = await auth();
        if (!session?.user || session.user.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const orders = await prisma.order.findMany({
            include: {
                user: {
                    select: { name: true, email: true },
                },
                orderItems: {
                    include: {
                        product: {
                            select: { title: true, images: true },
                        },
                    },
                },
            },
            orderBy: { createdAt: "desc" },
        });

        const formattedOrders = orders.map((order) => ({
            id: order.id,
            customerName: order.shippingName,
            customerEmail: order.user?.email || "Guest",
            status: order.status,
            total: Number(order.total),
            date: order.createdAt.toISOString(),
            shippingAddress: `${order.shippingAddress}, ${order.shippingCity}, ${order.shippingZip}, ${order.shippingCountry}`,
            items: order.orderItems.map((item) => ({
                id: item.id,
                title: item.title,
                price: Number(item.price),
                quantity: item.quantity,
                image: item.product?.images?.[0] || "/images/placeholder.jpg",
            })),
        }));

        return NextResponse.json(formattedOrders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
    }
}

// POST - Create test order (Admin only)
export async function POST(req: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user || session.user.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { items, customer } = body;

        // Calculate total
        const total = items.reduce(
            (sum: number, item: { price: number; quantity: number }) =>
                sum + item.price * item.quantity,
            0
        );

        // Create order
        const order = await prisma.order.create({
            data: {
                status: "PENDING",
                total: total,
                shippingName: customer.name,
                shippingAddress: customer.address,
                shippingCity: customer.city,
                shippingZip: customer.zip,
                shippingCountry: customer.country,
                orderItems: {
                    create: items.map((item: { productId: string; title: string; price: number; quantity: number }) => ({
                        productId: item.productId,
                        title: item.title,
                        price: item.price,
                        quantity: item.quantity,
                    })),
                },
            },
            include: {
                orderItems: true,
            },
        });

        return NextResponse.json({
            id: order.id,
            status: order.status,
            total: Number(order.total),
            items: order.orderItems.length,
        });
    } catch (error) {
        console.error("Error creating test order:", error);
        return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
    }
}
