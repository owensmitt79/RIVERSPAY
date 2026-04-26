import { useEffect, useRef, useState } from 'react';
import { UserPlus, ShieldCheck, Wallet, Send } from 'lucide-react';

const steps = [
  {
    icon: UserPlus,
    number: '01',
    title: 'Create Your Account',
    description:
      'Sign up in seconds with just your email and phone number. No paperwork, no waiting.',
    time: 'Takes 1 minute',
  },
  {
    icon: ShieldCheck,
    number: '02',
    title: 'Verify Your Identity',
    description:
      'Quick and secure verification process to keep your account safe and compliant.',
    time: 'Instant verification',
  },
  {
    icon: Wallet,
    number: '03',
    title: 'Add Funds',
    description:
      'Link your bank account, card, or receive transfers from other RiversPay users.',
    time: 'Multiple options',
  },
  {
    icon: Send,
    number: '04',
    title: 'Start Transacting',
    description:
      'Send money, pay bills, and manage your finances with ease.',
    time: "You're all set!",
  },
];

export default function HowItWorks() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
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

  // Auto-advance steps
  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative py-24 lg:py-32 bg-gradient-to-b from-white via-brand-beige to-white overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-20 left-10 w-64 h-64 rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(0, 112, 224, 0.08) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute bottom-20 right-10 w-80 h-80 rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(10, 37, 64, 0.08) 0%, transparent 70%)',
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
            How It Works
          </span>
          <h2
            className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-brand-dark mb-6"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
            }}
          >
            Get Started in{' '}
            <span className="text-gradient-primary">Minutes</span>
          </h2>
          <p
            className="text-lg text-brand-body"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
            }}
          >
            Four simple steps to financial freedom
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Steps List */}
          <div className="space-y-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = activeStep === index;

              return (
                <div
                  key={step.number}
                  className={`relative flex gap-6 p-6 rounded-2xl transition-all duration-500 cursor-pointer ${
                    isActive
                      ? 'bg-white shadow-card border border-brand-primary/20'
                      : 'bg-transparent hover:bg-white/50'
                  }`}
                  onClick={() => setActiveStep(index)}
                  style={{
                    animation: isVisible
                      ? `slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards`
                      : 'none',
                    animationDelay: `${500 + index * 150}ms`,
                    opacity: 0,
                  }}
                >
                  {/* Progress Line */}
                  {index < steps.length - 1 && (
                    <div
                      className={`absolute left-[42px] top-[80px] w-0.5 h-[calc(100%-32px)] transition-colors duration-500 ${
                        index < activeStep ? 'bg-brand-primary' : 'bg-brand-medium-gray'
                      }`}
                    />
                  )}

                  {/* Step Number Circle */}
                  <div
                    className={`flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 ${
                      isActive
                        ? 'bg-brand-primary text-white scale-110'
                        : index < activeStep
                        ? 'bg-brand-primary/20 text-brand-primary'
                        : 'bg-brand-light-gray text-brand-body'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className={`text-sm font-semibold transition-colors duration-500 ${
                          isActive ? 'text-brand-primary' : 'text-brand-body/60'
                        }`}
                      >
                        Step {step.number}
                      </span>
                      <span className="text-xs text-brand-body/40 px-2 py-0.5 bg-brand-light-gray rounded-full">
                        {step.time}
                      </span>
                    </div>
                    <h3
                      className={`font-display font-semibold text-xl mb-2 transition-colors duration-500 ${
                        isActive ? 'text-brand-dark' : 'text-brand-body'
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={`text-sm leading-relaxed transition-all duration-500 ${
                        isActive
                          ? 'text-brand-body max-h-20 opacity-100'
                          : 'text-brand-body/60 max-h-0 opacity-0 overflow-hidden lg:max-h-20 lg:opacity-100'
                      }`}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right - Visual */}
          <div
            className="relative hidden lg:block"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(30px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.6s',
            }}
          >
            <div className="relative">
              {/* Main Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-hero">
                <img
                  src="/images/app-mockup.jpg"
                  alt="RiversPay App"
                  className="w-full h-auto"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/20 to-transparent" />
              </div>

              {/* Floating Badge */}
              <div
                className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-card animate-float"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-brand-dark">Verified</p>
                    <p className="text-sm text-brand-body">Account ready</p>
                  </div>
                </div>
              </div>

              {/* Floating Stats */}
              <div
                className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-card animate-float-slow"
              >
                <div className="text-center">
                  <p className="text-2xl font-display font-bold text-brand-primary">
                    2M+
                  </p>
                  <p className="text-xs text-brand-body">Happy Users</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Step Indicators (Mobile) */}
        <div className="flex justify-center gap-2 mt-8 lg:hidden">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveStep(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeStep === index
                  ? 'w-8 bg-brand-primary'
                  : 'bg-brand-medium-gray hover:bg-brand-primary/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
