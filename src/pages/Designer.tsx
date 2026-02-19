import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShoppingBag, Heart, Filter, ArrowUpDown, X } from 'lucide-react';
import Footer from '../sections/Footer';

gsap.registerPlugin(ScrollTrigger);

interface Product {
    id: number;
    name: string;
    price: number;
    category: 'chrono' | 'heritage' | 'elite';
    strap: 'leather' | 'steel' | 'gold';
    image: string;
    description: string;
}

const products: Product[] = [
    { id: 1, name: "Chrono X7 Onyx", price: 74999, category: 'chrono', strap: 'steel', image: "/watch-hero-black.png", description: "Precision engineered with a black onyx dial and surgical grade steel." },
    { id: 2, name: "Heritage Silver", price: 109999, category: 'heritage', strap: 'leather', image: "/watch-hero-silver.png", description: "Timeless silver finish with hand-stitched Italian leather strap." },
    { id: 3, name: "Elite Gold", price: 299999, category: 'elite', strap: 'gold', image: "/watch-hero-gold.png", description: "Pure 18k gold casing with an intricate mechanical movement." },
    { id: 4, name: "Chrono X7 Silver", price: 74999, category: 'chrono', strap: 'steel', image: "/watch-hero-silver.png", description: "Classic silver chrono with triple sub-dial functionality." },
    { id: 5, name: "Heritage Gold", price: 124999, category: 'heritage', strap: 'gold', image: "/watch-hero-gold.png", description: "Vintage inspired gold heritage piece for formal occasions." },
    { id: 6, name: "Elite Midnight", price: 349999, category: 'elite', strap: 'leather', image: "/watch-hero-black.png", description: "Stealth black elite series with sapphire crystal glass." },
    { id: 7, name: "Chrono X7 Gold", price: 84999, category: 'chrono', strap: 'gold', image: "/watch-hero-gold.png", description: "The bold statement of gold meets the precision of the X7 series." },
    { id: 8, name: "Heritage Classic", price: 99999, category: 'heritage', strap: 'leather', image: "/watch-hero-silver.png", description: "The essential heritage timepiece for the modern enthusiast." },
];

const Designer = () => {
    const [activeFilter, setActiveFilter] = useState<'all' | 'chrono' | 'heritage' | 'elite'>('all');
    const [wishlist, setWishlist] = useState<number[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const heroRef = useRef<HTMLElement>(null);
    const watchRef = useRef<HTMLDivElement>(null);
    const spotlightRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        setWishlist(savedWishlist);

        ScrollTrigger.refresh();

        // Hero Animations
        if (heroRef.current) {
            gsap.fromTo(heroRef.current.querySelectorAll('.hero-fade'),
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power2.out', delay: 0.3 }
            );

            // Ambient Light Sweep
            const sweepTimeline = gsap.timeline({ repeat: -1 });
            sweepTimeline.to('.light-sweep', {
                left: '200%',
                duration: 2.5,
                ease: 'power2.inOut',
                delay: 7
            });
        }

        // Showcase Scroll Animations
        const showcaseSections = gsap.utils.toArray('.showcase-item');
        showcaseSections.forEach((section: any) => {
            const img = section.querySelector('.showcase-img');
            const text = section.querySelector('.showcase-text');

            gsap.fromTo(img,
                { scale: 1 },
                {
                    scale: 1.02,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true
                    }
                }
            );

            gsap.fromTo(text,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 70%',
                    }
                }
            );
        });

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (window.innerWidth < 1024) return;

        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        // Dampened mouse parallax factor (0.08)
        const x = (clientX - centerX) * 0.08;
        const y = (clientY - centerY) * 0.08;

        setMousePos({ x, y });

        // Physical 3D tilt (2-3 degrees max)
        if (watchRef.current) {
            const rotateX = (y / centerY) * 15; // results in ~2-3 deg
            const rotateY = (x / centerX) * -15;
            gsap.to(watchRef.current, {
                rotateX: rotateX,
                rotateY: rotateY,
                duration: 1,
                ease: 'power2.out'
            });
        }
    };

    const toggleWishlist = (id: number) => {
        const newWishlist = wishlist.includes(id)
            ? wishlist.filter(item => item !== id)
            : [...wishlist, id];
        setWishlist(newWishlist);
        localStorage.setItem('wishlist', JSON.stringify(newWishlist));
    };

    const filteredProducts = activeFilter === 'all'
        ? products
        : products.filter(p => p.category === activeFilter);

    return (
        <div className="bg-[#FAF8F5] overflow-x-hidden">
            {/* Cinematic Hero Section */}
            <section
                ref={heroRef}
                onMouseMove={handleMouseMove}
                className="relative h-screen flex items-center justify-center overflow-hidden bg-[#FAF8F5] px-6 lg:px-24"
            >
                {/* Background Atmosphere */}
                <div
                    ref={spotlightRef}
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: `radial-gradient(600px circle at ${50 + mousePos.x * 0.01}% ${50 + mousePos.y * 0.01}%, rgba(0, 57, 38, 0.03) 0%, transparent 70%)`
                    }}
                />
                <div className="absolute inset-0 bg-[#FAF8F5] pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#003926]/5 rounded-full blur-[120px] pointer-events-none" />

                {/* Light Sweep */}
                <div className="light-sweep absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] pointer-events-none" />

                <div className="relative z-10 grid lg:grid-cols-2 items-center gap-12 w-full max-w-7xl">
                    <div className="text-left order-2 lg:order-1">
                        <p className="hero-fade text-[#003926] text-xs tracking-[0.5em] uppercase mb-8 font-black">DSIGNER'S Premium Collection</p>
                        <h1 className="hero-fade text-6xl md:text-8xl font-black text-[#003926] leading-[0.85] tracking-tighter mb-12">
                            Crafted for
                            <span className="block gold-gradient-text mt-4 relative">
                                Distinction.
                                <div className="absolute bottom-[-10px] left-0 w-32 h-1.5 bg-[#003926] rounded-full origin-left hero-fade" />
                            </span>
                        </h1>
                        <p className="hero-fade text-[#2D2D2D]/60 text-xl max-w-lg leading-relaxed mb-12 font-medium">
                            An engineered masterpiece of Swiss precision and avant-garde aesthetic. Every reflection tells a story of power.
                        </p>
                        <div className="hero-fade">
                            <button className="btn-green px-12 py-5 uppercase tracking-widest text-xs font-black shadow-2xl shadow-[#003926]/20">
                                Explore Masterpieces
                            </button>
                        </div>
                    </div>

                    <div className="relative order-1 lg:order-2 flex justify-center perspective-[2000px]">
                        <div
                            ref={watchRef}
                            className="relative w-[300px] md:w-[450px] lg:w-[550px] transition-transform duration-300 ease-out"
                        >
                            <img
                                src="/watch-hero-black.png"
                                alt="Premium Collection Watch"
                                className="w-full h-auto drop-shadow-[0_50px_80px_rgba(0,0,0,0.15)] select-none"
                            />
                            {/* Subtle Dial Spotlight */}
                            <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px] bg-white/20 rounded-full blur-[40px] pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Vignette Layer */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.02)_100%)] pointer-events-none" />
            </section>

            {/* Scroll-Based Product Showcase */}
            <section className="py-32 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="showcase-item grid lg:grid-cols-2 gap-20 items-center mb-40">
                        <div className="relative aspect-square overflow-hidden rounded-3xl bg-[#F5F0E8] p-12 lg:p-24 flex items-center justify-center">
                            <img
                                src="/watch-hero-gold.png"
                                alt="Featured Model"
                                className="showcase-img w-full h-auto drop-shadow-[0_40px_60px_rgba(0,0,0,0.2)]"
                            />
                        </div>
                        <div className="showcase-text">
                            <p className="text-[#003926] text-[10px] tracking-[0.4em] uppercase mb-6 font-black">Featured Masterpiece</p>
                            <h2 className="text-4xl md:text-6xl font-black text-[#003926] leading-none mb-8 tracking-tighter">Elite Gold Edition</h2>
                            <p className="text-[#2D2D2D]/60 text-lg leading-relaxed mb-10 max-w-md">
                                The pinnacle of our engineering. 18k gold casing paired with our signature mechanical movement. A watch that doesn't just tell time—it commands it.
                            </p>
                            <div className="flex items-center gap-8 mb-12">
                                <span className="text-3xl font-black text-[#003926]">₹2,99,999</span>
                                <div className="w-px h-12 bg-[#003926]/10" />
                                <span className="text-[10px] text-[#2D2D2D]/40 uppercase tracking-widest font-black">Limited Inventory</span>
                            </div>
                            <button className="group relative px-12 py-5 bg-[#003926] text-white font-black text-[10px] tracking-[0.3em] uppercase rounded-[40px] overflow-hidden transition-all duration-500 shadow-xl shadow-[#003926]/20 active:scale-95">
                                <span className="relative z-10 flex items-center gap-4">
                                    Reserve Timepiece
                                    <ShoppingBag className="w-4 h-4" />
                                </span>
                                <div className="absolute inset-0 bg-[#02523A] transform translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Filter Bar */}
            <div className="sticky top-20 z-30 bg-[#FAF8F5]/90 backdrop-blur-md border-y border-[#E8E0D4] py-6 px-6 lg:px-16 xl:px-24">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-8 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar">
                        {['all', 'chrono', 'heritage', 'elite'].map((f) => (
                            <button
                                key={f}
                                onClick={() => setActiveFilter(f as any)}
                                className={`text-[10px] uppercase tracking-[0.3em] font-black transition-all whitespace-nowrap px-6 py-3 rounded-full border ${activeFilter === f ? 'bg-[#003926] text-white border-transparent' : 'text-[#2D2D2D]/40 border-transparent hover:text-[#003926]'
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                        <button className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-black text-[#2D2D2D]/60 hover:text-[#003926] transition-colors">
                            <Filter className="w-4 h-4" /> Filter
                        </button>
                        <button className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-black text-[#2D2D2D]/60 hover:text-[#003926] transition-colors">
                            <ArrowUpDown className="w-4 h-4" /> Sort By
                        </button>
                    </div>
                </div>
            </div>

            {/* Premium Product Grid */}
            <section className="py-24 px-6 lg:px-16 xl:px-24 bg-[#FAF8F5]">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
                        <div>
                            <p className="text-[#003926] text-[10px] tracking-[0.4em] uppercase mb-4 font-black">Curated Series</p>
                            <h2 className="text-4xl md:text-5xl font-black text-[#003926] tracking-tighter">The Full <span className="gold-gradient-text">Catalogue</span></h2>
                        </div>

                        {/* Filter Bar Integrated */}
                        <div className="flex items-center gap-4 bg-white/50 backdrop-blur-sm p-2 rounded-full border border-[#E8E0D4]">
                            {['all', 'chrono', 'heritage', 'elite'].map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setActiveFilter(f as any)}
                                    className={`text-[9px] uppercase tracking-[0.2em] font-black transition-all px-5 py-2.5 rounded-full ${activeFilter === f ? 'bg-[#003926] text-white' : 'text-[#2D2D2D]/40 hover:text-[#003926]'
                                        }`}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-20">
                        {filteredProducts.map((product) => (
                            <div key={product.id} className="product-card group relative">
                                {/* Card Body */}
                                <div
                                    onClick={() => setSelectedProduct(product)}
                                    className="relative aspect-[4/5] bg-white rounded-[16px] overflow-hidden border border-[#E8E0D4] shadow-[0_10px_30px_rgba(0,0,0,0.06)] group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] transition-all duration-500 group-hover:-translate-y-[6px] group-hover:border-[#003926]/20 cursor-pointer"
                                >
                                    {/* Inner Highlight Pseudo */}
                                    <div className="absolute inset-x-0 top-0 h-px bg-white/40 z-10 opacity-0 group-hover:opacity-100 transition-opacity" />

                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        onError={(e: any) => { e.target.src = '/watch-hero-black.png' }}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                                    />

                                    {/* Quick Info Overlay */}
                                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <button className="w-full py-3 bg-white/90 backdrop-blur-sm text-[#003926] rounded-full text-[9px] font-black uppercase tracking-[0.2em] hover:bg-[#003926] hover:text-white transition-all shadow-xl">
                                            Quick View
                                        </button>
                                    </div>
                                </div>

                                {/* Product Info Below */}
                                <div className="mt-8">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-base font-black text-[#003926] group-hover:text-[#02523A] transition-colors tracking-tight">{product.name}</h3>
                                            <p className="text-[#2D2D2D]/40 text-[9px] font-black uppercase tracking-[0.2em] mt-1.5">{product.category} Series</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[#003926] font-black text-base">₹{product.price.toLocaleString()}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <button className="flex-1 py-4 bg-transparent border border-[#003926]/20 rounded-full text-[9px] font-black uppercase tracking-[0.2em] text-[#003926] hover:bg-[#003926] hover:text-white hover:border-transparent transition-all duration-300 flex items-center justify-center gap-3 active:scale-95">
                                            <ShoppingBag className="w-3.5 h-3.5" /> Buy Now
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
                                            className={`p-4 rounded-full border transition-all duration-300 ${wishlist.includes(product.id) ? 'bg-[#003926] text-white border-transparent' : 'border-[#E8E0D4] text-[#2D2D2D]/40 hover:border-[#003926] hover:text-[#003926]'
                                                }`}
                                        >
                                            <Heart className={`w-3.5 h-3.5 ${wishlist.includes(product.id) ? 'fill-current' : ''}`} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Macro Detail Section - Emotional Credibility */}
            <section className="py-40 bg-black overflow-hidden relative group">
                <div className="absolute inset-0 opacity-40">
                    <img
                        src="/watch-hero-black.png"
                        alt="Macro Detail"
                        className="w-full h-full object-cover scale-150 group-hover:scale-[1.55] transition-transform duration-[10s] ease-linear brightness-50"
                    />
                </div>
                {/* Grain Overlay */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

                <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <p className="text-[#D4A574] text-xs tracking-[0.5em] uppercase mb-8 font-black">Sensory Experience</p>
                        <h2 className="text-5xl md:text-7xl font-black text-white leading-[0.9] tracking-tighter mb-10">
                            The Soul of <span className="gold-gradient-text">Texture.</span>
                        </h2>
                        <p className="text-white/60 text-xl leading-relaxed max-w-lg mb-12">
                            Brushed surgical steel, hand-stitched Italian leather, and scratch-resistant sapphire. We don't just build watches; we sculpt experiences.
                        </p>
                        <div className="w-24 h-px bg-gradient-to-r from-[#D4A574] to-transparent" />
                    </div>
                </div>

                {/* Light Sweep Animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-light-sweep" />
            </section>

            {/* Craft & Engineering Section */}
            <section className="py-32 bg-[#FAF8F5]">
                <div className="max-w-7xl mx-auto px-6 text-center mb-20">
                    <p className="text-[#003926] text-[10px] tracking-[0.5em] uppercase mb-6 font-black">Technical Brilliance</p>
                    <h2 className="text-4xl md:text-6xl font-black text-[#003926] tracking-tighter">Precision in Every <span className="gold-gradient-text">Component</span></h2>
                </div>

                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { title: "Precision Movement", desc: "Custom Swiss-engineered automatic movement with 42h reserve.", icon: "⚙️" },
                        { title: "Surgical Case", desc: "Grade 316L stainless steel for ultimate corrosion resistance.", icon: "⚓" },
                        { title: "Sapphire Shield", desc: "Double-domed sapphire crystal with anti-reflective coating.", icon: "💎" },
                        { title: "Artisan Assembly", desc: "Hand-assembled by master horologists over 48 hours.", icon: "🛠️" }
                    ].map((item, i) => (
                        <div key={i} className="bg-white p-10 rounded-2xl border border-[#003926]/5 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500">
                            <div className="text-3xl mb-6">{item.icon}</div>
                            <h3 className="text-lg font-black text-[#003926] mb-4">{item.title}</h3>
                            <p className="text-sm text-[#2D2D2D]/60 leading-relaxed font-medium">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Product Modal - Upgraded */}
            {selectedProduct && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
                    <div
                        className="absolute inset-0 bg-[#003926]/80 backdrop-blur-xl transition-all duration-500"
                        onClick={() => setSelectedProduct(null)}
                    />
                    <div className="relative w-full max-w-6xl bg-white rounded-[2rem] shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 animate-scale-in">
                        <button
                            onClick={() => setSelectedProduct(null)}
                            className="absolute top-8 right-8 p-3 bg-[#FAF8F5] rounded-full text-[#003926] hover:bg-[#003926] hover:text-white transition-all z-20"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="bg-[#F5F0E8] p-12 lg:p-24 flex items-center justify-center relative perspective-[1000px]">
                            <img
                                src={selectedProduct.image}
                                alt={selectedProduct.name}
                                className="w-full h-auto drop-shadow-[0_40px_60px_rgba(0,0,0,0.2)] animate-float"
                            />
                            {/* Dial Macro Close-up effect (Visual mask) */}
                            <div className="absolute bottom-12 right-12 w-32 h-32 rounded-full border border-white/30 overflow-hidden hidden lg:block shadow-2xl">
                                <img src={selectedProduct.image} className="w-full h-full object-cover scale-[3] translate-y-4" alt="Macro" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end justify-center pb-2">
                                    <span className="text-[8px] text-white font-black uppercase tracking-widest italic">Macro View</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-12 lg:p-24 flex flex-col justify-center bg-white">
                            <p className="text-[#003926] text-[10px] tracking-[0.5em] uppercase mb-6 font-black">{selectedProduct.category} Edition</p>
                            <h2 className="text-4xl md:text-6xl font-black text-[#003926] leading-[0.9] mb-8 tracking-tighter">{selectedProduct.name}</h2>
                            <p className="text-3xl font-black text-[#003926] mb-12">₹{selectedProduct.price.toLocaleString()}</p>

                            <div className="h-px w-full bg-[#003926]/10 mb-12" />

                            <p className="text-[#2D2D2D]/60 text-lg leading-relaxed mb-12 font-medium">
                                {selectedProduct.description}
                            </p>

                            {/* Structured Spec Grid */}
                            <div className="grid grid-cols-2 gap-y-10 mb-16 relative">
                                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#003926]/10" />
                                <div>
                                    <p className="text-[9px] uppercase tracking-widest text-[#2D2D2D]/40 font-black mb-2">Movement</p>
                                    <p className="text-sm font-black text-[#003926]">Automatic Swiss</p>
                                </div>
                                <div className="pl-10">
                                    <p className="text-[9px] uppercase tracking-widest text-[#2D2D2D]/40 font-black mb-2">Strap</p>
                                    <p className="text-sm font-black text-[#003926] capitalize">{selectedProduct.strap}</p>
                                </div>
                                <div className="pt-8 border-t border-[#003926]/10">
                                    <p className="text-[9px] uppercase tracking-widest text-[#2D2D2D]/40 font-black mb-2">Glass</p>
                                    <p className="text-sm font-black text-[#003926]">Sapphire Crystal</p>
                                </div>
                                <div className="pl-10 pt-8 border-t border-[#003926]/10">
                                    <p className="text-[9px] uppercase tracking-widest text-[#2D2D2D]/40 font-black mb-2">Resistance</p>
                                    <p className="text-sm font-black text-[#003926]">10 ATM (100m)</p>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <button className="flex-1 py-6 bg-[#003926] text-white rounded-full flex items-center justify-center gap-4 group active:scale-95 shadow-2xl shadow-[#003926]/30 transition-all duration-300">
                                    <ShoppingBag className="w-5 h-5 transition-transform group-hover:scale-110" />
                                    <span className="uppercase tracking-[0.2em] font-black text-[10px]">Add to Cart</span>
                                </button>
                                <button
                                    onClick={() => toggleWishlist(selectedProduct.id)}
                                    className={`p-6 rounded-full border transition-all flex items-center justify-center active:scale-95 ${wishlist.includes(selectedProduct.id) ? 'bg-[#003926] border-transparent text-white shadow-xl' : 'border-[#E8E0D4] text-[#2D2D2D] hover:border-[#003926] hover:text-[#003926]'
                                        }`}
                                >
                                    <Heart className={`w-6 h-6 ${wishlist.includes(selectedProduct.id) ? 'fill-current' : ''}`} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Sticky Buy Bar - Controlled & Subtle */}
            {selectedProduct && (
                <div className="fixed bottom-0 left-0 right-0 z-[110] bg-white/90 backdrop-blur-md border-t border-[#E8E0D4] h-[75px] md:h-[85px] flex items-center animate-slide-up">
                    <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
                        <div className="flex items-center gap-8">
                            <div className="hidden sm:block w-12 h-12 bg-[#F5F0E8] rounded-xl p-2">
                                <img src={selectedProduct.image} className="w-full h-full object-contain" alt="Mini" />
                            </div>
                            <div>
                                <h4 className="text-sm font-black text-[#003926] tracking-tight">{selectedProduct.name}</h4>
                                <p className="text-[10px] text-[#2D2D2D]/40 font-black uppercase tracking-widest">₹{selectedProduct.price.toLocaleString()}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="px-8 py-3 bg-[#003926] text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-[#003926]/20 active:scale-95 transition-all">
                                Add to Cart
                            </button>
                            <button onClick={() => setSelectedProduct(null)} className="p-3 bg-[#FAF8F5] rounded-full text-[#003926] hover:bg-[#003926] hover:text-white transition-all">
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default Designer;

