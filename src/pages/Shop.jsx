import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { productService } from '../services/productService';
import { Search, SlidersHorizontal, Sparkles } from 'lucide-react';

const CATEGORIES = ['All', 'Extrait de Parfum', 'Eau de Parfum', 'Parfum', 'Eau de Toilette'];

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [ordering, setOrdering] = useState('featured');

  useEffect(() => {
    setLoading(true);
    productService
      .getProducts({
        category: selectedCategory,
        search: search,
        ordering: ordering,
      })
      .then((data) => setProducts(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [selectedCategory, search, ordering]);

  return (
    <div className="bg-[#070709] min-h-screen text-white pt-28 pb-20">
      <div className="container mx-auto px-6">
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            Haute Parfumerie Vault
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-semibold mt-3 mb-4">
            The Complete Collection
          </h1>
          <p className="text-gray-400 text-sm font-light">
            Browse our artisanal lineup of extraits, rare absolutes, and seasonal olfactory compositions.
          </p>
        </div>

        {/* Controls: Search, Category Tabs, Sorting */}
        <div className="glass-panel p-4 sm:p-6 rounded-2xl border border-white/10 mb-10 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search notes, names, or houses..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#111218] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            {/* Sort Select */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-end">
              <SlidersHorizontal className="w-4 h-4 text-[#d4af37]" />
              <select
                value={ordering}
                onChange={(e) => setOrdering(e.target.value)}
                className="bg-[#111218] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
              >
                <option value="featured">Featured First</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wider transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-[#d4af37] text-black font-semibold shadow-md'
                    : 'glass-panel text-gray-300 hover:text-white hover:border-[#d4af37]/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-96 rounded-2xl bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 glass-card rounded-2xl">
            <p className="font-serif text-xl text-gray-300 mb-2">No fragrances found</p>
            <p className="text-xs text-gray-500">Try adjusting your search criteria or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

