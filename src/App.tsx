import { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Home from './pages/Home';
import About from './pages/About';
import Strengths from './pages/Strengths';
import Designer from './pages/Designer';
import Escort from './pages/Escort';
import Contact from './pages/Contact';
import LoadingScreen from './components/LoadingScreen';
import Navigation from './components/Navigation';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  // Custom cursor - Desktop Only
  useEffect(() => {
    if (isLoading) return;

    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    if (!cursor || !cursorDot) return;

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.08,
        ease: 'power2.out',
      });
      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.02,
        ease: 'none',
      });
    };

    const handleMouseEnter = () => {
      gsap.to(cursor, { scale: 1.5, opacity: 0.5, duration: 0.2 });
    };

    const handleMouseLeave = () => {
      gsap.to(cursor, { scale: 1, opacity: 0.3, duration: 0.2 });
    };

    window.addEventListener('mousemove', moveCursor);

    // Add hover effect to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .interactive');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [isLoading]);

  // Loading screen timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // Initialize ScrollTrigger
  useEffect(() => {
    if (isLoading) return;

    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isLoading]);

  return (
    <Router>
      {isLoading && <LoadingScreen />}

      {/* Custom Cursor - Desktop Only */}
      <div
        ref={cursorRef}
        className="fixed w-8 h-8 rounded-full border border-[#D4A574]/30 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 opacity-30 hidden lg:block"
        style={{ mixBlendMode: 'difference' }}
      />
      <div
        ref={cursorDotRef}
        className="fixed w-1 h-1 rounded-full bg-[#D4A574] pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 hidden lg:block"
      />

      {/* Grain Overlay */}
      <div className="grain-overlay" />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative bg-[#FAF8F5] min-h-screen overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/strengths" element={<Strengths />} />
          <Route path="/designer" element={<Designer />} />
          <Route path="/escort" element={<Escort />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
