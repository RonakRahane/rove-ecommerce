import Image from "next/image";

export default function AboutPage() {
    return (
        <div className="pt-24 pb-20 min-h-screen bg-[#FAFAFA]">

            {/* Hero Section */}
            <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
                <Image
                    src="/images/28mU4eNndQP7S30AmRgRSPY9zM.jpg"
                    alt="Rove Atelier"
                    fill
                    className="object-cover object-top"
                    priority
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute inset-0 flex items-center justify-center text-center p-6">
                    <div className="max-w-3xl">
                        <h1 className="font-sans font-bold text-3xl md:text-5xl lg:text-7xl uppercase tracking-tighter text-white mb-6">
                            The Philosophy
                        </h1>
                        <p className="text-white/90 text-lg md:text-xl font-light leading-relaxed">
                            Redefining modern luxury through quiet confidence and uncompromising quality.
                        </p>
                    </div>
                </div>
            </div>

            {/* Content Sections */}
            <div className="max-w-screen-lg mx-auto px-6 sm:px-8 lg:px-12 py-24 space-y-32">

                {/* Story */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Our Story</h2>
                        <h3 className="text-3xl md:text-4xl font-serif text-gray-900">Born from a desire for essentials that feel anything but essential.</h3>
                        <p className="text-gray-600 leading-relaxed font-light">
                            Rove was founded on a simple premise: that the most important pieces in your wardrobe should be the ones you reach for every day, and they should be exceptional. We believe in "Quiet Luxury"—garments that don't need to shout to be heard.
                        </p>
                        <p className="text-gray-600 leading-relaxed font-light">
                            Our design process begins not with a sketch, but with the fabric. We source the finest materials from around the world—cashmere from Mongolia, silk from Como, wool from Biella.
                        </p>
                    </div>
                    <div className="relative aspect-[3/4] bg-gray-100">
                        <Image src="/images/7b15QPGvjNwIjzzRqyypwuGdibU.jpg" alt="Fabric detail" fill className="object-cover" />
                    </div>
                </section>

                {/* Values */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="space-y-4">
                        <div className="h-px w-12 bg-black mb-6" />
                        <h4 className="text-xl font-medium text-gray-900">Craftsmanship</h4>
                        <p className="text-gray-500 font-light text-sm leading-relaxed">
                            Every stitch matters. We partner with heritage ateliers who have honed their skills over generations.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <div className="h-px w-12 bg-black mb-6" />
                        <h4 className="text-xl font-medium text-gray-900">Sustainability</h4>
                        <p className="text-gray-500 font-light text-sm leading-relaxed">
                            Luxury shouldn't cost the earth. We are committed to ethical sourcing and responsible production methods.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <div className="h-px w-12 bg-black mb-6" />
                        <h4 className="text-xl font-medium text-gray-900">Timelessness</h4>
                        <p className="text-gray-500 font-light text-sm leading-relaxed">
                            We design outside of trends. Our pieces are meant to be worn, loved, and passed down.
                        </p>
                    </div>
                </section>

                {/* Atelier / Process */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="relative aspect-[3/4] bg-gray-100 order-2 md:order-1">
                        <Image src="/images/1RKHBeUCC46PlTECt7eh6sd3ag.jpg" alt="Atelier" fill className="object-cover" />
                    </div>
                    <div className="space-y-6 order-1 md:order-2">
                        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">The Atelier</h2>
                        <h3 className="text-3xl md:text-4xl font-serif text-gray-900">Designed in Paris.<br />Made for the World.</h3>
                        <p className="text-gray-600 leading-relaxed font-light">
                            Our creative team is based in the heart of Paris, drawing inspiration from the city's architecture, art, and effortless style. We believe that true elegance lies in simplicity and subtraction—removing the unnecessary until only the essential remains.
                        </p>
                    </div>
                </section>

            </div>
        </div>
    );
}
