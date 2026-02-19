import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, Mail, Clock, Send, Globe } from 'lucide-react';
import Footer from '../sections/Footer';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
    const heroRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLElement>(null);
    const mapRef = useRef<HTMLElement>(null);

    useEffect(() => {
        ScrollTrigger.refresh();

        if (heroRef.current) {
            gsap.fromTo(heroRef.current.querySelectorAll('.hero-fade'),
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out', delay: 0.5 }
            );
        }

        if (contentRef.current) {
            const items = contentRef.current.querySelectorAll('.reveal-item');
            gsap.set(items, { opacity: 0, x: (i) => i % 2 === 0 ? -30 : 30 });
            ScrollTrigger.create({
                trigger: contentRef.current,
                start: 'top 75%',
                onEnter: () => {
                    gsap.to(items, { opacity: 1, x: 0, duration: 1, stagger: 0.2, ease: 'power2.out' });
                },
                once: true
            });
        }

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <div className="bg-[#FAF8F5]">
            {/* Hero Section */}
            <section ref={heroRef} className="pt-48 pb-24 px-6 lg:px-16 xl:px-24 text-center">
                <p className="hero-fade text-[#003926] text-sm tracking-[0.5em] uppercase mb-8 font-black">Get In Touch</p>
                <h1 className="hero-fade text-6xl md:text-8xl font-black text-[#003926] leading-[0.9] mb-12">
                    Contact
                    <span className="block gold-gradient-text mt-4">DSIGNER'S</span>
                </h1>
                <div className="hero-fade w-24 h-1.5 bg-[#003926] mx-auto opacity-10 mb-12 rounded-full" />
                <p className="hero-fade text-[#2D2D2D]/60 text-xl max-w-2xl mx-auto leading-relaxed">
                    Our concierges are available to assist with your horological inquiries and service needs.
                </p>
            </section>

            {/* Contact Content */}
            <section ref={contentRef} className="py-24 lg:py-32 px-6 lg:px-16 xl:px-24">
                <div className="max-w-[1320px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">

                    {/* Left: Info */}
                    <div className="reveal-item space-y-16">
                        <div>
                            <h2 className="text-4xl font-black text-[#003926] mb-12">Headquarters</h2>
                            <div className="space-y-12">
                                <div className="flex gap-8 group">
                                    <div className="w-16 h-16 rounded-2xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.05)] group-hover:bg-[#003926] flex items-center justify-center flex-shrink-0 transition-all duration-500">
                                        <MapPin className="w-7 h-7 text-[#003926] group-hover:text-white transition-colors" />
                                    </div>
                                    <div>
                                        <h3 className="text-xs uppercase tracking-[0.3em] text-[#003926]/40 font-black mb-3">Address</h3>
                                        <p className="text-[#2D2D2D]/70 text-lg leading-relaxed">
                                            A-302, Fair Link Centre, Off New Link road,<br />
                                            Andheri West, Mumbai 400053,<br />
                                            Maharashtra, India
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-8 group">
                                    <div className="w-16 h-16 rounded-2xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.05)] group-hover:bg-[#003926] flex items-center justify-center flex-shrink-0 transition-all duration-500">
                                        <Phone className="w-7 h-7 text-[#003926] group-hover:text-white transition-colors" />
                                    </div>
                                    <div>
                                        <h3 className="text-xs uppercase tracking-[0.3em] text-[#003926]/40 font-black mb-3">Phone</h3>
                                        <p className="text-[#2D2D2D]/70 font-black text-xl hover:text-[#003926] transition-colors">+91 98201 06589</p>
                                        <p className="text-[#2D2D2D]/70 font-black text-xl hover:text-[#003926] transition-colors">+91 99204 14447</p>
                                    </div>
                                </div>

                                <div className="flex gap-8 group">
                                    <div className="w-16 h-16 rounded-2xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.05)] group-hover:bg-[#003926] flex items-center justify-center flex-shrink-0 transition-all duration-500">
                                        <Mail className="w-7 h-7 text-[#003926] group-hover:text-white transition-colors" />
                                    </div>
                                    <div>
                                        <h3 className="text-xs uppercase tracking-[0.3em] text-[#003926]/40 font-black mb-3">Email</h3>
                                        <p className="text-[#003926] font-black text-xl hover:text-[#02523A] transition-colors underline decoration-[#003926]/20 underline-offset-8">info@designerworld.in</p>
                                    </div>
                                </div>

                                <div className="flex gap-8 group">
                                    <div className="w-16 h-16 rounded-2xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.05)] group-hover:bg-[#003926] flex items-center justify-center flex-shrink-0 transition-all duration-500">
                                        <Clock className="w-7 h-7 text-[#003926] group-hover:text-white transition-colors" />
                                    </div>
                                    <div>
                                        <h3 className="text-xs uppercase tracking-[0.3em] text-[#003926]/40 font-black mb-3">Hours</h3>
                                        <p className="text-[#2D2D2D]/70 text-lg">Mon - Sat: 10:00 AM - 7:00 PM</p>
                                        <p className="text-[#003926]/40 text-xs italic font-bold mt-2">Closed on Sundays and Public Holidays</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-12 border-t border-[#E8E0D4] flex gap-10 items-center">
                            <Globe className="w-12 h-12 text-[#003926] opacity-10" />
                            <p className="text-base text-[#2D2D2D]/50 leading-relaxed italic max-w-sm">
                                For international distribution inquiries, please contact our exports division through the enquiry form.
                            </p>
                        </div>
                    </div>

                    {/* Right: Form */}
                    <div className="reveal-item">
                        <div className="bg-white p-12 lg:p-20 rounded-[3rem] shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-[#E8E0D4]">
                            <h3 className="text-3xl font-black text-[#003926] mb-12">Inquiry Form</h3>
                            <form className="space-y-10">
                                <div className="space-y-3">
                                    <label className="text-[10px] uppercase tracking-[0.3em] text-[#003926]/40 font-black ml-1">Full Name</label>
                                    <input type="text" className="w-full px-0 py-4 bg-transparent border-b border-[#E8E0D4] focus:outline-none focus:border-[#003926] transition-all text-lg font-medium outline-none" />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] uppercase tracking-[0.3em] text-[#003926]/40 font-black ml-1">Email Address</label>
                                    <input type="email" className="w-full px-0 py-4 bg-transparent border-b border-[#E8E0D4] focus:outline-none focus:border-[#003926] transition-all text-lg font-medium outline-none" />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] uppercase tracking-[0.3em] text-[#003926]/40 font-black ml-1">Subject</label>
                                    <input type="text" className="w-full px-0 py-4 bg-transparent border-b border-[#E8E0D4] focus:outline-none focus:border-[#003926] transition-all text-lg font-medium outline-none" />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] uppercase tracking-[0.3em] text-[#003926]/40 font-black ml-1">Message</label>
                                    <textarea rows={4} className="w-full px-0 py-4 bg-transparent border-b border-[#E8E0D4] focus:outline-none focus:border-[#003926] transition-all text-lg font-medium resize-none outline-none" />
                                </div>
                                <button type="button" className="group w-full btn-green rounded-[40px] py-6 flex items-center justify-center gap-4 active:scale-95 shadow-xl shadow-[#003926]/20">
                                    <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    <span className="uppercase tracking-widest font-black">Dispatch Message</span>
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </section>

            {/* Map Placeholder */}
            <section ref={mapRef} className="pb-32 px-6 lg:px-16 xl:px-24">
                <div className="aspect-[21/9] w-full bg-white rounded-[4rem] overflow-hidden relative group border border-[#E8E0D4] shadow-2xl shadow-[#003926]/5">
                    <div className="absolute inset-0 flex items-center justify-center flex-col text-center p-12">
                        <div className="w-24 h-24 rounded-full bg-[#FAF8F5]/80 backdrop-blur-md flex items-center justify-center mb-10 group-hover:scale-110 transition-transform shadow-lg">
                            <MapPin className="w-10 h-10 text-[#003926]" />
                        </div>
                        <h3 className="text-3xl font-black text-[#003926] mb-4">Locate Our Studio</h3>
                        <p className="text-sm text-[#2D2D2D]/40 font-black uppercase tracking-[0.4em]">Andheri West, Mumbai</p>
                        <button className="mt-10 px-10 py-4 border border-[#003926] text-[#003926] rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-[#003926] hover:text-white transition-all">
                            Open in Maps
                        </button>
                    </div>
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Contact;
