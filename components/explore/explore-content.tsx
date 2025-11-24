"use client";

import FilterSidebar from "./filter-sidebar";
import EventsGrid from "./events-grid";

interface IEvent {
  id: string;
  title: string;
  description?: string;
  banner_image?: string;
  start_date: string;
  category_id?: string;
  location: string;
  created_at: string;
  category?: { name: string };
}

interface ICategory {
  id: string;
  name: string;
}

interface ExploreContentProps {
  events: IEvent[];
  categories: ICategory[];
  isLoading: boolean;
  search: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  page: number;
  onPageChange: (page: number) => void;
  totalPages: number;
}

export default function ExploreContent({
  events,
  categories,
  isLoading,
  search,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  page,
  onPageChange,
  totalPages,
}: ExploreContentProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-1">
        <FilterSidebar
          categories={categories}
          search={search}
          onSearchChange={(val) => {
            onSearchChange(val);
            onPageChange(1);
          }}
          selectedCategory={selectedCategory}
          onCategoryChange={(val) => {
            onCategoryChange(val);
            onPageChange(1);
          }}
          sortBy={sortBy}
          onSortChange={(val) => {
            onSortChange(val);
            onPageChange(1);
          }}
        />
      </div>

      <EventsGrid
        events={events}
        isLoading={isLoading}
        totalPages={totalPages}
        currentPage={page}
        onPageChange={onPageChange}
      />
    </div>
  );
}
