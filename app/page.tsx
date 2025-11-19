import AppLayout from "@/layout/app-layout";
import Hero from "@/components/home/hero";
import FeaturedEvent from "@/components/home/featured-event";
import LatestEvent from "@/components/home/latest-event";

export default function Home() {
  return (
    <>
      <AppLayout>
        <Hero />
        <FeaturedEvent />
        <LatestEvent />
      </AppLayout>
    </>
  );
}
