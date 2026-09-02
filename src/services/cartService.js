import api from './api';

const useRemoteApi = Boolean(import.meta.env.VITE_API_URL);

export const cartService = {
  // Fetch user cart from Django backend (or localStorage if guest)
  async getCart() {
    if (useRemoteApi) {
      try {
      const response = await api.get('/cart/');
      return response.data;
      } catch {
        // Use the browser cart when the optional API is unavailable.
      }
    }
    const localCart = localStorage.getItem('perfume_cart');
    return localCart ? JSON.parse(localCart) : [];
  },

  // Add item to cart
  async addToCart(productId, quantity = 1) {
    if (!useRemoteApi) return null;
    try {
      const response = await api.post('/cart/add/', { product_id: productId, quantity });
      return response.data;
    } catch {
      return null;
    }
  },

  // Remove item
  async removeFromCart(productId) {
    if (!useRemoteApi) return null;
    try {
      const response = await api.delete(`/cart/${productId}/`);
      return response.data;
    } catch {
      return null;
    }
  },

  // Update quantity
  async updateQuantity(productId, quantity) {
    if (!useRemoteApi) return null;
    try {
      const response = await api.patch(`/cart/${productId}/`, { quantity });
      return response.data;
    } catch {
      return null;
    }
  }
};

