import React from 'react';
import { CHEF_SPECIAL } from '../data/menuData';
import { Flame, Clock, Plus, Award, CheckCircle2 } from 'lucide-react';

export default function Specials({ onAddToCart }) {
  return (
    <section id="specials" className="py-20 bg-stone-900/60 relative overflow-hidden border-y border-stone-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase font-extrabold tracking-widest text-orange-400 bg-orange-950/60 border border-orange-500/20 px-3 py-1 rounded-full mb-3">
              <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
              House Special Highlight
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl text-white uppercase tracking-wider">
              Signature <span className="text-orange-500">Royal Platter</span>
            </h2>
          </div>
          <div className="flex items-center gap-2 text-sm text-amber-400 bg-stone-950/80 px-4 py-2 rounded-xl border border-amber-500/30">
            <Clock className="w-4 h-4 text-amber-400 animate-spin duration-3000" />
            <span>Prepared Fresh to Order</span>
          </div>
        </div>

        {/* Feature Card */}
        <div className="relative bg-stone-950 border border-stone-800 rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Image Column */}
          <div className="lg:col-span-7 relative min-h-[320px] lg:min-h-[480px] overflow-hidden group">
            <img
              src={CHEF_SPECIAL.image}
              alt={CHEF_SPECIAL.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-stone-950"></div>
            
            <div className="absolute top-4 left-4 bg-red-600 text-white font-extrabold text-xs uppercase px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-1.5">
              <Award className="w-4 h-4" />
              <span>Chef's Choice Feast</span>
            </div>

            <div className="absolute bottom-4 left-4 bg-stone-950/90 backdrop-blur-md border border-orange-500/40 text-orange-400 font-semibold text-xs px-3 py-1.5 rounded-lg">
              🔥 Only {CHEF_SPECIAL.limitedQtyRemaining} Platters Available Tonight
            </div>
          </div>

          {/* Content Column */}
          <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-orange-500 mb-2">
                {CHEF_SPECIAL.subtitle}
              </div>
              <h3 className="font-heading text-3xl sm:text-4xl text-white mb-4 leading-tight">
                {CHEF_SPECIAL.title}
              </h3>
              <p className="text-stone-300 text-sm leading-relaxed mb-6">
                {CHEF_SPECIAL.description}
              </p>

              {/* Highlights List */}
              <ul className="space-y-2.5 mb-8 text-xs sm:text-sm text-stone-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-orange-500" />
                  <span>Whole Roasted Tandoori Chicken</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-orange-500" />
                  <span>Rich Mughlai Saffron Gravy with Egg &amp; Keema</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-orange-500" />
                  <span>Served with Butter Naan &amp; Biryani Rice</span>
                </li>
              </ul>
            </div>

            {/* Price & Add to Order */}
            <div className="pt-6 border-t border-stone-800 flex items-center justify-between gap-4">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="font-heading text-4xl text-orange-500">₹{CHEF_SPECIAL.price}</span>
                  <span className="text-sm text-stone-500 line-through">₹{CHEF_SPECIAL.originalPrice}</span>
                </div>
                <span className="text-[11px] text-stone-400 uppercase tracking-wide">Save ₹100 on combo</span>
              </div>

              <button
                onClick={() => onAddToCart({
                  id: 'special-murg-musallam',
                  name: CHEF_SPECIAL.title,
                  price: CHEF_SPECIAL.price,
                  image: CHEF_SPECIAL.image,
                })}
                className="px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-stone-950 font-extrabold text-sm flex items-center gap-2 transition-transform active:scale-95 shadow-lg shadow-orange-600/30"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Add Royal Feast</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
