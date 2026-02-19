import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Network, Users, Settings, Globe, Award, Briefcase, Box, Send, ChevronDown } from 'lucide-react';
import Footer from '../sections/Footer';

gsap.registerPlugin(ScrollTrigger);

const Strengths = () => {
    const heroRef = useRef<HTMLElement>(null);
    const statsRef = useRef<HTMLElement>(null);
    const gridRef = useRef<HTMLElement>(null);
    const divisionsRef = useRef<HTMLElement>(null);
    const formRef = useRef<HTMLElement>(null);

    useEffect(() => {
        ScrollTrigger.refresh();

        // Fade-up Animation Setup
        const fadeUp = (elements: NodeListOf<Element> | Element[]) => {
            gsap.fromTo(elements,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: (elements[0] as HTMLElement).parentElement,
                        start: 'top 85%',
                    }
                }
            );
        };

        // Hero Reveal
        const heroElements = heroRef.current?.querySelectorAll('.hero-reveal');
        if (heroElements) {
            gsap.fromTo(heroElements,
                { opacity: 0, y: 60 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    stagger: 0.2,
                    ease: 'power3.out',
                    delay: 0.5
                }
            );
        }

        // Stats Animation
        const stats = statsRef.current?.querySelectorAll('.stat-number');
        if (stats) {
            stats.forEach((stat) => {
                const targetValue = parseInt(stat.getAttribute('data-target') || '0');
                ScrollTrigger.create({
                    trigger: stat,
                    start: 'top 90%',
                    onEnter: () => {
                        const obj = { value: 0 };
                        gsap.to(obj, {
                            value: targetValue,
                            duration: 2,
                            ease: 'power2.out',
                            onUpdate: () => {
                                stat.innerHTML = Math.ceil(obj.value) + '+';
                            }
                        });
                    },
                    once: true
                });
            });
        }

        // Reveal Sections
        [gridRef, divisionsRef, formRef].forEach((ref) => {
            const elements = ref.current?.querySelectorAll('.reveal-item');
            if (elements) {
                fadeUp(elements);
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    const divisions = [
        { icon: Globe, title: 'International Brands', desc: 'Curating world-class timepieces for the discerning Indian market.' },
        { icon: Settings, title: 'OEM / ODM Manufacturing', desc: 'Precision manufacturing excellence for global private labels.' },
        { icon: Briefcase, title: 'B2B / Institutional Supply', desc: 'Tailored corporate gifting and institutional solutions.' },
        { icon: Box, title: 'Parts – Nagpal Bombay', desc: 'Legacy of excellence in component sourcing and supply.' },
        { icon: Send, title: 'Exports', desc: 'Taking Indian craftsmanship to the global horological stage.' },
    ];

    return (
        <div className="bg-[#FAF8F5]">
            {/* Hero Section */}
            <section ref={heroRef} className="relative w-full min-h-[75vh] flex items-center pt-32 overflow-hidden px-6 lg:px-16 xl:px-24">
                <div className="absolute inset-0">
                    <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-l from-[#F5F0E8] to-transparent opacity-50" />
                    <div className="absolute top-20 left-20 w-80 h-80 bg-[#003926]/5 rounded-full blur-[100px]" />
                </div>

                <div className="relative z-10 w-full max-w-[1320px] mx-auto">
                    <div className="max-w-4xl">
                        <p className="hero-reveal text-[#003926] text-sm tracking-[0.5em] uppercase mb-8 font-bold">Our Integrated Legacy</p>
                        <h1 className="hero-reveal text-6xl md:text-8xl lg:text-9xl font-bold text-[#003926] leading-[0.9] mb-12">
                            Operating Across the
                            <span className="block mt-4 relative">
                                Watch Value Chain
                                <div className="absolute -bottom-4 left-0 w-48 h-2 bg-[#003926] rounded-full hidden md:block" />
                            </span>
                        </h1>
                        <p className="hero-reveal text-[#2D2D2D]/70 text-xl md:text-2xl max-w-[700px] leading-relaxed mb-10">
                            An integrated watch enterprise operating across manufacturing, distribution, components, and brand development for over four decades.
                        </p>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section ref={statsRef} className="py-24 md:py-32 bg-white border-y border-[#E8E0D4]">
                <div className="max-w-[1320px] mx-auto px-6 lg:px-16 xl:px-24">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20 text-center">
                        <div className="space-y-6">
                            <h2 className="stat-number text-8xl md:text-[120px] font-bold text-[#003926] leading-none" data-target="20">0+</h2>
                            <div className="w-16 h-1 bg-[#D4A574] mx-auto opacity-40 rounded-full" />
                            <p className="text-[#2D2D2D]/60 uppercase tracking-[0.3em] text-sm font-bold">International Brand Associations</p>
                        </div>
                        <div className="space-y-6">
                            <h2 className="stat-number text-8xl md:text-[120px] font-bold text-[#003926] leading-none" data-target="500">0+</h2>
                            <div className="w-16 h-1 bg-[#D4A574] mx-auto opacity-40 rounded-full" />
                            <p className="text-[#2D2D2D]/60 uppercase tracking-[0.3em] text-sm font-bold">Private Labels Manufactured</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Behind the Industry Grid */}
            <section ref={gridRef} className="py-24 lg:py-32 bg-[#FAF8F5]">
                <div className="max-w-[1320px] mx-auto px-6 lg:px-16 xl:px-24">
                    <div className="text-center mb-24 reveal-item">
                        <p className="text-[#003926] text-sm tracking-[0.5em] uppercase mb-4 font-bold">The Infrastructure</p>
                        <h2 className="text-5xl md:text-6xl font-bold text-[#003926]">Behind the Industry</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                        {[
                            { icon: Network, title: 'Multi-channel Distribution Network', desc: 'A structured presence across retail stores, multi-brand outlets, and digital marketplaces ensuring consistent market reach.' },
                            { icon: Users, title: 'Long-standing Retail & Service Partnerships', desc: 'Decades of trusted relationships with retailers and service networks built on reliability and performance.' },
                            { icon: Award, title: 'Strong Supply Chain & Sourcing Expertise', desc: 'Deep industry knowledge in sourcing components and managing supply chains to ensure quality and efficiency.' }
                        ].map((item, i) => (
                            <div key={i} className="reveal-item group p-12 bg-white rounded-2xl border border-[#E8E0D4] hover:border-[#003926]/10 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,57,0.06)] transition-all duration-700 hover:-translate-y-2">
                                <div className="w-16 h-16 rounded-2xl bg-[#003926]/5 flex items-center justify-center mb-10 group-hover:bg-[#003926] transition-colors duration-500">
                                    <item.icon className="w-8 h-8 text-[#003926] group-hover:text-white transition-colors duration-500" />
                                </div>
                                <h3 className="text-2xl font-bold text-[#003926] mb-6 transition-colors duration-300">{item.title}</h3>
                                <p className="text-[#2D2D2D]/60 leading-relaxed text-lg">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Core Divisions */}
            <section ref={divisionsRef} className="py-24 lg:py-32 bg-white">
                <div className="max-w-[1320px] mx-auto px-6 lg:px-16 xl:px-24">
                    <div className="text-center mb-24 reveal-item">
                        <p className="text-[#003926] text-sm tracking-[0.5em] uppercase mb-4 font-bold">Capabilities</p>
                        <h2 className="text-5xl md:text-6xl font-bold text-[#003926]">Our Core Divisions</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {divisions.map((div, i) => (
                            <div key={i} className="reveal-item group bg-[#FAF8F5] p-10 rounded-2xl border-t-4 border-t-[#003926] border-x border-b border-[#E8E0D4] hover:shadow-2xl transition-all duration-700 hover:-translate-y-2">
                                <div className="w-16 h-16 rounded-xl bg-white flex items-center justify-center mb-8 shadow-sm group-hover:bg-[#003926] transition-colors duration-500">
                                    <div.icon className="w-7 h-7 text-[#003926] group-hover:text-white transition-colors duration-500" />
                                </div>
                                <h3 className="text-2xl font-bold text-[#003926] mb-4">{div.title}</h3>
                                <p className="text-[#2D2D2D]/60 leading-relaxed">{div.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Partner With Us Form */}
            <section ref={formRef} className="py-24 lg:py-32 bg-[#FAF8F5]">
                <div className="max-w-[900px] mx-auto px-6">
                    <div className="text-center mb-20 reveal-item">
                        <p className="text-[#003926] text-sm tracking-[0.5em] uppercase mb-4 font-bold">Collaboration</p>
                        <h2 className="text-5xl md:text-6xl font-bold text-[#003926]">Partner With Us</h2>
                    </div>
                    <div className="bg-white p-12 lg:p-20 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-[#E8E0D4] reveal-item">
                        <form className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="space-y-4">
                                <label className="text-xs uppercase tracking-[0.3em] text-[#003926]/60 font-black ml-1">Full Name</label>
                                <input type="text" placeholder="Johnathan Smith" className="w-full px-8 py-5 bg-[#FAF8F5] border border-[#E8E0D4] rounded-2xl focus:outline-none focus:border-[#003926] focus:ring-4 focus:ring-[#003926]/5 transition-all outline-none" />
                            </div>
                            <div className="space-y-4">
                                <label className="text-xs uppercase tracking-[0.3em] text-[#003926]/60 font-black ml-1">Email Address</label>
                                <input type="email" placeholder="john@heritage.com" className="w-full px-8 py-5 bg-[#FAF8F5] border border-[#E8E0D4] rounded-2xl focus:outline-none focus:border-[#003926] focus:ring-4 focus:ring-[#003926]/5 transition-all outline-none" />
                            </div>
                            <div className="space-y-4 md:col-span-2">
                                <label className="text-xs uppercase tracking-[0.3em] text-[#003926]/60 font-black ml-1">Subject</label>
                                <input type="text" placeholder="Partnership Inquiry" className="w-full px-8 py-5 bg-[#FAF8F5] border border-[#E8E0D4] rounded-2xl focus:outline-none focus:border-[#003926] focus:ring-4 focus:ring-[#003926]/5 transition-all outline-none" />
                            </div>
                            <div className="space-y-4 md:col-span-2">
                                <label className="text-xs uppercase tracking-[0.3em] text-[#003926]/60 font-black ml-1">I Am Enquiring As</label>
                                <div className="relative">
                                    <select className="w-full px-8 py-5 bg-[#FAF8F5] border border-[#E8E0D4] rounded-2xl focus:outline-none focus:border-[#003926] focus:ring-4 focus:ring-[#003926]/5 transition-all appearance-none cursor-pointer outline-none">
                                        <option>Retailer Partner</option>
                                        <option>Distributor</option>
                                        <option>Private Label Client</option>
                                        <option>Institutional Gifting</option>
                                    </select>
                                    <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-[#003926]/30 pointer-events-none" />
                                </div>
                            </div>
                            <div className="space-y-4 md:col-span-2">
                                <label className="text-xs uppercase tracking-[0.3em] text-[#003926]/60 font-black ml-1">Message</label>
                                <textarea rows={6} placeholder="Tell us about your brand vision..." className="w-full px-8 py-5 bg-[#FAF8F5] border border-[#E8E0D4] rounded-2xl focus:outline-none focus:border-[#003926] focus:ring-4 focus:ring-[#003926]/5 transition-all resize-none outline-none"></textarea>
                            </div>
                            <div className="md:col-span-2 text-center pt-8">
                                <button type="button" className="group relative btn-green w-full md:w-auto px-20 py-6 rounded-[40px] shadow-2xl overflow-hidden hover:-translate-y-1 transition-all duration-300">
                                    <span className="relative z-10 text-lg uppercase tracking-widest font-bold">Submit Enquiry</span>
                                    <div className="absolute inset-0 bg-[#02523A] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Strengths;
