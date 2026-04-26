import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const salarySchema = z.object({
  payerName: z.string().min(2, 'Payer name is too short'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(11, 'Invalid phone number'),
  address: z.string().min(5, 'Address is too short'),
  captcha: z.string().min(1, 'Please enter the captcha code'),
});

type SalaryFormData = z.infer<typeof salarySchema>;

export default function SalaryPaymentPage() {
  const navigate = useNavigate();
  const [fileName, setFileName] = useState<string | null>(null);
  const [captchaCode, setCaptchaCode] = useState('');

  const generateCaptcha = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setCaptchaCode(code);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<SalaryFormData>({
    resolver: zodResolver(salarySchema),
  });

  const onFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const onSubmit = (data: SalaryFormData) => {
    if (data.captcha !== captchaCode) {
      alert('Invalid captcha code. Please try again.');
      generateCaptcha();
      return;
    }
    if (!fileName) {
      alert('Please upload a payment schedule file');
      return;
    }
    navigate('/payment-profile', { 
      state: { 
        ...data, 
        service: 'Salary Bulk Payment',
        amount: 'Processing...',
        institution: 'Rivers State Government' 
      } 
    });
  };

  return (
    <div className="min-h-screen bg-[#f4f7f9] flex flex-col font-sans text-[#333]">
      {/* Top Blue Banner like Remita */}
      <div className="h-1 bg-[#007bff] w-full" />

      {/* Header */}
      <header className="bg-white border-b border-[#e1e1e1] px-6 py-3 flex items-center justify-between shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
          <img src="/logo.png" alt="RiversPay Logo" className="h-[76px] object-contain" />
        </div>
        <div className="text-sm font-medium text-slate-500">
            Upload Payments
        </div>
      </header>

      <main className="flex-1 flex justify-center py-12 px-4 bg-gradient-to-b from-white to-[#f4f7f9]">
        <div className="bg-white border border-[#e1e1e1] shadow-sm rounded-lg w-full max-w-[850px] overflow-hidden flex flex-col h-fit">
          <div className="p-10">
            <button onClick={() => navigate('/')} className="flex items-center text-[#007bff] hover:text-[#0056b3] transition-colors mb-6 -ml-1 text-sm font-medium">
              <ArrowLeft className="w-4 h-4 mr-1" />
              BACK
            </button>

            <h1 className="text-2xl font-bold text-slate-800 mb-8 border-b border-slate-100 pb-4">Bulk Salary Payment</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
              
              {/* File Upload Section */}
              <div className="space-y-6">
                <div className="flex flex-col gap-3">
                  <div className="flex items-baseline gap-2">
                    <span className="text-red-600 font-bold block leading-none -mt-1">*</span>
                    <label className="text-[15px] font-semibold text-slate-700">Download Template Above (File Input)</label>
                  </div>
                  
                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-[13px]">
                     <a href="#" className="text-[#ee2d24] font-bold hover:underline">Click Here</a>
                     <span className="text-slate-600">To Generate a</span>
                     <a href="#" className="text-[#ee2d24] font-bold hover:underline">Sample template</a>
                     <span className="text-slate-600">for bulk upload</span>
                     <span className="mx-2 text-slate-300">|</span>
                     <a href="#" className="text-[#333] font-bold hover:underline">View Bank Codes</a>
                  </div>

                  <div className="mt-2 group">
                    <div className={`relative border border-[#ccc] rounded-md transition-all h-12 flex items-center px-4 bg-white hover:border-[#aaa] ${fileName ? 'bg-blue-50/30 border-[#007bff]/30' : ''}`}>
                      <input 
                        type="file" 
                        onChange={onFileUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                        accept=".csv,.xlsx,.xls"
                      />
                      <div className="flex items-center justify-between w-full">
                        <span className={`text-sm ${fileName ? 'text-slate-800 font-medium' : 'text-slate-400'}`}>
                          {fileName || 'No file chosen'}
                        </span>
                        <div className="bg-[#f8f9fa] border border-[#ccc] px-3 py-1 text-xs font-semibold text-slate-700 rounded group-hover:bg-[#e9ecef]">
                           Choose File
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payer Details Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-red-600 font-bold">*</span>
                    <label className="text-[14px] font-semibold text-slate-700 uppercase tracking-tight">Payer's Full Name</label>
                  </div>
                  <input 
                    {...register('payerName')}
                    className={`w-full border ${errors.payerName ? 'border-red-500' : 'border-[#ccc]'} rounded-md px-4 py-2.5 outline-none focus:border-[#007bff] transition-all text-[15px] text-slate-800`}
                  />
                  {errors.payerName && <p className="text-red-500 text-[11px] font-medium">{errors.payerName.message}</p>}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-red-600 font-bold">*</span>
                    <label className="text-[14px] font-semibold text-slate-700 uppercase tracking-tight">Payer's Email</label>
                  </div>
                  <input 
                    {...register('email')}
                    className={`w-full border ${errors.email ? 'border-red-500' : 'border-[#ccc]'} rounded-md px-4 py-2.5 outline-none focus:border-[#007bff] transition-all text-[15px] text-slate-800`}
                  />
                  {errors.email && <p className="text-red-500 text-[11px] font-medium">{errors.email.message}</p>}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-red-600 font-bold">*</span>
                    <label className="text-[14px] font-semibold text-slate-700 uppercase tracking-tight">Payer's Phone</label>
                  </div>
                  <input 
                    {...register('phone')}
                    className={`w-full border ${errors.phone ? 'border-red-500' : 'border-[#ccc]'} rounded-md px-4 py-2.5 outline-none focus:border-[#007bff] transition-all text-[15px] text-slate-800`}
                  />
                  {errors.phone && <p className="text-red-500 text-[11px] font-medium">{errors.phone.message}</p>}
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-red-600 font-bold">*</span>
                    <label className="text-[14px] font-semibold text-slate-700 uppercase tracking-tight">Payer's Address</label>
                  </div>
                  <textarea 
                    {...register('address')}
                    rows={1}
                    className={`w-full border ${errors.address ? 'border-red-500' : 'border-[#ccc]'} rounded-md px-4 py-2.5 outline-none focus:border-[#007bff] transition-all text-[15px] text-slate-800 resize-none`}
                  />
                  {errors.address && <p className="text-red-500 text-[11px] font-medium">{errors.address.message}</p>}
                </div>
              </div>

              {/* Captcha Section */}
              <div className="space-y-4 pt-4">
                <p className="text-[#ee2d24] italic text-[14px]">To Confirm your transaction, please type the visual code in the box below</p>
                
                <div className="flex flex-col gap-4">
                   <div className="flex items-center gap-4">
                      <div className="bg-slate-100 border border-[#ccc] px-6 py-3 rounded tracking-[0.4em] font-mono text-2xl font-bold text-slate-700 select-none shadow-inner italic">
                        {captchaCode}
                      </div>
                      <button type="button" onClick={generateCaptcha} className="text-[#007bff] hover:text-[#0056b3] p-2 rounded-full hover:bg-slate-100 transition-all">
                        <RefreshCw className="w-5 h-5" />
                      </button>
                   </div>
                   
                   <div className="w-full md:w-[240px]">
                     <input 
                        {...register('captcha')}
                        placeholder="Type the visual code here"
                        className={`w-full border ${errors.captcha ? 'border-red-500' : 'border-[#ccc]'} rounded-md px-4 py-2.5 outline-none focus:border-[#007bff] transition-all text-[15px]`}
                     />
                     {errors.captcha && <p className="text-red-500 text-[11px] font-medium mt-1">{errors.captcha.message}</p>}
                   </div>
                </div>
              </div>

              {/* Actions Section */}
              <div className="flex items-center gap-5 pt-6 border-t border-slate-100">
                <button 
                  type="submit" 
                  className="bg-[#1ca28b] hover:bg-[#168673] text-white font-bold py-3.5 px-12 rounded-md transition-all text-[15px] shadow-sm transform hover:scale-[1.01] active:scale-[0.99]"
                >
                  CONTINUE
                </button>
                <button 
                  type="button" 
                  onClick={() => {
                    reset();
                    setFileName(null);
                    generateCaptcha();
                  }}
                  className="bg-white border border-[#ccc] text-[#333] font-bold py-3.5 px-12 rounded-md hover:bg-[#f8f9fa] transition-all text-[15px] shadow-sm"
                >
                  RESET
                </button>
              </div>

            </form>
          </div>
        </div>
      </main>
      
      {/* Footer Strip */}
      <footer className="bg-[#007bff]/5 py-4 border-t border-[#e1e1e1]">
         <div className="max-w-[850px] mx-auto px-4 flex justify-between items-center text-[11px] text-slate-400 font-medium">
            <span>RiversPay © 2026. All Rights Reserved.</span>
            <div className="flex gap-4">
               <a href="#" className="hover:text-[#007bff]">Terms of Service</a>
               <a href="#" className="hover:text-[#007bff]">Privacy Policy</a>
            </div>
         </div>
      </footer>
    </div>
  );
}
