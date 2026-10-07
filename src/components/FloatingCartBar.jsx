import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export default function FloatingCartBar({ cartItems, onOpenCart }) {
  if (!cartItems || cartItems.length === 0) return null;

  const totalCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);
  const subtotal = cartItems.reduce((acc, i) => acc + i.price * i.quantity, 0);

  return (
    <div className="fixed bottom-5 left-4 right-4 sm:left-auto sm:right-6 sm:w-96 z-40 animate-bounce-short">
      <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-red-600 text-stone-950 p-3.5 sm:p-4 rounded-2xl shadow-2xl border border-orange-400/40 flex items-center justify-between gap-3 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-stone-950/20 flex items-center justify-center shrink-0">
            <ShoppingBag className="w-5 h-5 text-stone-950 stroke-[2.5]" />
          </div>
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider block text-stone-950/90">
              {totalCount} {totalCount === 1 ? 'Item' : 'Items'} in Tray
            </span>
            <span className="font-heading text-2xl leading-none text-stone-950 block">
              ₹{subtotal.toFixed(0)}
            </span>
          </div>
        </div>

        <button
          onClick={onOpenCart}
          className="px-4 py-2.5 rounded-xl bg-stone-950 hover:bg-stone-900 text-orange-400 hover:text-orange-300 font-extrabold text-xs sm:text-sm flex items-center gap-1.5 shadow-md active:scale-95 transition-transform shrink-0"
        >
          <span>View Cart</span>
          <ArrowRight className="w-4 h-4 stroke-[3]" />
        </button>
      </div>
    </div>
  );
}
