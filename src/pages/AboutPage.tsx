import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  Shield,
  Zap,
  Globe,
  Users,
  TrendingUp,
  Award,
  CheckCircle,
  Building2,
  Heart,
  Target,
  Eye,
} from 'lucide-react';

// ── Animated counter hook ────────────────────────────────────────────────────
function useCounter(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

// ── Intersection observer hook ────────────────────────────────────────────────
function useVisible() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

// ── Stat item ──────────────────────────────────────────────────────────────
function StatItem({ value, suffix, label, start }: { value: number; suffix: string; label: string; start: boolean }) {
  const count = useCounter(value, 2000, start);
  return (
    <div className="text-center">
      <p className="text-4xl sm:text-5xl font-extrabold text-white mb-2">
        {count.toLocaleString()}{suffix}
      </p>
      <p className="text-blue-200 text-sm font-medium uppercase tracking-widest">{label}</p>
    </div>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────
const VALUES = [
  {
    icon: Shield,
    color: 'bg-blue-50 text-blue-600',
    title: 'Trust & Security',
    desc: 'We protect every transaction with bank-grade 256-bit encryption and real-time fraud detection, so your money is always safe.',
  },
  {
    icon: Zap,
    color: 'bg-amber-50 text-amber-600',
    title: 'Speed & Reliability',
    desc: 'Our platform maintains 99.99% uptime with instant payment processing, ensuring your business never misses a beat.',
  },
  {
    icon: Heart,
    color: 'bg-rose-50 text-rose-600',
    title: 'Customer First',
    desc: 'Every feature we build starts with you — our customers. We listen, iterate, and deliver solutions that truly matter.',
  },
  {
    icon: Globe,
    color: 'bg-emerald-50 text-emerald-600',
    title: 'Inclusive Finance',
    desc: 'We believe everyone deserves access to modern financial tools, from individuals to large government institutions.',
  },
];

const SERVICES = [
  { icon: Building2, label: 'Government Payments' },
  { icon: TrendingUp, label: 'TSA Collections' },
  { icon: Users, label: 'Payroll & Salaries' },
  { icon: CheckCircle, label: 'Bill Payments' },
  { icon: Zap, label: 'Instant Transfers' },
  { icon: Award, label: 'Merchant Services' },
];

const TEAM = [
  {
    name: 'Dr. Silas Onu',
    role: 'Chief Executive Officer',
    bio: 'A financial technology veteran with 20+ years experience driving digital transformation in public finance across Nigeria.',
    initials: 'SO',
    color: 'bg-blue-600',
  },
  {
    name: 'Engr. Amaka Obi',
    role: 'Chief Technology Officer',
    bio: 'Leads our engineering team with deep expertise in distributed payment systems, cloud infrastructure, and API design.',
    initials: 'AO',
    color: 'bg-indigo-600',
  },
  {
    name: 'Barr. Chidi Nwosu',
    role: 'Chief Compliance Officer',
    bio: 'Ensures RiversPay meets the highest regulatory standards set by the CBN, FIRS, and all relevant government bodies.',
    initials: 'CN',
    color: 'bg-emerald-600',
  },
  {
    name: 'Mrs. Ngozi Peters',
    role: 'Head of Customer Experience',
    bio: 'Champions service excellence, overseeing support operations and ensuring every customer interaction exceeds expectations.',
    initials: 'NP',
    color: 'bg-rose-600',
  },
];

const MILESTONES = [
  { year: '2018', title: 'Founded', desc: 'RiversPay was established as the official payment gateway for Rivers State Government.' },
  { year: '2019', title: 'TSA Integration', desc: 'Became the primary collector for the Rivers State Treasury Single Account.' },
  { year: '2021', title: '1 Million Users', desc: 'Crossed 1 million registered users on our platform, a milestone for Rivers State.' },
  { year: '2022', title: 'CBN License', desc: 'Received full CBN approval as a licensed Payment Solution Provider (PSP).' },
  { year: '2023', title: 'Developer API Launch', desc: 'Opened our API to third-party developers, enabling a growing fintech ecosystem.' },
  { year: '2024', title: '₦500B Processed', desc: 'Processed over ₦500 billion in transactions, solidifying our position as the #1 payment gateway in Rivers State.' },
];

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  const navigate = useNavigate();
  const statsSection = useVisible();
  const missionSection = useVisible();

  return (
    <div className="min-h-screen font-sans bg-white">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative bg-[#0A2540] overflow-hidden pt-32 pb-24 px-6">
        {/* Background blobs */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px]" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[80px]" />

        {/* Back button */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-8 left-6 sm:left-10 flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium transition-colors"
        >
          ← Back to Home
        </button>

        <div className="relative max-w-5xl mx-auto text-center">
          <span className="inline-block bg-blue-600/20 text-blue-300 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest mb-6">
            About RiversPay
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
            Simplifying Payments<br />
            <span className="text-[#4DA8FF]">Across Rivers State</span>
          </h1>
          <p className="text-blue-200 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
            RiversPay is the premier payment gateway powering government, business, and personal transactions
            across Rivers State, Nigeria. We make payments simple, secure, and instant for everyone.
          </p>
          <button
            onClick={() => navigate('/get-started')}
            className="mt-10 inline-flex items-center gap-2 bg-[#0070E0] hover:bg-blue-500 text-white px-8 py-4 rounded-full font-bold transition-all hover:scale-105 shadow-xl shadow-blue-900/30"
          >
            Get Started Today
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────────────────── */}
      <section
        ref={statsSection.ref}
        className="bg-gradient-to-r from-[#0070E0] to-[#0A2540] py-20 px-6"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
          <StatItem value={2} suffix="M+" label="Registered Users" start={statsSection.visible} />
          <StatItem value={500} suffix="B+" label="₦ Processed" start={statsSection.visible} />
          <StatItem value={1000} suffix="+" label="Corporate Clients" start={statsSection.visible} />
          <StatItem value={99} suffix=".9%" label="Uptime SLA" start={statsSection.visible} />
        </div>
      </section>

      {/* ── Mission & Vision ──────────────────────────────────────────────── */}
      <section
        ref={missionSection.ref}
        className="py-24 px-6 bg-white"
      >
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div
            style={{
              opacity: missionSection.visible ? 1 : 0,
              transform: missionSection.visible ? 'translateX(0)' : 'translateX(-40px)',
              transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            <span className="text-[#0070E0] font-bold text-sm uppercase tracking-widest">Who We Are</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A2540] mt-3 mb-6 leading-tight">
              Built on a Mission to Transform Public Finance
            </h2>
            <div className="space-y-5 text-slate-600 leading-relaxed">
              <p>
                RiversPay was established as the official payment infrastructure for the Rivers State Government,
                designed to modernize how citizens, businesses, and agencies transact with government services.
              </p>
              <p>
                We operate under the regulation of the Central Bank of Nigeria (CBN) as a licensed Payment Solution
                Provider, giving you the confidence that your money is always in safe hands.
              </p>
              <p>
                Today, RiversPay has grown into a full-service financial platform serving individuals, SMEs,
                large corporations, and all tiers of government — all from a single, unified platform.
              </p>
            </div>
          </div>

          {/* Cards */}
          <div
            className="grid grid-cols-2 gap-4"
            style={{
              opacity: missionSection.visible ? 1 : 0,
              transform: missionSection.visible ? 'translateX(0)' : 'translateX(40px)',
              transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s',
            }}
          >
            <div className="bg-[#0070E0] text-white p-6 rounded-3xl">
              <Target className="w-8 h-8 mb-4 opacity-80" />
              <h3 className="font-bold text-lg mb-2">Our Mission</h3>
              <p className="text-blue-100 text-sm leading-relaxed">
                To provide accessible, trusted, and innovative payment solutions that empower every citizen of Rivers State.
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-100 p-6 rounded-3xl mt-6">
              <Eye className="w-8 h-8 mb-4 text-[#0070E0]" />
              <h3 className="font-bold text-lg mb-2 text-[#0A2540]">Our Vision</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                To be the most trusted financial technology platform in Nigeria, enabling seamless digital transactions for all.
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-100 p-6 rounded-3xl">
              <CheckCircle className="w-8 h-8 mb-4 text-emerald-500" />
              <h3 className="font-bold text-lg mb-2 text-[#0A2540]">CBN Licensed</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Fully regulated and licensed by the Central Bank of Nigeria as an authorized PSP.
              </p>
            </div>
            <div className="bg-[#0A2540] text-white p-6 rounded-3xl mt-6">
              <Award className="w-8 h-8 mb-4 opacity-70" />
              <h3 className="font-bold text-lg mb-2">Award Winning</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Recognized as the Best Government Payment Platform in Nigeria 2023 & 2024.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Values ────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#0070E0] font-bold text-sm uppercase tracking-widest">What Drives Us</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A2540] mt-3">Our Core Values</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-14 h-14 ${v.color} rounded-2xl flex items-center justify-center mb-5`}>
                  <v.icon className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-[#0A2540] mb-3">{v.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services Overview ─────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#0070E0] font-bold text-sm uppercase tracking-widest">What We Offer</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A2540] mt-3">One Platform. Every Payment.</h2>
            <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
              From personal bill payments to large-scale government revenue collections, RiversPay handles it all reliably and securely.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {SERVICES.map((s) => (
              <div
                key={s.label}
                className="flex items-center gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50 transition-all group cursor-default"
              >
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:bg-[#0070E0] transition-colors">
                  <s.icon className="w-5 h-5 text-[#0070E0] group-hover:text-white transition-colors" />
                </div>
                <span className="font-semibold text-sm text-[#0A2540]">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline / Milestones ─────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#0A2540] overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-blue-400 font-bold text-sm uppercase tracking-widest">Our Journey</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3">RiversPay Milestones</h2>
          </div>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-800 hidden sm:block" />

            <div className="space-y-8">
              {MILESTONES.map((m, i) => (
                <div key={m.year} className="relative flex gap-6 sm:gap-10 items-start">
                  {/* Dot */}
                  <div className="flex-shrink-0 w-16 h-16 bg-[#0070E0] rounded-2xl flex items-center justify-center shadow-lg shadow-blue-900/50 z-10">
                    <span className="text-white font-extrabold text-sm">{m.year}</span>
                  </div>
                  <div
                    className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-5"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <h3 className="text-white font-bold mb-1">{m.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Leadership Team ───────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#0070E0] font-bold text-sm uppercase tracking-widest">Leadership</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A2540] mt-3">The Team Behind RiversPay</h2>
            <p className="text-slate-500 mt-4 max-w-xl mx-auto">
              Experienced professionals committed to transforming payments across Rivers State and beyond.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((t) => (
              <div
                key={t.name}
                className="bg-slate-50 rounded-3xl p-6 border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center"
              >
                <div className={`w-20 h-20 ${t.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <span className="text-white text-xl font-extrabold">{t.initials}</span>
                </div>
                <h3 className="font-bold text-[#0A2540] mb-1">{t.name}</h3>
                <p className="text-[#0070E0] text-xs font-semibold mb-3 uppercase tracking-wide">{t.role}</p>
                <p className="text-slate-500 text-xs leading-relaxed">{t.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-gradient-to-r from-[#0070E0] to-[#0A2540] text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Ready to Experience RiversPay?
          </h2>
          <p className="text-blue-200 text-lg mb-10">
            Join millions of users simplifying their financial life with Rivers State's trusted payment platform.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate('/get-started')}
              className="px-8 py-4 bg-white text-[#0070E0] rounded-full font-bold hover:bg-blue-50 transition-all hover:scale-105 shadow-xl"
            >
              Create Free Account
            </button>
            <button
              onClick={() => navigate('/login')}
              className="px-8 py-4 border-2 border-white/30 text-white rounded-full font-bold hover:bg-white/10 transition-all"
            >
              Sign In
            </button>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <div className="bg-[#0A2540] border-t border-white/5 py-8 px-6 text-center text-slate-500 text-sm">
        © 2026 RiversPay. All rights reserved. · Licensed by the Central Bank of Nigeria.
      </div>
    </div>
  );
}
