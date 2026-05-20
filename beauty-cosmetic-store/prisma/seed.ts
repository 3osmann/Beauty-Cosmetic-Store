import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  // Clean existing data
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.cartItem.deleteMany()
  await prisma.cart.deleteMany()
  await prisma.wishlistItem.deleteMany()
  await prisma.wishlist.deleteMany()
  await prisma.review.deleteMany()
  await prisma.productVariant.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()
  await prisma.address.deleteMany()
  await prisma.account.deleteMany()
  await prisma.session.deleteMany()
  await prisma.user.deleteMany()
  await prisma.coupon.deleteMany()
  await prisma.blogPost.deleteMany()
  await prisma.blogCategory.deleteMany()
  await prisma.contact.deleteMany()
  await prisma.newsletter.deleteMany()
  await prisma.setting.deleteMany()

  // Create admin user
  const adminPassword = await bcrypt.hash("admin123", 10)
  const admin = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@beaute.com",
      password: adminPassword,
      role: "ADMIN",
      image: "/images/icons/avatar.svg",
    },
  })

  // Create regular user
  const userPassword = await bcrypt.hash("user123", 10)
  const user = await prisma.user.create({
    data: {
      name: "Sarah Johnson",
      email: "sarah@example.com",
      password: userPassword,
      role: "USER",
      image: "/images/icons/avatar.svg",
    },
  })

  // Create categories
  const categories = await Promise.all([
    prisma.category.create({ data: { name: "Hair Care", slug: "hair-care", description: "Premium hair care products for all hair types", image: "/images/categories/hair-care.png", sortOrder: 1 } }),
    prisma.category.create({ data: { name: "Skin Care", slug: "skin-care", description: "Nourishing skincare for radiant beauty", image: "/images/categories/skin-care.png", sortOrder: 2 } }),
    prisma.category.create({ data: { name: "Lip Stick", slug: "lip-stick", description: "Luxurious lip colors and treatments", image: "/images/categories/lip-stick.png", sortOrder: 3 } }),
    prisma.category.create({ data: { name: "Face Pack", slug: "face-pack", description: "Rejuvenating face masks and packs", image: "/images/categories/face-pack.png", sortOrder: 4 } }),
    prisma.category.create({ data: { name: "Blusher", slug: "blusher", description: "Beautiful blushes for a natural glow", image: "/images/categories/blusher.png", sortOrder: 5 } }),
    prisma.category.create({ data: { name: "Natural", slug: "natural", description: "Organic and natural beauty products", image: "/images/categories/natural.png", sortOrder: 6 } }),
    prisma.category.create({ data: { name: "Body Care", slug: "body-care", description: "Luxurious body care essentials", image: "/images/categories/body-care.png", sortOrder: 7 } }),
    prisma.category.create({ data: { name: "Cheeks", slug: "cheeks", description: "Perfect your complexion", image: "/images/categories/cheeks.png", sortOrder: 8 } }),
    prisma.category.create({ data: { name: "Eyes", slug: "eyes", description: "Stunning eye makeup collection", image: "/images/categories/eyes.png", sortOrder: 9 } }),
    prisma.category.create({ data: { name: "Nails", slug: "nails", description: "Beautiful nail care and polish", image: "/images/categories/nails.png", sortOrder: 10 } }),
  ])

  // Create products
  const productData = [
    { name: "CC Foaming Face", slug: "cc-foaming-face", description: "A gentle foaming face cleanser that removes impurities while maintaining skin's natural moisture balance.", shortDescription: "Gentle foaming cleanser with vitamin C", price: 49.01, comparePrice: 65.01, sku: "BEA-001", stock: 50, isFeatured: true, isBestSeller: true, cat: 1, tags: ["skincare", "face", "cleanser"], image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=500&fit=crop" },
    { name: "Chaiceness Plant Herbal Extract", slug: "chaiceness-plant-herbal-extract", description: "A concentrated herbal extract formulated with traditional botanicals to rejuvenate the skin.", shortDescription: "Concentrated herbal skin extract", price: 49.01, comparePrice: 65.01, sku: "BEA-002", stock: 35, isFeatured: true, isNew: true, cat: 1, tags: ["skincare", "herbal", "botanical"], image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400&h=500&fit=crop" },
    { name: "Nivea Cocoa Nourish", slug: "nivea-cocoa-nourish", description: "Rich body lotion with cocoa butter and vitamin E for deep nourishment.", shortDescription: "Cocoa butter body lotion", price: 24.99, comparePrice: 34.99, sku: "BEA-003", stock: 100, cat: 6, tags: ["body", "nourishing", "cocoa"], image: "https://images.unsplash.com/photo-1570194065650-d99fb4d38a91?w=400&h=500&fit=crop" },
    { name: "Powder Blush", slug: "powder-blush", description: "Silky-smooth powder blush that blends effortlessly for a natural, radiant flush.", shortDescription: "Silky powder blush for natural glow", price: 29.99, comparePrice: 39.99, sku: "BEA-004", stock: 75, isBestSeller: true, cat: 4, tags: ["blush", "powder", "makeup"], image: "https://images.unsplash.com/photo-1597225244660-1cd128c6e606?w=400&h=500&fit=crop" },
    { name: "Maybelline BB Cream Foundation", slug: "maybelline-bb-cream-foundation", description: "Multi-benefit BB cream that primes, corrects, and perfects.", shortDescription: "BB cream with SPF protection", price: 19.99, comparePrice: 29.99, sku: "BEA-005", stock: 60, isNew: true, cat: 1, tags: ["foundation", "bbcream", "makeup"], image: "https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=400&h=500&fit=crop" },
    { name: "Pantene Pro-V Shampoo", slug: "pantene-pro-v-shampoo", description: "Pro-V formula that cleanses and strengthens hair from root to tip.", shortDescription: "Strengthening pro-v shampoo", price: 12.99, comparePrice: 16.99, sku: "BEA-006", stock: 200, isBestSeller: true, cat: 0, tags: ["hair", "shampoo", "haircare"], image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=400&h=500&fit=crop" },
    { name: "Charmacy CMC Matte Foundation", slug: "charmacy-cmc-matte-foundation", description: "Long-wearing matte foundation with a natural finish.", shortDescription: "Long-wearing matte foundation", price: 39.99, comparePrice: 49.99, sku: "BEA-007", stock: 45, isFeatured: true, cat: 1, tags: ["foundation", "matte", "makeup"], image: "https://images.unsplash.com/photo-1590156546673-aa1a6e5d8b4a?w=400&h=500&fit=crop" },
    { name: "Anny Nourishing Nail Polish", slug: "anny-nourishing-nail-polish", description: "Chip-resistant nail polish infused with nourishing ingredients.", shortDescription: "Nourishing chip-resistant nail polish", price: 14.99, comparePrice: 19.99, sku: "BEA-008", stock: 90, isNew: true, cat: 9, tags: ["nails", "polish", "beauty"], image: "https://images.unsplash.com/photo-1604654894617-697025eefc9b?w=400&h=500&fit=crop" },
    { name: "Cocooil Organic Coconut Oil", slug: "cocooil-organic-coconut-oil", description: "Pure organic coconut oil for hair, skin, and body.", shortDescription: "Pure organic coconut oil", price: 25.99, comparePrice: 35.99, sku: "BEA-009", stock: 80, isFeatured: true, cat: 5, tags: ["natural", "coconut", "oil"], image: "https://images.unsplash.com/photo-1597385856643-db5fd0ff3c49?w=400&h=500&fit=crop" },
    { name: "E.L.F Putty Blush Caribbean", slug: "e-l-f-putty-blush-caribbean", description: "Smooth putty blush that melts into skin for a natural flush.", shortDescription: "Smooth putty blush", price: 19.99, comparePrice: 26.99, sku: "BEA-010", stock: 55, isNew: true, cat: 4, tags: ["blush", "putty", "makeup"], image: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=400&h=500&fit=crop" },
    { name: "E.L.F Hydrating Face Primer", slug: "e-l-f-hydrating-face-primer", description: "Hydrating primer that preps skin for makeup.", shortDescription: "Hydrating makeup primer", price: 18.99, comparePrice: 24.99, sku: "BEA-011", stock: 70, cat: 1, tags: ["primer", "hydrating", "makeup"], image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&h=500&fit=crop" },
    { name: "Pond's White Beauty Face Wash", slug: "ponds-white-beauty-face-wash", description: "Gentle face wash that removes impurities while revealing brighter skin.", shortDescription: "Brightening face wash", price: 9.99, comparePrice: 14.99, sku: "BEA-012", stock: 150, isBestSeller: true, cat: 1, tags: ["facewash", "brightening", "skincare"], image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=500&fit=crop" },
    { name: "Loreal Hairstyling Product", slug: "loreal-hairstyling-product", description: "Professional-grade hairstyling product for flexible hold.", shortDescription: "Professional hairstyling product", price: 22.99, comparePrice: 29.99, sku: "BEA-013", stock: 65, isNew: true, cat: 0, tags: ["hair", "styling", "haircare"], image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=400&h=500&fit=crop" },
    { name: "Head & Shoulders Classic Clean", slug: "head-shoulders-classic-clean", description: "Classic clean shampoo that effectively removes dandruff.", shortDescription: "Anti-dandruff classic shampoo", price: 11.99, comparePrice: 15.99, sku: "BEA-014", stock: 180, cat: 0, tags: ["hair", "shampoo", "dandruff"], image: "https://images.unsplash.com/photo-1585747861115-d7dbb32bae66?w=400&h=500&fit=crop" },
    { name: "Laneige Sunscreen Skin Toner", slug: "laneige-sunscreen-skin-toner", description: "Hydrating toner with built-in SPF protection.", shortDescription: "Hydrating toner with SPF", price: 34.99, comparePrice: 42.99, sku: "BEA-016", stock: 40, isNew: true, cat: 1, tags: ["toner", "sunscreen", "skincare"], image: "https://images.unsplash.com/photo-1570194065650-d99fb4d38a91?w=400&h=500&fit=crop" },
    { name: "Vaseline Intensive Care", slug: "vaseline-intensive-care", description: "Deep moisturizing body lotion that heals dry skin.", shortDescription: "Intensive moisture body lotion", price: 8.99, comparePrice: 12.99, sku: "BEA-017", stock: 200, isBestSeller: true, cat: 6, tags: ["body", "moisturizer", "skincare"], image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=500&fit=crop" },
    { name: "Lakme Cosmetics Eye Liner", slug: "lakme-cosmetics-eye-liner", description: "Precision eye liner with intense pigmentation.", shortDescription: "Intense pigmentation eye liner", price: 16.99, comparePrice: 22.99, sku: "BEA-018", stock: 85, isFeatured: true, cat: 8, tags: ["eyes", "liner", "makeup"], image: "https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=400&h=500&fit=crop" },
    { name: "MAC Retro Matte Lipstick", slug: "mac-retro-matte-lipstick", description: "Iconic retro matte lipstick with vibrant color payoff.", shortDescription: "Vibrant retro matte lipstick", price: 24.99, comparePrice: 32.99, sku: "BEA-019", stock: 60, isBestSeller: true, cat: 2, tags: ["lips", "lipstick", "makeup"], image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=500&fit=crop" },
    { name: "NARS Orgasm Blush", slug: "nars-orgasm-blush", description: "The legendary peachy-pink blush with golden shimmer.", shortDescription: "Legendary peachy-pink blush", price: 38.99, comparePrice: 46.99, sku: "BEA-021", stock: 40, isFeatured: true, cat: 4, tags: ["blush", "nars", "makeup"], image: "https://images.unsplash.com/photo-1597225244660-1cd128c6e606?w=400&h=500&fit=crop" },
    { name: "Fenty Beauty Gloss Bomb", slug: "fenty-beauty-gloss-bomb", description: "Universal lip luminizer for the perfect glossy pout.", shortDescription: "Universal lip gloss", price: 25.99, comparePrice: 32.99, sku: "BEA-024", stock: 70, isFeatured: true, cat: 2, tags: ["lips", "gloss", "makeup"], image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=500&fit=crop" },
    { name: "CeraVe Hydrating Cleanser", slug: "cerave-hydrating-cleanser", description: "Gentle hydrating cleanser with ceramides and hyaluronic acid.", shortDescription: "Hydrating facial cleanser", price: 18.99, comparePrice: 24.99, sku: "BEA-025", stock: 120, cat: 1, tags: ["cleanser", "hydrating", "skincare"], image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=500&fit=crop" },
    { name: "Charlotte Tilbury Pillow Talk", slug: "charlotte-tilbury-pillow-talk", description: "The iconic Pillow Talk lipstick in the perfect nude pink shade.", shortDescription: "Iconic Pillow Talk nude lipstick", price: 37.99, comparePrice: 44.99, sku: "BEA-026", stock: 25, isBestSeller: true, cat: 2, tags: ["lips", "lipstick", "luxury"], image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=500&fit=crop" },
  ]

  for (const p of productData) {
    await prisma.product.create({
      data: {
        name: p.name,
        slug: p.slug,
        description: p.description,
        shortDescription: p.shortDescription,
        price: p.price,
        comparePrice: p.comparePrice || null,
        sku: p.sku,
        stock: p.stock,
        isActive: true,
        isFeatured: p.isFeatured || false,
        isNew: p.isNew || false,
        isBestSeller: p.isBestSeller || false,
        images: [p.image],
        categoryId: categories[p.cat].id,
        tags: p.tags,
      },
    })
  }

  // Create blog categories
  const blogCat1 = await prisma.blogCategory.create({
    data: { name: "Beauty Tips", slug: "beauty-tips", description: "Expert beauty tips and tutorials" },
  })
  const blogCat2 = await prisma.blogCategory.create({
    data: { name: "Skincare", slug: "skincare", description: "Skincare routines and product reviews" },
  })
  const blogCat3 = await prisma.blogCategory.create({
    data: { name: "Trends", slug: "trends", description: "Latest beauty trends and news" },
  })

  // Create blog posts
  await prisma.blogPost.create({
    data: {
      title: "5 Reasons Why Regular Manicures and Pedicures Are Essential for Your Health",
      slug: "benefits-regular-manicures-pedicures",
      excerpt: "Discover why regular nail care is essential for your overall health and wellbeing.",
      content: "<p>Regular manicures and pedicures are more than just a luxury—they're an essential part of your health routine. The massage involved stimulates blood flow, prevents ingrown nails, and promotes healthy nail growth.</p><h2>1. Improves Blood Circulation</h2><p>The massage stimulates blood flow to your hands and feet, reducing stress and improving circulation.</p><h2>2. Prevents Ingrown Nails</h2><p>Professional nail care ensures proper trimming and shaping techniques.</p><h2>3. Early Detection</h2><p>Regular care allows professionals to spot potential issues early.</p>",
      featuredImage: "https://images.unsplash.com/photo-1604654894617-697025eefc9b?w=800&h=500&fit=crop",
      categoryId: blogCat1.id,
      authorId: admin.id,
      tags: ["manicure", "pedicure", "nailcare"],
      publishedAt: new Date("2025-09-18"),
    },
  })

  await prisma.blogPost.create({
    data: {
      title: "The Power of Detox: How a Sauna Session Can Revitalize Your Body",
      slug: "power-of-detox-sauna-benefits",
      excerpt: "Learn how regular sauna sessions can help detoxify your body and improve skin health.",
      content: "<p>Sauna sessions have been used for centuries to promote health and wellness. Sweating helps flush toxins, improves circulation, and reduces stress.</p><h2>Deep Cleansing</h2><p>Sweating in a sauna helps flush toxins from your body, leading to clearer skin.</p><h2>Improved Circulation</h2><p>The heat increases blood flow, delivering oxygen and nutrients to your skin cells.</p>",
      featuredImage: "https://images.unsplash.com/photo-1540555700478-4be289fbec6d?w=800&h=500&fit=crop",
      categoryId: blogCat2.id,
      authorId: admin.id,
      tags: ["detox", "sauna", "wellness"],
      publishedAt: new Date("2025-09-18"),
    },
  })

  await prisma.blogPost.create({
    data: {
      title: "The Secret to Glowing Skin: How Facials Transform Your Beauty Routine",
      slug: "secret-to-glowing-skin-facials",
      excerpt: "Unlock the secret to radiant, glowing skin with professional facial treatments.",
      content: "<p>Professional facials are the ultimate treatment for achieving glowing, healthy skin. They provide deep cleansing, customized treatments, and anti-aging benefits.</p><h2>Deep Cleansing</h2><p>Facials provide a deeper clean than what you can achieve at home.</p><h2>Customized Treatments</h2><p>A professional esthetician can customize your facial for your specific skin concerns.</p>",
      featuredImage: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&h=500&fit=crop",
      categoryId: blogCat3.id,
      authorId: admin.id,
      tags: ["facials", "skincare", "glowing-skin"],
      publishedAt: new Date("2025-09-18"),
    },
  })

  // Create settings
  await prisma.setting.createMany({
    data: [
      { key: "site_name", value: "Beauté", group: "general" },
      { key: "site_description", value: "Premium Beauty & Cosmetic Store", group: "general" },
      { key: "phone", value: "(025) 3686 25 16", group: "contact" },
      { key: "email", value: "contact@beaute.com", group: "contact" },
      { key: "address", value: "257 Thatcher Road St, Brooklyn, Manhattan, NY 10092", group: "contact" },
      { key: "free_shipping_min", value: "99", group: "shipping" },
      { key: "currency", value: "USD", group: "general" },
    ],
  })

  // Create coupons
  await prisma.coupon.create({
    data: {
      code: "WELCOME10",
      description: "10% off for new customers",
      discountType: "PERCENTAGE",
      discountValue: 10,
      minAmount: 50,
      maxUses: 100,
      isActive: true,
      startsAt: new Date(),
      expiresAt: new Date("2026-12-31"),
    },
  })

  await prisma.coupon.create({
    data: {
      code: "FREESHIP",
      description: "Free shipping on orders over $30",
      discountType: "FIXED",
      discountValue: 0,
      minAmount: 30,
      maxUses: 500,
      isActive: true,
      startsAt: new Date(),
      expiresAt: new Date("2026-12-31"),
    },
  })

  await prisma.coupon.create({
    data: {
      code: "SUMMER20",
      description: "20% off summer collection",
      discountType: "PERCENTAGE",
      discountValue: 20,
      minAmount: 75,
      maxUses: 200,
      isActive: true,
      startsAt: new Date(),
      expiresAt: new Date("2026-09-30"),
    },
  })

  console.log("✅ Seed data created successfully!")
  console.log("   Admin: admin@beaute.com / admin123")
  console.log("   User: sarah@example.com / user123")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
