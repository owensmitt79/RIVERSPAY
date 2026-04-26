import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { providers } from '@/components/SelectTelcoDialog';
import { cableProviders } from '@/components/SelectCableDialog';
import { electricityProviders } from '@/components/SelectElectricityDialog';
import { taxTypes } from '@/components/SelectTaxDialog';
import { tsaInstitutions } from '@/components/SelectTSADialog';
import { ArrowLeft, Droplets, GraduationCap, Briefcase, ChevronDown } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { paymentSchema, type PaymentFormData } from '@/lib/schemas';

export default function RechargePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState(false);
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      payerName: '',
      amount: '',
      service: '',
      email: '',
      phone: ''
    }
  });
  
  const providerName = searchParams.get('provider');
  const type = searchParams.get('type') || 'Airtime';

  useEffect(() => {
    if (type === 'Airtime') {
      setValue('service', 'Airtime Recharge');
    } else if (type === 'Water') {
      setValue('service', 'Water Bill Payment');
    } else if (type === 'JAMB') {
      setValue('service', 'JAMB Pin Purchase');
    }
  }, [type, setValue]);
  
  const provider = type === 'Cable' 
    ? (cableProviders.find(p => p.name === providerName) || cableProviders[0])
    : type === 'Electricity'
    ? (electricityProviders.find(p => p.name === providerName) || electricityProviders[0])
    : type === 'Tax'
    ? (taxTypes.find(p => p.name === providerName) || taxTypes[0])
    : type === 'States'
    ? (tsaInstitutions.find(p => p.name === providerName) || tsaInstitutions[tsaInstitutions.length - 1])
    : type === 'Water'
    ? { name: 'Rivers State Water Corp', logo: () => <div className="w-[54px] h-[54px] bg-blue-600 rounded-[8px] flex items-center justify-center border border-blue-700 shadow-sm"><Droplets className="text-white w-8 h-8" /></div> }
    : type === 'JAMB'
    ? { name: 'JAMB', logo: () => <div className="w-[54px] h-[54px] bg-indigo-600 rounded-[8px] flex items-center justify-center border border-indigo-700 shadow-sm"><GraduationCap className="text-white w-8 h-8" /></div> }
    : type === 'Salary'
    ? { name: providerName || 'Pay Salaries', logo: () => <div className="w-[54px] h-[54px] bg-orange-500 rounded-[8px] flex items-center justify-center border border-orange-600 shadow-sm"><Briefcase className="text-white w-8 h-8" /></div> }
    : (providers.find(p => p.name === providerName) || providers[0]);

  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);


  const dataPlans: Record<string, any[]> = {
    'MTN': [
      { id: 'm1', size: '1.5GB', price: 1000, validity: '30 Days', type: 'Monthly' },
      { id: 'm2', size: '2GB', price: 1200, validity: '30 Days', type: 'Monthly' },
      { id: 'm3', size: '3.5GB', price: 2000, validity: '30 Days', type: 'Monthly' },
      { id: 'm4', size: '10GB', price: 3000, validity: '30 Days', type: 'Monthly' },
      { id: 'm5', size: '20GB', price: 5000, validity: '30 Days', type: 'Monthly' },
      { id: 'm6', size: '40GB', price: 10000, validity: '30 Days', type: 'Monthly' },
    ],
    'GLO': [
      { id: 'g1', size: '1.35GB', price: 500, validity: '14 Days', type: 'Special' },
      { id: 'g2', size: '2.9GB', price: 1000, validity: '30 Days', type: 'Monthly' },
      { id: 'g3', size: '5.8GB', price: 2000, validity: '30 Days', type: 'Monthly' },
      { id: 'g4', size: '7.7GB', price: 2500, validity: '30 Days', type: 'Monthly' },
      { id: 'g5', size: '10GB', price: 3000, validity: '30 Days', type: 'Monthly' },
      { id: 'g6', size: '13.25GB', price: 4000, validity: '30 Days', type: 'Monthly' },
    ],
    'AIRTEL': [
      { id: 'a1', size: '1.5GB', price: 1000, validity: '30 Days', type: 'Monthly' },
      { id: 'a2', size: '3GB', price: 1500, validity: '30 Days', type: 'Monthly' },
      { id: 'a3', size: '4.5GB', price: 2000, validity: '30 Days', type: 'Monthly' },
      { id: 'a4', size: '11GB', price: 3000, validity: '30 Days', type: 'Monthly' },
      { id: 'a5', size: '20GB', price: 5000, validity: '30 Days', type: 'Monthly' },
      { id: 'a6', size: '40GB', price: 10000, validity: '30 Days', type: 'Monthly' },
    ],
    '9MOBILE': [
      { id: '91', size: '1.5GB', price: 1000, validity: '30 Days', type: 'Monthly' },
      { id: '92', size: '2GB', price: 1200, validity: '30 Days', type: 'Monthly' },
      { id: '93', size: '4.5GB', price: 2000, validity: '30 Days', type: 'Monthly' },
      { id: '94', size: '11GB', price: 3000, validity: '30 Days', type: 'Monthly' },
      { id: '95', size: '15GB', price: 5000, validity: '30 Days', type: 'Monthly' },
      { id: '96', size: '40GB', price: 10000, validity: '30 Days', type: 'Monthly' },
    ],
  };

  const currentPlans = (dataPlans[provider.name] || dataPlans['MTN']) || [];

  const recentBeneficiaries = [
    { name: 'Self', number: '08101234567', initial: 'S', color: 'bg-blue-500' },
    { name: 'Mom', number: '07034567890', initial: 'M', color: 'bg-pink-500' },
    { name: 'Abidemi', number: '09055566778', initial: 'A', color: 'bg-emerald-500' },
  ];

  const onSubmit = (data: PaymentFormData) => {
    setIsSubmitting(true);
    // Simulate API delay
    setTimeout(() => {
      navigate('/payment-profile', { 
        state: { 
          ...data, 
          institution: type === 'States' 
            ? (provider.name === 'General TSA Payment' ? 'Rivers State Government' : provider.name)
            : provider.name,
          rechargeType: type
        } 
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Navbar with Company Logo */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <img src="/logo.png" alt="RiversPay Logo" className="h-[76px] object-contain" />
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <button onClick={() => navigate('/')} className="text-brand-dark/70 hover:text-brand-primary font-medium px-3 sm:px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors">
            About
          </button>
          <button onClick={() => navigate('/developers')} className="text-brand-dark/70 hover:text-brand-primary font-medium px-3 sm:px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors">
            Developers
          </button>
          <button onClick={() => navigate('/')} className="text-slate-500 hover:text-slate-800 font-medium px-3 sm:px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors">
            Cancel
          </button>
        </div>
      </header>

      {/* Main Content Form */}
      <main className="flex-1 flex justify-center py-10 px-4 sm:px-6">
        <div className="bg-white border border-slate-200 shadow-xl rounded-[24px] w-full max-w-[760px] overflow-hidden flex flex-col h-fit">
          <div className="p-8 sm:p-12">
            <button onClick={() => navigate('/')} className="flex items-center text-slate-500 hover:text-slate-800 transition-colors mb-10 -ml-2 p-2 rounded-lg hover:bg-slate-50 w-fit" disabled={isSubmitting}>
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span className="font-medium">Back to providers</span>
            </button>

            {type === 'States' ? (
              <div className="space-y-10">
                <div className="flex justify-end">
                    <h1 className="text-3xl sm:text-4xl font-display font-medium text-slate-800 tracking-tight uppercase">
                        {provider.name === 'General TSA Payment' ? 'RIVERS STATE GOVERNMENT' : provider.name.toUpperCase()}
                    </h1>
                </div>

                <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
                  {/* Who do you want to pay */}
                  <div className="space-y-2">
                    <label className="text-slate-700 font-medium text-[16px]">
                      Who do you want to pay <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      defaultValue={provider.name}
                      className="w-full border border-slate-300 rounded-[6px] px-4 py-3.5 outline-none text-slate-800 text-lg hover:border-slate-400 focus:border-brand-primary transition-all shadow-sm"
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Name of service/purpose */}
                  <div className="space-y-2">
                    <label className="text-slate-700 font-medium text-[16px]">
                      Name of service/purpose <span className="text-red-500">*</span>
                    </label>
                    <div className="relative group">
                      <select 
                          {...register('service')}
                          disabled={isSubmitting}
                          className={`w-full border border-slate-300 rounded-[6px] px-4 py-3.5 outline-none text-slate-800 text-lg appearance-none bg-white hover:border-slate-400 focus:border-brand-primary transition-all shadow-sm cursor-pointer ${errors.service ? 'border-red-500' : ''}`}
                      >
                          <option value="">Select a service</option>
                          <option value="Tuition Fees">Tuition Fees</option>
                          <option value="Course Registration">Course Registration</option>
                          <option value="License & Permits">License & Permits</option>
                          <option value="State Development Levy">State Development Levy</option>
                          <option value="Others">Others</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-slate-600 transition-colors">
                        <ChevronDown className="w-5 h-5" />
                      </div>
                    </div>
                    {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service.message}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Amount to Pay */}
                    <div className="space-y-2">
                      <label className="text-slate-700 font-medium text-[16px]">
                        Amount To Pay (₦) <span className="text-red-500">*</span>
                      </label>
                      <div className={`flex border border-slate-300 rounded-[6px] overflow-hidden focus-within:border-brand-primary transition-all shadow-sm ${errors.amount ? 'border-red-500' : ''}`}>
                        <div className="bg-slate-100 px-4 py-3.5 border-r border-slate-300 text-slate-600 font-medium text-lg">
                          ₦
                        </div>
                        <input 
                          type="number" 
                          {...register('amount')}
                          disabled={isSubmitting}
                          className="w-full px-4 py-3.5 outline-none text-slate-800 text-lg"
                        />
                      </div>
                      {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount.message}</p>}
                    </div>

                    {/* Select Currency */}
                    <div className="space-y-2">
                      <label className="text-slate-700 font-medium text-[16px]">
                        Select currency <span className="text-red-500">*</span>
                      </label>
                      <select className="w-full border border-slate-300 rounded-[6px] px-4 py-3.5 outline-none text-slate-800 text-lg bg-white shadow-sm cursor-pointer" disabled={isSubmitting}>
                        <option value="NGN">NGN - Nigerian Naira</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Payer's Name */}
                    <div className="space-y-2">
                      <label className="text-slate-700 font-medium text-[16px]">
                        Payer's name <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="text" 
                        {...register('payerName')}
                        disabled={isSubmitting}
                        className={`w-full border border-slate-300 rounded-[6px] px-4 py-3.5 outline-none text-slate-800 text-lg shadow-sm ${errors.payerName ? 'border-red-500' : ''}`}
                      />
                      {errors.payerName && <p className="text-red-500 text-xs mt-1">{errors.payerName.message}</p>}
                    </div>

                    {/* Payer Phone */}
                    <div className="space-y-2">
                      <label className="text-slate-700 font-medium text-[16px]">
                        Payer Phone <span className="text-red-500">*</span>
                      </label>
                      <div className="flex border border-slate-300 rounded-[6px] overflow-hidden focus-within:border-brand-primary transition-all shadow-sm">
                        <div className="flex items-center gap-2 px-4 py-3.5 bg-white border-r border-slate-300">
                          <span className="text-xl">🇳🇬</span>
                          <svg className="w-3 h-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7"/></svg>
                        </div>
                        <input 
                          type="tel" 
                          {...register('phone')}
                          disabled={isSubmitting}
                          className="w-full px-4 py-3.5 outline-none text-slate-800 text-lg"
                        />
                      </div>
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                    </div>
                  </div>

                  {/* Payer Email */}
                  <div className="space-y-2">
                    <label className="text-slate-700 font-medium text-[16px]">
                      Payer Email <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="email" 
                      {...register('email')}
                      disabled={isSubmitting}
                      className={`w-full border border-slate-300 rounded-[6px] px-4 py-3.5 outline-none text-slate-800 text-lg shadow-sm ${errors.email ? 'border-red-500' : ''}`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>

                  {/* reCAPTCHA component */}
                  <div className="mt-4">
                    <ReCAPTCHA
                      sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                      onChange={(val) => setIsVerified(!!val)}
                    />
                  </div>
                </form>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-10">
                  <div className="flex flex-col gap-2">
                    <span className="text-brand-primary font-semibold text-sm uppercase tracking-wider">RiversPay Services</span>
                    <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">{type}</h2>
                  </div>
                  <div className="w-[84px] h-[84px] shrink-0 shadow-lg rounded-2xl overflow-hidden border-4 border-white">
                     {provider.logo()}
                  </div>
                </div>

                <form className="space-y-10" onSubmit={handleSubmit(onSubmit)}>
                  {/* Beneficiary Phone Number */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-slate-800 font-semibold text-[16px]">
                        {type === 'Cable' ? 'Smartcard or IUC Number' : 
                         type === 'Electricity' ? 'Meter Number' : 
                         type === 'Water' ? 'Consumer ID / Account Number' :
                         type === 'Tax' ? 'Rivers State RIRS ID' :
                         type === 'JAMB' ? 'JAMB Profile Code' :
                         type === 'States' && (providerName?.includes('University') || providerName?.includes('(RSU)') || providerName?.includes('(IAUE)'))
                         ? 'Matric Number / JAMB Reg Number' :
                         type === 'States' ? 'TSA Reference Number / Invoice Number' :
                         type === 'Salary' ? 'Tax Identification Number (TIN)' :
                         'Beneficiary Phone Number'} <span className="text-[#E85D04]">*</span>
                      </label>
                    </div>
                    <div className="flex border border-slate-200 rounded-[16px] overflow-hidden focus-within:ring-4 focus-within:ring-brand-primary/10 focus-within:border-brand-primary transition-all bg-white shadow-sm h-[64px]">
                      <div className="flex items-center gap-3 px-6 bg-slate-50 border-r border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors">
                        <span className="text-2xl leading-none">🇳🇬</span>
                        <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7"/></svg>
                      </div>
                      <input 
                        type="tel" 
                        className="w-full px-6 outline-none text-slate-800 text-2xl bg-transparent font-semibold tracking-tight"
                        placeholder="0800 000 0000"
                        {...register('phone')}
                        disabled={isSubmitting}
                      />
                    </div>
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}

                    {/* Recent Beneficiaries for Data/Airtime */}
                    {(type === 'Data' || type === 'Airtime') && (
                      <div className="pt-2">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3 block">Recently Recharged</span>
                        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                          {recentBeneficiaries.map((b, i) => (
                            <button 
                              key={i} 
                              onClick={() => setValue('phone', b.number)}
                              disabled={isSubmitting}
                              className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-full hover:border-brand-primary hover:bg-brand-primary/5 transition-all shrink-0 shadow-sm group disabled:opacity-50"
                            >
                              <div className={`w-7 h-7 rounded-full ${b.color} flex items-center justify-center text-white text-[10px] font-bold`}>
                                {b.initial}
                              </div>
                              <div className="flex flex-col items-start leading-none">
                                <span className="text-[11px] font-bold text-slate-700 group-hover:text-brand-primary">{b.name}</span>
                                <span className="text-[9px] text-slate-500">{b.number}</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                   {/* If Data or Cable or Electricity, show a plan/option selector */}
                   {type === 'Data' ? (
                      <div className="space-y-4">
                        <label className="text-slate-800 font-semibold text-[16px]">
                          Select Data Plan <span className="text-[#E85D04]">*</span>
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {currentPlans.map((plan) => (
                            <div 
                              key={plan.id}
                              onClick={() => {
                                if (isSubmitting) return;
                                setSelectedPlan(plan.id);
                                setValue('amount', plan.price.toString());
                                setValue('service', `${plan.size} ${plan.type} (${plan.validity})`);
                              }}
                              className={`relative p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 group ${
                                selectedPlan === plan.id 
                                ? 'border-brand-primary bg-brand-primary/5 shadow-md' 
                                : 'border-slate-100 bg-white hover:border-slate-200 hover:shadow-sm'
                              } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                              <div className="flex justify-between items-start mb-3">
                                <div className="flex flex-col">
                                  <span className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${selectedPlan === plan.id ? 'text-brand-primary' : 'text-slate-400'}`}>
                                    {plan.type}
                                  </span>
                                  <span className="text-2xl font-bold text-slate-900 leading-none">{plan.size}</span>
                                </div>
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                                  selectedPlan === plan.id ? 'border-brand-primary bg-brand-primary' : 'border-slate-200'
                                }`}>
                                  {selectedPlan === plan.id && <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}><path d="M5 13l4 4L19 7"/></svg>}
                                </div>
                              </div>
                              <div className="flex justify-between items-end">
                                <span className="text-slate-500 text-sm font-medium">{plan.validity}</span>
                                <span className="text-xl font-bold text-brand-primary">₦{plan.price.toLocaleString()}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                        {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service.message}</p>}
                      </div>
                   ) : (type === 'Cable' || type === 'Electricity' || type === 'Tax') && (
                      <div className="space-y-4">
                        <label className="text-slate-800 font-semibold text-[16px]">
                          Select {type === 'Cable' ? 'Cable Plan' : type === 'Electricity' ? 'Meter Type' : 'Tax Period'} <span className="text-[#E85D04]">*</span>
                        </label>
                        <div className="relative group">
                          <select 
                            className="w-full border border-slate-200 rounded-[16px] px-6 h-[64px] outline-none text-slate-800 text-lg font-semibold focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary transition-all bg-white appearance-none cursor-pointer shadow-sm"
                            {...register('service')}
                            disabled={isSubmitting}
                            onChange={(e) => {
                              const val = e.target.value;
                              setValue('service', val); // Manually update service since we overrode onChange
                              if (type === 'Cable') {
                                 const amounts: any = { 'DStv Compact - ₦12,500': '12500', 'DStv Compact Plus - ₦19,800': '19800', 'DStv Premium - ₦29,500': '29500', 'GOtv Max - ₦5,700': '5700', 'GOtv Supa - ₦7,600': '7600' };
                                 setValue('amount', amounts[val] || '');
                              }
                            }}
                          >
                             <option value="">Select an option</option>
                             {type === 'Cable' ? (
                               <>
                                 <option value="DStv Compact - ₦12,500">DStv Compact - ₦12,500 / Month</option>
                                 <option value="DStv Compact Plus - ₦19,800">DStv Compact Plus - ₦19,800 / Month</option>
                                 <option value="DStv Premium - ₦29,500">DStv Premium - ₦29,500 / Month</option>
                                 <option value="GOtv Max - ₦5,700">GOtv Max - ₦5,700 / Month</option>
                                 <option value="GOtv Supa - ₦7,600">GOtv Supa - ₦7,600 / Month</option>
                               </>
                             ) : type === 'Electricity' ? (
                               <>
                                 <option value="Prepaid Meter">Prepaid Meter</option>
                                 <option value="Postpaid Meter">Postpaid Meter</option>
                               </>
                             ) : (
                               <>
                                 <option value="Full Year 2024">Full Year 2024</option>
                                 <option value="Q1 2024">Q1 2024</option>
                                 <option value="Arrears 2023">Arrears 2023</option>
                               </>
                             )}
                          </select>
                          <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-slate-600 transition-colors">
                            <ChevronDown className="w-6 h-6" />
                          </div>
                        </div>
                        {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service.message}</p>}
                      </div>
                   )}

                    {/* Amount to Recharge */}
                    <div className="space-y-4">
                      <label className="text-slate-800 font-semibold text-[16px]">
                        {type === 'Data' || type === 'Cable' ? 'Total Amount' : 'Amount to Pay'} <span className="text-[#E85D04]">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-bold text-slate-400">₦</div>
                        <input 
                          type="number" 
                          className="w-full border border-slate-200 rounded-[16px] pl-14 pr-6 h-[64px] outline-none text-slate-800 text-2xl font-bold focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary transition-all shadow-sm bg-slate-50/50"
                          placeholder="0.00"
                          disabled={type === 'Data' || type === 'Cable' || isSubmitting}
                          {...register('amount')}
                        />
                      </div>
                      {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount.message}</p>}
                    </div>

                    {/* Sender Information Section for non-State types */}
                    <div className="pt-6 border-t border-slate-100 space-y-6">
                      <div className="flex flex-col gap-1">
                        <h3 className="text-lg font-bold text-slate-900">Your Information</h3>
                        <p className="text-sm text-slate-500">We'll send your receipt to these details</p>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-slate-700 font-semibold text-sm">Full Name</label>
                          <input 
                            type="text" 
                            {...register('payerName')}
                            placeholder="Chidi Okeke"
                            disabled={isSubmitting}
                            className={`w-full border border-slate-200 rounded-xl px-4 py-3 outline-none text-slate-800 focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary transition-all ${errors.payerName ? 'border-red-500' : ''}`}
                          />
                          {errors.payerName && <p className="text-red-500 text-[10px] mt-1">{errors.payerName.message}</p>}
                        </div>
                        <div className="space-y-2">
                          <label className="text-slate-700 font-semibold text-sm">Email Address</label>
                          <input 
                            type="email" 
                            {...register('email')}
                            placeholder="chidi@example.com"
                            disabled={isSubmitting}
                            className={`w-full border border-slate-200 rounded-xl px-4 py-3 outline-none text-slate-800 focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary transition-all ${errors.email ? 'border-red-500' : ''}`}
                          />
                          {errors.email && <p className="text-red-500 text-[10px] mt-1">{errors.email.message}</p>}
                        </div>
                      </div>
                    </div>

                  {/* reCAPTCHA component */}
                  <div className="mt-2 bg-slate-50 p-4 rounded-xl border border-slate-100 inline-block">
                    <ReCAPTCHA
                      sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                      onChange={(val) => setIsVerified(!!val)}
                    />
                  </div>
                </form>
              </>
            )}
            
            {/* Terms and Privacy */}
            <div className="pt-10">
              <p className="text-slate-500 text-sm text-center">
                By clicking <span className="font-bold text-slate-800">Submit Payment</span> you agree to our{' '}
                <a href="#" className="text-brand-primary hover:underline font-semibold">Terms and Conditions</a> and{' '}
                <a href="#" className="text-brand-primary hover:underline font-semibold">Privacy Policy</a>
              </p>
            </div>
          </div>
          
          {/* Prominent Submit Bar at the bottom */}
          <div className="bg-white border-t border-slate-100 p-8 sm:p-10 mt-auto shrink-0">
            <button 
              type="button" 
              disabled={!isVerified || isSubmitting}
              onClick={handleSubmit(onSubmit)}
              className="w-full bg-brand-primary hover:bg-brand-primary-dark text-white font-bold py-6 rounded-[20px] transition-all duration-300 text-2xl shadow-[0_12px_32px_rgba(30,120,250,0.35)] hover:shadow-[0_16px_40px_rgba(30,120,250,0.45)] hover:-translate-y-1.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none flex items-center justify-center gap-3"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-7 w-7 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>Submit Payment</span>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                </>
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}


