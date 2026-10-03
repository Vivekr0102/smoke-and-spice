import React, { useState, useEffect } from 'react';
import { ShoppingBag, Calendar, Menu as MenuIcon, X, Phone, Instagram } from 'lucide-react';
import { INSTAGRAM_URL } from '../data/menuData';

export default function Navbar({ cartCount, onOpenCart, onOpenReservation }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-stone-950/95 backdrop-blur-md border-b border-stone-800/80 py-2.5 shadow-2xl'
          : 'bg-gradient-to-b from-stone-950/90 via-stone-950/40 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <img
              src="/logo.jpg"
              alt="Smoke & Spice Logo"
              className="w-12 h-12 rounded-full object-cover border-2 border-orange-500/80 shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform"
            />
            <div>
              <span className="font-heading text-2xl tracking-wider uppercase text-white group-hover:text-orange-400 transition-colors">
                Smoke <span className="text-orange-500">&amp;</span> Spice
              </span>
              <p className="text-[10px] text-stone-400 tracking-widest uppercase font-semibold -mt-1">
                Nerul, Navi Mumbai
              </p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-300">
            <a href="#menu" className="hover:text-orange-400 transition-colors">Menu</a>
            <a href="#specials" className="hover:text-orange-400 transition-colors">Chef Special</a>
            <a href="#story" className="hover:text-orange-400 transition-colors">About Us</a>
            <a href="#reviews" className="hover:text-orange-400 transition-colors">Reviews</a>
            <a href="#contact" className="hover:text-orange-400 transition-colors">Contact</a>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-stone-900 border border-stone-800 text-orange-400 hover:text-white hover:bg-stone-800"
              aria-label="Instagram"
              title="Instagram @smoke_n_spice.nm"
            >
              <Instagram className="w-4 h-4" />
            </a>

            <a
              href="tel:7021248122"
              className="flex items-center gap-2 text-xs font-semibold text-stone-300 hover:text-orange-400 border border-stone-800 bg-stone-900 px-3 py-2 rounded-lg"
            >
              <Phone className="w-3.5 h-3.5 text-orange-500" />
              <span>7021248122</span>
            </a>

            <button
              onClick={onOpenReservation}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-orange-500/40 bg-stone-900/80 hover:bg-stone-800 text-orange-400 font-medium text-sm transition-all hover:border-orange-500"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Table</span>
            </button>

            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-stone-950 font-bold transition-transform active:scale-95 shadow-md shadow-orange-600/20"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-5 h-5 stroke-[2.5]" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-stone-950 animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Hamburger */}
          <div className="flex items-center gap-2 sm:hidden">
            <button
              onClick={onOpenCart}
              className="relative p-2 rounded-lg bg-orange-600 text-stone-950"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-stone-950/98 border-b border-stone-800 px-4 pt-4 pb-6 space-y-4">
          <nav className="flex flex-col space-y-3 text-stone-200 text-lg font-medium">
            <a
              href="#menu"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-orange-400 py-1"
            >
              Menu
            </a>
            <a
              href="#specials"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-orange-400 py-1"
            >
              Chef Special
            </a>
            <a
              href="#story"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-orange-400 py-1"
            >
              About Us
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-orange-400 py-1"
            >
              Contact &amp; Timings
            </a>
          </nav>
          <div className="pt-2 border-t border-stone-800 flex flex-col gap-2">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-lg bg-orange-600/20 border border-orange-500/40 text-orange-400 font-bold flex items-center justify-center gap-2 text-sm"
            >
              <Instagram className="w-4 h-4" />
              Instagram @smoke_n_spice.nm
            </a>
            <a
              href="tel:7021248122"
              className="w-full py-2.5 rounded-lg bg-stone-900 border border-stone-800 text-stone-300 font-bold flex items-center justify-center gap-2 text-sm"
            >
              <Phone className="w-4 h-4 text-orange-500" />
              Call 7021248122
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReservation();
              }}
              className="w-full py-3 rounded-lg bg-orange-600 text-stone-950 font-bold flex items-center justify-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              Book a Table
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
