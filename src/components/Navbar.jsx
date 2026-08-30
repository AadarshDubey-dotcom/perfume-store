import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, Menu, X, Sparkles, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { totalCount } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropdown(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Collection', path: '/shop' },
    { name: 'About Artisans', path: '/#artisans' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#070709]/90 backdrop-blur-md border-b border-[#d4af37]/20 py-3.5 shadow-2xl'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full border border-[#d4af37] flex items-center justify-center bg-black/40 group-hover:scale-105 transition-transform duration-300">
          <img 
          src="Masculity.png" 
          alt="Masculinity Logo" 
          className="w-10 h-10 rounded-full border border-[#d4af37] group-hover:scale-105 transition-transform duration-300" 
        />
          </div>
          <span className="font-serif text-2xl tracking-[0.25em] font-semibold text-white group-hover:text-[#d4af37] transition-colors">
            MASCULINITY
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 relative py-1 hover:text-[#d4af37] ${
                location.pathname === link.path ? 'text-[#d4af37]' : 'text-gray-300'
              }`}
            >
              {link.name}
              {location.pathname === link.path && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#d4af37]"
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Action Icons */}
        <div className="flex items-center gap-5">
          {/* Cart Icon with badge */}
          <Link
            to="/cart"
            className="relative p-2 rounded-full hover:bg-white/5 text-gray-200 hover:text-[#d4af37] transition-all"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-[#d4af37] text-black font-bold text-[10px] flex items-center justify-center animate-pulse">
                {totalCount}
              </span>
            )}
          </Link>

          {/* User Profile / Auth */}
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdown(!userDropdown)}
                className="flex items-center gap-2 p-1.5 rounded-full hover:bg-white/10 text-gray-200 border border-[#d4af37]/30 transition-all"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#b99326] to-[#dfc572] text-black font-bold text-xs flex items-center justify-center">
                  {user?.name?.[0]?.toUpperCase() || 'U'}
                </div>
              </button>

              {/* User Dropdown Menu */}
              <AnimatePresence>
                {userDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-3 w-52 glass-panel rounded-xl shadow-2xl p-2 border border-[#d4af37]/20 z-50"
                  >
                    <div className="px-3 py-2 border-b border-white/10">
                      <p className="text-xs text-gray-400">Signed in as</p>
                      <p className="text-sm font-medium text-white truncate">{user?.email || user?.name}</p>
                    </div>

                    <div className="py-1">
                      {isAdmin && (
                        <Link
                          to="/admin/dashboard"
                          className="flex items-center gap-2 px-3 py-2 text-xs text-[#d4af37] hover:bg-white/5 rounded-lg transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4" />
                          Admin Portal
                        </Link>
                      )}

                      <button
                        onClick={() => {
                          logout();
                          navigate('/login');
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-3">
              <Link
                to="/login"
                className="text-xs uppercase tracking-widest font-medium text-gray-300 hover:text-white px-3 py-2 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-xs uppercase tracking-widest font-semibold text-black bg-[#d4af37] hover:bg-[#e8c85e] px-4 py-2 rounded-full transition-all duration-300 shadow-md hover:scale-105"
              >
                Join Élite
              </Link>
            </div>
          )}

          {/* Mobile menu toggle button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-white"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0a0a0d] border-b border-[#d4af37]/20 px-6 py-6"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-sm font-medium tracking-wider text-gray-300 hover:text-[#d4af37]"
                >
                  {link.name}
                </Link>
              ))}

              {!isAuthenticated && (
                <div className="flex gap-4 pt-4 border-t border-white/10">
                  <Link
                    to="/login"
                    className="flex-1 py-2.5 text-center text-xs tracking-wider uppercase border border-white/20 text-white rounded-lg"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="flex-1 py-2.5 text-center text-xs tracking-wider uppercase bg-[#d4af37] text-black font-semibold rounded-lg"
                  >
                    Join
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

