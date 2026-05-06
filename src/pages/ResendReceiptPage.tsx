import { useNavigate } from 'react-router-dom';
import { Landmark } from 'lucide-react';
import { useState } from 'react';

export default function ResendReceiptPage() {
  const navigate = useNavigate();
  const [resendOption, setResendOption] = useState<'self' | 'alternate'>('self');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Navbar with logo */}
      <header className="bg-white border-b border-slate-200 py-6 px-4">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate('/')}>
             <div className="bg-brand-primary/10 p-2 rounded-lg">
                <Landmark className="text-brand-primary w-6 h-6" />
             </div>
             <h1 className="text-xl font-bold text-slate-900 tracking-tight italic">Rivers<span className="text-brand-primary">Pay</span></h1>
          </div>
          <button onClick={() => navigate('/')} className="text-slate-500 hover:text-slate-800 font-medium transition-colors">
            Back to Home
          </button>
        </div>
      </header>

      <main className="flex-1 flex justify-center pt-20 px-4">
        <div className="w-full max-w-[1000px] space-y-6">
          <h1 className="text-3xl font-medium text-slate-800 mb-8">Re-Send A Receipt/Invoice</h1>
          
          <div className="bg-white border border-[#EDEDED] shadow-[0_4px_24px_rgba(0,0,0,0.02)] p-10 sm:p-14 space-y-8">
            <div className="space-y-3">
              <label className="text-[15px] font-medium text-slate-700">
                Reference Payment Number (RPN)
              </label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Enter RPN Number"
                  className="w-full border border-[#D1D1D1] rounded-[4px] px-6 py-4 outline-none text-slate-600 text-lg placeholder:text-slate-300 placeholder:font-light hover:border-slate-400 focus:border-brand-primary transition-all"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-10">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                    <input 
                      type="radio" 
                      name="resend-type" 
                      checked={resendOption === 'self'}
                      onChange={() => setResendOption('self')}
                      className="peer appearance-none w-5 h-5 border-2 border-slate-300 rounded-full checked:border-brand-primary transition-all cursor-pointer" 
                    />
                    <div className="absolute w-2.5 h-2.5 bg-brand-primary rounded-full opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                </div>
                <span className="text-[17px] text-slate-600 group-hover:text-slate-900 transition-colors">Re-send</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                    <input 
                      type="radio" 
                      name="resend-type" 
                      checked={resendOption === 'alternate'}
                      onChange={() => setResendOption('alternate')}
                      className="peer appearance-none w-5 h-5 border-2 border-slate-300 rounded-full checked:border-brand-primary transition-all cursor-pointer" 
                    />
                    <div className="absolute w-2.5 h-2.5 bg-brand-primary rounded-full opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                </div>
                <span className="text-[17px] text-slate-600 group-hover:text-slate-900 transition-colors">Re-send to alternate email</span>
              </label>
            </div>

            {resendOption === 'alternate' && (
              <div className="space-y-3 animate-slide-in">
                 <label className="text-[15px] font-medium text-slate-700">Alternate Email Address</label>
                 <input 
                    type="email" 
                    placeholder="example@email.com"
                    className="w-full border border-[#D1D1D1] rounded-[4px] px-6 py-4 outline-none text-slate-600 text-lg placeholder:text-slate-300 transition-all focus:border-brand-primary"
                 />
              </div>
            )}

            <div className="pt-4">
              <button 
                className="bg-brand-primary hover:bg-brand-primary-dark text-white font-bold py-5 px-12 rounded-[8px] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </main>
      
      <style>{`
        @keyframes slide-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-in {
          animation: slide-in 0.3s cubic_bezier(0,0,0.2,1) forwards;
        }
      `}</style>
    </div>
  );
}
