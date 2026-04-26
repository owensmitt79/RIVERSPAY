import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export interface CableProvider {
  name: string;
  logo: any;
}

interface SelectCableDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectProvider?: (provider: CableProvider) => void;
}

export const cableProviders = [
  {
    name: 'DSTV',
    logo: () => (
      <div className="w-[54px] h-[54px] bg-white rounded-[8px] flex items-center justify-center border border-slate-100 shadow-sm">
        <div className="flex items-center">
            <span className="text-[#0067B1] font-black italic text-xl tracking-tighter">DS</span>
            <span className="text-[#0067B1] font-bold text-sm mt-1 ml-0.5">tv</span>
        </div>
      </div>
    ),
  },
  {
    name: 'GoTV',
    logo: () => (
      <div className="w-[54px] h-[54px] bg-white rounded-[8px] flex items-center justify-center border border-slate-100 shadow-sm">
        <div className="flex flex-col items-center leading-none">
            <div className="flex items-baseline">
                <span className="text-[#009900] font-black text-xl italic">GO</span>
                <span className="text-[#E31E24] font-bold text-sm ml-0.5">tv</span>
            </div>
            <span className="text-[6px] text-slate-400 font-medium uppercase tracking-tighter">Live it. Love it.</span>
        </div>
      </div>
    ),
  },
  {
    name: 'Startimes',
    logo: () => (
      <div className="w-[54px] h-[54px] bg-white rounded-[8px] flex flex-col items-center justify-center border border-slate-100 shadow-sm overflow-hidden">
        <div className="relative w-8 h-8 mb-0.5">
            <div className="absolute inset-0 bg-blue-500 rounded-lg rotate-45"></div>
            <div className="absolute inset-0 bg-orange-500 rounded-full scale-75 flex items-center justify-center">
                <div className="w-full h-1 bg-white rotate-45 opacity-40"></div>
                <div className="w-full h-1 bg-white -rotate-45 opacity-40"></div>
            </div>
        </div>
        <span className="text-slate-800 text-[8px] font-bold leading-none tracking-tighter">StarTimes</span>
      </div>
    ),
  },
];

export function SelectCableDialog({ open, onOpenChange, onSelectProvider }: SelectCableDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white border-0 shadow-2xl p-6 sm:px-8 sm:py-10 rounded-[12px] gap-6" showCloseButton={true}>
        <DialogHeader>
          <DialogTitle className="text-[#3AA796] text-[24px] font-light text-center w-full mb-2 -mt-2">
            Please select your CABLE provider
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          {cableProviders.map((provider) => (
            <button
              key={provider.name}
              onClick={() => onSelectProvider?.(provider)}
              className="flex items-center gap-8 p-3.5 rounded-[12px] border border-slate-200/80 hover:border-slate-300 hover:shadow-[0_2px_10px_rgba(0,0,0,0.03)] transition-all duration-200 bg-white"
            >
              <provider.logo />
              <span className="text-[#4A4A4A] font-light text-[17px] tracking-wide">{provider.name}</span>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
