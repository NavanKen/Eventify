"use client";

import { useEffect } from "react";
import ExploreContent from "@/components/explore/explore-content";
import { useExplore } from "@/hooks/use-explore";
import { Suspense } from "react";

const Explore = () => {
  const {
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
    totalPages,
  } = useExplore();

  useEffect(() => {
    console.log("Debug Info:", {
      eventsCount: events.length,
      totalPages,
      currentPage: page,
      isLoading,
    });
  }, [events, totalPages, page, isLoading]);

  return (
    <div className="px-4 md:px-20 py-24">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#111827] mb-2">
          Explore Events
        </h1>
        <p className="text-[#6b7280]">
          Temukan dan jelajahi berbagai event menarik
        </p>
      </div>

      <ExploreContent
        events={events}
        categories={categories}
        isLoading={isLoading}
        search={search}
        onSearchChange={setSearch}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
        page={page}
        onPageChange={setPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default function ExplorePage() {
  return (
    <>
      <Suspense>
        <Explore />
      </Suspense>
    </>
  );
}
