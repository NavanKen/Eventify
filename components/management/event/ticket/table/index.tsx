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
import { ITicket } from "@/types/global";
import { Skeleton } from "@/components/ui/skeleton";
import DeleteDialog from "../dialog/delete-dialog";
import { UseFormReturn } from "react-hook-form";
import EditDialog from "../dialog/edit-dialog";

interface DataTableProps {
  tickets: ITicket[];
  isLoading: boolean;
  total: number;
  limit: number;
  page: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  onDelete?: (id: string) => Promise<void>;
  editOpenId: string | null;
  onEditOpenChange: (open: boolean, ticketId?: string) => void;
  editForm: UseFormReturn<ITicket>;
  onEditSubmit: (data: ITicket) => Promise<void>;
  isEdit: boolean;
}

const DataTable = ({
  tickets,
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
  isEdit,
}: DataTableProps) => {
  const totalPages = Math.ceil(total / limit);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <>
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-neutral-100 dark:bg-neutral-800">
              <TableHead className="py-5">NAME</TableHead>
              <TableHead className="py-5">DESCRIPTION</TableHead>
              <TableHead className="py-5">PRICE</TableHead>
              <TableHead className="py-5">QUANTITY</TableHead>
              <TableHead className="py-5">SOLD</TableHead>
              <TableHead className="py-5 w-[100px]">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <TableRow key={i} className="bg-neutral-50 dark:bg-neutral-900">
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
                    <Skeleton className="h-4 w-16" />
                  </TableCell>
                  <TableCell className="py-3">
                    <Skeleton className="h-4 w-6" />
                  </TableCell>
                </TableRow>
              ))
            ) : tickets.length === 0 ? (
              <TableRow className="bg-neutral-50 dark:bg-neutral-900">
                <TableCell colSpan={5} className="text-center py-4">
                  Data tidak ditemukan.
                </TableCell>
              </TableRow>
            ) : (
              tickets.map((ticket) => (
                <TableRow
                  key={ticket.id}
                  className="bg-neutral-50 dark:bg-neutral-900"
                >
                  <TableCell className="py-3">{ticket.ticket_name}</TableCell>
                  <TableCell className="py-3">
                    {ticket.description || "-"}
                  </TableCell>
                  <TableCell className="py-3">
                    {formatPrice(ticket.price)}
                  </TableCell>
                  <TableCell className="py-3">{ticket.quota}</TableCell>
                  <TableCell className="py-3">{ticket.sold}</TableCell>
                  <TableCell className="py-3">
                    <div className="flex gap-3">
                      <EditDialog
                        ticket={ticket}
                        form={editForm}
                        onSubmit={onEditSubmit}
                        isLoading={isEdit}
                        open={editOpenId === ticket.id}
                        onOpenChange={(open) =>
                          onEditOpenChange(open, ticket.id)
                        }
                      />
                      <DeleteDialog id={ticket.id} onDelete={onDelete!} />
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
