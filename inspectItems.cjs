const { MENU_ITEMS, MENU_CATEGORIES } = require('./src/data/menuData.js');

console.log('--- ALL MENU ITEMS ANALYSIS ---');
MENU_ITEMS.forEach((item, index) => {
  console.log(`${index + 1}. [${item.category}] ${item.name} (Half: ${item.priceHalf}, Full: ${item.price}) - Tags: ${item.tags.join(', ')}`);
});
