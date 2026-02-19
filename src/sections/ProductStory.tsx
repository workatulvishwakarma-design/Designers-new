import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ProductStory = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const lightFlareRef = useRef<HTMLDivElement>(null);
  const textLinesRef = useRef<HTMLSpanElement[]>([]);

  const headingText = "Crafted To Be Remembered.";
  const words = headingText.split(' ');

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const triggers: ScrollTrigger[] = [];

    // Heading word-by-word reveal
    textLinesRef.current.forEach((word, index) => {
      if (!word) return;
      gsap.set(word, { opacity: 0, y: 50, filter: 'blur(10px)' });

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: 'top 70%',
        onEnter: () => {
          gsap.to(word, {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.out',
          });
        },
        once: true,
      });
      triggers.push(trigger);
    });

    // Image zoom and parallax
    const imageTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        if (imageRef.current) {
          gsap.to(imageRef.current, {
            scale: 1 + progress * 0.15,
            y: progress * -50,
            duration: 0.1,
          });
        }
      },
    });
    triggers.push(imageTrigger);

    // Light flare animation
    const flareTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 60%',
      onEnter: () => {
        gsap.fromTo(lightFlareRef.current,
          { x: '-100%', opacity: 0 },
          { x: '200%', opacity: 1, duration: 2, ease: 'power2.inOut' }
        );
      },
      once: true,
    });
    triggers.push(flareTrigger);

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#FAF8F5] overflow-hidden py-20 lg:py-32"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5] via-[#F5F0E8] to-[#FAF8F5]" />

      {/* Decorative Elements */}
      <div className="absolute top-40 right-0 w-72 h-72 bg-[#D4A574]/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-[#1B4D3E]/5 rounded-full blur-[120px]" />

      {/* Content Container */}
      <div className="relative z-10 w-full px-6 lg:px-16 xl:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[70vh]">

          {/* Left Side - Heading */}
          <div className="space-y-10">
            <p className="text-[#003926] text-sm tracking-[0.5em] uppercase font-black">Our Philosophy</p>
            <h2
              ref={headingRef}
              className="text-5xl md:text-7xl lg:text-8xl font-black text-[#003926] leading-[0.9] tracking-tighter"
            >
              {words.map((word, index) => (
                <span
                  key={index}
                  ref={(el) => {
                    if (el) textLinesRef.current[index] = el;
                  }}
                  className="inline-block mr-[0.3em]"
                >
                  {word}
                </span>
              ))}
            </h2>

            {/* Subtext */}
            <div className="space-y-8 pt-8">
              <p className="text-[#2D2D2D]/70 text-xl leading-relaxed max-w-[650px] font-medium transition-colors hover:text-[#2D2D2D]">
                Every DSIGNER'S timepiece is a testament to Indian craftsmanship
                meeting Swiss precision. Meticulously assembled by master artisans,
                each watch represents the perfect fusion of tradition and innovation.
              </p>
              <p className="text-[#2D2D2D]/50 text-lg leading-relaxed max-w-[650px]">
                From the sapphire crystal that protects the dial to the intricate
                movement that beats within, every detail is designed to transcend time.
              </p>
            </div>

            {/* Stats */}
            <div className="flex gap-12 pt-12 flex-wrap">
              <div>
                <p className="text-[#003926] text-5xl font-black">25+</p>
                <p className="text-[#003926]/40 text-[10px] uppercase tracking-[0.3em] font-black mt-3">Years Heritage</p>
              </div>
              <div>
                <p className="text-[#003926] text-5xl font-black">218</p>
                <p className="text-[#003926]/40 text-[10px] uppercase tracking-[0.3em] font-black mt-3">Components</p>
              </div>
              <div>
                <p className="text-[#003926] text-5xl font-black">5yr</p>
                <p className="text-[#003926]/40 text-[10px] uppercase tracking-[0.3em] font-black mt-3">Warranty</p>
              </div>
            </div>
          </div>

          {/* Right Side - Macro Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl shadow-[#2D2D2D]/10">
              {/* Image Container */}
              <div
                ref={imageRef}
                className="relative aspect-[16/10] overflow-hidden"
              >
                <img
                  src="/watch-macro-strap.jpg"
                  alt="Watch macro detail"
                  className="w-full h-full object-cover"
                />

                {/* Light Flare Effect */}
                <div
                  ref={lightFlareRef}
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(212, 165, 116, 0.2), transparent)',
                    transform: 'translateX(-100%)',
                  }}
                />
              </div>

              {/* Glassmorphism Info Card */}
              <div className="absolute bottom-6 left-6 right-6 glass rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#D4A574] text-xs uppercase tracking-widest mb-1">
                      Premium Materials
                    </p>
                    <p className="text-[#2D2D2D] font-semibold">
                      Italian Calf Leather Strap
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-[#D4A574]/10 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-[#D4A574]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border border-[#D4A574]/30 rounded-full" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 border border-[#D4A574]/20 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductStory;
