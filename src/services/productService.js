import api from './api';

// Realistic luxury mock dataset fallback for instant preview & zero-setup frontend
export const SAMPLE_PRODUCTS = [
  {
    id: 1,
    name: "Oud Royale Extrait",
    brand: "Maison d'Or",
    category: "Extrait de Parfum",
    price: 340,
    originalPrice: 380,
    rating: 4.9,
    reviewsCount: 128,
    isNew: true,
    isBestSeller: true,
    volume: "100ml / 3.4 FL.OZ",
    description: "An opulent harmony of aged Cambodian Agarwood, Bulgarian Damask Rose, and golden amber crystals. Distilled using centuries-old artisanal methods.",
    notes: {
      top: ["Saffron", "Calabrian Bergamot", "Pink Pepper"],
      heart: ["Bulgarian Rose", "Rare Agarwood (Oud)", "Nutmeg"],
      base: ["Ambergris", "Smoky Leather", "Bourbon Vanilla"]
    },
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=1000",
    color: "#e5a93c"
  },
  {
    id: 2,
    name: "Santal Nocturne",
    brand: "L'Atelier Noir",
    category: "Eau de Parfum",
    price: 285,
    rating: 4.8,
    reviewsCount: 94,
    isNew: false,
    isBestSeller: true,
    volume: "100ml / 3.4 FL.OZ",
    description: "Velvety Australian sandalwood infused with roasted cardamom and crushed iris root. A sophisticated nocturnal signature.",
    notes: {
      top: ["Guatemalan Cardamom", "Violet Leaf", "Cypress"],
      heart: ["Florentine Iris", "Papyrus", "Cedarwood"],
      base: ["Sandalwood", "Warm Cashmere", "Iso E Super"]
    },
    image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=1000",
    color: "#b07d58"
  },
  {
    id: 3,
    name: "Fleur d'Oranger Intense",
    brand: "Soleil Privé",
    category: "Parfum",
    price: 245,
    originalPrice: 290,
    rating: 4.7,
    reviewsCount: 76,
    isNew: true,
    isBestSeller: false,
    volume: "75ml / 2.5 FL.OZ",
    description: "Sun-drenched Tunisian orange blossoms elevated by fresh neroli water and luminous white musk. Crisp, intoxicating, and ethereal.",
    notes: {
      top: ["Mandarin Zest", "Petitgrain", "Neroli"],
      heart: ["Orange Blossom Absolute", "Egyptian Jasmine", "Lily of the Valley"],
      base: ["White Musk", "Solar Woods", "Benzoin"]
    },
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=1000",
    color: "#f39c12"
  },
  {
    id: 4,
    name: "Velvet Tobacco & Vanilla",
    brand: "Atelier Imperial",
    category: "Eau de Parfum",
    price: 310,
    rating: 4.9,
    reviewsCount: 210,
    isNew: false,
    isBestSeller: true,
    volume: "100ml / 3.4 FL.OZ",
    description: "Warm pipe tobacco leaves steeped in rich Madagascar vanilla beans, dried fruits, and aromatic tonka. Intimate and commanding.",
    notes: {
      top: ["Tobacco Leaf", "Spiced Clove", "Anise"],
      heart: ["Tonka Bean", "Tobacco Blossom", "Cacao"],
      base: ["Madagascar Vanilla", "Dried Fruits", "Sweet Wood Sap"]
    },
    image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=1000",
    color: "#8c532b"
  },
  {
    id: 5,
    name: "Aqua Celestia Absolue",
    brand: "Riviera Blu",
    category: "Eau de Toilette",
    price: 220,
    rating: 4.6,
    reviewsCount: 65,
    isNew: true,
    isBestSeller: false,
    volume: "100ml / 3.4 FL.OZ",
    description: "A tranquil Mediterranean morning captured in a bottle. Oceanic breeze, salty sea moss, and crisp Italian lemon.",
    notes: {
      top: ["Sea Salt", "Amalfi Lemon", "Mint"],
      heart: ["Oceanic Accord", "Rosemary", "Water Lily"],
      base: ["Driftwood", "Mineral Amber", "Clean Cedar"]
    },
    image: "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&q=80&w=1000",
    color: "#2980b9"
  },
  {
    id: 6,
    name: "Rose Éclipse",
    brand: "Maison d'Or",
    category: "Extrait de Parfum",
    price: 365,
    rating: 5.0,
    reviewsCount: 88,
    isNew: true,
    isBestSeller: true,
    volume: "100ml / 3.4 FL.OZ",
    description: "Crimson roses shadowed by black patchouli and dark plums. Dangerous, romantic, and unforgettable.",
    notes: {
      top: ["Black Plum", "Pink Peppercorn", "Davana"],
      heart: ["Crimson Damascena Rose", "Patchouli Coeur", "Geranium"],
      base: ["Black Amber", "Labdanum", "Olibanum"]
    },
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=1000",
    color: "#962d3e"
  }
];

export const productService = {
  // Fetch all products with search, category, sort support
  async getProducts(params = {}) {
    try {
      const response = await api.get('/products/', { params });
      return response.data?.results || response.data;
    } catch (error) {
      console.warn('Django API not reachable, loading curated luxury sample catalog.', error.message);
      let products = [...SAMPLE_PRODUCTS];
      
      // Client-side filtering fallback for smooth development
      if (params.category && params.category !== 'All') {
        products = products.filter(p => p.category === params.category);
      }
      if (params.search) {
        const query = params.search.toLowerCase();
        products = products.filter(p => 
          p.name.toLowerCase().includes(query) || 
          p.brand.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
        );
      }
      if (params.ordering === 'price_asc') {
        products.sort((a, b) => a.price - b.price);
      } else if (params.ordering === 'price_desc') {
        products.sort((a, b) => b.price - a.price);
      } else if (params.ordering === 'rating') {
        products.sort((a, b) => b.rating - a.rating);
      }
      return products;
    }
  },

  // Fetch single product by ID
  async getProductById(id) {
    try {
      const response = await api.get(`/products/${id}/`);
      return response.data;
    } catch (error) {
      console.warn(`Product ${id} fetched from fallback database.`);
      const item = SAMPLE_PRODUCTS.find(p => p.id === Number(id));
      if (item) return item;
      throw error;
    }
  }
};

