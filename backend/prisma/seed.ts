import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting Sparkle Database Seed with High-Definition Unsplash Products...');

  // 1. Seed Default Admin User
  const adminPasswordHash = await bcrypt.hash('Admin@123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@sparkle.com' },
    update: {},
    create: {
      email: 'admin@sparkle.com',
      passwordHash: adminPasswordHash,
      name: 'Sparkle Admin',
      phone: '+15550001111',
      role: Role.ADMIN,
    },
  });
  console.log('✅ Admin user ready:', admin.email);

  // 2. Seed Default Demo Users
  const userPasswordHash = await bcrypt.hash('password123', 10);
  const demoUsers = [
    { name: 'John Doe', email: 'john@example.com' },
    { name: 'Jane Smith', email: 'jane@example.com' },
    { name: 'Demo User', email: 'demo@fashion.com' },
  ];

  for (const u of demoUsers) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: {
        email: u.email,
        passwordHash: userPasswordHash,
        name: u.name,
        role: Role.USER,
      },
    });
  }
  console.log('✅ Demo users seeded.');

  // 3. Seed Coupons
  await prisma.coupon.upsert({
    where: { code: 'SAVE10' },
    update: {},
    create: {
      code: 'SAVE10',
      discountPercentage: 10,
      minOrderAmount: 20,
      isActive: true,
    },
  });
  console.log('✅ Default Coupon SAVE10 seeded.');

  // 4. Seed 10 HD Unsplash Fashion Products
  const initialProducts = [
    {
      sku: "OX-SH-001",
      name: "Classic Oxford Button-Down Shirt",
      description: "Tailored Oxford shirt crafted from 100% breathable organic cotton with adjustable button cuffs.",
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
        { url: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80", altText: "Oxford Shirt Front" }
      ],
      sizes: ["S", "M", "L", "XL"],
      colors: ["White", "Light Blue", "Navy"]
    },
    {
      sku: "SLIM-JKT-002",
      name: "Slim-Fit Denim Trucker Jacket",
      description: "Classic vintage blue denim jacket featuring dual chest flap pockets and button closure.",
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
        { url: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80", altText: "Denim Jacket" }
      ],
      sizes: ["M", "L", "XL"],
      colors: ["Indigo Blue", "Washed Black"]
    },
    {
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
      sku: "HOODIE-OVR-004",
      name: "Oversized Heavyweight Fleece Hoodie",
      description: "Ultra-soft 450gsm fleece hoodie with kangaroo pocket and drop shoulder fit.",
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
      sizes: ["S", "M", "L", "XL"],
      colors: ["Beige", "Charcoal Gray"]
    },
    {
      sku: "FLRL-DRS-005",
      name: "Elegant Floral Chiffon Maxi Dress",
      description: "Flowing chiffon A-line maxi dress with subtle V-neckline and puff sleeves.",
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
      sku: "SLIM-CHINO-006",
      name: "Slim Tapered Stretch Chino Pants",
      description: "Versatile cotton twill chinos infused with elastane for maximum comfort.",
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
      colors: ["Khaki", "Navy"]
    },
    {
      sku: "WCH-AUTO-007",
      name: "Luxury Automatic Chronograph Watch",
      description: "Precision automatic timepiece with stainless steel mesh band and sapphire crystal glass.",
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
      colors: ["Silver Blue"]
    },
    {
      sku: "BAG-LTHR-008",
      name: "Minimalist Leather Crossbody Handbag",
      description: "Crafted from full-grain leather with magnetic clasp and gold-plated hardware.",
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
      colors: ["Tan Brown"]
    },
    {
      sku: "BOOT-CHLSA-009",
      name: "Genuine Leather Chelsea Boots",
      description: "Handcrafted leather boots with elastic side gussets and anti-slip rubber sole.",
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
      colors: ["Chestnut Brown"]
    },
    {
      sku: "SNKR-VNTG-010",
      name: "Vintage Canvas High-Top Sneakers",
      description: "Retro high-top sneakers with durable canvas upper and cushioned footbed.",
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
      colors: ["Classic White"]
    }
  ];

  for (const prod of initialProducts) {
    const existing = await prisma.product.findUnique({ where: { sku: prod.sku } });
    if (!existing) {
      await prisma.product.create({
        data: {
          sku: prod.sku,
          name: prod.name,
          description: prod.description,
          price: prod.price,
          discountPrice: prod.discountPrice,
          countInStock: prod.countInStock,
          category: prod.category,
          brand: prod.brand,
          collections: prod.collections,
          material: prod.material,
          gender: prod.gender,
          rating: prod.rating,
          numReviews: prod.numReviews,
          images: {
            create: prod.images.map((img, idx) => ({
              url: img.url,
              altText: img.altText,
              displayOrder: idx,
            })),
          },
          variants: {
            create: prod.sizes.flatMap((size) =>
              prod.colors.map((color) => ({
                size,
                color,
                stockQuantity: 10,
              }))
            ),
          },
        },
      });
    }
  }

  console.log('✅ 10 HD Unsplash Products seeded into PostgreSQL catalog!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
