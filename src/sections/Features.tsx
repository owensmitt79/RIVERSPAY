import { useEffect, useRef, useState } from 'react';
import {
  Bell,
  PieChart,
  Coins,
  ShieldCheck,
  Headphones,
  Plug,
  PiggyBank,
  ArrowRight,
} from 'lucide-react';

const features = [
  {
    icon: Bell,
    title: 'Real-Time Notifications',
    description:
      'Instant alerts for every transaction, keeping you always informed.',
  },
  {
    icon: PieChart,
    title: 'Smart Budgeting',
    description:
      'AI-powered insights to help you save more and spend smarter.',
  },
  {
    icon: Coins,
    title: 'Multi-Currency Support',
    description:
      'Hold, send, and receive in 25+ currencies worldwide.',
  },
  {
    icon: ShieldCheck,
    title: 'Bank-Grade Security',
    description:
      '256-bit encryption, biometric authentication, and fraud detection. Your security is our priority.',
    featured: true,
    cta: 'Learn about security',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description:
      'Round-the-clock assistance from our dedicated support team.',
  },
  {
    icon: Plug,
    title: 'Seamless Integrations',
    description:
      'Connect with your favorite apps and services effortlessly.',
  },
  {
    icon: PiggyBank,
    title: 'Auto-Save Features',
    description:
      'Set rules to automatically save with every transaction.',
  },
];

export default function Features() {
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative py-24 lg:py-32 bg-white overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 right-0 w-96 h-96 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(0, 112, 224, 0.1) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span
            className="inline-block text-sm font-semibold text-brand-primary uppercase tracking-wider mb-4"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(15px)',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            Powerful Features
          </span>
          <h2
            className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-brand-dark mb-6"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
            }}
          >
            Built for{' '}
            <span className="text-gradient-primary">Modern Finance</span>
          </h2>
          <p
            className="text-lg text-brand-body"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
            }}
          >
            Every feature designed to make your financial life simpler and more
            secure.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isFeatured = feature.featured;

            return (
              <div
                key={feature.title}
                className={`${isFeatured ? 'md:col-span-2 lg:col-span-1' : ''}`}
                style={{
                  animation: isVisible
                    ? `slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards`
                    : 'none',
                  animationDelay: `${index * 80}ms`,
                  opacity: 0,
                }}
              >
                <div
                  className={`group relative h-full rounded-2xl p-8 transition-all duration-300 ${
                    isFeatured
                      ? 'bg-gradient-to-br from-brand-primary to-brand-primary-dark text-white hover:shadow-primary'
                      : 'bg-white border border-brand-medium-gray hover:border-brand-primary hover:-translate-y-1.5 hover:shadow-card-hover'
                  }`}
                >
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-400 group-hover:scale-110 group-hover:rotate-6 ${
                      isFeatured
                        ? 'bg-white/20'
                        : 'bg-brand-primary/10'
                    }`}
                  >
                    <Icon
                      className={`w-7 h-7 ${
                        isFeatured ? 'text-white' : 'text-brand-primary'
                      }`}
                    />
                  </div>

                  {/* Content */}
                  <h3
                    className={`font-display font-semibold text-xl mb-3 ${
                      isFeatured ? 'text-white' : 'text-brand-dark'
                    }`}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className={`text-sm leading-relaxed ${
                      isFeatured ? 'text-white/90' : 'text-brand-body'
                    }`}
                  >
                    {feature.description}
                  </p>

                  {/* CTA (Featured only) */}
                  {feature.cta && (
                    <a
                      href="#"
                      className="inline-flex items-center mt-6 text-white font-medium group/link"
                    >
                      <span className="border-b border-white/50 group-hover/link:border-white transition-colors">
                        {feature.cta}
                      </span>
                      <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                    </a>
                  )}

                  {/* Glow Effect (Featured) */}
                  {isFeatured && (
                    <div className="absolute inset-0 rounded-2xl animate-glow pointer-events-none" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
