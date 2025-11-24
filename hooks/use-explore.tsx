"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { getPublishedEvents } from "@/service/event.service";
import { getCategoryService } from "@/service/category.service";

interface IEvent {
  id: string;
  title: string;
  description?: string;
  banner_image?: string;
  location: string;
  start_date: string;
  category_id?: string;
  created_at: string;
  category?: { name: string };
}

interface ICategory {
  id: string;
  name: string;
}

export const useExplore = () => {
  const searchParams = useSearchParams();
  const [events, setEvents] = useState<IEvent[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || ""
  );
  const [sortBy, setSortBy] = useState("newest");
  const [page, setPage] = useState(1);
  const [allFilteredEvents, setAllFilteredEvents] = useState<IEvent[]>([]);
  const limit = 5;

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getCategoryService({ limit: 100 });
      if (res.status && res.data) {
        setCategories(res.data);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      const res = await getPublishedEvents({
        search,
        limit: 100,
        offset: 0,
      });

      if (res.status && res.data) {
        let filtered: IEvent[] = res.data;

        // Filter by category
        if (selectedCategory) {
          filtered = filtered.filter(
            (event: IEvent) => event.category_id === selectedCategory
          );
        }

        // Sort
        if (sortBy === "newest") {
          filtered.sort(
            (a: IEvent, b: IEvent) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          );
        } else if (sortBy === "oldest") {
          filtered.sort(
            (a: IEvent, b: IEvent) =>
              new Date(a.created_at).getTime() -
              new Date(b.created_at).getTime()
          );
        }

        // Store all filtered events for pagination calculation
        setAllFilteredEvents(filtered);

        // Paginate based on current page
        const offset = (page - 1) * limit;
        const paginatedEvents = filtered.slice(offset, offset + limit);
        setEvents(paginatedEvents);
      }
      setIsLoading(false);
    };

    fetchEvents();
  }, [search, selectedCategory, sortBy, page]);

  // Calculate total pages using useMemo
  const totalPages = useMemo(() => {
    const pages = Math.ceil(allFilteredEvents.length / limit);
    if (allFilteredEvents.length === 0) return 0;
    return Math.max(pages, 1);
  }, [allFilteredEvents.length, limit]);

  return {
    events,
    categories,
    isLoading,
    search,
    setSearch,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    page,
    setPage,
    limit,
    totalPages,
  };
};
