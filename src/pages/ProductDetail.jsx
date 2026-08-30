import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productService } from '../services/productService';
import { useCart } from '../context/CartContext';
import { Star, Shield, ArrowLeft, ShoppingBag, Check, Droplet, Sparkles, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('100ml');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    setLoading(true);
    productService
      .getProductById(id)
      .then((data) => setProduct(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAdd = () => {
    if (!product) return;
    addToCart(product, quantity, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070709] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-[#d4af37] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#070709] text-white flex flex-col items-center justify-center gap-4">
        <p className="font-serif text-2xl">Fragrance not found</p>
        <Link to="/shop" className="text-xs uppercase tracking-widest text-[#d4af37] hover:underline">
          Return to Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#070709] min-h-screen text-white pt-28 pb-20">
      <div className="container mx-auto px-6">
        {/* Back Link */}
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gray-400 hover:text-[#d4af37] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Collection
        </Link>

        {/* Main Product Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Image Stage */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl p-8 sm:p-12 relative flex items-center justify-center bg-gradient-to-b from-[#181a24] to-[#0c0d12] border border-[#d4af37]/20 shadow-2xl"
          >
            <div className="absolute top-6 left-6 flex flex-col gap-2">
              {product.isNew && (
                <span className="px-3 py-1 rounded-full bg-[#d4af37] text-black text-xs font-bold uppercase tracking-wider">
                  New Arrival
                </span>
              )}
            </div>

            <img
              src={product.image}
              alt={product.name}
              className="max-h-[480px] w-auto object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.8)]"
            />
          </motion.div>

          {/* Product Meta & Actions */}
          <div className="space-y-6">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-mono">
                {product.brand}
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-white mt-1 mb-3">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1 text-[#dfc572]">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-bold text-white text-sm">{product.rating}</span>
                </div>
                <span className="text-gray-400">({product.reviewsCount || 100} Connoisseur Reviews)</span>
                <span className="text-gray-500">•</span>
                <span className="text-gray-300 font-mono">{product.category}</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4 pt-2 border-t border-white/10">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-[#dfc572]">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  ${product.originalPrice}
                </span>
              )}
              <span className="text-xs text-gray-400">Taxes & customs included</span>
            </div>

            {/* Description */}
            <p className="text-gray-300 text-sm leading-relaxed font-light">
              {product.description}
            </p>

            {/* Size / Flacon Volume Selection */}
            <div>
              <label className="text-xs uppercase tracking-widest text-gray-400 font-semibold block mb-3">
                Select Flacon Volume
              </label>
              <div className="flex gap-3">
                {['50ml', '100ml', '200ml Flacon'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-5 py-2.5 rounded-xl text-xs font-semibold tracking-wider transition-all duration-300 ${
                      selectedSize === size
                        ? 'bg-[#d4af37] text-black shadow-lg scale-105'
                        : 'glass-panel text-gray-300 hover:border-white/40'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <div className="flex items-center glass-panel rounded-full px-4 py-2 border border-white/20 w-fit">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="text-gray-300 hover:text-white px-2 py-1 font-bold text-lg"
                >
                  -
                </button>
                <span className="px-4 text-sm font-semibold font-mono">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="text-gray-300 hover:text-white px-2 py-1 font-bold text-lg"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAdd}
                className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-full font-semibold text-xs uppercase tracking-widest transition-all duration-300 ${
                  added
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gradient-to-r from-[#dfc572] via-[#d4af37] to-[#b99326] text-black hover:shadow-[0_0_25px_rgba(212,175,55,0.4)]'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" /> Added to Your Bag
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" /> Add to Bag • ${(product.price * quantity).toFixed(2)}
                  </>
                )}
              </button>
            </div>

            {/* Olfactory Pyramid Breakdown */}
            {product.notes && (
              <div className="glass-card rounded-2xl p-6 border border-[#d4af37]/20 mt-8 space-y-4">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#d4af37]">
                  <Droplet className="w-4 h-4" />
                  Olfactory Pyramid Breakdown
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="space-y-1">
                    <p className="font-semibold text-gray-200">Top Notes</p>
                    <p className="text-gray-400 font-light">{product.notes.top.join(', ')}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-semibold text-gray-200">Heart Notes</p>
                    <p className="text-gray-400 font-light">{product.notes.heart.join(', ')}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-semibold text-gray-200">Base Notes</p>
                    <p className="text-gray-400 font-light">{product.notes.base.join(', ')}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Maison Guarantees */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#d4af37]" />
                <span>Complimentary 2ml sample included</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#d4af37]" />
                <span>Signature gift packaging</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

