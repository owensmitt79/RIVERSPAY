import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, LayoutTemplate } from 'lucide-react';

export default function GenericContentPage({ 
  title, 
  subtitle 
}: { 
  title: string; 
  subtitle: string; 
}) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-24">
      <div className="bg-[#0A2540] text-white pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto relative">
          <button
            onClick={() => navigate('/')}
            className="absolute -top-12 left-0 flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{title}</h1>
          <p className="text-blue-200 text-lg">{subtitle}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 -mt-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-10 text-center">
          <LayoutTemplate className="w-16 h-16 text-slate-200 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Content coming soon</h2>
          <p className="text-slate-500 max-w-lg mx-auto mb-8">
            We are currently updating our {title.toLowerCase()} materials. Please check back later for the latest updates and resources.
          </p>
          <button 
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0A2540] text-white font-bold rounded-full hover:bg-[#0070E0] transition-colors"
          >
            Return to Dashboard <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
