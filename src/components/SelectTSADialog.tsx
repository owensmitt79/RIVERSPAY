import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { School, Building2, Landmark } from 'lucide-react';

export interface TSAInstitution {
  name: string;
  category: 'State University' | 'Private University' | 'Parastatal';
  logo: any;
}

interface SelectTSADialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectInstitution?: (institution: TSAInstitution) => void;
}

export const tsaInstitutions: TSAInstitution[] = [
  {
    name: 'Rivers State University (RSU)',
    category: 'State University',
    logo: () => <div className="w-[54px] h-[54px] bg-[#0055A4] rounded-[8px] flex items-center justify-center border border-blue-700 shadow-sm"><School className="text-white w-8 h-8" /></div>
  },
  {
    name: 'Ignatius Ajuru University (IAUE)',
    category: 'State University',
    logo: () => <div className="w-[54px] h-[54px] bg-green-600 rounded-[8px] flex items-center justify-center border border-green-700 shadow-sm"><School className="text-white w-8 h-8" /></div>
  },
  {
    name: 'PAMO University of Medical Sciences',
    category: 'Private University',
    logo: () => <div className="w-[54px] h-[54px] bg-red-600 rounded-[8px] flex items-center justify-center border border-red-700 shadow-sm"><School className="text-white w-8 h-8" /></div>
  },
  {
    name: 'Wigwe University',
    category: 'Private University',
    logo: () => <div className="w-[54px] h-[54px] bg-indigo-900 rounded-[8px] flex items-center justify-center border border-indigo-950 shadow-sm"><School className="text-white w-8 h-8" /></div>
  },
  {
    name: 'Rivers State Waste Management (RIWAMA)',
    category: 'Parastatal',
    logo: () => <div className="w-[54px] h-[54px] bg-emerald-600 rounded-[8px] flex items-center justify-center border border-emerald-700 shadow-sm"><Building2 className="text-white w-8 h-8" /></div>
  },
  {
      name: 'Rivers State Tourism Board',
      category: 'Parastatal',
      logo: () => <div className="w-[54px] h-[54px] bg-orange-500 rounded-[8px] flex items-center justify-center border border-orange-600 shadow-sm"><Building2 className="text-white w-8 h-8" /></div>
  },
  {
    name: 'General TSA Payment',
    category: 'Parastatal',
    logo: () => <div className="w-[54px] h-[54px] bg-brand-primary rounded-[8px] flex items-center justify-center border border-brand-primary-dark shadow-sm"><Landmark className="text-white w-8 h-8" /></div>
  }
];

export function SelectTSADialog({ open, onOpenChange, onSelectInstitution }: SelectTSADialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white border-0 shadow-2xl p-6 sm:px-8 sm:py-10 rounded-[12px] gap-6 overflow-hidden flex flex-col max-h-[85vh]" showCloseButton={true}>
        <DialogHeader>
          <DialogTitle className="text-[#3AA796] text-[24px] font-light text-center w-full mb-2 -mt-2">
            Rivers State parastatals & Universities
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
          {tsaInstitutions.map((inst) => (
            <button
              key={inst.name}
              onClick={() => onSelectInstitution?.(inst)}
              className="flex items-center gap-6 p-3.5 rounded-[12px] border border-slate-200/80 hover:border-slate-300 hover:shadow-[0_2px_10px_rgba(0,0,0,0.03)] transition-all duration-200 bg-white group text-left"
            >
              <inst.logo />
              <div className="flex flex-col">
                <span className="text-[#4A4A4A] font-semibold text-[16px] leading-tight group-hover:text-brand-primary transition-colors">{inst.name}</span>
                <span className="text-slate-400 text-xs mt-0.5">{inst.category}</span>
              </div>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
