const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const products = [
    {
        title: "The Signature Trench",
        price: 2450,
        category: "Coats",
        image: "/images/0UKj9f7pUpqZt7MywNLmzwOVA0.jpg",
        slug: "signature-trench",
        description: "A timeless masterpiece of tailoring. Crafted from our signature water-resistant cotton gabardine, this trench feature a relaxed, modern silhouette with classic details. Perfect for layering over evening wear or tailoring.",
        images: ["/images/0UKj9f7pUpqZt7MywNLmzwOVA0.jpg", "/images/0ybfh4vJr9EDuvvmRXXunj7ilo.jpg", "/images/1RKHBeUCC46PlTECt7eh6sd3ag.jpg"],
        features: ["100% Cotton Gabardine", "Water-resistant finish", "Buffalo horn buttons", "Made in Italy"]
    },
    {
        title: "Cashmere Turtleneck",
        price: 890,
        category: "Knitwear",
        image: "/images/0ybfh4vJr9EDuvvmRXXunj7ilo.jpg",
        slug: "cashmere-turtleneck",
        description: "Spun from the finest Grade A cashmere, this turtleneck offers unmatched softness and warmth. A wardrobe staple that transcends seasons.",
        images: ["/images/0ybfh4vJr9EDuvvmRXXunj7ilo.jpg", "/images/0UKj9f7pUpqZt7MywNLmzwOVA0.jpg"],
        features: ["100% Grade A Cashmere", "Ribbed cuffs and hem", "Relaxed fit"]
    },
    {
        title: "Pleated Silk Skirt",
        price: 1200,
        category: "Bottoms",
        image: "/images/1RKHBeUCC46PlTECt7eh6sd3ag.jpg",
        slug: "pleated-silk-skirt",
        description: "Fluid and feminine, this midi skirt is crafted from lustrous silk crepe de chine. precise sunray pleats create beautiful movement with every step.",
        images: ["/images/1RKHBeUCC46PlTECt7eh6sd3ag.jpg", "/images/28mU4eNndQP7S30AmRgRSPY9zM.jpg"],
        features: ["100% Silk", "Side zip closure", "Unlined for fluidity"]
    },
    {
        title: "Structured Blazer",
        price: 1850,
        category: "Jackets",
        image: "/images/28mU4eNndQP7S30AmRgRSPY9zM.jpg",
        slug: "structured-blazer",
        description: "Power dressing redefined. This wool-silk blend blazer features strong shoulders and a nipped-in waist for a sharp, commanding silhouette.",
        images: ["/images/28mU4eNndQP7S30AmRgRSPY9zM.jpg", "/images/83ADROPdXlydiFMtuiZlrOSAih4.jpg"],
        features: ["Wool-Silk Blend", "Peak lapels", "Double-breasted"]
    },
    {
        title: "Oversized Wool Coat",
        price: 2100,
        category: "Coats",
        image: "/images/83ADROPdXlydiFMtuiZlrOSAih4.jpg",
        slug: "oversized-wool-coat",
        description: "Envelope yourself in luxury with this double-faced wool coat. The oversized fit and dropped shoulders create an effortless, contemporary look.",
        images: ["/images/83ADROPdXlydiFMtuiZlrOSAih4.jpg", "/images/7b15QPGvjNwIjzzRqyypwuGdibU.jpg"],
        features: ["100% Wool", "Hand-finished seams", "Patch pockets"]
    },
    {
        title: "Silk Blouse",
        price: 650,
        category: "Tops",
        image: "/images/7b15QPGvjNwIjzzRqyypwuGdibU.jpg",
        slug: "silk-blouse",
        description: "An essential for the modern wardrobe. This silk blouse features a concealed button placket and elongated cuffs for a sleek, polished finish.",
        images: ["/images/7b15QPGvjNwIjzzRqyypwuGdibU.jpg", "/images/f4jH3VSqGbIGRhlqeSoVLlYY5r4.jpg"],
        features: ["100% Silk Georgette", "French seams", "Mother-of-pearl buttons"]
    },
    {
        title: "Wide Leg Trousers",
        price: 950,
        category: "Bottoms",
        image: "/images/f4jH3VSqGbIGRhlqeSoVLlYY5r4.jpg",
        slug: "wide-leg-trousers",
        description: "Tailored from Italian cool wool, these trousers sit high on the waist and fall to a dramatic wide leg. Front pleats add volume and movement.",
        images: ["/images/f4jH3VSqGbIGRhlqeSoVLlYY5r4.jpg", "/images/kAEBCK1xRNbyB2zyTaVtYHLDI.jpg"],
        features: ["100% Virgin Wool", "High-waisted", "Concealed hook and zip"]
    },
    {
        title: "Leather Crossbody",
        price: 1450,
        category: "Accessories",
        image: "/images/kAEBCK1xRNbyB2zyTaVtYHLDI.jpg",
        slug: "leather-crossbody",
        description: "Minimalist design meets maximum functionality. Crafted from smooth calfskin, this bag features a structured shape and our signature gold-tone hardware.",
        images: ["/images/kAEBCK1xRNbyB2zyTaVtYHLDI.jpg", "/images/pv47qK687aQshuR1RoOgay17mNs.jpg"],
        features: ["Calfskin Leather", "Adjustable strap", "Interior zip pocket"]
    },
    {
        title: "The Evening Dress",
        price: 2800,
        category: "Dresses",
        image: "/images/pv47qK687aQshuR1RoOgay17mNs.jpg",
        slug: "evening-dress",
        description: "Turn heads in this sculptural evening gown. The asymmetrical neckline and draped bodice create a stunning silhouette that is both modern and elegant.",
        images: ["/images/pv47qK687aQshuR1RoOgay17mNs.jpg", "/images/qIBMbIBackRRA5jBU3ZYeuwT8pY.jpg"],
        features: ["Silk Satin", "Asymmetric drape", "Side slit"]
    },
    {
        title: "Chunky Knit Sweater",
        price: 780,
        category: "Knitwear",
        image: "/images/qIBMbIBackRRA5jBU3ZYeuwT8pY.jpg",
        slug: "chunky-knit-sweater",
        description: "Hand-knit from a chunky merino wool blend, this sweater is the epitome of cozy chic. The cable knit pattern adds texture and depth.",
        images: ["/images/qIBMbIBackRRA5jBU3ZYeuwT8pY.jpg", "/images/svSFNEad4UHBs5T9l1QXvF8mZ4.jpg"],
        features: ["Merino Wool Blend", "Hand-finished", "Oversized fit"]
    },
    {
        title: "Classic White Tee",
        price: 120,
        category: "Tops",
        image: "/images/svSFNEad4UHBs5T9l1QXvF8mZ4.jpg",
        slug: "classic-white-tee",
        description: "The perfect white tee does exist. Cut from premium pima cotton jersey, it has a relaxed fit and a perfectly positioned crew neck.",
        images: ["/images/svSFNEad4UHBs5T9l1QXvF8mZ4.jpg", "/images/lz7VevuK2xSIXPDgDMoYCoIeCKU.jpg"],
        features: ["100% Pima Cotton", "Pre-shrunk", "Soft wash finish"]
    },
    {
        title: "Tailored Vest",
        price: 550,
        category: "Jackets",
        image: "/images/lz7VevuK2xSIXPDgDMoYCoIeCKU.jpg",
        slug: "tailored-vest",
        description: "Wear it as a top or layered over a shirt. This tailored vest is cut for a slim fit and features a classic button front and adjustable back strap.",
        images: ["/images/lz7VevuK2xSIXPDgDMoYCoIeCKU.jpg", "/images/0UKj9f7pUpqZt7MywNLmzwOVA0.jpg"],
        features: ["Wool Blend", "Fully lined", "V-neckline"]
    }
];

async function main() {
    console.log("Seeding products...");

    for (const product of products) {
        // Find or create category
        let category = await prisma.category.findFirst({
            where: { name: product.category }
        });

        if (!category) {
            category = await prisma.category.create({
                data: {
                    name: product.category,
                    slug: product.category.toLowerCase().replace(/\s+/g, "-")
                }
            });
            console.log(`Created category: ${category.name}`);
        }

        // Check if product already exists
        const existing = await prisma.product.findFirst({
            where: { slug: product.slug }
        });

        if (existing) {
            console.log(`Product already exists: ${product.title}`);
            continue;
        }

        // Create product
        await prisma.product.create({
            data: {
                title: product.title,
                slug: product.slug,
                description: product.description,
                price: product.price,
                images: product.images,
                features: product.features,
                categoryId: category.id
            }
        });

        console.log(`Created product: ${product.title}`);
    }

    console.log("Seeding complete!");
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
