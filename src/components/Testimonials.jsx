import React from 'react';
import { REVIEWS } from '../data/menuData';
import { Star, Quote, MessageSquare } from 'lucide-react';

export default function Testimonials() {
  return (
    <section id="reviews" className="py-24 bg-stone-950 relative border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-amber-400 bg-amber-950/40 border border-amber-500/20 px-3 py-1 rounded-full mb-3">
            <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
            Guest Experiences
          </div>
          <h2 className="font-heading text-5xl text-white uppercase tracking-wider mb-4">
            Loved By <span className="text-orange-500">Pitmasters &amp; Foodies</span>
          </h2>
          <p className="text-stone-400 text-sm">
            Read what our patrons and critics say about our slow-smoked meats and flame-kissed dishes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((rev, idx) => (
            <div
              key={idx}
              className="bg-stone-900/60 p-6 rounded-2xl border border-stone-800 relative flex flex-col justify-between hover:border-orange-500/40 transition-all hover:-translate-y-1"
            >
              <Quote className="w-8 h-8 text-orange-500/20 absolute top-4 right-4" />

              <div>
                <div className="flex items-center gap-1 mb-4 text-amber-400">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-stone-300 text-sm leading-relaxed italic mb-6">
                  "{rev.comment}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-stone-800/80">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-10 h-10 rounded-full object-cover border border-orange-500/30"
                />
                <div>
                  <h4 className="text-sm font-bold text-white">{rev.name}</h4>
                  <span className="text-xs text-orange-400 font-medium">{rev.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
