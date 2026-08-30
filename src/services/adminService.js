import api from './api';

export const adminService = {
  // Get admin KPI metrics
  async getDashboardStats() {
    try {
      const response = await api.get('/admin/dashboard-stats/');
      return response.data;
    } catch {
      // Realistic luxury mock data for dashboard preview
      return {
        revenue: 148920,
        revenueGrowth: "+18.4%",
        ordersCount: 432,
        ordersGrowth: "+12.1%",
        activeCustomers: 1250,
        customersGrowth: "+24.5%",
        topSellingBottle: "Oud Royale Extrait",
        recentOrders: [
          { id: "ORD-9921", customer: "Eleanor Vance", email: "eleanor@vance.com", product: "Oud Royale Extrait", amount: 340, status: "Delivered", date: "Today, 14:20" },
          { id: "ORD-9920", customer: "Julian Mercer", email: "j.mercer@lux.fr", product: "Santal Nocturne", amount: 285, status: "Processing", date: "Today, 11:05" },
          { id: "ORD-9919", customer: "Sophia Lauren", email: "sophia@lauren.co.uk", product: "Rose Éclipse (x2)", amount: 730, status: "Shipped", date: "Yesterday" },
          { id: "ORD-9918", customer: "Alexander Hayes", email: "alex@hayes.me", product: "Velvet Tobacco & Vanilla", amount: 310, status: "Delivered", date: "Yesterday" },
          { id: "ORD-9917", customer: "Chloe Dupont", email: "chloe@dupont.ch", product: "Fleur d'Oranger Intense", amount: 245, status: "Delivered", date: "2 days ago" }
        ],
        salesByMonth: [
          { month: "Jan", sales: 18400 },
          { month: "Feb", sales: 22100 },
          { month: "Mar", sales: 29800 },
          { month: "Apr", sales: 34500 },
          { month: "May", sales: 44120 }
        ]
      };
    }
  }
};

