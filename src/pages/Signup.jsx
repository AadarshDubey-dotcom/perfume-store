import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles, ArrowRight, Lock, Mail, User, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { register, loading } = useAuth();
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
      setError(err?.detail || err?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-[#070709] text-white flex items-center justify-center px-6 pt-24 pb-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(212,175,55,0.08),transparent_60%)]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md glass-card rounded-3xl p-8 sm:p-10 border border-[#d4af37]/30 shadow-2xl relative z-10"
      >
        <div className="text-center mb-8">
          <div className="w-10 h-10 rounded-full border border-[#d4af37] flex items-center justify-center mx-auto mb-4 bg-black/50">
            <Sparkles className="w-5 h-5 text-[#d4af37]" />
          </div>
          <h1 className="font-serif text-3xl font-semibold mb-1">Join Maison ÉLIXIR</h1>
          <p className="text-xs text-gray-400 font-light">
            Receive exclusive allocations, discovery samples & private invitations
          </p>
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
              Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                placeholder="Lord Julian Vance"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#111218] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#d4af37]"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] uppercase tracking-widest text-gray-400 font-semibold block mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="julian@vance.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#111218] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#d4af37]"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] uppercase tracking-widest text-gray-400 font-semibold block mb-1.5">
              Password
            </label>
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

          <div>
            <label className="text-[11px] uppercase tracking-widest text-gray-400 font-semibold block mb-1.5">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-[#111218] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#d4af37]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-3.5 rounded-full bg-gradient-to-r from-[#dfc572] via-[#d4af37] to-[#b99326] text-black font-semibold text-xs uppercase tracking-widest hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
          >
            {loading ? 'Creating Account...' : (
              <>
                Create Collector Account <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/10 text-center text-xs text-gray-400">
          Already registered?{' '}
          <Link to="/login" className="text-[#dfc572] font-semibold hover:underline">
            Sign In Here
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

