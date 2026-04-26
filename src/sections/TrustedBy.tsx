import { useEffect, useRef, useState } from 'react';
import { Building2, Landmark, Wallet, CreditCard, Banknote, Shield } from 'lucide-react';

const partners = [
  { name: 'TechCorp', icon: Building2 },
  { name: 'FinanceHub', icon: Landmark },
  { name: 'GlobalPay', icon: Wallet },
  { name: 'SecureBank', icon: CreditCard },
  { name: 'MoneyFlow', icon: Banknote },
  { name: 'PaySystems', icon: Shield },
];

export default function TrustedBy() {
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

  // Duplicate partners for seamless loop
  const allPartners = [...partners, ...partners];

  return (
    <section
      ref={sectionRef}
      className="relative py-16 bg-brand-beige overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Label */}
        <p
          className="text-center text-sm font-medium text-brand-body uppercase tracking-wider mb-10"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
          }}
        >
          Trusted by industry leaders
        </p>
      </div>

      {/* Logo Ticker */}
      <div
        className="relative"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateX(0)' : 'translateX(100px)',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
        }}
      >
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-brand-beige to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-brand-beige to-transparent z-10 pointer-events-none" />

        {/* Scrolling Container */}
        <div className="flex animate-scroll hover:[animation-play-state:paused]">
          {allPartners.map((partner, index) => {
            const Icon = partner.icon;
            return (
              <div
                key={`${partner.name}-${index}`}
                className="flex items-center gap-3 px-12 py-4 group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-white shadow-card flex items-center justify-center transition-all duration-300 group-hover:shadow-card-hover group-hover:scale-110">
                  <Icon className="w-6 h-6 text-brand-body group-hover:text-brand-primary transition-colors duration-300" />
                </div>
                <span className="text-lg font-semibold text-brand-body/60 group-hover:text-brand-dark transition-colors duration-300 whitespace-nowrap">
                  {partner.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats Row */}
      <div
        className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-12"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.5s',
        }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '2M+', label: 'Active Users' },
            { value: '150+', label: 'Countries' },
            { value: '$2B+', label: 'Transactions' },
            { value: '99.9%', label: 'Uptime' },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="text-center"
              style={{
                animation: isVisible
                  ? `slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards`
                  : 'none',
                animationDelay: `${600 + index * 100}ms`,
                opacity: 0,
              }}
            >
              <p className="text-2xl sm:text-3xl font-display font-bold text-brand-primary">
                {stat.value}
              </p>
              <p className="text-sm text-brand-body mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
