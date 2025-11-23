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
import { IUserManagement } from "@/types/global";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import DeleteDialog from "../dialog/delete-dialog";
import { UseFormReturn } from "react-hook-form";
import EditDialog from "../dialog/edit-dialog";

interface DataTableProps {
  users: IUserManagement[];
  isLoading: boolean;
  total: number;
  limit: number;
  page: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  onDelete?: (id: string, avatarUrl?: string) => Promise<void>;
  editOpenId: string | null;
  onEditOpenChange: (open: boolean, userId?: string) => void;
  editForm: UseFormReturn<IUserManagement>;
  onEditSubmit: (data: IUserManagement) => Promise<void>;
  onEditImageChange: (file: File | null) => void;
  editPreview: string | null;
  isEdit: boolean;
}

const DataTable = ({
  users,
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
              <TableHead className="py-5">Avatar</TableHead>
              <TableHead className="py-5">Nama</TableHead>
              <TableHead className="py-5">Email</TableHead>
              <TableHead className="py-5">Telepon</TableHead>
              <TableHead className="py-5">Role</TableHead>
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
                    <Skeleton className="h-10 w-10 rounded-full" />
                  </TableCell>
                  <TableCell className="py-3">
                    <Skeleton className="h-4 w-32" />
                  </TableCell>
                  <TableCell className="py-3">
                    <Skeleton className="h-4 w-40" />
                  </TableCell>
                  <TableCell className="py-3">
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell className="py-3">
                    <Skeleton className="h-4 w-20" />
                  </TableCell>
                  <TableCell className="py-3">
                    <Skeleton className="h-4 w-6" />
                  </TableCell>
                </TableRow>
              ))
            ) : users.length === 0 ? (
              <TableRow className="bg-neutral-50 dark:bg-neutral-900">
                <TableCell colSpan={7} className="text-center py-4">
                  Data tidak ditemukan.
                </TableCell>
              </TableRow>
            ) : (
              users.map((user, index) => (
                <TableRow
                  key={user.id ?? index}
                  className="bg-neutral-50 dark:bg-neutral-900"
                >
                  <TableCell className="py-3">
                    {(page - 1) * limit + index + 1}
                  </TableCell>
                  <TableCell className="py-3">
                    {user.avatar ? (
                      <Image
                        src={user.avatar}
                        alt={user.name}
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
                        <span className="text-sm font-semibold">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="py-3">{user.name}</TableCell>
                  <TableCell className="py-3">{user.email}</TableCell>
                  <TableCell className="py-3">{user.phone || "-"}</TableCell>
                  <TableCell className="py-3">
                    <span className="px-2 py-1 rounded-md text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {user.role}
                    </span>
                  </TableCell>
                  <TableCell className="py-3">
                    <div className="flex gap-3">
                      <EditDialog
                        user={user}
                        form={editForm}
                        onSubmit={onEditSubmit}
                        onImageChange={onEditImageChange}
                        preview={editPreview}
                        isLoading={isEdit}
                        open={editOpenId === user.id}
                        onOpenChange={(open) => onEditOpenChange(open, user.id)}
                      />
                      <DeleteDialog
                        id={user.id}
                        onDelete={onDelete!}
                        avatarUrl={user.avatar}
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
