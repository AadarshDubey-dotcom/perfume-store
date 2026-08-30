import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingBag, Users, LogOut, Sparkles, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Catalogue Items', path: '/admin/dashboard', icon: Package },
    { name: 'Customer Orders', path: '/admin/dashboard', icon: ShoppingBag },
    { name: 'VIP Connoisseurs', path: '/admin/dashboard', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-[#070709] text-white flex flex-col md:flex-row">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-[#0a0b10] border-r border-[#d4af37]/20 p-6 flex flex-col justify-between shrink-0">
        <div>
          {/* Brand */}
          <div className="flex items-center gap-2 mb-10 pb-4 border-b border-white/10">
            <div className="w-8 h-8 rounded-full border border-[#d4af37] flex items-center justify-center bg-black/40">
              <Sparkles className="w-4 h-4 text-[#d4af37]" />
            </div>
            <div>
              <span className="font-serif text-lg font-bold tracking-widest text-white">ÉLIXIR</span>
              <p className="text-[10px] uppercase font-mono text-[#d4af37]">Maison Admin</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    active
                      ? 'bg-[#d4af37] text-black font-semibold shadow-md'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="pt-6 border-t border-white/10 space-y-3">
          <Link
            to="/"
            className="flex items-center gap-2 text-xs text-gray-400 hover:text-[#d4af37] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Public Store
          </Link>
          <button
            onClick={logout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8 pb-4 border-b border-white/10">
          <div>
            <span className="text-[11px] uppercase tracking-widest font-mono text-[#d4af37]">
              Operations Control Center
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-white">
              Atelier Overview
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#d4af37] text-black font-bold text-xs flex items-center justify-center">
              {user?.name?.[0] || 'A'}
            </div>
            <div>
              <p className="text-xs font-semibold text-white">{user?.name || 'Curator Admin'}</p>
              <p className="text-[10px] text-gray-400 font-mono">Master Perfumer</p>
            </div>
          </div>
        </div>

        <Outlet />
      </main>
    </div>
  );
}

