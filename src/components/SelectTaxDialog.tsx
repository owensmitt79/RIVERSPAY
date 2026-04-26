import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export interface TaxType {
  name: string;
  logo: any;
}

interface SelectTaxDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectTax?: (tax: TaxType) => void;
}

export const taxTypes = [
  {
    name: 'Personal Income Tax (PAYE)',
    logo: () => (
      <div className="w-[54px] h-[54px] bg-[#E85D04] rounded-[8px] flex items-center justify-center border border-[#E85D04]/20 shadow-sm">
        <span className="text-white font-bold text-lg">PAYE</span>
      </div>
    ),
  },
  {
    name: 'Property Tax',
    logo: () => (
      <div className="w-[54px] h-[54px] bg-[#3AA796] rounded-[8px] flex items-center justify-center border border-[#3AA796]/20 shadow-sm">
        <span className="text-white font-bold text-lg">PROP</span>
      </div>
    ),
  },
  {
    name: 'Business Premises',
    logo: () => (
      <div className="w-[54px] h-[54px] bg-[#0070E0] rounded-[8px] flex items-center justify-center border border-[#0070E0]/20 shadow-sm">
        <span className="text-white font-bold text-lg">BIZ</span>
      </div>
    ),
  },
];

export function SelectTaxDialog({ open, onOpenChange, onSelectTax }: SelectTaxDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white border-0 shadow-2xl p-6 sm:px-8 sm:py-10 rounded-[12px] gap-6" showCloseButton={true}>
        <DialogHeader>
          <DialogTitle className="text-[#3AA796] text-[24px] font-light text-center w-full mb-2 -mt-2">
            Rivers State IRS - Select Tax Type
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          {taxTypes.map((tax) => (
            <button
              key={tax.name}
              onClick={() => onSelectTax?.(tax)}
              className="flex items-center gap-8 p-3.5 rounded-[12px] border border-slate-200/80 hover:border-slate-300 hover:shadow-[0_2px_10px_rgba(0,0,0,0.03)] transition-all duration-200 bg-white"
            >
              <tax.logo />
              <span className="text-[#4A4A4A] font-light text-[17px] tracking-wide">{tax.name}</span>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
