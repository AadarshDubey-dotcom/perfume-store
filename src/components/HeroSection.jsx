import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, MeshReflectorMaterial, Text, OrbitControls } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Sparkles as SparklesIcon, ShoppingBag, Eye, Star, Droplets, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import * as THREE from 'three';

// 3 Curated Carousel Perfume Bottles (Gold, Silver/Teal, Rose Gold)
export const CAROUSEL_BOTTLES = [
  {
    id: 1,
    name: "Oud Royale Extrait",
    brand: "Maison d'Or",
    subtitle: "24k Golden Amber & Aged Wild Agarwood",
    price: 340,
    volume: "100ml / 3.4 FL.OZ",
    rating: 4.9,
    theme: "gold",
    accentColor: "#d4af37",
    btnClass: "btn-gold",
    tag: "24K Gold Masterpiece",
    notes: ["Saffron", "Bulgarian Damask Rose", "Cambodian Oud", "Ambergris"],
    metallicType: "gold", // 24k Gold Metallic
    glassColor: "#fff4d4",
    liquidColor: "#d4af37",
    metalColor: "#f3d06a",
    shape: "octagonal-gold",
  },
  {
    id: 5,
    name: "Aqua Celestia Absolue",
    brand: "Riviera Blu",
    subtitle: "Frosted Mineral Glass, Marine Moss & Italian Bergamot",
    price: 220,
    volume: "100ml / 3.4 FL.OZ",
    rating: 4.8,
    theme: "teal",
    accentColor: "#2dd4bf",
    btnClass: "btn-teal",
    tag: "Platinum & Sterling Silver",
    notes: ["Amalfi Lemon", "Sea Salt Mist", "Mineral Amber", "Clean Cedar"],
    metallicType: "silver", // Sterling Silver / Platinum
    glassColor: "#dffffb",
    liquidColor: "#14b8a6",
    metalColor: "#e2e8f0",
    shape: "cylinder-silver",
  },
  {
    id: 6,
    name: "Rose Éclipse Privée",
    brand: "Maison d'Or",
    subtitle: "Crimson Damascena, Black Patchouli & Rose Gold Amber",
    price: 365,
    volume: "100ml / 3.4 FL.OZ",
    rating: 5.0,
    theme: "rosegold",
    accentColor: "#e8a598",
    btnClass: "btn-rosegold",
    tag: "Rose Gold Edition",
    notes: ["Black Plum", "Crimson Rose", "Dark Patchouli", "Warm Olibanum"],
    metallicType: "rosegold", // Rose Gold Metallic
    glassColor: "#ffebe8",
    liquidColor: "#b82b43",
    metalColor: "#e8a598",
    shape: "diamond-rosegold",
  }
];

// Physically Realistic 3D Perfume Flacon with Metallic accents & Crystal Glass
function LuxuryPerfumeBottle({ bottle, isCenter, position, rotationY }) {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      const t = state.clock.getElapsedTime();
      // Organic floating sway
      groupRef.current.position.y = position[1] + Math.sin(t * 1.6 + position[0]) * 0.07;
      
      // Auto smooth 360 degree showcase spin when in active focus
      if (isCenter) {
        groupRef.current.rotation.y += delta * 0.4;
      } else {
        groupRef.current.rotation.y = rotationY;
      }
    }
  });

  const isSilver = bottle.metallicType === 'silver';
  const isRoseGold = bottle.metallicType === 'rosegold';

  return (
    <group
      ref={groupRef}
      position={position}
      scale={isCenter ? 1.18 : 0.78}
    >
      {/* 1. Heavy Solid Crystal Glass Base */}
      <mesh position={[0, -0.72, 0]} castShadow>
        <cylinderGeometry args={[0.62, 0.66, 0.28, 36]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transmission={0.96}
          opacity={1}
          transparent
          roughness={0.03}
          ior={1.62}
          reflectivity={0.95}
          clearcoat={1}
          clearcoatRoughness={0.05}
        />
      </mesh>

      {/* 2. Outer Crystal Flacon Body (High Glass Transmission & Refraction) */}
      <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
        {bottle.shape === 'octagonal-gold' ? (
          <cylinderGeometry args={[0.58, 0.62, 1.5, 8, 2]} />
        ) : bottle.shape === 'diamond-rosegold' ? (
          <cylinderGeometry args={[0.52, 0.64, 1.5, 12, 2]} />
        ) : (
          <cylinderGeometry args={[0.54, 0.56, 1.5, 36]} />
        )}
        <meshPhysicalMaterial
          color={bottle.glassColor}
          transmission={0.88}
          opacity={1}
          transparent
          roughness={0.06}
          ior={1.54}
          reflectivity={0.92}
          metalness={0.05}
          clearcoat={1}
          clearcoatRoughness={0.08}
        />
      </mesh>

      {/* 3. Internal Perfume Liquid Core */}
      <mesh position={[0, 0.06, 0]}>
        <cylinderGeometry args={[0.46, 0.52, 1.32, 28]} />
        <meshStandardMaterial
          color={bottle.liquidColor}
          emissive={bottle.liquidColor}
          emissiveIntensity={isCenter ? 0.45 : 0.2}
          roughness={0.25}
          transparent
          opacity={0.78}
        />
      </mesh>

      {/* 4. Metallic Flacon Shoulder Band (Gold / Silver / Rose Gold) */}
      <mesh position={[0, 0.92, 0]} castShadow>
        <cylinderGeometry args={[0.26, 0.32, 0.24, 36]} />
        <meshStandardMaterial
          color={bottle.metalColor}
          metalness={0.96}
          roughness={0.12}
          envMapIntensity={2.5}
        />
      </mesh>

      {/* 5. Metallic Atomizer Neck Ring */}
      <mesh position={[0, 1.08, 0]}>
        <cylinderGeometry args={[0.14, 0.14, 0.12, 28]} />
        <meshStandardMaterial
          color={isSilver ? "#ffffff" : isRoseGold ? "#fcd5ce" : "#fff1be"}
          metalness={0.98}
          roughness={0.08}
        />
      </mesh>

      {/* 6. Heavy Luxury Metallic Cap (Gold Crown / Silver Octagon / Rose Gold Diamond) */}
      <mesh position={[0, 1.38, 0]} castShadow>
        {bottle.shape === 'diamond-rosegold' ? (
          <octahedronGeometry args={[0.34, 0]} />
        ) : bottle.shape === 'octagonal-gold' ? (
          <cylinderGeometry args={[0.3, 0.33, 0.52, 8]} />
        ) : (
          <cylinderGeometry args={[0.3, 0.32, 0.52, 36]} />
        )}
        <meshStandardMaterial
          color={bottle.metalColor}
          metalness={0.95}
          roughness={0.1}
          envMapIntensity={3}
        />
      </mesh>

      {/* 7. Metallic Accent Trims on Cap */}
      <mesh position={[0, 1.18, 0]}>
        <torusGeometry args={[0.33, 0.025, 16, 36]} />
        <meshStandardMaterial
          color={isSilver ? "#cbd5e1" : "#ffffff"}
          metalness={0.99}
          roughness={0.05}
        />
      </mesh>

      {/* 8. Metallic Front Brand Plaque Badge */}
      <mesh position={[0, 0.1, 0.6]} rotation={[0, 0, 0]}>
        <planeGeometry args={[0.66, 0.66]} />
        <meshStandardMaterial
          color="#06070a"
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>

      {/* 9. Front Typography Label */}
      <Text
        position={[0, 0.17, 0.62]}
        fontSize={0.075}
        color={bottle.accentColor}
        anchorX="center"
        anchorY="middle"
      >
        {bottle.name.toUpperCase()}
      </Text>
      <Text
        position={[0, 0.02, 0.62]}
        fontSize={0.042}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {bottle.brand.toUpperCase()}
      </Text>
      <Text
        position={[0, -0.13, 0.62]}
        fontSize={0.038}
        color={isSilver ? "#94a3b8" : isRoseGold ? "#fca5a5" : "#e5c05d"}
        anchorX="center"
        anchorY="middle"
      >
        HAUTE PARFUMERIE
      </Text>
    </group>
  );
}

// 3D Scene Assembly with Studio Studio Lighting & Floor Reflection
function Carousel3DScene({ activeIndex }) {
  return (
    <>
      {/* Studio Key & Rim Lights */}
      <ambientLight intensity={0.55} />
      <directionalLight position={[6, 9, 6]} intensity={1.8} color="#fffcf0" castShadow />
      <directionalLight position={[-6, -1, -3]} intensity={0.8} color="#d4af37" />
      <pointLight position={[0, 5, 3]} intensity={2.5} color="#fff6db" distance={10} />
      <spotLight position={[0, 8, 3]} angle={0.6} penumbra={0.9} intensity={3.2} color="#ffffff" />

      {/* Ambient Gold & Silver Floating Sparks */}
      <Sparkles count={100} scale={10} size={2.8} speed={0.4} color="#f0d57e" opacity={0.7} />

      <group position={[0, -0.38, 0]}>
        {CAROUSEL_BOTTLES.map((bottle, index) => {
          let offset = index - activeIndex;
          if (offset === -2) offset = 1;
          if (offset === 2) offset = -1;

          const isCenter = offset === 0;
          let posX = offset * 2.3;
          let posZ = isCenter ? 0.35 : -1.1;
          let posY = isCenter ? 0.0 : -0.15;
          let rotY = offset * -0.45;

          return (
            <LuxuryPerfumeBottle
              key={bottle.id}
              bottle={bottle}
              isCenter={isCenter}
              position={[posX, posY, posZ]}
              rotationY={rotY}
            />
          );
        })}

        {/* Glossy Charcoal Black Mirror Pedestal Floor */}
        <mesh position={[0, -1.25, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[18, 18]} />
          <MeshReflectorMaterial
            blur={[300, 100]}
            resolution={512}
            mirror={0.75}
            mixBlur={0.85}
            mixStrength={1.8}
            roughness={0.15}
            depthScale={1.2}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color="#050608"
            metalness={0.85}
          />
        </mesh>
      </group>
    </>
  );
}

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const activeBottle = CAROUSEL_BOTTLES[activeIndex];

  // Carousel Handlers
  const handlePrev = () => {
    setIsAutoPlay(false);
    setActiveIndex((prev) => (prev === 0 ? CAROUSEL_BOTTLES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIsAutoPlay(false);
    setActiveIndex((prev) => (prev === CAROUSEL_BOTTLES.length - 1 ? 0 : prev + 1));
  };

  // Auto carousel rotation
  useEffect(() => {
    if (!isAutoPlay) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % CAROUSEL_BOTTLES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [isAutoPlay]);

  const handleQuickAdd = () => {
    addToCart(activeBottle, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <section className="relative min-h-[94vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#050608] via-[#090d18] to-[#10121a] pt-24 pb-8">
      {/* Dynamic Background Luxury Radial Ambience (Charcoal / Deep Navy / Ambient Glow) */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-1000"
        style={{
          background: `radial-gradient(circle at 62% 46%, ${activeBottle.accentColor}22 0%, rgba(9,13,24,0.6) 45%, #050608 90%)`
        }}
      />

      {/* 3D Canvas Viewport */}
      <div className="absolute inset-0 z-0 h-full w-full cursor-grab active:cursor-grabbing">
        <Canvas
          shadows
          camera={{ position: [0, 0.7, 5.1], fov: 42 }}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            <Carousel3DScene activeIndex={activeIndex} />
            <OrbitControls
              enableZoom={false}
              maxPolarAngle={Math.PI / 2 + 0.05}
              minPolarAngle={Math.PI / 3}
              enablePan={false}
              rotateSpeed={0.5}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Foreground Content Container */}
      <div className="container mx-auto px-6 relative z-10 py-6 pointer-events-none flex flex-col justify-between min-h-[82vh]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto">
          {/* Active Perfume Details Card (Left) */}
          <div className="lg:col-span-6 pointer-events-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeBottle.id}
                initial={{ opacity: 0, x: -35 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 35 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="space-y-6 max-w-xl"
              >
                {/* Metallic Edition Badge */}
                <div className="flex items-center gap-3">
                  <span
                    className="px-4 py-1.5 rounded-full glass-panel text-xs font-semibold tracking-widest uppercase flex items-center gap-2 shadow-xl border"
                    style={{ borderColor: `${activeBottle.accentColor}55`, color: activeBottle.accentColor }}
                  >
                    <SparklesIcon className="w-3.5 h-3.5" />
                    {activeBottle.tag}
                  </span>
                  <span className="text-xs uppercase tracking-widest font-mono text-gray-400">
                    Model 0{activeIndex + 1} / 03
                  </span>
                </div>

                {/* Fragrance Title & Tagline */}
                <div>
                  <span
                    className="text-xs uppercase tracking-[0.25em] font-semibold block mb-1.5"
                    style={{ color: activeBottle.accentColor }}
                  >
                    {activeBottle.brand}
                  </span>
                  <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-tight leading-[1.08]">
                    {activeBottle.name}
                  </h1>
                  <p className="text-sm sm:text-base text-gray-300 font-light mt-3 leading-relaxed">
                    {activeBottle.subtitle}
                  </p>
                </div>

                {/* Olfactory Notes Badges */}
                <div className="space-y-2">
                  <span className="text-[11px] uppercase tracking-widest font-mono text-gray-400 flex items-center gap-1.5">
                    <Droplets className="w-3.5 h-3.5" style={{ color: activeBottle.accentColor }} /> Key Botanical Accords
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeBottle.notes.map((note) => (
                      <span
                        key={note}
                        className="px-3.5 py-1.5 rounded-xl text-xs font-medium glass-card text-gray-100 border border-white/10"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price & Rating Display */}
                <div className="flex items-baseline gap-4 pt-2 border-t border-white/10">
                  <span
                    className="font-serif text-3xl sm:text-4xl font-bold"
                    style={{ color: activeBottle.accentColor }}
                  >
                    ${activeBottle.price}
                  </span>
                  <span className="text-xs text-gray-400 font-mono">
                    {activeBottle.volume}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs ml-auto">
                    <Star className="w-4 h-4 fill-current text-amber-400" />
                    <span className="font-bold text-white text-sm">{activeBottle.rating}</span>
                    <span className="text-gray-400 hidden sm:inline">(Collector Favorite)</span>
                  </div>
                </div>

                {/* Standout Accent CTA Buttons (Gold / Rose Gold / Teal) */}
                <div className="flex flex-wrap items-center gap-4 pt-3">
                  <button
                    onClick={handleQuickAdd}
                    className={`inline-flex items-center gap-3 px-8 py-4 rounded-full text-xs uppercase tracking-widest ${activeBottle.btnClass}`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    {added ? 'Allocated to Bag!' : `Add to Bag • $${activeBottle.price}`}
                  </button>

                  <Link
                    to={`/product/${activeBottle.id}`}
                    className="inline-flex items-center gap-2 px-6 py-4 rounded-full glass-panel text-white font-medium text-xs uppercase tracking-widest border border-white/20 hover:border-white/60 hover:bg-white/10 transition-all duration-300"
                  >
                    <Eye className="w-4 h-4" /> Discover Notes <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Area open for 3D Flacons spotlight */}
          <div className="lg:col-span-6 h-56 lg:h-auto" />
        </div>

        {/* Carousel Bottom Control Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pointer-events-auto pt-6 border-t border-white/10">
          {/* Metallic Model Switcher Tabs */}
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
                    ? 'bg-white/10 border-white/40 text-white shadow-xl scale-105'
                    : 'glass-panel border-white/10 text-gray-400 hover:text-white hover:border-white/25'
                }`}
              >
                <div
                  className="w-3.5 h-3.5 rounded-full shrink-0 shadow-md"
                  style={{ backgroundColor: bottle.accentColor }}
                />
                <div className="text-left">
                  <p className="text-xs font-semibold leading-tight text-white">{bottle.name}</p>
                  <p className="text-[10px] text-gray-400 font-mono">${bottle.price}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Prev / Next Metallic Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full glass-panel border border-white/20 hover:border-white text-white hover:scale-110 transition-all flex items-center justify-center shadow-lg"
              aria-label="Previous Perfume Flacon"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full glass-panel border border-white/20 hover:border-white text-white hover:scale-110 transition-all flex items-center justify-center shadow-lg"
              aria-label="Next Perfume Flacon"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
