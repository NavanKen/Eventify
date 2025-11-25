"use client";

import { useStaffDashboard } from "@/hooks/use-dashboard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Ticket, Clock, CheckCircle2, TrendingUp, ArrowRight, Users } from "lucide-react";

const StaffPages = () => {
  const { stats, recentTransactions, isLoading } = useStaffDashboard();

  const statCards = [
    {
      label: "Tiket Terjual",
      value: stats?.ticketsSold ?? 0,
      icon: Ticket,
      color: "text-[var(--primary)]",
    },
    {
      label: "Transaksi Pending",
      value: stats?.pendingTransactions ?? 0,
      icon: Clock,
      color: "text-amber-600",
    },
    {
      label: "Transaksi Selesai",
      value: stats?.completedTransactions ?? 0,
      icon: CheckCircle2,
      color: "text-emerald-600",
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { bg: string; text: string }> = {
      pending: { bg: "bg-amber-100", text: "text-amber-700" },
      paid: { bg: "bg-emerald-100", text: "text-emerald-700" },
      failed: { bg: "bg-red-100", text: "text-red-700" },
      expired: { bg: "bg-gray-100", text: "text-gray-700" },
    };
    
    const style = statusMap[status.toLowerCase()] || statusMap.pending;
    
    return (
      <span className={`${style.bg} ${style.text} px-2.5 py-1 rounded-full text-xs font-medium`}>
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-8 pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-dark)] mb-1">
            Staff Dashboard
          </h1>
          <p className="text-base text-[var(--text-light)] flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Ringkasan aktivitas tiket dan transaksi
          </p>
        </div>
        <Button 
          asChild 
          className="bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white shadow-lg shadow-[var(--primary)]/25"
        >
          <Link href="/staff/transaction" className="flex items-center gap-2">
            Kelola Transaksi
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {statCards.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="bg-white rounded-[var(--radius)] border border-border/50 p-6 hover:shadow-sm transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`${item.color} p-3 bg-gray-50 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-[var(--text-dark)] mb-1">
                    {isLoading ? (
                      <span className="inline-block w-12 h-8 bg-gray-200 rounded animate-pulse"></span>
                    ) : (
                      item.value
                    )}
                  </p>
                </div>
              </div>
              <p className="text-sm font-medium text-[var(--text-light)]">
                {item.label}
              </p>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-[var(--radius)] border border-border/50 overflow-hidden shadow-sm">
        <div className="bg-gradient-to-r from-[var(--primary)]/5 to-transparent px-6 py-4 border-b border-border/50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-[var(--text-dark)] mb-1">
                Aktivitas Transaksi Terbaru
              </h2>
              <p className="text-sm text-[var(--text-light)]">
                {recentTransactions.length} transaksi terbaru
              </p>
            </div>
            <Button 
              asChild 
              size="sm" 
              variant="outline" 
              className="border-[var(--primary)]/30 text-[var(--primary)] hover:bg-[var(--primary)]/5 hover:text-[var(--primary)]"
            >
              <Link href="/staff/transaction" className="flex items-center gap-2">
                Lihat Semua
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50/50">
              <tr className="text-xs font-semibold text-[var(--text-light)] uppercase tracking-wider">
                <th className="py-4 px-6 text-left">Order ID</th>
                <th className="py-4 px-6 text-left">Event</th>
                <th className="py-4 px-6 text-left">Customer</th>
                <th className="py-4 px-6 text-right">Total</th>
                <th className="py-4 px-6 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-8 h-8 border-3 border-[var(--primary)] border-t-transparent rounded-full animate-spin"></div>
                      <p className="text-sm text-[var(--text-light)]">Memuat data...</p>
                    </div>
                  </td>
                </tr>
              ) : recentTransactions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="bg-gray-100 p-4 rounded-full">
                        <Users className="w-8 h-8 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[var(--text-dark)] mb-1">
                          Belum ada aktivitas transaksi
                        </p>
                        <p className="text-xs text-[var(--text-light)]">
                          Transaksi akan muncul di sini
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                recentTransactions.map((tx) => (
                  <tr 
                    key={tx.id} 
                    className="hover:bg-gray-50/50 transition-colors group"
                  >
                    <td className="py-4 px-6">
                      <span className="font-mono text-sm font-medium text-[var(--text-dark)] bg-gray-100 px-2.5 py-1 rounded">
                        {tx.order_code}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-sm font-medium text-[var(--text-dark)] group-hover:text-[var(--primary)] transition-colors">
                        {tx.event?.title || "-"}
                      </p>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-sm text-[var(--text-light)]">
                        {tx.users?.name || tx.customer_name || "-"}
                      </p>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <p className="text-sm font-semibold text-[var(--text-dark)]">
                        Rp {tx.total_price?.toLocaleString("id-ID")}
                      </p>
                    </td>
                    <td className="py-4 px-6 text-center">
                      {getStatusBadge(tx.payment_status)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StaffPages;