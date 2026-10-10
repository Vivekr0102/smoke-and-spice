const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/data/menuData.js');
let fileContent = fs.readFileSync(filePath, 'utf8');

// Require the exported data
const { MENU_ITEMS } = require('./src/data/menuData.js');

const updatedCategories = [
  { id: 'all', name: 'All Dishes', group: 'All' },
  { id: 'nonveg-starters', name: '🍗 Non-Veg Starters', group: 'Starters' },
  { id: 'tandoori-starters', name: '🔥 Tandoori Starters', group: 'Starters' },
  { id: 'nonveg-main', name: '🥘 Non-Veg Main Course', group: 'Main Course' },
  { id: 'veg-main', name: '🥦 Veg Main Course', group: 'Main Course' },
  { id: 'roti-bread', name: '🍞 Breads & Roti', group: 'Breads' },
  { id: 'dal-rice', name: '🍚 Dal & Rice', group: 'Rice & Dal' },
  { id: 'nonveg-biryani', name: '🍗 Non-Veg Biryani', group: 'Biryani' },
  { id: 'veg-biryani', name: '🥗 Veg Biryani & Pulao', group: 'Biryani' },
  { id: 'family-pack', name: '📦 Family Packs', group: 'Family Packs' },
  { id: 'nonveg-fried-rice', name: '🍚 Non-Veg Fried Rice', group: 'Fried Rice' },
  { id: 'veg-fried-rice', name: '🥦 Veg Fried Rice', group: 'Fried Rice' },
  { id: 'nonveg-noodles', name: '🍜 Non-Veg Noodles', group: 'Noodles' },
  { id: 'veg-noodles', name: '🥦 Veg Noodles', group: 'Noodles' },
  { id: 'nonveg-soup', name: '🥣 Non-Veg Soup', group: 'Soups' },
  { id: 'veg-soup', name: '🥗 Veg Soup', group: 'Soups' },
];

const categorizeItem = (item) => {
  const name = item.name.toLowerCase();
  const oldCat = item.category;

  if (oldCat === 'soups') {
    return name.includes('veg') && !name.includes('non') ? 'veg-soup' : 'nonveg-soup';
  }

  if (oldCat === 'starters') {
    if (
      name.includes('tandoori') ||
      name.includes('tikka') ||
      name.includes('kabab') ||
      name.includes('seekh') ||
      name.includes('banjara')
    ) {
      return 'tandoori-starters';
    }
    return 'nonveg-starters';
  }

  if (oldCat === 'biryani') {
    if (name.includes('veg') || name.includes('paneer')) {
      return 'veg-biryani';
    }
    return 'nonveg-biryani';
  }

  if (oldCat === 'fried-rice') {
    if (name.startsWith('veg ')) {
      return 'veg-fried-rice';
    }
    return 'nonveg-fried-rice';
  }

  if (oldCat === 'noodles') {
    if (name.startsWith('veg ') || name.includes('paneer')) {
      return 'veg-noodles';
    }
    return 'nonveg-noodles';
  }

  return oldCat;
};

const updatedItems = MENU_ITEMS.map((item) => ({
  ...item,
  category: categorizeItem(item),
}));

// Build code string
const newCategoriesCode = `export const MENU_CATEGORIES = ${JSON.stringify(updatedCategories, null, 2)};`;

// Update MENU_CATEGORIES in file
fileContent = fileContent.replace(
  /export const MENU_CATEGORIES = \[[\s\S]*?\];/m,
  newCategoriesCode
);

// Write updated items
const newItemsCode = `export const MENU_ITEMS = ${JSON.stringify(updatedItems, null, 2)};`;

fileContent = fileContent.replace(
  /export const MENU_ITEMS = \[[\s\S]*?\];/m,
  newItemsCode
);

fs.writeFileSync(filePath, fileContent, 'utf8');

console.log('--- REFACTOR SUMMARY ---');
console.log('Total items processed:', updatedItems.length);
const counts = {};
updatedItems.forEach((i) => (counts[i.category] = (counts[i.category] || 0) + 1));
console.log('Category Counts:', counts);
