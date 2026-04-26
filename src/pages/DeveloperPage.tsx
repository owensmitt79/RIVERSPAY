import { useNavigate, Link } from 'react-router-dom';
import { 
  Code2, 
  Terminal, 
  Zap, 
  ChevronRight, 
  MessageSquare, 
  BarChart3,
  ShieldCheck,
  Building2,
  Lock,
  ArrowRight,
  Package,
  Landmark,
  Headphones
} from 'lucide-react';

export default function DeveloperPage() {
  const navigate = useNavigate();

  const services = [
    {
      title: "Accept Payments",
      description: "Receive payments in multiple currencies with our global checkout and recurring billing features.",
      icon: <Zap className="w-8 h-8 text-blue-600" />,
      color: "bg-blue-50"
    },
    {
      title: "Funds Transfer",
      description: "Send money to bank accounts and mobile wallets with real-time settlement and low fees.",
      icon: <Building2 className="w-8 h-8 text-indigo-600" />, // Changed from Globe
      color: "bg-indigo-50"
    },
    {
      title: "Biller Aggregation",
      description: "Access 1000+ billers for electricity, water, internet, and taxes through a single unified API.",
      icon: <BarChart3 className="w-8 h-8 text-cyan-600" />, // Changed from Cpu
      color: "bg-cyan-50"
    },
    {
      title: "Lending Support Services",
      description: "Expand your loan portfolio as well as your lendable ecosystem and ensure guaranteed repayments with near zero default rates.",
      icon: <Lock className="w-8 h-8 text-emerald-600" />, // Changed from Box
      iconType: 'Lending',
      color: "bg-emerald-50"
    },
    {
      title: "Reference Data Services",
      description: "Validate your customer's identity and associated information in an automated manner with our KYC/KYB tools.",
      icon: <ShieldCheck className="w-8 h-8 text-rose-600" />, // Changed from Shield
      iconType: 'Reference',
      color: "bg-rose-50"
    },
    {
      title: "Regulatory Payments",
      description: "Remit Tax and Pension payments to various Tax Authorities via a simple and reliable API call.",
      icon: <Building2 className="w-8 h-8 text-amber-600" />, // Changed from Landmark
      iconType: 'Regulatory',
      color: "bg-amber-50"
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-100 selection:text-brand-primary">
      {/* Navigation Header */}
      <header className="bg-[#0A2540] py-4 px-6 border-b border-white/10 sticky top-0 z-50 shadow-lg">
        <div className="max-w-[1240px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center cursor-pointer group" onClick={() => navigate('/')}>
              <img src="/logo.png" alt="RiversPay Logo" className="h-[76px] object-contain" />
            </div>
            
            <nav className="hidden md:flex items-center gap-8">
              <a href="#" className="text-white/80 hover:text-white font-medium text-sm transition-colors tracking-wide uppercase">API Documentation</a>
            </nav>
          </div>

          <div className="flex items-center gap-6">
            <button className="text-slate-400 font-medium hover:text-white transition-colors">API Reference</button>
            <button 
              onClick={() => window.location.href = '/login'}
              className="text-slate-400 font-medium hover:text-white transition-colors"
            >
              LOGIN
            </button>
            <Link
              to="/get-started"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-all transform hover:scale-105"
            >
              SIGN UP
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-20 md:pt-32 md:pb-32 bg-gradient-to-br from-white to-slate-50">
        <div className="max-w-[1240px] mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-slide-up">
            <h1 className="text-5xl md:text-7xl font-bold text-[#0A2540] leading-[1.1] tracking-tight">
              Build and Integrate your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0070E0] to-blue-400">payment products</span> <br />
              and solutions
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-lg font-light">
              Unleash the power of RiversPay with our robust APIs and developer-first tools. Seamlessly integrate payments into your applications with ease.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/get-started"
              className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center gap-2 group shadow-lg shadow-blue-500/25"
            >
              Get Started Now
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="px-8 py-4 bg-slate-800 text-white border border-slate-700 rounded-xl font-bold hover:bg-slate-700 transition-all flex items-center gap-2">
              View Documentation
              <Terminal className="w-5 h-5" />
            </button>
          </div>
          </div>
          
          <div className="relative animate-float">
            <div className="absolute -inset-4 bg-gradient-to-r from-[#0070E0]/10 to-blue-400/10 blur-3xl rounded-full" />
            <img 
              src="/images/developer-hero.png" 
              alt="Developers Working" 
              className="relative rounded-3xl shadow-2xl border border-white/50 w-full"
            />
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8">
          {services.map((feature, idx) => (
            <div 
              key={idx} 
              className="group p-10 rounded-[32px] border border-slate-100 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-50 transition-all duration-300 relative overflow-hidden cursor-pointer"
            >
              <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                {feature.iconType === 'Lending' ? <Package className="w-8 h-8 text-emerald-600" /> : 
                 feature.iconType === 'Reference' ? <ShieldCheck className="w-8 h-8 text-rose-600" /> :
                 feature.iconType === 'Regulatory' ? <Landmark className="w-8 h-8 text-amber-600" /> : 
                 feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed mb-8">
                {feature.description}
              </p>
              <button className="text-[#0070E0] font-bold flex items-center gap-2 group/btn">
                Learn More 
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Help Section */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-[1240px] mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-[#0A2540] mb-20 animate-fade-in">We're here to help</h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: "Developer Community",
                description: "Join our dev forums to discuss plugins and third party integration with other developers.",
                icon: <MessageSquare className="w-8 h-8 text-white" />,
                color: "bg-orange-500 shadow-orange-200"
              },
              {
                title: "Plugins",
                description: "Explore some sample plugins and extensions built by the RiversPay team for various platforms.",
                icon: <Code2 className="w-8 h-8 text-white" />,
                color: "bg-emerald-500 shadow-emerald-200"
              },
              {
                title: "Support",
                description: "For support related issues, please reach out to our dedicated developer success team.",
                icon: <Headphones className="w-8 h-8 text-white" />,
                color: "bg-amber-500 shadow-amber-200"
              }
            ].map((help, idx) => (
              <div key={idx} className="flex flex-col items-center group cursor-pointer">
                <div className={`w-20 h-20 ${help.color} rounded-[28px] flex items-center justify-center mb-8 shadow-2xl group-hover:scale-110 transition-transform duration-300`}>
                  {help.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-[#0070E0] transition-colors">{help.title}</h3>
                <p className="text-slate-600 leading-relaxed max-w-[280px]">
                  {help.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SDK Section */}
      <section className="py-24 bg-slate-900 overflow-hidden relative">
        <div className="max-w-[1240px] mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <div className="space-y-8 relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white">SDKs and Libraries</h2>
            <p className="text-slate-400 text-lg leading-relaxed max-w-md">
              Integrate RiversPay using our official SDKs for Python, PHP, Java, JavaScript, and more. 
              We provide everything you need to start building in minutes.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {['Python', 'PHP', 'Node.js', 'Java'].map((lang) => (
                <div key={lang} className="flex items-center gap-3 text-white/80 hover:text-white transition-colors cursor-pointer group">
                  <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-white/10 transition-colors">
                    <Code2 className="w-4 h-4" />
                  </div>
                  <span className="font-medium">{lang}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-[#1a1a1a] rounded-3xl p-8 border border-white/10 shadow-3xl relative">
            <div className="absolute top-4 left-4 flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
            <pre className="mt-6 text-sm md:text-base font-mono leading-relaxed text-blue-400">
              <code>{`// Initialize RiversPay Client
const riversPay = new RiversPay({
  publicKey: 'pk_test_123456...',
  secretKey: 'sk_test_789012...'
});

// Create a payment
const payment = await riversPay.charge({
  amount: 50000,
  currency: 'NGN',
  email: 'customer@email.com',
  callback: 'https://your-site.com/callback'
});`}</code>
            </pre>
          </div>
        </div>
        
        {/* Abstract shapes for tech background */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0070E0]/5 blur-[120px] rounded-full -mr-64 -mt-64" />
      </section>

      <style>{`
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-slide-up {
          animation: slide-up 0.8s cubic-bezier(0,0,0.2,1) forwards;
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
