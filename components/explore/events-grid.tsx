"use client";

import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import EventCard from "@/components/common/event-card";

interface IEvent {
  id: string;
  title: string;
  description?: string;
  banner_image?: string;
  start_date: string;
  location: string;
  category?: { name: string };
}

interface EventsGridProps {
  events: IEvent[];
  isLoading: boolean;
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function EventsGrid({
  events,
  isLoading,
  totalPages,
  currentPage,
  onPageChange,
}: EventsGridProps) {
  if (isLoading) {
    return (
      <div className="lg:col-span-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-80 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="lg:col-span-3 text-center py-16">
        <p className="text-gray-500 text-lg">No events found</p>
      </div>
    );
  }

  return (
    <div className="lg:col-span-3">
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {events.map((event, idx) => (
          <EventCard key={event.id} event={event} index={idx} />
        ))}
      </motion.div>

      {totalPages > 0 && (
        <motion.div
          className="flex flex-wrap justify-center items-center gap-2 mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium text-sm"
          >
            ← Previous
          </button>

          <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300">
            <span>
              Halaman <span className="font-semibold">{currentPage}</span> dari {" "}
              <span className="font-semibold">{totalPages}</span>
            </span>
          </div>

          <button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium text-sm"
          >
            Next →
          </button>
        </motion.div>
      )}
    </div>
  );
}
