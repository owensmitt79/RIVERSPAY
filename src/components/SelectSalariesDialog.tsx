import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Banknote, FileText, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SelectSalariesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectOption?: (option: string) => void;
}

export const salaryOptions = [
  {
    name: 'Pay Salaries',
    icon: Banknote,
  },
  {
    name: 'Upload Pension Schedule',
    icon: FileText,
  },
  {
    name: 'Upload NHF Schedule',
    icon: Home,
  },
];

export function SelectSalariesDialog({ open, onOpenChange, onSelectOption }: SelectSalariesDialogProps) {
  const navigate = useNavigate();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-[#F8FAFC] border-0 shadow-2xl p-6 sm:px-8 sm:py-10 rounded-[24px] gap-6" showCloseButton={true}>
        <DialogHeader>
          <DialogTitle className="text-[#4A4A4A] text-[24px] font-medium text-center w-full mb-4">
            Pay Salaries & Statutory Payments
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          {salaryOptions.map((option) => (
            <button
              key={option.name}
              onClick={() => {
                if (option.name === 'Pay Salaries') {
                  navigate('/salary-payment');
                } else if (option.name === 'Upload Pension Schedule') {
                  navigate('/pension-schedule');
                } else {
                  onSelectOption?.(option.name);
                }
                onOpenChange(false);
              }}
              className="flex items-center gap-6 p-4 rounded-[16px] bg-white border border-transparent hover:border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-200 group text-left w-full"
            >
              <div className="w-[54px] h-[54px] bg-white rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.08)] group-hover:scale-105 transition-transform duration-200 shrink-0">
                <option.icon className="text-[#F97316] w-6 h-6" />
              </div>
              <span className="text-[#4A4A4A] font-light text-[18px] tracking-wide">{option.name}</span>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
