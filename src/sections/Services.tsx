import { useEffect, useRef, useState } from 'react';
import {
  Phone,
  Radio,
  Lightbulb,
  Tv,
  Droplets,
  Landmark,
  ReceiptText,
  Calculator,
  Briefcase,
  History,
  Smartphone,
  GraduationCap
} from 'lucide-react';
import { SelectTelcoDialog } from '@/components/SelectTelcoDialog';
import { SelectCableDialog } from '@/components/SelectCableDialog';
import { SelectElectricityDialog } from '@/components/SelectElectricityDialog';
import { SelectTaxDialog } from '@/components/SelectTaxDialog';
import { SelectTSADialog } from '@/components/SelectTSADialog';
import { SelectSalariesDialog } from '@/components/SelectSalariesDialog';
import { useNavigate } from 'react-router-dom';

const quickActions = [
  { id: 'airtime', icon: Phone, title: 'Buy Airtime' },
  { id: 'data', icon: Radio, title: 'Buy Data' },
  { id: 'electricity', icon: Lightbulb, title: 'Buy Electricity' },
  { id: 'cable', icon: Tv, title: 'Cable TV' },
  { id: 'water', icon: Droplets, title: 'Pay Water' },
  { id: 'tsa', icon: Landmark, title: 'Pay TSA & States' },
  { id: 'bills', icon: ReceiptText, title: 'Bills & Purchases' },
  { id: 'tax', icon: Calculator, title: 'Pay Taxes' },
  { id: 'salary', icon: Briefcase, title: 'Pay Salaries & Statutory Payments' },
  { id: 'history', icon: History, title: 'Resend Receipt or Invoice' },
  { id: 'debit', icon: Smartphone, title: 'Direct Debit & Standing Order' },
  { id: 'jamb', icon: GraduationCap, title: 'Buy JAMB' },
];

export default function Services() {
  const [isVisible, setIsVisible] = useState(false);
  const [isTelcoOpen, setIsTelcoOpen] = useState(false);
  const [isCableOpen, setIsCableOpen] = useState(false);
  const [isElectricityOpen, setIsElectricityOpen] = useState(false);
  const [isTaxOpen, setIsTaxOpen] = useState(false);
  const [isTSAOpen, setIsTSAOpen] = useState(false);
  const [isSalariesOpen, setIsSalariesOpen] = useState(false);
  const [rechargeType, setRechargeType] = useState<'Airtime' | 'Data' | 'Cable' | 'Electricity' | 'Water' | 'Tax' | 'JAMB' | 'Salary' | 'Bill' | 'States'>('Airtime');
  const sectionRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-24 lg:py-32 bg-slate-50 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-12 items-center lg:items-center">
          
          {/* Section Header (Left Side) */}
          <div className="lg:w-1/3 text-center lg:text-left">
            <span
              className="inline-block text-sm font-semibold text-brand-primary uppercase tracking-wider mb-4"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(15px)',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              Our Services
            </span>
            <h2
              className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-brand-dark mb-6"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
              }}
            >
              All Your <span className="text-gradient-primary">Payments</span> Inside One App
            </h2>
            <p
              className="text-lg text-brand-body leading-relaxed mb-8"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.4s',
              }}
            >
              From everyday airtime and data recharges to complex statutory tax and 
              salary payments, our robust infrastructure handles it all effortlessly.
            </p>
          </div>

          {/* Quick Actions Grid (Right Side) */}
          <div className="lg:w-2/3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <a
                  key={index}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (action.id === 'airtime' || action.id === 'data') {
                      setRechargeType(action.id === 'data' ? 'Data' : 'Airtime');
                      setIsTelcoOpen(true);
                    } else if (action.id === 'cable') {
                      setRechargeType('Cable');
                      setIsCableOpen(true);
                    } else if (action.id === 'electricity') {
                      setRechargeType('Electricity');
                      setIsElectricityOpen(true);
                    } else if (action.id === 'tax') {
                      setRechargeType('Tax');
                      setIsTaxOpen(true);
                    } else if (action.id === 'water') {
                      navigate('/recharge?provider=Rivers%20State%20Water%20Corp&type=Water');
                    } else if (action.id === 'jamb') {
                      navigate('/recharge?provider=JAMB&type=JAMB');
                    } else if (action.id === 'tsa') {
                      setRechargeType('States');
                      setIsTSAOpen(true);
                    } else if (action.id === 'salary') {
                      setRechargeType('Salary');
                      setIsSalariesOpen(true);
                    } else if (action.id === 'history') {
                      navigate('/resend-receipt');
                    }
                  }}
                  style={{
                    animation: isVisible
                      ? `slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards`
                      : 'none',
                    animationDelay: `${200 + index * 50}ms`,
                    opacity: 0,
                  }}
                  className="bg-white rounded-[24px] p-6 flex flex-col items-center justify-center text-center shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_36px_rgba(30,120,250,0.12)] transition-all duration-300 hover:-translate-y-1.5 group border border-slate-100 min-h-[160px] cursor-pointer"
                >
                  <div className="w-[52px] h-[52px] rounded-full bg-orange-50 flex items-center justify-center mb-4 transition-colors duration-300 group-hover:bg-orange-100/80">
                    <Icon className="w-6 h-6 text-[#FF6A1A] group-hover:scale-110 transition-transform duration-300" strokeWidth={2} />
                  </div>
                  <h3 className="font-display font-semibold text-[14px] text-slate-800 leading-snug">
                    {action.title}
                  </h3>
                </a>
              );
            })}
          </div>

        </div>
      </div>
      <SelectTelcoDialog 
        open={isTelcoOpen} 
        onOpenChange={setIsTelcoOpen} 
        onSelectProvider={(provider) => {
          setIsTelcoOpen(false);
          // Navigate directly to the recharge page
          navigate(`/recharge?provider=${encodeURIComponent(provider.name)}&type=${rechargeType}`);
        }}
      />
      <SelectCableDialog 
        open={isCableOpen} 
        onOpenChange={setIsCableOpen} 
        onSelectProvider={(provider) => {
          setIsCableOpen(false);
          // Navigate directly to the recharge page
          navigate(`/recharge?provider=${encodeURIComponent(provider.name)}&type=${rechargeType}`);
        }}
      />
      <SelectElectricityDialog 
        open={isElectricityOpen} 
        onOpenChange={setIsElectricityOpen} 
        onSelectProvider={(provider) => {
          setIsElectricityOpen(false);
          navigate(`/recharge?provider=${encodeURIComponent(provider.name)}&type=${rechargeType}`);
        }}
      />
      <SelectTaxDialog 
        open={isTaxOpen} 
        onOpenChange={setIsTaxOpen} 
        onSelectTax={(tax) => {
          setIsTaxOpen(false);
          navigate(`/recharge?provider=${encodeURIComponent(tax.name)}&type=${rechargeType}`);
        }}
      />
      <SelectTSADialog 
        open={isTSAOpen} 
        onOpenChange={setIsTSAOpen} 
        onSelectInstitution={(inst) => {
          setIsTSAOpen(false);
          navigate(`/recharge?provider=${encodeURIComponent(inst.name)}&type=${rechargeType}`);
        }}
      />
      <SelectSalariesDialog 
        open={isSalariesOpen} 
        onOpenChange={setIsSalariesOpen} 
        onSelectOption={(option) => {
          setIsSalariesOpen(false);
          navigate(`/recharge?provider=${encodeURIComponent(option)}&type=${rechargeType}`);
        }}
      />
    </section>
  );
}
