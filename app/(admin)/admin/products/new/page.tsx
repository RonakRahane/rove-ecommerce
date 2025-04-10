"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "@/components/ui/image-upload";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function AddProductPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const [error, setError] = useState("");

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        const formData = new FormData(e.currentTarget);
        const finalImage = imageUrl || "/images/placeholder.jpg";

        const productData = {
            title: formData.get("title") as string,
            price: Number(formData.get("price")),
            category: formData.get("category") as string,
            image: finalImage,
            description: formData.get("description") as string,
            features: ["New Arrival", "Premium Quality"],
        };

        try {
            const res = await fetch("/api/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(productData),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Failed to create product");
            }

            router.push("/admin/products");
            router.refresh();
        } catch (err: any) {
            setError(err.message);
            setIsLoading(false);
        }
    }

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/admin/products" className="p-2 hover:bg-gray-100 rounded-full">
                    <ChevronLeft size={20} />
                </Link>
                <h1 className="text-2xl font-bold tracking-tight">Add New Product</h1>
            </div>

            <form onSubmit={onSubmit} className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm space-y-6">

                {error && (
                    <div className="p-3 bg-red-100 border border-red-200 text-red-600 text-sm rounded-md">
                        {error}
                    </div>
                )}

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Product Title</label>
                    <input name="title" required className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent" placeholder="e.g. Silk Blouse" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Price ($)</label>
                        <input name="price" type="number" step="0.01" required className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent" placeholder="0.00" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Category</label>
                        <select name="category" className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent">
                            <option>Coats</option>
                            <option>Jackets</option>
                            <option>Dresses</option>
                            <option>Tops</option>
                            <option>Bottoms</option>
                            <option>Knitwear</option>
                            <option>Accessories</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Description</label>
                    <textarea name="description" required rows={4} className="flex w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent" placeholder="Product details..." />
                </div>

                <div className="space-y-3">
                    <Label>Product Image</Label>
                    <ImageUpload
                        value={imageUrl}
                        onChange={setImageUrl}
                        disabled={isLoading}
                    />
                    <p className="text-xs text-gray-500">Upload a high-quality product image.</p>
                </div>

                <div className="pt-4">
                    <Button disabled={isLoading} type="submit" className="w-full bg-black text-white hover:bg-zinc-800">
                        {isLoading ? "Saving..." : "Create Product"}
                    </Button>
                </div>

            </form>
        </div>
    );
}
