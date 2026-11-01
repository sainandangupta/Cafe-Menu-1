const fs = require('fs');
const path = require('path');

const extractedDishes = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../EXCEL FILES/extracted_dishes1.json'), 'utf8')
);

const mediaDir = path.join(__dirname, '../EXCEL FILES/extracted_menu1/xl/media');
const targetImgDir = path.join(__dirname, '../frontend/public/images/dishes');
if (!fs.existsSync(targetImgDir)) {
  fs.mkdirSync(targetImgDir, { recursive: true });
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Section & Category mapping
function getMeta(sheet, name) {
  let sectionId = 'food';
  let category = '';
  let servingSize = '1 Plate';
  let prepTime = '10-15 min';
  let badge = undefined;
  let description = '';
  let ingredients = ['Fresh Ingredients', 'Traditional Spices'];

  if (sheet === 'Chhole Bhature and Pulao') {
    sectionId = 'food';
    category = 'Chole Bhature & Pulao';
    servingSize = '1 Plate';
    if (name.includes('Chole Bhature')) {
      description = 'Crispy golden puffed bhature served with rich spiced Punjabi chole, tangy pickle, and pickled onions.';
      ingredients = ['Kabuli Chana', 'Flour Bhature', 'Special Masala', 'Pickled Onions'];
      if (name === 'Chole Bhature') badge = 'Bestseller';
      if (name.includes('Punjabi')) badge = 'Chef Special';
    } else {
      description = 'Fragrant basmati rice tossed with aromatic spices, garden-fresh vegetables, and premium toppings.';
      ingredients = ['Basmati Rice', 'Pure Ghee', 'Saffron Spices', 'Fried Nuts'];
      if (name.includes('Shahi')) badge = 'Must Try';
    }
  } else if (sheet === 'Fried Rice') {
    sectionId = 'food';
    category = 'Fried Rice';
    servingSize = '1 Plate';
    description = 'Wok-tossed aromatic rice prepared with crunchy seasonal vegetables, soy, and oriental herbs.';
    ingredients = ['Steamed Rice', 'Spring Onions', 'Bell Peppers', 'Oriental Spices'];
    if (name.includes('Schezwan')) {
      badge = 'Spicy';
      description = 'Spicy wok-fried rice tossed in fiery home-made Schezwan sauce and garlic.';
    }
    if (name.includes('Manchurian')) badge = 'Popular';
  } else if (sheet === 'Chinese') {
    sectionId = 'food';
    category = 'Chinese';
    servingSize = '1 Plate';
    if (name.includes('Noodles')) {
      description = 'Handcrafted noodles wok-tossed with fresh crunchy vegetables, garlic, and savory Asian sauces.';
      ingredients = ['Noodles', 'Bell Peppers', 'Cabbage', 'Soy Garlic Glaze'];
      if (name === 'Veg Hakka Noodles') badge = 'Bestseller';
      if (name.includes('Spicy') || name.includes('Schezwan')) badge = 'Spicy';
    } else if (name.includes('Manchurian')) {
      description = 'Golden crispy vegetable balls simmered in a delectable ginger, garlic, and coriander sauce.';
      ingredients = ['Veg Dumplings', 'Ginger Garlic', 'Soy Sauce', 'Spring Onion'];
      if (name.includes('Dry')) badge = 'Must Try';
    } else if (name.includes('Paneer')) {
      description = 'Succulent cubes of fresh cottage cheese stir-fried with capsicum, onions, and spicy chilli glaze.';
      ingredients = ['Fresh Paneer', 'Green Chillies', 'Capsicum', 'Garlic Soya'];
      if (name.includes('Dry Chilli Paneer')) badge = 'Chef Special';
    } else if (name.includes('Mushroom')) {
      description = 'Tender button mushrooms tossed with green chillies, cracked pepper, and rich wok aromatics.';
      ingredients = ['Fresh Button Mushrooms', 'Onions', 'Garlic', 'Chilli Paste'];
    } else if (name.includes('Corn')) {
      description = 'Sweet golden corn kernels flash-fried to perfection with tangy spices and scallions.';
      ingredients = ['Sweet Corn', 'Chilli Flakes', 'Spring Onion', 'Herbs'];
      if (name.includes('Crispy Corn')) badge = 'Bestseller';
    } else if (name.includes('Potato')) {
      description = 'Crisp potato fingers tossed in sticky sweet-and-spicy honey chilli sauce.';
      ingredients = ['Crisp Potatoes', 'Sesame Seeds', 'Chilli Sauce', 'Scallions'];
      badge = 'Popular';
    } else {
      description = 'Crispy noodles and fresh vegetable medley tossed in tangy sweet-and-spicy Chinese dressing.';
      ingredients = ['Crisp Noodles', 'Cabbage', 'Sweet Chilli Sauce'];
    }
  } else if (sheet === 'Soups and Pav Bhaji') {
    sectionId = 'food';
    category = 'Soups & Pav Bhaji';
    if (name.includes('Soup')) {
      servingSize = '1 Bowl';
      prepTime = '8-10 min';
      description = 'Warm comforting broth simmered with garden vegetables, aromatic herbs, and savory seasoning.';
      ingredients = ['Vegetable Broth', 'Sweet Corn / Exotic Veggies', 'Fresh Herbs'];
      if (name.includes('Manchow')) badge = 'Popular';
      if (name.includes('Sweet Corn')) badge = 'Bestseller';
    } else if (name.includes('Pav Bhaji')) {
      servingSize = '1 Plate';
      prepTime = '10-15 min';
      description = 'Mouthwatering spiced mashed vegetable curry topped with generous butter, served with soft toasted pav.';
      ingredients = ['Mashed Veggies', 'Amul Butter', 'Pav Bhaji Masala', 'Fresh Pav'];
      if (name === 'Pav Bhaji') badge = 'Bestseller';
      if (name === 'Butter Pav Bhaji') badge = 'Chef Special';
    } else if (name.includes('Vada Pav')) {
      servingSize = '1 Pc';
      prepTime = '5-8 min';
      description = 'Mumbai-style spiced potato dumpling inside a soft bun with fiery garlic chutney and fried chillies.';
      ingredients = ['Spiced Batata Vada', 'Soft Pav', 'Dry Garlic Chutney', 'Green Chutney'];
      badge = 'Popular';
    } else {
      servingSize = '2 Pcs';
      prepTime = '5 min';
      description = 'Soft pav toasted on tawa with golden butter.';
      ingredients = ['Fresh Pav', 'Amul Butter'];
    }
  } else if (sheet === 'Khichdi') {
    sectionId = 'food';
    category = 'Khichdi';
    servingSize = '1 Bowl';
    prepTime = '12-15 min';
    description = 'Homestyle wholesome preparation of rice and lentils tempered with cumin, pure ghee, and warming spices.';
    ingredients = ['Govindobhog / Basmati Rice', 'Yellow Moong Dal', 'Pure Desi Ghee', 'Cumin & Hing'];
    if (name.includes('Butter')) badge = 'Must Try';
    if (name.includes('Shahi')) badge = 'Chef Special';
  } else if (sheet === 'Mocktail') {
    sectionId = 'drinks';
    category = 'Mocktails';
    servingSize = '350 ml';
    prepTime = '5-8 min';
    description = 'Chilled handcrafted mocktail blended with premium fruit juices, sparkling soda, fresh mint, and zesty citrus.';
    ingredients = ['Sparkling Soda', 'Fruit Pulp / Syrup', 'Fresh Mint', 'Lemon Twist'];
    if (name.includes('Kala Katta') || name.includes('Jamun')) badge = 'Chef Special';
    if (name.includes('Mojito')) badge = 'Bestseller';
    if (name.includes('Chilli Guava')) badge = 'Must Try';
  } else if (sheet === 'Shake') {
    sectionId = 'drinks';
    category = 'Thick Shakes';
    servingSize = '350 ml';
    prepTime = '5-8 min';
    description = 'Thick and luscious shake churned with creamy full-cream milk, ice cream, and decadent flavors.';
    ingredients = ['Creamy Milk', 'Ice Cream Scoop', 'Rich Syrup / Real Fruit', 'Whipped Cream'];
    if (name.includes('KitKat')) badge = 'Bestseller';
    if (name.includes('Oreo')) badge = 'Popular';
    if (name.includes('Mango')) badge = 'Must Try';
    if (name.includes('Dry Fruit')) badge = 'Chef Special';
  }

  return { sectionId, category, servingSize, prepTime, badge, description, ingredients };
}

const menuItems = [];
const seenSlugs = {};

extractedDishes.forEach((item, index) => {
  let slug = slugify(item.dishName);
  if (seenSlugs[slug]) {
    seenSlugs[slug]++;
    slug = `${slug}-${seenSlugs[slug]}`;
  } else {
    seenSlugs[slug] = 1;
  }

  // Copy image
  let imagePath = '';
  if (item.mediaImage) {
    const srcImg = path.join(mediaDir, item.mediaImage);
    const destImgName = `${slug}.png`;
    const destImg = path.join(targetImgDir, destImgName);
    if (fs.existsSync(srcImg)) {
      fs.copyFileSync(srcImg, destImg);
      imagePath = `/images/dishes/${destImgName}`;
    }
  }

  const meta = getMeta(item.sheet, item.dishName);
  const rating = Number((4.6 + (index % 4) * 0.1).toFixed(1));
  const ratingCount = 45 + ((index * 13) % 120);

  menuItems.push({
    id: slug,
    name: item.dishName,
    sectionId: meta.sectionId,
    category: meta.category,
    price: item.price,
    description: meta.description,
    ingredients: meta.ingredients,
    isVeg: true,
    isAvailable: true,
    rating,
    ratingCount,
    ...(meta.badge ? { badge: meta.badge } : {}),
    image: imagePath,
    servingSize: meta.servingSize,
    prepTime: meta.prepTime
  });
});

console.log(`Generated ${menuItems.length} menu items.`);

// Update frontend/src/data/mockMenu.ts
const frontendMockPath = path.join(__dirname, '../frontend/src/data/mockMenu.ts');
let frontendContent = fs.readFileSync(frontendMockPath, 'utf8');

// Replace export const MENU_ITEMS: MenuItem[] = [...];
const menuItemsExportRegex = /export const MENU_ITEMS:\s*MenuItem\[\]\s*=\s*\[[\s\S]*?\];/;
const newExport = `export const MENU_ITEMS: MenuItem[] = ${JSON.stringify(menuItems, null, 2)};`;

if (menuItemsExportRegex.test(frontendContent)) {
  frontendContent = frontendContent.replace(menuItemsExportRegex, newExport);
  fs.writeFileSync(frontendMockPath, frontendContent, 'utf8');
  console.log('Updated frontend/src/data/mockMenu.ts successfully!');
} else {
  console.error('Could not find MENU_ITEMS in frontend mockMenu.ts');
}

// Update backend/src/data/mockData.js
const backendMockPath = path.join(__dirname, '../backend/src/data/mockData.js');
let backendContent = fs.readFileSync(backendMockPath, 'utf8');
const backendRegex = /const MENU_ITEMS\s*=\s*\[[\s\S]*?\];/;
const newBackendExport = `const MENU_ITEMS = ${JSON.stringify(menuItems, null, 2)};`;

if (backendRegex.test(backendContent)) {
  backendContent = backendContent.replace(backendRegex, newBackendExport);
  fs.writeFileSync(backendMockPath, backendContent, 'utf8');
  console.log('Updated backend/src/data/mockData.js successfully!');
} else {
  console.error('Could not find MENU_ITEMS in backend mockData.js');
}

// Summary breakdown
const sectionSummary = {};
menuItems.forEach(i => {
  sectionSummary[i.sectionId] = (sectionSummary[i.sectionId] || 0) + 1;
});
console.log('Dishes per section:', sectionSummary);

