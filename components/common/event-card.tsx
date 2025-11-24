"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Calendar } from "lucide-react";

interface IEventCard {
  id: string;
  title: string;
  description?: string;
  banner_image?: string;
  start_date: string;
  location?: string;
  category?: { name: string };
}

interface EventCardProps {
  event: IEventCard;
  index?: number;
}

export default function EventCard({ event, index = 0 }: EventCardProps) {
  const MAX_WORDS = 20;

  const truncatedDescription = event.description
    ? event.description.split(" ").length > MAX_WORDS
      ? event.description.split(" ").slice(0, MAX_WORDS).join(" ") + "..."
      : event.description
    : "No description";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      <Link href={`/event/${event.id}`}>
        <div
          key={event.id}
          className="h-full flex flex-col bg-white rounded-lg border border-[#E5E7EB] overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
        >
          <div className="p-4 flex flex-col h-full justify-between">
            <div>
              <Image
                src={event.banner_image!}
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
                {truncatedDescription}
              </p>
            </div>
            <div className="flex flex-col gap-2 text-sm text-[#6B7280]">
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span>{event.location}</span>
              </div>

              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>
                  {new Date(event.start_date).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
