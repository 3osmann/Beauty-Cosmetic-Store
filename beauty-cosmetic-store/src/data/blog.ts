export interface BlogPostData {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  featuredImage: string
  author: string
  category: string
  tags: string[]
  publishedAt: string
}

export const BLOG_POSTS: BlogPostData[] = [
  {
    id: "post-1",
    title: "The Ultimate Guide to Building a Skincare Routine",
    slug: "ultimate-guide-skincare-routine",
    excerpt: "Learn how to build the perfect skincare routine for your skin type with our step-by-step guide covering cleansers, serums, moisturizers, and more.",
    content: "Building a skincare routine can feel overwhelming with so many products on the market. In this comprehensive guide, we walk you through everything you need to know about creating a routine that works for your unique skin type.\n\n## Step 1: Know Your Skin Type\n\nBefore you start buying products, it's essential to understand your skin type. Is your skin oily, dry, combination, or sensitive? Each skin type has specific needs that should guide your product choices.\n\n## Step 2: The Basics — Cleanse, Tone, Moisturize\n\nEvery good skincare routine starts with three fundamental steps. Cleansing removes dirt and impurities. Toning balances your skin's pH levels. Moisturizing keeps your skin hydrated and protected.\n\n## Step 3: Add Treatments\n\nOnce you've mastered the basics, you can incorporate serums, exfoliants, and masks to target specific concerns like aging, hyperpigmentation, or acne.\n\n## Step 4: Never Skip Sunscreen\n\nSunscreen is non-negotiable. Daily SPF protection prevents premature aging, hyperpigmentation, and skin cancer. Make it the final step of your morning routine.\n\nRemember, consistency is key. Give your skin time to adjust to new products — usually 4-6 weeks — before evaluating results.",
    featuredImage: "/images/blog/skincare-routine.jpg",
    author: "Sophie Laurent",
    category: "Skincare Tips",
    tags: ["skincare", "beauty tips", "skin routine", "skincare guide"],
    publishedAt: "2025-12-15",
  },
  {
    id: "post-2",
    title: "Top 10 Makeup Trends for Spring 2026",
    slug: "top-10-makeup-trends-spring-2026",
    excerpt: "Discover the hottest makeup trends for the upcoming spring season, from bold lip colors to glass skin finishes and everything in between.",
    content: "Spring is the season of renewal, and your makeup look deserves a fresh update too. Here are the top 10 makeup trends that will dominate Spring 2026.\n\n## 1. Glass Skin\n\nThe glass skin trend continues to reign supreme. Achieve this look with dewy primers, lightweight foundations, and liquid highlighters for a luminous, translucent complexion.\n\n## 2. Bold Graphic Liners\n\nSay goodbye to subtle winged liner. This season is all about bold, graphic eyeliner looks — think geometric shapes, floating liners, and pops of vibrant color.\n\n## 3. Berry-Stained Lips\n\nMove over nude lips. Berry-stained lips are making a major comeback. Think juicy, tinted stains in raspberry, cherry, and plum shades.\n\n## 4. Flushed Cheeks\n\nThe 'just-pinched' cheek is back. Use cream blushes in soft pink and peach tones applied high on the cheekbones for a youthful, fresh appearance.\n\n## 5. Pastel Eyeshadows\n\nSoft lavender, mint green, and baby blue eyeshadows are trending. Keep the rest of your face minimal and let your eyes do the talking.\n\n## 6. Feathered Brows\n\nNatural, feathered brows continue to dominate. Brush brows upward and set with a clear gel for a soft, fluffy look.\n\n## 7. Glossy Everything\n\nGlossy lids, glossy lips, glossy cheeks — high-shine finishes are everywhere this spring.\n\n## 8. Colorful Mascara\n\nSwap black mascara for navy, burgundy, or emerald green for a subtle but striking difference.\n\n## 9. Monochromatic Looks\n\nUse the same shade on eyes, cheeks, and lips for a cohesive, effortless monochromatic look.\n\n## 10. Minimal Base\n\nLet your skin breathe with lightweight tinted moisturizers and spot concealing instead of full-coverage foundation.",
    featuredImage: "/images/blog/spring-trends.jpg",
    author: "Emma Richardson",
    category: "Makeup Trends",
    tags: ["makeup", "trends", "spring 2026", "beauty trends"],
    publishedAt: "2026-03-01",
  },
  {
    id: "post-3",
    title: "Clean Beauty: What It Really Means and Why It Matters",
    slug: "clean-beauty-what-it-means",
    excerpt: "Clean beauty is more than a buzzword. Learn what clean beauty actually means, which ingredients to avoid, and how to make safer choices for your skin and the planet.",
    content: "The term 'clean beauty' has become increasingly popular, but what does it really mean? Unlike organic or natural certifications, clean beauty is not a regulated term. Here's what you need to know.\n\n## What is Clean Beauty?\n\nClean beauty refers to products made without ingredients that have been linked to health concerns or environmental harm. This typically means avoiding parabens, phthalates, sulfates, and synthetic fragrances.\n\n## Ingredients to Avoid\n\nWhen shopping for clean beauty products, look out for:\n\n- Parabens (methylparaben, propylparaben)\n- Phthalates (often hidden under 'fragrance')\n- Sodium lauryl sulfate (SLS) and sodium laureth sulfate (SLES)\n- Formaldehyde-releasing preservatives\n- Oxybenzone and octinoxate (in sunscreens)\n- Microbeads\n\n## Why It Matters\n\nYour skin is your largest organ. What you put on it can be absorbed into your bloodstream. Choosing clean beauty products reduces your exposure to potentially harmful chemicals while also supporting brands that prioritize environmental sustainability.\n\n## How to Start\n\nBegin by replacing products that stay on your skin the longest — moisturizers, serums, and sunscreens — with clean alternatives. Then gradually swap out your wash-off products like cleansers and body washes.\n\nAt Beauté, we carefully curate our clean beauty section to ensure every product meets rigorous safety and sustainability standards.",
    featuredImage: "/images/blog/clean-beauty.jpg",
    author: "Maria Chen",
    category: "Clean Beauty",
    tags: ["clean beauty", "natural", "organic", "safe ingredients", "non-toxic"],
    publishedAt: "2026-02-20",
  },
  {
    id: "post-4",
    title: "The Perfect Nighttime Skincare Routine for Glowing Skin",
    slug: "perfect-nighttime-skincare-routine",
    excerpt: "Wake up to glowing skin with this expert-approved nighttime skincare routine. From double cleansing to overnight masks, we've got you covered.",
    content: "Your nighttime skincare routine is arguably more important than your morning routine. While you sleep, your skin goes into repair mode, making it the perfect time to apply active ingredients.\n\n## Step 1: Double Cleanse\n\nStart with an oil-based cleanser to dissolve makeup and sunscreen. Follow with a water-based cleanser to remove any remaining impurities. This two-step method ensures a completely clean canvas.\n\n## Step 2: Exfoliate (2-3 Times Per Week)\n\nGentle exfoliation removes dead skin cells and allows your serums to penetrate more deeply. Use chemical exfoliants like AHAs or BHAs rather than harsh physical scrubs.\n\n## Step 3: Apply Treatments\n\nThis is where you target specific concerns. Apply your serums in order of thinnest to thickest consistency. Vitamin C for brightening, retinol for anti-aging, or niacinamide for pore refining.\n\n## Step 4: Eye Cream\n\nThe skin around your eyes is delicate and often shows the first signs of aging. Use a peptide-rich eye cream with a gentle tapping motion.\n\n## Step 5: Moisturize\n\nLock everything in with a rich night cream. Look for ingredients like ceramides, peptides, and squalane that support the skin's barrier overnight.\n\n## Step 6: Overnight Mask (Optional)\n\nOnce or twice a week, swap your moisturizer for an overnight sleeping mask for an extra hydration boost.\n\nPro tip: Sleep on a silk pillowcase to reduce friction and prevent sleep lines.",
    featuredImage: "/images/blog/nighttime-routine.jpg",
    author: "Sophie Laurent",
    category: "Skincare Tips",
    tags: ["nighttime routine", "skincare", "glowing skin", "night skincare"],
    publishedAt: "2026-01-10",
  },
  {
    id: "post-5",
    title: "How to Choose the Perfect Foundation Shade Online",
    slug: "choose-perfect-foundation-shade-online",
    excerpt: "Struggling to find your foundation match without swatching in person? Follow our expert tips for finding your perfect shade from the comfort of your home.",
    content: "Finding the right foundation shade is one of the biggest challenges in beauty shopping. When shopping online, you don't have the luxury of testing shades in person. Here's how to nail it every time.\n\n## Know Your Undertone\n\nThe first step is identifying your undertone — cool, warm, or neutral. Look at the veins on your wrist: blue/purple veins indicate cool undertones, green veins indicate warm, and a mix indicates neutral.\n\n## Use Online Tools\n\nMany brands now offer virtual try-on tools that use your camera to match shades. While not perfect, they're a great starting point.\n\n## Read Reviews Strategically\n\nLook for reviews from people who mention their skin tone and undertone. If someone with a similar complexion to yours loves a shade, it's likely a good match.\n\n## Check Multiple Swatch Photos\n\nSearch for the foundation name + 'swatch' on social media. Real-life photos in different lighting conditions give you a much better idea than professional product shots.\n\n## Consider Your Coverage Preference\n\nFull-coverage foundations are more forgiving with shade matches than sheer or light-coverage formulas. If you're between shades, go lighter — it's easier to warm up with bronzer than to lighten a too-dark foundation.\n\n## Match to Your Neck, Not Your Face\n\nYour face may be a different shade than your neck due to sun exposure or skincare products. Always match foundation to your neck and chest for a seamless blend.\n\nAt Beauté, we offer detailed shade guides and virtual consultation services to help you find your perfect match.",
    featuredImage: "/images/blog/foundation-shade.jpg",
    author: "Emma Richardson",
    category: "Makeup Tips",
    tags: ["foundation", "shade matching", "makeup tips", "online shopping"],
    publishedAt: "2026-02-05",
  },
  {
    id: "post-6",
    title: "The Benefits of Vitamin C in Skincare: Everything You Need to Know",
    slug: "benefits-vitamin-c-skincare",
    excerpt: "Vitamin C is one of the most powerful antioxidants in skincare. Discover its benefits, how to use it, and which products deliver the best results.",
    content: "Vitamin C has earned its place as a skincare superstar for good reason. This powerful antioxidant offers a wide range of benefits for all skin types.\n\n## Key Benefits\n\n- **Brightens Skin Tone**: Vitamin C inhibits melanin production, helping to fade dark spots and hyperpigmentation.\n- **Boosts Collagen**: It stimulates collagen production, reducing fine lines and improving skin firmness.\n- **Protects from Environmental Damage**: As an antioxidant, it neutralizes free radicals caused by UV exposure and pollution.\n- **Enhances Sunscreen Protection**: When used under sunscreen, Vitamin C boosts its effectiveness.\n\n## How to Use Vitamin C\n\nApply Vitamin C serum in the morning on clean, dry skin before moisturizer and sunscreen. This maximizes its antioxidant protection throughout the day.\n\n## Choosing the Right Product\n\nLook for L-ascorbic acid (the most potent form) in concentrations between 10-20%. The product should be in opaque, air-tight packaging as Vitamin C is unstable and degrades with light and air exposure.\n\n## Who Should Use It\n\nVitamin C is suitable for all skin types, including sensitive skin (start with lower concentrations). It's especially beneficial for those concerned with aging, dullness, or hyperpigmentation.\n\n## Our Top Picks\n\nAt Beauté, we carry a curated selection of Vitamin C serums for every budget and skin type. Visit our skincare section to explore our range.",
    featuredImage: "/images/blog/vitamin-c.jpg",
    author: "Maria Chen",
    category: "Ingredient Spotlight",
    tags: ["vitamin C", "skincare", "antioxidants", "brightening", "anti-aging"],
    publishedAt: "2026-03-10",
  },
]
