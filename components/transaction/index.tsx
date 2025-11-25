"use client";

import { Filter, Search } from "lucide-react";
import { Suspense, useState } from "react";
import OrderTable, { OrderStatusFilter } from "./order-table";
import { useAuthContext } from "@/hooks/auth-context";

const TransactionMemberComponent = () => {
  const { user } = useAuthContext();

  const [search, setSearch] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<OrderStatusFilter>("all");
  const [page, setPage] = useState<number>(1);
  const limit = 5;

  const userId = user?.id ?? "";

  const statusOptions: {
    value: OrderStatusFilter;
    label: string;
    color: string;
  }[] = [
    { value: "pending", label: "Menunggu", color: "yellow" },
    { value: "completed", label: "Selesai", color: "green" },
    { value: "cancelled", label: "Dibatalkan", color: "red" },
  ];

  return (
    <div className="px-2 pt-4 pb-24 min-h-screen w-full bg-[var(--background)]">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[var(--text-dark)] mb-2">
          Riwayat Pesanan
        </h1>
        <p className="text-[var(--text-light)]">Lacak dan kelola pesanan Anda</p>
      </div>

      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative md:flex-1 md:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-light)] w-5 h-5" />
          <input
            type="text"
            placeholder="Cari berdasarkan ID pesanan atau nama event..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full rounded-[var(--radius)] border border-border bg-[var(--background)] py-3 pl-12 pr-4 text-base text-[var(--text-dark)] placeholder:text-[var(--text-light)] outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="relative min-w-[200px]">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-light)] w-5 h-5" />
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as OrderStatusFilter);
              setPage(1);
            }}
            className="w-full rounded-[var(--radius)] border border-border bg-[var(--background)] py-3 pl-12 pr-4 text-base text-[var(--text-dark)] outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 cursor-pointer appearance-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 1rem center",
              backgroundSize: "1.25rem",
            }}
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {userId && (
        <OrderTable
          userId={userId}
          search={search}
          statusFilter={statusFilter}
          page={page}
          limit={limit}
          onPageChange={setPage}
        />
      )}
    </div>
  );
};

const TransactionMember = () => {
  return (
    <>
      <Suspense>
        <TransactionMemberComponent />
      </Suspense>
    </>
  );
};

export default TransactionMember;
