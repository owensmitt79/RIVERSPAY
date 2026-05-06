import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export default function RiversPayAssistantButton() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate('/assistant')}
      className="fixed right-6 bottom-10 z-[60] flex items-center gap-2.5 bg-[#0070E0] hover:bg-[#0052A3] text-white px-5 py-3 rounded-full shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group overflow-hidden"
      style={{
        animation: 'scale-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
      }}
    >
      {/* AI Assistant Icon */}
      <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center flex-shrink-0 shadow-inner">
        <Sparkles className="w-4 h-4 text-white animate-pulse" />
      </div>
      <span className="font-bold text-sm tracking-wide">Ask RiversPay Assistant</span>

      {/* Subtle glow effect */}
      <div className="absolute inset-0 rounded-full bg-[#0070E0]/20 -z-10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </button>
  );
}
