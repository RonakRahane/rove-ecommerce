export interface Product {
    id: string;
    title: string;
    price: number;
    category: string;
    image: string;
    slug: string;
    description: string;
    images: string[];
    sizes: string[];
    colors: string[];
    features: string[];
}

export const products: Product[] = [
    {
        id: "1",
        title: "The Signature Trench",
        price: 2450,
        category: "Coats",
        image: "/images/0UKj9f7pUpqZt7MywNLmzwOVA0.jpg",
        slug: "signature-trench",
        description: "A timeless masterpiece of tailoring. Crafted from our signature water-resistant cotton gabardine, this trench feature a relaxed, modern silhouette with classic details. Perfect for layering over evening wear or tailoring.",
        images: ["/images/0UKj9f7pUpqZt7MywNLmzwOVA0.jpg", "/images/0ybfh4vJr9EDuvvmRXXunj7ilo.jpg", "/images/1RKHBeUCC46PlTECt7eh6sd3ag.jpg"],
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["Beige", "Black", "Olive"],
        features: ["100% Cotton Gabardine", "Water-resistant finish", "Buffalo horn buttons", "Made in Italy"]
    },
    {
        id: "2",
        title: "Cashmere Turtleneck",
        price: 890,
        category: "Knitwear",
        image: "/images/0ybfh4vJr9EDuvvmRXXunj7ilo.jpg",
        slug: "cashmere-turtleneck",
        description: "Spun from the finest Grade A cashmere, this turtleneck offers unmatched softness and warmth. A wardrobe staple that transcends seasons.",
        images: ["/images/0ybfh4vJr9EDuvvmRXXunj7ilo.jpg", "/images/0UKj9f7pUpqZt7MywNLmzwOVA0.jpg"],
        sizes: ["S", "M", "L"],
        colors: ["Cream", "Black", "Grey"],
        features: ["100% Grade A Cashmere", "Ribbed cuffs and hem", "Relaxed fit"]
    },
    {
        id: "3",
        title: "Pleated Silk Skirt",
        price: 1200,
        category: "Bottoms",
        image: "/images/1RKHBeUCC46PlTECt7eh6sd3ag.jpg",
        slug: "pleated-silk-skirt",
        description: "Fluid and feminine, this midi skirt is crafted from lustrous silk crepe de chine. precise sunray pleats create beautiful movement with every step.",
        images: ["/images/1RKHBeUCC46PlTECt7eh6sd3ag.jpg", "/images/28mU4eNndQP7S30AmRgRSPY9zM.jpg"],
        sizes: ["XS", "S", "M", "L"],
        colors: ["Champagne", "Black"],
        features: ["100% Silk", "Side zip closure", "Unlined for fluidity"]
    },
    {
        id: "4",
        title: "Structured Blazer",
        price: 1850,
        category: "Jackets",
        image: "/images/28mU4eNndQP7S30AmRgRSPY9zM.jpg",
        slug: "structured-blazer",
        description: "Power dressing redefined. This wool-silk blend blazer features strong shoulders and a nipped-in waist for a sharp, commanding silhouette.",
        images: ["/images/28mU4eNndQP7S30AmRgRSPY9zM.jpg", "/images/83ADROPdXlydiFMtuiZlrOSAih4.jpg"],
        sizes: ["36", "38", "40", "42"],
        colors: ["Black", "Navy"],
        features: ["Wool-Silk Blend", "Peak lapels", "Double-breasted"]
    },
    {
        id: "5",
        title: "Oversized Wool Coat",
        price: 2100,
        category: "Coats",
        image: "/images/83ADROPdXlydiFMtuiZlrOSAih4.jpg",
        slug: "oversized-wool-coat",
        description: "Envelope yourself in luxury with this double-faced wool coat. The oversized fit and dropped shoulders create an effortless, contemporary look.",
        images: ["/images/83ADROPdXlydiFMtuiZlrOSAih4.jpg", "/images/7b15QPGvjNwIjzzRqyypwuGdibU.jpg"],
        sizes: ["S/M", "L/XL"],
        colors: ["Camel", "Charcoal"],
        features: ["100% Wool", "Hand-finished seams", "Patch pockets"]
    },
    {
        id: "6",
        title: "Silk Blouse",
        price: 650,
        category: "Tops",
        image: "/images/7b15QPGvjNwIjzzRqyypwuGdibU.jpg",
        slug: "silk-blouse",
        description: "An essential for the modern wardrobe. This silk blouse features a concealed button placket and elongated cuffs for a sleek, polished finish.",
        images: ["/images/7b15QPGvjNwIjzzRqyypwuGdibU.jpg", "/images/f4jH3VSqGbIGRhlqeSoVLlYY5r4.jpg"],
        sizes: ["XS", "S", "M", "L"],
        colors: ["Ivory", "Black", "Blush"],
        features: ["100% Silk Georgette", "French seams", "Mother-of-pearl buttons"]
    },
    {
        id: "7",
        title: "Wide Leg Trousers",
        price: 950,
        category: "Bottoms",
        image: "/images/f4jH3VSqGbIGRhlqeSoVLlYY5r4.jpg",
        slug: "wide-leg-trousers",
        description: "Tailored from Italian cool wool, these trousers sit high on the waist and fall to a dramatic wide leg. Front pleats add volume and movement.",
        images: ["/images/f4jH3VSqGbIGRhlqeSoVLlYY5r4.jpg", "/images/kAEBCK1xRNbyB2zyTaVtYHLDI.jpg"],
        sizes: ["36", "38", "40", "42"],
        colors: ["Black", "Stone"],
        features: ["100% Virgin Wool", "High-waisted", "Concealed hook and zip"]
    },
    {
        id: "8",
        title: "Leather Crossbody",
        price: 1450,
        category: "Accessories",
        image: "/images/kAEBCK1xRNbyB2zyTaVtYHLDI.jpg",
        slug: "leather-crossbody",
        description: "Minimalist design meets maximum functionality. Crafted from smooth calfskin, this bag features a structured shape and our signature gold-tone hardware.",
        images: ["/images/kAEBCK1xRNbyB2zyTaVtYHLDI.jpg", "/images/pv47qK687aQshuR1RoOgay17mNs.jpg"],
        sizes: ["One Size"],
        colors: ["Black", "Tan", "Burgundy"],
        features: ["Calfskin Leather", "Adjustable strap", "Interior zip pocket"]
    },
    {
        id: "9",
        title: "The Evening Dress",
        price: 2800,
        category: "Dresses",
        image: "/images/pv47qK687aQshuR1RoOgay17mNs.jpg",
        slug: "evening-dress",
        description: "Turn heads in this sculptural evening gown. The asymmetrical neckline and draped bodice create a stunning silhouette that is both modern and elegant.",
        images: ["/images/pv47qK687aQshuR1RoOgay17mNs.jpg", "/images/qIBMbIBackRRA5jBU3ZYeuwT8pY.jpg"],
        sizes: ["34", "36", "38", "40"],
        colors: ["Black", "Emerald", "Red"],
        features: ["Silk Satin", "Asymmetric drape", "Side slit"]
    },
    {
        id: "10",
        title: "Chunky Knit Sweater",
        price: 780,
        category: "Knitwear",
        image: "/images/qIBMbIBackRRA5jBU3ZYeuwT8pY.jpg",
        slug: "chunky-knit-sweater",
        description: "Hand-knit from a chunky merino wool blend, this sweater is the epitome of cozy chic. The cable knit pattern adds texture and depth.",
        images: ["/images/qIBMbIBackRRA5jBU3ZYeuwT8pY.jpg", "/images/svSFNEad4UHBs5T9l1QXvF8mZ4.jpg"],
        sizes: ["XS/S", "M/L"],
        colors: ["Cream", "Grey Marl"],
        features: ["Merino Wool Blend", "Hand-finished", "Oversized fit"]
    },
    {
        id: "11",
        title: "Classic White Tee",
        price: 120,
        category: "Tops",
        image: "/images/svSFNEad4UHBs5T9l1QXvF8mZ4.jpg",
        slug: "classic-white-tee",
        description: "The perfect white tee does exist. Cut from premium pima cotton jersey, it has a relaxed fit and a perfectly positioned crew neck.",
        images: ["/images/svSFNEad4UHBs5T9l1QXvF8mZ4.jpg", "/images/lz7VevuK2xSIXPDgDMoYCoIeCKU.jpg"],
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["White", "Black"],
        features: ["100% Pima Cotton", "Pre-shrunk", "Soft wash finish"]
    },
    {
        id: "12",
        title: "Tailored Vest",
        price: 550,
        category: "Jackets",
        image: "/images/lz7VevuK2xSIXPDgDMoYCoIeCKU.jpg",
        slug: "tailored-vest",
        description: "Wear it as a top or layered over a shirt. This tailored vest is cut for a slim fit and features a classic button front and adjustable back strap.",
        images: ["/images/lz7VevuK2xSIXPDgDMoYCoIeCKU.jpg", "/images/0UKj9f7pUpqZt7MywNLmzwOVA0.jpg"],
        sizes: ["36", "38", "40", "42"],
        colors: ["Black", "Pinstripe"],
        features: ["Wool Blend", "Fully lined", "V-neckline"]
    }
];
