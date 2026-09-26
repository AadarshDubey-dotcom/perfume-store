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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 text-[white] ${
        scrolled
          ? 'bg-[white] backdrop-blur-md border-b border-[#DBE2EF] py-3.5 shadow-md'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-full border border-[black] flex items-center justify-center bg-[#F9F7F7] group-hover:bg-[white] transition-all duration-300 shadow-sm">
            <img src="/Masculity1.jpg" alt="MASCULITY Logo" className="w-full h-full object-cover rounded-full" />
          </div>
          <span className="font-serif text-2xl tracking-[0.25em] font-bold 
    transition-colors duration-300
    text-black 
    dark:text-white
    group-hover:text-[#d4af37]">
            MASCULINITY
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300 relative py-1 ] ${
                location.pathname === link.path ? 'text-[black] font-bold' : 'text-[black]/80'
              }`}
            >
              {link.name}
              {location.pathname === link.path && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[white] rounded-full"
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
            className="relative p-2.5 rounded-full glass-panel hover:bg-[#3F72AF]/20 text-[#112D4E] hover:text-[#3F72AF] border border-[#DBE2EF] transition-all shadow-sm"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#3F72AF] text-[#F9F7F7] font-bold text-[10px] flex items-center justify-center shadow-md animate-pulse">
                {totalCount}
              </span>
            )}
          </Link>

          {/* User Profile / Auth */}
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdown(!userDropdown)}
                className="flex items-center gap-2 p-1 rounded-full hover:bg-[#3F72AF]/20 text-[white] border border-[#DBE2EF] transition-all"
              >
                <div className="w-7 h-7 rounded-full bg-[#112D4E] text-[#F9F7F7] font-bold text-xs flex items-center justify-center shadow-md">
                  {(user?.displayName || user?.name || user?.email)?.[0]?.toUpperCase() || 'U'}
                </div>
              </button>

              {/* User Dropdown Menu */}
              <AnimatePresence>
                {userDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-3 w-52 glass-panel rounded-2xl shadow-2xl p-2.5 border border-[#DBE2EF] z-50 bg-[#F9F7F7]"
                  >
                    <div className="px-3 py-2 border-b border-[#DBE2EF]">
                      <p className="text-xs text-[#112D4E]/70">Signed in as</p>
                      <p className="text-sm font-semibold text-[#112D4E] truncate">{user?.email || user?.name}</p>
                    </div>

                    <div className="py-1">
                      {isAdmin && (
                        <Link
                          to="/admin/dashboard"
                          className="flex items-center gap-2 px-3 py-2 text-xs text-[#112D4E] hover:text-[#3F72AF] hover:bg-[#DBE2EF]/50 rounded-xl transition-colors font-medium"
                        >
                          <LayoutDashboard className="w-4 h-4 text-[white]" />
                          Admin Portal
                        </Link>
                      )}

                      <button
                        onClick={() => {
                          logout();
                          navigate('/login');
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-500 hover:bg-red-500/10 rounded-xl transition-colors font-medium"
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
                className="text-xs uppercase tracking-widest font-semibold text-[#112D4E] hover:text-[#3F72AF] px-3.5 py-2 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="btn-royal text-xs uppercase tracking-widest px-5 py-2.5 rounded-full"
              >
                Join Masculinity
              </Link>
            </div>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#112D4E] hover:text-[#3F72AF]"
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
            className="md:hidden bg-[#F9F7F7] border-b border-[#DBE2EF] px-6 py-6"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-sm font-semibold tracking-wider text-[#112D4E] hover:text-[#3F72AF]"
                >
                  {link.name}
                </Link>
              ))}

              {!isAuthenticated && (
                <div className="flex gap-4 pt-4 border-t border-[#DBE2EF]">
                  <Link
                    to="/login"
                    className="flex-1 py-2.5 text-center text-xs tracking-wider uppercase border border-[#3F72AF] text-[#112D4E] font-semibold rounded-xl"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="btn-royal flex-1 py-2.5 text-center text-xs tracking-wider uppercase rounded-xl"
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
