import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles, ArrowRight, Lock, Mail, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await login({ email, password, username: email });
      navigate(from, { replace: true });
    } catch (err) {
      setError(err?.detail || err?.message || 'Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-[#070709] text-white flex items-center justify-center px-6 pt-24 pb-12 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(212,175,55,0.08),transparent_60%)]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md glass-card rounded-3xl p-8 sm:p-10 border border-[#d4af37]/30 shadow-2xl relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-10 h-10 rounded-full border border-[#d4af37] flex items-center justify-center mx-auto mb-4 bg-black/50">
            <Sparkles className="w-5 h-5 text-[#d4af37]" />
          </div>
          <h1 className="font-serif text-3xl font-semibold mb-1">Maison ÉLIXIR</h1>
          <p className="text-xs text-gray-400 font-light">Sign in to your private collector account</p>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2 text-xs text-red-300">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[11px] uppercase tracking-widest text-gray-400 font-semibold block mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="connoisseur@elixir.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#111218] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#d4af37]"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-[11px] uppercase tracking-widest text-gray-400 font-semibold">
                Password
              </label>
              <a href="#" className="text-[11px] text-[#dfc572] hover:underline">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#111218] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#d4af37]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-3.5 rounded-full bg-gradient-to-r from-[#dfc572] via-[#d4af37] to-[#b99326] text-black font-semibold text-xs uppercase tracking-widest hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
          >
            {loading ? 'Authenticating...' : (
              <>
                Sign In to Salon <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/10 text-center text-xs text-gray-400">
          Not yet a member?{' '}
          <Link to="/signup" className="text-[#dfc572] font-semibold hover:underline">
            Request Private Membership
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

