import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { RecaptchaVerifier } from 'firebase/auth';
import { auth } from '../services/firebase';
import { Sparkles, ArrowRight, Lock, Mail, AlertCircle, Chrome, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [phoneConfirmation, setPhoneConfirmation] = useState(null);
  const [loginMode, setLoginMode] = useState('email');
  const [error, setError] = useState('');
  const { login, loginWithGoogle, sendPhoneOtp, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';
  const recaptchaVerifier = useRef(null);

  const clearRecaptcha = () => {
    recaptchaVerifier.current?.clear();
    recaptchaVerifier.current = null;
    const container = document.getElementById('recaptcha-container');
    if (container) container.innerHTML = '';
  };

  useEffect(() => () => clearRecaptcha(), []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await login({ email, password, username: email });
      navigate(from, { replace: true });
    } catch (err) {
      const messages = {
        'auth/operation-not-allowed': 'Email/Password sign-in is disabled in Firebase. Enable it in Firebase Console > Authentication > Sign-in method.',
        'auth/invalid-credential': 'Email or password is incorrect.',
        'auth/user-not-found': 'No account was found for this email.',
      };
      setError(messages[err?.code] || err?.detail || err?.message || 'Invalid credentials');
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    try {
      await loginWithGoogle();
      navigate(from, { replace: true });
    } catch (err) {
      setError(err?.code === 'auth/popup-closed-by-user' ? 'Google sign-in was cancelled.' : err?.message || 'Google sign-in failed');
    }
  };

  const handlePhoneLogin = async (event) => {
    event.preventDefault();
    setError('');
    try {
      if (!phoneConfirmation) {
        let normalizedPhone = phone.trim().replace(/\s+/g, '').replace(/^0(?=\d{10}$)/, '+91');
        if (/^\d{10}$/.test(normalizedPhone)) normalizedPhone = `+91${normalizedPhone}`;
        if (!/^\+\d{8,15}$/.test(normalizedPhone)) {
          setError('Enter a valid phone number, for example +919876543210.');
          return;
        }
        setPhone(normalizedPhone);
        if (!recaptchaVerifier.current) {
          recaptchaVerifier.current = new RecaptchaVerifier(auth, 'recaptcha-container', { size: 'invisible' });
        }
        const confirmation = await sendPhoneOtp(normalizedPhone, recaptchaVerifier.current);
        setPhoneConfirmation(confirmation);
      } else {
        await phoneConfirmation.confirm(otp);
        navigate(from, { replace: true });
      }
    } catch (err) {
      clearRecaptcha();
      const messages = {
        'auth/invalid-phone-number': 'Enter a valid phone number with country code, for example +919876543210.',
        'auth/invalid-verification-code': 'The OTP is incorrect.',
        'auth/operation-not-allowed': 'Phone sign-in is disabled. Enable Phone in Firebase Console > Authentication > Sign-in method.',
        'auth/app-not-authorized': 'This domain is not authorized for Firebase Phone Auth. Add it under Firebase Authentication > Settings > Authorized domains.',
        'auth/quota-exceeded': 'SMS quota exceeded for this Firebase project. Try again later.',
      };
      console.error('Firebase phone authentication failed:', err?.code, err?.message);
      setError(messages[err?.code] || 'Phone OTP could not be sent. Check the number format and Firebase Phone provider settings.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F2EFE7] text-[#112D4E] flex items-center justify-center px-6 pt-24 pb-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(63,114,175,0.1),transparent_60%)]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md glass-card rounded-3xl p-8 sm:p-10 border border-[#DBE2EF] shadow-xl relative z-10 bg-white"
      >
        <div className="text-center mb-8">
          <div className="w-10 h-10 rounded-full border border-[#3F72AF] flex items-center justify-center mx-auto mb-4 bg-[#F2EFE7]">
            <Sparkles className="w-5 h-5 text-[#3F72AF]" />
          </div>
          <h1 className="font-serif text-3xl font-bold mb-1 text-[#112D4E]">Maison ÉLIXIR</h1>
          <p className="text-xs text-[#112D4E]/70 font-medium">Sign in to your private collector account</p>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-xl bg-red-50 border border-red-200 flex items-center gap-2 text-xs text-red-600">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="mb-6 grid grid-cols-2 rounded-xl border border-[#DBE2EF] bg-[#F2EFE7] p-1">
          <button type="button" onClick={() => { clearRecaptcha(); setLoginMode('email'); setPhoneConfirmation(null); setError(''); }} className={`rounded-lg py-2 text-[11px] font-bold uppercase tracking-wider ${loginMode === 'email' ? 'bg-white text-[#112D4E] shadow-sm' : 'text-[#112D4E]/60'}`}>Email</button>
          <button type="button" onClick={() => { setLoginMode('phone'); setError(''); }} className={`rounded-lg py-2 text-[11px] font-bold uppercase tracking-wider ${loginMode === 'phone' ? 'bg-white text-[#112D4E] shadow-sm' : 'text-[#112D4E]/60'}`}>Phone OTP</button>
        </div>

        {loginMode === 'email' ? <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[11px] uppercase tracking-widest text-[#112D4E] font-bold block mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#3F72AF] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="connoisseur@elixir.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#F2EFE7] border border-[#DBE2EF] rounded-xl pl-10 pr-4 py-3 text-xs text-[#112D4E] placeholder-[#112D4E]/50 focus:outline-none focus:border-[#3F72AF] font-medium"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-[11px] uppercase tracking-widest text-[#112D4E] font-bold">
                Password
              </label>
              <a href="#" className="text-[11px] text-[#3F72AF] font-semibold hover:underline">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#3F72AF] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#F2EFE7] border border-[#DBE2EF] rounded-xl pl-10 pr-4 py-3 text-xs text-[#112D4E] placeholder-[#112D4E]/50 focus:outline-none focus:border-[#3F72AF] font-medium"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-royal w-full mt-4 py-3.5 rounded-full text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-md"
          >
            {loading ? 'Authenticating...' : (
              <>
                Sign In to Salon <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form> : <form onSubmit={handlePhoneLogin} className="space-y-4">
          <div>
            <label className="text-[11px] uppercase tracking-widest text-[#112D4E] font-bold block mb-1.5">Mobile Number</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-[#3F72AF] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input type="tel" required placeholder="+919876543210" value={phone} onChange={(e) => setPhone(e.target.value)} disabled={Boolean(phoneConfirmation)} className="w-full bg-[#F2EFE7] border border-[#DBE2EF] rounded-xl pl-10 pr-4 py-3 text-xs text-[#112D4E] placeholder-[#112D4E]/50 focus:outline-none focus:border-[#3F72AF] font-medium" />
            </div>
          </div>
          {phoneConfirmation && <div>
            <label className="text-[11px] uppercase tracking-widest text-[#112D4E] font-bold block mb-1.5">Verification Code</label>
            <input type="text" inputMode="numeric" autoComplete="one-time-code" required placeholder="Enter 6-digit OTP" value={otp} onChange={(e) => setOtp(e.target.value)} className="w-full bg-[#F2EFE7] border border-[#DBE2EF] rounded-xl px-4 py-3 text-xs text-[#112D4E] focus:outline-none focus:border-[#3F72AF] font-medium" />
          </div>}
          <button type="submit" disabled={loading} className="btn-royal w-full mt-4 py-3.5 rounded-full text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-md">
            {loading ? 'Please wait...' : phoneConfirmation ? <>Verify OTP <ArrowRight className="w-4 h-4" /></> : <>Send OTP <ArrowRight className="w-4 h-4" /></>}
          </button>
          <div id="recaptcha-container" />
        </form>}

        <div className="my-6 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-wider text-[#112D4E]/50">
          <span className="h-px flex-1 bg-[#DBE2EF]" />
          <span>or</span>
          <span className="h-px flex-1 bg-[#DBE2EF]" />
        </div>
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="btn-ice flex w-full items-center justify-center gap-3 rounded-full py-3.5 text-xs uppercase tracking-widest disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Chrome className="h-4 w-4 text-[#4285F4]" />
          Continue with Google
        </button>

        <div className="mt-8 pt-6 border-t border-[#DBE2EF] text-center text-xs text-[#112D4E]/70 font-medium">
          Not yet a member?{' '}
          <Link to="/signup" className="text-[#3F72AF] font-bold hover:underline">
            Request Private Membership
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
