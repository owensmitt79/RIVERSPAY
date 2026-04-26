import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export interface TelcoProvider {
  name: string;
  logo: any;
}

interface SelectTelcoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectProvider?: (provider: TelcoProvider) => void;
}

export const providers = [
  {
    name: 'MTN',
    logo: () => (
      <div className="w-[54px] h-[54px] bg-[#FFCC00] rounded-[8px] flex items-center justify-center font-bold text-white shadow-sm border border-yellow-400">
        <span className="text-[#004A8B] text-xs font-black tracking-tighter bg-white px-1.5 py-0.5 rounded-full border border-[#004A8B]/10">MTN</span>
      </div>
    ),
  },
  {
    name: 'GLO',
    logo: () => (
      <div className="w-[54px] h-[54px] bg-slate-100 rounded-[8px] flex items-center justify-center border border-slate-200">
        <div className="w-11 h-11 bg-[#009900] rounded-full flex flex-col items-center justify-center shadow-inner">
          <span className="text-white text-base font-bold lowercase tracking-tighter">glo</span>
        </div>
      </div>
    ),
  },
  {
    name: 'AIRTEL',
    logo: () => (
      <div className="w-[54px] h-[54px] bg-[#FF0000] rounded-[8px] flex flex-col items-center justify-center font-bold text-white shadow-sm">
        <div className="relative flex flex-col items-center">
          <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
            <path d="M12 2C8.686 2 6 4.686 6 8v3c0 .552.448 1 1 1s1-.448 1-1V8c0-2.206 1.794-4 4-4s4 1.794 4 4v3c0 .552.448 1 1 1s1-.448 1-1V8c0-3.314-2.686-6-6-6zm0 18c-2.206 0-4-1.794-4-4 0-.552-.448-1-1-1s-1 .448-1 1c0 3.314 2.686 6 6 6s6-2.686 6-6c0-.552-.448-1-1-1s-1 .448-1 1c0 2.206-1.794 4-4 4z"/>
          </svg>
          <span className="text-white text-[10px] lowercase font-semibold leading-none mt-1">airtel</span>
        </div>
      </div>
    ),
  },
  {
    name: '9MOBILE',
    logo: () => (
      <div className="w-[54px] h-[54px] bg-black rounded-[8px] flex flex-col items-center justify-center text-white shadow-sm border border-slate-800">
        <div className="flex flex-col items-center leading-none mt-1">
          <span className="text-[#a4c539] text-2xl font-black relative">
            9
            <svg className="absolute w-[10px] h-[10px] fill-white opacity-40 -top-0.5 -right-2.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>
            <svg className="absolute w-[16px] h-[16px] fill-transparent stroke-[#a4c539] stroke-[3] -top-1.5 -right-4" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>
          </span>
          <span className="text-white text-[9px] lowercase font-medium">mobile</span>
        </div>
      </div>
    ),
  },
];

export function SelectTelcoDialog({ open, onOpenChange, onSelectProvider }: SelectTelcoDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white border-0 shadow-2xl p-6 sm:px-8 sm:py-10 rounded-[12px] gap-6" showCloseButton={true}>
        <DialogHeader>
          <DialogTitle className="text-[#3AA796] text-[24px] font-light text-center w-full mb-2 -mt-2">
            Please select your TELCO provider
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          {providers.map((provider) => (
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
