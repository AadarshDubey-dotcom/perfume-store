import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { DollarSign, ShoppingBag, Users, Sparkles, TrendingUp, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService
      .getDashboardStats()
      .then((data) => setStats(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 bg-[#DBE2EF]/10 rounded-2xl" />
        ))}
      </div>
    );
  }

  const kpis = [
    {
      title: 'Total Gross Revenue',
      value: `$${stats.revenue.toLocaleString()}`,
      growth: stats.revenueGrowth,
      icon: DollarSign,
      color: 'text-[#DBE2EF]',
    },
    {
      title: 'Allocations Dispatched',
      value: stats.ordersCount,
      growth: stats.ordersGrowth,
      icon: ShoppingBag,
      color: 'text-[#3F72AF]',
    },
    {
      title: 'Registered Connoisseurs',
      value: stats.activeCustomers,
      growth: stats.customersGrowth,
      icon: Users,
      color: 'text-[#DBE2EF]',
    },
    {
      title: 'Top Coveted Extract',
      value: stats.topSellingBottle,
      growth: 'Rank #1',
      icon: Sparkles,
      color: 'text-[#3F72AF]',
    },
  ];

  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <motion.div
              key={kpi.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="glass-card rounded-2xl p-5 border border-[#DBE2EF]/20 flex flex-col justify-between bg-[#0d223c]"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] uppercase tracking-wider font-mono text-[#DBE2EF]">
                  {kpi.title}
                </span>
                <div className={`p-2 rounded-xl bg-[#112D4E] border border-[#DBE2EF]/20 ${kpi.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#F9F7F7] mb-1">
                  {kpi.value}
                </h3>
                <div className="flex items-center gap-1 text-[11px] text-emerald-400">
                  <TrendingUp className="w-3 h-3" />
                  <span>{kpi.growth} vs previous cycle</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Revenue Trajectory & Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart Bar Representation */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-6 border border-[#DBE2EF]/20 space-y-6 bg-[#0d223c]">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-lg font-semibold text-[#F9F7F7]">Revenue Trajectory</h3>
              <p className="text-xs text-[#DBE2EF]">Monthly gross allocations in USD</p>
            </div>
            <span className="text-xs font-mono text-[#F9F7F7] px-3 py-1 rounded-full bg-[#3F72AF] border border-[#DBE2EF]/30 font-bold">
              FY 2026 Live
            </span>
          </div>

          <div className="h-48 flex items-end justify-between gap-4 pt-6 pb-2 px-2">
            {stats.salesByMonth.map((item) => {
              const heightPercent = (item.sales / 50000) * 100;
              return (
                <div key={item.month} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="text-[10px] font-mono text-[#DBE2EF] opacity-0 group-hover:opacity-100 transition-opacity">
                    ${(item.sales / 1000).toFixed(1)}k
                  </div>
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className="w-full max-w-[48px] bg-gradient-to-t from-[#112D4E] to-[#3F72AF] rounded-t-lg transition-all duration-500 group-hover:brightness-125 border border-[#DBE2EF]/20"
                  />
                  <span className="text-xs text-[#DBE2EF] font-mono">{item.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Atelier Status */}
        <div className="glass-card rounded-2xl p-6 border border-[#DBE2EF]/20 space-y-4 bg-[#0d223c]">
          <h3 className="font-serif text-lg font-semibold text-[#F9F7F7]">Distillation Health</h3>
          
          <div className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <div className="flex justify-between text-[#DBE2EF]">
                <span>Sapphire Flacon Inventory</span>
                <span className="text-[#F9F7F7] font-mono font-bold">82%</span>
              </div>
              <div className="w-full h-1.5 bg-[#112D4E] rounded-full overflow-hidden border border-[#DBE2EF]/20">
                <div className="h-full bg-[#3F72AF] w-[82%]" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-[#DBE2EF]">
                <span>Damask Rose Extraction</span>
                <span className="text-[#F9F7F7] font-mono font-bold">94%</span>
              </div>
              <div className="w-full h-1.5 bg-[#112D4E] rounded-full overflow-hidden border border-[#DBE2EF]/20">
                <div className="h-full bg-[#3F72AF] w-[94%]" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-[#DBE2EF]">
                <span>Crystalline Flacon Stock</span>
                <span className="text-[#F9F7F7] font-mono font-bold">65%</span>
              </div>
              <div className="w-full h-1.5 bg-[#112D4E] rounded-full overflow-hidden border border-[#DBE2EF]/20">
                <div className="h-full bg-[#DBE2EF] w-[65%]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="glass-card rounded-2xl p-6 border border-[#DBE2EF]/20 bg-[#0d223c]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-serif text-lg font-semibold text-[#F9F7F7]">Recent Customer Orders</h3>
            <p className="text-xs text-[#DBE2EF]">Direct synchronisation with Django REST API</p>
          </div>
          <button className="text-xs uppercase tracking-wider text-[#DBE2EF] hover:text-[#F9F7F7] flex items-center gap-1 font-semibold">
            Export Ledger <ArrowUpRight className="w-3.5 h-3.5 text-[#3F72AF]" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#DBE2EF]/20 text-[#DBE2EF] uppercase font-mono tracking-wider">
                <th className="pb-3 px-3">Order ID</th>
                <th className="pb-3 px-3">Client</th>
                <th className="pb-3 px-3">Fragrance Allocation</th>
                <th className="pb-3 px-3">Amount</th>
                <th className="pb-3 px-3">Status</th>
                <th className="pb-3 px-3">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DBE2EF]/10">
              {stats.recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-[#3F72AF]/10 transition-colors">
                  <td className="py-3.5 px-3 font-mono font-medium text-[#DBE2EF]">{order.id}</td>
                  <td className="py-3.5 px-3">
                    <p className="font-medium text-[#F9F7F7]">{order.customer}</p>
                    <p className="text-[10px] text-[#DBE2EF]/70">{order.email}</p>
                  </td>
                  <td className="py-3.5 px-3 text-[#DBE2EF]">{order.product}</td>
                  <td className="py-3.5 px-3 font-mono font-bold text-[#F9F7F7]">${order.amount}</td>
                  <td className="py-3.5 px-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                        order.status === 'Delivered'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : order.status === 'Processing'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-[#3F72AF]/30 text-[#DBE2EF] border border-[#3F72AF]'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-[#DBE2EF]/70 font-mono">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
