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
import { ICategory } from "@/types/global";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import DeleteDialog from "../dialog/delete-dialog";
import { UseFormReturn } from "react-hook-form";
import EditDialog from "../dialog/edit-dialog";

interface DataTableProps {
  categories: ICategory[];
  isLoading: boolean;
  total: number;
  limit: number;
  page: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  onDelete?: (id: string, imageUrl?: string) => Promise<void>;
  editOpenId: string | null;
  onEditOpenChange: (open: boolean, categoryId?: string) => void;
  editForm: UseFormReturn<ICategory>;
  onEditSubmit: (data: ICategory) => Promise<void>;
  onEditImageChange: (file: File | null) => void;
  editPreview: string | null;
  isEdit: boolean;
}

const DataTable = ({
  categories,
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
              <TableHead className="py-5">Icon</TableHead>
              <TableHead className="py-5">Nama Kategori</TableHead>
              <TableHead className="py-5">Keterangan</TableHead>
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
                    <Skeleton className="h-4 w-48" />
                  </TableCell>
                  <TableCell className="py-3">
                    <Skeleton className="h-4 w-6" />
                  </TableCell>
                </TableRow>
              ))
            ) : categories.length === 0 ? (
              <TableRow className="bg-neutral-50 dark:bg-neutral-900">
                <TableCell colSpan={5} className="text-center py-4">
                  Data tidak ditemukan.
                </TableCell>
              </TableRow>
            ) : (
              categories.map((menu, index) => (
                <TableRow
                  key={menu.id ?? index}
                  className="bg-neutral-50 dark:bg-neutral-900"
                >
                  <TableCell className="py-3">
                    {(page - 1) * limit + index + 1}
                  </TableCell>
                  <TableCell className="py-3">
                    <Image
                      src={menu.image!}
                      alt={menu.name}
                      width={40}
                      height={40}
                      className="rounded-md object-cover"
                    />
                  </TableCell>
                  <TableCell className="py-3">{menu.name}</TableCell>
                  <TableCell className="py-3">{menu.description}</TableCell>
                  <TableCell className="py-3">
                    <div className="flex gap-3">
                      <EditDialog
                        category={menu}
                        form={editForm}
                        onSubmit={onEditSubmit}
                        onImageChange={onEditImageChange}
                        preview={editPreview}
                        isLoading={isEdit}
                        open={editOpenId === menu.id}
                        onOpenChange={(open) => onEditOpenChange(open, menu.id)}
                      />
                      <DeleteDialog id={menu.id} onDelete={onDelete!} />
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
