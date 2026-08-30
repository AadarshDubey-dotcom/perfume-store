import api from './api';

export const cartService = {
  // Fetch user cart from Django backend (or localStorage if guest)
  async getCart() {
    try {
      const response = await api.get('/cart/');
      return response.data;
    } catch {
      const localCart = localStorage.getItem('perfume_cart');
      return localCart ? JSON.parse(localCart) : [];
    }
  },

  // Add item to cart
  async addToCart(productId, quantity = 1) {
    try {
      const response = await api.post('/cart/add/', { product_id: productId, quantity });
      return response.data;
    } catch {
      return null;
    }
  },

  // Remove item
  async removeFromCart(productId) {
    try {
      const response = await api.delete(`/cart/${productId}/`);
      return response.data;
    } catch {
      return null;
    }
  },

  // Update quantity
  async updateQuantity(productId, quantity) {
    try {
      const response = await api.patch(`/cart/${productId}/`, { quantity });
      return response.data;
    } catch {
      return null;
    }
  }
};

