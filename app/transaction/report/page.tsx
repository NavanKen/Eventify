"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";
import { CalendarIcon, Printer, ArrowLeft, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { getTransactionService } from "@/service/transaction.service";
import { cn } from "@/lib/utils";
import type { IGetDataParams } from "@/types/global";

interface TransactionReportRow {
  id: string;
  order_code: string;
  customer_name: string | null;
  total_price: number;
  payment_status: string | null;
  created_at: string;
  event_title?: string;
  event?: {
    title: string;
  } | null;
  ticket?: {
    ticket_name: string;
    price: number;
  } | null;
}

export default function TransactionReportPage() {
  const router = useRouter();
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [data, setData] = useState<TransactionReportRow[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadData = async (params?: { startDate?: Date; endDate?: Date }) => {
    setIsLoading(true);
    const baseParams: IGetDataParams & {
      role?: string;
      userId?: string;
      paymentStatus?: string;
    } = {
      search: "",
      limit: 1000,
      offset: 0,
      paymentStatus: "all",
    };

    const res = await getTransactionService(baseParams);
    if (res.status && res.data) {
      let rows = res.data as TransactionReportRow[];
      if (params?.startDate || params?.endDate) {
        rows = rows.filter((trx) => {
          const created = new Date(trx.created_at);
          if (params.startDate && created < params.startDate) return false;
          if (params.endDate) {
            const end = new Date(params.endDate);
            end.setHours(23, 59, 59, 999);
            if (created > end) return false;
          }
          return true;
        });
      }
      setData(rows);
    } else {
      setData([]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const loadEffectData = async () => {
      await loadData();
    };
    loadEffectData();
  }, []);

  const handleFilter = () => {
    loadData({ startDate, endDate });
  };

  const handleReset = () => {
    setStartDate(undefined);
    setEndDate(undefined);
    loadData();
  };

  const formatCurrency = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDateRangeLabel = () => {
    if (!startDate && !endDate) return "Semua Tanggal";
    const start = startDate
      ? format(startDate, "dd MMM yyyy", { locale: localeId })
      : "-";
    const end = endDate
      ? format(endDate, "dd MMM yyyy", { locale: localeId })
      : "-";
    return `${start} - ${end}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <style jsx global>{`
        @media print {
          .no-print {
            display: none !important;
          }
          body {
            background: white;
            margin: 0;
            padding: 0;
          }
          .print-full-width {
            width: 100%;
            max-width: 100%;
            margin: 0;
            padding: 10px;
          }
          table {
            font-size: 10px !important;
            width: 100%;
          }
          th,
          td {
            padding: 4px 6px !important;
            font-size: 10px !important;
          }
          .print-title {
            font-size: 16px !important;
            margin-bottom: 8px;
          }
          .print-summary {
            font-size: 11px !important;
            padding: 8px 12px !important;
          }
          .overflow-x-auto {
            overflow: visible !important;
          }
          * {
            overflow: visible !important;
          }
        }
      `}</style>

      <div className="no-print bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Admin</p>
              <h1 className="text-2xl font-bold text-gray-900 mt-1">
                Laporan Transaksi Tiket
              </h1>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => router.push("/admin/transaction")}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Kembali
              </Button>
              <Button
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.print();
                  }
                }}
                className="flex items-center gap-2 bg-primary hover:bg-primary/95"
              >
                <Printer className="w-4 h-4" />
                Cetak
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6 print-full-width">
        <div className="no-print bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">
              Filter Laporan
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tanggal Mulai
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !startDate && "text-gray-500"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate
                      ? format(startDate, "dd MMMM yyyy", { locale: localeId })
                      : "Pilih tanggal mulai"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                    locale={localeId}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tanggal Selesai
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !endDate && "text-gray-500"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate
                      ? format(endDate, "dd MMMM yyyy", { locale: localeId })
                      : "Pilih tanggal selesai"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                    locale={localeId}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="flex justify-end items-center gap-3">
            <Button
              onClick={handleFilter}
              className="bg-primary hover:bg-primary/95"
            >
              Terapkan Filter
            </Button>
            <Button onClick={handleReset} variant="outline" className="px-6">
              Reset
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="hidden print:block print-title font-bold text-center pt-4">
            Laporan Transaksi Tiket
          </div>

          <div className="bg-white px-6 py-4 border-b print-summary">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Periode</p>
                <p className="text-lg font-semibold text-gray-900">
                  {formatDateRangeLabel()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Total Transaksi</p>
                <p className="text-lg font-semibold text-gray-900">
                  {data.length} transaksi
                </p>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">No</TableHead>
                  <TableHead className="font-semibold">Order Code</TableHead>
                  <TableHead className="font-semibold">Event</TableHead>
                  <TableHead className="font-semibold">Ticket</TableHead>
                  <TableHead className="font-semibold">Customer</TableHead>
                  <TableHead className="font-semibold">Tanggal</TableHead>
                  <TableHead className="font-semibold text-right">
                    Total
                  </TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-gray-500">Memuat data...</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : data.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="text-center py-8 text-gray-500"
                    >
                      Data tidak ditemukan.
                    </TableCell>
                  </TableRow>
                ) : (
                  data.map((trx: TransactionReportRow, index: number) => (
                    <TableRow key={trx.id} className="hover:bg-gray-50">
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className="font-medium">
                        {trx.order_code}
                      </TableCell>
                      <TableCell>
                        {trx.event?.title || trx.event_title || "-"}
                      </TableCell>
                      <TableCell>{trx.ticket?.ticket_name || "-"}</TableCell>
                      <TableCell>{trx.customer_name || "-"}</TableCell>
                      <TableCell>
                        {trx.created_at
                          ? format(new Date(trx.created_at), "dd MMM yyyy", {
                              locale: localeId,
                            })
                          : "-"}
                      </TableCell>
                      <TableCell className="text-right font-medium text-sm whitespace-nowrap">
                        {formatCurrency(trx.total_price)}
                      </TableCell>
                      <TableCell>
                        <span
                          className={cn(
                            "px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap",
                            trx.payment_status === "paid" ||
                              trx.payment_status === "success"
                              ? "bg-green-100 text-green-700"
                              : trx.payment_status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-gray-100 text-gray-700"
                          )}
                        >
                          {trx.payment_status || "pending"}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
