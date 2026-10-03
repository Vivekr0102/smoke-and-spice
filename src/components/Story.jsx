import React from 'react';
import { Flame, UtensilsCrossed, MapPin, Phone } from 'lucide-react';

export default function Story() {
  return (
    <section id="story" className="py-24 bg-stone-900/40 relative border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-orange-400 bg-orange-950/60 border border-orange-500/20 px-3 py-1 rounded-full">
              <Flame className="w-3.5 h-3.5 text-orange-500" />
              Nerul, Navi Mumbai
            </div>

            <h2 className="font-heading text-5xl sm:text-6xl text-white uppercase tracking-wider leading-none">
              Welcome to <span className="text-orange-500">Smoke &amp; Spice</span>
            </h2>

            <p className="text-stone-300 text-base leading-relaxed">
              Located near Ganesh Talav Road in Nerul, <strong className="text-orange-400">Smoke &amp; Spice</strong> brings you authentic Indian Main Course curries, Tandoori Starters, sizzling Biryanis, Schezwan Fried Rice, and Noodles.
            </p>

            <p className="text-stone-400 text-sm leading-relaxed">
              Every dish is crafted using fresh ingredients, aromatic spices, and traditional recipes to deliver unforgettable flavors for lunch and dinner.
            </p>

            {/* Grid Pillars */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-stone-950 border border-stone-800">
                <MapPin className="w-6 h-6 text-orange-500 mb-2" />
                <h4 className="text-white font-bold text-sm mb-1">Nerul, Navi Mumbai</h4>
                <p className="text-stone-400 text-xs">Sector 20, Near Ganesh Talav Road.</p>
              </div>

              <div className="p-4 rounded-xl bg-stone-950 border border-stone-800">
                <Phone className="w-6 h-6 text-red-500 mb-2" />
                <h4 className="text-white font-bold text-sm mb-1">Direct Calling</h4>
                <p className="text-stone-400 text-xs">Call +91 7021248122 for orders &amp; bookings.</p>
              </div>
            </div>
          </div>

          {/* Right Image Layout */}
          <div className="lg:col-span-6 flex justify-center relative">
            <div className="relative p-4 rounded-3xl bg-stone-950 border border-stone-800 shadow-2xl max-w-md w-full text-center">
              <img
                src="/logo.jpg"
                alt="Smoke & Spice Official Logo"
                className="w-48 h-48 rounded-full object-cover mx-auto border-4 border-orange-500/80 shadow-xl mb-6"
              />
              <h3 className="font-heading text-3xl text-white uppercase tracking-wide">
                Smoke &amp; Spice
              </h3>
              <p className="text-xs text-orange-400 font-bold uppercase tracking-wider mt-1">
                Authentic Indian &amp; Indo-Chinese Cuisine
              </p>
              <div className="mt-4 pt-4 border-t border-stone-800 text-xs text-stone-400 space-y-1">
                <p>🕒 12:00 PM - 3:30 PM &amp; 6:30 PM - 12:00 AM</p>
                <p>📍 Shop 3, Shree Ganesh Krupa CHS, Nerul</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
