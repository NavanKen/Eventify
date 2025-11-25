"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Package,
  Clock,
  Truck,
  CheckCircle,
  XCircle,
  ChevronRight,
  Calendar,
} from "lucide-react";
import { getTransactionService } from "@/service/transaction.service";
import { ITransaction } from "@/types/global";

export type OrderStatusFilter =
  | "all"
  | "pending"
  | "processing"
  | "shipped"
  | "completed"
  | "cancelled";

type OrderStatus = Exclude<OrderStatusFilter, "all">;

interface IOrders {
  id: string;
  order_code: string;
  status: OrderStatus | string;
  created_at: string | Date | null;
  total_amount: number;
  event_title?: string | null;
  ticket_name?: string | null;
}

interface OrderTableProps {
  userId: string;
  search: string;
  statusFilter: OrderStatusFilter;
  page: number;
  limit: number;
  onPageChange: (page: number) => void;
}

const OrderTable = ({
  userId,
  search,
  statusFilter,
  page,
  limit,
  onPageChange,
}: OrderTableProps) => {
  const [orders, setOrders] = useState<IOrders[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const router = useRouter();

  const totalPages = Math.ceil(total / limit);

  type TransactionRow = ITransaction & {
    id: string;
    created_at: string | Date;
    event?: { title?: string | null };
    ticket?: { ticket_name?: string | null };
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case "processing":
        return <Package className="w-5 h-5 text-blue-600" />;
      case "shipped":
        return <Truck className="w-5 h-5 text-purple-600" />;
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "cancelled":
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Package className="w-5 h-5 text-gray-600" />;
    }
  };

  const fetchOrders = useCallback(async () => {
    if (!userId) return;

    setIsLoading(true);

    const offset = (page - 1) * limit;
    const paymentStatusParam: string | undefined =
      statusFilter === "all" ? undefined : statusFilter;

    const response = await getTransactionService({
      search,
      limit,
      offset,
      role: "customer",
      userId,
      paymentStatus: paymentStatusParam,
    });

    if (response.status && response.data) {
      const rows = response.data as TransactionRow[];

      const mappedOrders: IOrders[] = rows.map((row) => ({
        id: row.id,
        order_code: row.order_code,
        status: (row.payment_status as OrderStatus) ?? "pending",
        created_at: row.created_at ?? null,
        total_amount: row.total_price,
        event_title: row.event?.title ?? null,
        ticket_name: row.ticket?.ticket_name ?? null,
      }));

      setOrders(mappedOrders);
      setTotal(response.count ?? mappedOrders.length);
    } else {
      setOrders([]);
      setTotal(0);
    }

    setIsLoading(false);
  }, [userId, search, statusFilter, page, limit]);

  useEffect(() => {
    const loadData = async () => {
      await fetchOrders();
    };

    loadData();
  }, [fetchOrders]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "processing":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "shipped":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "completed":
        return "bg-green-50 text-green-700 border-green-200";
      case "cancelled":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getStatusGradient = (status: string) => {
    switch (status) {
      case "pending":
        return "from-yellow-50 to-yellow-100";
      case "processing":
        return "from-blue-50 to-blue-100";
      case "shipped":
        return "from-purple-50 to-purple-100";
      case "completed":
        return "from-green-50 to-green-100";
      case "cancelled":
        return "from-red-50 to-red-100";
      default:
        return "from-gray-50 to-gray-100";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Menunggu Konfirmasi";
      case "processing":
        return "Sedang Diproses";
      case "shipped":
        return "Dalam Pengiriman";
      case "completed":
        return "Selesai";
      case "cancelled":
        return "Dibatalkan";
      default:
        return status;
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse"
          >
            <div className="bg-linear-to-br from-gray-100 to-gray-200 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-32" />
                  <div className="h-3 bg-gray-300 rounded w-24" />
                </div>
              </div>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-200 rounded" />
                <div className="h-3 bg-gray-200 rounded flex-1" />
              </div>
              <div className="pt-3 border-t border-gray-100">
                <div className="h-6 bg-gray-200 rounded w-28 ml-auto" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        {orders.length === 0 ? (
          <div className="text-center py-16 px-4">
            <div className="w-20 h-20 bg-linear-to-br from-primary/10 to-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-[var(--text-dark)] mb-2">
              {search || statusFilter !== "all"
                ? "Tidak Ada Pesanan Ditemukan"
                : "Belum Ada Pesanan"}
            </h3>
            <p className="text-[var(--text-light)]">
              {search || statusFilter !== "all"
                ? "Coba ubah kata kunci pencarian atau filter status"
                : "Riwayat pesanan Anda akan muncul di sini"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {orders.map((order) => (
              <div
                key={order.id}
                onClick={() => router.push(`/customer/transaction/${order.id}`)}
                className="group bg-[var(--background)] rounded-[var(--radius)] shadow-sm hover:shadow-md border border-border hover:border-primary/60 transition-all duration-300 cursor-pointer overflow-hidden"
              >
                <div
                  className={`bg-linear-to-br ${getStatusGradient(
                    order.status
                  )} p-4 border-b border-border`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[var(--background)] rounded-full flex items-center justify-center shadow-sm">
                        {getStatusIcon(order.status)}
                      </div>
                      <div>
                        <p className="font-semibold text-[var(--text-dark)] text-sm">
                          #{String(order.order_code)}
                        </p>
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium border mt-1 ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {getStatusText(order.status)}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <div>
                    <p className="text-sm font-semibold text-[var(--text-dark)] line-clamp-1">
                      {order.event_title || "Event tidak tersedia"}
                    </p>
                    {order.ticket_name && (
                      <p className="text-xs text-[var(--text-light)] mt-1">
                        Tiket: {order.ticket_name}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-xs text-[var(--text-light)]">
                    <Calendar className="w-4 h-4 text-[var(--text-light)]" />
                    <span>
                      {new Date(order.created_at || "").toLocaleDateString(
                        "id-ID",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                      {" • "}
                      {new Date(order.created_at || "").toLocaleTimeString(
                        "id-ID",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-border flex items-center justify-between">
                    <span className="text-sm font-medium text-[var(--text-light)]">
                      Total Pembayaran
                    </span>
                    <div className="text-right">
                      <p className="text-xl font-bold text-primary">
                        Rp {order.total_amount.toLocaleString("id-ID")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Menampilkan {(page - 1) * limit + 1} -{" "}
            {Math.min(page * limit, total)} dari {total} pesanan
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onPageChange(Math.max(1, page - 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium text-sm text-gray-700"
            >
              Sebelumnya
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (page <= 3) {
                  pageNum = i + 1;
                } else if (page >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = page - 2 + i;
                }

                return (
                  <button
                    key={i}
                    onClick={() => onPageChange(pageNum)}
                    className={`w-10 h-10 rounded-xl font-medium text-sm transition-all ${
                      page === pageNum
                        ? "bg-linear-to-br from-primary to-primary/75 text-white shadow-lg"
                        : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => onPageChange(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium text-sm text-gray-700"
            >
              Selanjutnya
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTable;
