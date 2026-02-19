import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Globe, Heart, Target } from 'lucide-react';
import Footer from '../sections/Footer';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const heroRef = useRef<HTMLElement>(null);
  const storyRef = useRef<HTMLElement>(null);
  const valuesRef = useRef<HTMLElement>(null);
  const teamRef = useRef<HTMLElement>(null);
  const milestonesRef = useRef<HTMLElement>(null);

  useEffect(() => {
    ScrollTrigger.refresh();

    // Hero animation
    const heroElements = heroRef.current?.querySelectorAll('.hero-reveal');
    if (heroElements && heroElements.length > 0) {
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

    // Story section
    const storyElements = storyRef.current?.querySelectorAll('.story-reveal');
    if (storyElements) {
      ScrollTrigger.create({
        trigger: storyRef.current,
        start: 'top 75%',
        onEnter: () => {
          gsap.fromTo(storyElements,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out' }
          );
        },
        once: true,
      });
    }

    // Values cards
    const valueCards = valuesRef.current?.querySelectorAll('.value-card');
    if (valueCards) {
      ScrollTrigger.create({
        trigger: valuesRef.current,
        start: 'top 75%',
        onEnter: () => {
          gsap.fromTo(valueCards,
            { opacity: 0, y: 40, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out' }
          );
        },
        once: true,
      });
    }

    // Team section
    const teamCards = teamRef.current?.querySelectorAll('.team-card');
    if (teamCards) {
      ScrollTrigger.create({
        trigger: teamRef.current,
        start: 'top 75%',
        onEnter: () => {
          gsap.fromTo(teamCards,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out' }
          );
        },
        once: true,
      });
    }

    // Milestones
    const milestones = milestonesRef.current?.querySelectorAll('.milestone');
    if (milestones) {
      ScrollTrigger.create({
        trigger: milestonesRef.current,
        start: 'top 75%',
        onEnter: () => {
          gsap.fromTo(milestones,
            { opacity: 0, x: (i) => i % 2 === 0 ? -30 : 30 },
            { opacity: 1, x: 0, duration: 1, stagger: 0.2, ease: 'power2.out' }
          );
        },
        once: true,
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const values = [
    {
      icon: Award,
      title: 'Excellence',
      description: 'We never compromise on quality. Every component is meticulously crafted to meet the highest standards.',
    },
    {
      icon: Heart,
      title: 'Passion',
      description: 'Our love for horology drives everything we do. Each timepiece is created with genuine care and dedication.',
    },
    {
      icon: Target,
      title: 'Precision',
      description: 'Swiss-engineered movements ensure accuracy that stands the test of time.',
    },
    {
      icon: Globe,
      title: 'Heritage',
      description: 'Blending Indian craftsmanship with Swiss precision, we honor tradition while embracing innovation.',
    },
  ];



  const milestones = [
    { year: '1979', title: 'The Genesis', description: 'Nagpal Bombay founded as a specialist in watch components and parts.' },
    { year: '1999', title: 'DSIGNER\'S Launch', description: 'Established our flagship brand focusing on premium timepieces.' },
    { year: '2005', title: 'Swiss Integration', description: 'Strategic alliance with Swiss movement manufacturers for unparalleled precision.' },
    { year: '2015', title: 'International Expansion', description: 'Taking Indian craftsmanship to global markets through export divisions.' },
    { year: '2024', title: 'Integrated Legacy', description: 'Operating across the entire watch value chain with manufacturing excellence.' },
  ];

  return (
    <>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative w-full min-h-[75vh] bg-[#FAF8F5] overflow-hidden flex items-center pt-32 px-6 lg:px-16 xl:px-24"
      >
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-l from-[#F5F0E8] to-transparent opacity-70" />
          <div className="absolute top-20 left-20 w-80 h-80 bg-[#003926]/5 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 w-full max-w-[1320px] mx-auto">
          <div className="max-w-4xl">
            <p className="hero-reveal text-[#003926] text-sm tracking-[0.5em] uppercase mb-8 font-black font-bold">Our Integrated Legacy</p>
            <h1 className="hero-reveal text-6xl md:text-8xl lg:text-9xl font-black text-[#003926] leading-[0.9] mb-12">
              Crafting Time
              <span className="block gold-gradient-text mt-4">For Four Decades</span>
            </h1>
            <p className="hero-reveal text-[#2D2D2D]/60 text-xl md:text-2xl max-w-[700px] leading-relaxed font-medium">
              DSIGNER'S is more than a watch brand—we are custodians of a legacy, blending deep industry knowledge with Swiss precision to create exceptional value.
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FAF8F5] to-transparent" />
      </section>

      {/* Story Section */}
      <section
        ref={storyRef}
        className="relative w-full bg-[#FAF8F5] py-24 md:py-32 px-6 lg:px-16 xl:px-24"
      >
        <div className="max-w-[1320px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="story-reveal relative">
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl shadow-[#003926]/10 border border-[#E8E0D4]">
              <img
                src="/watch-macro-strap.jpg"
                alt="Craftsmanship"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-64 h-64 border-2 border-[#003926]/10 rounded-[3rem] -z-10" />
            <div className="absolute -top-8 -left-8 w-48 h-48 bg-[#003926]/5 rounded-full blur-[60px]" />
          </div>

          <div className="space-y-10">
            <div className="story-reveal">
              <p className="text-[#003926] text-sm tracking-[0.5em] uppercase mb-6 font-black">Our Philosophy</p>
              <h2 className="text-4xl md:text-6xl font-black text-[#003926] leading-tight">
                Where Heritage Meets
                <span className="gold-gradient-text block mt-2"> Precision Excellence</span>
              </h2>
            </div>

            <div className="story-reveal space-y-8 max-w-[650px]">
              <p className="text-[#2D2D2D]/70 text-xl leading-relaxed font-medium transition-colors hover:text-[#2D2D2D]">
                At DSIGNER'S, we believe that an integrated approach to watchmaking is the only way to ensure world-class quality at every touchpoint.
              </p>
              <p className="text-[#2D2D2D]/60 leading-relaxed text-lg">
                What started as a component-focused enterprise in 1979 has evolved into a comprehensive watch ecosystem. We don't just assemble watches; we understand the microscopic precision of every gear and the artisanal beauty of every dial.
              </p>
              <p className="text-[#2D2D2D]/60 leading-relaxed text-lg">
                Today, we operate across the entire value chain, from manufacturing for global private labels to curating international brands for the Indian market, all while staying true to our core of horological passion.
              </p>
            </div>

            <div className="story-reveal flex flex-wrap gap-12 pt-6">
              <div>
                <p className="text-[#003926] text-5xl font-black">40+</p>
                <p className="text-[#003926]/40 text-xs uppercase tracking-[0.3em] font-black mt-3">Years of Legacy</p>
              </div>
              <div>
                <p className="text-[#003926] text-5xl font-black">500+</p>
                <p className="text-[#003926]/40 text-xs uppercase tracking-[0.3em] font-black mt-3">Private Labels</p>
              </div>
              <div>
                <p className="text-[#003926] text-5xl font-black">20+</p>
                <p className="text-[#003926]/40 text-xs uppercase tracking-[0.3em] font-black mt-3">Brand Partners</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section
        ref={valuesRef}
        className="py-24 md:py-32 bg-white"
      >
        <div className="max-w-[1320px] mx-auto px-6 lg:px-16 xl:px-24">
          <div className="text-center mb-24">
            <p className="text-[#003926] text-sm tracking-[0.5em] uppercase mb-6 font-black">What Drives Us</p>
            <h2 className="text-5xl md:text-7xl font-black text-[#003926]">Core Values</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="value-card group relative bg-[#FAF8F5] rounded-3xl p-10 border border-[#E8E0D4] hover:border-[#003926]/20 transition-all duration-700 hover:shadow-2xl hover:-translate-y-2"
                >
                  <div className="w-16 h-16 rounded-2xl bg-[#003926]/5 flex items-center justify-center mb-8 group-hover:bg-[#003926] transition-all duration-500">
                    <Icon className="w-8 h-8 text-[#003926] group-hover:text-white transition-colors duration-500" />
                  </div>
                  <h3 className="text-2xl font-black text-[#003926] mb-4">
                    {value.title}
                  </h3>
                  <p className="text-[#2D2D2D]/60 leading-relaxed font-medium">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Milestones Section */}
      <section
        ref={milestonesRef}
        className="py-24 md:py-32 bg-[#FAF8F5]"
      >
        <div className="max-w-[1320px] mx-auto px-6 lg:px-16 xl:px-24">
          <div className="text-center mb-24">
            <p className="text-[#003926] text-sm tracking-[0.5em] uppercase mb-6 font-black">Our Evolution</p>
            <h2 className="text-5xl md:text-7xl font-black text-[#003926]">Key Milestones</h2>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="relative">
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#003926] via-[#003926]/20 to-transparent rounded-full shadow-sm" />

              <div className="space-y-20">
                {milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className={`milestone relative flex items-start gap-12 md:flex-row ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                      }`}
                  >
                    <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-16 h-16 rounded-full bg-[#003926] flex items-center justify-center shadow-xl shadow-[#003926]/20 z-10 border-4 border-white">
                      <span className="text-white font-black text-xs">{milestone.year}</span>
                    </div>

                    <div className={`ml-20 md:ml-0 md:w-[42%] ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
                      }`}>
                      <div className="bg-white p-8 rounded-3xl border border-[#E8E0D4] shadow-lg shadow-[#003926]/5 hover:shadow-2xl hover:border-[#003926]/10 transition-all duration-500">
                        <h3 className="text-2xl font-black text-[#003926] mb-4">{milestone.title}</h3>
                        <p className="text-[#2D2D2D]/60 leading-relaxed font-medium">{milestone.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default About;
