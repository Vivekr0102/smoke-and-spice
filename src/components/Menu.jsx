import React, { useState } from 'react';
import { MENU_CATEGORIES, MENU_ITEMS } from '../data/menuData';
import { Plus, Search, Sparkles, Check } from 'lucide-react';

export default function Menu({ onAddToCart }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [portionSelection, setPortionSelection] = useState({}); // { [itemId]: 'full' | 'half' }
  const [addedItemIds, setAddedItemIds] = useState([]);

  const getPortion = (itemId) => portionSelection[itemId] || 'full';

  const togglePortion = (itemId, size) => {
    setPortionSelection((prev) => ({ ...prev, [itemId]: size }));
  };

  const handleAdd = (item) => {
    const size = getPortion(item.id);
    const itemPrice = size === 'half' && item.priceHalf ? item.priceHalf : item.price;
    const itemTitle = item.priceHalf ? `${item.name} (${size.toUpperCase()})` : item.name;

    onAddToCart({
      id: `${item.id}-${size}`,
      name: itemTitle,
      price: itemPrice,
      image: item.image,
    });

    setAddedItemIds((prev) => [...prev, item.id]);
    setTimeout(() => {
      setAddedItemIds((prev) => prev.filter((id) => id !== item.id));
    }, 1500);
  };

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="menu" className="py-16 bg-stone-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-orange-400 bg-orange-950/40 border border-orange-500/20 px-3 py-1 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            Authentic Smoke &amp; Spice Menu
          </div>
          <h2 className="font-heading text-5xl sm:text-6xl text-white uppercase tracking-wider mb-3">
            Select Your <span className="text-orange-500">Dishes</span>
          </h2>
          <p className="text-stone-400 text-sm sm:text-base">
            Choose from our authentic Non-Veg &amp; Veg Indian main course curries, tandoori kababs, Schezwan fried rice, noodles, and biryanis.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-4 bg-stone-900/80 p-3 sm:p-4 rounded-2xl border border-stone-800">
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search butter chicken, noodles, biryani..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-stone-950 border border-stone-800 rounded-xl text-stone-200 text-sm focus:outline-none focus:border-orange-500 transition-colors"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
            {MENU_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? 'bg-orange-600 text-stone-950 shadow-md shadow-orange-600/30 font-bold'
                    : 'bg-stone-950/60 text-stone-300 hover:bg-stone-800 border border-stone-800/80'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-stone-900/30 rounded-2xl border border-stone-800">
            <p className="text-stone-400 text-lg">No dishes found matching your search filter.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="mt-4 px-4 py-2 bg-orange-600 text-stone-950 text-sm font-bold rounded-lg"
            >
              Reset Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {filteredItems.map((item) => {
              const isJustAdded = addedItemIds.includes(item.id);
              const selectedPortion = getPortion(item.id);
              const currentPrice = selectedPortion === 'half' && item.priceHalf ? item.priceHalf : item.price;

              return (
                <div
                  key={item.id}
                  className="bg-stone-900/90 rounded-2xl border border-stone-800 overflow-hidden flex flex-col justify-between hover:border-orange-500/50 transition-all hover:shadow-xl group"
                >
                  <div>
                    {/* Item Image */}
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent"></div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <div className="flex items-center gap-1.5 mb-2 flex-wrap">
                        {item.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-orange-950/80 border border-orange-500/30 text-orange-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <h3 className="font-heading text-xl text-white mb-1.5 tracking-wide group-hover:text-orange-400 transition-colors leading-tight">
                        {item.name}
                      </h3>

                      <p className="text-stone-400 text-xs leading-relaxed mb-3 line-clamp-2">
                        {item.description}
                      </p>

                      {/* Half / Full portion toggle if item has priceHalf */}
                      {item.priceHalf && (
                        <div className="flex items-center gap-1 mb-3 bg-stone-950 p-1 rounded-lg border border-stone-800">
                          <button
                            onClick={() => togglePortion(item.id, 'half')}
                            className={`flex-1 py-0.5 text-[11px] font-bold rounded transition-colors ${
                              selectedPortion === 'half'
                                ? 'bg-orange-600 text-stone-950'
                                : 'text-stone-400 hover:text-white'
                            }`}
                          >
                            Half (₹{item.priceHalf})
                          </button>
                          <button
                            onClick={() => togglePortion(item.id, 'full')}
                            className={`flex-1 py-0.5 text-[11px] font-bold rounded transition-colors ${
                              selectedPortion === 'full'
                                ? 'bg-orange-600 text-stone-950'
                                : 'text-stone-400 hover:text-white'
                            }`}
                          >
                            Full (₹{item.price})
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Pricing & Add Button */}
                  <div className="p-3.5 pt-0 flex items-center justify-between border-t border-stone-800/80 mt-auto">
                    <span className="font-heading text-xl sm:text-2xl text-orange-500">
                      ₹{currentPrice}
                    </span>

                    <button
                      onClick={() => handleAdd(item)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1 transition-all ${
                        isJustAdded
                          ? 'bg-green-600 text-white'
                          : 'bg-orange-600 hover:bg-orange-500 text-stone-950 active:scale-95 shadow-md shadow-orange-600/20'
                      }`}
                    >
                      {isJustAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>Added!</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5 stroke-[3]" />
                          <span>Add to Order</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
