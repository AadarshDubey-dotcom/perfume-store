import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingBag, Eye } from 'lucide-react';
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
      className="group relative flex flex-col glass-card rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 border border-brand-ice hover:border-brand-accent bg-[#FFFFFF] shadow-sm hover:shadow-xl"
    >
      {/* Product Image Stage (Soft warm cream/ice gradient) */}
      <div className="relative aspect-4/5 bg-linear-to-b from-brand-bg via-[#f7f5ef] to-[#EAE6DC] overflow-hidden flex items-center justify-center p-6 border-b border-brand-ice/60">
        {/* Perfume Bottle Image with Zoom */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110 drop-shadow-[0_15px_25px_rgba(17,45,78,0.2)]"
          loading="lazy"
        />

        {/* Hover Quick Actions */}
        <div className="absolute inset-0 bg-brand-dark/30 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <Link
            to={`/product/${product.id}`}
            className="w-11 h-11 rounded-full bg-white text-brand-dark hover:bg-brand-accent hover:text-brand-light hover:scale-110 transition-all flex items-center justify-center shadow-xl border border-brand-ice"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </Link>
          <button
            onClick={() => addToCart(product, 1)}
            className="btn-royal w-11 h-11 rounded-full hover:scale-110 transition-all flex items-center justify-center shadow-xl font-bold"
            title="Quick Add to Bag"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-5 flex flex-col grow justify-between bg-white">
        <div>
          <div className="flex items-center justify-between text-xs text-brand-dark/70 mb-1.5">
            <span className="uppercase tracking-widest font-mono text-[11px] text-brand-accent font-bold">
              {product.brand}
            </span>
            <div className="flex items-center gap-1 text-brand-dark">
              <Star className="w-3.5 h-3.5 fill-brand-accent text-brand-accent" />
              <span className="font-bold text-brand-dark">{product.rating}</span>
            </div>
          </div>

          <Link to={`/product/${product.id}`}>
            <h3 className="font-serif text-base font-bold text-brand-dark group-hover:text-brand-accent transition-colors line-clamp-1 mb-1">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-brand-dark/70 line-clamp-1 font-normal mb-3">
            {product.category} • {product.volume}
          </p>
        </div>

        {/* Pricing & CTA Button */}
        <div className="flex items-center justify-between pt-3.5 border-t border-brand-ice">
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-lg font-bold text-brand-dark">
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-brand-dark/50 line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            className="btn-royal text-[11px] uppercase tracking-widest px-3.5 py-1.5 rounded-full shadow-sm  border-white/40 text-white hover:bg-white/10 transition-colors"
          >
            + Add to Bag
          </button>
        </div>
      </div>
    </motion.div>
  );
}
