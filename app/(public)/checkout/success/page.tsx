"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Download,
  Home,
  Ticket,
  Calendar,
  MapPin,
  Clock,
} from "lucide-react";
import PublicLayout from "@/layout/public-layout";
import { Skeleton } from "@/components/ui/skeleton";
import { useCheckoutSuccess } from "@/hooks/use-checkout-success";

export default function CheckoutSuccessPage() {
  const {
    transactionData,
    isLoading,
    error,
    getDaysUntilEvent,
    formatCurrency,
    formatDate,
    calculateSubtotal,
  } = useCheckoutSuccess();

  if (isLoading) {
    return (
      <PublicLayout>
        <div className="px-4 md:px-20 py-24 min-h-screen flex items-center justify-center">
          <div className="w-full max-w-2xl space-y-6">
            <Skeleton className="h-24 w-24 rounded-full mx-auto" />
            <Skeleton className="h-12 w-3/4 mx-auto" />
            <Skeleton className="h-8 w-1/2 mx-auto" />
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </PublicLayout>
    );
  }

  if (error || (!isLoading && !transactionData)) {
    return (
      <PublicLayout>
        <div className="px-4 md:px-20 py-24 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-500 text-lg mb-4">
              {error || "Tidak dapat menemukan data transaksi"}
            </p>
            <Link href="/explore">
              <Button>Kembali ke Explore</Button>
            </Link>
          </div>
        </div>
      </PublicLayout>
    );
  }

  if (!transactionData) {
    return (
      <PublicLayout>
        <div className="px-4 md:px-20 py-24 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-500 text-lg mb-4">
              Tidak dapat menemukan data transaksi
            </p>
            <Link href="/explore">
              <Button>Kembali ke Explore</Button>
            </Link>
          </div>
        </div>
      </PublicLayout>
    );
  }

  const daysUntilEvent = getDaysUntilEvent(transactionData.event.start_date);

  return (
    <PublicLayout>
      <div className="px-4 md:px-20 py-24 min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <div className="w-full max-w-2xl">
          {/* Success Animation */}
          <motion.div
            className="flex justify-center mb-8"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
          >
            <div className="relative">
              {/* Animated circles background */}
              <motion.div
                className="absolute inset-0 rounded-full bg-green-100 dark:bg-green-900/30"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-green-400"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              />

              {/* Check icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              >
                <CheckCircle className="w-24 h-24 text-green-500 relative z-10" />
              </motion.div>
            </div>
          </motion.div>

          {/* Success Message */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3">
              Pembelian Berhasil! 🎉
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
              Terima kasih telah membeli tiket event
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Tiket Anda telah dikirim ke email dan tersedia di dashboard
            </p>
          </motion.div>

          {/* Order Details Card */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 mb-8 border border-gray-200 dark:border-gray-700 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            {/* Order Code */}
            <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Kode Pesanan
              </p>
              <motion.p
                className="text-2xl font-bold text-primary font-mono"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                {transactionData.order_code}
              </motion.p>
            </div>

            {/* Event Details */}
            <div className="space-y-4 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Detail Event
              </h3>

              {/* Event Title */}
              <motion.div
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                <Ticket className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Event
                  </p>
                  <p className="text-gray-900 dark:text-white font-medium">
                    {transactionData.event.title}
                  </p>
                </div>
              </motion.div>

              {/* Date */}
              <motion.div
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.75 }}
              >
                <Calendar className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Tanggal
                  </p>
                  <p className="text-gray-900 dark:text-white font-medium">
                    {formatDate(transactionData.event.start_date)}
                  </p>
                </div>
              </motion.div>

              {/* Location */}
              <motion.div
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Lokasi
                  </p>
                  <p className="text-gray-900 dark:text-white font-medium">
                    {transactionData.event.location}
                  </p>
                </div>
              </motion.div>

              {/* Time Until Event */}
              {daysUntilEvent > 0 && (
                <motion.div
                  className="flex items-start gap-3 pt-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.85 }}
                >
                  <Clock className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Waktu Tersisa
                    </p>
                    <p className="text-gray-900 dark:text-white font-medium">
                      {daysUntilEvent} hari lagi
                    </p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Ticket Details */}
            <div className="space-y-4 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Detail Tiket
              </h3>

              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-600 dark:text-gray-400">
                    {transactionData.ticket.ticket_name} x{" "}
                    {transactionData.quantity}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    Rp {formatCurrency(transactionData.ticket.price)} / tiket
                  </p>
                </div>
                <p className="text-gray-900 dark:text-white font-semibold">
                  Rp {formatCurrency(calculateSubtotal())}
                </p>
              </div>
            </div>

            {/* Total */}
            <motion.div
              className="flex justify-between items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                Total Pembayaran
              </p>
              <p className="text-3xl font-bold text-primary">
                Rp {formatCurrency(transactionData.total_price)}
              </p>
            </motion.div>
          </motion.div>

          {/* Info Box */}
          <motion.div
            className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.5 }}
          >
            <p className="text-blue-900 dark:text-blue-200 text-sm leading-relaxed">
              <span className="font-semibold">📧 Penting:</span> Tiket Anda telah
              dikirim ke email terdaftar. Silakan cek email Anda untuk menerima
              QR code tiket. Anda juga dapat mengunduh tiket dari dashboard
              kapan saja.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <Link href="/dashboard/transactions" className="flex-1">
              <Button className="w-full gap-2 bg-primary hover:bg-primary/90 py-6 text-lg">
                <Ticket className="w-5 h-5" />
                Lihat Tiket Saya
              </Button>
            </Link>
            <Link href="/explore" className="flex-1">
              <Button
                variant="outline"
                className="w-full gap-2 py-6 text-lg"
              >
                <Home className="w-5 h-5" />
                Jelajahi Event Lain
              </Button>
            </Link>
          </motion.div>

          {/* Download Ticket Button */}
          <motion.div
            className="mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            <button className="w-full flex items-center justify-center gap-2 px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-300">
              <Download className="w-5 h-5" />
              Download Tiket sebagai PDF
            </button>
          </motion.div>
        </div>
      </div>
    </PublicLayout>
  );
}
