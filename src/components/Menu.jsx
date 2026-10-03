import React, { useState } from 'react';
import { MENU_CATEGORIES, MENU_ITEMS } from '../data/menuData';
import { Flame, Plus, Search, Filter, Sparkles, Clock, Check } from 'lucide-react';

export default function Menu({ onAddToCart }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpice, setSelectedSpice] = useState('all');
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
    const matchesSpice = selectedSpice === 'all' || 
                         (selectedSpice === 'mild' && item.spiceLevel <= 1) ||
                         (selectedSpice === 'medium' && item.spiceLevel === 2) ||
                         (selectedSpice === 'hot' && item.spiceLevel >= 3);
    return matchesCategory && matchesSearch && matchesSpice;
  });

  const renderSpiceBadges = (level) => {
    if (level === 0) return <span className="text-stone-500 text-xs font-semibold">Mild</span>;
    return (
      <div className="flex items-center gap-0.5" title={`Spice level: ${level}/4`}>
        {Array.from({ length: level }).map((_, i) => (
          <Flame key={i} className="w-3.5 h-3.5 text-red-500 fill-red-500" />
        ))}
      </div>
    );
  };

  return (
    <section id="menu" className="py-24 bg-stone-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-orange-400 bg-orange-950/40 border border-orange-500/20 px-3 py-1 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            Authentic Smoke &amp; Spice Menu
          </div>
          <h2 className="font-heading text-5xl sm:text-6xl text-white uppercase tracking-wider mb-4">
            Our Delicious <span className="text-orange-500">Menu</span>
          </h2>
          <p className="text-stone-400 text-sm sm:text-base">
            Explore our authentic Non-Veg &amp; Veg Indian main course, tandoori kababs, Schezwan fried rice, noodles, and biryanis.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-4 bg-stone-900/80 p-3 sm:p-4 rounded-2xl border border-stone-800">
          {/* Search Box */}
          <div className="relative w-full md:w-72">
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

          {/* Spice Filter Dropdown */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <Filter className="w-4 h-4 text-stone-400" />
            <select
              value={selectedSpice}
              onChange={(e) => setSelectedSpice(e.target.value)}
              className="bg-stone-950 border border-stone-800 text-stone-300 text-xs sm:text-sm rounded-xl px-3 py-2 focus:outline-none focus:border-orange-500"
            >
              <option value="all">All Spice Levels</option>
              <option value="mild">Mild (Level 0-1)</option>
              <option value="medium">Medium (Level 2)</option>
              <option value="hot">Hot 🔥🔥🔥 (Level 3+)</option>
            </select>
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
                setSelectedSpice('all');
              }}
              className="mt-4 px-4 py-2 bg-orange-600 text-stone-950 text-sm font-bold rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent"></div>

                      {/* Spice Indicator Badge */}
                      <div className="absolute top-3 right-3 bg-stone-950/85 backdrop-blur-md px-2.5 py-1 rounded-lg border border-stone-800 flex items-center gap-1">
                        {renderSpiceBadges(item.spiceLevel)}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        {item.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-orange-950/80 border border-orange-500/30 text-orange-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <h3 className="font-heading text-2xl text-white mb-2 tracking-wide group-hover:text-orange-400 transition-colors">
                        {item.name}
                      </h3>

                      <p className="text-stone-400 text-xs sm:text-sm leading-relaxed mb-4">
                        {item.description}
                      </p>

                      {/* Half / Full portion toggle if item has priceHalf */}
                      {item.priceHalf && (
                        <div className="flex items-center gap-2 mb-4 bg-stone-950 p-1 rounded-xl border border-stone-800">
                          <button
                            onClick={() => togglePortion(item.id, 'half')}
                            className={`flex-1 py-1 text-xs font-bold rounded-lg transition-colors ${
                              selectedPortion === 'half'
                                ? 'bg-orange-600 text-stone-950'
                                : 'text-stone-400 hover:text-white'
                            }`}
                          >
                            Half (₹{item.priceHalf})
                          </button>
                          <button
                            onClick={() => togglePortion(item.id, 'full')}
                            className={`flex-1 py-1 text-xs font-bold rounded-lg transition-colors ${
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
                  <div className="p-5 pt-0 flex items-center justify-between border-t border-stone-800/80 mt-auto">
                    <span className="font-heading text-3xl text-orange-500">
                      ₹{currentPrice}
                    </span>

                    <button
                      onClick={() => handleAdd(item)}
                      className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-1.5 transition-all ${
                        isJustAdded
                          ? 'bg-green-600 text-white'
                          : 'bg-orange-600 hover:bg-orange-500 text-stone-950 active:scale-95 shadow-md shadow-orange-600/20'
                      }`}
                    >
                      {isJustAdded ? (
                        <>
                          <Check className="w-4 h-4 stroke-[3]" />
                          <span>Added!</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4 stroke-[3]" />
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
