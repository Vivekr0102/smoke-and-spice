import React from 'react';
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react';
import { INSTAGRAM_URL } from '../data/menuData';

export default function Footer() {
  return (
    <footer id="contact" className="bg-stone-950 border-t border-stone-800 text-stone-400 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Info & Logo */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo.jpg"
                alt="Smoke & Spice Logo"
                className="w-14 h-14 rounded-full object-cover border-2 border-orange-500 shadow-md"
              />
              <div>
                <span className="font-heading text-2xl text-white tracking-wider block">
                  Smoke <span className="text-orange-500">&amp;</span> Spice
                </span>
                <span className="text-[11px] text-stone-400 font-semibold tracking-wide">
                  Nerul, Navi Mumbai
                </span>
              </div>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Serving delicious Indian &amp; Indo-Chinese delicacies, Tandoori Kebabs, Butter Chicken, Biryani, Schezwan Rice, and Noodles.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-orange-600/20 text-orange-400 hover:text-white hover:bg-orange-600 transition-colors border border-orange-500/30 flex items-center gap-2 text-xs font-bold"
              >
                <Instagram className="w-4 h-4" />
                <span>Follow @smoke_n_spice.nm</span>
              </a>
            </div>
          </div>

          {/* Location & Address */}
          <div>
            <h4 className="font-heading text-xl text-white uppercase tracking-wider mb-4">Visit Us</h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span className="text-stone-300">
                  Shop no. 3, Shree Ganesh Krupa CHS, D/117, near Ganesh Talav Road, Sector 20, Nerul, Navi Mumbai, Maharashtra 400706
                </span>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-heading text-xl text-white uppercase tracking-wider mb-4">Contact Info</h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                <a href="tel:7021248122" className="text-stone-200 font-semibold hover:text-orange-400">
                  +91 7021248122
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-orange-500 shrink-0" />
                <a href="mailto:smokenspice.nm@gmail.com" className="text-stone-200 hover:text-orange-400 break-all">
                  smokenspice.nm@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2.5 pt-1">
                <Instagram className="w-4 h-4 text-orange-500 shrink-0" />
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:underline font-semibold">
                  @smoke_n_spice.nm
                </a>
              </li>
            </ul>
          </div>

          {/* Restaurant Timings */}
          <div>
            <h4 className="font-heading text-xl text-white uppercase tracking-wider mb-4">Opening Hours</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex justify-between border-b border-stone-900 pb-1.5">
                <span>Lunch Hours:</span>
                <span className="text-stone-200 font-semibold">12:00 PM - 3:30 PM</span>
              </li>
              <li className="flex justify-between border-b border-stone-900 pb-1.5 text-amber-400 font-semibold">
                <span>Afternoon Break:</span>
                <span>3:30 PM - 6:30 PM (Closed)</span>
              </li>
              <li className="flex justify-between border-b border-stone-900 pb-1.5">
                <span>Dinner Hours:</span>
                <span className="text-orange-400 font-semibold">6:30 PM - 12:00 AM</span>
              </li>
              <li className="text-[11px] text-stone-400 pt-1">
                Open All 7 Days a Week
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} Smoke &amp; Spice Restaurant, Nerul, Navi Mumbai. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 text-stone-400 font-semibold">
              Instagram @smoke_n_spice.nm
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
