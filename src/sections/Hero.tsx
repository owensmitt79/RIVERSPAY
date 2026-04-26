import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);


  return (
    <section
      ref={heroRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-white via-brand-beige to-white pt-20"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(0, 112, 224, 0.15) 0%, transparent 70%)',
            animation: 'float 8s ease-in-out infinite',
          }}
        />
        <div
          className="absolute top-1/2 -left-40 w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(10, 37, 64, 0.15) 0%, transparent 70%)',
            animation: 'float 10s ease-in-out infinite 2s',
          }}
        />
        <div
          className="absolute bottom-20 right-1/4 w-[300px] h-[300px] rounded-full opacity-25"
          style={{
            background: 'radial-gradient(circle, rgba(0, 112, 224, 0.1) 0%, transparent 70%)',
            animation: 'float 6s ease-in-out infinite 1s',
          }}
        />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 112, 224, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 112, 224, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[calc(100vh-160px)]">
          {/* Left Content */}
          <div className="flex flex-col gap-8 z-10">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 text-brand-primary font-medium text-sm w-fit"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
              }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
              </span>
              Leading Payment Gateway Provider
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <h1
                className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-brand-dark leading-tight"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
                }}
              >
                Simplify Your
              </h1>
              <h1
                className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-tight"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.45s',
                }}
              >
                <span className="text-gradient-primary">Financial</span>{' '}
                <span className="text-brand-dark">Life</span>
              </h1>
              <h1
                className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-brand-dark leading-tight"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.6s',
                }}
              >
                With Smart Payments
              </h1>
            </div>

            {/* Subheadline */}
            <p
              className="text-lg sm:text-xl text-brand-body max-w-xl leading-relaxed"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.8s',
              }}
            >
              Experience a top-tier payment gateway provider. Send, receive, and manage money effortlessly. Join millions who trust
              RiversPay for secure, instant transactions across the globe.
            </p>

            {/* CTA Buttons */}
            <div
              className="flex flex-wrap gap-4"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) 1s',
              }}
            >
              <Link
                to="/get-started"
                className="flex items-center gap-2 px-8 py-4 bg-[#0070E0] text-white rounded-full font-bold hover:bg-[#0052A3] transition-all transform hover:scale-105 shadow-xl shadow-blue-200 group"
              >
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Trust Badge */}
            <div
              className="flex items-center gap-4 pt-4"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(15px)',
                transition: 'all 0.5s ease 1.2s',
              }}
            >
              {/* Avatar Stack */}
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-md"
                  >
                    <img
                      src={`/images/avatar-${i}.jpg`}
                      alt={`User ${i}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-brand-primary text-brand-primary"
                    />
                  ))}
                </div>
                <p className="text-sm text-brand-body">
                  Trusted by <span className="font-semibold text-brand-dark">2M+</span> users worldwide
                </p>
              </div>
            </div>
          </div>

          {/* Right Content - 3D Card Stack */}
          <div
            className="relative perspective-1200 hidden lg:block"
            style={{
              opacity: isVisible ? 1 : 0,
              transition: 'opacity 0.8s ease 0.5s',
            }}
          >
            <div className="relative w-full h-[500px] preserve-3d">
              {/* Card 3 (Back) */}
              <div
                className="absolute top-1/2 left-1/2 w-[280px] h-[200px] rounded-2xl overflow-hidden shadow-feature backface-hidden"
                style={{
                  transform: 'translate(-70%, -50%) translateZ(-80px) rotateY(-5deg)',
                  animation: 'float-slow 4.5s ease-in-out infinite 2s',
                  opacity: isVisible ? 1 : 0,
                  transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.9s',
                }}
              >
                <img
                  src="/images/hero-card-3.jpg"
                  alt="Transfer Interface"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Card 2 (Middle) */}
              <div
                className="absolute top-1/2 left-1/2 w-[300px] h-[220px] rounded-2xl overflow-hidden shadow-feature backface-hidden"
                style={{
                  transform: 'translate(-30%, -60%) translateZ(0px) rotateY(5deg)',
                  animation: 'float 5s ease-in-out infinite 1s',
                  opacity: isVisible ? 1 : 0,
                  transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.75s',
                }}
              >
                <img
                  src="/images/hero-card-2.jpg"
                  alt="Statistics Dashboard"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Card 1 (Front) */}
              <div
                className="absolute top-1/2 left-1/2 w-[340px] h-[240px] rounded-2xl overflow-hidden shadow-hero backface-hidden"
                style={{
                  transform: 'translate(-50%, -40%) translateZ(80px) rotateY(-3deg)',
                  animation: 'float 4s ease-in-out infinite',
                  opacity: isVisible ? 1 : 0,
                  transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.6s',
                }}
              >
                <img
                  src="/images/hero-card-1.jpg"
                  alt="Main Dashboard"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Decorative Elements */}
              <div
                className="absolute top-10 right-10 w-16 h-16 rounded-full bg-brand-primary/10 animate-pulse-soft"
              />
              <div
                className="absolute bottom-20 left-10 w-12 h-12 rounded-lg bg-brand-navy/10 rotate-45 animate-float-delayed"
              />
            </div>
          </div>

          {/* Mobile Hero Image */}
          <div className="lg:hidden relative">
            <div className="relative w-full max-w-sm mx-auto">
              <img
                src="/images/hero-card-1.jpg"
                alt="RiversPay Dashboard"
                className="w-full rounded-2xl shadow-hero"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.6s',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
}
