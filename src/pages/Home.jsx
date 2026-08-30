import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import ProductCard from '../components/ProductCard';
import { productService } from '../services/productService';
import { Sparkles, Shield, Droplets, Compass, ArrowRight, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productService.getProducts()
      .then((data) => setProducts(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const featured = products.slice(0, 3);
  const arrivals = products.slice(3, 6);

  return (
    <div className="bg-[#050608] text-white">
      {/* 3D Carousel Hero Section */}
      <HeroSection />

      {/* Brand Ethos & Highlights Bar (Deep Midnight Navy & Charcoal) */}
      <section className="py-14 border-y border-white/10 bg-[#080b12]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-[#d4af37] border border-[#d4af37]/30 shadow-lg shrink-0">
                <Droplets className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-semibold text-white">35% Pure Extrait Oil</h4>
                <p className="text-xs text-gray-300">Highest luxury concentration</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-[#2dd4bf] border border-[#2dd4bf]/30 shadow-lg shrink-0">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-semibold text-white">Grasse Distillation</h4>
                <p className="text-xs text-gray-300">Centuries of French mastery</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-[#e8a598] border border-[#e8a598]/30 shadow-lg shrink-0">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-semibold text-white">Ethically Harvested</h4>
                <p className="text-xs text-gray-300">100% sustainable botanical resins</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-[#f0d57e] border border-[#f0d57e]/30 shadow-lg shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-semibold text-white">Heavy Flacon Crystal</h4>
                <p className="text-xs text-gray-300">Polished metallic cap finishes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Masterpieces (Charcoal & Jet Black) */}
      <section className="py-24 container mx-auto px-6 bg-[#050608]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" /> Curated Masterpieces
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-white mt-2">
              Signature Fragrance Vault
            </h2>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#f0d57e] hover:text-white mt-4 md:mt-0 font-bold group"
          >
            View Full Catalogue
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-96 rounded-2xl bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Artisanal Heritage Showcase Banner (Deep Navy Gradient) */}
      <section id="artisans" className="py-24 bg-gradient-to-r from-[#06080e] via-[#0c101c] to-[#06080e] border-y border-white/10 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold">
                The Alchemy of Haute Parfumerie
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-white leading-tight">
                Crafted in Grasse. <br />
                Aged to <span className="gold-gradient-text italic">Absolute Perfection</span>.
              </h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-light">
                Each bottle of ÉLIXIR is patient craftsmanship manifested. We source harvested May Roses at dawn, 
                extract Cambodian resin aged for three decades, and blend in micro-batches to preserve the living spirit of the raw botanicals.
              </p>
              <div className="pt-4 flex items-center gap-4">
                <Link
                  to="/shop"
                  className="btn-gold px-8 py-4 rounded-full text-xs uppercase tracking-widest inline-flex items-center gap-2"
                >
                  Explore The Notes <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/shop"
                  className="btn-teal px-8 py-4 rounded-full text-xs uppercase tracking-widest inline-flex items-center gap-2"
                >
                  Private Reserves
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-video lg:aspect-square rounded-3xl overflow-hidden glass-card p-2 border border-[#d4af37]/30 shadow-2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=1200"
                alt="Artisan Perfumery"
                className="w-full h-full object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050608]/90 via-transparent to-transparent rounded-2xl flex items-end p-8">
                <div>
                  <p className="font-serif text-xl text-white font-medium">Bespoke Extraction Chamber</p>
                  <p className="text-xs text-[#f0d57e]">Laboratory 04, Provence, France</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-24 container mx-auto px-6 bg-[#050608]">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#e8a598] font-semibold">
            Limited Batch Allocation
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-white mt-2">
            The Private Reserves
          </h2>
          <p className="text-gray-300 text-xs sm:text-sm mt-3 font-light">
            Numbered flacons distilled in limited batches with certificate of origin.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {arrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
