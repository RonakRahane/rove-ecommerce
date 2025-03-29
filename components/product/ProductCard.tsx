
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
    id: string;
    title: string;
    price: number;
    image: string;
    category: string;
    slug: string;
}

export function ProductCard({ title, price, image, category, slug }: ProductCardProps) {
    return (
        <div className="group relative">
            <div className="aspect-[3/4] w-full overflow-hidden bg-gray-100 relative">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                />
                {/* Quick Add Button - fades in on hover */}
                <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    <Button className="w-full bg-white/30 backdrop-blur-xl border border-white/40 text-black hover:bg-white/50 shadow-md transition-all">
                        Quick Add
                    </Button>
                </div>
            </div>
            <div className="mt-4 flex justify-between">
                <div>
                    <h3 className="text-sm font-medium text-gray-900">
                        <Link href={`/products/${slug}`}>
                            <span aria-hidden="true" className="absolute inset-0" />
                            {title}
                        </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{category}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">${price.toFixed(2)}</p>
            </div>
        </div>
    );
}
