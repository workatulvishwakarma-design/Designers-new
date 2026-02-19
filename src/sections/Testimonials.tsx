import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const testimonials = [
    {
      id: 1,
      name: 'Rajesh Sharma',
      role: 'Business Owner',
      location: 'Mumbai, India',
      rating: 5,
      text: 'The Chrono X7 exceeded every expectation. The craftsmanship is impeccable, and the attention to detail rivals watches costing ten times as much. I receive compliments everywhere I go.',
      avatar: 'RS',
    },
    {
      id: 2,
      name: 'Priya Patel',
      role: 'Fashion Designer',
      location: 'Delhi, India',
      rating: 5,
      text: 'DSIGNER\'S understands that a watch is more than a timepiece—it\'s a statement. The rose gold edition perfectly complements both my professional and evening wear. Simply exquisite.',
      avatar: 'PP',
    },
    {
      id: 3,
      name: 'Arjun Mehta',
      role: 'Architect',
      location: 'Bangalore, India',
      rating: 5,
      text: 'As someone who appreciates precision engineering, the Swiss movement in my DSIGNER\'S has proven to be extraordinarily accurate. Three years of daily wear and it still runs within seconds.',
      avatar: 'AM',
    },
    {
      id: 4,
      name: 'Ananya Gupta',
      role: 'Art Gallery Owner',
      location: 'Kolkata, India',
      rating: 5,
      text: 'The Heritage collection speaks to my soul. Classic design with modern reliability. It reminds me why I fell in love with horology in the first place. A true work of art.',
      avatar: 'AG',
    },
  ];

  const goToSlide = (index: number) => {
    if (isAnimating || index === activeIndex) return;

    setIsAnimating(true);
    const direction = index > activeIndex ? 1 : -1;

    // Animate out current
    gsap.to(containerRef.current, {
      opacity: 0,
      x: -50 * direction,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        setActiveIndex(index);

        // Animate in new
        gsap.fromTo(containerRef.current,
          { opacity: 0, x: 50 * direction },
          {
            opacity: 1,
            x: 0,
            duration: 0.4,
            ease: 'power2.out',
            onComplete: () => setIsAnimating(false),
          }
        );
      },
    });
  };

  const nextSlide = () => {
    const next = (activeIndex + 1) % testimonials.length;
    goToSlide(next);
  };

  const prevSlide = () => {
    const prev = (activeIndex - 1 + testimonials.length) % testimonials.length;
    goToSlide(prev);
  };

  // Auto-slide
  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      if (!isAnimating) {
        nextSlide();
      }
    }, 5000);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [activeIndex, isAnimating]);

  // Entry animation
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.set(section.querySelectorAll('.reveal-item'), { opacity: 0, y: 50 });

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 70%',
      onEnter: () => {
        gsap.to(section.querySelectorAll('.reveal-item'), {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
        });
      },
      once: true,
    });

    return () => trigger.kill();
  }, []);

  const currentTestimonial = testimonials[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#FAF8F5] overflow-hidden py-20 lg:py-32"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5] via-[#F5F0E8] to-[#FAF8F5]" />

        {/* Subtle Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D4A574]/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 w-full px-6 lg:px-16 xl:px-24">
        {/* Section Header */}
        <div className="text-center mb-20 reveal-item">
          <p className="text-[#003926] text-sm tracking-[0.5em] uppercase mb-6 font-black">
            Client Stories
          </p>
          <h2 className="text-5xl md:text-7xl font-black text-[#003926] leading-[0.9] tracking-tighter">
            What They <span className="gold-gradient-text">Say</span>
          </h2>
        </div>

        {/* Testimonial Card */}
        <div className="max-w-4xl mx-auto reveal-item">
          <div className="relative bg-white rounded-3xl p-8 md:p-12 lg:p-16 shadow-xl shadow-[#2D2D2D]/5 border border-[#E8E0D4]">
            {/* Quote Icon */}
            <div className="absolute -top-6 left-8 md:left-12">
              <div className="w-16 h-16 rounded-full bg-[#003926] flex items-center justify-center shadow-xl shadow-[#003926]/20">
                <Quote className="w-8 h-8 text-white" />
              </div>
            </div>

            {/* Content Container */}
            <div ref={containerRef}>
              {/* Stars */}
              <div className="flex gap-1.5 mb-8">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-[#D4A574] text-[#D4A574]" />
                ))}
              </div>

              {/* Quote Text */}
              <blockquote className="text-2xl md:text-3xl lg:text-4xl text-[#003926]/90 leading-relaxed mb-12 font-medium italic">
                "{currentTestimonial.text}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#D4A574] to-[#B8935F] flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {currentTestimonial.avatar}
                  </span>
                </div>

                {/* Info */}
                <div>
                  <p className="text-[#2D2D2D] font-semibold text-lg">
                    {currentTestimonial.name}
                  </p>
                  <p className="text-[#2D2D2D]/50 text-sm">
                    {currentTestimonial.role} · {currentTestimonial.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 flex items-center gap-4">
              <button
                onClick={prevSlide}
                disabled={isAnimating}
                className="w-14 h-14 rounded-full border border-[#E8E0D4] flex items-center justify-center text-[#003926] hover:bg-[#003926] hover:text-white hover:border-transparent transition-all duration-300 disabled:opacity-50 interactive bg-white shadow-sm"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                disabled={isAnimating}
                className="w-14 h-14 rounded-full border border-[#E8E0D4] flex items-center justify-center text-[#003926] hover:bg-[#003926] hover:text-white hover:border-transparent transition-all duration-300 disabled:opacity-50 interactive bg-white shadow-sm"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-4 mt-12">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-500 interactive ${index === activeIndex
                    ? 'w-12 h-2.5 bg-[#003926] rounded-full'
                    : 'w-2.5 h-2.5 bg-[#E8E0D4] rounded-full hover:bg-[#003926]/30'
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-20 reveal-item">
          <p className="text-center text-[#2D2D2D]/40 text-sm uppercase tracking-widest mb-8">
            Trusted by collectors across India
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-40">
            {['Forbes India', 'GQ India', 'Vogue', 'The Economic Times', 'Mint'].map((brand, index) => (
              <span key={index} className="text-[#2D2D2D] text-xl font-bold tracking-wider">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
