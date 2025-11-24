"use client";

import { useAuthContext } from "@/hooks/auth-context";
import ProfileHeader from "@/components/dashboard/profile-header";
import DashboardNav from "@/components/dashboard/dashboard-nav";
import DashboardContent from "@/components/dashboard/dashboard-content";
import { motion } from "framer-motion";
import { Search, Filter, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { useState } from "react";

export default function TransactionsPage() {
  const { user, isLoading } = useAuthContext();
  const [searchTerm, setSearchTerm] = useState("");

  if (isLoading) {
    return (
      <div className="px-4 md:px-20 py-12">
        <Skeleton className="h-48 w-full rounded-2xl mb-8" />
        <Skeleton className="h-12 w-full rounded-lg mb-8" />
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-16 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (!user?.id) {
    return (
      <div className="px-4 md:px-20 py-12 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-500 text-lg mb-4">Please login first</p>
          <Link href="/auth/login" className="text-primary font-semibold">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  const transactions = [
    {
      id: "TRX001",
      event: "Concert Festival 2024",
      tickets: 2,
      amount: 1000000,
      status: "confirmed",
      date: "2024-11-20",
    },
    {
      id: "TRX002",
      event: "Tech Conference",
      tickets: 1,
      amount: 500000,
      status: "pending",
      date: "2024-11-18",
    },
    {
      id: "TRX003",
      event: "Workshop Design",
      tickets: 3,
      amount: 750000,
      status: "confirmed",
      date: "2024-11-15",
    },
    {
      id: "TRX004",
      event: "Seminar Marketing",
      tickets: 1,
      amount: 250000,
      status: "cancelled",
      date: "2024-11-10",
    },
    {
      id: "TRX005",
      event: "Music Festival",
      tickets: 4,
      amount: 2000000,
      status: "confirmed",
      date: "2024-11-05",
    },
  ];

  const filteredTransactions = transactions.filter(
    (t) =>
      t.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
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
    <div className="px-4 md:px-20 py-12">
      {/* Profile Header */}
      <ProfileHeader user={user} />

      {/* Navigation Tabs */}
      <DashboardNav />

      {/* Main Content */}
      <DashboardContent
        title="Transaction History"
        description="Lihat semua riwayat pembelian tiket Anda"
      >
        <div className="space-y-6">
          {/* Search and Filter */}
          <motion.div
            className="flex flex-col md:flex-row gap-4 items-center justify-between"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search by event name or transaction ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-5"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Export
              </Button>
            </div>
          </motion.div>

          {/* Transactions Table */}
          <motion.div
            className="overflow-x-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white">
                    Transaction ID
                  </th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white">
                    Event
                  </th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white">
                    Tickets
                  </th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white">
                    Amount
                  </th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white">
                    Date
                  </th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((transaction, index) => (
                    <motion.tr
                      key={transaction.id}
                      className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-300"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <td className="py-4 px-4">
                        <span className="font-medium text-primary">
                          {transaction.id}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-900 dark:text-white">
                        {transaction.event}
                      </td>
                      <td className="py-4 px-4 text-gray-900 dark:text-white">
                        {transaction.tickets} ticket
                        {transaction.tickets > 1 ? "s" : ""}
                      </td>
                      <td className="py-4 px-4 font-semibold text-gray-900 dark:text-white">
                        Rp {transaction.amount.toLocaleString("id-ID")}
                      </td>
                      <td className="py-4 px-4 text-gray-600 dark:text-gray-400">
                        {new Date(transaction.date).toLocaleDateString(
                          "id-ID"
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(
                            transaction.status
                          )}`}
                        >
                          {transaction.status}
                        </span>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-8 text-center">
                      <p className="text-gray-500 dark:text-gray-400">
                        No transactions found
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </motion.div>

          {/* Pagination */}
          {filteredTransactions.length > 0 && (
            <motion.div
              className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Showing {filteredTransactions.length} of{" "}
                {transactions.length} transactions
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </DashboardContent>
    </div>
  );
}
