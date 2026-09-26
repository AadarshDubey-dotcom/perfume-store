import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[white] border-t border-[#DBE2EF]/20 text-[#DBE2EF] pt-16 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full border border-[#3F72AF] flex items-center justify-center bg-[#112D4E] shadow-md">
                <img src="/Masculity1.jpg" alt="MASCULITY Logo" className="w-full h-full object-cover rounded-full" />
              </div>
              <span className="font-serif text-2xl tracking-[0.2em] font-semibold text-[black]">
                MASCULITY
              </span>
            </Link>
            <p className="text-sm font-light text-[black] leading-relaxed max-w-sm">
              Crafting extraordinary sensorial memories through bespoke botanical extractions, 
              rare sapphire agarwoods, and haute French perfumery heritage.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="https://www.instagram.com/the_masculinityco?igsi=aHVlaHFweWM2YW5m" className="w-9 h-9 rounded-full glass-panel flex items-center justify-center text-[#DBE2EF] hover:text-[#F9F7F7] hover:bg-[#3F72AF] transition-all border border-[#DBE2EF]/20">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full glass-panel flex items-center justify-center text-[#DBE2EF] hover:text-[#F9F7F7] hover:bg-[#3F72AF] transition-all border border-[#DBE2EF]/20">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-sm uppercase tracking-widest text-[black] mb-4">Maison</h4>
            <ul className="space-y-2 text-[black] text-xs font-light tracking-wide">
              <li><Link to="/shop" className="hover:text-[#F9F7F7] transition-colors">Extrait de Parfum</Link></li>
              <li><Link to="/shop" className="hover:text-[#F9F7F7] transition-colors">Private Reserves</Link></li>
              <li><Link to="/shop" className="hover:text-[#F9F7F7] transition-colors">Discovery Sets</Link></li>
              <li><Link to="/shop" className="hover:text-[#F9F7F7] transition-colors">Bespoke Formulations</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-serif text-sm uppercase tracking-widest text-[black] mb-4">Concierge</h4>
            <ul className="space-y-2 text-[black] text-xs font-light tracking-wide">
              <li><a href="#" className="hover:text-[#F9F7F7] transition-colors">Complimentary Consultation</a></li>
              <li><a href="#" className="hover:text-[#F9F7F7] transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-[#F9F7F7] transition-colors">Track Order</a></li>
              <li><a href="#" className="hover:text-[#F9F7F7] transition-colors">Authenticity Guarantee</a></li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h4 className="font-serif text-sm uppercase tracking-widest text-[black] mb-4">The Gazette</h4>
            <p className="text-xs text-[black] mb-3 font-light">Subscribe for rare bottle allocations and private salon invites.</p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Merci! You have been subscribed to our private allocations.'); }} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  className="w-full bg-[#112D4E] border border-[#DBE2EF]/30 rounded-xl px-4 py-2.5 text-xs text-[#F9F7F7] placeholder-[#DBE2EF]/60 focus:outline-none focus:border-[#3F72AF]"
                />
                <button
                  type="submit"
                  className="btn-royal absolute right-1.5 top-1.5 p-1.5 rounded-lg"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="border-t border-[#DBE2EF]/10 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs font-light text-[black]/80 gap-4">
          <p>© {new Date().getFullYear()} MASCULITY luxury perfume house. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#F9F7F7] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#F9F7F7] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[#F9F7F7] transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
