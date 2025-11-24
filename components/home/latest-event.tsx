"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { getLatestEvents } from "@/service/event.service";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, Variants } from "framer-motion";
import EventCard from "@/components/common/event-card";
import { useScrollIntoView } from "@/hooks/use-scroll-into-view";

interface IEventCard {
  id: string;
  title: string;
  description?: string;
  banner_image?: string;
  location: string;
  start_date: string;
  end_date: string;
}

const LatestEvent = () => {
  const [events, setEvents] = useState<IEventCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { ref, controls } = useScrollIntoView({ threshold: 0.1 });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await getLatestEvents(4);
      if (res.status && res.data) {
        setEvents(res.data);
      }
      setIsLoading(false);
    };
    fetchEvents();
  }, []);

  return (
    <div
      ref={ref}
      className="w-full px-4 md:px-20 py-16"
    >
      <motion.div
        initial="hidden"
        animate={controls}
        variants={containerVariants}
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="h-1 bg-[#635bff] w-full max-w-32 rounded-full mb-3" />
            <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-2">
              Event Terbaru
            </h2>
            <p className="text-[#6b7280] text-sm md:text-base">
              Dapatkan update event terkini yang sedang trending dan jangan
              lewatkan keseruannya
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="grid auto-cols-[20rem] grid-flow-col gap-6 overflow-x-auto py-2 lg:grid-cols-4 scrollbar-hide">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="w-80 h-64 rounded-lg" />
            ))}
          </div>
        ) : events.length > 0 ? (
          <motion.div
            className="grid auto-cols-[20rem] grid-flow-col gap-6 overflow-x-auto py-2 lg:grid-cols-4 scrollbar-hide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {events.map((event, idx) => (
              <EventCard key={event.id} event={event} index={idx} />
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No latest events available</p>
          </div>
        )}
      </motion.div>
      <Link
        href="/explore"
        className="text-gray-500 pt-5 float-end font-semibold text-sm md:text-base hover:underline flex items-center gap-1"
      >
        See More
        <ChevronRight size={16} />
      </Link>
    </div>
  );
};

export default LatestEvent;
