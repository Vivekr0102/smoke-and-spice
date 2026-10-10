import React, { useState } from 'react';
import { MENU_CATEGORIES, MENU_ITEMS } from '../data/menuData';
import { Plus, Search, Sparkles, Check, UtensilsCrossed } from 'lucide-react';
import { getDishImage, handleImageError } from '../utils/foodImageProvider';

export default function Menu({ onAddToCart }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [portionSelection, setPortionSelection] = useState({});
  const [addedItemIds, setAddedItemIds] = useState([]);

  const getPortion = (itemId) => portionSelection[itemId] || 'full';

  const togglePortion = (itemId, size) => {
    setPortionSelection((prev) => ({
      ...prev,
      [itemId]: size,
    }));
  };

  const handleAdd = (item) => {
    const size = getPortion(item.id);
    const itemPrice =
      size === 'half' && item.priceHalf
        ? item.priceHalf
        : item.price;

    const itemTitle = item.priceHalf
      ? `${item.name} (${size.toUpperCase()})`
      : item.name;

    onAddToCart({
      id: `${item.id}-${size}`,
      name: itemTitle,
      price: itemPrice,
      image: item.image,
    });

    setAddedItemIds((prev) => [...prev, item.id]);

    setTimeout(() => {
      setAddedItemIds((prev) =>
        prev.filter((id) => id !== item.id)
      );
    }, 1500);
  };

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory =
      activeCategory === 'all' ||
      item.category === activeCategory;

    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Group filtered items by category id
  const groupedCategories = MENU_CATEGORIES.filter(
    (cat) => cat.id !== 'all'
  ).map((cat) => {
    const items = filteredItems.filter((i) => i.category === cat.id);
    return {
      ...cat,
      items,
    };
  }).filter((cat) => cat.items.length > 0);

  return (
    <section id="menu" className="py-10 sm:py-12 lg:py-16 bg-stone-950 relative">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-7 sm:mb-10">
          <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-orange-400 bg-orange-950/40 border border-orange-500/20 px-3 py-1 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            Authentic Smoke &amp; Spice Menu
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl text-white uppercase tracking-wider mb-3">
            Select Your <span className="text-orange-500">Dishes</span>
          </h2>

          <p className="text-stone-400 text-xs sm:text-sm lg:text-base">
            Browse our complete menu of 138 dishes across 15 organized categories. Select half or full portions and order directly via WhatsApp!
          </p>
        </div>

        {/* Filter Controls & Category Tabs */}
        <div className="mb-8 flex flex-col gap-4 bg-stone-900/90 p-4 rounded-2xl border border-stone-800 shadow-xl">
          {/* Top Bar: Search + Active Badge */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search butter chicken, naan, biryani..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-stone-200 text-sm focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>

            <div className="text-xs text-stone-400 font-semibold flex items-center gap-2 self-start md:self-auto">
              <span>Showing</span>
              <span className="text-orange-400 font-bold bg-orange-950 px-2 py-0.5 rounded border border-orange-500/30">
                {filteredItems.length} Dishes
              </span>
            </div>
          </div>

          {/* Category Filter Pills Grid / Scroll */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar border-t border-stone-800/80 pt-3">
            {MENU_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  activeCategory === cat.id
                    ? 'bg-orange-600 text-stone-950 shadow-md shadow-orange-600/30 font-extrabold scale-105'
                    : 'bg-stone-950 text-stone-300 hover:bg-stone-800 border border-stone-800'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Menu Content: Rendered by Section Categories */}
        {groupedCategories.length === 0 ? (
          <div className="text-center py-12 sm:py-16 bg-stone-900/30 rounded-2xl border border-stone-800">
            <UtensilsCrossed className="w-12 h-12 text-stone-500 mx-auto mb-3" />
            <p className="text-stone-400 text-base sm:text-lg mb-2">
              No dishes found matching your search query.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="mt-2 px-4 py-2 bg-orange-600 text-stone-950 text-xs font-extrabold rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-12">
            {groupedCategories.map((categoryGroup) => (
              <div key={categoryGroup.id} className="space-y-4">
                {/* Category Section Header */}
                <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{categoryGroup.icon}</span>
                    <h3 className="font-heading text-2xl sm:text-3xl text-white tracking-wide uppercase">
                      {categoryGroup.name}
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-stone-400 bg-stone-900 px-3 py-1 rounded-full border border-stone-800">
                    {categoryGroup.items.length} {categoryGroup.items.length === 1 ? 'Dish' : 'Dishes'}
                  </span>
                </div>

                {/* Dish Items 4-Column Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
                  {categoryGroup.items.map((item) => {
                    const isJustAdded = addedItemIds.includes(item.id);
                    const selectedPortion = getPortion(item.id);

                    const currentPrice =
                      selectedPortion === 'half' && item.priceHalf
                        ? item.priceHalf
                        : item.price;

                    return (
                      <div
                        key={item.id}
                        className="bg-stone-900/90 rounded-xl sm:rounded-2xl border border-stone-800 overflow-hidden flex flex-col justify-between hover:border-orange-500/50 transition-all hover:shadow-xl group"
                      >
                        <div>
                          {/* Item Image */}
                          <div className="relative h-40 sm:h-48 lg:h-56 overflow-hidden">
                            <img
                              src={getDishImage(item)}
                              alt={item.name}
                              loading="lazy"
                              onError={(e) => handleImageError(e)}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent pointer-events-none"></div>
                          </div>

                          {/* Item Content */}
                          <div className="p-3 sm:p-4 lg:p-5">
                            <div className="flex items-center gap-1.5 mb-2 flex-wrap">
                              {item.tags.map((tag, idx) => (
                                <span
                                  key={idx}
                                  className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-orange-950/80 border border-orange-500/30 text-orange-400"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>

                            <h4 className="font-heading text-lg sm:text-xl lg:text-2xl text-white mb-1.5 tracking-wide group-hover:text-orange-400 transition-colors leading-tight">
                              {item.name}
                            </h4>

                            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed mb-3 line-clamp-2">
                              {item.description}
                            </p>

                            {/* Half / Full Portion Selection */}
                            {item.priceHalf && (
                              <div className="flex items-center gap-1 mb-3 bg-stone-950 p-1 rounded-lg border border-stone-800">
                                <button
                                  onClick={() => togglePortion(item.id, 'half')}
                                  className={`flex-1 py-1 text-[10px] sm:text-xs font-bold rounded transition-colors ${
                                    selectedPortion === 'half'
                                      ? 'bg-orange-600 text-stone-950'
                                      : 'text-stone-400 hover:text-white'
                                  }`}
                                >
                                  Half (₹{item.priceHalf})
                                </button>

                                <button
                                  onClick={() => togglePortion(item.id, 'full')}
                                  className={`flex-1 py-1 text-[10px] sm:text-xs font-bold rounded transition-colors ${
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

                        {/* Price & Add to Order */}
                        <div className="p-3 sm:p-4 lg:p-5 pt-0 flex items-center justify-between gap-2 border-t border-stone-800/80 mt-auto">
                          <span className="font-heading text-lg sm:text-xl lg:text-2xl text-orange-500 shrink-0">
                            ₹{currentPrice}
                          </span>

                          <button
                            onClick={() => handleAdd(item)}
                            className={`px-2.5 sm:px-3 lg:px-4 py-2 rounded-lg text-[11px] sm:text-xs font-extrabold flex items-center justify-center gap-1 transition-all ${
                              isJustAdded
                                ? 'bg-green-600 text-white'
                                : 'bg-orange-600 hover:bg-orange-500 text-stone-950 active:scale-95 shadow-md shadow-orange-600/20'
                            }`}
                          >
                            {isJustAdded ? (
                              <>
                                <Check className="w-3.5 h-3.5 stroke-[3] shrink-0" />
                                <span>Added!</span>
                              </>
                            ) : (
                              <>
                                <Plus className="w-3.5 h-3.5 stroke-[3] shrink-0" />
                                <span className="whitespace-nowrap">Add to Order</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
