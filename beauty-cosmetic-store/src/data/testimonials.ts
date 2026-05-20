export interface TestimonialData {
  id: string
  name: string
  role: string
  image: string
  content: string
  rating: number
}

export const TESTIMONIALS: TestimonialData[] = [
  {
    id: "test-1",
    name: "Sophie Laurent",
    role: "Beauty Enthusiast",
    image: "/images/testimonials/testimonial-1.jpg",
    content: "I've been shopping at Beauté for over a year now and the quality never disappoints. The skincare serums transformed my complexion completely. Highly recommend the Vitamin C serum!",
    rating: 5,
  },
  {
    id: "test-2",
    name: "Emma Richardson",
    role: "Professional Makeup Artist",
    image: "/images/testimonials/testimonial-2.jpg",
    content: "As a makeup artist, I'm very picky about the products I use. Beauté's foundation range has the most incredible shade selection I've ever seen. My clients love the finish!",
    rating: 5,
  },
  {
    id: "test-3",
    name: "Maria Chen",
    role: "Skincare Blogger",
    image: "/images/testimonials/testimonial-3.jpg",
    content: "The natural skincare line is absolutely amazing. Clean ingredients that actually work. My rosacea has improved dramatically since I switched to their products.",
    rating: 5,
  },
  {
    id: "test-4",
    name: "Jessica Williams",
    role: "Regular Customer",
    image: "/images/testimonials/testimonial-4.jpg",
    content: "Fast shipping, beautiful packaging, and the products smell divine. The hair oil is my absolute favorite — it made my dry ends silky smooth after just one use.",
    rating: 4,
  },
  {
    id: "test-5",
    name: "Olivia Martinez",
    role: "Yoga Instructor",
    image: "/images/testimonials/testimonial-5.jpg",
    content: "I love that Beauté offers cruelty-free and vegan options. Their body care line is perfect for my lifestyle. The lavender body lotion is part of my daily self-care routine.",
    rating: 5,
  },
  {
    id: "test-6",
    name: "Amanda Thompson",
    role: "Beauty Vlogger",
    image: "/images/testimonials/testimonial-6.jpg",
    content: "The fragrance collection is absolutely stunning. I get compliments everywhere I go when wearing their signature scent. Long-lasting and beautifully layered notes.",
    rating: 5,
  },
]
