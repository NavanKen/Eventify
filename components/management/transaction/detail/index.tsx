"use client";

import { useCallback, useEffect, useState } from "react";
import {
  getTransactionDetail,
  getTicketPassByTransaction,
} from "@/service/transaction.service";
import { ITransaction, ITicketPass, IEvent, ITicket } from "@/types/global";
import { Skeleton } from "@/components/ui/skeleton";
import { QRCodeSVG } from "qrcode.react";

interface TransactionWithRelations extends ITransaction {
  event?: IEvent;
  ticket?: ITicket;
}

interface TransactionDetailComponentProps {
  transactionId: string;
}

const TransactionDetailComponent = ({
  transactionId,
}: TransactionDetailComponentProps) => {
  const [transaction, setTransaction] = useState<ITransaction | null>(null);
  const [ticketPasses, setTicketPasses] = useState<ITicketPass[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    const res = await getTransactionDetail(transactionId);
    if (res.status && res.data) {
      setTransaction(res.data);

      const passRes = await getTicketPassByTransaction(transactionId);
      if (passRes.status && passRes.data) {
        setTicketPasses(passRes.data);
      }
    }
    setIsLoading(false);
  }, [transactionId]);

  useEffect(() => {
    const loadData = async () => {
      await fetchData();
    };
    loadData();
  }, [fetchData]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-900 rounded-lg border p-6">
          <div className="space-y-4">
            <Skeleton className="h-6 w-32" />
            <div className="grid grid-cols-4 gap-4">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!transaction) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">Transaksi tidak ditemukan</p>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const eventData = (transaction as TransactionWithRelations).event;
  const ticketData = (transaction as TransactionWithRelations).ticket;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div>
          <h1 className="text-3xl font-bold">Detail Transaksi</h1>
          <p className="text-gray-500">Informasi untuk transaksi spesifik</p>
        </div>
      </div>

      <div className="bg-white dark:bg-neutral-900 rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-4">Informasi Transaksi</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-gray-500">Order Code</p>
            <p className="font-semibold">{transaction.order_code}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Ticket</p>
            <p className="font-semibold">
              {ticketData?.ticket_name} (Rp{" "}
              {ticketData?.price?.toLocaleString("id-ID")}) x{" "}
              {transaction.quantity}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total</p>
            <p className="font-semibold">
              {formatPrice(transaction.total_price)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Status</p>
            <span
              className={`px-2 py-1 rounded-md text-sm font-medium inline-block ${getStatusColor(
                transaction.payment_status || "pending"
              )}`}
            >
              {transaction.payment_status || "pending"}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-neutral-900 rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-4">Detail Event</h2>
        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-500">Event</p>
            <p className="font-semibold text-lg text-pink-600">
              {eventData?.title}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Tanggal</p>
              <p className="font-semibold">
                {eventData?.start_date &&
                  new Date(eventData.start_date).toLocaleDateString(
                    "id-ID"
                  )}{" "}
                -{" "}
                {eventData?.end_date &&
                  new Date(eventData.end_date).toLocaleDateString("id-ID")}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Lokasi</p>
              <p className="font-semibold">{eventData?.location}</p>
            </div>
          </div>
          {transaction.customer_name && (
            <div>
              <p className="text-sm text-gray-500">Customer Name</p>
              <p className="font-semibold">{transaction.customer_name}</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white dark:bg-neutral-900 rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-4">
          Tiket ({ticketPasses.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ticketPasses.map((pass, index) => (
            <div key={pass.id} className="border rounded-lg p-4 text-center">
              <p className="text-sm text-gray-500 mb-3">Tiket #{index + 1}</p>
              <div className="flex justify-center mb-3">
                <QRCodeSVG
                  value={pass.qr_code || `${transactionId}-${index + 1}`}
                  size={150}
                  level="H"
                  // includeMargin={true}
                />
              </div>
              <p className="text-xs text-gray-500 break-all">{pass.qr_code}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransactionDetailComponent;
