import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { personalSignupSchema, corporateSignupSchema } from '../lib/schemas';
import type { PersonalSignupData, CorporateSignupData } from '../lib/schemas';
import { Check, ChevronDown, Loader2 } from 'lucide-react';

type AccountType = 'personal' | 'sole-signatory' | 'multi-signatory' | 'government';
type Step = 'selection' | 'form' | 'otp' | 'success';

// ── SVG Illustrations (styled to match Remita icons) ──────────────────────
const PersonalIllustration = () => (
  <svg viewBox="0 0 120 120" className="w-24 h-24 mx-auto" fill="none">
    <rect width="120" height="120" rx="60" fill="#f0f9f7" />
    {/* laptop */}
    <rect x="28" y="68" width="64" height="4" rx="2" fill="#b2dfdb" />
    <rect x="36" y="50" width="48" height="20" rx="3" fill="#e0f2f1" stroke="#80cbc4" strokeWidth="1.5" />
    <rect x="40" y="54" width="40" height="12" rx="2" fill="#b2dfdb" />
    {/* person */}
    <circle cx="60" cy="30" r="11" fill="#ffcc80" />
    <path d="M42 60 Q60 50 78 60" fill="#f48fb1" />
    <rect x="52" y="40" width="16" height="15" rx="4" fill="#f48fb1" />
    {/* hair */}
    <path d="M49 28 Q60 18 71 28 Q71 19 60 18 Q49 19 49 28Z" fill="#5d4037" />
  </svg>
);

const SoleSignatoryIllustration = () => (
  <svg viewBox="0 0 120 120" className="w-24 h-24 mx-auto" fill="none">
    <rect width="120" height="120" rx="60" fill="#f0f9f7" />
    {/* briefcase */}
    <rect x="32" y="52" width="56" height="36" rx="6" fill="#f5f5f5" stroke="#b0bec5" strokeWidth="2" />
    <rect x="46" y="44" width="28" height="12" rx="4" fill="none" stroke="#b0bec5" strokeWidth="2" />
    <line x1="32" y1="66" x2="88" y2="66" stroke="#b0bec5" strokeWidth="1.5" />
    <rect x="54" y="62" width="12" height="8" rx="2" fill="#80cbc4" />
    {/* person */}
    <circle cx="60" cy="29" r="11" fill="#ffe0b2" />
    <rect x="52" y="39" width="16" height="12" rx="4" fill="#90a4ae" />
    <path d="M45 56 Q60 48 75 56" fill="#607d8b" />
    <path d="M50 26 Q60 18 70 26 Q70 18 60 17 Q50 18 50 26Z" fill="#4e342e" />
  </svg>
);

const MultiSignatoryIllustration = () => (
  <svg viewBox="0 0 120 120" className="w-24 h-24 mx-auto" fill="none">
    <rect width="120" height="120" rx="60" fill="#fff8e1" />
    {/* two people */}
    <circle cx="44" cy="38" r="13" fill="#ffcc80" />
    <rect x="34" y="50" width="20" height="16" rx="5" fill="#ef5350" />
    <path d="M28 72 Q44 62 60 72" fill="#c62828" />
    <circle cx="76" cy="34" r="13" fill="#ffe0b2" />
    <rect x="66" y="46" width="20" height="16" rx="5" fill="#90a4ae" />
    <path d="M60 68 Q76 58 92 68" fill="#607d8b" />
    <path d="M37 34 Q44 24 51 34 Q51 24 44 23 Q37 24 37 34Z" fill="#5d4037" />
    <path d="M69 30 Q76 20 83 30 Q83 20 76 19 Q69 20 69 30Z" fill="#4e342e" />
  </svg>
);

const GovernmentIllustration = () => (
  <svg viewBox="0 0 120 120" className="w-24 h-24 mx-auto" fill="none">
    <rect width="120" height="120" rx="60" fill="#e8f5e9" />
    {/* building */}
    <rect x="26" y="56" width="68" height="38" rx="2" fill="#e0e0e0" stroke="#bdbdbd" strokeWidth="1.5" />
    <rect x="40" y="72" width="12" height="22" rx="2" fill="#bdbdbd" />
    <rect x="68" y="72" width="12" height="22" rx="2" fill="#bdbdbd" />
    {/* pillars */}
    <rect x="34" y="60" width="6" height="34" rx="1" fill="#bdbdbd" />
    <rect x="57" y="60" width="6" height="34" rx="1" fill="#bdbdbd" />
    <rect x="80" y="60" width="6" height="34" rx="1" fill="#bdbdbd" />
    {/* roof */}
    <polygon points="60,24 22,58 98,58" fill="#90a4ae" />
    {/* flag */}
    <line x1="60" y1="14" x2="60" y2="28" stroke="#e53935" strokeWidth="2" />
    <polygon points="60,14 75,19 60,24" fill="#e53935" />
  </svg>
);

const accountTypes = [
  {
    id: 'personal' as AccountType,
    title: 'Personal',
    description: 'For Individuals who make regular payments and receive money for their side business',
    illustration: <PersonalIllustration />,
  },
  {
    id: 'sole-signatory' as AccountType,
    title: 'Sole-Signatory',
    description: 'For Registered Businesses with a Single Owner',
    illustration: <SoleSignatoryIllustration />,
  },
  {
    id: 'multi-signatory' as AccountType,
    title: 'Multi-Signatory',
    description: 'For Registered Businesses with Multiple Directors',
    illustration: <MultiSignatoryIllustration />,
  },
  {
    id: 'government' as AccountType,
    title: 'Government',
    description: 'For Federal, State or Local Government organizations',
    illustration: <GovernmentIllustration />,
  },
];

// ── Shared input styles (matching Remita's light gray rounded inputs) ────────
const INPUT_CLASS = 'w-full px-4 py-3 bg-[#eaecef] text-slate-700 placeholder-slate-400 rounded-md border-0 outline-none focus:ring-2 focus:ring-[#1a9e87] text-sm';
const SELECT_CLASS = 'w-full px-4 py-3 bg-[#eaecef] text-slate-400 rounded-md border-0 outline-none focus:ring-2 focus:ring-[#1a9e87] appearance-none text-sm';
const ERROR_CLASS = 'text-red-500 text-xs mt-1';

// ────────────────────────────────────────────────────────────────────────────
export default function GetStartedPage() {
  const [step, setStep] = useState<Step>('selection');
  const [selectedType, setSelectedType] = useState<AccountType | null>(null);
  const navigate = useNavigate();

  const handleSelect = (type: AccountType) => {
    setSelectedType(type);
    setStep('form');
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#e8edf2' }}>
      {/* ── Header ─────────────────────────────────────────────────── */}
      <header className="bg-white py-4 px-8 flex items-center justify-between shadow-sm">
        {/* Logo */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center"
        >
          <img src="/logo.png" alt="RiversPay Logo" className="h-[76px] object-contain" />
        </button>

        {/* Nav links (matching Remita header) */}
        <nav className="hidden md:flex items-center gap-10 text-slate-500 text-sm font-medium">
          <button className="hover:text-[#0070E0] transition-colors">About</button>
          <button className="hover:text-[#0070E0] transition-colors">RiversPay Mobile</button>
          <button
            onClick={() => navigate('/developers')}
            className="hover:text-[#0070E0] transition-colors"
          >
            Developers
          </button>
        </nav>
      </header>

      {/* ── Main content ───────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col items-center justify-center py-16 px-4">
        <h1 className="text-3xl font-bold text-slate-800 mb-12 text-center">Create Account</h1>

        {/* STEP 1 – Account type selection */}
        {step === 'selection' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 max-w-5xl w-full border border-slate-200 rounded-sm overflow-hidden bg-white shadow-sm">
            {accountTypes.map((type, idx) => (
              <div
                key={type.id}
                className={`flex flex-col items-center text-center p-8 ${idx < accountTypes.length - 1 ? 'border-r border-slate-200' : ''}`}
              >
                {/* Illustration */}
                <div className="mb-4">{type.illustration}</div>

                {/* Title */}
                <h3 className="text-base font-semibold text-slate-800 mb-3">{type.title}</h3>

                {/* Description (teal color matching Remita) */}
                <p className="text-[#008080] text-sm leading-relaxed mb-8 flex-1">
                  {type.description}
                </p>

                {/* Get Started button (teal pill) */}
                <button
                  onClick={() => handleSelect(type.id)}
                  className="px-8 py-2.5 bg-[#1a9e87] text-white text-sm font-medium rounded-full hover:bg-[#158070] active:scale-95 transition-all"
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        )}

        {/* STEP 2 – Registration form */}
        {step === 'form' && selectedType && (
          <div className="w-full max-w-2xl">
            {selectedType === 'personal'
              ? <PersonalForm onSuccess={() => setStep('otp')} onBack={() => setStep('selection')} />
              : <CorporateForm type={selectedType} onSuccess={() => setStep('otp')} onBack={() => setStep('selection')} />
            }
          </div>
        )}

        {/* STEP 3 – OTP Verification */}
        {step === 'otp' && (
          <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md w-full text-center">
            <h2 className="text-2xl font-bold text-slate-800 mb-3">Verify Your Phone</h2>
            <p className="text-slate-500 mb-8 leading-relaxed text-sm">
              We've sent a 6-digit OTP to your phone number. Please enter it below to verify your account.
            </p>
            <form onSubmit={(e) => {
              e.preventDefault();
              // Simulate verification delay, then proceed
              const btn = e.currentTarget.querySelector('button');
              if (btn) btn.innerHTML = 'Verifying...';
              setTimeout(() => {
                setStep('success');
              }, 1000);
            }} className="space-y-6">
              <input 
                type="text" 
                placeholder="000000" 
                maxLength={6} 
                className="w-full text-center tracking-[1em] font-bold text-2xl px-4 py-4 bg-[#eaecef] text-slate-700 placeholder-slate-400 rounded-md border-0 outline-none focus:ring-2 focus:ring-[#1a9e87]"
                required
              />
              <button
                type="submit"
                className="w-full py-3 bg-[#1a9e87] text-white font-semibold rounded-full hover:bg-[#158070] transition-colors"
              >
                Verify OTP
              </button>
            </form>
            <div className="mt-6 text-sm">
              <span className="text-slate-400">Didn't receive the code? </span>
              <button className="text-[#1a9e87] font-semibold hover:underline">Resend OTP</button>
            </div>
          </div>
        )}

        {/* STEP 4 – Success */}
        {step === 'success' && (
          <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md w-full text-center">
            <div className="w-20 h-20 bg-[#e0f2f1] rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-[#1a9e87]" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">Account Created!</h2>
            <p className="text-slate-500 mb-8 leading-relaxed">
              Your RiversPay account has been set up successfully. Welcome to smart payments in Rivers State.
            </p>
            <button
              onClick={() => navigate('/login')}
              className="w-full py-3 bg-[#1a9e87] text-white font-semibold rounded-full hover:bg-[#158070] transition-colors"
            >
              Sign In to Your Account
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Personal form
// ────────────────────────────────────────────────────────────────────────────
function PersonalForm({ onSuccess, onBack }: { onSuccess: () => void; onBack: () => void }) {
  const { register, handleSubmit, formState: { errors } } = useForm<PersonalSignupData>({
    resolver: zodResolver(personalSignupSchema),
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (_data: PersonalSignupData) => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    onSuccess();
  };

  return (
    <div className="bg-white rounded-sm shadow-sm p-8">
      <button onClick={onBack} className="text-sm text-[#1a9e87] hover:underline mb-6 block">
        ← Back
      </button>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Row 1: First Name / Last Name */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input {...register('firstName')} placeholder="Enter First Name" className={INPUT_CLASS} />
            {errors.firstName && <p className={ERROR_CLASS}>{errors.firstName.message}</p>}
          </div>
          <div>
            <input {...register('lastName')} placeholder="Enter Last Name" className={INPUT_CLASS} />
            {errors.lastName && <p className={ERROR_CLASS}>{errors.lastName.message}</p>}
          </div>
        </div>

        {/* Row 2: Email / Phone */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input {...register('email')} type="email" placeholder="Enter Email Address" className={INPUT_CLASS} />
            {errors.email && <p className={ERROR_CLASS}>{errors.email.message}</p>}
          </div>
          <div className="relative">
            {/* Flag + dial code */}
            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 pr-2 border-r border-slate-300">
              <span className="text-lg leading-none">🇳🇬</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </div>
            <input
              {...register('phoneNumber')}
              placeholder="Phone Number"
              className={`${INPUT_CLASS} pl-14`}
            />
            {errors.phoneNumber && <p className={ERROR_CLASS}>{errors.phoneNumber.message}</p>}
          </div>
        </div>

        {/* T&C */}
        <label className="flex items-start gap-3 cursor-pointer pt-2">
          <input
            {...register('terms')}
            type="checkbox"
            className="mt-0.5 w-4 h-4 accent-[#1a9e87] cursor-pointer"
          />
          <span className="text-sm text-slate-600">
            By Creating an Account, you agree to accept our{' '}
            <a href="#" className="text-[#1a9e87] hover:underline">Terms and Conditions</a> and{' '}
            <a href="#" className="text-orange-500 hover:underline">Privacy Policy</a>
          </span>
        </label>
        {errors.terms && <p className={ERROR_CLASS}>{errors.terms.message}</p>}

        {/* reCAPTCHA placeholder */}
        <div className="border border-slate-300 rounded-sm bg-[#f9f9f9] px-4 py-3 flex items-center justify-between w-64">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 border-2 border-slate-300 rounded-sm" />
            <span className="text-sm text-slate-600">I'm not a robot</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-[#e8f5e9] rounded-sm flex items-center justify-center mb-0.5">
              <svg viewBox="0 0 40 40" className="w-5 h-5" fill="none">
                <circle cx="20" cy="20" r="18" stroke="#4caf50" strokeWidth="3" strokeDasharray="28 56" />
              </svg>
            </div>
            <span className="text-[9px] text-slate-400 leading-tight">reCAPTCHA</span>
            <span className="text-[8px] text-slate-300">Privacy · Terms</span>
          </div>
        </div>

        {/* Proceed button */}
        <div className="flex justify-center pt-2">
          <button
            type="submit"
            disabled={loading}
            className="px-16 py-2.5 bg-[#1a9e87] text-white text-sm font-medium rounded-full hover:bg-[#158070] disabled:opacity-60 flex items-center gap-2 transition-colors"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Proceed'}
          </button>
        </div>
      </form>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Corporate form (Sole-Signatory / Multi-Signatory / Government)
// ────────────────────────────────────────────────────────────────────────────
function CorporateForm({
  type,
  onSuccess,
  onBack,
}: {
  type: AccountType;
  onSuccess: () => void;
  onBack: () => void;
}) {
  const { register, handleSubmit, formState: { errors } } = useForm<CorporateSignupData>({
    resolver: zodResolver(corporateSignupSchema),
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (_data: CorporateSignupData) => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    onSuccess();
  };

  const typeLabel = type
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join('-');

  return (
    <div className="bg-white rounded-sm shadow-sm p-8">
      <button onClick={onBack} className="text-sm text-[#1a9e87] hover:underline mb-6 block">
        ← Back
      </button>
      <p className="text-slate-500 text-sm mb-6">
        Account type: <strong>{typeLabel}</strong>
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Business Name */}
        <div>
          <input
            {...register('businessName')}
            placeholder="Enter Registered Business Name"
            className={INPUT_CLASS}
          />
          {errors.businessName && <p className={ERROR_CLASS}>{errors.businessName.message}</p>}
        </div>

        {/* Business Type dropdown */}
        <div className="relative">
          <select {...register('businessType')} className={SELECT_CLASS}>
            <option value="">Select Business Type</option>
            <option value="retail">Retail</option>
            <option value="finance">Finance</option>
            <option value="tech">Technology</option>
            <option value="healthcare">Healthcare</option>
            <option value="other">Other</option>
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          {errors.businessType && <p className={ERROR_CLASS}>{errors.businessType.message}</p>}
        </div>

        {/* Business Email / Business Phone */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              {...register('businessEmail')}
              type="email"
              placeholder="Business Email"
              className={INPUT_CLASS}
            />
            {errors.businessEmail && <p className={ERROR_CLASS}>{errors.businessEmail.message}</p>}
          </div>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 pr-2 border-r border-slate-300">
              <span className="text-lg leading-none">🇳🇬</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </div>
            <input
              {...register('businessPhone')}
              placeholder="Business Phone Number"
              className={`${INPUT_CLASS} pl-14`}
            />
            {errors.businessPhone && <p className={ERROR_CLASS}>{errors.businessPhone.message}</p>}
          </div>
        </div>

        {/* Registration Type / Registration Number */}
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <select {...register('registrationType')} className={SELECT_CLASS}>
              <option value="">Select Type of Company Registration</option>
              <option value="cac">CAC</option>
              <option value="bn">Business Name</option>
              <option value="other">Other</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            {errors.registrationType && <p className={ERROR_CLASS}>{errors.registrationType.message}</p>}
          </div>
          <div>
            <input
              {...register('registrationNumber')}
              placeholder="Enter Company Registration Number"
              className={INPUT_CLASS}
            />
            {errors.registrationNumber && <p className={ERROR_CLASS}>{errors.registrationNumber.message}</p>}
          </div>
        </div>

        {/* Personal Details section */}
        <div className="border-t border-slate-200 pt-4 mt-4">
          <p className="text-sm font-semibold text-slate-700 mb-4">Your Personal Details</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input {...register('firstName')} placeholder="First Name" className={INPUT_CLASS} />
              {errors.firstName && <p className={ERROR_CLASS}>{errors.firstName.message}</p>}
            </div>
            <div>
              <input {...register('lastName')} placeholder="Last Name" className={INPUT_CLASS} />
              {errors.lastName && <p className={ERROR_CLASS}>{errors.lastName.message}</p>}
            </div>
          </div>
        </div>

        {/* T&C */}
        <label className="flex items-start gap-3 cursor-pointer pt-2">
          <input
            {...register('terms')}
            type="checkbox"
            className="mt-0.5 w-4 h-4 accent-[#1a9e87] cursor-pointer"
          />
          <span className="text-sm text-slate-600">
            By Creating an Account, you agree to accept our{' '}
            <a href="#" className="text-[#1a9e87] hover:underline">Terms and Conditions</a> and{' '}
            <a href="#" className="text-orange-500 hover:underline">Privacy Policy</a>
          </span>
        </label>
        {errors.terms && <p className={ERROR_CLASS}>{errors.terms.message}</p>}

        {/* reCAPTCHA placeholder */}
        <div className="border border-slate-300 rounded-sm bg-[#f9f9f9] px-4 py-3 flex items-center justify-between w-64">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 border-2 border-slate-300 rounded-sm" />
            <span className="text-sm text-slate-600">I'm not a robot</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-[#e8f5e9] rounded-sm flex items-center justify-center mb-0.5">
              <svg viewBox="0 0 40 40" className="w-5 h-5" fill="none">
                <circle cx="20" cy="20" r="18" stroke="#4caf50" strokeWidth="3" strokeDasharray="28 56" />
              </svg>
            </div>
            <span className="text-[9px] text-slate-400 leading-tight">reCAPTCHA</span>
            <span className="text-[8px] text-slate-300">Privacy · Terms</span>
          </div>
        </div>

        {/* Proceed */}
        <div className="flex justify-center pt-2">
          <button
            type="submit"
            disabled={loading}
            className="px-16 py-2.5 bg-[#1a9e87] text-white text-sm font-medium rounded-full hover:bg-[#158070] disabled:opacity-60 flex items-center gap-2 transition-colors"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Proceed'}
          </button>
        </div>
      </form>
    </div>
  );
}
