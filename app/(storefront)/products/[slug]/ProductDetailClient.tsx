"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Star, Check, Truck, ShieldCheck } from "lucide-react";

interface Product {
    id: string;
    title: string;
    slug: string;
    description: string;
    price: number;
    image: string;
    images: string[];
    category: string;
    sizes: string[];
    colors: string[];
    features: string[];
}

interface ProductDetailClientProps {
    product: Product;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
    const cart = useCart();
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]);
    const [mainImage, setMainImage] = useState(product.image);

    useEffect(() => {
        setMainImage(product.image);
        setSelectedColor(product.colors[0]);
        setSelectedSize(null);
    }, [product]);

    const onAddToCart = () => {
        if (!selectedSize) {
            alert("Please select a size.");
            return;
        }

        cart.addItem({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            size: selectedSize,
            color: selectedColor,
            quantity: 1,
        });

        window.dispatchEvent(new Event("open-cart"));
    };

    return (
        <div className="pt-24 pb-20 min-h-screen bg-[#FAFAFA]">
            <div className="max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Left: Images */}
                    <div className="space-y-4">
                        <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100">
                            <Image
                                src={mainImage}
                                alt={product.title}
                                fill
                                className="object-cover object-center"
                                priority
                            />
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {product.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setMainImage(img)}
                                    className={cn(
                                        "relative aspect-[3/4] w-full overflow-hidden bg-gray-100 transition-all",
                                        mainImage === img
                                            ? "ring-1 ring-black opacity-100"
                                            : "opacity-70 hover:opacity-100"
                                    )}
                                >
                                    <Image src={img} alt={`View ${idx} `} fill className="object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right: Details */}
                    <div className="lg:sticky lg:top-32 h-fit space-y-10">
                        <div className="space-y-4">
                            <h1 className="font-sans font-bold text-4xl md:text-5xl uppercase tracking-tighter text-gray-900">
                                {product.title}
                            </h1>
                            <div className="flex items-center justify-between">
                                <span className="text-2xl font-medium text-gray-900">
                                    ${product.price.toFixed(2)}
                                </span>
                                <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 fill-black text-black" />
                                    <Star className="w-4 h-4 fill-black text-black" />
                                    <Star className="w-4 h-4 fill-black text-black" />
                                    <Star className="w-4 h-4 fill-black text-black" />
                                    <Star className="w-4 h-4 text-gray-300" />
                                    <span className="text-xs text-gray-500 ml-2">(42 Reviews)</span>
                                </div>
                            </div>
                        </div>

                        <div className="h-px bg-gray-200" />

                        <div className="prose prose-sm text-gray-600">
                            <p>{product.description}</p>
                        </div>

                        <div className="space-y-6">
                            {/* Color */}
                            <div>
                                <span className="text-sm font-medium uppercase tracking-widest text-gray-500 mb-3 block">
                                    Color: {selectedColor}
                                </span>
                                <div className="flex gap-3">
                                    {product.colors.map((color) => (
                                        <button
                                            key={color}
                                            onClick={() => setSelectedColor(color)}
                                            className={cn(
                                                "h-8 w-8 rounded-full border border-gray-200 shadow-sm flex items-center justify-center transition-all",
                                                selectedColor === color
                                                    ? "ring-1 ring-offset-2 ring-black scale-110"
                                                    : "hover:scale-105"
                                            )}
                                            style={{
                                                backgroundColor:
                                                    color.toLowerCase() === "beige"
                                                        ? "#F5F5DC"
                                                        : color.toLowerCase() === "olive"
                                                            ? "#808000"
                                                            : color.toLowerCase(),
                                            }}
                                        >
                                            {selectedColor === color && (
                                                <Check
                                                    className={cn(
                                                        "w-4 h-4",
                                                        color === "Beige" || color === "White"
                                                            ? "text-black"
                                                            : "text-white"
                                                    )}
                                                />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Size */}
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-sm font-medium uppercase tracking-widest text-gray-500">
                                        Size
                                    </span>
                                    <button className="text-xs underline text-gray-400 hover:text-black">
                                        Size Guide
                                    </button>
                                </div>
                                <div className="grid grid-cols-5 gap-3">
                                    {product.sizes.map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={cn(
                                                "h-12 border flex items-center justify-center text-sm font-medium transition-all",
                                                selectedSize === size
                                                    ? "border-black bg-black text-white"
                                                    : "border-gray-200 text-gray-900 hover:border-gray-900"
                                            )}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="space-y-4 pt-4">
                            <Button
                                onClick={onAddToCart}
                                className="w-full h-14 bg-black text-white hover:bg-zinc-800 text-sm uppercase tracking-[0.2em] rounded-none"
                            >
                                Add to Bag — ${product.price.toFixed(2)}
                            </Button>
                            <p className="text-xs text-center text-gray-500">
                                Free shipping on all orders over $500
                            </p>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-100">
                            <div className="flex items-center gap-3">
                                <Truck className="w-5 h-5 text-gray-400" strokeWidth={1.5} />
                                <div className="text-xs">
                                    <p className="font-medium text-gray-900">Fast Delivery</p>
                                    <p className="text-gray-500">2-3 business days</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <ShieldCheck className="w-5 h-5 text-gray-400" strokeWidth={1.5} />
                                <div className="text-xs">
                                    <p className="font-medium text-gray-900">Secure Checkout</p>
                                    <p className="text-gray-500">100% protected</p>
                                </div>
                            </div>
                        </div>

                        {/* Features */}
                        <div className="pt-6">
                            <h4 className="text-sm font-medium uppercase tracking-widest mb-4">
                                Product Details
                            </h4>
                            <ul className="space-y-2 text-sm text-gray-600 list-disc pl-4">
                                {product.features.map((f) => (
                                    <li key={f}>{f}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
