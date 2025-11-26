"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pagination } from "@/components/ui/pagination";
import { IEvent } from "@/types/global";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import DeleteDialog from "../dialog/delete-dialog";
import { Eye } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface DataTableProps {
  events: IEvent[];
  isLoading: boolean;
  total: number;
  limit: number;
  page: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  onDelete?: (id: string, bannerImage?: string) => Promise<void>;
}

const DataTable = ({
  events,
  isLoading,
  total,
  limit,
  page,
  onPageChange,
  onLimitChange,
  onDelete,
}: DataTableProps) => {
  const totalPages = Math.ceil(total / limit);
  const pathname = usePathname();
  const basePath = pathname.startsWith("/staff") ? "/staff" : "/admin";

  return (
    <>
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-neutral-100 dark:bg-neutral-800">
              <TableHead className="py-5">No</TableHead>
              <TableHead className="py-5">Banner</TableHead>
              <TableHead className="py-5">Judul Event</TableHead>
              <TableHead className="py-5">Lokasi</TableHead>
              <TableHead className="py-5">Status</TableHead>
              <TableHead className="py-5 w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <TableRow key={i} className="bg-neutral-50 dark:bg-neutral-900">
                  <TableCell className="py-3">
                    <Skeleton className="h-4 w-6" />
                  </TableCell>
                  <TableCell className="py-3">
                    <Skeleton className="h-10 w-10 rounded-md" />
                  </TableCell>
                  <TableCell className="py-3">
                    <Skeleton className="h-4 w-32" />
                  </TableCell>
                  <TableCell className="py-3">
                    <Skeleton className="h-4 w-40" />
                  </TableCell>
                  <TableCell className="py-3">
                    <Skeleton className="h-4 w-20" />
                  </TableCell>
                  <TableCell className="py-3">
                    <Skeleton className="h-4 w-6" />
                  </TableCell>
                </TableRow>
              ))
            ) : events.length === 0 ? (
              <TableRow className="bg-neutral-50 dark:bg-neutral-900">
                <TableCell colSpan={6} className="text-center py-4">
                  Data tidak ditemukan.
                </TableCell>
              </TableRow>
            ) : (
              events.map((event, index) => (
                <TableRow
                  key={event.id ?? index}
                  className="bg-neutral-50 dark:bg-neutral-900"
                >
                  <TableCell className="py-3">
                    {(page - 1) * limit + index + 1}
                  </TableCell>
                  <TableCell className="py-3">
                    {event.banner_image ? (
                      <Image
                        src={event.banner_image}
                        alt={event.title}
                        width={100}
                        height={100}
                        className="rounded-md object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-md" />
                    )}
                  </TableCell>
                  <TableCell className="py-3">{event.title}</TableCell>
                  <TableCell className="py-3">{event.location}</TableCell>
                  <TableCell className="py-3">
                    <span
                      className={`px-2 py-1 rounded-md text-sm font-medium ${
                        event.status === "published"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                      }`}
                    >
                      {event.status === "published"
                        ? "Published"
                        : "Unpublished"}
                    </span>
                  </TableCell>
                  <TableCell className="py-3">
                    <div className="flex gap-3">
                      <Link href={`${basePath}/event/${event.id}`}>
                        <Eye className="text-blue-500 w-5 h-5 cursor-pointer" />
                      </Link>
                      <DeleteDialog
                        id={event.id}
                        onDelete={onDelete!}
                        bannerImage={event.banner_image}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center gap-2 justify-between mt-4 pb-7">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground whitespace-nowrap">
            Limit
          </span>
          <Select
            value={String(limit)}
            onValueChange={(val) => onLimitChange(Number(val))}
          >
            <SelectTrigger className="w-[70px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </>
  );
};

export default DataTable;
