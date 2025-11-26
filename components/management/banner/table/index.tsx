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
import { IBanner } from "@/types/global";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import DeleteDialog from "../dialog/delete-dialog";
import { UseFormReturn } from "react-hook-form";
import EditDialog from "../dialog/edit-dialog";

interface DataTableProps {
  banners: IBanner[];
  isLoading: boolean;
  total: number;
  limit: number;
  page: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  onDelete?: (id: string, imageUrl?: string) => Promise<void>;
  editOpenId: string | null;
  onEditOpenChange: (open: boolean, bannerId?: string) => void;
  editForm: UseFormReturn<IBanner>;
  onEditSubmit: (data: IBanner) => Promise<void>;
  onEditImageChange: (file: File | null) => void;
  editPreview: string | null;
  isEdit: boolean;
}

const DataTable = ({
  banners,
  isLoading,
  total,
  limit,
  page,
  onPageChange,
  onLimitChange,
  onDelete,
  editOpenId,
  onEditOpenChange,
  editForm,
  onEditSubmit,
  onEditImageChange,
  editPreview,
  isEdit,
}: DataTableProps) => {
  const totalPages = Math.ceil(total / limit);

  return (
    <>
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-neutral-100 dark:bg-neutral-800">
              <TableHead className="py-5">No</TableHead>
              <TableHead className="py-5">Gambar</TableHead>
              <TableHead className="py-5">Judul Banner</TableHead>
              <TableHead className="py-5">Status</TableHead>
              <TableHead className="py-5 w-[50px]"></TableHead>
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
                    <Skeleton className="h-4 w-16" />
                  </TableCell>
                  <TableCell className="py-3">
                    <Skeleton className="h-4 w-6" />
                  </TableCell>
                </TableRow>
              ))
            ) : banners.length === 0 ? (
              <TableRow className="bg-neutral-50 dark:bg-neutral-900">
                <TableCell colSpan={5} className="text-center py-4">
                  Data tidak ditemukan.
                </TableCell>
              </TableRow>
            ) : (
              banners.map((banner, index) => (
                <TableRow
                  key={banner.id ?? index}
                  className="bg-neutral-50 dark:bg-neutral-900"
                >
                  <TableCell className="py-3">
                    {(page - 1) * limit + index + 1}
                  </TableCell>
                  <TableCell className="py-3">
                    <Image
                      src={banner.image_url!}
                      alt={banner.title}
                      width={300}
                      height={200}
                      className="rounded-md object-cover"
                    />
                  </TableCell>
                  <TableCell className="py-3">{banner.title}</TableCell>
                  <TableCell className="py-3">
                    <span
                      className={`px-2 py-1 rounded-md text-sm font-medium ${
                        banner.status
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                      }`}
                    >
                      {banner.status ? "Aktif" : "Tidak Aktif"}
                    </span>
                  </TableCell>
                  <TableCell className="py-3">
                    <div className="flex gap-3">
                      <EditDialog
                        banner={banner}
                        form={editForm}
                        onSubmit={onEditSubmit}
                        onImageChange={onEditImageChange}
                        preview={editPreview}
                        isLoading={isEdit}
                        open={editOpenId === banner.id}
                        onOpenChange={(open) =>
                          onEditOpenChange(open, banner.id)
                        }
                      />
                      <DeleteDialog
                        id={banner.id}
                        onDelete={onDelete!}
                        imageUrl={banner.image_url}
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
