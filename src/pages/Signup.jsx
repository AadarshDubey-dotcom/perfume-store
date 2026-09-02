import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles, ArrowRight, Lock, Mail, User, AlertCircle, Chrome } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { register, loginWithGoogle, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await register({ name, email, username: email, password });
      navigate('/shop');
    } catch (err) {
      const messages = {
        'auth/operation-not-allowed': 'Email/Password sign-in is disabled in Firebase. Enable it in Firebase Console > Authentication > Sign-in method.',
        'auth/email-already-in-use': 'An account already exists for this email.',
        'auth/weak-password': 'Use a password with at least 6 characters.',
      };
      setError(messages[err?.code] || err?.detail || err?.message || 'Registration failed');
    }
  };

  const handleGoogleSignup = async () => {
    setError('');
    try {
      await loginWithGoogle();
      navigate('/shop');
    } catch (err) {
      setError(err?.code === 'auth/popup-closed-by-user' ? 'Google sign-in was cancelled.' : err?.message || 'Google sign-in failed');
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
          <h1 className="font-serif text-3xl font-bold mb-1 text-[#112D4E]">Join Maison ÉLIXIR</h1>
          <p className="text-xs text-[#112D4E]/70 font-medium">
            Receive exclusive allocations, discovery samples & private invitations
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-xl bg-red-50 border border-red-200 flex items-center gap-2 text-xs text-red-600">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[11px] uppercase tracking-widest text-[#112D4E] font-bold block mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[#3F72AF] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                placeholder="Lord Julian Vance"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#F2EFE7] border border-[#DBE2EF] rounded-xl pl-10 pr-4 py-3 text-xs text-[#112D4E] placeholder-[#112D4E]/50 focus:outline-none focus:border-[#3F72AF] font-medium"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] uppercase tracking-widest text-[#112D4E] font-bold block mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#3F72AF] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="julian@vance.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#F2EFE7] border border-[#DBE2EF] rounded-xl pl-10 pr-4 py-3 text-xs text-[#112D4E] placeholder-[#112D4E]/50 focus:outline-none focus:border-[#3F72AF] font-medium"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] uppercase tracking-widest text-[#112D4E] font-bold block mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#3F72AF] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onClick={() => setShowPassword(!showPassword)}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#F2EFE7] border border-[#DBE2EF] rounded-xl pl-10 pr-4 py-3 text-xs text-[#112D4E] placeholder-[#112D4E]/50 focus:outline-none focus:border-[#3F72AF] font-medium"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] uppercase tracking-widest text-[#112D4E] font-bold block mb-1.5">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#3F72AF] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-[#F2EFE7] border border-[#DBE2EF] rounded-xl pl-10 pr-4 py-3 text-xs text-[#112D4E] placeholder-[#112D4E]/50 focus:outline-none focus:border-[#3F72AF] font-medium"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-royal w-full mt-4 py-3.5 rounded-full text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-md"
          >
            {loading ? 'Creating Account...' : (
              <>
                Create Collector Account <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-wider text-[#112D4E]/50">
          <span className="h-px flex-1 bg-[#DBE2EF]" />
          <span>or</span>
          <span className="h-px flex-1 bg-[#DBE2EF]" />
        </div>
        <button
          type="button"
          onClick={handleGoogleSignup}
          disabled={loading}
          className="btn-ice flex w-full items-center justify-center gap-3 rounded-full py-3.5 text-xs uppercase tracking-widest disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Chrome className="h-4 w-4 text-[#4285F4]" />
          Continue with Google
        </button>

        <div className="mt-8 pt-6 border-t border-[#DBE2EF] text-center text-xs text-[#112D4E]/70 font-medium">
          Already registered?{' '}
          <Link to="/login" className="text-[#3F72AF] font-bold hover:underline">
            Sign In Here
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
