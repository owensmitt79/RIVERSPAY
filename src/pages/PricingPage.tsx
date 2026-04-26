import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

const tiers = [
  {
    name: 'Personal',
    price: 'Free',
    desc: 'For individuals managing daily payments.',
    features: ['Zero setup fees', 'Free wallet-to-wallet transfers', '₦50 flat fee on bills', 'Real-time notifications', 'Basic chat support'],
    cta: 'Get Started',
    color: 'border-blue-200 bg-white',
    buttonColor: 'bg-white text-[#0070E0] border border-[#0070E0] hover:bg-blue-50',
  },
  {
    name: 'Corporate MSME',
    price: '1.5%',
    period: 'per transaction',
    desc: 'For growing businesses accepting payments.',
    features: ['Everything in Personal', 'Free business bank account', 'API & Webhook access', 'Sub-accounts & user roles', 'Priority email support'],
    cta: 'Open Business Account',
    color: 'border-[#0070E0] bg-[#0A2540] text-white shadow-2xl scale-105',
    buttonColor: 'bg-[#0070E0] text-white border-0 hover:bg-blue-600',
    popular: true,
  },
  {
    name: 'Enterprise / Govt',
    price: 'Custom',
    desc: 'For large institutions and state agencies.',
    features: ['Everything in Corporate', 'Custom processing rates', 'Dedicated account manager', 'White-label solutions', 'Direct database integration', '24/7 priority phone support'],
    cta: 'Contact Sales',
    color: 'border-slate-200 bg-white',
    buttonColor: 'bg-slate-100 text-slate-800 border-0 hover:bg-slate-200',
  },
];

export default function PricingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-24">
      <div className="pt-24 pb-16 px-6 text-center max-w-4xl mx-auto relative">
        <button
          onClick={() => navigate('/')}
          className="absolute top-10 left-6 flex items-center gap-2 text-slate-500 hover:text-[#0070E0] transition-colors text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#0A2540] mb-6">Simple, transparent pricing</h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto">
          No hidden fees. No surprises. Pay only for what you use with rates that scale with your growth.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 items-center mt-8">
          {tiers.map((tier) => (
            <div key={tier.name} className={`rounded-3xl p-8 border ${tier.color} relative transition-transform`}>
              {tier.popular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#0070E0] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Most Popular
                </span>
              )}
              <h3 className={`text-xl font-bold mb-2 ${tier.popular ? 'text-white' : 'text-[#0A2540]'}`}>{tier.name}</h3>
              <p className={`text-sm mb-6 ${tier.popular ? 'text-blue-200' : 'text-slate-500'}`}>{tier.desc}</p>
              
              <div className="mb-6 flex items-baseline gap-2">
                <span className={`text-4xl font-extrabold ${tier.popular ? 'text-white' : 'text-[#0A2540]'}`}>{tier.price}</span>
                {tier.period && (
                  <span className={`text-sm ${tier.popular ? 'text-blue-200' : 'text-slate-500'}`}>{tier.period}</span>
                )}
              </div>

              <button 
                onClick={() => navigate(tier.name === 'Enterprise / Govt' ? '/contact' : '/get-started')}
                className={`w-full py-3 rounded-xl font-bold transition-colors mb-8 ${tier.buttonColor}`}
              >
                {tier.cta}
              </button>

              <div className="space-y-4">
                <p className={`text-xs font-bold uppercase tracking-wider ${tier.popular ? 'text-slate-400' : 'text-slate-400'}`}>What's included</p>
                <ul className="space-y-3">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className={`w-5 h-5 flex-shrink-0 ${tier.popular ? 'text-[#0070E0]' : 'text-emerald-500'}`} />
                      <span className={`text-sm font-medium ${tier.popular ? 'text-slate-300' : 'text-slate-700'}`}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
