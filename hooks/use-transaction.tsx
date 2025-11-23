"use client";

import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  createTransaction,
  getTransactionService,
  deleteTransaction,
} from "@/service/transaction.service";
import { ITransaction } from "@/types/global";
import { toast } from "sonner";

export const useTransaction = (
  search?: string,
  limit?: number,
  page?: number
) => {
  const createForm = useForm<ITransaction>();
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);
  const [isCreate, setIsCreate] = useState(false);

  const fetchTransactions = useCallback(async () => {
    const offset = (page! - 1) * limit!;
    const res = await getTransactionService({ search, limit, offset });

    if (res.status && res.data) {
      setTransactions(res.data);
      setTotal(res.count ?? 0);
    }
    setIsLoading(false);
  }, [search, limit, page]);

  useEffect(() => {
    const loadData = async () => {
      await fetchTransactions();
    };
    loadData();
  }, [fetchTransactions]);

  const handleOpenChange = (open: boolean) => {
    setCreateOpen(open);

    if (!open) {
      createForm.reset();
    }
  };

  const handleCreate = async (payload: ITransaction) => {
    setIsCreate(true);

    const res = await createTransaction(payload);

    if (!res.status) {
      toast.error(res.message);
      setIsCreate(false);
      return;
    }
    toast.success(res.message);
    await fetchTransactions();
    setIsCreate(false);
    handleOpenChange(false);
  };

  const handleDelete = async (id: string) => {
    const res = await deleteTransaction(id);

    if (!res.status) {
      toast.error(res?.pesan || "Gagal menghapus data");
      return;
    }

    toast.success(res?.pesan);
    await fetchTransactions();
  };

  return {
    transactions,
    total,
    isLoading,
    createOpen,
    setCreateOpen,
    createForm,
    isCreate,
    handleCreate,
    handleOpenChange,
    fetchTransactions,
    handleDelete,
  };
};
