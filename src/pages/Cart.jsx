import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, ArrowRight, ShoppingBag, ShieldCheck, Sparkles, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, subtotal, shipping, total, clearCart } = useCart();
  const [promo, setPromo] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [checkedOut, setCheckedOut] = useState(false);

  const applyPromo = (e) => {
    e.preventDefault();
    if (promo.trim().toUpperCase() === 'LUXE20') {
      setDiscount(subtotal * 0.2);
      setPromoApplied(true);
    } else {
      alert('Invalid code. Try "LUXE20" for 20% off.');
    }
  };

  const finalTotal = Math.max(0, total - discount);

  if (checkedOut) {
    return (
      <div className="bg-[#070709] min-h-screen text-white pt-36 pb-20 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card rounded-3xl p-10 max-w-lg text-center border border-[#d4af37]/40 shadow-2xl"
        >
          <div className="w-16 h-16 rounded-full bg-[#d4af37]/20 border border-[#d4af37] text-[#d4af37] flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-3xl font-semibold mb-3">Command Confirmed</h2>
          <p className="text-gray-300 text-sm mb-6 leading-relaxed">
            Merci! Your bespoke order has been registered in our Grasse atelier. A confirmation receipt has been dispatched to your email.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#d4af37] text-black font-semibold text-xs uppercase tracking-widest hover:bg-[#ebdca4] transition-all"
          >
            Continue Exploring <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="bg-[#070709] min-h-screen text-white pt-36 pb-20 flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <div className="w-16 h-16 rounded-full glass-panel flex items-center justify-center text-[#d4af37] mx-auto mb-6 border border-white/10">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-3xl font-semibold mb-3">Your Bag is Empty</h2>
          <p className="text-gray-400 text-sm mb-8 font-light">
            You haven't added any fragrances to your personal bag yet.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#d4af37] text-black font-semibold text-xs uppercase tracking-widest hover:bg-[#ebdca4] transition-all shadow-lg"
          >
            Explore Collection <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#070709] min-h-screen text-white pt-28 pb-20">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-10 pb-4 border-b border-white/10">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-mono">
              Artisanal Selection
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-semibold mt-1">
              Your Shopping Bag
            </h1>
          </div>
          <button
            onClick={clearCart}
            className="text-xs uppercase tracking-wider text-gray-400 hover:text-red-400 transition-colors"
          >
            Empty Bag
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Item List */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <motion.div
                layout
                key={`${item.product.id}-${item.size}`}
                className="glass-card rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-6 border border-white/10"
              >
                <div className="w-24 h-28 bg-[#13141a] rounded-xl flex items-center justify-center p-2 shrink-0 border border-white/5">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-contain drop-shadow"
                  />
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#d4af37]">
                    {item.product.brand}
                  </span>
                  <h3 className="font-serif text-lg font-semibold text-white">
                    {item.product.name}
                  </h3>
                  <p className="text-xs text-gray-400 font-light mb-2">
                    Size: {item.size} • {item.product.category}
                  </p>
                  <p className="text-sm font-serif font-bold text-[#dfc572]">
                    ${item.product.price}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center glass-panel rounded-full px-3 py-1 border border-white/10">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                      className="text-gray-300 hover:text-white px-2 font-bold"
                    >
                      -
                    </button>
                    <span className="px-3 text-xs font-semibold font-mono">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                      className="text-gray-300 hover:text-white px-2 font-bold"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.product.id, item.size)}
                    className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary Box */}
          <div className="space-y-6">
            <div className="glass-card rounded-2xl p-6 border border-[#d4af37]/30 space-y-4">
              <h3 className="font-serif text-xl font-semibold border-b border-white/10 pb-3">
                Order Summary
              </h3>

              <div className="space-y-2.5 text-xs text-gray-300">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-white">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>White Glove Shipping</span>
                  <span>{shipping === 0 ? <span className="text-emerald-400 font-bold uppercase">Free</span> : `$${shipping}`}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Privilege Promo (20%)</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t border-white/10 pt-3 flex justify-between text-base font-serif font-bold text-[#dfc572]">
                  <span>Total Due</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Promo Code Form */}
              <form onSubmit={applyPromo} className="pt-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Promo code (LUXE20)"
                    value={promo}
                    onChange={(e) => setPromo(e.target.value)}
                    className="flex-1 bg-[#121319] border border-white/10 rounded-xl px-3 py-2 text-xs text-white uppercase placeholder-gray-500 focus:outline-none focus:border-[#d4af37]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-[#d4af37] hover:text-black text-xs font-semibold uppercase tracking-wider transition-all"
                  >
                    Apply
                  </button>
                </div>
                {promoApplied && <p className="text-[11px] text-emerald-400 mt-1">20% discount applied!</p>}
              </form>

              {/* Checkout Button */}
              <button
                onClick={() => {
                  setCheckedOut(true);
                  clearCart();
                }}
                className="w-full py-4 rounded-full bg-gradient-to-r from-[#dfc572] via-[#d4af37] to-[#b99326] text-black font-semibold text-xs uppercase tracking-widest hover:shadow-[0_0_25px_rgba(212,175,55,0.45)] hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-3 border-t border-white/10 flex items-center justify-center gap-2 text-[11px] text-gray-400">
                <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                <span>256-bit Encrypted Secure Transaction</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

