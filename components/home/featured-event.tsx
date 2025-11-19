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
  instructor: string;
}

const FeaturedEvent = () => {
  const events: EventCard[] = [
    {
      id: 1,
      title: "Dari Main Game Sampe Jadi Web Developer",
      description: "Bit Episode 1 WPUCast",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
      date: "25 Jan 2025, 09:25 WIB",
      instructor: "Talkshow WPUCast",
    },
    {
      id: 2,
      title: "Fitur Search Pada React JS",
      description: "Belajar Membuat Fitur Search React JS",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop",
      date: "9 Jan 2025, 09:24 WIB",
      instructor: "Belajar Membuat Fitur Search React JS",
    },
    {
      id: 3,
      title: "GraphQL Fundamental",
      description: "Apakah Anda ingin mempelajari cara mengoptimalkan komunikasi antar frontend dan backend?",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop",
      date: "15 Jan 2025, 09:22 WIB",
      instructor: "GraphQL Fundamental",
    },
    {
      id: 4,
      title: "Belajar Tailwind CSS Bareng Kang Agung",
      description: "Apakah Anda ingin mempelajari cara membuat desain web yang modern dan responsif?",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop",
      date: "11 Jan 2025, 09:19 WIB",
      instructor: "Belajar Tailwind CSS Bareng Kang Agung",
    },
  ];

  return (
    <div className="w-full px-4 md:px-20 py-16">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-text-dark mb-1">
            Featured Event
          </h2>
        </div>
        <Link
          href="/explore"
          className="text-primary font-semibold text-sm md:text-base hover:underline flex items-center gap-1"
        >
          See More
          <ChevronRight size={16} />
        </Link>
      </div>

      {/* Event Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer group"
          >
            {/* Image Container */}
            <div className="relative w-full h-48 overflow-hidden bg-gray-200">
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Content */}
            <div className="p-4">
              {/* Title */}
              <h3 className="font-semibold text-text-dark text-sm md:text-base line-clamp-2 mb-2">
                {event.title}
              </h3>

              {/* Description */}
              <p className="text-text-light text-xs md:text-sm line-clamp-2 mb-3">
                {event.description}
              </p>

              {/* Date */}
              <p className="text-text-light text-xs mb-3">
                {event.date}
              </p>

              {/* Instructor/Tag */}
              <div className="pt-3 border-t border-gray-200">
                <p className="text-text-light text-xs line-clamp-1">
                  {event.instructor}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedEvent;
