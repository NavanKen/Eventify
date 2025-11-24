"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ICategory {
  id: string;
  name: string;
}

interface FilterSidebarProps {
  categories: ICategory[];
  search: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
}

export default function FilterSidebar({
  categories,
  search,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
}: FilterSidebarProps) {
  return (
    <div className="bg-white border border-[#E5E7EB] rounded-lg p-6 sticky top-24 space-y-6 shadow-sm">
      <div>
        <Label htmlFor="search" className="mb-2 block">
          Search
        </Label>
        <Input
          id="search"
          placeholder="Cari event..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full py-5"
        />
      </div>

      <div>
        <Label htmlFor="category" className="mb-2 block">
          Category
        </Label>
        <Select
          value={selectedCategory || "all"}
          onValueChange={(val) => {
            onCategoryChange(val === "all" ? "" : val);
          }}
        >
          <SelectTrigger className="w-full py-5">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Kategori</SelectItem>
            {categories.map((cat: ICategory) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="sort" className="mb-2 block">
          Sort By
        </Label>
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-full py-5">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Terbaru</SelectItem>
            <SelectItem value="oldest">Terlama</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
