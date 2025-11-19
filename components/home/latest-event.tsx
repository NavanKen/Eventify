"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface EventCard {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
}

const LatestEvent = () => {
  const events: EventCard[] = [
    {
      id: 1,
      title: "Talkshow WPUCast",
      description: "Bit Episode 1 WPUCast",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
      date: "25 Jan 2025, 09:25 WIB",
    },
    {
      id: 2,
      title: "Belajar Membuat Fitur Search React JS",
      description: "Belajar Membuat Fitur Search React JS",
      image:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop",
      date: "9 Jan 2025, 09:24 WIB",
    },
    {
      id: 3,
      title: "GraphQL Fundamental",
      description:
        "Apakah Anda ingin mempelajari cara mengoptimalkan komunikasi antar frontend dan backend?",
      image:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop",
      date: "15 Jan 2025, 09:22 WIB",
    },
    {
      id: 4,
      title: "Belajar Tailwind CSS Bareng Kang Agung",
      description:
        "Apakah Anda ingin mempelajari cara membuat desain web yang modern dan responsif?",
      image:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop",
      date: "11 Jan 2025, 09:19 WIB",
    },
  ];

  return (
    <div className="w-full px-4 md:px-20 py-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl text-primary md:text-3xl font-bold text-text-dark mb-1">
            Latest Event
          </h2>
        </div>
        <Link
          href="/explore"
          className="text-gray-500 font-semibold text-sm md:text-base hover:underline flex items-center gap-1"
        >
          See More
          <ChevronRight size={16} />
        </Link>
      </div>

      <div className="grid auto-cols-[20rem] grid-flow-col gap-6 overflow-x-auto py-2 lg:grid-cols-4 lg:px-1 scrollbar-hide">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-lg border border-[#E5E7EB] overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
          >
            <div className="p-4 flex flex-col h-full">
              <div>
                <Image
                  src={event.image}
                  alt={event.title}
                  width={1920}
                  height={1080}
                  className="aspect-video w-full rounded-lg object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold text-primary text-text-dark text-sm md:text-lg line-clamp-1 mb-2 mt-3">
                  {event.title}
                </h3>

                <p className="text-text-light text-xs md:text-sm line-clamp-2 mb-3">
                  {event.description}
                </p>
              </div>
              <p className="text-text-light text-xs mt-auto">{event.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestEvent;
