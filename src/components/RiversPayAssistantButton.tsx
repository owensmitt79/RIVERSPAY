import { Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function RiversPayAssistantButton() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate('/assistant')}
      className="fixed right-6 bottom-10 z-[60] flex items-center gap-2 bg-[#0070E0] hover:bg-[#0052A3] text-white px-6 py-3.5 rounded-full shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group"
      style={{
        animation: 'scale-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
      }}
    >
      <Sparkles className="w-5 h-5 text-white animate-pulse" />
      <span className="font-semibold text-sm tracking-wide">Ask RiversPay Assistant</span>
      
      {/* Subtle glow effect */}
      <div className="absolute inset-0 rounded-full bg-[#0070E0]/20 -z-10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </button>
  );
}
