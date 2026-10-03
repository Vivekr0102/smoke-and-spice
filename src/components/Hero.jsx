import React from 'react';
import { Flame, ArrowRight, Utensils } from 'lucide-react';

export default function Hero({ onOpenReservation }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-stone-950">
      {/* Background Image with Dark Vignette Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=2000&q=80"
          alt="Smoke and Spice Grill"
          className="w-full h-full object-cover object-center opacity-30 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-stone-950/40"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-950/30 via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Top Ember Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-950/80 border border-orange-500/30 text-orange-400 text-xs sm:text-sm font-semibold tracking-wide uppercase mb-6 backdrop-blur-md shadow-lg shadow-orange-950/50">
          <Flame className="w-4 h-4 text-orange-500 animate-bounce" />
          <span>Authentic Indian &amp; Indo-Chinese Cuisine</span>
        </div>

        {/* Main Headline */}
        <h1 className="font-heading text-6xl sm:text-7xl lg:text-8xl tracking-tight text-white uppercase leading-none drop-shadow-md mb-6">
          Smoke <span className="text-orange-500">&amp;</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-amber-500">Spice</span>
        </h1>

        <p className="max-w-2xl mx-auto text-stone-300 text-base sm:text-lg lg:text-xl font-normal leading-relaxed mb-10 text-stone-300/90">
          Savor our mouthwatering Tandoori Kababs, Butter Chicken, Murg Musallam, Biryanis, Schezwan Fried Rice, and Noodles cooked fresh to order!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-16">
          <a
            href="#menu"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-orange-600 via-orange-500 to-red-600 hover:from-orange-500 hover:to-red-500 text-stone-950 font-extrabold text-base tracking-wide flex items-center justify-center gap-3 shadow-xl shadow-orange-600/30 hover:shadow-orange-600/50 hover:scale-105 transition-all"
          >
            <Utensils className="w-5 h-5 stroke-[2.5]" />
            <span>Explore Menu</span>
          </a>

          <button
            onClick={onOpenReservation}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-stone-900/90 hover:bg-stone-800 border border-stone-700 hover:border-orange-500/60 text-stone-100 font-semibold text-base flex items-center justify-center gap-3 transition-all"
          >
            <span>Reserve Table</span>
            <ArrowRight className="w-5 h-5 text-orange-400" />
          </button>
        </div>

        {/* Stats / Highlights Banner */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-8 border-t border-stone-800/80 max-w-3xl mx-auto">
          <div className="flex flex-col items-center p-3 rounded-lg bg-stone-900/40 border border-stone-800/50 backdrop-blur-sm">
            <span className="font-heading text-3xl text-orange-400">100% Fresh</span>
            <span className="text-xs text-stone-400 uppercase tracking-wider mt-1">Authentic Spices</span>
          </div>

          <div className="flex flex-col items-center p-3 rounded-lg bg-stone-900/40 border border-stone-800/50 backdrop-blur-sm">
            <span className="font-heading text-3xl text-red-500">Veg &amp; Non-Veg</span>
            <span className="text-xs text-stone-400 uppercase tracking-wider mt-1">Complete Variety</span>
          </div>

          <div className="col-span-2 md:col-span-1 flex flex-col items-center p-3 rounded-lg bg-stone-900/40 border border-stone-800/50 backdrop-blur-sm">
            <span className="font-heading text-3xl text-amber-400">4.9 ★★★★★</span>
            <span className="text-xs text-stone-400 uppercase tracking-wider mt-1">Guest Ratings</span>
          </div>
        </div>
      </div>
    </section>
  );
}
