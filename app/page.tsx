import AppLayout from "@/layout/app-layout";
import Hero from "@/components/home/hero";
import FeaturedEvent from "@/components/home/featured-event";
import Features from "@/components/home/featured";
import LatestEvent from "@/components/home/latest-event";

export default function Home() {
  return (
    <>
      <AppLayout>
        <Hero />
        <FeaturedEvent />
        <div className="py-3">
          <Features />
        </div>
        <LatestEvent />
      </AppLayout>
    </>
  );
}
