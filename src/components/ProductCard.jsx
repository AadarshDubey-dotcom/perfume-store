import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingBag, Eye, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative flex flex-col glass-card rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 border border-white/10 hover:border-[#d4af37]/40 bg-[#0d0e14]"
    >
      {/* Product Image Stage (Charcoal / Navy Dark Gradient) */}
      <div className="relative aspect-[4/5] bg-gradient-to-b from-[#13151f] via-[#0d0f17] to-[#07080c] overflow-hidden flex items-center justify-center p-6">
        {/* Badges */}
        <div className="absolute top-3.5 left-3.5 z-10 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#f0d57e] to-[#d4af37] text-black text-[10px] font-bold tracking-wider uppercase shadow-lg">
              New
            </span>
          )}
          {product.isBestSeller && (
            <span className="px-3 py-1 rounded-full bg-black/70 border border-[#d4af37]/50 text-[#f0d57e] text-[10px] font-semibold tracking-wider uppercase backdrop-blur-md">
              Best Seller
            </span>
          )}
        </div>

        {/* Perfume Bottle Image with Zoom */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain object-center transition-transform duration-700 ease-out group-hover:scale-110 drop-shadow-[0_20px_30px_rgba(0,0,0,0.85)]"
          loading="lazy"
        />

        {/* Hover Quick Actions */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <Link
            to={`/product/${product.id}`}
            className="w-11 h-11 rounded-full glass-panel border border-white/30 text-white hover:text-[#d4af37] hover:border-[#d4af37] hover:scale-110 transition-all flex items-center justify-center shadow-xl"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </Link>
          <button
            onClick={() => addToCart(product, 1)}
            className="w-11 h-11 rounded-full btn-gold hover:scale-110 transition-all flex items-center justify-center shadow-xl font-bold"
            title="Quick Add to Bag"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Details Section (Rich Dark Charcoal) */}
      <div className="p-5 flex flex-col flex-grow justify-between bg-[#0a0b10]">
        <div>
          <div className="flex items-center justify-between text-xs text-gray-300 mb-1.5">
            <span className="uppercase tracking-widest font-mono text-[11px] text-[#d4af37] font-semibold">
              {product.brand}
            </span>
            <div className="flex items-center gap-1 text-amber-400">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="font-semibold text-white">{product.rating}</span>
            </div>
          </div>

          <Link to={`/product/${product.id}`}>
            <h3 className="font-serif text-base font-semibold text-white group-hover:text-[#d4af37] transition-colors line-clamp-1 mb-1">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-gray-300 line-clamp-1 font-light mb-3">
            {product.category} • {product.volume}
          </p>
        </div>

        {/* Pricing & Standout CTA Button */}
        <div className="flex items-center justify-between pt-3.5 border-t border-white/10">
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-lg font-bold text-[#f0d57e]">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            className="text-[11px] uppercase tracking-widest font-bold text-black bg-[#d4af37] hover:bg-[#f0d57e] transition-all px-3.5 py-1.5 rounded-full shadow-md hover:scale-105"
          >
            + Add to Bag
          </button>
        </div>
      </div>
    </motion.div>
  );
}
