import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Copy, Download, CreditCard, Printer } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function PaymentProfilePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [rpnNumber, setRpnNumber] = useState('');
  
  // Get data from navigation state or use defaults for demo
  const { 
    payerName = 'Guest Payer', 
    amount = '0', 
    service = 'General Payment', 
    institution = 'Rivers State Government',
    email = 'payer@example.com'
  } = location.state || {};

  useEffect(() => {
    // Generate a random RPN number: RPN-YYYYMMDDHHMMSS-RANDOM-CHECKSUM
    const now = new Date();
    const timestamp = now.toISOString().replace(/[-:T.Z]/g, '').slice(0, 14);
    const random = Math.random().toString(36).substring(2, 7).toUpperCase();
    const checksum = Math.random().toString(36).substring(2, 4).toUpperCase();
    setRpnNumber(`RPN-${timestamp}-${random}-${checksum}`);
    
    // Scroll to top
    window.scrollTo(0, 0);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(rpnNumber);
    alert('RPN Number copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 py-6 px-4 mb-8">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/logo.png" alt="RiversPay Logo" className="h-[76px] object-contain" />
          </div>
          <button onClick={() => navigate('/')} className="text-slate-500 hover:text-slate-800 font-medium transition-colors">
            Close
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex justify-center pb-20 px-4">
        <div className="w-full max-w-[800px] space-y-8">
          
          {/* Success Banner */}
          <div className="bg-emerald-50 border border-emerald-100 rounded-[24px] p-8 flex flex-col items-center text-center gap-4 shadow-sm">
            <div className="bg-emerald-500 rounded-full p-3 shadow-lg shadow-emerald-200">
              <CheckCircle2 className="text-white w-10 h-10" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Payment Profile Created!</h2>
              <p className="text-slate-600 mt-1">Your transaction has been initialized successfully. Use the RPN number below to complete your payment.</p>
            </div>
          </div>

          {/* RPN Number Card */}
          <div className="bg-white border border-slate-200 shadow-xl rounded-[24px] overflow-hidden">
            <div className="bg-brand-primary px-8 py-6 flex justify-between items-center bg-gradient-to-r from-brand-primary to-brand-primary-dark">
              <span className="text-white/80 font-medium tracking-wider uppercase text-sm">Reference Payment Number (RPN)</span>
              <div className="bg-white/20 px-3 py-1 rounded-full text-xs text-white font-bold backdrop-blur-sm">VALID FOR 24H</div>
            </div>
            
            <div className="p-8 sm:p-12 flex flex-col items-center gap-8">
              <div className="relative group">
                <div className="text-3xl sm:text-4xl font-mono font-bold text-slate-800 tracking-wider bg-slate-50 px-8 py-6 rounded-2xl border-2 border-dashed border-slate-200 transition-all group-hover:border-brand-primary/30">
                  {rpnNumber}
                </div>
                <button 
                  onClick={handleCopy}
                  className="absolute -right-4 -top-4 bg-white border border-slate-200 p-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-110 transition-all text-slate-500 hover:text-brand-primary group-hover:rotate-12"
                  title="Copy RPN Number"
                >
                  <Copy className="w-5 h-5" />
                </button>
              </div>

              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                <div className="space-y-1">
                  <span className="text-slate-400 text-sm font-medium uppercase tracking-tight">Payer Name</span>
                  <p className="text-slate-800 font-bold text-lg border-b border-slate-100 pb-2">{payerName}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-slate-400 text-sm font-medium uppercase tracking-tight">Beneficiary/Institution</span>
                  <p className="text-slate-800 font-bold text-lg border-b border-slate-100 pb-2">{institution}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-slate-400 text-sm font-medium uppercase tracking-tight">Service / Purpose</span>
                  <p className="text-slate-800 font-bold text-lg border-b border-slate-100 pb-2">{service}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-slate-400 text-sm font-medium uppercase tracking-tight">Payer Email</span>
                  <p className="text-slate-800 font-bold text-lg border-b border-slate-100 pb-2">{email}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-slate-400 text-sm font-medium uppercase tracking-tight">Amount To Pay</span>
                  <p className="text-brand-primary font-bold text-2xl border-b border-slate-100 pb-2 italic">₦{Number(amount).toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border-t border-slate-200 p-8 flex flex-col sm:flex-row gap-4">
              <button 
                className="flex-1 bg-brand-primary hover:bg-brand-primary-dark text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 text-lg"
              >
                <CreditCard className="w-6 h-6" />
                Pay Now
              </button>
              <div className="flex gap-4">
                <button 
                  title="Download Invoice"
                  className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-all text-slate-600 hover:text-brand-primary"
                >
                  <Download className="w-6 h-6" />
                </button>
                <button 
                  title="Print"
                  className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-all text-slate-600 hover:text-slate-900"
                >
                  <Printer className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>

          <button 
            onClick={() => navigate('/')}
            className="w-full py-4 text-slate-500 hover:text-slate-800 font-medium flex items-center justify-center gap-2 transition-colors border border-dashed border-slate-300 rounded-xl hover:bg-white/50"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>
        </div>
      </main>
    </div>
  );
}
