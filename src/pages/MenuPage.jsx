import React, { useState, useEffect } from 'react';
import Menu from '../components/Menu';
import Footer from '../components/Footer';
import { ArrowLeft, ShoppingBag, Utensils, MessageCircle } from 'lucide-react';

export default function MenuPage({ onAddToCart, onNavigateHome, onOpenCart, cartCount }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="pt-24 min-h-screen bg-stone-950 text-stone-100 flex flex-col justify-between">
      <div>
        {/* Menu Page Banner & Breadcrumb */}
        <div className="bg-stone-900/80 border-b border-stone-800 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={onNavigateHome}
                className="p-2 rounded-xl bg-stone-950 border border-stone-800 text-stone-300 hover:text-white hover:border-orange-500 transition-colors flex items-center gap-2 text-xs font-semibold"
              >
                <ArrowLeft className="w-4 h-4 text-orange-500" />
                <span>Back to Home</span>
              </button>

              <div className="h-4 w-px bg-stone-800 hidden sm:block"></div>

              <div className="flex items-center gap-2 text-xs text-stone-400">
                <span className="cursor-pointer hover:text-white" onClick={onNavigateHome}>Home</span>
                <span>/</span>
                <span className="text-orange-400 font-bold">Food Menu</span>
              </div>
            </div>

            {/* Quick Tray CTA */}
            {cartCount > 0 && (
              <button
                onClick={onOpenCart}
                className="px-4 py-2 rounded-xl bg-green-600 hover:bg-green-500 text-stone-950 font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-green-600/20 active:scale-95 transition-all self-start sm:self-auto"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>View Tray ({cartCount} items)</span>
              </button>
            )}
          </div>
        </div>

        {/* Dedicated Interactive Menu */}
        <Menu onAddToCart={onAddToCart} />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
