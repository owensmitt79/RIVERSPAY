import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, AlertTriangle, Monitor, Server, CreditCard, Activity } from 'lucide-react';

export default function StatusPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white font-sans pb-24">
      <div className="pt-20 pb-12 px-6 border-b border-slate-100">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-slate-500 hover:text-[#0070E0] transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> Home
          </button>
          <div className="text-slate-500 text-sm font-medium">Last updated: Just now</div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 mt-12">
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 flex items-center gap-4 mb-12">
          <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-emerald-200/50">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-emerald-800">All Systems Operational</h1>
            <p className="text-emerald-700">RiversPay services are running normally.</p>
          </div>
        </div>

        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <Activity className="w-5 h-5 text-slate-400" /> Current Status
        </h2>

        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          {[
            { icon: Monitor, name: 'Web Dashboard', status: 'Operational', color: 'text-emerald-500' },
            { icon: Server, name: 'Core Banking API', status: 'Operational', color: 'text-emerald-500' },
            { icon: CreditCard, name: 'Card Processing', status: 'Operational', color: 'text-emerald-500' },
            { icon: AlertTriangle, name: 'Bank Transfers (NIP)', status: 'Degraded Performance', color: 'text-amber-500', isWarning: true },
            { icon: CheckCircle2, name: 'Bill Payments', status: 'Operational', color: 'text-emerald-500' },
          ].map((sys, idx) => (
            <div key={idx} className={`p-5 flex items-center justify-between ${idx !== 4 ? 'border-b border-slate-100' : ''}`}>
              <div className="flex items-center gap-3">
                <sys.icon className="w-5 h-5 text-slate-400" />
                <span className="font-semibold text-slate-700">{sys.name}</span>
              </div>
              <div className={`font-bold text-sm ${sys.color}`}>
                {sys.status}
              </div>
            </div>
          ))}
        </div>
        
        {/* Warning Banner Example */}
        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-5">
          <h3 className="text-amber-800 font-bold mb-1">Inter-bank Transfer Delays</h3>
          <p className="text-amber-700 text-sm">We are experiencing delays with NIP (NIBSS Instant Payments) inter-bank transfers due to network congestion at the central switch. Transfers may take up to 2 hours to complete. We are monitoring the situation closely.</p>
        </div>
      </div>
    </div>
  );
}
