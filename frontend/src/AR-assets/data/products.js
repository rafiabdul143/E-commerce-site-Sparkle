// Expanded Sparkle Product Catalog with HD Unsplash Images

export const products = [
  {
    _id: "prod-001",
    sku: "OX-SH-001",
    name: "Classic Oxford Button-Down Shirt",
    description: "Tailored Oxford shirt crafted from 100% breathable organic cotton with adjustable button cuffs and rounded hem.",
    price: 39.99,
    discountPrice: 34.99,
    countInStock: 25,
    category: "Top Wear",
    brand: "Urban Threads",
    collections: "Business Casual",
    material: "Cotton",
    gender: "Men",
    rating: 4.8,
    numReviews: 24,
    images: [
      { url: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80", altText: "Oxford Shirt Front" },
      { url: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80", altText: "Oxford Shirt Back" }
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Light Blue", "Navy"]
  },
  {
    _id: "prod-002",
    sku: "SLIM-JKT-002",
    name: "Slim-Fit Denim Trucker Jacket",
    description: "Classic vintage blue denim jacket featuring dual chest flap pockets, button closure, and adjustable waist tabs.",
    price: 89.99,
    discountPrice: 69.99,
    countInStock: 18,
    category: "Top Wear",
    brand: "Raw Denim Co.",
    collections: "Streetwear",
    material: "Denim",
    gender: "Men",
    rating: 4.9,
    numReviews: 38,
    images: [
      { url: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80", altText: "Denim Jacket" },
      { url: "https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=800&q=80", altText: "Denim Detail" }
    ],
    sizes: ["M", "L", "XL"],
    colors: ["Indigo Blue", "Washed Black"]
  },
  {
    _id: "prod-003",
    sku: "LTHR-BLZR-003",
    name: "Tailored Italian Leather Blazer",
    description: "Luxurious lambskin leather blazer featuring a structured single-breasted design and silk satin lining.",
    price: 219.99,
    discountPrice: 179.99,
    countInStock: 10,
    category: "Top Wear",
    brand: "Milano Fashion",
    collections: "Formal Wear",
    material: "Leather",
    gender: "Women",
    rating: 4.9,
    numReviews: 19,
    images: [
      { url: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80", altText: "Leather Blazer" }
    ],
    sizes: ["S", "M", "L"],
    colors: ["Black", "Cognac Brown"]
  },
  {
    _id: "prod-004",
    sku: "HOODIE-OVR-004",
    name: "Oversized Heavyweight Fleece Hoodie",
    description: "Ultra-soft 450gsm fleece hoodie with kangaroo pocket, double-lined hood, and drop shoulder fit.",
    price: 64.99,
    discountPrice: 49.99,
    countInStock: 40,
    category: "Top Wear",
    brand: "Aura Essentials",
    collections: "Casual",
    material: "Fleece",
    gender: "Unisex",
    rating: 4.7,
    numReviews: 52,
    images: [
      { url: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80", altText: "Fleece Hoodie" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Beige", "Charcoal Gray", "Sage Green"]
  },
  {
    _id: "prod-005",
    sku: "FLRL-DRS-005",
    name: "Elegant Floral Chiffon Maxi Dress",
    description: "Flowing chiffon A-line maxi dress with subtle V-neckline, puff sleeves, and tiered ruffled hemline.",
    price: 119.99,
    discountPrice: 89.99,
    countInStock: 15,
    category: "Top Wear",
    brand: "Bloom & Grace",
    collections: "Summer Collection",
    material: "Chiffon",
    gender: "Women",
    rating: 4.9,
    numReviews: 41,
    images: [
      { url: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80", altText: "Floral Maxi Dress" }
    ],
    sizes: ["XS", "S", "M", "L"],
    colors: ["Rose Floral", "Sky Blue Floral"]
  },
  {
    _id: "prod-006",
    sku: "SLIM-CHINO-006",
    name: "Slim Tapered Stretch Chino Pants",
    description: "Versatile cotton twill chinos infused with elastane for maximum comfort from office to weekend.",
    price: 49.99,
    discountPrice: 39.99,
    countInStock: 30,
    category: "Bottom Wear",
    brand: "Urban Threads",
    collections: "Business Casual",
    material: "Cotton Blend",
    gender: "Men",
    rating: 4.6,
    numReviews: 31,
    images: [
      { url: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80", altText: "Chino Pants" }
    ],
    sizes: ["30", "32", "34", "36"],
    colors: ["Khaki", "Navy", "Olive"]
  },
  {
    _id: "prod-007",
    sku: "WCH-AUTO-007",
    name: "Luxury Automatic Chronograph Watch",
    description: "Precision automatic timepiece with stainless steel mesh band, sapphire crystal glass, and 50m water resistance.",
    price: 299.99,
    discountPrice: 249.99,
    countInStock: 8,
    category: "Accessories",
    brand: "Chrono Craft",
    collections: "Luxury",
    material: "Stainless Steel",
    gender: "Men",
    rating: 5.0,
    numReviews: 14,
    images: [
      { url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80", altText: "Chronograph Watch" }
    ],
    sizes: ["One Size"],
    colors: ["Silver Blue", "Matte Black"]
  },
  {
    _id: "prod-008",
    sku: "BAG-LTHR-008",
    name: "Minimalist Leather Crossbody Handbag",
    description: "Crafted from full-grain leather with magnetic clasp, gold-plated hardware, and adjustable shoulder strap.",
    price: 129.99,
    discountPrice: 99.99,
    countInStock: 12,
    category: "Accessories",
    brand: "Milano Fashion",
    collections: "Luxury",
    material: "Leather",
    gender: "Women",
    rating: 4.8,
    numReviews: 27,
    images: [
      { url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80", altText: "Leather Crossbody Bag" }
    ],
    sizes: ["One Size"],
    colors: ["Tan Brown", "Black"]
  },
  {
    _id: "prod-009",
    sku: "BOOT-CHLSA-009",
    name: "Genuine Leather Chelsea Boots",
    description: "Handcrafted leather boots with elastic side gussets, pull tabs, and durable anti-slip rubber sole.",
    price: 149.99,
    discountPrice: 119.99,
    countInStock: 16,
    category: "Footwear",
    brand: "Cobbler & Co.",
    collections: "Formal Wear",
    material: "Leather",
    gender: "Men",
    rating: 4.9,
    numReviews: 33,
    images: [
      { url: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=800&q=80", altText: "Chelsea Boots" }
    ],
    sizes: ["8", "9", "10", "11"],
    colors: ["Chestnut Brown", "Black"]
  },
  {
    _id: "prod-010",
    sku: "SNKR-VNTG-010",
    name: "Vintage Canvas High-Top Sneakers",
    description: "Retro high-top sneakers with durable canvas upper, vulcanized rubber toe cap, and cushioned footbed.",
    price: 59.99,
    discountPrice: 44.99,
    countInStock: 25,
    category: "Footwear",
    brand: "Streetwear Lab",
    collections: "Casual",
    material: "Canvas",
    gender: "Unisex",
    rating: 4.7,
    numReviews: 48,
    images: [
      { url: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80", altText: "Canvas High-Top Sneakers" }
    ],
    sizes: ["7", "8", "9", "10", "11"],
    colors: ["Classic White", "Core Black"]
  }
];

export default products;
