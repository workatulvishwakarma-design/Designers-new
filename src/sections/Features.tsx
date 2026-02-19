import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Gem, Cog, Battery, Droplets } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Features = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const titleRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      icon: Gem,
      title: 'Sapphire Glass',
      description: 'Scratch-resistant sapphire crystal with anti-reflective coating ensures crystal-clear visibility in any light condition.',
      highlight: '9H Hardness',
    },
    {
      icon: Cog,
      title: 'Swiss Movement',
      description: 'Precision-engineered Swiss automatic movement with 28,800 vibrations per hour for unparalleled accuracy.',
      highlight: 'ETA 2824-2',
    },
    {
      icon: Battery,
      title: '72 Hour Reserve',
      description: 'Extended power reserve ensures your timepiece keeps perfect time even after days off the wrist.',
      highlight: '3 Days',
    },
    {
      icon: Droplets,
      title: 'Waterproof 100m',
      description: 'Professional-grade water resistance suitable for swimming and snorkeling adventures.',
      highlight: '10 ATM',
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const triggers: ScrollTrigger[] = [];

    // Title animation
    gsap.set(titleRef.current, { opacity: 0, y: 50 });
    const titleTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 70%',
      onEnter: () => {
        gsap.to(titleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        });
      },
      once: true,
    });
    triggers.push(titleTrigger);

    // Cards stagger animation
    cardsRef.current.forEach((card, index) => {
      if (!card) return;
      gsap.set(card, { opacity: 0, y: 80, scale: 0.95 });

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: 'top 60%',
        onEnter: () => {
          gsap.to(card, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'power3.out',
          });
        },
        once: true,
      });
      triggers.push(trigger);
    });

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#FAF8F5] overflow-hidden py-20 lg:py-32"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5] via-[#F5F0E8] to-[#FAF8F5]" />

        {/* Decorative Glow */}
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#D4A574]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-0 w-72 h-72 bg-[#1B4D3E]/5 rounded-full blur-[100px]" />

        {/* Subtle Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(212, 165, 116, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(212, 165, 116, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 w-full px-6 lg:px-16 xl:px-24">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-24 lg:mb-32">
          <p className="text-[#003926] text-sm tracking-[0.5em] uppercase mb-6 font-black">
            Engineering Excellence
          </p>
          <h2 className="text-5xl md:text-7xl font-black text-[#003926] leading-[0.9] tracking-tighter mb-8">
            Crafted Without <span className="gold-gradient-text">Compromise</span>
          </h2>
          <p className="text-[#2D2D2D]/60 text-xl max-w-[650px] mx-auto leading-relaxed font-medium">
            Every component is meticulously selected and tested to ensure
            exceptional performance and longevity.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el;
                }}
                className="group relative bg-white rounded-2xl p-8 transition-all duration-500 hover:shadow-xl hover:shadow-[#D4A574]/10 interactive border border-[#E8E0D4] hover:border-[#D4A574]/30"
              >
                {/* Hover Glow Border */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background: 'linear-gradient(135deg, rgba(212, 165, 116, 0.15), transparent, rgba(212, 165, 116, 0.08))',
                      padding: '1px',
                    }}
                  />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-[#003926]/5 flex items-center justify-center mb-8 group-hover:bg-[#003926] transition-all duration-500">
                    <Icon className="w-8 h-8 text-[#003926] group-hover:text-white transition-colors duration-500" />
                  </div>

                  {/* Highlight Badge */}
                  <div className="inline-block px-3 py-1 rounded-full bg-[#D4A574]/10 mb-4">
                    <span className="text-[#D4A574] text-xs font-semibold uppercase tracking-wider">
                      {feature.highlight}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-black text-[#003926] mb-4 transition-colors duration-300">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[#2D2D2D]/60 leading-relaxed font-medium text-base">
                    {feature.description}
                  </p>
                </div>

                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-4 right-4 w-8 h-px bg-gradient-to-r from-transparent to-[#D4A574]/50" />
                  <div className="absolute top-4 right-4 w-px h-8 bg-gradient-to-b from-[#D4A574]/50 to-transparent" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Stats Row */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-[#E8E0D4] pt-24">
          {[
            { value: '0.01s', label: 'Daily Accuracy' },
            { value: '316L', label: 'Stainless Steel' },
            { value: '26', label: 'Jewel Bearings' },
            { value: '5yr', label: 'Global Warranty' },
          ].map((stat, index) => (
            <div key={index} className="text-center group">
              <p className="text-[#003926] text-4xl lg:text-5xl font-black group-hover:gold-gradient-text transition-all duration-500">{stat.value}</p>
              <p className="text-[#003926]/40 text-[10px] uppercase tracking-[0.3em] font-black mt-4">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
