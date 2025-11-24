"use client";

import { useAuthContext } from "@/hooks/auth-context";
import ProfileHeader from "@/components/dashboard/profile-header";
import DashboardNav from "@/components/dashboard/dashboard-nav";
import DashboardContent from "@/components/dashboard/dashboard-content";
import { motion } from "framer-motion";
import { Ticket, TrendingUp, Calendar } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const { user, isLoading } = useAuthContext();

  if (isLoading) {
    return (
      <div className="px-4 md:px-20 py-12">
        <Skeleton className="h-48 w-full rounded-2xl mb-8" />
        <Skeleton className="h-12 w-full rounded-lg mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-2xl" />
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

  const statsCards = [
    {
      icon: <Ticket className="w-6 h-6" />,
      label: "Total Tickets",
      value: "12",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      label: "Upcoming Events",
      value: "5",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      label: "Total Spent",
      value: "Rp 2.5M",
      color: "from-orange-500 to-orange-600",
    },
  ];

  return (
    <div className="px-4 md:px-20 py-12">
      {/* Profile Header */}
      <ProfileHeader user={user} />

      {/* Navigation Tabs */}
      <DashboardNav />

      {/* Stats Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
      >
        {statsCards.map((card, index) => (
          <motion.div
            key={index}
            className="group relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {/* Card Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Card Content */}
            <div className="relative p-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-all duration-300 group-hover:shadow-lg group-hover:border-gray-300 dark:group-hover:border-gray-600">
              {/* Icon Container */}
              <motion.div
                className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${card.color} text-white mb-4`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {card.icon}
              </motion.div>

              {/* Content */}
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">
                {card.label}
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {card.value}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Content */}
      <DashboardContent
        title="Dashboard Overview"
        description="Kelola tiket event Anda dan lihat riwayat transaksi"
      >
        <div className="space-y-6">
          {/* Recent Transactions */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Recent Transactions
            </h3>
            <div className="space-y-3">
              {[1, 2, 3].map((item) => (
                <motion.div
                  key={item}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: item * 0.1 }}
                >
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      Concert Event #{item}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      2 tickets • Rp 500.000
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full text-sm font-medium">
                    Confirmed
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Upcoming Events
            </h3>
            <div className="space-y-3">
              {[1, 2].map((item) => (
                <motion.div
                  key={item}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/5 rounded-lg border border-primary/20 dark:border-primary/30"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (item + 3) * 0.1 }}
                >
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      Music Festival
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Dec {20 + item}, 2024
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium">
                    In {15 - item} days
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </DashboardContent>
    </div>
  );
}
