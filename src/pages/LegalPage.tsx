import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, FileText, Scale, ShieldCheck } from 'lucide-react';

const policies = [
  {
    id: 'privacy',
    icon: ShieldCheck,
    title: 'Privacy Policy',
    content: `At RiversPay, your privacy is our priority. We are committed to protecting your personal information and ensuring transparency in how we collect, use, and process your data. All data processing complies with the Nigeria Data Protection Regulation (NDPR) and other relevant global standards. We use your data strictly to facilitate payments, improve our services, and prevent fraud. We never sell your personal information to third parties.`,
  },
  {
    id: 'terms',
    icon: FileText,
    title: 'Terms of Service',
    content: `By using RiversPay, you agree to these Terms of Service. RiversPay provides payment gateway services, digital wallets, and bill payment infrastructure. Users must be at least 18 years old or registered businesses. You agree not to use our platform for any illegal activities, money laundering, or fraud. RiversPay reserves the right to suspend or terminate accounts that violate these terms or pose a security risk.`,
  },
  {
    id: 'cookies',
    icon: CheckCircle2,
    title: 'Cookie Policy',
    content: `RiversPay uses cookies to enhance your browsing experience, remember your preferences, and analyze site traffic. We use essential cookies required for the site's operation, such as keeping you logged in securely. We also use analytics cookies to understand how users interact with our platform. You can manage your cookie preferences through your browser settings, but disabling essential cookies may affect site functionality.`,
  },
  {
    id: 'compliance',
    icon: Scale,
    title: 'Compliance & Licenses',
    content: `RiversPay operates under the strict regulatory oversight of the Central Bank of Nigeria (CBN). We are a fully licensed Payment Solution Provider (PSP). Our anti-money laundering (AML) and know-your-customer (KYC) policies meet or exceed local and international financial regulations. We undergo regular independent security audits to maintain our PCI-DSS Level 1 certification.`,
  },
];

export default function LegalPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-24">
      {/* Header */}
      <div className="bg-[#0A2540] text-white pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto relative">
          <button
            onClick={() => navigate('/')}
            className="absolute -top-12 left-0 flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>
          <h1 className="text-4xl font-bold mb-4">Legal & Compliance</h1>
          <p className="text-blue-200 text-lg">
            Everything you need to know about how we manage your data, your rights, and our regulatory standing.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 -mt-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {policies.map((policy, idx) => {
            const Icon = policy.icon;
            return (
              <div 
                key={policy.id} 
                id={policy.id}
                className={`p-8 sm:p-10 ${idx !== policies.length - 1 ? 'border-b border-slate-100' : ''}`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-50 text-[#0070E0] rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800">{policy.title}</h2>
                </div>
                <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
                  <p>{policy.content}</p>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-12 text-center text-slate-500 text-sm">
          <p>Last updated: October 2025. If you have any questions, please contact our Legal team at legal@riverspay.ng</p>
        </div>
      </div>
    </div>
  );
}
