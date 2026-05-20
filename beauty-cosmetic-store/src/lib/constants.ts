export const SITE_NAME = "Beauté"
export const SITE_DESCRIPTION = "Premium Beauty & Cosmetic Store"
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Categories", href: "/categories" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "Pages", href: "#", children: [
    { label: "About Us", href: "/about" },
    { label: "FAQ", href: "/faq" },
    { label: "Cart", href: "/cart" },
    { label: "Checkout", href: "/checkout" },
    { label: "Wishlist", href: "/wishlist" },
    { label: "My Account", href: "/account" },
  ]},
]

export const CATEGORIES_MEGA = [
  {
    name: "Makeup",
    slug: "makeup",
    image: "/images/categories/makeup.jpg",
    subcategories: ["Face", "Eyes", "Lips", "Cheeks", "Nails"],
  },
  {
    name: "Skincare",
    slug: "skin-care",
    image: "/images/categories/skincare.jpg",
    subcategories: ["Moisturizers", "Serums", "Cleansers", "Masks", "Sunscreen"],
  },
  {
    name: "Hair Care",
    slug: "hair-care",
    image: "/images/categories/hair-care.jpg",
    subcategories: ["Shampoo", "Conditioner", "Styling", "Treatment", "Hair Color"],
  },
  {
    name: "Body Care",
    slug: "body-care",
    image: "/images/categories/body-care.jpg",
    subcategories: ["Body Lotion", "Body Wash", "Scrubs", "Deodorant", "Hand Cream"],
  },
  {
    name: "Natural",
    slug: "natural",
    image: "/images/categories/natural.jpg",
    subcategories: ["Organic", "Vegan", "Cruelty-Free", "Essential Oils"],
  },
  {
    name: "Fragrance",
    slug: "fragrance",
    image: "/images/categories/fragrance.jpg",
    subcategories: ["Perfume", "Body Spray", "Essential Oils", "Incense"],
  },
]

export const SORT_OPTIONS = [
  { label: "Latest", value: "latest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Best Rated", value: "rating" },
  { label: "Popular", value: "popular" },
]

export const PAYMENT_METHODS = [
  { name: "PayPal", icon: "/images/icons/paypal.svg" },
  { name: "Stripe", icon: "/images/icons/stripe.svg" },
  { name: "Mastercard", icon: "/images/icons/mastercard.svg" },
  { name: "Klarna", icon: "/images/icons/klarna.svg" },
  { name: "Visa", icon: "/images/icons/visa.svg" },
  { name: "American Express", icon: "/images/icons/amex.svg" },
]

export const FEATURES = [
  { icon: "Truck", title: "Free Shipping", description: "Over $99" },
  { icon: "RotateCcw", title: "30 Days Return", description: "Money back" },
  { icon: "ShieldCheck", title: "Secure Payment", description: "100% secure" },
  { icon: "HeadphonesIcon", title: "24/7 Support", description: "Dedicated" },
]
