import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { createCodOrder } from '../services/orderService';
import { Trash2, ArrowRight, ShoppingBag, ShieldCheck, Check, X } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, subtotal, shipping, total, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [promo, setPromo] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [checkedOut, setCheckedOut] = useState(false);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [orderError, setOrderError] = useState('');
  const [paymentInitiated, setPaymentInitiated] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    name: user?.displayName || user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'Cash on Delivery',
  });

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

  const updateOrderDetails = (event) => {
    const { name, value } = event.target;
    setOrderDetails((current) => ({ ...current, [name]: value }));
    if (name === 'paymentMethod') {
      setPaymentInitiated(false);
    }
  };

  const handlePayment = () => {
    window.open('https://razorpay.me/@mayankpatankar', '_blank', 'noopener,noreferrer');
    setPaymentInitiated(true);
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setOrderError('');

    try {
      if (orderDetails.paymentMethod === 'Online Payment (Razorpay)' && !paymentInitiated) {
        throw new Error('Please complete the Razorpay payment first, then place your order.');
      }

      const orderData = {
        name: orderDetails.name,
        address: orderDetails.address,
        phone: orderDetails.phone,
        city: orderDetails.city,
        postalCode: orderDetails.postalCode,
        items: cart.map((item) => ({
          productId: item.product.id,
          name: item.product.name,
          size: item.size,
          quantity: item.quantity,
          price: item.product.price,
        })),
        product: cart.map((item) => `${item.product.name} (${item.size})`).join(', '),
        quantity: cart.reduce((count, item) => count + item.quantity, 0),
        shipping,
        total: finalTotal,
      };
      const result = await createCodOrder({
        ...orderData,
        paymentMethod: orderDetails.paymentMethod,
        user,
      });
      setOrderId(result.id);
      setEmailSent(result.emailSent);
      setShowOrderDetails(false);
      setCheckedOut(true);
      clearCart();
    } catch (error) {
      setOrderError(error.message || 'Unable to place your order. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (checkedOut) {
    return (
      <div className="bg-[#F2EFE7] min-h-screen text-[#112D4E] pt-36 pb-20 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card rounded-3xl p-10 max-w-lg text-center border border-[#DBE2EF] shadow-xl bg-white"
        >
          <div className="w-16 h-16 rounded-full bg-[#3F72AF]/20 border border-[#3F72AF] text-[#3F72AF] flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-[#3F72AF]" />
          </div>
          <h2 className="font-serif text-3xl font-bold mb-3 text-[#112D4E]">Command Confirmed</h2>
          <p className="text-[#112D4E]/80 text-sm mb-6 leading-relaxed">
            Thank you! Your custom perfume order has been recorded in our workshop in Indore, India.
          </p>
          <p className={`mb-6 rounded-xl border p-3 text-xs font-semibold ${emailSent ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-amber-200 bg-amber-50 text-amber-700'}`}>
            {emailSent ? 'Order details were sent to harshpandat014@gmail.com.' : 'Order saved successfully. Email notification is not configured yet.'}
          </p>
          <div className="mb-6 rounded-xl border border-[#DBE2EF] bg-[#F2EFE7] p-4 text-left text-xs text-[#112D4E]/80">
            <div className="mb-2 flex justify-between gap-4">
              <span>Order ID</span>
              <strong className="break-all text-right text-[#112D4E]">{orderId}</strong>
            </div>
            <div className="mb-2 flex justify-between gap-4">
              <span>Delivering to</span>
              <strong className="text-right text-[#112D4E]">{orderDetails.name}, {orderDetails.city}</strong>
            </div>
            <div className="mb-2 flex justify-between gap-4">
              <span>Payment</span>
              <strong className="text-right text-[#112D4E]">{orderDetails.paymentMethod}</strong>
            </div>
            <div className="flex justify-between gap-4 border-t border-[#DBE2EF] pt-2 font-bold text-[#112D4E]">
              <span>Order total</span>
              <span>₹{finalTotal.toFixed(2)}</span>
            </div>
          </div>
          <Link
            to="/shop"
            className="btn-royal inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs uppercase tracking-widest"
          >
            Continue Exploring <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="bg-[white] min-h-screen text-[#112D4E] pt-36 pb-20 flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <div className="w-16 h-16 rounded-full glass-panel flex items-center justify-center text-[#3F72AF] mx-auto mb-6 border border-[#DBE2EF] bg-white shadow-sm">
            <ShoppingBag className="w-8 h-8 text-[#3F72AF]" />
          </div>
          <h2 className="font-serif text-3xl font-bold mb-3 text-[#112D4E]">Your Bag is Empty</h2>
          <p className="text-[#112D4E]/70 text-sm mb-8 font-medium">
            You haven't added any fragrances to your personal bag yet.
          </p>
          <Link
            to="/shop"
            className="btn-royal inline-flex items-center gap-3 px-8 py-4 rounded-full text-xs uppercase tracking-widest shadow-md"
          >
            Explore Collection <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[white] min-h-screen text-[#112D4E] pt-28 pb-20">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-10 pb-4 border-b border-[#DBE2EF]">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#3F72AF] font-mono font-bold">
              Artisanal Selection
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold mt-1 text-[#112D4E]">
              Your Shopping Bag
            </h1>
          </div>
          <button
            onClick={clearCart}
            className="text-xs uppercase tracking-wider text-[#112D4E]/70 hover:text-red-600 transition-colors font-semibold"
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
                className="glass-card rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-6 border border-[#DBE2EF] bg-white shadow-sm"
              >
                <div className="w-24 h-28 bg-[#F2EFE7] rounded-xl flex items-center justify-center p-2 shrink-0 border border-[#DBE2EF]">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-contain drop-shadow"
                  />
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#3F72AF] font-bold">
                    {item.product.brand}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#112D4E]">
                    {item.product.name}
                  </h3>
                  <p className="text-xs text-[#112D4E]/70 font-medium mb-2">
                    Size: {item.size} • {item.product.category}
                  </p>
                  <p className="text-sm font-serif font-bold text-[#112D4E]">
                    ₹{item.product.price}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center glass-panel rounded-full px-3 py-1 border border-[#DBE2EF] bg-[#F2EFE7]">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                      className="text-[#112D4E] hover:text-[#3F72AF] px-2 font-bold"
                    >
                      -
                    </button>
                    <span className="px-3 text-xs font-bold font-mono text-[#112D4E]">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                      className="text-[#112D4E] hover:text-[#3F72AF] px-2 font-bold"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.product.id, item.size)}
                    className="p-2 text-[#112D4E]/60 hover:text-red-600 transition-colors"
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
            <div className="glass-card rounded-2xl p-6 border border-[#DBE2EF] space-y-4 bg-white shadow-md">
              <h3 className="font-serif text-xl font-bold text-[#112D4E] border-b border-[#DBE2EF] pb-3">
                Order Summary
              </h3>

              <div className="space-y-2.5 text-xs text-[#112D4E]/80 font-medium">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#112D4E]">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>White Glove Shipping</span>
                  <span>₹{shipping === 0 ? <span className="text-[#3F72AF] font-bold uppercase">Free</span> : `₹${shipping}`}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Privilege Promo (20%)</span>
                    <span>-₹{discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t border-[#DBE2EF] pt-3 flex justify-between text-base font-serif font-bold text-[#112D4E]">
                  <span>Total Due</span>
                  <span>₹{finalTotal.toFixed(2)}</span>
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
                    className="flex-1 bg-[#F2EFE7] border border-[#DBE2EF] rounded-xl px-3 py-2 text-xs text-[#112D4E] uppercase placeholder-[#112D4E]/50 focus:outline-none focus:border-[#3F72AF] font-semibold"
                  />
                  <button
                    type="submit"
                    className="btn-royal px-4 py-2 rounded-xl text-xs uppercase font-bold tracking-wider"
                  >
                    Apply
                  </button>
                </div>
                {promoApplied && <p className="text-[11px] text-emerald-600 font-bold mt-1">20% discount applied!</p>}
              </form>

              {/* Checkout Button */}
              <button
                onClick={() => {
                  if (!isAuthenticated) {
                    navigate('/login', { state: { from: { pathname: '/cart' } } });
                    return;
                  }
                  setShowOrderDetails(true);
                }}
                className="btn-royal w-full py-4 rounded-full text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-md"
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-3 border-t border-[#DBE2EF] flex items-center justify-center gap-2 text-[11px] text-[#112D4E]/70 font-medium">
                <ShieldCheck className="w-4 h-4 text-[#3F72AF]" />
                <span>256-bit Encrypted Secure Transaction</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showOrderDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#112D4E]/60 px-4 py-8 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="order-details-title"
            className="max-h-full w-full max-w-2xl overflow-y-auto rounded-2xl border border-[#DBE2EF] bg-white p-6 shadow-2xl sm:p-8"
          >
            <div className="mb-6 flex items-start justify-between border-b border-[#DBE2EF] pb-4">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#3F72AF] font-bold">
                  Almost Yours
                </span>
                <h2 id="order-details-title" className="font-serif text-2xl font-bold text-[#112D4E]">
                  Order Details
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setShowOrderDetails(false)}
                aria-label="Close order details"
                className="rounded-full p-2 text-[#112D4E]/60 transition-colors hover:bg-[#F2EFE7] hover:text-[#112D4E]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={placeOrder} className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ['name', 'Full name', 'text'],
                  ['email', 'Email address', 'email'],
                  ['phone', 'Phone number', 'tel'],
                  ['postalCode', 'Postal code', 'text'],
                  ['city', 'City', 'text'],
                ].map(([name, label, type]) => (
                  <label key={name} className={name === 'city' ? 'sm:col-span-2' : ''}>
                    <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#112D4E]/75">
                      {label}
                    </span>
                    <input
                      required
                      name={name}
                      type={type}
                      value={orderDetails[name]}
                      onChange={updateOrderDetails}
                      className="w-full rounded-xl border border-[#DBE2EF] bg-[#F2EFE7] px-3 py-3 text-sm text-[#112D4E] outline-none transition-colors focus:border-[#3F72AF]"
                    />
                  </label>
                ))}
                <label className="sm:col-span-2">
                  <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#112D4E]/75">
                    Product name
                  </span>
                  <input
                    readOnly
                    value={cart.map((item) => `${item.product.name} (${item.size})`).join(', ')}
                    className="w-full rounded-xl border border-[#DBE2EF] bg-[#F2EFE7] px-3 py-3 text-sm text-[#112D4E] outline-none"
                  />
                </label>
                <label>
                  <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#112D4E]/75">
                    Quantity
                  </span>
                  <input
                    readOnly
                    value={cart.reduce((count, item) => count + item.quantity, 0)}
                    className="w-full rounded-xl border border-[#DBE2EF] bg-[#F2EFE7] px-3 py-3 text-sm text-[#112D4E] outline-none"
                  />
                </label>
                <label className="sm:col-span-2">
                  <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#112D4E]/75">
                    Delivery address
                  </span>
                  <textarea
                    required
                    name="address"
                    value={orderDetails.address}
                    onChange={updateOrderDetails}
                    rows="3"
                    className="w-full resize-none rounded-xl border border-[#DBE2EF] bg-[#F2EFE7] px-3 py-3 text-sm text-[#112D4E] outline-none transition-colors focus:border-[#3F72AF]"
                  />
                </label>
                <label className="sm:col-span-2">
                  <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#112D4E]/75">
                    Payment method
                  </span>
                  <select
                    name="paymentMethod"
                    value={orderDetails.paymentMethod}
                    onChange={updateOrderDetails}
                    className="w-full rounded-xl border border-[#DBE2EF] bg-[#F2EFE7] px-3 py-3 text-sm text-[#112D4E] outline-none focus:border-[#3F72AF]"
                  >
                    <option>Cash on Delivery</option>
                    <option>Online Payment (Razorpay)</option>
                  </select>
                </label>
              </div>

              {orderError && (
                <p className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-600">
                  {orderError}
                </p>
              )}

              <div className="flex flex-col-reverse gap-3 border-t border-[#DBE2EF] pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setShowOrderDetails(false)}
                  className="btn-ice rounded-full px-6 py-3 text-xs uppercase tracking-wider"
                >
                  Back to bag
                </button>
                <button type="submit" disabled={submitting} className="btn-royal rounded-full px-6 py-3 text-xs uppercase tracking-wider disabled:cursor-not-allowed disabled:opacity-60">
                  {submitting ? 'Saving Order...' : orderDetails.paymentMethod === 'Online Payment (Razorpay)' ? 'Place Order After Payment' : `Place COD Order · ₹${finalTotal.toFixed(2)}`}
                </button>
                {orderDetails.paymentMethod === 'Online Payment (Razorpay)' && (
                  <button
                    type="button"
                    onClick={handlePayment}
                    className="rounded-full bg-[#3399cc] px-6 py-3 text-xs uppercase tracking-wider text-white transition-colors hover:bg-[#287fa8]"
                  >
                    {paymentInitiated ? 'Pay Again' : `Pay Now · ₹${finalTotal.toFixed(2)}`}
                  </button>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
