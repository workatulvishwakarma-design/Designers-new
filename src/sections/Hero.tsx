import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Play } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const watchRef = useRef<HTMLDivElement>(null);
  const watchImageRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const thumbnailsRef = useRef<HTMLDivElement>(null);
  const [activeWatch, setActiveWatch] = useState(0);

  const watchImages = [
    '/watch-hero-black.png',
    '/watch-hero-silver.png',
    '/watch-hero-gold.png',
  ];

  // Mouse move handler for spotlight and 3D tilt
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      // Move spotlight
      if (spotlightRef.current) {
        gsap.to(spotlightRef.current, {
          x: clientX,
          y: clientY,
          duration: 0.5,
          ease: 'power2.out',
        });
      }

      // 3D tilt effect on watch
      if (watchRef.current && sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((clientY - centerY) / centerY) * -10;
        const rotateY = ((clientX - centerX) / centerX) * 10;

        gsap.to(watchRef.current, {
          rotateX,
          rotateY,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Entry animations
  useEffect(() => {
    const tl = gsap.timeline({ delay: 2.5 });

    // Spotlight fade in
    tl.fromTo(spotlightRef.current,
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 1.5, ease: 'power2.out' }
    );

    // Title animation
    tl.fromTo(titleRef.current,
      { opacity: 0, x: -100, filter: 'blur(20px)' },
      { opacity: 1, x: 0, filter: 'blur(0px)', duration: 1, ease: 'power3.out' },
      '-=1'
    );

    // Subtitle
    tl.fromTo(subtitleRef.current,
      { opacity: 0, x: -80 },
      { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.6'
    );

    // Price
    tl.fromTo(priceRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.4'
    );

    // Buttons
    tl.fromTo(buttonsRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.3'
    );

    // Watch float in
    tl.fromTo(watchRef.current,
      { opacity: 0, y: 100, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power3.out' },
      '-=1.2'
    );

    // Thumbnails
    tl.fromTo(thumbnailsRef.current,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.6'
    );

    // Scroll-triggered parallax
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.to(watchRef.current, {
          y: progress * 150,
          rotation: progress * 5,
          duration: 0.1,
        });
        gsap.to(titleRef.current, {
          y: progress * -100,
          opacity: 1 - progress * 1.5,
          duration: 0.1,
        });
      },
    });
  }, []);

  // Watch change animation
  useEffect(() => {
    if (watchImageRef.current) {
      gsap.fromTo(watchImageRef.current,
        { opacity: 0, scale: 0.9, rotateY: -30 },
        { opacity: 1, scale: 1, rotateY: 0, duration: 0.6, ease: 'power2.out' }
      );
    }
  }, [activeWatch]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#FAF8F5] overflow-hidden flex items-center"
    >
      {/* Spotlight */}
      <div
        ref={spotlightRef}
        className="spotlight opacity-0"
        style={{ left: '50%', top: '50%' }}
      />

      {/* Background Watermark */}
      <div className="watermark top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        DSIGNER'S
      </div>

      {/* Abstract Background Panels */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-l from-[#F5F0E8] to-transparent opacity-70" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[60%] bg-gradient-to-tr from-[#E8E0D4] to-transparent opacity-40 rounded-tr-[100px]" />
        <div className="absolute top-20 left-20 w-64 h-64 bg-[#D4A574]/5 rounded-full blur-[80px]" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#1B4D3E]/5 rounded-full blur-[100px]" />
      </div>

      {/* Main Content Grid */}
      <div className="relative z-10 w-full px-6 lg:px-16 xl:px-24 py-20 pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[80vh]">

          {/* Left Side - Text Content */}
          <div className="lg:col-span-4 space-y-8">
            {/* Brand */}
            <div ref={subtitleRef} className="opacity-0">
              <span className="text-[#003926] text-sm tracking-[0.4em] uppercase font-black">
                Indian Craftsmanship
              </span>
            </div>

            {/* Title */}
            <div ref={titleRef} className="opacity-0">
              <h1 className="text-5xl md:text-8xl font-black text-[#003926] leading-[0.9] tracking-tighter">
                DSIGNER'S
              </h1>
              <h2 className="text-3xl md:text-5xl font-light text-[#003926]/70 mt-4 tracking-wide">
                Chrono X7
              </h2>
            </div>

            {/* Price */}
            <div ref={priceRef} className="opacity-0">
              <p className="gold-gradient-text text-4xl md:text-5xl font-bold">
                ₹74,999
              </p>
              <p className="text-[#2D2D2D]/50 text-sm mt-2 tracking-wide">
                Limited Edition Release
              </p>
            </div>

            {/* Buttons */}
            <div ref={buttonsRef} className="opacity-0 flex flex-wrap gap-4 pt-4">
              <button className="btn-primary flex items-center gap-2 group interactive">
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button className="btn-outline flex items-center gap-2 group interactive">
                <Play className="w-4 h-4" />
                <span>Pre Order Now</span>
              </button>
            </div>
          </div>

          {/* Center - 3D Watch */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="watch-3d-container relative">
              {/* Glow Behind Watch */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[80%] h-[80%] bg-[#D4A574]/10 rounded-full blur-[80px] animate-pulse" />
              </div>

              {/* Watch */}
              <div
                ref={watchRef}
                className="watch-3d relative animate-float opacity-0"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <img
                  ref={watchImageRef}
                  src={watchImages[activeWatch]}
                  alt="DSIGNER'S Chrono X7"
                  className="w-full max-w-[500px] h-auto drop-shadow-2xl"
                  style={{
                    filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.15))',
                  }}
                />

                {/* Reflection */}
                <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[80%] h-20 opacity-20">
                  <img
                    src={watchImages[activeWatch]}
                    alt=""
                    className="w-full h-full object-contain"
                    style={{
                      transform: 'scaleY(-1)',
                      maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.3), transparent)',
                      WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.3), transparent)',
                      filter: 'blur(4px)',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Thumbnails */}
          <div ref={thumbnailsRef} className="lg:col-span-3 flex lg:flex-col gap-4 justify-center lg:justify-start opacity-0">
            {watchImages.map((img, index) => (
              <button
                key={index}
                onClick={() => setActiveWatch(index)}
                className={`relative w-20 h-20 lg:w-24 lg:h-24 rounded-lg overflow-hidden border-2 transition-all duration-300 interactive ${activeWatch === index
                    ? 'border-[#D4A574] shadow-lg shadow-[#D4A574]/20'
                    : 'border-[#E8E0D4] hover:border-[#D4A574]/50'
                  }`}
              >
                <img
                  src={img}
                  alt={`Watch angle ${index + 1}`}
                  className="w-full h-full object-contain bg-white"
                />
                {activeWatch === index && (
                  <div className="absolute inset-0 bg-[#D4A574]/10" />
                )}
              </button>
            ))}

            {/* Color Labels */}
            <div className="hidden lg:block mt-6 space-y-2">
              <p className="text-[#2D2D2D]/50 text-xs uppercase tracking-widest">Available Colors</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setActiveWatch(0)}
                  className={`w-6 h-6 rounded-full bg-black border-2 transition-all ${activeWatch === 0 ? 'border-[#D4A574] scale-110' : 'border-[#E8E0D4]'
                    }`}
                />
                <button
                  onClick={() => setActiveWatch(1)}
                  className={`w-6 h-6 rounded-full bg-gray-300 border-2 transition-all ${activeWatch === 1 ? 'border-[#D4A574] scale-110' : 'border-[#E8E0D4]'
                    }`}
                />
                <button
                  onClick={() => setActiveWatch(2)}
                  className={`w-6 h-6 rounded-full bg-[#D4A574] border-2 transition-all ${activeWatch === 2 ? 'border-[#2D2D2D] scale-110' : 'border-[#E8E0D4]'
                    }`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FAF8F5] to-transparent" />
    </section>
  );
};

export default Hero;
