// ============================================================
//  Krishna's Cafe — Restaurant Single-Page Application
//  38 dishes · Ratings · Category filters · Search
// ============================================================

// --------------- DISH DATA (38 items) ---------------

const dishes = [
  {
    id: "vegetable-maggie",
    name: "Vegetable Maggie",
    category: "Maggi",
    price: 70,
    description: "Maggie noodles tossed with fresh mixed vegetables.",
    detailDescription: "Maggie noodles tossed with fresh mixed vegetables. Made fresh to order with quality ingredients at Krishna's Cafe.",
    image: "images/vegetable_maggie.png",
    tags: ["V"],
    label: "",
    components: [
      { type: "BASE", name: "Instant Noodles", desc: "Classic Maggie noodles cooked to a perfect, springy bite." },
      { type: "CORE", name: "Vegetable Maggie", desc: "Onions, tomatoes, capsicum and peas tossed in with the noodles." },
      { type: "SEASONING", name: "Maggie Masala", desc: "Signature spice blend for that familiar, comforting flavour." },
      { type: "FINISH", name: "Butter & Herbs", desc: "A touch of butter and fresh coriander for richness." },
    ]
  },
  {
    id: "plain-maggie",
    name: "Plain Maggie",
    category: "Maggi",
    price: 50,
    description: "Classic Maggie noodles in simple masala broth.",
    detailDescription: "Classic Maggie noodles in simple masala broth. Made fresh to order with quality ingredients at Krishna's Cafe.",
    image: "images/plain_maggie.png",
    tags: ["V"],
    label: "",
    components: [
      { type: "BASE", name: "Instant Noodles", desc: "Classic Maggie noodles cooked to a perfect, springy bite." },
      { type: "CORE", name: "Plain Maggie", desc: "Onions, tomatoes, capsicum and peas tossed in with the noodles." },
      { type: "SEASONING", name: "Maggie Masala", desc: "Signature spice blend for that familiar, comforting flavour." },
      { type: "FINISH", name: "Butter & Herbs", desc: "A touch of butter and fresh coriander for richness." },
    ]
  },
  {
    id: "masala-maggie",
    name: "Masala Maggie",
    category: "Maggi",
    price: 60,
    description: "Spiced Maggie with extra masala kick.",
    detailDescription: "Spiced Maggie with extra masala kick. Made fresh to order with quality ingredients at Krishna's Cafe.",
    image: "images/masala_maggie.png",
    tags: ["V"],
    label: "",
    components: [
      { type: "BASE", name: "Instant Noodles", desc: "Classic Maggie noodles cooked to a perfect, springy bite." },
      { type: "CORE", name: "Masala Maggie", desc: "Onions, tomatoes, capsicum and peas tossed in with the noodles." },
      { type: "SEASONING", name: "Maggie Masala", desc: "Signature spice blend for that familiar, comforting flavour." },
      { type: "FINISH", name: "Butter & Herbs", desc: "A touch of butter and fresh coriander for richness." },
    ]
  },
  {
    id: "double-masala-maggie",
    name: "Double Masala Maggie",
    category: "Maggi",
    price: 70,
    description: "Extra masala for bold, fiery flavour.",
    detailDescription: "Extra masala for bold, fiery flavour. Made fresh to order with quality ingredients at Krishna's Cafe.",
    image: "images/double_masala_maggie.png",
    tags: ["V"],
    label: "",
    components: [
      { type: "BASE", name: "Instant Noodles", desc: "Classic Maggie noodles cooked to a perfect, springy bite." },
      { type: "CORE", name: "Double Masala Maggie", desc: "Onions, tomatoes, capsicum and peas tossed in with the noodles." },
      { type: "SEASONING", name: "Maggie Masala", desc: "Signature spice blend for that familiar, comforting flavour." },
      { type: "FINISH", name: "Butter & Herbs", desc: "A touch of butter and fresh coriander for richness." },
    ]
  },
  {
    id: "cheese-butter-maggie",
    name: "Cheese Butter Maggie",
    category: "Maggi",
    price: 100,
    description: "Creamy Maggie loaded with cheese and butter.",
    detailDescription: "Creamy Maggie loaded with cheese and butter. Made fresh to order with quality ingredients at Krishna's Cafe.",
    image: "images/cheese_butter_maggie.png",
    tags: ["V", "HIGH PROTEIN"],
    label: "POPULAR",
    components: [
      { type: "BASE", name: "Instant Noodles", desc: "Classic Maggie noodles cooked to a perfect, springy bite." },
      { type: "CORE", name: "Cheese Butter Maggie", desc: "Onions, tomatoes, capsicum and peas tossed in with the noodles." },
      { type: "SEASONING", name: "Maggie Masala", desc: "Signature spice blend for that familiar, comforting flavour." },
      { type: "FINISH", name: "Butter & Herbs", desc: "A touch of butter and fresh coriander for richness." },
    ]
  },
  {
    id: "plain-french-fries",
    name: "Plain French Fries",
    category: "French Fries",
    price: 70,
    description: "Crispy golden fries, lightly salted.",
    detailDescription: "Crispy golden fries, lightly salted. Made fresh to order with quality ingredients at Krishna's Cafe.",
    image: "images/plain_french_fries.png",
    tags: ["V"],
    label: "",
    components: [
      { type: "BASE", name: "Potato Fries", desc: "Crispy golden fries cut fresh and fried to order." },
      { type: "CORE", name: "Plain French Fries", desc: "Cooked twice for an extra-crunchy exterior and fluffy inside." },
      { type: "SEASONING", name: "Spice Dust", desc: "Salt and house spice mix tossed while hot." },
      { type: "FINISH", name: "Dipping Sauce", desc: "Served with ketchup and green chutney on the side." },
    ]
  },
  {
    id: "peri-peri-french-fries",
    name: "Peri Peri French Fries",
    category: "French Fries",
    price: 90,
    description: "Fries tossed in tangy peri peri seasoning.",
    detailDescription: "Fries tossed in tangy peri peri seasoning. Made fresh to order with quality ingredients at Krishna's Cafe.",
    image: "images/peri_peri_french_fries.png",
    tags: ["V"],
    label: "POPULAR",
    components: [
      { type: "BASE", name: "Potato Fries", desc: "Crispy golden fries cut fresh and fried to order." },
      { type: "CORE", name: "Peri Peri French Fries", desc: "Cooked twice for an extra-crunchy exterior and fluffy inside." },
      { type: "SEASONING", name: "Spice Dust", desc: "Salt and house spice mix tossed while hot." },
      { type: "FINISH", name: "Dipping Sauce", desc: "Served with ketchup and green chutney on the side." },
    ]
  },
  {
    id: "masala-french-fries",
    name: "Masala French Fries",
    category: "French Fries",
    price: 90,
    description: "Fries coated in chatpata masala dust.",
    detailDescription: "Fries coated in chatpata masala dust. Made fresh to order with quality ingredients at Krishna's Cafe.",
    image: "images/masala_french_fries.png",
    tags: ["V"],
    label: "",
    components: [
      { type: "BASE", name: "Potato Fries", desc: "Crispy golden fries cut fresh and fried to order." },
      { type: "CORE", name: "Masala French Fries", desc: "Cooked twice for an extra-crunchy exterior and fluffy inside." },
      { type: "SEASONING", name: "Spice Dust", desc: "Salt and house spice mix tossed while hot." },
      { type: "FINISH", name: "Dipping Sauce", desc: "Served with ketchup and green chutney on the side." },
    ]
  },
  {
    id: "veg-momos",
    name: "Veg Momos",
    category: "Momos",
    price: 100,
    description: "Steamed vegetable momos with spicy chutney.",
    detailDescription: "Soft steamed dumplings filled with seasoned vegetables, served with spicy red chutney and mayo. Available steamed (₹100) or fried (₹110).",
    image: "images/veg_momos.png",
    tags: ["V"],
    label: "POPULAR",
    components: [
      { type: "BASE", name: "Momo Wrapper", desc: "Soft, hand-rolled dough pockets steamed to tenderness." },
      { type: "CORE", name: "Veg Momos", desc: "A juicy, well-spiced filling packed in every bite." },
      { type: "SEASONING", name: "Ginger & Garlic", desc: "Aromatic base that gives momos their signature warmth." },
      { type: "FINISH", name: "Momos Chutney", desc: "Spicy red chutney and creamy mayo for dipping." },
    ]
  },
  {
    id: "paneer-momos",
    name: "Paneer Momos",
    category: "Momos",
    price: 130,
    description: "Momos filled with seasoned paneer crumble.",
    detailDescription: "Juicy paneer-filled momos, steamed or fried to your liking. Steamed ₹130 / Fried ₹140.",
    image: "images/paneer_momos.png",
    tags: ["V", "HIGH PROTEIN"],
    label: "",
    components: [
      { type: "BASE", name: "Momo Wrapper", desc: "Soft, hand-rolled dough pockets steamed to tenderness." },
      { type: "CORE", name: "Paneer Momos", desc: "A juicy, well-spiced filling packed in every bite." },
      { type: "SEASONING", name: "Ginger & Garlic", desc: "Aromatic base that gives momos their signature warmth." },
      { type: "FINISH", name: "Momos Chutney", desc: "Spicy red chutney and creamy mayo for dipping." },
    ]
  },
  {
    id: "cheese-corn-momos",
    name: "Cheese Corn Momos",
    category: "Momos",
    price: 140,
    description: "Cheesy corn filling in soft steamed momos.",
    detailDescription: "Creamy cheese and sweet corn filling in delicate steamed wrappers. Steamed only.",
    image: "images/cheese_corn_momos.png",
    tags: ["V", "HIGH PROTEIN"],
    label: "",
    components: [
      { type: "BASE", name: "Momo Wrapper", desc: "Soft, hand-rolled dough pockets steamed to tenderness." },
      { type: "CORE", name: "Cheese Corn Momos", desc: "A juicy, well-spiced filling packed in every bite." },
      { type: "SEASONING", name: "Ginger & Garlic", desc: "Aromatic base that gives momos their signature warmth." },
      { type: "FINISH", name: "Momos Chutney", desc: "Spicy red chutney and creamy mayo for dipping." },
    ]
  },
  {
    id: "schezwan-momos",
    name: "Schezwan Momos",
    category: "Momos",
    price: 140,
    description: "Momos tossed in fiery schezwan sauce.",
    detailDescription: "Momos drenched in bold schezwan sauce for extra heat. Steamed only.",
    image: "images/schezwan_momos.png",
    tags: ["V"],
    label: "",
    components: [
      { type: "BASE", name: "Momo Wrapper", desc: "Soft, hand-rolled dough pockets steamed to tenderness." },
      { type: "CORE", name: "Schezwan Momos", desc: "A juicy, well-spiced filling packed in every bite." },
      { type: "SEASONING", name: "Ginger & Garlic", desc: "Aromatic base that gives momos their signature warmth." },
      { type: "FINISH", name: "Momos Chutney", desc: "Spicy red chutney and creamy mayo for dipping." },
    ]
  },
  {
    id: "masala-sandwich",
    name: "Masala Sandwich",
    category: "Sandwiches",
    price: 90,
    description: "Grilled sandwich with masala-spiced veggies.",
    detailDescription: "Grilled sandwich with masala-spiced veggies. Made fresh to order with quality ingredients at Krishna's Cafe.",
    image: "images/masala_sandwich.png",
    tags: ["V"],
    label: "",
    components: [
      { type: "BASE", name: "Toasted Bread", desc: "Fresh bread grilled until crisp and golden." },
      { type: "CORE", name: "Masala Sandwich", desc: "Generous layers of veggies and house spreads." },
      { type: "SEASONING", name: "Chaat Masala", desc: "A tangy, savoury lift in every bite." },
      { type: "FINISH", name: "Cheese & Chutney", desc: "Melted cheese and green chutney where applicable." },
    ]
  },
  {
    id: "indori-sandwich",
    name: "Indori Sandwich",
    category: "Sandwiches",
    price: 100,
    description: "Indori-style sandwich with special bhujia topping.",
    detailDescription: "Indori-style sandwich with special bhujia topping. Made fresh to order with quality ingredients at Krishna's Cafe.",
    image: "images/indori_sandwich.png",
    tags: ["V"],
    label: "SIGNATURE DISH",
    components: [
      { type: "BASE", name: "Toasted Bread", desc: "Fresh bread grilled until crisp and golden." },
      { type: "CORE", name: "Indori Sandwich", desc: "Generous layers of veggies and house spreads." },
      { type: "SEASONING", name: "Chaat Masala", desc: "A tangy, savoury lift in every bite." },
      { type: "FINISH", name: "Cheese & Chutney", desc: "Melted cheese and green chutney where applicable." },
    ]
  },
  {
    id: "corn-mayo-sandwich",
    name: "Corn Mayo Sandwich",
    category: "Sandwiches",
    price: 100,
    description: "Sweet corn and mayo in toasted bread.",
    detailDescription: "Sweet corn and mayo in toasted bread. Made fresh to order with quality ingredients at Krishna's Cafe.",
    image: "images/corn_mayo_sandwich.png",
    tags: ["V"],
    label: "",
    components: [
      { type: "BASE", name: "Toasted Bread", desc: "Fresh bread grilled until crisp and golden." },
      { type: "CORE", name: "Corn Mayo Sandwich", desc: "Generous layers of veggies and house spreads." },
      { type: "SEASONING", name: "Chaat Masala", desc: "A tangy, savoury lift in every bite." },
      { type: "FINISH", name: "Cheese & Chutney", desc: "Melted cheese and green chutney where applicable." },
    ]
  },
  {
    id: "cheese-chutney-sandwich",
    name: "Cheese Chutney Sandwich",
    category: "Sandwiches",
    price: 110,
    description: "Melted cheese with tangy green chutney.",
    detailDescription: "Melted cheese with tangy green chutney. Made fresh to order with quality ingredients at Krishna's Cafe.",
    image: "images/cheese_chutney_sandwich.png",
    tags: ["V", "HIGH PROTEIN"],
    label: "",
    components: [
      { type: "BASE", name: "Toasted Bread", desc: "Fresh bread grilled until crisp and golden." },
      { type: "CORE", name: "Cheese Chutney Sandwich", desc: "Generous layers of veggies and house spreads." },
      { type: "SEASONING", name: "Chaat Masala", desc: "A tangy, savoury lift in every bite." },
      { type: "FINISH", name: "Cheese & Chutney", desc: "Melted cheese and green chutney where applicable." },
    ]
  },
  {
    id: "masala-cheese-sandwich",
    name: "Masala Cheese Sandwich",
    category: "Sandwiches",
    price: 110,
    description: "Spiced veggies and cheese, grilled crisp.",
    detailDescription: "Spiced veggies and cheese, grilled crisp. Made fresh to order with quality ingredients at Krishna's Cafe.",
    image: "images/masala_cheese_sandwich.png",
    tags: ["V", "HIGH PROTEIN"],
    label: "",
    components: [
      { type: "BASE", name: "Toasted Bread", desc: "Fresh bread grilled until crisp and golden." },
      { type: "CORE", name: "Masala Cheese Sandwich", desc: "Generous layers of veggies and house spreads." },
      { type: "SEASONING", name: "Chaat Masala", desc: "A tangy, savoury lift in every bite." },
      { type: "FINISH", name: "Cheese & Chutney", desc: "Melted cheese and green chutney where applicable." },
    ]
  },
  {
    id: "vegetable-sandwich",
    name: "Vegetable Sandwich",
    category: "Sandwiches",
    price: 100,
    description: "Fresh seasonal vegetables in a grilled sandwich.",
    detailDescription: "Fresh seasonal vegetables in a grilled sandwich. Made fresh to order with quality ingredients at Krishna's Cafe.",
    image: "images/vegetable_sandwich.png",
    tags: ["V"],
    label: "",
    components: [
      { type: "BASE", name: "Toasted Bread", desc: "Fresh bread grilled until crisp and golden." },
      { type: "CORE", name: "Vegetable Sandwich", desc: "Generous layers of veggies and house spreads." },
      { type: "SEASONING", name: "Chaat Masala", desc: "A tangy, savoury lift in every bite." },
      { type: "FINISH", name: "Cheese & Chutney", desc: "Melted cheese and green chutney where applicable." },
    ]
  },
  {
    id: "chole-bhature",
    name: "Chole Bhature",
    category: "Chole Bhature",
    price: 100,
    description: "Classic chole with two fluffy bhaturas.",
    detailDescription: "Classic chole with two fluffy bhaturas. Made fresh to order with quality ingredients at Krishna's Cafe.",
    image: "images/chole_bhature.png",
    tags: ["V"],
    label: "",
    components: [
      { type: "BASE", name: "Bhatura", desc: "Fluffy, deep-fried leavened bread served hot." },
      { type: "CORE", name: "Chole Bhature", desc: "Slow-cooked chickpeas in a rich, spiced tomato gravy." },
      { type: "SEASONING", name: "Whole Spices", desc: "Bay leaf, cinnamon and cumin for authentic depth." },
      { type: "FINISH", name: "Pickled Onion", desc: "Sliced onion, lemon wedge and green chilli on the side." },
    ]
  },
  {
    id: "punjabi-chole-bhature",
    name: "Punjabi Chole Bhature",
    category: "Chole Bhature",
    price: 120,
    description: "Rich Punjabi-style chole with bhature.",
    detailDescription: "Rich Punjabi-style chole with bhature. Made fresh to order with quality ingredients at Krishna's Cafe.",
    image: "images/punjabi_chole_bhature.png",
    tags: ["V"],
    label: "SIGNATURE DISH",
    components: [
      { type: "BASE", name: "Bhatura", desc: "Fluffy, deep-fried leavened bread served hot." },
      { type: "CORE", name: "Punjabi Chole Bhature", desc: "Slow-cooked chickpeas in a rich, spiced tomato gravy." },
      { type: "SEASONING", name: "Whole Spices", desc: "Bay leaf, cinnamon and cumin for authentic depth." },
      { type: "FINISH", name: "Pickled Onion", desc: "Sliced onion, lemon wedge and green chilli on the side." },
    ]
  },
  {
    id: "kaju-pulao",
    name: "Kaju Pulao",
    category: "Rice & Pulao",
    price: 150,
    description: "Fragrant pulao studded with cashews and spices.",
    detailDescription: "Fragrant pulao studded with cashews and spices. Made fresh to order with quality ingredients at Krishna's Cafe.",
    image: "images/kaju_pulao.png",
    tags: ["V"],
    label: "",
    components: [
      { type: "BASE", name: "Basmati Rice", desc: "Fragrant long-grain rice cooked fluffy and separate." },
      { type: "CORE", name: "Kaju Pulao", desc: "Seasonal vegetables, paneer or nuts as per the dish." },
      { type: "SEASONING", name: "Whole Spices", desc: "Cumin, cardamom and bay leaf for aroma." },
      { type: "FINISH", name: "Fresh Coriander", desc: "Garnished with coriander and a squeeze of lemon." },
    ]
  },
  {
    id: "paneer-pulao",
    name: "Paneer Pulao",
    category: "Rice & Pulao",
    price: 140,
    description: "Basmati rice tossed with paneer and herbs.",
    detailDescription: "Basmati rice tossed with paneer and herbs. Made fresh to order with quality ingredients at Krishna's Cafe.",
    image: "images/paneer_pulao.png",
    tags: ["V", "HIGH PROTEIN"],
    label: "",
    components: [
      { type: "BASE", name: "Basmati Rice", desc: "Fragrant long-grain rice cooked fluffy and separate." },
      { type: "CORE", name: "Paneer Pulao", desc: "Seasonal vegetables, paneer or nuts as per the dish." },
      { type: "SEASONING", name: "Whole Spices", desc: "Cumin, cardamom and bay leaf for aroma." },
      { type: "FINISH", name: "Fresh Coriander", desc: "Garnished with coriander and a squeeze of lemon." },
    ]
  },
  {
    id: "veg-pulao",
    name: "Veg Pulao",
    category: "Rice & Pulao",
    price: 130,
    description: "Mixed vegetable pulao with whole spices.",
    detailDescription: "Mixed vegetable pulao with whole spices. Made fresh to order with quality ingredients at Krishna's Cafe.",
    image: "images/veg_pulao.png",
    tags: ["V"],
    label: "",
    components: [
      { type: "BASE", name: "Basmati Rice", desc: "Fragrant long-grain rice cooked fluffy and separate." },
      { type: "CORE", name: "Veg Pulao", desc: "Seasonal vegetables, paneer or nuts as per the dish." },
      { type: "SEASONING", name: "Whole Spices", desc: "Cumin, cardamom and bay leaf for aroma." },
      { type: "FINISH", name: "Fresh Coriander", desc: "Garnished with coriander and a squeeze of lemon." },
    ]
  },
  {
    id: "veg-fried-rice",
    name: "Veg Fried Rice",
    category: "Rice & Pulao",
    price: 100,
    description: "Wok-tossed rice with fresh vegetables.",
    detailDescription: "Wok-tossed rice with fresh vegetables. Made fresh to order with quality ingredients at Krishna's Cafe.",
    image: "images/veg_fried_rice.png",
    tags: ["V"],
    label: "",
    components: [
      { type: "BASE", name: "Basmati Rice", desc: "Fragrant long-grain rice cooked fluffy and separate." },
      { type: "CORE", name: "Veg Fried Rice", desc: "Seasonal vegetables, paneer or nuts as per the dish." },
      { type: "SEASONING", name: "Whole Spices", desc: "Cumin, cardamom and bay leaf for aroma." },
      { type: "FINISH", name: "Fresh Coriander", desc: "Garnished with coriander and a squeeze of lemon." },
    ]
  },
  {
    id: "corn-fried-rice",
    name: "Corn Fried Rice",
    category: "Rice & Pulao",
    price: 120,
    description: "Fried rice with sweet corn kernels.",
    detailDescription: "Fried rice with sweet corn kernels. Made fresh to order with quality ingredients at Krishna's Cafe.",
    image: "images/corn_fried_rice.png",
    tags: ["V"],
    label: "",
    components: [
      { type: "BASE", name: "Basmati Rice", desc: "Fragrant long-grain rice cooked fluffy and separate." },
      { type: "CORE", name: "Corn Fried Rice", desc: "Seasonal vegetables, paneer or nuts as per the dish." },
      { type: "SEASONING", name: "Whole Spices", desc: "Cumin, cardamom and bay leaf for aroma." },
      { type: "FINISH", name: "Fresh Coriander", desc: "Garnished with coriander and a squeeze of lemon." },
    ]
  },
  {
    id: "paneer-fried-rice",
    name: "Paneer Fried Rice",
    category: "Rice & Pulao",
    price: 130,
    description: "Fried rice with soft paneer cubes.",
    detailDescription: "Fried rice with soft paneer cubes. Made fresh to order with quality ingredients at Krishna's Cafe.",
    image: "images/paneer_fried_rice.png",
    tags: ["V", "HIGH PROTEIN"],
    label: "",
    components: [
      { type: "BASE", name: "Basmati Rice", desc: "Fragrant long-grain rice cooked fluffy and separate." },
      { type: "CORE", name: "Paneer Fried Rice", desc: "Seasonal vegetables, paneer or nuts as per the dish." },
      { type: "SEASONING", name: "Whole Spices", desc: "Cumin, cardamom and bay leaf for aroma." },
      { type: "FINISH", name: "Fresh Coriander", desc: "Garnished with coriander and a squeeze of lemon." },
    ]
  },
  {
    id: "schezwan-fried-rice",
    name: "Schezwan Fried Rice",
    category: "Rice & Pulao",
    price: 120,
    description: "Spicy schezwan-style fried rice.",
    detailDescription: "Spicy schezwan-style fried rice. Made fresh to order with quality ingredients at Krishna's Cafe.",
    image: "images/schezwan_fried_rice.png",
    tags: ["V"],
    label: "",
    components: [
      { type: "BASE", name: "Basmati Rice", desc: "Fragrant long-grain rice cooked fluffy and separate." },
      { type: "CORE", name: "Schezwan Fried Rice", desc: "Seasonal vegetables, paneer or nuts as per the dish." },
      { type: "SEASONING", name: "Whole Spices", desc: "Cumin, cardamom and bay leaf for aroma." },
      { type: "FINISH", name: "Fresh Coriander", desc: "Garnished with coriander and a squeeze of lemon." },
    ]
  },
  {
    id: "manchurian-fried-rice",
    name: "Manchurian Fried Rice",
    category: "Rice & Pulao",
    price: 130,
    description: "Fried rice topped with veg manchurian.",
    detailDescription: "Fried rice topped with veg manchurian. Made fresh to order with quality ingredients at Krishna's Cafe.",
    image: "images/manchurian_fried_rice.png",
    tags: ["V"],
    label: "",
    components: [
      { type: "BASE", name: "Basmati Rice", desc: "Fragrant long-grain rice cooked fluffy and separate." },
      { type: "CORE", name: "Manchurian Fried Rice", desc: "Seasonal vegetables, paneer or nuts as per the dish." },
      { type: "SEASONING", name: "Whole Spices", desc: "Cumin, cardamom and bay leaf for aroma." },
      { type: "FINISH", name: "Fresh Coriander", desc: "Garnished with coriander and a squeeze of lemon." },
    ]
  },
  {
    id: "noodles-with-rice",
    name: "Noodles with Rice",
    category: "Rice & Pulao",
    price: 120,
    description: "Combo plate of hakka noodles and fried rice.",
    detailDescription: "Combo plate of hakka noodles and fried rice. Made fresh to order with quality ingredients at Krishna's Cafe.",
    image: "images/noodles_with_rice.png",
    tags: ["V"],
    label: "",
    components: [
      { type: "BASE", name: "Basmati Rice", desc: "Fragrant long-grain rice cooked fluffy and separate." },
      { type: "CORE", name: "Noodles with Rice", desc: "Seasonal vegetables, paneer or nuts as per the dish." },
      { type: "SEASONING", name: "Whole Spices", desc: "Cumin, cardamom and bay leaf for aroma." },
      { type: "FINISH", name: "Fresh Coriander", desc: "Garnished with coriander and a squeeze of lemon." },
    ]
  },
  {
    id: "veg-hakka-noodles",
    name: "Veg Hakka Noodles",
    category: "Chinese",
    price: 110,
    description: "Classic Indo-Chinese hakka noodles.",
    detailDescription: "Classic Indo-Chinese hakka noodles. Made fresh to order with quality ingredients at Krishna's Cafe.",
    image: "images/veg_hakka_noodles.png",
    tags: ["V"],
    label: "",
    components: [
      { type: "BASE", name: "Stir-fry Base", desc: "Wok-tossed noodles or veggies over high flame." },
      { type: "CORE", name: "Veg Hakka Noodles", desc: "Fresh vegetables and paneer in a bold Indo-Chinese sauce." },
      { type: "SEASONING", name: "Soy & Chilli", desc: "Soy sauce, vinegar and chilli for that street-style kick." },
      { type: "FINISH", name: "Spring Onion", desc: "Garnished with spring onion greens and sesame." },
    ]
  },
  {
    id: "chinese-bhel",
    name: "Chinese Bhel",
    category: "Chinese",
    price: 140,
    description: "Crispy noodles bhel with tangy sauces.",
    detailDescription: "Crispy noodles bhel with tangy sauces. Made fresh to order with quality ingredients at Krishna's Cafe.",
    image: "images/chinese_bhel.png",
    tags: ["V"],
    label: "POPULAR",
    components: [
      { type: "BASE", name: "Stir-fry Base", desc: "Wok-tossed noodles or veggies over high flame." },
      { type: "CORE", name: "Chinese Bhel", desc: "Fresh vegetables and paneer in a bold Indo-Chinese sauce." },
      { type: "SEASONING", name: "Soy & Chilli", desc: "Soy sauce, vinegar and chilli for that street-style kick." },
      { type: "FINISH", name: "Spring Onion", desc: "Garnished with spring onion greens and sesame." },
    ]
  },
  {
    id: "veg-noodles-spicy",
    name: "Veg Noodles (Spicy)",
    category: "Chinese",
    price: 120,
    description: "Hakka noodles with extra chilli heat.",
    detailDescription: "Hakka noodles with extra chilli heat. Made fresh to order with quality ingredients at Krishna's Cafe.",
    image: "images/veg_noodles_spicy.png",
    tags: ["V"],
    label: "",
    components: [
      { type: "BASE", name: "Stir-fry Base", desc: "Wok-tossed noodles or veggies over high flame." },
      { type: "CORE", name: "Veg Noodles", desc: "Fresh vegetables and paneer in a bold Indo-Chinese sauce." },
      { type: "SEASONING", name: "Soy & Chilli", desc: "Soy sauce, vinegar and chilli for that street-style kick." },
      { type: "FINISH", name: "Spring Onion", desc: "Garnished with spring onion greens and sesame." },
    ]
  },
  {
    id: "chilli-garlic-noodles",
    name: "Chilli Garlic Noodles",
    category: "Chinese",
    price: 130,
    description: "Noodles tossed in chilli garlic sauce.",
    detailDescription: "Noodles tossed in chilli garlic sauce. Made fresh to order with quality ingredients at Krishna's Cafe.",
    image: "images/chilli_garlic_noodles.png",
    tags: ["V"],
    label: "",
    components: [
      { type: "BASE", name: "Stir-fry Base", desc: "Wok-tossed noodles or veggies over high flame." },
      { type: "CORE", name: "Chilli Garlic Noodles", desc: "Fresh vegetables and paneer in a bold Indo-Chinese sauce." },
      { type: "SEASONING", name: "Soy & Chilli", desc: "Soy sauce, vinegar and chilli for that street-style kick." },
      { type: "FINISH", name: "Spring Onion", desc: "Garnished with spring onion greens and sesame." },
    ]
  },
  {
    id: "manchurian-noodles",
    name: "Manchurian Noodles",
    category: "Chinese",
    price: 140,
    description: "Noodles topped with manchurian balls.",
    detailDescription: "Noodles topped with manchurian balls. Made fresh to order with quality ingredients at Krishna's Cafe.",
    image: "images/manchurian_noodles.png",
    tags: ["V"],
    label: "",
    components: [
      { type: "BASE", name: "Stir-fry Base", desc: "Wok-tossed noodles or veggies over high flame." },
      { type: "CORE", name: "Manchurian Noodles", desc: "Fresh vegetables and paneer in a bold Indo-Chinese sauce." },
      { type: "SEASONING", name: "Soy & Chilli", desc: "Soy sauce, vinegar and chilli for that street-style kick." },
      { type: "FINISH", name: "Spring Onion", desc: "Garnished with spring onion greens and sesame." },
    ]
  },
  {
    id: "honey-chilli-potato",
    name: "Honey Chilli Potato",
    category: "Chinese",
    price: 140,
    description: "Crispy potatoes in sweet-spicy glaze.",
    detailDescription: "Crispy potatoes in sweet-spicy glaze. Made fresh to order with quality ingredients at Krishna's Cafe.",
    image: "images/honey_chilli_potato.png",
    tags: ["V"],
    label: "POPULAR",
    components: [
      { type: "BASE", name: "Stir-fry Base", desc: "Wok-tossed noodles or veggies over high flame." },
      { type: "CORE", name: "Honey Chilli Potato", desc: "Fresh vegetables and paneer in a bold Indo-Chinese sauce." },
      { type: "SEASONING", name: "Soy & Chilli", desc: "Soy sauce, vinegar and chilli for that street-style kick." },
      { type: "FINISH", name: "Spring Onion", desc: "Garnished with spring onion greens and sesame." },
    ]
  },
  {
    id: "manchurian-dry",
    name: "Manchurian Dry",
    category: "Chinese",
    price: 120,
    description: "Crispy veg manchurian in dry sauce.",
    detailDescription: "Crispy veg manchurian in dry sauce. Made fresh to order with quality ingredients at Krishna's Cafe.",
    image: "images/manchurian_dry.png",
    tags: ["V"],
    label: "",
    components: [
      { type: "BASE", name: "Stir-fry Base", desc: "Wok-tossed noodles or veggies over high flame." },
      { type: "CORE", name: "Manchurian Dry", desc: "Fresh vegetables and paneer in a bold Indo-Chinese sauce." },
      { type: "SEASONING", name: "Soy & Chilli", desc: "Soy sauce, vinegar and chilli for that street-style kick." },
      { type: "FINISH", name: "Spring Onion", desc: "Garnished with spring onion greens and sesame." },
    ]
  },
  {
    id: "manchurian-gravy",
    name: "Manchurian Gravy",
    category: "Chinese",
    price: 100,
    description: "Soft manchurian balls in tangy gravy.",
    detailDescription: "Soft manchurian balls in tangy gravy. Made fresh to order with quality ingredients at Krishna's Cafe.",
    image: "images/manchurian_gravy.png",
    tags: ["V"],
    label: "",
    components: [
      { type: "BASE", name: "Stir-fry Base", desc: "Wok-tossed noodles or veggies over high flame." },
      { type: "CORE", name: "Manchurian Gravy", desc: "Fresh vegetables and paneer in a bold Indo-Chinese sauce." },
      { type: "SEASONING", name: "Soy & Chilli", desc: "Soy sauce, vinegar and chilli for that street-style kick." },
      { type: "FINISH", name: "Spring Onion", desc: "Garnished with spring onion greens and sesame." },
    ]
  },
  {
    id: "chilli-paneer",
    name: "Chilli Paneer",
    category: "Chinese",
    price: 220,
    description: "Paneer cubes in spicy chilli sauce.",
    detailDescription: "Paneer cubes in spicy chilli sauce. Made fresh to order with quality ingredients at Krishna's Cafe.",
    image: "images/chilli_paneer.png",
    tags: ["V", "HIGH PROTEIN"],
    label: "CHEF SPECIAL",
    components: [
      { type: "BASE", name: "Stir-fry Base", desc: "Wok-tossed noodles or veggies over high flame." },
      { type: "CORE", name: "Chilli Paneer", desc: "Fresh vegetables and paneer in a bold Indo-Chinese sauce." },
      { type: "SEASONING", name: "Soy & Chilli", desc: "Soy sauce, vinegar and chilli for that street-style kick." },
      { type: "FINISH", name: "Spring Onion", desc: "Garnished with spring onion greens and sesame." },
    ]
  },
  {
    id: "pav-bhaji",
    name: "Pav Bhaji",
    category: "Pav Bhaji",
    price: 110,
    description: "Classic butter-toasted pav with spicy mixed vegetable bhaji.",
    detailDescription: "Classic butter-toasted pav with spicy mixed vegetable bhaji. Made fresh to order with quality ingredients at Krishna's Cafe.",
    image: "images/pav_bhaji.png",
    tags: ["V"],
    label: "SIGNATURE DISH",
    components: [
      { type: "BASE", name: "Pav", desc: "Soft, golden-brown bread rolls toasted with butter on the griddle." },
      { type: "CORE", name: "Bhaji", desc: "Mashed vegetable curry prepared with potatoes, peas, tomatoes, and unique spice blend." },
      { type: "SEASONING", name: "Pav Bhaji Masala", desc: "Special aromatic spice blend for that street-style authentic kick." },
      { type: "FINISH", name: "Butter & Lemon", desc: "Topped with a generous dollop of butter, chopped onions, fresh coriander, and a slice of lemon." },
    ]
  }
];

// --------------- CATEGORIES ---------------

const categories = ["All", "Maggi", "French Fries", "Momos", "Sandwiches", "Chole Bhature", "Pav Bhaji", "Rice & Pulao", "Chinese"];

// --------------- DEFAULT RATINGS ---------------

const defaultRatings = {
  "vegetable-maggie": { total: 194, count: 43 },
  "plain-maggie": { total: 113, count: 24 },
  "masala-maggie": { total: 141, count: 30 },
  "double-masala-maggie": { total: 98, count: 24 },
  "cheese-butter-maggie": { total: 101, count: 22 },
  "plain-french-fries": { total: 154, count: 35 },
  "peri-peri-french-fries": { total: 216, count: 48 },
  "masala-french-fries": { total: 213, count: 52 },
  "veg-momos": { total: 98, count: 24 },
  "paneer-momos": { total: 152, count: 37 },
  "cheese-corn-momos": { total: 224, count: 52 },
  "schezwan-momos": { total: 122, count: 32 },
  "masala-sandwich": { total: 249, count: 53 },
  "indori-sandwich": { total: 82, count: 20 },
  "corn-mayo-sandwich": { total: 230, count: 48 },
  "cheese-chutney-sandwich": { total: 185, count: 43 },
  "masala-cheese-sandwich": { total: 140, count: 36 },
  "vegetable-sandwich": { total: 201, count: 49 },
  "chole-bhature": { total: 78, count: 19 },
  "punjabi-chole-bhature": { total: 163, count: 37 },
  "kaju-pulao": { total: 254, count: 54 },
  "paneer-pulao": { total: 184, count: 41 },
  "veg-pulao": { total: 162, count: 36 },
  "veg-fried-rice": { total: 238, count: 54 },
  "corn-fried-rice": { total: 198, count: 43 },
  "paneer-fried-rice": { total: 146, count: 34 },
  "schezwan-fried-rice": { total: 176, count: 43 },
  "manchurian-fried-rice": { total: 127, count: 27 },
  "noodles-with-rice": { total: 160, count: 42 },
  "veg-hakka-noodles": { total: 197, count: 48 },
  "chinese-bhel": { total: 254, count: 53 },
  "veg-noodles-spicy": { total: 87, count: 19 },
  "chilli-garlic-noodles": { total: 180, count: 40 },
  "manchurian-noodles": { total: 185, count: 42 },
  "honey-chilli-potato": { total: 168, count: 39 },
  "manchurian-dry": { total: 116, count: 27 },
  "manchurian-gravy": { total: 92, count: 20 },
  "chilli-paneer": { total: 158, count: 36 },
  "pav-bhaji": { total: 188, count: 42 },
};

// --------------- APP STATE ---------------

let currentView = 'menu';       // 'menu' | 'detail'
let currentCategory = 'All';
let currentDishId = null;
let searchQuery = '';
let selectedRating = 0;         // interactive rating widget value
const LIST_LAYOUT_QUERY = window.matchMedia('(max-width: 767px)');
let listLayout = LIST_LAYOUT_QUERY.matches;

function usesListLayout() {
  return true; // Enforce list layout view across devices to match mockup specifications
}

// --------------- RATINGS HELPERS ---------------

/**
 * Retrieve the ratings object from localStorage.
 * Falls back to defaultRatings on first visit.
 */
function getRatings() {
  const raw = localStorage.getItem('krishnasCafeRatings');
  if (raw) {
    try { return JSON.parse(raw); } catch (_) { /* corrupt – reset below */ }
  }
  // First visit or corrupt data — seed with defaults
  localStorage.setItem('krishnasCafeRatings', JSON.stringify(defaultRatings));
  return JSON.parse(JSON.stringify(defaultRatings)); // return a fresh copy
}

/**
 * Return { average, count } for a given dish.
 */
function getAverageRating(dishId) {
  const ratings = getRatings();
  const entry = ratings[dishId];
  if (!entry || entry.count === 0) return { average: 0, count: 0 };
  return {
    average: parseFloat((entry.total / entry.count).toFixed(1)),
    count: entry.count
  };
}

// --------------- STAR RENDERING ---------------

/**
 * Build an HTML string of 5 stars (filled ★ / empty ☆).
 * `rating` is rounded to the nearest 0.5 for half-step display.
 * `size` — 'small' | 'large'
 */
function renderStars(rating, size = 'small') {
  const rounded = Math.round(rating * 2) / 2; // nearest 0.5
  const cls = size === 'large' ? 'stars-large' : 'stars';
  let html = `<span class="${cls}">`;
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rounded)) {
      html += '<span class="star filled">&#9733;</span>';
    } else if (i - 0.5 === rounded) {
      // half-star: we show a filled star at reduced opacity via CSS, or just filled
      html += '<span class="star filled half">&#9733;</span>';
    } else {
      html += '<span class="star empty">&#9734;</span>';
    }
  }
  html += '</span>';
  return html;
}

// --------------- FILTERING ---------------

const SEARCH_ALIASES = {
  maggi: ['maggie'],
  momo: ['momos'],
  fries: ['french'],
  fry: ['fries', 'french'],
  rice: ['pulao', 'fried'],
  noodle: ['noodles', 'hakka'],
  noodles: ['noodle', 'hakka'],
  chinese: ['hakka', 'manchurian', 'schezwan'],
  sandwich: ['sandwiches'],
  veg: ['vegetable'],
  veggie: ['vegetable', 'veg'],
  chilli: ['chili'],
  chili: ['chilli'],
  protein: ['high protein'],
};

function normalizeSearchText(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function getDishSearchText(dish) {
  const parts = [
    dish.name,
    dish.category,
    dish.description,
    dish.detailDescription,
    dish.label,
    ...(dish.tags || []),
    ...(dish.components || []).flatMap(c => [c.type, c.name, c.desc]),
  ];
  return normalizeSearchText(parts.join(' '));
}

function tokenMatchesHaystack(token, haystack) {
  const variants = new Set([token]);
  (SEARCH_ALIASES[token] || []).forEach(v => variants.add(v));
  if (token.endsWith('s') && token.length > 3) variants.add(token.slice(0, -1));
  else variants.add(`${token}s`);

  return [...variants].some(v => haystack.includes(v));
}

function dishMatchesSearch(dish, query) {
  const haystack = getDishSearchText(dish);
  const tokens = normalizeSearchText(query).split(' ').filter(Boolean);
  if (tokens.length === 0) return true;
  return tokens.every(token => tokenMatchesHaystack(token, haystack));
}

/**
 * Return dishes matching the current category + search query.
 */
function filterDishes() {
  let filtered = dishes;

  if (currentCategory !== 'All') {
    filtered = filtered.filter(d => d.category === currentCategory);
  }

  if (searchQuery.trim()) {
    filtered = filtered.filter(d => dishMatchesSearch(d, searchQuery));
  }

  return filtered;
}

// --------------- BROKEN-IMAGE FALLBACK ---------------

/**
 * Inline onerror handler string for <img> tags.
 */
function imgErrorHandler() {
  return `onerror="this.onerror=null;this.style.background='linear-gradient(135deg,#c8956c 0%,#a0755a 100%)';this.style.objectFit='contain';this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'120\\' height=\\'80\\'><text x=\\'50%\\' y=\\'50%\\' dominant-baseline=\\'middle\\' text-anchor=\\'middle\\' font-size=\\'14\\' fill=\\'white\\' font-family=\\'sans-serif\\'>No Image</text></svg>';"`;
}

// --------------- LABEL COLOR HELPER ---------------

function labelClass(label) {
  if (!label) return '';
  switch (label) {
    case 'SIGNATURE DISH': return 'label-signature';
    case 'CHEF SPECIAL':   return 'label-chef';
    case 'NEW':            return 'label-new';
    case 'POPULAR':        return 'label-popular';
    case 'HEALTHY':        return 'label-healthy';
    default:               return 'label-default';
  }
}

// --------------- FOOTER HELPER ---------------

function buildAppFooterHtml() {
  return `
  <footer class="app-footer">
    <div class="footer-content">
      <div class="footer-brand-section">
        <div class="footer-brand">
          <span class="footer-brand-logo">🍽️</span>
          <span>Krishna's Cafe</span>
        </div>
        <p class="footer-tagline">Serving freshly prepared, mouth-watering street food, delicious momos, sizzling maggi, and Chinese delicacies since 2020.</p>
        <span class="footer-veg-warning">🟢 100% Vegetarian Menu</span>
      </div>
      <div>
        <h3 class="footer-section-title">Quick Links</h3>
        <ul class="footer-links">
          <li><a href="#" onclick="event.preventDefault(); currentCategory='All'; renderMenu();">View All Menu</a></li>
          <li><a href="#" onclick="event.preventDefault(); currentCategory='Chinese'; renderMenu();">Chinese Specials</a></li>
          <li><a href="#" onclick="event.preventDefault(); currentCategory='Momos'; renderMenu();">Momo Station</a></li>
        </ul>
      </div>
      <div>
        <h3 class="footer-section-title">Contact & Timing</h3>
        <address class="footer-contact-info">
          <div class="footer-contact-item">
            <span class="footer-contact-icon">📍</span>
            <span>Baba Turf,<br>Barwani</span>
          </div>
          <div class="footer-contact-item">
            <span class="footer-contact-icon">⏰</span>
            <span>Open Daily:<br>11:00 AM — 11:00 PM</span>
          </div>
        </address>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2026 Krishna's Cafe. All Rights Reserved. Designed with &hearts;</p>
      <div class="footer-payment-icons">
        <span class="payment-badge">UPI</span>
        <span class="payment-badge">CARD</span>
        <span class="payment-badge">CASH</span>
      </div>
    </div>
  </footer>`;
}

// --------------- MENU VIEW ---------------

function renderMenu() {
  currentView = 'menu';
  currentDishId = null;
  selectedRating = 0;

  const app = document.getElementById('app');
  const filtered = filterDishes();

  // ---------- build HTML ----------
  let html = '';

  // ── Header ──
  html += `
  <header class="app-header">
    <div class="header-left">
      <div class="brand-container">
        <span class="brand-logo-emoji">🍽️</span>
        <div class="brand-text-wrap">
          <span class="brand-name">Krishna's Cafe</span>
          <span class="brand-subtitle">Fresh Food, Great Taste • 🟢 100% Veg</span>
        </div>
      </div>
    </div>
    <nav class="header-nav desktop-only">
      ${categories.map(c => `
        <button class="nav-cat-btn ${c === currentCategory ? 'active' : ''}" data-cat="${c}">${c}</button>
      `).join('')}
    </nav>
    <div class="header-right">
      <button class="icon-btn" id="searchToggleBtn" aria-label="Search">
        <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
      </button>
    </div>
  </header>`;

  // ── Search Overlay ──
  html += `
  <div class="search-overlay" id="searchOverlay">
    <div class="search-bar">
      <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
      <input type="text" id="searchInput" placeholder="Search by dish, category, or ingredient..." value="${searchQuery}" autocomplete="off" />
      <button class="icon-btn" id="searchCloseBtn" aria-label="Close search">&times;</button>
    </div>
  </div>`;

  // ── Mobile Category Tabs (horizontal scroll) ──
  html += `
  <div class="category-tabs mobile-only">
    <div class="tabs-scroll">
      ${categories.map(c => `
        <button class="tab-btn ${c === currentCategory ? 'active' : ''}" data-cat="${c}">${c}</button>
      `).join('')}
    </div>
  </div>`;

  // ── Dish listing ──
  html += renderMenuListingHtml(filtered);

  // ── App Footer ──
  html += buildAppFooterHtml();

  // ── Insert ──
  app.innerHTML = html;

  // ---------- Attach event listeners ----------

  // Category tabs (mobile + desktop)
  app.querySelectorAll('[data-cat]').forEach(btn => {
    btn.addEventListener('click', () => {
      currentCategory = btn.dataset.cat;
      renderMenu();
    });
  });

  // Dish clicks (event delegation on list / grid items)
  app.querySelectorAll('.menu-item, .menu-card').forEach(el => {
    el.addEventListener('click', () => showDishDetail(el.dataset.id));
  });

  // Search toggle
  const searchOverlay = document.getElementById('searchOverlay');
  const searchInput = document.getElementById('searchInput');
  document.getElementById('searchToggleBtn').addEventListener('click', () => {
    searchOverlay.classList.add('open');
    searchInput.focus();
  });
  document.getElementById('searchCloseBtn').addEventListener('click', () => {
    searchOverlay.classList.remove('open');
    searchQuery = '';
    searchInput.value = '';
    renderMenu();
  });
  searchOverlay.addEventListener('click', (e) => {
    if (e.target === searchOverlay) searchOverlay.classList.remove('open');
  });

  if (searchQuery.trim()) {
    searchOverlay.classList.add('open');
  }

  // Live search filtering
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    updateMenuListing(app, filterDishes());
  });
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') searchOverlay.classList.remove('open');
  });
}

// --------------- HELPER: Build dish cards/items HTML ---------------

function buildDishCards(list) {
  let html = '';
  list.forEach(dish => {
    const { average, count } = getAverageRating(dish.id);
    const isVeg = dish.tags.includes('V');
    const vegDot = isVeg ? '<span class="veg-indicator" title="Vegetarian"></span>' : '';
    if (listLayout) {
      html += `
      <div class="menu-item" data-id="${dish.id}">
        <div class="menu-item-img">
          <img src="${dish.image}" alt="${dish.name}" loading="lazy" ${imgErrorHandler()} />
          ${dish.label ? `<span class="dish-label ${labelClass(dish.label)}">${dish.label}</span>` : ''}
        </div>
        <div class="menu-item-info">
          <h3 class="dish-name">${vegDot}${dish.name}</h3>
          <p class="dish-desc">${dish.description}</p>
          <div class="dish-meta">
            <span class="dish-price">₹${dish.price}</span>
            <span class="dish-rating">${renderStars(average)} <span class="rating-count">(${count})</span></span>
          </div>
          <div class="dish-tags">
            ${dish.tags.map(t => `<span class="tag">${t}</span>`).join('')}
          </div>
        </div>
      </div>`;
    } else {
      html += `
      <div class="menu-card" data-id="${dish.id}">
        <div class="card-img">
          <img src="${dish.image}" alt="${dish.name}" loading="lazy" ${imgErrorHandler()} />
          ${dish.label ? `<span class="dish-label ${labelClass(dish.label)}">${dish.label}</span>` : ''}
        </div>
        <div class="card-body">
          <h3 class="dish-name">${vegDot}${dish.name}</h3>
          <p class="dish-desc">${dish.description}</p>
          <div class="dish-meta">
            <span class="dish-price">₹${dish.price}</span>
            <span class="dish-rating">${renderStars(average)} <span class="rating-count">(${count})</span></span>
          </div>
          <div class="dish-tags">
            ${dish.tags.map(t => `<span class="tag">${t}</span>`).join('')}
          </div>
        </div>
      </div>`;
    }
  });
  return html;
}

function renderMenuListingHtml(filtered) {
  if (filtered.length === 0) {
    return '<div class="empty-state"><p>No dishes found.</p></div>';
  }
  const wrapperClass = listLayout ? 'menu-list' : 'menu-grid';
  return `<div class="${wrapperClass}">${buildDishCards(filtered)}</div>`;
}

/** Replace the menu listing area without rebuilding the whole page. */
function updateMenuListing(app, filtered) {
  const anchor = app.querySelector('.category-tabs') || app.querySelector('.search-overlay');
  const existing = app.querySelector('.menu-list, .menu-grid, .empty-state');
  const html = renderMenuListingHtml(filtered);

  if (existing) {
    existing.outerHTML = html;
  } else if (anchor) {
    anchor.insertAdjacentHTML('afterend', html);
  } else {
    app.insertAdjacentHTML('beforeend', html);
  }

  attachDishClickListeners();
}

/** Re-attach click listeners on dynamically rebuilt dish cards */
function attachDishClickListeners() {
  const app = document.getElementById('app');
  app.querySelectorAll('.menu-item, .menu-card').forEach(el => {
    el.addEventListener('click', () => showDishDetail(el.dataset.id));
  });
}

// --------------- DETAIL VIEW ---------------

function showDishDetail(dishId) {
  currentView = 'detail';
  currentDishId = dishId;
  selectedRating = 0;

  const dish = dishes.find(d => d.id === dishId);
  if (!dish) { renderMenu(); return; }

  const { average, count } = getAverageRating(dish.id);
  const app = document.getElementById('app');

  // Component type icons (simple emoji-like symbols)
  const compIcon = { BASE: '🔶', CORE: '🔷', SEASONING: '🌿', FINISH: '✨' };

  let html = '';

  // ── Detail Header ──
  html += `
  <header class="detail-header">
    <button class="icon-btn back-btn" id="backBtn" aria-label="Back">
      <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <polyline points="15 18 9 12 15 6"/>
      </svg>
    </button>
    <span class="detail-brand">KRISHNA'S CAFE</span>
    <button class="icon-btn" id="shareBtn" aria-label="Share">
      <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
      </svg>
    </button>
  </header>`;

  // ── Content wrapper (side-by-side on desktop, stacked on mobile) ──
  html += `<div class="detail-layout">`;

  // ── Hero Image ──
  html += `
    <div class="detail-hero fade-in-up">
      <img src="${dish.image}" alt="${dish.name}" ${imgErrorHandler()} />
    </div>`;

  // ── Info Panel ──
  html += `<div class="detail-info">`;

  // Label
  if (dish.label) {
    html += `<span class="detail-label ${labelClass(dish.label)} fade-in-up" style="animation-delay:.1s">${dish.label}</span>`;
  }

  // Name
  html += `<h1 class="detail-name fade-in-up" style="animation-delay:.15s">${dish.name}</h1>`;

  // Price
  html += `<p class="detail-price fade-in-up" style="animation-delay:.2s">₹${dish.price}</p>`;

  // Divider
  html += `<hr class="detail-divider fade-in-up" style="animation-delay:.25s" />`;

  // Description
  html += `<p class="detail-description fade-in-up" style="animation-delay:.3s">${dish.detailDescription}</p>`;

  // Tags
  html += `
    <div class="detail-tags fade-in-up" style="animation-delay:.35s">
      ${dish.tags.map(t => `<span class="tag">${t}</span>`).join('')}
    </div>`;

  // ── Components Section ──
  html += `
    <div class="components-section fade-in-up" style="animation-delay:.4s">
      <h2 class="section-title">THE COMPONENTS</h2>
      <div class="components-grid">
        ${dish.components.map((comp, i) => `
          <div class="component-card fade-in-up" style="animation-delay:${0.45 + i * 0.08}s">
            <div class="comp-icon">${compIcon[comp.type] || '🔹'}</div>
            <span class="comp-type">${comp.type}</span>
            <h4 class="comp-name">${comp.name}</h4>
            <p class="comp-desc">${comp.desc}</p>
          </div>
        `).join('')}
      </div>
    </div>`;

  // ── Rating Section ──
  html += `
    <div class="rating-section fade-in-up" style="animation-delay:.8s">
      <h2 class="section-title">RATE THIS DISH</h2>
      <div class="current-avg">
        ${renderStars(average, 'small')}
        <span class="avg-text">${average} / 5</span>
        <span class="rating-count">(${count} ratings)</span>
      </div>
      <div class="interactive-stars" id="interactiveStars">
        ${[1, 2, 3, 4, 5].map(n => `<span class="rate-star" data-value="${n}">&#9734;</span>`).join('')}
      </div>
      <button class="submit-rating-btn" id="submitRatingBtn" disabled>Submit Rating</button>
      <p class="rating-msg" id="ratingMsg"></p>
    </div>`;

  // ── Back link ──
  html += `
    <div class="back-link-wrap fade-in-up" style="animation-delay:.9s">
      <a href="#" class="back-link" id="backLink">← BACK TO MENU</a>
    </div>`;

  html += `</div>`; // .detail-info
  html += `</div>`; // .detail-layout

  // ── App Footer ──
  html += buildAppFooterHtml();

  // ── Insert ──
  app.innerHTML = html;

  // ── Scroll to top ──
  window.scrollTo(0, 0);

  // ---------- Attach event listeners ----------

  // Back button
  document.getElementById('backBtn').addEventListener('click', () => {
    currentView = 'menu';
    renderMenu();
  });

  // Back link
  document.getElementById('backLink').addEventListener('click', (e) => {
    e.preventDefault();
    currentView = 'menu';
    renderMenu();
  });

  // Share button
  document.getElementById('shareBtn').addEventListener('click', async () => {
    const shareData = { title: dish.name, text: `Check out ${dish.name} on Krishna's Cafe!`, url: window.location.href };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch (_) { /* user cancelled */ }
    } else {
      // Fallback: copy URL
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      } catch (_) {
        alert('Could not share. Copy this URL: ' + window.location.href);
      }
    }
  });

  // Interactive star hover + click
  const starsContainer = document.getElementById('interactiveStars');
  const rateStars = starsContainer.querySelectorAll('.rate-star');
  const submitBtn = document.getElementById('submitRatingBtn');

  rateStars.forEach(star => {
    // Hover: fill up to hovered star
    star.addEventListener('mouseenter', () => {
      const val = parseInt(star.dataset.value, 10);
      rateStars.forEach(s => {
        s.innerHTML = parseInt(s.dataset.value, 10) <= val ? '&#9733;' : '&#9734;';
        s.classList.toggle('hovered', parseInt(s.dataset.value, 10) <= val);
      });
    });

    // Click: set selected rating
    star.addEventListener('click', () => {
      selectedRating = parseInt(star.dataset.value, 10);
      rateStars.forEach(s => {
        const sv = parseInt(s.dataset.value, 10);
        s.innerHTML = sv <= selectedRating ? '&#9733;' : '&#9734;';
        s.classList.toggle('selected', sv <= selectedRating);
      });
      submitBtn.disabled = false;
    });
  });

  // Mouse leave: reset to selected state
  starsContainer.addEventListener('mouseleave', () => {
    rateStars.forEach(s => {
      const sv = parseInt(s.dataset.value, 10);
      s.innerHTML = sv <= selectedRating ? '&#9733;' : '&#9734;';
      s.classList.toggle('hovered', false);
      s.classList.toggle('selected', sv <= selectedRating);
    });
  });

  // Submit rating
  submitBtn.addEventListener('click', () => submitRating(dish.id));
}

// --------------- SUBMIT RATING ---------------

function submitRating(dishId) {
  if (selectedRating < 1 || selectedRating > 5) return;

  const ratings = getRatings();
  if (!ratings[dishId]) ratings[dishId] = { total: 0, count: 0 };
  ratings[dishId].total += selectedRating;
  ratings[dishId].count += 1;

  localStorage.setItem('krishnasCafeRatings', JSON.stringify(ratings));

  // Update display
  const { average, count } = getAverageRating(dishId);
  const avgSection = document.querySelector('.current-avg');
  if (avgSection) {
    avgSection.innerHTML = `
      ${renderStars(average, 'small')}
      <span class="avg-text">${average} / 5</span>
      <span class="rating-count">(${count} ratings)</span>
    `;
  }

  // Show success message
  const msg = document.getElementById('ratingMsg');
  if (msg) {
    msg.textContent = `Thanks! You rated this dish ${selectedRating} star${selectedRating > 1 ? 's' : ''}.`;
    msg.classList.add('success');
  }

  // Disable submit
  const btn = document.getElementById('submitRatingBtn');
  if (btn) {
    btn.disabled = true;
    btn.textContent = 'Rating Submitted ✓';
  }
}

// --------------- RESIZE HANDLER ---------------

function handleLayoutChange() {
  const prev = listLayout;
  listLayout = usesListLayout();
  if (prev === listLayout) return;

  if (currentView === 'detail' && currentDishId) {
    showDishDetail(currentDishId);
  } else {
    renderMenu();
  }
}

// --------------- INIT ---------------

function initApp() {
  // Seed ratings if needed
  if (!localStorage.getItem('krishnasCafeRatings')) {
    localStorage.setItem('krishnasCafeRatings', JSON.stringify(defaultRatings));
  }

  // Initial render
  renderMenu();

  LIST_LAYOUT_QUERY.addEventListener('change', handleLayoutChange);
}

// Boot when DOM is ready
document.addEventListener('DOMContentLoaded', initApp);
