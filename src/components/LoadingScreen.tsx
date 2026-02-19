import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const LoadingScreen = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Logo animation
    tl.fromTo(logoRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );

    // Progress bar animation
    tl.fromTo(barRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 1.5, ease: 'power2.inOut' },
      '-=0.3'
    );

    // Fade out
    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.inOut',
      onComplete: () => {
        if (containerRef.current) {
          containerRef.current.style.display = 'none';
        }
      }
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-[#FAF8F5] z-[10000] flex flex-col items-center justify-center"
    >
      {/* Logo */}
      <div ref={logoRef} className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-[0.3em] text-[#2D2D2D] mb-4">
          DSIGNER'S
        </h1>
        <p className="text-[#D4A574] text-sm tracking-[0.5em] uppercase">
          Premium Timepieces
        </p>
      </div>

      {/* Progress Bar */}
      <div ref={progressRef} className="mt-12 w-48 h-[2px] bg-[#E8E0D4] overflow-hidden">
        <div
          ref={barRef}
          className="h-full bg-[#D4A574] origin-left"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>

      {/* Loading Text */}
      <p className="mt-6 text-[#2D2D2D]/40 text-xs tracking-widest uppercase">
        Loading Experience
      </p>
    </div>
  );
};

export default LoadingScreen;
