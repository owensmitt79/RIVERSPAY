import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CTA() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="cta"
      className="relative py-20 lg:py-28 overflow-hidden"
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 gradient-primary" />

      {/* Floating Circles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-20 -left-20 w-[300px] h-[300px] rounded-full bg-white/10 animate-float"
        />
        <div
          className="absolute bottom-10 right-10 w-[200px] h-[200px] rounded-full bg-white/8 animate-float-slow"
          style={{ animationDelay: '2s' }}
        />
        <div
          className="absolute top-1/2 right-1/4 w-[150px] h-[150px] rounded-full bg-white/5 animate-float"
          style={{ animationDelay: '4s' }}
        />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <h2
              className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-6"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
              }}
            >
              Ready to Transform Your Payments?
            </h2>
            <p
              className="text-lg text-white/90 mb-8 max-w-xl mx-auto lg:mx-0"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.4s',
              }}
            >
              Join millions of users who have simplified their financial lives
              with RiversPay.
            </p>

            {/* CTA Buttons */}
            <div
              className="flex flex-wrap justify-center lg:justify-start gap-4 mb-2"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.6s',
              }}
            >
              <Link 
              to="/get-started"
              className="px-10 py-5 bg-[#0070E0] text-white rounded-full font-extrabold text-lg hover:bg-[#0052A3] transition-all transform hover:scale-105 shadow-[0_20px_50px_rgba(0,112,224,0.3)] shadow-blue-400 group flex items-center gap-3 w-fit mx-auto"
            >
              Get Started Today
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </Link>
            </div>
          </div>

          {/* Right Content - App Mockup */}
          <div
            className="hidden lg:flex justify-center"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0) rotateX(0)' : 'translateY(50px) rotateX(10deg)',
              transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.5s',
            }}
          >
            <div className="relative">
              <img
                src="/images/app-mockup.jpg"
                alt="RiversPay Mobile App"
                className="w-64 h-auto rounded-3xl shadow-cta animate-float"
              />

              {/* Decorative Elements */}
              <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-white/20 animate-pulse-soft" />
              <div className="absolute -top-4 -right-4 w-12 h-12 rounded-lg bg-white/20 rotate-45 animate-float-slow" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
