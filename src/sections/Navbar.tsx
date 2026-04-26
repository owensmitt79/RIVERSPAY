import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  scrollY: number;
}

const navLinks = [
  { name: 'About', href: '/about', isExternal: true },
  { name: 'Developers', href: '/developers', isExternal: true },
  { name: 'Personal', href: '#services' },
  { name: 'Business', href: '/business', isExternal: true },
  { name: 'Help', href: '#cta' },
];

export default function Navbar({ scrollY }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsScrolled(scrollY > 100);
  }, [scrollY]);

  const scrollToSection = (href: string, isExternal?: boolean) => {
    if (isExternal) {
      window.location.href = href;
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ease-expo-out ${
          isScrolled
            ? 'bg-white/95 glass shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a
              href="/"
              className="flex items-center transition-transform duration-300 hover:scale-105"
              style={{
                animation: 'fade-in 0.8s ease-out forwards',
              }}
            >
              <img src="/logo.png" alt="RiversPay Logo" className="h-[76px] object-contain" />
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link, index) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href, link.isExternal)}
                  className={`relative font-medium text-sm underline-animate transition-colors duration-300 ${
                    isScrolled
                      ? 'text-brand-body hover:text-brand-primary'
                      : 'text-brand-body hover:text-brand-primary'
                  }`}
                  style={{
                    animation: `slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
                    animationDelay: `${100 + index * 100}ms`,
                    opacity: 0,
                  }}
                >
                  {link.name}
                </button>
              ))}
            </div>

            {/* Desktop Actions */}
            <div
              className="hidden lg:flex items-center gap-4"
              style={{
                animation: 'scale-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards',
                animationDelay: '500ms',
                opacity: 0,
              }}
            >
              <button
                onClick={() => window.location.href = '/login'}
                className={`font-medium text-sm transition-colors duration-300 ${
                  isScrolled
                    ? 'text-brand-body hover:text-brand-primary'
                    : 'text-brand-body hover:text-brand-primary'
                }`}
              >
                Sign In
              </button>
              <Link
                to="/get-started"
                className="bg-brand-primary hover:bg-brand-primary-dark text-white px-6 py-2 rounded-full font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-primary inline-flex items-center"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-brand-light-gray transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-brand-dark" />
              ) : (
                <Menu className="w-6 h-6 text-brand-dark" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-400 ${
          isMobileMenuOpen ? 'visible' : 'invisible'
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-400 ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Panel */}
        <div
          className={`absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transition-transform duration-400 ease-expo-out ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-6 pt-24">
            <div className="flex flex-col gap-4">
              {navLinks.map((link, index) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href, link.isExternal)}
                  className="text-left text-lg font-medium text-brand-dark hover:text-brand-primary transition-colors py-3 border-b border-brand-medium-gray"
                  style={{
                    animation: isMobileMenuOpen
                      ? `slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards`
                      : 'none',
                    animationDelay: `${index * 80}ms`,
                    opacity: isMobileMenuOpen ? 1 : 0,
                  }}
                >
                  {link.name}
                </button>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-4">
              <button className="w-full py-3 text-center font-medium text-brand-body hover:text-brand-primary transition-colors">
                Sign In
              </button>
              <Link
                to="/get-started"
                className="w-full bg-brand-primary hover:bg-brand-primary-dark text-white py-3 rounded-full font-medium text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
