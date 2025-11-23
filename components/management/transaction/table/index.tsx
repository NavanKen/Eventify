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
import { ITransaction, IEvent, ITicket, IUser } from "@/types/global";

interface TransactionWithRelations extends ITransaction {
  event?: IEvent;
  ticket?: ITicket;
  users?: IUser;
}
import { Skeleton } from "@/components/ui/skeleton";
import DeleteDialog from "../dialog/delete-dialog";
import { Eye } from "lucide-react";
import Link from "next/link";

interface DataTableProps {
  transactions: ITransaction[];
  isLoading: boolean;
  total: number;
  limit: number;
  page: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  onDelete?: (id: string) => Promise<void>;
}

const DataTable = ({
  transactions,
  isLoading,
  total,
  limit,
  page,
  onPageChange,
  onLimitChange,
  onDelete,
}: DataTableProps) => {
  const totalPages = Math.ceil(total / limit);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    }
  };

  return (
    <>
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-neutral-100 dark:bg-neutral-800">
              <TableHead className="py-5">No</TableHead>
              <TableHead className="py-5">Order Code</TableHead>
              <TableHead className="py-5">Event</TableHead>
              <TableHead className="py-5">Customer</TableHead>
              <TableHead className="py-5">Petugas</TableHead>
              <TableHead className="py-5">Total</TableHead>
              <TableHead className="py-5">Status</TableHead>
              <TableHead className="py-5 w-20"></TableHead>
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
                    <Skeleton className="h-4 w-20" />
                  </TableCell>
                  <TableCell className="py-3">
                    <Skeleton className="h-4 w-32" />
                  </TableCell>
                  <TableCell className="py-3">
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell className="py-3">
                    <Skeleton className="h-4 w-20" />
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
            ) : transactions.length === 0 ? (
              <TableRow className="bg-neutral-50 dark:bg-neutral-900">
                <TableCell colSpan={7} className="text-center py-4">
                  Data tidak ditemukan.
                </TableCell>
              </TableRow>
            ) : (
              transactions.map((transaction, index) => (
                <TableRow
                  key={transaction.id ?? index}
                  className="bg-neutral-50 dark:bg-neutral-900"
                >
                  <TableCell className="py-3">
                    {(page - 1) * limit + index + 1}
                  </TableCell>
                  <TableCell className="py-3 font-medium">
                    {transaction.order_code}
                  </TableCell>
                  <TableCell className="py-3">
                    {(transaction as TransactionWithRelations).event?.title ||
                      "-"}
                  </TableCell>
                  <TableCell className="py-3">
                    {transaction.customer_name || "-"}
                  </TableCell>
                  <TableCell className="py-3">
                    {(transaction as TransactionWithRelations).users?.name ||
                      "Online"}
                  </TableCell>
                  <TableCell className="py-3">
                    {formatPrice(transaction.total_price)}
                  </TableCell>
                  <TableCell className="py-3">
                    <span
                      className={`px-2 py-1 rounded-md text-sm font-medium ${getStatusColor(
                        transaction.payment_status || "pending"
                      )}`}
                    >
                      {transaction.payment_status || "pending"}
                    </span>
                  </TableCell>
                  <TableCell className="py-3">
                    <div className="flex gap-3">
                      <Link href={`/admin/transaction/${transaction.id}`}>
                        <Eye className="text-blue-500 w-5 h-5 cursor-pointer" />
                      </Link>
                      <DeleteDialog id={transaction.id} onDelete={onDelete!} />
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
