"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Star, Loader2, Check } from "lucide-react";
import Link from "next/link";

interface Product {
    id: string;
    title: string;
    price: number;
    image: string;
    category: string;
    isFeatured: boolean;
}

export default function AdminSettingsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [saving, setSaving] = useState<string | null>(null);

    const fetchProducts = async () => {
        try {
            const res = await fetch("/api/products");
            if (res.ok) {
                const data = await res.json();
                setProducts(data);
            }
        } catch (error) {
            console.error("Failed to fetch products:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const toggleFeatured = async (id: string, currentStatus: boolean) => {
        setSaving(id);
        try {
            const res = await fetch(`/api/products/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isFeatured: !currentStatus }),
            });

            if (res.ok) {
                setProducts(products.map((p) =>
                    p.id === id ? { ...p, isFeatured: !currentStatus } : p
                ));
            }
        } catch (error) {
            console.error("Failed to update:", error);
        } finally {
            setSaving(null);
        }
    };

    const featuredCount = products.filter((p) => p.isFeatured).length;

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-12">
                <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Homepage Settings</h1>
                <p className="text-gray-500 mt-2">
                    Select which products appear in the "Best Sellers" section on the homepage.
                </p>
            </div>

            {/* Featured Count Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-blue-600" />
                    <span className="text-blue-800">
                        <strong>{featuredCount}</strong> product{featuredCount !== 1 ? "s" : ""} currently featured on homepage
                    </span>
                </div>
                <Link href="/" target="_blank" className="text-blue-600 hover:underline text-sm">
                    View Homepage →
                </Link>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className={`bg-white rounded-xl border-2 shadow-sm overflow-hidden transition-all ${product.isFeatured ? "border-yellow-400 ring-2 ring-yellow-100" : "border-gray-200"
                            }`}
                    >
                        {/* Image */}
                        <div className="relative aspect-[4/3] bg-gray-100">
                            <Image
                                src={product.image}
                                alt={product.title}
                                fill
                                className="object-cover"
                            />
                            {product.isFeatured && (
                                <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                                    <Star className="w-3 h-3 fill-current" /> Featured
                                </div>
                            )}
                        </div>

                        {/* Info */}
                        <div className="p-4 space-y-3">
                            <div>
                                <h3 className="font-medium text-gray-900 truncate">{product.title}</h3>
                                <p className="text-sm text-gray-500">{product.category} • ${product.price}</p>
                            </div>

                            <Button
                                onClick={() => toggleFeatured(product.id, product.isFeatured)}
                                disabled={saving === product.id}
                                variant={product.isFeatured ? "default" : "outline"}
                                className={`w-full ${product.isFeatured
                                        ? "bg-yellow-400 text-yellow-900 hover:bg-yellow-500"
                                        : "border-gray-300 hover:border-black"
                                    }`}
                            >
                                {saving === product.id ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : product.isFeatured ? (
                                    <>
                                        <Check className="w-4 h-4 mr-2" /> Featured
                                    </>
                                ) : (
                                    <>
                                        <Star className="w-4 h-4 mr-2" /> Add to Featured
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
