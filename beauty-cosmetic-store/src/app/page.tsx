import { HeroSlider } from "@/components/home/HeroSlider"
import { FeaturedCategories } from "@/components/home/FeaturedCategories"
import { PromoBanners } from "@/components/home/PromoBanners"
import { BestSellers } from "@/components/home/BestSellers"
import { FeaturedCarousel } from "@/components/home/FeaturedCarousel"
import { StatsCounter } from "@/components/home/StatsCounter"
import { DealsOfDay } from "@/components/home/DealsOfDay"
import { FlashSaleBanner } from "@/components/home/FlashSaleBanner"
import { NewArrivals } from "@/components/home/NewArrivals"
import { TrendingProducts } from "@/components/home/TrendingProducts"
import { FeaturedProducts } from "@/components/home/FeaturedProducts"
import { BlogSection } from "@/components/home/BlogSection"
import { BrandCarousel } from "@/components/home/BrandCarousel"
import { Testimonials } from "@/components/home/Testimonials"
import { InstagramFeed } from "@/components/home/InstagramFeed"
import { Newsletter } from "@/components/home/Newsletter"
import { FeaturesBar } from "@/components/home/FeaturesBar"

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <FeaturedCategories />
      <PromoBanners />
      <BestSellers />
      <FeaturedCarousel />
      <StatsCounter />
      <DealsOfDay />
      <FlashSaleBanner />
      <NewArrivals />
      <TrendingProducts />
      <FeaturedProducts />
      <Testimonials />
      <BlogSection />
      <BrandCarousel />
      <InstagramFeed />
      <Newsletter />
      <FeaturesBar />
    </>
  )
}
