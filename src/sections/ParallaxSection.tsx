import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ParallaxSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    // Create particles
    const particleCount = 40;
    const particles: HTMLDivElement[] = [];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute w-1 h-1 bg-[#D4A574]/30 rounded-full blur-[1px] pointer-events-none';
      particlesRef.current?.appendChild(particle);

      // Random initial position
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const size = Math.random() * 2 + 1;

      gsap.set(particle, {
        xPercent: x,
        yPercent: y,
        width: size,
        height: size,
        opacity: Math.random() * 0.5 + 0.2
      });

      particles.push(particle);

      // Floating animation
      gsap.to(particle, {
        x: `+=${Math.random() * 100 - 50}`,
        y: `+=${Math.random() * 100 - 50}`,
        duration: 10 + Math.random() * 20,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }

    // Parallax effect for content
    gsap.fromTo(content,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
        }
      }
    );

    // Background movement on scroll
    gsap.to(section, {
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
      backgroundColor: '#002619', // Slightly deeper green on scroll
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 40;
    const y = (clientY / window.innerHeight - 0.5) * 40;
    setMousePos({ x, y });
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-[80vh] min-h-[600px] bg-[#003926] overflow-hidden flex items-center justify-center py-24"
    >
      {/* Mesh Gradient Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#02523A] rounded-full blur-[120px] opacity-40 animate-pulse"
          style={{
            transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)`,
            transition: 'transform 0.2s ease-out'
          }}
        />
        <div
          className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#D4A574]/10 rounded-full blur-[120px] opacity-30"
          style={{
            transform: `translate(${mousePos.x * -0.3}px, ${mousePos.y * -0.3}px)`,
            transition: 'transform 0.2s ease-out'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5]/5 via-transparent to-[#FAF8F5]/5" />
      </div>

      {/* Particle Layer */}
      <div ref={particlesRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* Content */}
      <div ref={contentRef} className="relative z-10 text-center max-w-5xl px-6">
        {/* Visual Accent */}
        <div className="flex items-center justify-center gap-6 mb-12">
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#D4A574]" />
          <div className="w-2.5 h-2.5 rounded-full border border-[#D4A574] animate-ping" />
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#D4A574]" />
        </div>

        {/* Main Heading */}
        <h2 className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.9] tracking-tighter mb-8 drop-shadow-2xl">
          Time Is
          <span className="block gold-gradient-text mt-4 opacity-90">Personal.</span>
        </h2>

        {/* Description */}
        <p className="max-w-[650px] mx-auto text-white/70 text-lg md:text-xl lg:text-2xl leading-relaxed mb-16 font-medium">
          Every second tells a story. Every moment becomes a memory.
          Wear time that reflects who you are.
        </p>

        {/* Action Button */}
        <div className="flex justify-center">
          <button className="group relative px-12 py-6 bg-white text-[#003926] font-black text-xs tracking-[0.3em] uppercase rounded-[40px] overflow-hidden transition-all duration-500 shadow-2xl hover:shadow-white/20 active:scale-95">
            <span className="relative z-10 flex items-center gap-4">
              Discover Your Story
              <ArrowRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-2" />
            </span>
            <div className="absolute inset-0 bg-[#F5F0E8] transform translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </button>
        </div>
      </div>

      {/* Edge Shadows for depth */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/20 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
    </section>
  );
};

export default ParallaxSection;

