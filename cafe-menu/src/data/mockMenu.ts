// Tasty Square & Pocket Waffle - Menu Items
export interface MenuItem {
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
  badge?: 'Bestseller' | 'Chef Special' | 'Must Try' | 'Popular' | 'Spicy';
  image: string;
  hasIceCreamAddon?: boolean;
  servingSize?: string;
  prepTime?: string;
  packingCharge?: number;
}

export interface SectionMeta {
  id: 'food' | 'drinks' | 'desserts' | 'coffee_tea';
  name: string;
  shortTitle: string;
  subtitle: string;
  icon: string;
  tagline: string;
  badge: string;
  bgGradient: string;
  coverImage: string;
  accentColor: string;
}

export const CAFE_SETTINGS = {
  "name": "Tasty Square & Pocket Waffle",
  "tagline": "Fresh • Tasty • Delicious",
  "address": "Tasty Square, Main Market, City Food Hub",
  "phone": "+91 98765 43210",
  "timing": "10:00 AM – 11:30 PM",
  "upiId": "Vyapar.178829117938@hdfcbank",
  "qrImage": "/payment-qr.jpg",
  "packingChargeRate": 20,
  "packingChargeNotice": "Packing charges would be extra as per menu card",
  "rating": 4.9,
  "totalReviews": 2450
};

export const ICE_CREAM_ADDONS = [
  {
    "id": "icecream-vanilla",
    "name": "Vanilla Ice Cream Scoop",
    "price": 30
  },
  {
    "id": "icecream-chocolate",
    "name": "Chocolate Ice Cream Scoop",
    "price": 40
  }
];

export const SECTIONS: SectionMeta[] = [
  {
    "id": "food",
    "name": "Tasty Square Kitchen",
    "shortTitle": "Food",
    "subtitle": "Burgers, Pizzas, Sandwiches, Chinese & Meals",
    "icon": "🍔",
    "tagline": "Freshly Prepared • Sizzling Hot • Full of Flavor",
    "badge": "Savory & Sizzling",
    "bgGradient": "from-orange-500/20 via-amber-500/10 to-transparent",
    "coverImage": "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80",
    "accentColor": "#D4451A"
  },
  {
    "id": "desserts",
    "name": "Pocket Waffle & Desserts",
    "shortTitle": "Waffles",
    "subtitle": "Belgian Stick Waffles, Round Waffles, Kunafa & Brownies",
    "icon": "🧇",
    "tagline": "Warm & Crisp • Belgian Chocolate Glazed",
    "badge": "Sweet & Crisp",
    "bgGradient": "from-amber-500/20 via-yellow-500/10 to-transparent",
    "coverImage": "https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=800&q=80",
    "accentColor": "#D97706"
  },
  {
    "id": "drinks",
    "name": "Thick Shakes & Mocktails",
    "shortTitle": "Drinks",
    "subtitle": "Thick Shakes, Fresh Fruit Coolers & Mocktails",
    "icon": "🥤",
    "tagline": "Chilled • Refreshing • Pure Delight",
    "badge": "Chilled & Fresh",
    "bgGradient": "from-pink-500/20 via-rose-500/10 to-transparent",
    "coverImage": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80",
    "accentColor": "#DB2777"
  },
  {
    "id": "coffee_tea",
    "name": "Chai & Coffee Bar",
    "shortTitle": "Tea & Coffee",
    "subtitle": "Cutting Chai, Masala Tea, Hot & Iced Cold Coffees",
    "icon": "☕",
    "tagline": "Kadak Chai • Rich Espresso • Frothy Cold Coffee",
    "badge": "Warm Sips",
    "bgGradient": "from-amber-600/20 via-orange-500/10 to-transparent",
    "coverImage": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80",
    "accentColor": "#78350F"
  }
];

export const MENU_ITEMS: MenuItem[] = [];
