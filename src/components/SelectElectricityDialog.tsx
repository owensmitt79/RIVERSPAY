import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export interface ElectricityProvider {
  name: string;
  logo: any;
}

interface SelectElectricityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectProvider?: (provider: ElectricityProvider) => void;
}

export const electricityProviders = [
  {
    name: 'PHED (Port Harcourt)',
    logo: () => (
      <div className="w-[54px] h-[54px] bg-white rounded-[8px] flex items-center justify-center border border-slate-100 shadow-sm overflow-hidden">
        <div className="flex flex-col items-center leading-none">
            <div className="flex bg-[#0055A4] px-1 py-0.5 rounded-sm">
                <span className="text-white font-black text-xs tracking-tighter">PHED</span>
            </div>
            <div className="w-8 h-0.5 bg-[#8DC63F] mt-0.5"></div>
            <span className="text-[6px] text-slate-400 font-bold mt-0.5">Electricity</span>
        </div>
      </div>
    ),
  },
];

export function SelectElectricityDialog({ open, onOpenChange, onSelectProvider }: SelectElectricityDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white border-0 shadow-2xl p-6 sm:px-8 sm:py-10 rounded-[12px] gap-6" showCloseButton={true}>
        <DialogHeader>
          <DialogTitle className="text-[#3AA796] text-[24px] font-light text-center w-full mb-2 -mt-2">
            Please select your Electricity provider
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          {electricityProviders.map((provider) => (
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
