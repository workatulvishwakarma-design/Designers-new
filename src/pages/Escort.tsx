import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShoppingBag, Heart } from 'lucide-react';
import Footer from '../sections/Footer';

gsap.registerPlugin(ScrollTrigger);

interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    popularity: number;
}

const products: Product[] = [
    { id: 101, name: "Escort Classic White", price: 4999, image: "/watch-hero-silver.png", popularity: 95 },
    { id: 102, name: "Escort Sport Blue", price: 5499, image: "/watch-hero-black.png", popularity: 88 },
    { id: 103, name: "Escort Urban Steel", price: 6999, image: "/watch-hero-silver.png", popularity: 92 },
    { id: 104, name: "Escort Rose Gold", price: 8999, image: "/watch-hero-gold.png", popularity: 98 },
    { id: 105, name: "Escort Active Black", price: 5999, image: "/watch-hero-black.png", popularity: 85 },
    { id: 106, name: "Escort Minimalist", price: 4999, image: "/watch-hero-silver.png", popularity: 90 },
    { id: 107, name: "Escort Executive", price: 7999, image: "/watch-hero-gold.png", popularity: 82 },
    { id: 108, name: "Escort Weekend", price: 5499, image: "/watch-hero-silver.png", popularity: 87 },
];

const Escort = () => {
    const [wishlist, setWishlist] = useState<number[]>([]);
    const [sortBy, setSortBy] = useState<'popularity' | 'price-low' | 'price-high'>('popularity');
    const [filterType, setFilterType] = useState<'all' | 'leather' | 'steel' | 'sport'>('all');

    const heroRef = useRef<HTMLElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        setWishlist(savedWishlist);

        ScrollTrigger.refresh();

        if (heroRef.current) {
            gsap.fromTo(heroRef.current.querySelectorAll('.hero-fade'),
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out', delay: 0.3 }
            );
        }

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    useEffect(() => {
        if (gridRef.current) {
            const cards = gridRef.current.querySelectorAll('.product-card');
            gsap.set(cards, { opacity: 0, y: 30 });
            ScrollTrigger.batch(cards, {
                onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' }),
                once: true
            });
        }
    }, [sortBy, filterType]);

    const toggleWishlist = (id: number) => {
        const newWishlist = wishlist.includes(id)
            ? wishlist.filter(item => item !== id)
            : [...wishlist, id];
        setWishlist(newWishlist);
        localStorage.setItem('wishlist', JSON.stringify(newWishlist));
    };

    const sortedProducts = [...products].sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        return b.popularity - a.popularity;
    });

    return (
        <div className="bg-[#FAF8F5]">
            {/* Soft Hero Section - Practical Confidence */}
            <section ref={heroRef} className="pt-40 pb-20 px-6 lg:px-24 bg-[#F2EDE4] relative overflow-hidden">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 items-center gap-16">
                    <div className="order-2 lg:order-1">
                        <p className="hero-fade text-[#003926] text-[10px] tracking-[0.5em] uppercase mb-6 font-black">Escort Everyday Collection</p>
                        <h1 className="hero-fade text-5xl md:text-7xl font-black text-[#003926] leading-[0.95] tracking-tight mb-8">
                            Built for Comfort.
                            <span className="block text-[#003926]/40 mt-2 italic font-serif">Made to Last.</span>
                        </h1>
                        <p className="hero-fade text-[#2D2D2D]/60 text-lg md:text-xl max-w-xl leading-relaxed mb-10 font-medium">
                            The essential companion for your daily journey. Lightweight, reliable, and designed to look as good at your desk as it does at dinner.
                        </p>
                        <div className="hero-fade flex items-center gap-8">
                            <button className="px-10 py-4 bg-[#003926] text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl shadow-[#003926]/10 active:scale-95 transition-all">
                                View Collection
                            </button>
                            <div className="flex items-center gap-3">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-[#F2EDE4] bg-[#003926]/10 overflow-hidden"><img src={`/watch-hero-${i === 1 ? 'black' : i === 2 ? 'silver' : 'gold'}.png`} className="w-full h-full object-cover" /></div>)}
                                </div>
                                <p className="text-[9px] text-[#2D2D2D]/40 font-black uppercase tracking-widest">Join 50k+ daily owners</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative order-1 lg:order-2 flex justify-center">
                        <div className="hero-fade relative w-[250px] md:w-[350px] lg:w-[400px]">
                            <img
                                src="/watch-hero-silver.png"
                                alt="Escort Collection"
                                className="w-full h-auto drop-shadow-[0_30px_50px_rgba(0,0,0,0.1)] transition-transform duration-700 hover:scale-105"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Minimal Filter Bar */}
            <div className="sticky top-20 z-30 bg-white/80 backdrop-blur-md border-b border-[#E8E0D4] px-6 lg:px-24">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between py-6 gap-6">
                    <div className="flex items-center gap-10 overflow-x-auto no-scrollbar w-full md:w-auto">
                        {['all', 'leather', 'steel', 'sport'].map((type) => (
                            <button
                                key={type}
                                onClick={() => setFilterType(type as any)}
                                className={`relative text-[10px] uppercase tracking-[0.2em] font-black py-2 transition-all ${filterType === type ? 'text-[#003926]' : 'text-[#2D2D2D]/40 hover:text-[#003926]'}`}
                            >
                                {type}
                                {filterType === type && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#003926] rounded-full animate-underline-grow" />
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
                        <div className="flex items-center gap-4">
                            <span className="text-[9px] uppercase tracking-widest text-[#2D2D2D]/40 font-black">Sort:</span>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as any)}
                                className="bg-transparent text-[10px] font-black uppercase tracking-widest text-[#003926] cursor-pointer focus:outline-none"
                            >
                                <option value="popularity">Popularity</option>
                                <option value="price-low">Price: Low</option>
                                <option value="price-high">Price: High</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Approachesable Product Grid */}
            <section className="py-24 px-6 lg:px-24 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-16">
                        {sortedProducts.map((product) => (
                            <div key={product.id} className="product-card group">
                                <div className="relative aspect-square bg-[#FAF8F5] rounded-2xl overflow-hidden shadow-[0_8px_20px_rgba(0,0,0,0.05)] group-hover:shadow-[0_15px_30px_rgba(0,0,0,0.08)] transition-all duration-500 group-hover:-translate-y-1 group-hover:border-[#003926]/10">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        onError={(e: any) => { e.target.src = '/watch-hero-black.png' }}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                                    />
                                    <button
                                        onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
                                        className={`absolute top-6 right-6 p-3 rounded-full transition-all duration-300 ${wishlist.includes(product.id) ? 'bg-[#003926] text-white' : 'bg-white/80 text-[#2D2D2D]/40 hover:text-[#003926] backdrop-blur-sm'
                                            }`}
                                    >
                                        <Heart className={`w-4 h-4 ${wishlist.includes(product.id) ? 'fill-current' : ''}`} />
                                    </button>
                                </div>

                                <div className="mt-8 text-center px-4">
                                    <h3 className="text-lg font-black text-[#003926] group-hover:text-[#02523A] transition-colors tracking-tight">{product.name}</h3>
                                    <p className="text-[#2D2D2D]/40 text-[9px] font-black uppercase tracking-[0.2em] mt-2 mb-4">Daily Wear Essential</p>
                                    <p className="text-[#003926] font-black text-lg mb-6">₹{product.price.toLocaleString()}</p>

                                    <button className="w-full py-4 bg-white border border-[#003926]/10 rounded-full text-[10px] font-black uppercase tracking-widest text-[#003926] hover:bg-[#003926] hover:text-white hover:border-transparent transition-all duration-300 flex items-center justify-center gap-3 active:scale-95 shadow-sm">
                                        <ShoppingBag className="w-4 h-4" /> Add To Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Comfort & Durability Section - Confidence cards */}
            <section className="py-32 bg-[#FAF8F5]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20">
                        <p className="text-[#003926] text-[10px] tracking-[0.5em] uppercase mb-6 font-black">Reliability Guide</p>
                        <h2 className="text-4xl md:text-5xl font-black text-[#003926] tracking-tighter">Comfort You Can <span className="gold-gradient-text italic font-serif">Wear Daily</span></h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { title: "Lightweight Case", desc: "Optimized for all-day wear without wrist fatigue.", icon: "🎈" },
                            { title: "Scratch Resistant", desc: "Treated crystal that stands up to the city life.", icon: "🛡️" },
                            { title: "Water Resistance", desc: "Reliable 5 ATM rating for rain and splashes.", icon: "💧" },
                            { title: "Quartz Precision", desc: "Japanese movement for set-it-and-forget-it reliability.", icon: "⌚" }
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-10 rounded-2xl shadow-sm hover:shadow-lg transition-all border border-[#003926]/5 group text-center">
                                <div className="text-4xl mb-6 grayscale group-hover:grayscale-0 transition-all">{item.icon}</div>
                                <h3 className="text-base font-black text-[#003926] mb-4">{item.title}</h3>
                                <p className="text-sm text-[#2D2D2D]/60 leading-relaxed font-medium">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Comparison Section - Minimal & Clean */}
            <section className="py-32 bg-white">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl font-black text-[#003926] tracking-tight">Find Your Match</h2>
                    </div>

                    <div className="overflow-hidden rounded-3xl border border-[#E8E0D4] bg-white">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-[#E8E0D4] bg-[#FAF8F5]">
                                    <th className="p-6 text-[10px] uppercase tracking-widest font-black text-[#2D2D2D]/40">Feature</th>
                                    <th className="p-6 text-[10px] uppercase tracking-widest font-black text-[#003926]">Classic</th>
                                    <th className="p-6 text-[10px] uppercase tracking-widest font-black text-[#003926]">Sport</th>
                                    <th className="p-6 text-[10px] uppercase tracking-widest font-black text-[#003926]">Rose Gold</th>
                                </tr>
                            </thead>
                            <tbody className="text-[11px] font-bold text-[#2D2D2D]/60 uppercase tracking-wider">
                                {[
                                    { label: "Price", v1: "₹4,999", v2: "₹5,499", v3: "₹8,999" },
                                    { label: "Case Size", v1: "40mm", v2: "42mm", v3: "38mm" },
                                    { label: "Strap", v1: "Steel", v2: "Sport Mesh", v3: "Italian Leather" },
                                    { label: "Resistance", v1: "3 ATM", v2: "10 ATM", v3: "5 ATM" }
                                ].map((row, i) => (
                                    <tr key={i} className="border-b border-[#E8E0D4] hover:bg-[#003926]/5 transition-colors group">
                                        <td className="p-6 text-[#2D2D2D]/40">{row.label}</td>
                                        <td className="p-6 group-hover:text-[#003926]">{row.v1}</td>
                                        <td className="p-6 group-hover:text-[#003926]">{row.v2}</td>
                                        <td className="p-6 group-hover:text-[#003926]">{row.v3}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Friendly CTA */}
            <section className="py-32 px-6 lg:px-24">
                <div className="max-w-7xl mx-auto bg-[#F2EDE4] rounded-[3rem] p-16 lg:p-32 text-center relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-6xl font-black text-[#003926] mb-10 tracking-tighter">Find Your Everyday Essential.</h2>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <button className="px-12 py-5 bg-[#003926] text-white rounded-full font-black uppercase text-xs tracking-widest shadow-xl shadow-[#003926]/10 active:scale-95 transition-all">
                                Shop All Products
                            </button>
                            <button className="px-12 py-5 bg-white text-[#003926] rounded-full border border-[#E8E0D4] font-black uppercase text-xs tracking-widest active:scale-95 transition-all">
                                Customer Service
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Escort;
