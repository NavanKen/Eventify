import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface IPagination {
  currentPage?: number;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  page,
  totalPages,
  onPageChange,
}: IPagination) => {
  const activePage = currentPage || page || 1;
  const safeTotal = totalPages || 1; // Default ke 1 jika tidak ada data

  return (
    <div className="flex items-center justify-end gap-3">
      <span className="text-sm text-muted-foreground">
        Halaman {safeTotal === 0 ? 0 : activePage} dari {safeTotal === 0 ? 0 : safeTotal}
      </span>

      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(activePage - 1)}
        disabled={activePage === 1 || safeTotal === 0}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(activePage + 1)}
        disabled={activePage >= safeTotal || safeTotal === 0}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};
