import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ChevronDown,
  Menu,
  X,
  CreditCard,
  Users,
  BarChart3,
  Send,
  LayoutDashboard,
  Shield,
  Zap,
  FileText,
  ArrowRight,
  CheckCircle,
  Phone,
  Globe,
  Lock,
} from 'lucide-react';

// ── Nav dropdown data ─────────────────────────────────────────────────────────
const businessNav = [
  { label: 'Accept Payments', href: '#accept-payments', icon: CreditCard },
  { label: 'Pay Salaries & Statutory Payments', href: '#pay-salaries', icon: Users },
  { label: 'Track your Inflow across your business', href: '#track-inflow', icon: BarChart3 },
  { label: 'Make Payments', href: '#make-payments', icon: Send },
  { label: 'View all your account balances', href: '#accounts', icon: LayoutDashboard },
];

const personalNav = [
  { label: 'View Balance across Multiple Banks', href: '#' },
  { label: 'Pay Bills with Ease', href: '#' },
  { label: 'Track your Income and Expenses', href: '#' },
  { label: 'Transfer Money Conveniently', href: '#' },
  { label: 'Request Money in Style', href: '#' },
  { label: 'Download the Mobile App', href: '#' },
];



// ── Biller logos (text-based grid for Nigerian billers) ───────────────────────
const billers = [
  { name: 'WAEC', color: '#1a5276', abbr: 'WAEC' },
  { name: 'JAMB', color: '#922b21', abbr: 'JAMB' },
  { name: 'AEDC', color: '#1a9e87', abbr: 'AEDC' },
  { name: 'EEDC', color: '#e74c3c', abbr: 'EEDC' },
  { name: 'IBEDC', color: '#f39c12', abbr: 'IBEDC' },
  { name: 'PHCN', color: '#27ae60', abbr: 'PHCN' },
  { name: 'JOS Electric', color: '#2980b9', abbr: 'JOS' },
  { name: 'DStv', color: '#00529b', abbr: 'DStv' },
  { name: 'GOtv', color: '#007cc2', abbr: 'GOtv' },
  { name: 'StarTimes', color: '#c0392b', abbr: 'Star' },
  { name: 'Rivers State IGR', color: '#0070E0', abbr: 'RSG' },
  { name: 'Swift 4G', color: '#6c3483', abbr: '4G' },
];

// ── Stats ─────────────────────────────────────────────────────────────────────
const stats = [
  { value: '₦500B+', label: 'Transactions Processed' },
  { value: '2M+', label: 'Business Users' },
  { value: '1,000+', label: 'Billers Connected' },
  { value: '99.9%', label: 'Uptime SLA' },
];

// ── Mock UI components ────────────────────────────────────────────────────────
function AccountsMockup() {
  return (
    <div className="bg-white rounded-2xl shadow-2xl p-5 w-full max-w-sm mx-auto border border-slate-100">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Account Balance</span>
        <div className="w-6 h-6 rounded-full border-2 border-[#0070E0] border-t-transparent animate-spin opacity-60" />
      </div>
      <p className="text-xs text-slate-400 mb-1">TOTAL AVAILABLE BALANCE</p>
      <p className="text-3xl font-extrabold text-[#0070E0] mb-4">₦312,000.23</p>
      {[
        { bank: 'First Bank', acct: '***7890', bal: '₦120,000' },
        { bank: 'GTBank', acct: '***4523', bal: '₦88,500' },
        { bank: 'Access Bank', acct: '***1209', bal: '₦103,500.23' },
      ].map((a) => (
        <div key={a.bank} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
          <div>
            <p className="text-sm font-semibold text-slate-800">{a.bank}</p>
            <p className="text-xs text-slate-400">{a.acct}</p>
          </div>
          <span className="text-sm font-bold text-slate-700">{a.bal}</span>
        </div>
      ))}
    </div>
  );
}

function PaymentMockup() {
  return (
    <div className="bg-white rounded-2xl shadow-2xl p-5 w-full max-w-sm mx-auto border border-slate-100">
      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Select a Payment Option</p>
      {['Card', 'Account', 'Bank Branch', 'e-Payment'].map((opt, i) => (
        <div key={opt} className={`flex items-center gap-3 py-3 border-b border-slate-100 last:border-0 ${i === 3 ? 'bg-[#0070E0]/5 rounded-lg px-2' : ''}`}>
          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${i === 3 ? 'border-[#0070E0]' : 'border-slate-300'}`}>
            {i === 3 && <div className="w-2 h-2 rounded-full bg-[#0070E0]" />}
          </div>
          <span className={`text-sm font-medium ${i === 3 ? 'text-[#0070E0] font-bold' : 'text-slate-600'}`}>{opt}</span>
        </div>
      ))}
      <button className="mt-4 w-full bg-[#0070E0] text-white py-3 rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors">
        Proceed to Pay
      </button>
    </div>
  );
}

function SalaryMockup() {
  return (
    <div className="bg-white rounded-2xl shadow-2xl p-5 w-full max-w-sm mx-auto border border-slate-100">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Bulk Salary Upload</span>
        <CheckCircle className="w-5 h-5 text-emerald-500" />
      </div>
      {[
        { name: 'Adaeze Okonkwo', dept: 'Engineering', amount: '₦250,000', status: 'Paid' },
        { name: 'Chidi Nwosu', dept: 'Operations', amount: '₦180,000', status: 'Paid' },
        { name: 'Bola Adeyemi', dept: 'Finance', amount: '₦320,000', status: 'Processing' },
        { name: 'Emeka Obi', dept: 'HR', amount: '₦200,000', status: 'Pending' },
      ].map((e) => (
        <div key={e.name} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
          <div>
            <p className="text-xs font-semibold text-slate-800">{e.name}</p>
            <p className="text-[10px] text-slate-400">{e.dept}</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold text-slate-700">{e.amount}</p>
            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
              e.status === 'Paid' ? 'bg-emerald-100 text-emerald-700'
              : e.status === 'Processing' ? 'bg-blue-100 text-blue-700'
              : 'bg-amber-100 text-amber-700'
            }`}>{e.status}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function BillsMockup() {
  return (
    <div className="bg-white rounded-2xl shadow-2xl p-5 w-full max-w-sm mx-auto border border-slate-100">
      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Recent Payments</p>
      {[
        { biller: 'EEDC Electricity', ref: 'TXN-8821', amount: '₦15,000', icon: '⚡' },
        { biller: 'Rivers State IGR', ref: 'TXN-8820', amount: '₦50,000', icon: '🏛️' },
        { biller: 'DStv Subscription', ref: 'TXN-8819', amount: '₦24,500', icon: '📺' },
        { biller: 'JAMB Fees', ref: 'TXN-8818', amount: '₦3,500', icon: '📚' },
      ].map((p) => (
        <div key={p.ref} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
          <div className="flex items-center gap-2">
            <span className="text-lg">{p.icon}</span>
            <div>
              <p className="text-xs font-semibold text-slate-800">{p.biller}</p>
              <p className="text-[10px] text-slate-400">{p.ref}</p>
            </div>
          </div>
          <span className="text-xs font-bold text-slate-700">{p.amount}</span>
        </div>
      ))}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function BusinessPage() {
  const navigate = useNavigate();
  const [businessDropOpen, setBusinessDropOpen] = useState(false);
  const [personalDropOpen, setPersonalDropOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileBusinessOpen, setMobileBusinessOpen] = useState(false);
  const [mobilePersonalOpen, setMobilePersonalOpen] = useState(false);
  const businessRef = useRef<HTMLDivElement>(null);
  const personalRef = useRef<HTMLDivElement>(null);

  // close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (businessRef.current && !businessRef.current.contains(e.target as Node)) setBusinessDropOpen(false);
      if (personalRef.current && !personalRef.current.contains(e.target as Node)) setPersonalDropOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setBusinessDropOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ── Navbar ──────────────────────────────────────────────────────────── */}
      <nav className="bg-white border-b border-slate-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[88px]">

            {/* Logo */}
            <a href="/" className="flex items-center hover:opacity-90 transition-opacity">
              <img src="/logo.png" alt="RiversPay" className="h-[76px] object-contain" />
            </a>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">

              {/* Personal dropdown */}
              <div ref={personalRef} className="relative">
                <button
                  className="flex items-center gap-1 text-slate-700 hover:text-[#0070E0] font-medium text-sm transition-colors"
                  onClick={() => { setPersonalDropOpen(p => !p); setBusinessDropOpen(false); }}
                >
                  Personal <ChevronDown className={`w-4 h-4 transition-transform ${personalDropOpen ? 'rotate-180' : ''}`} />
                </button>
                {personalDropOpen && (
                  <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-slate-100 rounded-2xl shadow-2xl py-3 z-50">
                    {personalNav.map((item) => (
                      <a key={item.label} href={item.href} className="block px-5 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-[#0070E0] transition-colors">
                        {item.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Business dropdown */}
              <div ref={businessRef} className="relative">
                <button
                  className="flex items-center gap-1 text-[#0070E0] font-semibold text-sm border-b-2 border-[#0070E0] pb-0.5"
                  onClick={() => { setBusinessDropOpen(p => !p); setPersonalDropOpen(false); }}
                >
                  Business <ChevronDown className={`w-4 h-4 transition-transform ${businessDropOpen ? 'rotate-180' : ''}`} />
                </button>
                {businessDropOpen && (
                  <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-slate-100 rounded-2xl shadow-2xl py-3 z-50">
                    {businessNav.map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.label}
                          onClick={() => scrollTo(item.href)}
                          className="flex items-center gap-3 w-full px-5 py-3 text-sm text-slate-700 hover:bg-blue-50 hover:text-[#0070E0] transition-colors text-left"
                        >
                          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                            <Icon className="w-4 h-4 text-[#0070E0]" />
                          </div>
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              <a href="/developers" className="text-slate-700 hover:text-[#0070E0] font-medium text-sm transition-colors">Developers</a>
              <a href="/about" className="text-slate-700 hover:text-[#0070E0] font-medium text-sm transition-colors">About Us</a>
            </div>

            {/* Desktop actions */}
            <div className="hidden lg:flex items-center gap-3">
              <button onClick={() => navigate('/login')} className="flex items-center gap-2 px-5 py-2 rounded-full border border-slate-200 text-slate-700 hover:border-[#0070E0] hover:text-[#0070E0] text-sm font-medium transition-all">
                <Lock className="w-3.5 h-3.5" /> Login
              </button>
              <Link to="/get-started" className="flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#0070E0] text-white text-sm font-bold hover:bg-blue-700 transition-all">
                + Sign Up
              </Link>
            </div>

            {/* Mobile menu button */}
            <button onClick={() => setMobileMenuOpen(m => !m)} className="lg:hidden p-2 rounded-lg text-slate-700">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-100 bg-white px-4 py-4 space-y-1">
            {/* Personal */}
            <button onClick={() => setMobilePersonalOpen(p => !p)} className="flex items-center justify-between w-full py-3 text-slate-700 font-medium">
              Personal <ChevronDown className={`w-4 h-4 transition-transform ${mobilePersonalOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobilePersonalOpen && (
              <div className="pl-4 space-y-1 border-l-2 border-slate-100">
                {personalNav.map(i => <a key={i.label} href={i.href} className="block py-2 text-sm text-slate-600 hover:text-[#0070E0]">{i.label}</a>)}
              </div>
            )}
            {/* Business */}
            <button onClick={() => setMobileBusinessOpen(b => !b)} className="flex items-center justify-between w-full py-3 text-[#0070E0] font-semibold">
              Business <ChevronDown className={`w-4 h-4 transition-transform ${mobileBusinessOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileBusinessOpen && (
              <div className="pl-4 space-y-1 border-l-2 border-[#0070E0]/20">
                {businessNav.map(i => (
                  <button key={i.label} onClick={() => scrollTo(i.href)} className="block w-full text-left py-2 text-sm text-slate-600 hover:text-[#0070E0]">{i.label}</button>
                ))}
              </div>
            )}
            <a href="/developers" className="block py-3 text-slate-700 font-medium border-t border-slate-100">Developers</a>
            <a href="/about" className="block py-3 text-slate-700 font-medium border-t border-slate-100">About Us</a>
            <div className="flex gap-3 pt-4">
              <button onClick={() => navigate('/login')} className="flex-1 py-2.5 rounded-full border border-slate-200 text-slate-700 text-sm font-medium">Login</button>
              <Link to="/get-started" className="flex-1 py-2.5 rounded-full bg-[#0070E0] text-white text-sm font-bold text-center">Sign Up</Link>
            </div>
          </div>
        )}
      </nav>

      {/* ── Hero Section ────────────────────────────────────────────────────── */}
      <section className="relative bg-[#0A2540] overflow-hidden py-20 lg:py-28">
        {/* Background blobs */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[80px]" />

        <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block bg-[#0070E0]/20 text-[#4DA8FF] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-6">
              RIVERSPAY FOR BUSINESS
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              All your Accounts<br />
              <span className="text-[#4DA8FF]">in One Place</span>
            </h1>
            <p className="text-blue-200 text-lg leading-relaxed mb-10 max-w-lg">
              Move funds from one account to another without multiple credentials. The complete payment infrastructure for businesses in Rivers State.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/get-started" className="inline-flex items-center gap-2 bg-[#0070E0] hover:bg-blue-500 text-white px-8 py-4 rounded-full font-bold transition-all hover:scale-105 shadow-xl shadow-blue-900/30">
                Sign Up to Start Receiving Payment <ArrowRight className="w-5 h-5" />
              </Link>
              <button onClick={() => scrollTo('#accept-payments')} className="inline-flex items-center gap-2 border border-white/30 text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-all">
                Learn More
              </button>
            </div>
          </div>

          {/* Hero Mockup */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#0070E0]/20 to-blue-400/20 blur-3xl rounded-full" />
            <div className="relative">
              <AccountsMockup />
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ───────────────────────────────────────────────────────── */}
      <section className="bg-[#0070E0] py-8">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map(s => (
              <div key={s.label} className="text-center">
                <p className="text-3xl lg:text-4xl font-extrabold text-white">{s.value}</p>
                <p className="text-blue-200 text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Feature: Accept Payments ─────────────────────────────────────────── */}
      <section id="accept-payments" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#f0f4f8]">
        <div className="max-w-[1280px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
          {/* Mockup left */}
          <div className="order-2 lg:order-1">
            <PaymentMockup />
          </div>
          {/* Text right */}
          <div className="order-1 lg:order-2">
            <span className="text-xs font-bold text-[#0070E0] uppercase tracking-widest">ACCEPT PAYMENTS</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A2540] mt-3 mb-6 leading-tight">
              Generate greater income.<br />Receive more money conveniently
            </h2>
            <p className="text-slate-600 leading-relaxed mb-8">
              Empower your customers to pay you easily as you grow. Accept payments from cards, bank accounts, mobile wallets, and USSD — all through one simple integration that works 24/7.
            </p>
            <ul className="space-y-3 mb-10">
              {['Card & Bank Transfer payments', 'USSD & Mobile wallet support', 'Real-time transaction notifications', 'Automatic reconciliation'].map(f => (
                <li key={f} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#0070E0] flex-shrink-0" />
                  <span className="text-slate-700 text-sm">{f}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              <Link to="/get-started" className="inline-flex items-center gap-2 bg-[#0070E0] text-white px-6 py-3 rounded-full font-bold hover:bg-blue-700 transition-all">
                Sign Up to Start Receiving Payment <ArrowRight className="w-4 h-4" />
              </Link>
              <button className="inline-flex items-center gap-2 border border-slate-300 text-slate-700 px-6 py-3 rounded-full font-semibold hover:border-[#0070E0] hover:text-[#0070E0] transition-all">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Feature: All Accounts ────────────────────────────────────────────── */}
      <section id="accounts" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-[1280px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
          {/* Text left */}
          <div>
            <span className="text-xs font-bold text-[#0070E0] uppercase tracking-widest">VIEW ALL ACCOUNT BALANCES</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A2540] mt-3 mb-6 leading-tight">
              All your Accounts<br />in One Place
            </h2>
            <p className="text-slate-600 leading-relaxed mb-8">
              Move funds from one account to another without multiple credentials. Get a unified view of your balances across all your linked banks and instantly initiate inter-account transfers.
            </p>
            <ul className="space-y-3 mb-10">
              {['Multi-bank account aggregation', 'Instant inter-account transfers', 'Single credential access', 'Real-time balance updates'].map(f => (
                <li key={f} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#0070E0] flex-shrink-0" />
                  <span className="text-slate-700 text-sm">{f}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              <Link to="/get-started" className="inline-flex items-center gap-2 bg-[#0070E0] text-white px-6 py-3 rounded-full font-bold hover:bg-blue-700 transition-all">
                Sign Up to Start Receiving Payment <ArrowRight className="w-4 h-4" />
              </Link>
              <button className="inline-flex items-center gap-2 border border-slate-300 text-slate-700 px-6 py-3 rounded-full font-semibold hover:border-[#0070E0] hover:text-[#0070E0] transition-all">
                Learn More
              </button>
            </div>
          </div>
          {/* Mockup right */}
          <div>
            <AccountsMockup />
          </div>
        </div>
      </section>

      {/* ── Feature: Pay Salaries ────────────────────────────────────────────── */}
      <section id="pay-salaries" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#f0f4f8]">
        <div className="max-w-[1280px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
          {/* Mockup left */}
          <div className="order-2 lg:order-1">
            <SalaryMockup />
          </div>
          {/* Text right */}
          <div className="order-1 lg:order-2">
            <span className="text-xs font-bold text-[#0070E0] uppercase tracking-widest">PAY SALARIES & STATUTORY PAYMENTS</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A2540] mt-3 mb-6 leading-tight">
              Achieve much more.<br />Reach a wider market
            </h2>
            <p className="text-slate-600 leading-relaxed mb-8">
              Process bulk salary payments in seconds. Remit PAYE, Pension contributions and NHF to the appropriate authorities — all from one dashboard with full audit trails.
            </p>
            <ul className="space-y-3 mb-10">
              {['Bulk salary disbursement', 'PAYE & Pension remittance', 'NHF contributions', 'Full audit trail & reports'].map(f => (
                <li key={f} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#0070E0] flex-shrink-0" />
                  <span className="text-slate-700 text-sm">{f}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              <Link to="/salary-payment" className="inline-flex items-center gap-2 bg-[#0070E0] text-white px-6 py-3 rounded-full font-bold hover:bg-blue-700 transition-all">
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
              <button className="inline-flex items-center gap-2 border border-slate-300 text-slate-700 px-6 py-3 rounded-full font-semibold hover:border-[#0070E0] hover:text-[#0070E0] transition-all">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Feature: Track Inflow ────────────────────────────────────────────── */}
      <section id="track-inflow" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-[1280px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-xs font-bold text-[#0070E0] uppercase tracking-widest">TRACK YOUR INFLOW</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A2540] mt-3 mb-6 leading-tight">
              Monitor every naira<br />flowing into your business
            </h2>
            <p className="text-slate-600 leading-relaxed mb-8">
              Get granular, real-time visibility into all money flowing into your business. Create custom reports, set alerts for large transactions, and reconcile automatically across multiple revenue streams.
            </p>
            <ul className="space-y-3 mb-10">
              {['Real-time inflow dashboard', 'Custom transaction reports', 'Automated reconciliation', 'Multi-currency tracking', 'Transaction alerts & notifications'].map(f => (
                <li key={f} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#0070E0] flex-shrink-0" />
                  <span className="text-slate-700 text-sm">{f}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              <Link to="/get-started" className="inline-flex items-center gap-2 bg-[#0070E0] text-white px-6 py-3 rounded-full font-bold hover:bg-blue-700 transition-all">
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          {/* Analytics mockup */}
          <div className="bg-white rounded-2xl shadow-2xl p-5 border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Inflow Overview</span>
              <span className="text-xs text-slate-400">March 2026</span>
            </div>
            <p className="text-2xl font-extrabold text-[#0070E0] mb-6">₦4,820,000 <span className="text-emerald-500 text-sm font-medium">↑ 23%</span></p>
            <div className="space-y-3">
              {[
                { label: 'Collections', amount: '₦2,100,000', pct: 75 },
                { label: 'Transfers In', amount: '₦1,520,000', pct: 55 },
                { label: 'Payments Received', amount: '₦1,200,000', pct: 43 },
              ].map(r => (
                <div key={r.label}>
                  <div className="flex justify-between text-xs text-slate-600 mb-1">
                    <span>{r.label}</span><span className="font-semibold">{r.amount}</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#0070E0] rounded-full" style={{ width: `${r.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Feature: Make Payments / Billers ─────────────────────────────────── */}
      <section id="make-payments" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#f0f4f8]">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start mb-14">
            <div>
              <span className="text-xs font-bold text-[#0070E0] uppercase tracking-widest">MAKE PAYMENTS</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A2540] mt-3 mb-6 leading-tight">
                Pay bills and send money<br />without stress
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Securely make payments to suppliers, vendors, staff and other billers into their accounts in any bank or mobile wallets, around-the-clock, including after official work hours, weekends and public holidays.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:pt-16">
              <Link to="/get-started" className="inline-flex items-center gap-2 bg-[#0070E0] text-white px-6 py-3 rounded-full font-bold hover:bg-blue-700 transition-all">
                Sign up as a Biller <ArrowRight className="w-4 h-4" />
              </Link>
              <button className="inline-flex items-center gap-2 border border-slate-300 text-slate-700 px-6 py-3 rounded-full font-semibold hover:border-[#0070E0] hover:text-[#0070E0] transition-all">
                Pay other billers <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Biller Grid with Bills Mockup */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <BillsMockup />
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
              {billers.map(b => (
                <div
                  key={b.name}
                  className="bg-white rounded-2xl p-4 flex flex-col items-center justify-center aspect-square shadow-sm border border-slate-100 hover:border-[#0070E0]/40 hover:shadow-md transition-all cursor-pointer group"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-2 font-extrabold text-white text-xs"
                    style={{ backgroundColor: b.color }}
                  >
                    {b.abbr}
                  </div>
                  <span className="text-[10px] text-slate-500 text-center leading-tight group-hover:text-slate-800 transition-colors">{b.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Why RiversPay ───────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0A2540]">
        <div className="max-w-[1280px] mx-auto text-center mb-16">
          <span className="text-[#4DA8FF] font-bold text-sm uppercase tracking-widest">WHY RIVERSPAY</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3">Built for Nigerian Businesses</h2>
          <p className="text-blue-200 mt-4 max-w-2xl mx-auto">
            Trusted by businesses across Rivers State for secure, fast, and reliable payment infrastructure.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1280px] mx-auto">
          {[
            { icon: Shield, title: 'CBN Licensed & Regulated', desc: 'Fully licensed Payment Solution Provider operating under the strict oversight of the Central Bank of Nigeria.' },
            { icon: Zap, title: 'Instant Settlement', desc: 'Receive payments and settle funds in real-time — no waiting, no delays, 24 hours a day, 7 days a week.' },
            { icon: Globe, title: '1,000+ Billers', desc: 'Access the largest biller network in Rivers State including utilities, education, government agencies and more.' },
            { icon: Lock, title: 'Bank-Grade Security', desc: '256-bit SSL encryption, two-factor authentication, and real-time fraud detection powered by AI.' },
            { icon: FileText, title: 'Smart Reports', desc: 'Comprehensive financial reporting, tax reports, and reconciliation tools built directly into your dashboard.' },
            { icon: Phone, title: '24/7 Support', desc: 'Dedicated business support team available around the clock via phone, email, and live chat.' },
          ].map(c => {
            const Icon = c.icon;
            return (
              <div key={c.title} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
                <div className="w-12 h-12 bg-[#0070E0]/20 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-[#4DA8FF]" />
                </div>
                <h3 className="text-white font-bold mb-2">{c.title}</h3>
                <p className="text-blue-200/80 text-sm leading-relaxed">{c.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#0070E0] to-[#0A2540] text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Ready to grow your business with RiversPay?
          </h2>
          <p className="text-blue-200 text-lg mb-10">
            Join thousands of businesses in Rivers State using RiversPay to accept payments, pay salaries and manage finances seamlessly.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/get-started" className="px-8 py-4 bg-white text-[#0070E0] rounded-full font-bold hover:bg-blue-50 transition-all hover:scale-105 shadow-xl">
              Create Free Business Account
            </Link>
            <a href="/developers" className="px-8 py-4 border-2 border-white/30 text-white rounded-full font-bold hover:bg-white/10 transition-all">
              Explore Developer API
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
