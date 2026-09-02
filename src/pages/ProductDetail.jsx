import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productService } from '../services/productService';
import { useCart } from '../context/CartContext';
import { Star, Shield, ArrowLeft, ShoppingBag, Check, Droplet, Sparkles } from 'lucide-react';
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
      <div className="min-h-screen bg-[white] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-[#3F72AF] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[white] text-[#112D4E] flex flex-col items-center justify-center gap-4">
        <p className="font-serif text-2xl font-bold">Fragrance not found</p>
        <Link to="/shop" className="text-xs uppercase tracking-widest text-[#3F72AF] font-bold hover:underline">
          Return to Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[white] min-h-screen text-[#112D4E] pt-28 pb-20">
      <div className="container mx-auto px-6">
        {/* Back Link */}
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#112D4E]/80 hover:text-[#3F72AF] font-bold transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4 text-[#3F72AF]" />
          Back to Collection
        </Link>

        {/* Main Product Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Image Stage */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl p-8 sm:p-12 relative flex items-center justify-center bg-gradient-to-b from-[#FFFFFF] via-[#f7f5ef] to-[#EAE6DC] border border-[#DBE2EF] shadow-lg"
          >
            <div className="absolute top-6 left-6 flex flex-col gap-2">
              {product.isNew && (
                <span className="btn-royal px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  New Arrival
                </span>
              )}
            </div>

            <img
              src={product.image}
              alt={product.name}
              className="max-h-[480px] w-auto object-contain drop-shadow-[0_25px_35px_rgba(17,45,78,0.2)]"
            />
          </motion.div>

          {/* Product Meta & Actions */}
          <div className="space-y-6">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#3F72AF] font-mono font-bold">
                {product.brand}
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#112D4E] mt-1 mb-3">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-[#3F72AF] text-[#3F72AF]" />
                  <span className="font-bold text-[#112D4E] text-sm">{product.rating}</span>
                </div>
                <span className="text-[#112D4E]/70 font-medium">({product.reviewsCount || 100} Connoisseur Reviews)</span>
                <span className="text-[#112D4E]/30">•</span>
                <span className="text-[#3F72AF] font-mono font-bold">{product.category}</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4 pt-2 border-t border-[#DBE2EF]">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-[#112D4E]">
                 ₹{product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-[#112D4E]/50 line-through font-medium">
                   ₹{product.originalPrice}
                </span>
              )}
              <span className="text-xs text-[#112D4E]/70 font-medium">Taxes & white glove delivery included</span>
            </div>

            {/* Description */}
            <p className="text-[#112D4E]/80 text-sm leading-relaxed font-normal">
              {product.description}
            </p>

            {/* Size / Flacon Volume Selection */}
            <div>
              <label className="text-xs uppercase tracking-widest text-[#112D4E] font-bold block mb-3">
                Select Flacon Volume
              </label>
              <div className="flex gap-3">
                {['50ml', '100ml', '200ml Flacon'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold tracking-wider transition-all duration-300 ${
                      selectedSize === size
                        ? 'btn-royal shadow-md scale-105'
                        : 'glass-panel text-[#112D4E] hover:border-[#3F72AF]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <div className="flex items-center glass-panel rounded-full px-4 py-2 border border-[#DBE2EF] w-fit bg-white">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="text-[#112D4E] hover:text-[#3F72AF] px-2 py-1 font-bold text-lg"
                >
                  -
                </button>
                <span className="px-4 text-sm font-bold font-mono text-[#112D4E]">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="text-[#112D4E] hover:text-[#3F72AF] px-2 py-1 font-bold text-lg"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAdd}
                className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-full font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-md ${
                  added ? 'bg-emerald-600 text-white' : 'btn-royal'
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
              <div className="glass-card rounded-2xl p-6 border border-[#DBE2EF] mt-8 space-y-4 bg-white/80">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#3F72AF]">
                  <Droplet className="w-4 h-4 text-[#3F72AF]" />
                  Olfactory Pyramid Breakdown
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="space-y-1">
                    <p className="font-bold text-[#112D4E]">Top Notes</p>
                    <p className="text-[#112D4E]/70 font-medium">{product.notes.top.join(', ')}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-[#112D4E]">Heart Notes</p>
                    <p className="text-[#112D4E]/70 font-medium">{product.notes.heart.join(', ')}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-[#112D4E]">Base Notes</p>
                    <p className="text-[#112D4E]/70 font-medium">{product.notes.base.join(', ')}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Guarantees */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#DBE2EF] text-xs text-[#112D4E]/70 font-medium">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#3F72AF]" />
                <span>Complimentary 2ml sample included</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#3F72AF]" />
                <span>Signature gift packaging</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
