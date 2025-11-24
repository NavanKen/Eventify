"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import type { CarouselApi } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { getRandomBanners } from "@/service/banner.service";
import { Skeleton } from "@/components/ui/skeleton";

interface IBanner {
  id: string;
  image_url: string;
  title?: string;
}

const BannerSlider = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [banners, setBanners] = useState<IBanner[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      const res = await getRandomBanners(5);
      if (res.status && res.data) {
        setBanners(res.data);
      }
      setIsLoading(false);
    };
    fetchBanners();
  }, []);

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const handleDotClick = (index: number) => {
    api?.scrollTo(index);
  };

  if (isLoading) {
    return (
      <div className="w-full pt-24 px-4 md:px-20">
        <Skeleton className="w-full h-96 rounded-2xl" />
        <div className="flex justify-center gap-3 mt-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="w-3 h-3 rounded-full" />
          ))}
        </div>
      </div>
    );
  }

  if (banners.length === 0) {
    return (
      <div className="w-full pt-24 px-4 md:px-20">
        <div className="w-full h-96 bg-gray-200 dark:bg-gray-800 rounded-2xl flex items-center justify-center">
          <p className="text-gray-500">No banners available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full pt-24 px-4 md:px-20">
      <Carousel
        className="w-full"
        setApi={setApi}
        opts={{
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
      >
        <CarouselContent>
          {banners.map((banner) => (
            <CarouselItem key={banner.id}>
              <div className="relative w-full rounded-2xl overflow-hidden">
                <Image
                  src={banner.image_url}
                  alt={banner.title || "Banner"}
                  width={1920}
                  height={1080}
                  className="object-cover rounded-2xl h-[80%] lg:h-[90%]"
                  priority
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="flex justify-center gap-3 mt-6">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`transition-all duration-300 rounded-full ${
              current === index
                ? "w-8 h-3 bg-primary"
                : "w-3 h-3 bg-primary/30 hover:bg-primary/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerSlider;
