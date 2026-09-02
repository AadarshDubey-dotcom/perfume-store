import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles as SparklesIcon,
  ShoppingBag,
  Eye,
  Star,
  Droplets,
  ArrowRight,
  Volume2,
  VolumeX,
  Pause,
  Play,
} from 'lucide-react';
import { useCart } from '../context/CartContext';

// Carousel data
export const CAROUSEL_BOTTLES = [
  {
    id: 1,
    name: 'Auren',
    brand: "Masculity",
    subtitle: 'Aged Cambodian Agarwood, Royal Saffron & Golden Amber',
    price: 499,
    volume: '100ml / 3.4 FL.OZ',
    rating: 4.9,
    tag: 'Haute Parfumerie Masterpiece',
    notes: ['Royal Saffron', 'Sapphire Agarwood', 'Bulgarian Rose', 'Ambergris'],
    accentColor: '#2C5F8A',
  },
  {
    id: 2,
    name: 'Apex',
    brand: "Masculity",
    subtitle: 'Smoky Sandalwood, Crushed Cardamom & Midnight Iris',
    price: 499,
    volume: '100ml / 3.4 FL.OZ',
    rating: 4.8,
    tag: 'Nocturnal Signature Edition',
    notes: ['Guatemalan Cardamom', 'Violet Leaf', 'Australian Sandalwood', 'Cashmere'],
    accentColor: '#3F72AF',
  },
  {
    id: 5,
    name: 'Tempt',
    brand: 'Masculity',
    subtitle: 'Frosted Sea Mist, Amalfi Bergamot & Pure White Amber',
    price: 499,
    volume: '100ml / 3.4 FL.OZ',
    rating: 5.0,
    tag: 'Pure Crystalline Essence',
    notes: ['Amalfi Bergamot', 'Oceanic Accord', 'French Neroli', 'Crystalline Amber'],
    accentColor: '#6BB6D6',
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.09, delayChildren: 0.08 } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [added, setAdded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);
  const { addToCart } = useCart();

  const activeBottle = CAROUSEL_BOTTLES[activeIndex];
  const total = CAROUSEL_BOTTLES.length;

  // Handle carousel navigation
  const handlePrev = () => {
    setIsAutoPlay(false);
    setActiveIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNext = () => {
    setIsAutoPlay(false);
    setActiveIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlay) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 6500);
    return () => clearInterval(timer);
  }, [isAutoPlay, total]);

  // Handle quick add to cart
  const handleQuickAdd = () => {
    addToCart(activeBottle, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // Video controls
  const handleToggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  const handleTogglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section id="artisans" className="relative min-h-[94vh] flex items-center justify-center overflow-hidden bg-black-dark">
      {/* Background Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="perfume2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Accent color tint based on active bottle */}
      <div
        className="absolute inset-0 z-2 pointer-events-none transition-all duration-1200 mix-blend-overlay"
        style={{ background: `radial-gradient(circle at 62% 46%, ${activeBottle.accentColor}33 0%, transparent 60%)` }}
      />

      {/* Film grain texture */}
      <div
        className="absolute inset-0 z-3 pointer-events-none mix-blend-overlay opacity-5"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Video Controls */}
      <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2">
        <button
          onClick={handleTogglePlay}
          className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
        <button
          onClick={handleToggleMute}
          className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 py-6 flex flex-col justify-between min-h-[82vh] pt-24 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto">
          {/* Left Content */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeBottle.id}
                variants={containerVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                className="space-y-6 max-w-xl"
              >
                {/* Tag */}
                <motion.div variants={itemVariants} className="flex items-center gap-3">
                  <span
                    className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold tracking-widest uppercase flex items-center gap-2 border text-brand-light"
                    style={{ borderColor: `${activeBottle.accentColor}77` }}
                  >
                    <SparklesIcon className="w-3.5 h-3.5" style={{ color: activeBottle.accentColor }} />
                    {activeBottle.tag}
                  </span>
                  <span className="text-xs uppercase tracking-widest font-mono font-semibold text-white">
                    Flacon 0{activeIndex + 1} / 0{total}
                  </span>
                </motion.div>

                {/* Brand & Title */}
                <motion.div variants={itemVariants}>
                  <span
                    className="text-xs uppercase tracking-[0.25em] font-bold block mb-1.5"
                    style={{ color: activeBottle.accentColor }}
                  >
                    {activeBottle.brand}
                  </span>
                  <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-tight leading-[1.08] drop-shadow-md">
                    {activeBottle.name}
                  </h1>
                  <p className="text-sm sm:text-base text-white font-normal mt-3 leading-relaxed">
                    {activeBottle.subtitle}
                  </p>
                </motion.div>

                {/* Notes */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <span className="text-[11px] uppercase tracking-widest font-mono text-white/80 flex items-center gap-1.5 font-semibold">
                    <Droplets className="w-3.5 h-3.5" style={{ color: activeBottle.accentColor }} /> Key Botanical Accords
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeBottle.notes.map((note) => (
                      <span key={note} className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white/10 backdrop-blur-md text-white border border-white/20">
                        {note}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Price & Rating */}
                <motion.div variants={itemVariants} className="flex items-baseline gap-4 pt-2 border-t border-white/20">
                  <span className="font-serif text-3xl sm:text-4xl font-bold text-white">
                    ₹{activeBottle.price}
                  </span>
                  <span className="text-xs text-white/80 font-mono font-medium">{activeBottle.volume}</span>
                  <div className="flex items-center gap-1.5 text-xs ml-auto">
                    <Star className="w-4 h-4" style={{ fill: activeBottle.accentColor, color: activeBottle.accentColor }} />
                    <span className="font-bold text-white text-sm">{activeBottle.rating}</span>
                    <span className="text-white/80 hidden sm:inline">(Collector Choice)</span>
                  </div>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 pt-3 ">
                  <motion.button
                    onClick={handleQuickAdd}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="btn-royal inline-flex items-center gap-3 px-8 py-4 rounded-full text-xs  uppercase tracking-widest "
                  >
                    <ShoppingBag className="w-4 h-4"/>
                    {added ? 'Allocated to Bag!' : `Add to Bag • ₹${activeBottle.price}`}
                  </motion.button>

                  <Link to={`/product/${activeBottle.id}`}>
                    <motion.span
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="inline-flex items-center gap-2 px-6 py-4 rounded-full text-xs uppercase tracking-widest border border-white/40 text-white hover:bg-white/10 transition-colors"
                    >
                      <Eye className="w-4 h-4" /> Discover Notes <ArrowRight className="w-3.5 h-3.5" />
                    </motion.span>
                  </Link>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="lg:col-span-5" />
        </div>

        {/* Bottom Carousel Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/20">
          {/* Bottle Selector */}
          <div className="flex items-center gap-3">
            {CAROUSEL_BOTTLES.map((bottle, idx) => (
              <button
                key={bottle.id}
                onClick={() => {
                  setIsAutoPlay(false);
                  setActiveIndex(idx);
                }}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl transition-all duration-300 border ${
                  activeIndex === idx
                    ? 'bg-white/20 text-white shadow-lg scale-105 border-white/40'
                    : 'bg-white/5 border-white/15 text-white hover:border-white/30'
                }`}
                style={activeIndex === idx ? { borderColor: bottle.accentColor } : undefined}
              >
                <div className="w-3.5 h-3.5 rounded-full shrink-0 shadow-sm border border-white" style={{ backgroundColor: bottle.accentColor }} />
                <div className="text-left">
                  <p className="text-xs font-semibold leading-tight">{bottle.name}</p>
                  <p className="text-[10px] opacity-70 font-mono">${bottle.price}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-brand-light hover:scale-110 transition-all flex items-center justify-center"
              aria-label="Previous perfume"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-brand-light hover:scale-110 transition-all flex items-center justify-center"
              aria-label="Next perfume"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
