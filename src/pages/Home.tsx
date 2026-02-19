import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from '../sections/Hero';
import ProductStory from '../sections/ProductStory';
import WatchRotation from '../sections/WatchRotation';
import Features from '../sections/Features';
import ParallaxSection from '../sections/ParallaxSection';
import Testimonials from '../sections/Testimonials';
import CollectionGrid from '../sections/CollectionGrid';
import CTASection from '../sections/CTASection';
import Footer from '../sections/Footer';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  useEffect(() => {
    ScrollTrigger.refresh();
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <Hero />
      <ProductStory />
      <WatchRotation />
      <Features />
      <ParallaxSection />
      <Testimonials />
      <CollectionGrid />
      <CTASection />
      <Footer />
    </>
  );
};

export default Home;
