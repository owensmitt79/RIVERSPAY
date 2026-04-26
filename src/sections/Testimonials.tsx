import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Freelance Designer',
    avatar: '/images/avatar-1.jpg',
    quote:
      'RiversPay has transformed how I receive payments from clients. Instant transfers, zero hassle. I can focus on my work instead of chasing payments.',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'Small Business Owner',
    avatar: '/images/avatar-2.jpg',
    quote:
      "The business tools are incredible. Invoicing and payroll used to take days, now it's minutes. RiversPay has saved me countless hours.",
    rating: 5,
  },
  {
    name: 'Amara Okafor',
    role: 'Marketing Executive',
    avatar: '/images/avatar-3.jpg',
    quote:
      "I travel frequently for work. RiversPay's multi-currency feature saves me so much money on exchange rates and fees.",
    rating: 5,
  },
  {
    name: 'David Miller',
    role: 'Software Engineer',
    avatar: '/images/avatar-4.jpg',
    quote:
      "As someone who cares about security, RiversPay exceeds all my expectations. Rock solid infrastructure and bank-grade protection.",
    rating: 5,
  },
  {
    name: 'Emma Rodriguez',
    role: 'Entrepreneur',
    avatar: '/images/avatar-5.jpg',
    quote:
      'Started using RiversPay for my startup. Now my whole team is on it. Simply the best payment solution for growing businesses.',
    rating: 5,
  },
];

export default function Testimonials() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
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

  // Auto-rotate
  useEffect(() => {
    if (!isVisible || !isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isVisible, isAutoPlaying]);

  const goToPrev = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const getCardStyle = (index: number) => {
    const diff = index - activeIndex;
    const normalizedDiff =
      diff > testimonials.length / 2
        ? diff - testimonials.length
        : diff < -testimonials.length / 2
        ? diff + testimonials.length
        : diff;

    if (normalizedDiff === 0) {
      return {
        transform: 'translateX(0) translateZ(0) rotateY(0deg) scale(1)',
        opacity: 1,
        zIndex: 30,
      };
    } else if (normalizedDiff === 1 || normalizedDiff === -testimonials.length + 1) {
      return {
        transform: 'translateX(120%) translateZ(-150px) rotateY(25deg) scale(0.85)',
        opacity: 0.5,
        zIndex: 20,
      };
    } else if (normalizedDiff === -1 || normalizedDiff === testimonials.length - 1) {
      return {
        transform: 'translateX(-120%) translateZ(-150px) rotateY(-25deg) scale(0.85)',
        opacity: 0.5,
        zIndex: 20,
      };
    } else {
      return {
        transform: 'translateX(0) translateZ(-300px) scale(0.7)',
        opacity: 0,
        zIndex: 10,
      };
    }
  };

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative py-24 lg:py-32 bg-brand-beige overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-10 left-10 w-64 h-64 rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(0, 112, 224, 0.08) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute bottom-10 right-10 w-80 h-80 rounded-full opacity-30"
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
            Testimonials
          </span>
          <h2
            className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-brand-dark mb-6"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
            }}
          >
            Loved by <span className="text-gradient-primary">Millions</span>
          </h2>
          <p
            className="text-lg text-brand-body"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
            }}
          >
            See what our users have to say about their RiversPay experience.
          </p>
        </div>

        {/* Carousel */}
        <div
          className="relative perspective-1200 h-[400px] md:h-[350px]"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.8s ease 0.3s',
          }}
        >
          {/* Cards Container */}
          <div className="relative w-full h-full flex items-center justify-center preserve-3d">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className="absolute w-full max-w-lg transition-all duration-600 ease-expo-out"
                style={getCardStyle(index)}
              >
                <div className="bg-white rounded-3xl p-8 shadow-card hover:shadow-card-hover transition-shadow duration-300">
                  {/* Quote Icon */}
                  <Quote className="w-10 h-10 text-brand-primary/20 mb-4" />

                  {/* Quote Text */}
                  <p className="text-lg text-brand-body leading-relaxed mb-6">
                    "{testimonial.quote}"
                  </p>

                  {/* Rating */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-brand-primary text-brand-primary"
                      />
                    ))}
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-display font-semibold text-brand-dark">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-brand-body">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-white shadow-card flex items-center justify-center text-brand-dark hover:bg-brand-primary hover:text-white transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-white shadow-card flex items-center justify-center text-brand-dark hover:bg-brand-primary hover:text-white transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsAutoPlaying(false);
                setActiveIndex(index);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? 'w-8 bg-brand-primary'
                  : 'w-2 bg-brand-medium-gray hover:bg-brand-primary/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
