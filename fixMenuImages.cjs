const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/data/menuData.js');
let content = fs.readFileSync(filePath, 'utf8');

// Replace serious eats / non-image links with reliable Unsplash dish URLs
content = content.replace(
  /'https:\/\/www\.seriouseats\.com\/thmb\/[^']+'/g,
  "'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80'"
);

content = content.replace(
  /'https:\/\/www\.seriouseats\.com\/classic-chicken-soup'/g,
  "'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80'"
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully sanitized menuData.js image URLs!');
