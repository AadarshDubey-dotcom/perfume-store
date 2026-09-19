import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { productService } from '../services/productService';
import { Search, SlidersHorizontal, Sparkles } from 'lucide-react';

const CATEGORIES = ['All', 'Apex', 'Intense', 'Tempt', 'Auren'];

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
    <div className="bg-[white] min-h-screen text-[#112D4E] pt-28 pb-20">
      <div className="container mx-auto px-6">
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-[#3F72AF] font-bold flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#3F72AF]" />
             Luxury perfume house Vault
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#112D4E] mt-3 mb-4">
            The Complete Collection
          </h1>
          <p className="text-[#112D4E]/80 text-sm font-normal">
            Explore our handcrafted perfumes made with strong extraits, rare natural absolutes, and seasonal blends.
          </p>
        </div>

        {/* Controls: Search, Category Tabs, Sorting */}
        <div className="glass-panel p-4 sm:p-6 rounded-2xl border border-[#DBE2EF] mb-10 space-y-4 bg-white shadow-md">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#3F72AF]" />
              <input
                type="text"
                placeholder="Search notes, names, or houses..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#F2EFE7] border border-[#DBE2EF] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#112D4E] placeholder-[#112D4E]/50 focus:outline-none focus:border-[#3F72AF] font-medium"
              />
            </div>

            {/* Sort Select */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-end">
              <SlidersHorizontal className="w-4 h-4 text-[#3F72AF]" />
              <select
                value={ordering}
                onChange={(e) => setOrdering(e.target.value)}
                className="bg-[#f4f2ec] border border-[#DBE2EF] rounded-xl px-4 py-2.5 text-xs text-[#112D4E] font-medium focus:outline-none focus:border-[#3F72AF]"
              >
                <option value="featured">Featured First</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-[#DBE2EF]">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'btn-royal'
                    : 'glass-panel text-[#112D4E] hover:border-[#3F72AF]'
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
              <div key={i} className="h-96 rounded-2xl bg-white animate-pulse border border-[#f4f7fc]" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 glass-card rounded-2xl bg-white">
            <p className="font-serif text-xl text-[#112D4E] mb-2 font-bold">No fragrances found</p>
            <p className="text-xs text-[#112D4E]/70">Try adjusting your search criteria or filters</p>
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
