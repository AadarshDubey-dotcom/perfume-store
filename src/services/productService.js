import api from './api';

const useRemoteApi = Boolean(import.meta.env.VITE_API_URL);

// Realistic luxury mock dataset fallback using exact workspace bottle assets
export const SAMPLE_PRODUCTS = [
  {
    id: 1,
    name: "Apex",
    brand: "Masculity",
    category: "Eau de Parfum",
    price: 449,
    rating: 4.9,
    reviewsCount: 142,
    isNew: true,
    isBestSeller: true,
    volume: "100ml / 3.4 FL.OZ",
    description: "An elegant harmony of Calabrian Bergamot, warm nutmeg, and smoky Bourbon Cedar with a spherical black cap signature.",
    notes: {
      top: ["Calabrian Bergamot", "Saffron", "Pink Pepper"],
      heart: ["Nutmeg", "Bourbon Cedar", "White Jasmine"],
      base: ["Ambergris", "Smoky Leather", "Bourbon Vanilla"]
    },
    image: "/perfume1.webp",
  },
  {
    id: 2,
    name: "Tempt",
    brand: "Masculity",
    category: "Extrait de Parfum",
    price: 449,
    originalPrice: 749,
    rating: 5.0,
    reviewsCount: 188,
    isNew: true,
    isBestSeller: true,
    volume: "125ml / 4.2 FL.OZ",
    description: "Sun-drenched French orange blossoms infused with royal honeycomb nectar, wild damask rose, and golden beeswax.",
    notes: {
      top: ["Orange Blossom", "Nectarine Zest", "Petitgrain"],
      heart: ["Wild Damask Rose", "Sunlit Honey", "Egyptian Jasmine"],
      base: ["French Beeswax", "Solar Woods", "Warm Benzoin"]
    },
    image: "/perfume2.webp",
  },
  {
    id: 3,
    name: "Auren",
    brand: "Masculity",
    category: "Parfum",
    price: 449,
    originalPrice: 749,
    rating: 4.8,
    reviewsCount: 96,
    isNew: false,
    isBestSeller: true,
    volume: "100ml / 3.4 FL.OZ",
    description: "A commanding faceted crystal flacon with roasted cocoa notes, maninka fruit, and a rose-gold prismatic stopper.",
    notes: {
      top: ["Spiced Ginger", "Davana", "Cardamom"],
      heart: ["Maninka Fruit", "Roasted Cocoa", "Iris Root"],
      base: ["Precious Vetiver", "Smoky Patchouli", "Vanilla Absolute"]
    },
    image: "/perfume3.webp",
  },
];

export const productService = {
  async getProducts(params = {}) {
    if (useRemoteApi) {
      try {
      const response = await api.get('/products/', { params });
      return response.data?.results || response.data;
      } catch {
        // Fall back to the local catalog when the optional API is unavailable.
      }
    }

    let products = [...SAMPLE_PRODUCTS];
    if (params.category && params.category !== 'All') {
      products = products.filter((product) => product.category === params.category);
    }
    if (params.search) {
      const query = params.search.toLowerCase();
      products = products.filter((product) =>
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
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
  },

  async getProductById(id) {
    if (useRemoteApi) {
      try {
      const response = await api.get(`/products/${id}/`);
      return response.data;
      } catch {
        // Fall back to the local catalog when the optional API is unavailable.
      }
    }

    const item = SAMPLE_PRODUCTS.find((product) => product.id === Number(id));
    if (item) return item;
    throw new Error('Product not found');
  }
};
