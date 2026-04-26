import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, User, Building2 } from 'lucide-react';
import {
  personalLoginSchema,
  corporateLoginSchema,
  type PersonalLoginData,
  type CorporateLoginData,
} from '@/lib/schemas';

// Shared input class matching Remita's simple bordered inputs
const INPUT = 'w-full border border-slate-300 rounded-sm px-4 py-3 text-sm text-slate-700 placeholder-slate-400 outline-none focus:border-[#1a9e87] focus:ring-1 focus:ring-[#1a9e87] bg-white transition';

export default function LoginPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'personal' | 'corporate'>('personal');
  const [showPass, setShowPass] = useState(false);

  // ── Personal form ───────────────────────────────────────
  const pForm = useForm<PersonalLoginData>({
    resolver: zodResolver(personalLoginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onPersonal = (data: PersonalLoginData) => {
    console.log('Personal login:', data);
    navigate('/');
  };

  // ── Corporate form ──────────────────────────────────────
  const cForm = useForm<CorporateLoginData>({
    resolver: zodResolver(corporateLoginSchema),
    defaultValues: { username: '', password: '', organizationId: '' },
  });

  const onCorporate = (data: CorporateLoginData) => {
    console.log('Corporate login:', data);
    navigate('/');
  };

  return (
    <div className="flex min-h-screen font-sans">
      {/* ═══════════════════════════════════════════════
          LEFT PANEL  (~30% width, white)
      ═══════════════════════════════════════════════ */}
      <div
        className="w-full lg:w-[380px] xl:w-[420px] flex-shrink-0 flex flex-col items-center justify-start pt-14 px-10 bg-white shadow-lg z-10"
        style={{ minHeight: '100vh' }}
      >
        {/* Logo */}
        <button
          onClick={() => navigate('/')}
          className="mb-8"
        >
          <img src="/logo.png" alt="RiversPay Logo" className="h-[76px] object-contain mx-auto" />
        </button>

        {/* Subtitle */}
        <p className="text-slate-500 text-sm text-center mb-8">
          Please select your account type to login
        </p>

        {/* ── Tabs (matching Remita underline style) ── */}
        <div className="flex w-full border-b border-slate-200 mb-8">
          <button
            onClick={() => setTab('personal')}
            className={`flex items-center gap-2 flex-1 justify-center pb-3 text-sm font-semibold transition-all ${
              tab === 'personal'
                ? 'text-[#1a9e87] border-b-2 border-[#1a9e87] -mb-px'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <User className="w-4 h-4" />
            Personal/MSME
          </button>
          <button
            onClick={() => setTab('corporate')}
            className={`flex items-center gap-2 flex-1 justify-center pb-3 text-sm font-semibold transition-all ${
              tab === 'corporate'
                ? 'text-[#1a9e87] border-b-2 border-[#1a9e87] -mb-px'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Building2 className="w-4 h-4" />
            Corporate
          </button>
        </div>

        {/* ── Personal Form ── */}
        {tab === 'personal' && (
          <form
            key="personal"
            onSubmit={pForm.handleSubmit(onPersonal)}
            className="w-full space-y-4"
          >
            <div>
              <input
                {...pForm.register('email')}
                type="email"
                placeholder="Email *"
                className={INPUT}
              />
              {pForm.formState.errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {pForm.formState.errors.email.message}
                </p>
              )}
            </div>

            <div className="relative">
              <input
                {...pForm.register('password')}
                type={showPass ? 'text' : 'password'}
                placeholder="Password *"
                className={`${INPUT} pr-10`}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
              {pForm.formState.errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {pForm.formState.errors.password.message}
                </p>
              )}
            </div>

            {/* Login button (teal rounded pill) */}
            <button
              type="submit"
              className="w-full py-3 bg-[#1a9e87] text-white text-sm font-semibold rounded-full hover:bg-[#158070] active:scale-95 transition-all mt-2"
            >
              Login
            </button>

            {/* Footer links */}
            <div className="text-center space-y-3 pt-2">
              <a href="#" className="block text-sm text-[#1a9e87] hover:underline">
                Forgot Password?
              </a>
              <p className="text-xs text-slate-400">
                Don't have an account?{' '}
                <Link to="/get-started" className="text-[#1a9e87] font-semibold hover:underline">
                  Create Account
                </Link>
              </p>
            </div>
          </form>
        )}

        {/* ── Corporate Form ── */}
        {tab === 'corporate' && (
          <form
            key="corporate"
            onSubmit={cForm.handleSubmit(onCorporate)}
            className="w-full space-y-4"
          >
            <div>
              <input
                {...cForm.register('username')}
                type="text"
                placeholder="Username *"
                className={INPUT}
              />
              {cForm.formState.errors.username && (
                <p className="text-red-500 text-xs mt-1">
                  {cForm.formState.errors.username.message}
                </p>
              )}
            </div>

            <div>
              <input
                {...cForm.register('organizationId')}
                type="text"
                placeholder="Organization ID *"
                className={INPUT}
              />
              {cForm.formState.errors.organizationId && (
                <p className="text-red-500 text-xs mt-1">
                  {cForm.formState.errors.organizationId.message}
                </p>
              )}
            </div>

            <div className="relative">
              <input
                {...cForm.register('password')}
                type={showPass ? 'text' : 'password'}
                placeholder="Password *"
                className={`${INPUT} pr-10`}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
              {cForm.formState.errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {cForm.formState.errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#1a9e87] text-white text-sm font-semibold rounded-full hover:bg-[#158070] active:scale-95 transition-all mt-2"
            >
              Login
            </button>

            <div className="text-center space-y-3 pt-2">
              <a href="#" className="block text-sm text-[#1a9e87] hover:underline">
                Forgot Password?
              </a>
              <p className="text-xs text-slate-400">
                Don't have an account?{' '}
                <Link to="/get-started" className="text-[#1a9e87] font-semibold hover:underline">
                  Create Account
                </Link>
              </p>
            </div>
          </form>
        )}

        {/* Bottom links */}
        <div className="mt-auto pt-12 pb-8 text-center text-xs text-slate-400 space-x-4">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <span>·</span>
          <a href="#" className="hover:underline">Terms of Use</a>
          <span>·</span>
          <a href="#" className="hover:underline">Contact Us</a>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          RIGHT PANEL  (full scenic photo like Remita)
      ═══════════════════════════════════════════════ */}
      <div className="hidden lg:block flex-1 relative overflow-hidden">
        {/* Background photo – using a lush tropical/nature scene similar to Remita */}
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80"
          alt="RiversPay background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Subtle dark overlay at bottom for any text */}
        <div className="absolute inset-0 bg-black/10" />

        {/* Back to home button (top-right, like Remita) */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-6 right-6 text-white/80 hover:text-white text-sm font-medium bg-black/20 backdrop-blur-md px-4 py-1.5 rounded-full transition-all hover:bg-black/30"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
}
