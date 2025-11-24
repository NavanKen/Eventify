"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface TransactionData {
  id: string;
  order_code: string;
  event: {
    title: string;
    start_date: string;
    location: string;
  };
  ticket: {
    ticket_name: string;
    price: number;
  };
  quantity: number;
  total_price: number;
}

export const useCheckoutSuccess = () => {
  const searchParams = useSearchParams();
  const [transactionData, setTransactionData] = useState<TransactionData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactionData = async () => {
      try {
        // Get order code from URL params
        const orderCode = searchParams.get("order");

        if (!orderCode) {
          setError("Kode pesanan tidak ditemukan");
          setIsLoading(false);
          return;
        }

        // Simulate fetching transaction data
        // TODO: Replace with actual API call
        // const res = await getTransactionByOrderCode(orderCode);
        // if (res.status) {
        //   setTransactionData(res.data);
        // } else {
        //   setError(res.message);
        // }

        const timer = setTimeout(() => {
          setTransactionData({
            id: "TRX-001",
            order_code: orderCode,
            event: {
              title: "Concert Festival 2024",
              start_date: "2024-12-15T19:00:00",
              location: "Jakarta Convention Center",
            },
            ticket: {
              ticket_name: "VIP Ticket",
              price: 500000,
            },
            quantity: 2,
            total_price: 1000000,
          });
          setIsLoading(false);
        }, 500);

        return () => clearTimeout(timer);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Terjadi kesalahan saat memuat data"
        );
        setIsLoading(false);
      }
    };

    fetchTransactionData();
  }, [searchParams]);

  // Calculate days until event
  const getDaysUntilEvent = (startDate: string): number => {
    const eventDate = new Date(startDate);
    return Math.ceil((eventDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  };

  // Format currency to Indonesian Rupiah
  const formatCurrency = (amount: number): string => {
    return amount.toLocaleString("id-ID");
  };

  // Format date to Indonesian locale
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Format time
  const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Calculate subtotal
  const calculateSubtotal = (): number => {
    if (!transactionData) return 0;
    return transactionData.ticket.price * transactionData.quantity;
  };

  return {
    transactionData,
    isLoading,
    error,
    getDaysUntilEvent,
    formatCurrency,
    formatDate,
    formatTime,
    calculateSubtotal,
  };
};
