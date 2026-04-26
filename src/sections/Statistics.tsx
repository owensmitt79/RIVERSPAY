import { useEffect, useRef, useState } from 'react';

const stats = [
  { value: 2, suffix: 'B+', prefix: '$', label: 'Transactions Processed' },
  { value: 2, suffix: 'M+', prefix: '', label: 'Active Users' },
  { value: 150, suffix: '+', prefix: '', label: 'Countries Supported' },
  { value: 99.9, suffix: '%', prefix: '', label: 'Uptime Guaranteed' },
];

function AnimatedCounter({
  value,
  suffix,
  prefix,
  isVisible,
  delay,
}: {
  value: number;
  suffix: string;
  prefix: string;
  isVisible: boolean;
  delay: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const timeout = setTimeout(() => {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(current);
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }, delay);

    return () => clearTimeout(timeout);
  }, [isVisible, value, delay]);

  const displayValue = value % 1 !== 0 ? count.toFixed(1) : Math.floor(count);

  return (
    <span>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}

export default function Statistics() {
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
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-24 bg-brand-navy overflow-hidden"
    >
      {/* Animated Background Gradient */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          background: 'linear-gradient(135deg, rgba(0, 112, 224, 0.3) 0%, rgba(10, 37, 64, 0.3) 100%)',
          animation: 'pulse-soft 8s ease-in-out infinite',
        }}
      />

      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-20 -left-20 w-64 h-64 rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center"
              style={{
                animation: isVisible
                  ? `slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards`
                  : 'none',
                animationDelay: `${200 + index * 200}ms`,
                opacity: 0,
              }}
            >
              <p
                className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-2"
                style={{
                  textShadow: '0 0 30px rgba(0, 112, 224, 0.3)',
                }}
              >
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                  isVisible={isVisible}
                  delay={200 + index * 200}
                />
              </p>
              <p
                className="text-sm sm:text-base text-white/70"
                style={{
                  animation: isVisible
                    ? `fade-in 0.5s ease forwards`
                    : 'none',
                  animationDelay: `${1000 + index * 100}ms`,
                  opacity: 0,
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
