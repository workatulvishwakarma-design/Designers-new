import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CTASection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // Magnetic button effect
  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(button, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Entry animation
  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    gsap.set(content.children, { opacity: 0, y: 60 });

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 60%',
      onEnter: () => {
        gsap.to(content.children, {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
        });
      },
      once: true,
    });

    return () => trigger.kill();
  }, []);

  // Glow pulse animation
  useEffect(() => {
    if (glowRef.current) {
      gsap.to(glowRef.current, {
        scale: 1.2,
        opacity: 0.4,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full bg-[#FAF8F5] overflow-hidden py-32 lg:py-48"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5] via-[#F5F0E8] to-[#FAF8F5]" />

        {/* Central Glow */}
        <div
          ref={glowRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4A574]/15 rounded-full blur-[150px]"
        />

        {/* Radial Lines */}
        <div className="absolute inset-0 opacity-5">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 w-px h-[50%] bg-gradient-to-b from-[#D4A574] to-transparent origin-top"
              style={{
                transform: `rotate(${i * 30}deg)`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 lg:px-16 xl:px-24">
        <div ref={contentRef} className="text-center max-w-4xl mx-auto">
          {/* Eyebrow */}
          <p className="text-[#003926] text-sm tracking-[0.5em] uppercase mb-8 font-black">
            Begin Your Journey
          </p>

          {/* Main Heading */}
          <h2 className="text-5xl md:text-8xl font-black text-[#003926] leading-[0.9] tracking-tighter mb-10">
            Own Your
            <span className="block gold-gradient-text mt-4">Moment.</span>
          </h2>

          {/* Subtext */}
          <p className="text-[#2D2D2D]/60 text-xl md:text-2xl max-w-[650px] mx-auto mb-16 leading-relaxed font-medium">
            Join thousands of collectors who have discovered the art of
            timeless elegance. Your perfect timepiece awaits.
          </p>

          {/* CTA Button */}
          <div className="flex justify-center">
            <button
              ref={buttonRef}
              className="group relative px-16 py-6 bg-[#003926] text-white font-black text-xs tracking-[0.3em] uppercase rounded-[40px] overflow-hidden transition-all duration-500 shadow-2xl shadow-[#003926]/30 interactive active:scale-95"
            >
              {/* Shine Effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

              {/* Button Content */}
              <span className="relative z-10 flex items-center gap-4">
                Explore Collections
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
              </span>
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-20 flex flex-wrap justify-center items-center gap-12 text-[#003926]/40 text-[10px] uppercase tracking-[0.3em] font-black">
            <div className="flex items-center gap-3 group cursor-pointer hover:text-[#003926] transition-colors">
              <div className="w-1.5 h-1.5 rounded-full bg-[#003926] group-hover:scale-150 transition-transform" />
              <span>Complimentary Shipping</span>
            </div>
            <div className="flex items-center gap-3 group cursor-pointer hover:text-[#003926] transition-colors">
              <div className="w-1.5 h-1.5 rounded-full bg-[#003926] group-hover:scale-150 transition-transform" />
              <span>30-Day Returns</span>
            </div>
            <div className="flex items-center gap-3 group cursor-pointer hover:text-[#003926] transition-colors">
              <div className="w-1.5 h-1.5 rounded-full bg-[#003926] group-hover:scale-150 transition-transform" />
              <span>5-Year Global Warranty</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Decorative Line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-[#D4A574]/50 to-transparent" />
    </section>
  );
};

export default CTASection;
