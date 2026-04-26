import { useEffect, useRef, useState } from 'react';
import { Twitter, Linkedin, Facebook, Instagram, Youtube, Send, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const footerLinks = {
  product: {
    title: 'Product',
    href: '/get-started',
    links: [
      { name: 'Personal', href: '/get-started' },
      { name: 'Business', href: '/get-started' },
      { name: 'Developers', href: '/developers' },
      { name: 'Pricing', href: '/pricing' },
      { name: 'Security', href: '/security' },
    ],
  },
  company: {
    title: 'Company',
    href: '/about',
    links: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
      { name: 'Partners', href: '/partners' },
      { name: 'Contact', href: '/contact' },
    ],
  },
  resources: {
    title: 'Resources',
    href: '/blog',
    links: [
      { name: 'Blog', href: '/blog' },
      { name: 'Help Center', href: '/assistant' },
      { name: 'Community', href: '/blog' },
      { name: 'API Docs', href: '/developers' },
      { name: 'Status', href: '/status' },
    ],
  },
  legal: {
    title: 'Legal',
    href: '/legal',
    links: [
      { name: 'Privacy Policy', href: '/legal#privacy' },
      { name: 'Terms of Service', href: '/legal#terms' },
      { name: 'Cookie Policy', href: '/legal#cookies' },
      { name: 'Compliance', href: '/legal#compliance' },
    ],
  },
};

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const footerRef = useRef<HTMLElement>(null);

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

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    alert('Thank you for subscribing!');
    setEmail('');
  };

  return (
    <footer
      ref={footerRef}
      className="relative bg-brand-dark pt-10 lg:pt-14 pb-6"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-10 pb-8 border-b border-white/10">
          {/* Brand Column */}
          <div
            className="col-span-2 md:col-span-3 lg:col-span-2"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
            }}
          >
            {/* Logo */}
            <Link to="/" className="flex items-center mb-6">
              <img src="/logo.png" alt="RiversPay Logo" className="h-[76px] object-contain brightness-0 invert" />
            </Link>

            <p className="text-white/70 mb-6 max-w-[280px] leading-[1.5] text-[14px]">
              Simplifying payments for millions worldwide. Secure, fast, and
              reliable financial transactions.
            </p>

            {/* Newsletter */}
            <div>
              <p className="text-white font-bold mb-3 text-[15px]">Stay updated</p>
              <form onSubmit={handleSubmit} className="flex gap-3 max-w-[320px]">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#2D2D2D] border-transparent text-white placeholder:text-white/50 focus:border-[#2D2D2D] focus-visible:ring-1 focus-visible:ring-brand-primary h-10 rounded-[8px] text-sm"
                />
                <Button
                  type="submit"
                  className="bg-brand-primary hover:bg-brand-primary-light w-10 h-10 rounded-[8px] flex items-center justify-center shrink-0 px-0"
                >
                  <Send className="w-4 h-4 ml-[-2px] mt-[1px]" />
                </Button>
              </form>

              {/* Contact Info */}
              <div className="mt-8">
                <p className="text-white font-bold mb-3 text-[15px]">Contact Us</p>
                <ul className="text-white/80 space-y-3 text-[14px]">
                  <li className="flex items-center gap-3"><Mail className="w-4 h-4 text-brand-primary" strokeWidth={1.5} /> support@riverspay.com</li>
                  <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-brand-primary" strokeWidth={1.5} /> +234 (0) 800 123 4567</li>
                  <li className="flex items-center gap-3"><MapPin className="w-4 h-4 text-brand-primary" strokeWidth={1.5} /> River State Niger</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([key, section], sectionIndex) => (
            <div
              key={key}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.4s ease ${300 + sectionIndex * 100}ms`,
              }}
            >
              {section.href ? (
                <Link to={section.href} onClick={() => window.scrollTo(0, 0)} className="inline-block">
                  <h4 className="text-white font-bold mb-4 text-[15px] hover:text-white/80 transition-colors">{section.title}</h4>
                </Link>
              ) : (
                <h4 className="text-white font-bold mb-4 text-[15px]">{section.title}</h4>
              )}
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    {link.href.startsWith('http') ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/70 hover:text-white transition-all duration-200 hover:translate-x-1 inline-block text-[14px]"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-white/70 hover:text-white transition-all duration-200 hover:translate-x-1 inline-block text-[14px]"
                        onClick={() => {
                          if (!link.href.includes('#')) {
                            window.scrollTo(0, 0);
                          }
                        }}
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div
          className="pt-6 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.4s ease 0.8s',
          }}
        >
          {/* Copyright */}
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} RiversPay. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-brand-primary hover:text-white transition-all duration-300 hover:-translate-y-1"
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
