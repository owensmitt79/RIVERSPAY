import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, ShieldCheck, Lock, Eye, Server } from 'lucide-react';

export default function SecurityPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-24">
      {/* Hero */}
      <div className="bg-[#0A2540] text-white pt-24 pb-20 px-6 text-center border-b-[8px] border-[#0070E0]">
        <div className="max-w-3xl mx-auto relative">
          <button
            onClick={() => navigate('/')}
            className="absolute -top-10 left-0 flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>
          <ShieldCheck className="w-16 h-16 text-[#0070E0] mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Security at RiversPay</h1>
          <p className="text-xl text-blue-200 font-light">
            Bank-grade security, end-to-end encryption, and real-time fraud monitoring to keep your money and data safe.
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-6xl mx-auto px-6 -mt-10">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100">
            <Lock className="w-10 h-10 text-emerald-500 mb-6" />
            <h3 className="text-xl font-bold text-slate-800 mb-3">256-bit Encryption</h3>
            <p className="text-slate-600 leading-relaxed">
              All data transmitted between your device and our servers is protected with industry-standard TLS encryption. Your sensitive information is never exposed.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100">
            <Server className="w-10 h-10 text-blue-500 mb-6" />
            <h3 className="text-xl font-bold text-slate-800 mb-3">PCI-DSS Compliant</h3>
            <p className="text-slate-600 leading-relaxed">
              We are a PCI-DSS Level 1 certified payment processor. We exceed the highest global standards for storing and processing cardholder data.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100">
            <Eye className="w-10 h-10 text-amber-500 mb-6" />
            <h3 className="text-xl font-bold text-slate-800 mb-3">24/7 Fraud Monitoring</h3>
            <p className="text-slate-600 leading-relaxed">
              Our AI-powered risk engine analyzes every transaction in real-time to detect and block suspicious activity before it happens.
            </p>
          </div>
        </div>

        {/* User Protection */}
        <div className="mt-20 bg-white rounded-3xl p-10 md:p-14 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-[#0A2540] mb-6">How we protect your account</h2>
            <ul className="space-y-4">
              {[
                'Two-Factor Authentication (2FA) for all sign-ins',
                'Biometric login support (Face ID / Fingerprint)',
                'Automatic session timeouts after inactivity',
                'Instant alerts for logins from new devices',
                'Secure PIN verification for every transaction',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-slate-700 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 bg-slate-50 p-8 rounded-2xl border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Report a Security Issue</h3>
            <p className="text-slate-600 text-sm mb-6">
              If you believe you've discovered a vulnerability or suspect fraudulent activity on your account, please contact our security team immediately.
            </p>
            <button className="w-full py-3 bg-rose-50 text-rose-600 border border-rose-200 font-bold rounded-xl hover:bg-rose-100 transition-colors">
              Report Fraud
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
