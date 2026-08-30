import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#060608] border-t border-white/10 text-gray-400 pt-16 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full border border-[#d4af37] flex items-center justify-center bg-black/40">
                <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              </div>
              <span className="font-serif text-2xl tracking-[0.2em] font-semibold text-white">
                MASCULINITY
              </span>
            </Link>
            <p className="text-sm font-light text-gray-400 leading-relaxed max-w-sm">
              Crafting extraordinary sensorial memories through bespoke botanical extractions, 
              rare agarwoods, and haute French perfumery heritage.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="w-9 h-9 rounded-full glass-panel flex items-center justify-center text-gray-300 hover:text-[#d4af37] hover:border-[#d4af37] transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full glass-panel flex items-center justify-center text-gray-300 hover:text-[#d4af37] hover:border-[#d4af37] transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full glass-panel flex items-center justify-center text-gray-300 hover:text-[#d4af37] hover:border-[#d4af37] transition-all">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-sm uppercase tracking-widest text-white mb-4">Maison</h4>
            <ul className="space-y-2.5 text-xs font-light tracking-wide">
              <li><Link to="/shop" className="hover:text-[#d4af37] transition-colors">Extrait de Parfum</Link></li>
              <li><Link to="/shop" className="hover:text-[#d4af37] transition-colors">Private Reserves</Link></li>
              <li><Link to="/shop" className="hover:text-[#d4af37] transition-colors">Discovery Sets</Link></li>
              <li><Link to="/shop" className="hover:text-[#d4af37] transition-colors">Bespoke Formulations</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-serif text-sm uppercase tracking-widest text-white mb-4">Concierge</h4>
            <ul className="space-y-2.5 text-xs font-light tracking-wide">
              <li><a href="#" className="hover:text-[#d4af37] transition-colors">Complimentary Consultation</a></li>
              <li><a href="#" className="hover:text-[#d4af37] transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-[#d4af37] transition-colors">Track Order</a></li>
              <li><a href="#" className="hover:text-[#d4af37] transition-colors">Authenticity Guarantee</a></li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h4 className="font-serif text-sm uppercase tracking-widest text-white mb-4">The Gazette</h4>
            <p className="text-xs text-gray-400 mb-3">Subscribe for rare bottle allocations and private salon invites.</p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Merci! You have been subscribed to our private allocations.'); }} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  className="w-full bg-[#111218] border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37]"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 p-1.5 rounded-md bg-[#d4af37] text-black hover:bg-[#ebdca4] transition-colors"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs font-light text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} ÉLIXIR Haute Parfumerie Paris. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

