"use client";

import { Search, Printer } from "lucide-react";
import DataTable from "./table";
import { Input } from "@/components/ui/input";
import CreateDialog from "./dialog/create-dialog";
import { useState } from "react";
import { useTransaction } from "@/hooks/use-transaction";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuthContext } from "@/hooks/auth-context";

const TransactionComponent = () => {
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const {
    transactions,
    total,
    isLoading,
    createOpen,
    createForm,
    isCreate,
    handleCreate,
    handleOpenChange,
    handleDelete,
  } = useTransaction(search, limit, page);

  const { user } = useAuthContext();
  const isAdmin = user?.role === "admin";

  return (
    <>
      <div className="flex md:flex-row flex-col md:items-center gap-3 justify-between">
        <h1 className="text-3xl font-bold">Manajamen Transaksi</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
            <Input
              type="text"
              placeholder="Search"
              className="py-5 px-9"
              value={search}
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
            />
          </div>
          {isAdmin && (
            <Link href="/transaction/report">
              <Button
                variant="outline"
                className="py-5 px-4 flex items-center gap-2 text-sm"
              >
                <Printer className="w-4 h-4" />
                Cetak Laporan
              </Button>
            </Link>
          )}
          <CreateDialog
            open={createOpen}
            onOpenChange={handleOpenChange}
            form={createForm}
            onSubmit={handleCreate}
            isLoading={isCreate}
          />
        </div>
      </div>
      <div className="mt-7">
        <DataTable
          transactions={transactions}
          isLoading={isLoading}
          total={total}
          limit={limit}
          page={page}
          onPageChange={setPage}
          onLimitChange={(val: number) => {
            setLimit(val);
            setPage(1);
          }}
          onDelete={handleDelete}
        />
      </div>
    </>
  );
};
export default TransactionComponent;
