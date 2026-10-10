/**
 * Utility for automatic food image matching & reliable fallbacks across Smoke & Spice.
 */

export const DEFAULT_FOOD_FALLBACK = "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80";

// Dictionary of verified high-definition food images by category & keyword
const DISH_IMAGE_MAP = {
  // Soups
  soup: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80",
  manchow: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=800&q=80",
  sour: "https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?auto=format&fit=crop&w=800&q=80",

  // Starters & Tandoori
  lollypop: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80",
  crispy: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80",
  tandoori: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80",
  tikka: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80",
  kabab: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
  satay: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
  chilly: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=800&q=80",
  manchurian: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=800&q=80",
  bhel: "https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=800&q=80",

  // Main Courses
  butter: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80",
  curry: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=800&q=80",
  handi: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=800&q=80",
  kadai: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=800&q=80",
  paneer: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80",
  mushroom: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",

  // Breads
  naan: "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=800&q=80",
  roti: "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=800&q=80",
  chapati: "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=800&q=80",
  paratha: "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=800&q=80",
  kulcha: "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=800&q=80",

  // Rice & Biryani
  biryani: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
  "veg biryani": "https://images.unsplash.com/photo-1642821373181-696a54913e93?auto=format&fit=crop&w=800&q=80",
  "fried rice": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80",
  rice: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80",
  dal: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
  khichadi: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",

  // Noodles
  noodle: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80",
  hakka: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80",
  schezwan: "https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=800&q=80",
};

/**
 * Returns a suitable food image URL for an item based on its name and category.
 */
export function getDishImage(item) {
  if (!item) return DEFAULT_FOOD_FALLBACK;

  // Preserve custom local uploads
  if (item.image && (item.image.startsWith('/') || item.image.startsWith('http://localhost'))) {
    return item.image;
  }

  // Check if current image is a valid HTTP image link
  if (
    item.image &&
    item.image.startsWith('https://images.unsplash.com') &&
    !item.image.includes('seriouseats')
  ) {
    return item.image;
  }

  const nameLower = (item.name || '').toLowerCase();
  const catLower = (item.category || '').toLowerCase();

  // Match keyword in dish name
  for (const [key, url] of Object.entries(DISH_IMAGE_MAP)) {
    if (nameLower.includes(key)) {
      return url;
    }
  }

  // Category fallbacks
  if (catLower.includes('soup')) return DISH_IMAGE_MAP.soup;
  if (catLower.includes('starter')) return DISH_IMAGE_MAP.tandoori;
  if (catLower.includes('biryani') || catLower.includes('family')) return DISH_IMAGE_MAP.biryani;
  if (catLower.includes('noodle')) return DISH_IMAGE_MAP.noodle;
  if (catLower.includes('fried-rice')) return DISH_IMAGE_MAP['fried rice'];
  if (catLower.includes('roti') || catLower.includes('bread')) return DISH_IMAGE_MAP.naan;
  if (catLower.includes('dal')) return DISH_IMAGE_MAP.dal;
  if (catLower.includes('paneer')) return DISH_IMAGE_MAP.paneer;

  return DEFAULT_FOOD_FALLBACK;
}

/**
 * Image onError handler to automatically fallback to default food image.
 */
export function handleImageError(e, fallbackUrl = DEFAULT_FOOD_FALLBACK) {
  if (e && e.target) {
    e.target.onerror = null; // Prevent infinite fallback loops
    e.target.src = fallbackUrl;
  }
}
