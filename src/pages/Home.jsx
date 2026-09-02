import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import HeroSection from '../components/HeroSection';
import { productService } from '../services/productService';
import { Sparkles, ArrowRight } from 'lucide-react';
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

  return (
    <div className="bg-white text-gray-900 height-full">
      {/* Hero Section with Video Background */}
      <HeroSection />

      {/* Featured Perfumes - Minimal Grid */}
      <section className="py-20 border-t border-b border-gray-200">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-serif text-3xl sm:text-4xl font-light text-gray-900 mb-16 text-center"
          >
            Signature Collection
          </motion.h2>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-96 bg-gray-100 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {featured.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="group"
                >
                  <Link to={`/product/${product.id}`} className="block">
                    <div className="relative overflow-hidden bg-gray-100 rounded-lg mb-6 h-80 flex items-center justify-center">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <Sparkles className="w-16 h-16 text-gray-300" />
                      )}
                    </div>
                    <h3 className="font-serif text-xl font-light text-gray-900 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 font-light mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-medium text-gray-900">
                        ₹{product.price}
                      </span>
                      <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold">
                        View
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section - Minimal */}
      <section className="py-20 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center max-w-xl mx-auto"
        >
          <p className="text-sm uppercase tracking-[0.2em] text-gold-400 font-semibold mb-4">
            Curated Experience
          </p>
          <h2 className="font-serif text-4xl font-light text-gray-900 mb-6">
            Discover Your Signature Scent
          </h2>
          <p className="text-gray-600 font-light mb-8 text-lg">
            Browse our complete collection of rare and exclusive fragrances.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-gold-400 hover:text-gray-900 transition-colors text-sm uppercase tracking-widest font-medium group"
          >
            Shop All Fragrances
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
