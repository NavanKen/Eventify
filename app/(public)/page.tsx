import Hero from "@/components/home/hero";
import Features from "@/components/home/featured";
import LatestEvent from "@/components/home/latest-event";
import BannerSlider from "@/components/home/banner-slider";
import FeaturedEvent from "@/components/home/featured-event";
import CategoriesSection from "@/components/home/categories-section";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedEvent />
      <BannerSlider />
      <Features />
      <LatestEvent />
      <CategoriesSection />
    </>
  );
}
