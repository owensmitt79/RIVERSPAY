import { useEffect, useState, useRef } from 'react';
import Navbar from '../sections/Navbar';
import Hero from '../sections/Hero';

import Services from '../sections/Services';
import HowItWorks from '../sections/HowItWorks';
import Features from '../sections/Features';
import Testimonials from '../sections/Testimonials';
import Statistics from '../sections/Statistics';
import CTA from '../sections/CTA';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={mainRef} className="min-h-screen bg-white overflow-x-hidden">
      <Navbar scrollY={scrollY} />
      <main>
        <Hero />
        <Services />
        <HowItWorks />
        <Features />
        <Testimonials />
        <Statistics />
        <CTA />
      </main>
    </div>
  );
}
