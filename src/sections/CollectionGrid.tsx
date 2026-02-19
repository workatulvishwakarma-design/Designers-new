import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CollectionGrid = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const titleRef = useRef<HTMLDivElement>(null);

  const collections = [
    {
      name: 'Chrono Series',
      description: 'Precision timing meets bold design. For those who command every second.',
      image: '/collection-chrono.jpg',
      count: '12 Models',
      price: 'From ₹74,999',
    },
    {
      name: 'Heritage Series',
      description: 'Timeless elegance inspired by centuries of horological mastery.',
      image: '/collection-heritage.jpg',
      count: '8 Models',
      price: 'From ₹1,09,999',
    },
    {
      name: 'Elite Series',
      description: 'The pinnacle of luxury. Exquisite complications for the discerning collector.',
      image: '/collection-elite.jpg',
      count: '6 Models',
      price: 'From ₹2,99,999',
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
      gsap.set(card, { opacity: 0, y: 100 });

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: 'top 50%',
        onEnter: () => {
          gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: index * 0.2,
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
      id="collections"
      className="relative w-full bg-[#FAF8F5] overflow-hidden py-20 lg:py-32"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5] via-[#F5F0E8] to-[#FAF8F5]" />

        {/* Decorative Glow */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-[#D4A574]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 left-0 w-72 h-72 bg-[#1B4D3E]/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 w-full px-6 lg:px-16 xl:px-24">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-24 lg:mb-32">
          <p className="text-[#003926] text-sm tracking-[0.5em] uppercase mb-6 font-black">
            Our Collections
          </p>
          <h2 className="text-5xl md:text-7xl font-black text-[#003926] leading-[0.9] tracking-tighter mb-8">
            Find Your Perfect <span className="gold-gradient-text">Timepiece</span>
          </h2>
          <p className="text-[#2D2D2D]/60 text-xl max-w-[650px] mx-auto leading-relaxed font-medium">
            Each collection represents a unique philosophy of design and craftsmanship.
          </p>
        </div>

        {/* Collection Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {collections.map((collection, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer interactive shadow-lg shadow-[#2D2D2D]/5"
            >
              {/* Image */}
              <div className="absolute inset-0 img-zoom">
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5]/95 via-[#FAF8F5]/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

              {/* Content */}
              <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-end">
                {/* Top Badge */}
                <div className="absolute top-6 left-6 flex gap-3">
                  <span className="px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm text-[#2D2D2D]/80 text-xs font-medium shadow-sm">
                    {collection.count}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#003926]/10 backdrop-blur-sm text-[#003926] text-xs font-bold uppercase tracking-widest shadow-sm">
                    {collection.price}
                  </span>
                </div>

                {/* Arrow Icon */}
                <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-sm">
                  <ArrowUpRight className="w-5 h-5 text-[#2D2D2D]" />
                </div>

                {/* Title & Description */}
                <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                  <h3 className="text-2xl lg:text-3xl font-black text-[#003926] mb-3 transition-colors duration-300">
                    {collection.name}
                  </h3>
                  <p className="text-[#003926]/60 text-sm leading-relaxed max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0 font-medium">
                    {collection.description}
                  </p>
                </div>

                {/* Bottom Line */}
                <div className="mt-4 h-0.5 bg-[#003926] w-0 group-hover:w-full transition-all duration-700" />
              </div>

              {/* Border Glow on Hover */}
              <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-[#003926]/20 transition-colors duration-500 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-24">
          <button className="group relative px-12 py-5 bg-[#003926] text-white font-black rounded-[40px] overflow-hidden transition-all duration-500 shadow-xl shadow-[#003926]/20 hover:shadow-2xl interactive active:scale-95 uppercase tracking-widest text-xs">
            <span className="relative z-10 flex items-center gap-3">
              View All Collections
              <ArrowUpRight className="w-5 h-5 transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
            </span>
            <div className="absolute inset-0 bg-[#02523A] transform translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CollectionGrid;
