const fs = require('fs');
const path = require('path');

const extractedDishes2 = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../EXCEL FILES/extracted_dishes2.json'), 'utf8')
);

const mediaDir = path.join(__dirname, '../EXCEL FILES/extracted_menu2/xl/media');
const targetImgDir = path.join(__dirname, '../frontend/public/images/dishes');

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function getDetails(sheet, name, price) {
  let sectionId = 'food';
  let category = '';
  let servingSize = '1 Plate';
  let prepTime = '10-12 min';
  let badge = undefined;
  let description = '';
  let ingredients = ['Fresh Ingredients', 'Traditional Spices'];
  let extra = {};

  if (sheet === 'French Fries and Snacks') {
    sectionId = 'food';
    category = 'Fries & Snacks';
    if (name.includes('Fries')) {
      servingSize = '1 Portion';
      prepTime = '6-8 min';
      if (name.includes('Peri Peri')) {
        badge = 'Bestseller';
        description = 'Crispy golden potato fries generously dusted with spicy, tangy African bird’s eye peri-peri spice.';
        ingredients = ['Crisp Potato Fries', 'Peri Peri Spice', 'Chilli Flakes', 'Dip'];
      } else if (name.includes('Masala')) {
        badge = 'Popular';
        description = 'Crunchy deep-fried potato fries tossed with chatpata Indian chaat masala and herbs.';
        ingredients = ['Crisp Potato Fries', 'Chaat Masala', 'Tangy Seasoning'];
      } else {
        description = 'Classic hot and crispy golden potato fries lightly salted, served piping hot with ketchup.';
        ingredients = ['Golden Potato Fries', 'Sea Salt', 'Tomato Dip'];
      }
    } else if (name.includes('Momos')) {
      servingSize = '6 Pcs';
      prepTime = '10-12 min';
      if (name.includes('Cheese Corn')) {
        badge = 'Chef Special';
        description = 'Steamed Himalayan dumplings packed with melted mozzarella, sweet golden corn, and aromatic herbs.';
        ingredients = ['Mozzarella Cheese', 'Sweet Corn', 'Herb Dumpling Wrappers', 'Spicy Momo Chutney'];
      } else if (name.includes('Paneer')) {
        badge = 'Popular';
        description = 'Delicate steamed dumplings stuffed with spiced crumbled fresh paneer and coriander.';
        ingredients = ['Fresh Malai Paneer', 'Finely Chopped Herbs', 'Fiery Red Momo Chutney'];
      } else {
        description = 'Authentic steamed dumplings loaded with finely minced cabbage, carrots, bell peppers, and scallions.';
        ingredients = ['Seasonal Vegetables', 'Ginger Garlic', 'Steamed Dumpling Wrap', 'Red Chutney'];
      }
    } else if (name.includes('Spring Roll')) {
      servingSize = '2 Rolls / 6 Pcs';
      prepTime = '10-12 min';
      badge = 'Must Try';
      description = 'Golden crispy pastry rolls stuffed with shredded wok-tossed vegetables and glass noodles.';
      ingredients = ['Spring Roll Wrapper', 'Shredded Cabbage', 'Carrot', 'Sweet Chilli Dip'];
    }
  } else if (sheet === 'Sandwich') {
    sectionId = 'food';
    category = 'Sandwiches';
    servingSize = '2 Cut Slices';
    prepTime = '8-10 min';
    if (name.includes('Jumbo Special')) {
      badge = 'Bestseller';
      description = 'Multi-layered jumbo grilled sandwich packed with paneer, melting cheese, vibrant vegetables, and zesty secret house sauces.';
      ingredients = ['Jumbo Bread', 'Fresh Paneer', 'Amul Cheese', 'Veggies', 'House Chutney'];
    } else if (name.includes('Paneer Cheese')) {
      badge = 'Chef Special';
      description = 'Grilled sandwich loaded with thick cottage cheese slabs, melted cheese, bell peppers, and mint spread.';
      ingredients = ['Malai Paneer', 'Melted Cheese', 'Butter', 'Green Chutney'];
    } else if (name.includes('Paneer')) {
      description = 'Crisp grilled bread stuffed with seasoned paneer bhurji, tomatoes, capsicum, and chaat herbs.';
      ingredients = ['Fresh Paneer', 'Capsicum', 'Onion', 'Toasted Butter Bread'];
    } else if (name.includes('Aloo Tikki')) {
      description = 'Spiced golden potato patty tucked between grilled buttery bread with tangy sauces and crunchy onions.';
      ingredients = ['Crisp Potato Patty', 'Mint Mayo', 'Sliced Tomato', 'Toasted Bread'];
    } else if (name.includes('Masala Cheese')) {
      badge = 'Popular';
      description = 'Spiced vegetable mash layered with gooey cheddar cheese and toasted golden brown.';
      ingredients = ['Spiced Potato Masala', 'Melted Cheese', 'Butter', 'Toasted Bread'];
    } else if (name.includes('Cheese Chutney')) {
      description = 'Classic Mumbai-style sandwich with sharp cheese slices and spicy coriander-mint chutney on buttery toast.';
      ingredients = ['Cheese Slices', 'Spicy Mint Chutney', 'Amul Butter'];
    } else if (name.includes('Corn Mayo')) {
      description = 'Juicy sweet corn kernels smothered in creamy seasoned mayonnaise between grilled crusts.';
      ingredients = ['Sweet Corn', 'Creamy Mayo', 'Black Pepper', 'Toasted Bread'];
    } else if (name.includes('Vegetable Cheese')) {
      description = 'Crunchy cucumbers, ripe tomatoes, bell peppers, and melting cheese seasoned with oregano.';
      ingredients = ['Garden Vegetables', 'Cheese Slice', 'Herbs', 'Butter Bread'];
    } else {
      description = 'Spiced potato and onion mixture seasoned with traditional street-style masala on grilled bread.';
      ingredients = ['Aloo Masala', 'Green Chutney', 'Toasted Bread'];
    }
  } else if (sheet === 'Pizza') {
    sectionId = 'food';
    category = 'Pizzas';
    servingSize = 'Regular 8"';
    prepTime = '12-15 min';
    if (name.includes('Chef Special')) {
      badge = 'Chef Special';
      description = 'Loaded supreme pizza featuring paneer tikka, sweet corn, black olives, jalapenos, bell peppers, and double mozzarella.';
      ingredients = ['Handcrafted Dough', 'Paneer Tikka', 'Jalapenos', 'Mozzarella & Cheddar', 'Italian Herbs'];
    } else if (name.includes('Cheese Burst')) {
      badge = 'Bestseller';
      description = 'Decadent pizza with a molten gooey cheese stuffed inside the crust, blanketed with golden baked mozzarella.';
      ingredients = ['Liquid Cheese Core', 'Mozzarella Layer', 'Rich Pizza Sauce', 'Oregano Seasoning'];
    } else if (name.includes('Paneer Tikka')) {
      badge = 'Must Try';
      description = 'Tandoori-marinated paneer chunks baked with capsicum, red onions, and smoky tandoori spiced tomato sauce.';
      ingredients = ['Tandoori Paneer', 'Crisp Capsicum', 'Red Onion', 'Mozzarella'];
    } else if (name.includes('Farm House')) {
      badge = 'Popular';
      description = 'Colorful celebration of crisp capsicum, ripe tomatoes, sweet corn, and onions over rich herb tomato sauce.';
      ingredients = ['Capsicum', 'Onions', 'Sweet Corn', 'Mozzarella Blend'];
    } else if (name.includes('Paneer Pizza')) {
      description = 'Soft cottage cheese cubes generously spread over herb marinara and melted mozzarella.';
      ingredients = ['Fresh Paneer Cubes', 'Tomato Basil Sauce', 'Mozzarella Cheese'];
    } else if (name.includes('Sweet Corn')) {
      description = 'Sweet juicy corn kernels layered over creamy mozzarella cheese and seasoned with Italian herbs.';
      ingredients = ['Golden Sweet Corn', 'Italian Cheese', 'Oregano Blend'];
    } else if (name.includes('Capsicum')) {
      description = 'Crispy green bell peppers and aromatic mozzarella on a crispy golden baked crust.';
      ingredients = ['Fresh Bell Peppers', 'Marinara Sauce', 'Mozzarella'];
    } else if (name.includes('Onion')) {
      description = 'Crunchy caramelized red onions paired with tangy pizza sauce and bubbling melted cheese.';
      ingredients = ['Red Onions', 'Mozzarella Cheese', 'Pizza Sauce'];
    } else {
      description = 'Simple timeless classic pizza topped with fragrant tomato basil sauce and pure melted mozzarella.';
      ingredients = ['Crisp Pizza Base', 'Rich Tomato Puree', 'Mozzarella'];
    }
  } else if (sheet === 'Burger') {
    sectionId = 'food';
    category = 'Burgers';
    servingSize = '1 Burger';
    prepTime = '10-12 min';
    if (name.includes('Paneer Cheese')) {
      badge = 'Chef Special';
      description = 'Crispy panko-crusted cottage cheese patty with melted cheese, iceberg lettuce, tomatoes, and spicy chipotle mayo.';
      ingredients = ['Crisp Paneer Patty', 'Cheddar Cheese Slice', 'Lettuce', 'Toasted Sesame Bun'];
    } else if (name.includes('Double Cheese')) {
      badge = 'Bestseller';
      description = 'Spiced vegetable patty smothered under double slices of gooey cheddar cheese and smoky burger relish.';
      ingredients = ['Spiced Patty', 'Double Cheddar Slices', 'Onion Rings', 'Toasted Brioche Bun'];
    } else if (name.includes('Veg Cheese')) {
      badge = 'Popular';
      description = 'Hearty garden vegetable patty topped with melted cheese, crisp lettuce, sliced tomatoes, and creamy house dressing.';
      ingredients = ['Vegetable Patty', 'Cheese Slice', 'Pickles & Greens', 'Soft Bun'];
    } else if (name.includes('Cheese Burger')) {
      description = 'Golden spiced patty stacked with melted American cheese, crunchy cucumber, tomatoes, and cocktail sauce.';
      ingredients = ['Golden Patty', 'Cheese Slice', 'Cocktail Burger Sauce', 'Sesame Bun'];
    } else {
      description = 'Street-favorite crispy potato patty with fresh onion rings, tomatoes, and zesty herb sauce in a toasted bun.';
      ingredients = ['Crisp Aloo Patty', 'Onion & Tomato', 'Zesty Mayo', 'Toasted Bun'];
    }
  } else if (sheet === 'Maggi') {
    sectionId = 'food';
    category = 'Maggi & Noodles';
    servingSize = '1 Bowl';
    prepTime = '6-8 min';
    if (name.includes('Punjabi Tadka')) {
      badge = 'Chef Special';
      description = 'Dhaba-style Maggi tempered with sizzling garlic, cumin, onions, green chillies, and pure desi ghee.';
      ingredients = ['Maggi Noodles', 'Desi Ghee Tadka', 'Burnt Garlic', 'Green Chillies', 'Spices'];
    } else if (name.includes('Cheese Maggi')) {
      badge = 'Bestseller';
      description = 'Comforting soupy Maggi smothered with generous grated processed cheese and cracked black pepper.';
      ingredients = ['Maggi Noodles', 'Amul Cheese Melt', 'Tastemaker Spice', 'Herbs'];
    } else if (name.includes('Vegetable Maggi')) {
      badge = 'Popular';
      description = 'Stir-fried Maggi loaded with crunchy carrots, green peas, capsicum, and onions in aromatic broth.';
      ingredients = ['Maggi Noodles', 'Garden Peas', 'Carrots', 'Capsicum', 'Special Masala'];
    } else if (name.includes('Schezwan')) {
      badge = 'Spicy';
      description = 'Fiery hot Maggi noodles tossed in red Schezwan sauce, crushed garlic, and spring onions.';
      ingredients = ['Maggi Noodles', 'Schezwan Sauce', 'Garlic', 'Chilli Oil'];
    } else if (name.includes('Double Masala')) {
      description = 'Extra punchy Maggi noodles infused with double sachets of classic aromatic tastemaker seasoning.';
      ingredients = ['Maggi Noodles', 'Double Masala Blend', 'Butter'];
    } else if (name.includes('Masala Maggi')) {
      description = 'Classic seasoned Maggi noodles cooked with sliced onions, green chillies, and rich masala.';
      ingredients = ['Maggi Noodles', 'Onions', 'Tastemaker', 'Butter'];
    } else {
      description = 'The quintessential 2-minute Maggi noodles prepared plain and simple, piping hot and comforting.';
      ingredients = ['Maggi Noodles', 'Original Tastemaker'];
    }
  } else if (sheet === 'Tea and Coffee') {
    sectionId = 'coffee_tea';
    if (name.includes('Tea')) {
      category = 'Artisan Teas & Chai';
      servingSize = '150 ml Cup';
      prepTime = '5-7 min';
      if (name.includes('Masala Tea')) {
        badge = 'Bestseller';
        description = 'Aromatic kadak chai slow-simmered with crushed green cardamom, fresh ginger, cinnamon, and whole spices.';
        ingredients = ['First Flush Assam CTC', 'Fresh Ginger', 'Cardamom', 'Creamy Milk'];
        extra = {
          tempPreference: 'Hot',
          brewMethod: 'Slow Spiced Decoction',
          origin: 'Upper Assam Estate',
          roastLevel: 'Hand-Crushed Spice Blend',
          caffeineLevel: 'Medium',
          tastingNotes: ['Fresh Ginger', 'Green Cardamom', 'Warm Cinnamon']
        };
      } else {
        badge = 'Popular';
        description = 'Traditional Indian kadak chai brewed to perfection with premium Assam tea leaves and wholesome milk.';
        ingredients = ['Assam CTC Tea', 'Full Cream Milk', 'Caramelized Sugar'];
        extra = {
          tempPreference: 'Hot',
          brewMethod: 'Traditional Kadak Brew',
          origin: 'Assam Valley',
          roastLevel: 'Golden CTC Leaf',
          caffeineLevel: 'Medium',
          tastingNotes: ['Malty', 'Rich Tea Aroma', 'Earthy Sweetness']
        };
      }
    } else if (name.includes('Cold')) {
      category = 'Cold Brews & Frappes';
      servingSize = '350 ml Glass';
      prepTime = '5-7 min';
      if (name.includes('Chocolate')) {
        badge = 'Chef Special';
        description = 'Decadent chilled frappe blending rich dark cocoa, espresso, creamy milk, and chocolate drizzle.';
        ingredients = ['Double Shot Espresso', 'Belgian Cocoa', 'Vanilla Cream', 'Chocolate Drizzle'];
        extra = {
          tempPreference: 'Iced',
          brewMethod: 'Blended Belgian Mocha Frappe',
          origin: 'Artisan Blend & 70% Dark Cocoa',
          roastLevel: 'Medium-Dark Roast',
          caffeineLevel: 'Energy Boost',
          tastingNotes: ['Belgian Chocolate', 'Rich Fudge', 'Espresso Glaze']
        };
      } else if (name.includes('Icecream')) {
        badge = 'Must Try';
        description = 'Silky cold coffee topped with a velvety scoop of rich vanilla ice cream and dusted cocoa.';
        ingredients = ['Espresso Base', 'Full Cream Milk', 'Vanilla Ice Cream Scoop', 'Cocoa Dust'];
        extra = {
          tempPreference: 'Iced',
          brewMethod: 'Gourmet Affogato Frappe',
          origin: 'Chikmagalur Arabica',
          roastLevel: 'Slow Roasted Espresso',
          caffeineLevel: 'Medium',
          tastingNotes: ['Madagascar Vanilla', 'Decadent Cream', 'Espresso Swirl']
        };
      } else {
        badge = 'Bestseller';
        description = 'Creamy, frothy iced cold coffee whipped with freshly brewed espresso and chilled sweetened milk.';
        ingredients = ['Fresh Espresso Shot', 'Chilled Cream Milk', 'Sweet Froth'];
        extra = {
          tempPreference: 'Iced',
          brewMethod: 'Chilled Whipped Espresso',
          origin: 'Single Origin Robusta & Arabica',
          roastLevel: 'Dark Roast Blend',
          caffeineLevel: 'Energy Boost',
          tastingNotes: ['Thick Foam', 'Sweet Mocha', 'Chilled Cream']
        };
      }
    } else {
      // Hot Coffee & Black Coffee
      category = 'Hot Espresso & Brews';
      servingSize = '200 ml Cup';
      prepTime = '4-6 min';
      if (name.includes('Black')) {
        badge = 'Bold Energy';
        description = 'Intense and aromatic double-shot espresso poured over hot spring water with a golden crema.';
        ingredients = ['100% Arabica Beans', 'Filtered Hot Spring Water'];
        extra = {
          tempPreference: 'Hot',
          brewMethod: 'Double Shot Americano',
          origin: 'Chikmagalur Arabica Estate',
          roastLevel: 'Medium-Dark Roast',
          caffeineLevel: 'High',
          tastingNotes: ['Dark Cocoa', 'Roasted Almond', 'Subtle Citrus']
        };
      } else {
        badge = 'Signature Brew';
        description = 'Rich, aromatic freshly brewed espresso folded into velvety microfoam steamed milk with a smooth finish.';
        ingredients = ['Fresh Espresso Shot', 'Steamed Microfoam Milk'];
        extra = {
          tempPreference: 'Hot',
          brewMethod: 'Steamed Microfoam Espresso',
          origin: 'Coorg Plantation Arabica',
          roastLevel: 'Medium Roast',
          caffeineLevel: 'Medium',
          tastingNotes: ['Velvet Cream', 'Toasted Hazelnut', 'Caramel']
        };
      }
    }
  }

  return { sectionId, category, servingSize, prepTime, badge, description, ingredients, extra };
}

// 1. Read existing mockMenu.ts
const frontendMockPath = path.join(__dirname, '../frontend/src/data/mockMenu.ts');
let frontendContent = fs.readFileSync(frontendMockPath, 'utf8');

const existingItemsMatch = frontendContent.match(/export const MENU_ITEMS:\s*MenuItem\[\]\s*=\s*(\[[\s\S]*?\]);/);
if (!existingItemsMatch) {
  console.error('Failed to parse existing MENU_ITEMS from frontend/src/data/mockMenu.ts');
  process.exit(1);
}

const existingItems = JSON.parse(existingItemsMatch[1]);
console.log(`Loaded ${existingItems.length} existing dishes from file 1.`);

// 2. Process File 2 items
const newItems = [];
const seenSlugs = {};
existingItems.forEach(i => { seenSlugs[i.id] = 1; });

extractedDishes2.forEach((item, index) => {
  let slug = slugify(item.dishName);
  if (seenSlugs[slug]) {
    seenSlugs[slug]++;
    slug = `${slug}-${seenSlugs[slug]}`;
  } else {
    seenSlugs[slug] = 1;
  }

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

  const details = getDetails(item.sheet, item.dishName, item.price);
  const rating = Number((4.6 + ((index + 3) % 4) * 0.1).toFixed(1));
  const ratingCount = 50 + ((index * 17) % 130);

  const menuItem = {
    id: slug,
    name: item.dishName,
    sectionId: details.sectionId,
    category: details.category,
    price: item.price,
    description: details.description,
    ingredients: details.ingredients,
    isVeg: true,
    isAvailable: true,
    rating,
    ratingCount,
    ...(details.badge ? { badge: details.badge } : {}),
    image: imagePath,
    servingSize: details.servingSize,
    prepTime: details.prepTime,
    ...details.extra
  };

  newItems.push(menuItem);
  console.log(`[+ New] "${menuItem.name}" -> Category: "${menuItem.category}", Section: "${menuItem.sectionId}", Image: "${imagePath}"`);
});

const totalDishes = [...existingItems, ...newItems];
console.log(`Combined total dishes: ${totalDishes.length} (${existingItems.length} + ${newItems.length})`);

// 3. Update MenuItem interface if needed
const interfaceDeclaration = `export interface MenuItem {
  id: string;
  name: string;
  nameHindi?: string;
  sectionId: 'food' | 'drinks' | 'desserts' | 'coffee_tea';
  category: string;
  price: number;
  description: string;
  ingredients?: string[];
  allergens?: string[];
  isVeg: boolean;
  isAvailable: boolean;
  rating: number;
  ratingCount: number;
  badge?: 'Bestseller' | 'Chef Special' | 'Must Try' | 'Popular' | 'Spicy' | 'Signature Brew' | 'Single Origin' | 'Bold Energy' | string;
  image: string;
  hasIceCreamAddon?: boolean;
  servingSize?: string;
  prepTime?: string;
  packingCharge?: number;
  origin?: string;
  roastLevel?: string;
  brewMethod?: string;
  caffeineLevel?: string;
  tastingNotes?: string[];
  tempPreference?: 'Hot' | 'Iced' | 'Both';
}`;

const ifaceRegex = /export interface MenuItem\s*\{[\s\S]*?\n\}/;
if (ifaceRegex.test(frontendContent)) {
  frontendContent = frontendContent.replace(ifaceRegex, interfaceDeclaration);
}

// 4. Update frontend mockMenu.ts
const menuItemsExportRegex = /export const MENU_ITEMS:\s*MenuItem\[\]\s*=\s*\[[\s\S]*?\];/;
const newExport = `export const MENU_ITEMS: MenuItem[] = ${JSON.stringify(totalDishes, null, 2)};`;

frontendContent = frontendContent.replace(menuItemsExportRegex, newExport);
fs.writeFileSync(frontendMockPath, frontendContent, 'utf8');
console.log('Updated frontend/src/data/mockMenu.ts successfully!');

// 5. Update backend mockData.js
const backendMockPath = path.join(__dirname, '../backend/src/data/mockData.js');
let backendContent = fs.readFileSync(backendMockPath, 'utf8');
const backendRegex = /const MENU_ITEMS\s*=\s*\[[\s\S]*?\];/;
const newBackendExport = `const MENU_ITEMS = ${JSON.stringify(totalDishes, null, 2)};`;

backendContent = backendContent.replace(backendRegex, newBackendExport);
fs.writeFileSync(backendMockPath, backendContent, 'utf8');
console.log('Updated backend/src/data/mockData.js successfully!');

// Section breakdown
const sectionSummary = {};
totalDishes.forEach(i => {
  sectionSummary[i.sectionId] = (sectionSummary[i.sectionId] || 0) + 1;
});
console.log('Dishes per section:', sectionSummary);

