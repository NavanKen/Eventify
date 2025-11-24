"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { LayoutDashboard, LogOut, ChevronDown } from "lucide-react";
import { IUser } from "@/types/global";

interface ProfileDropdownProps {
  user: IUser;
  isOpen: boolean;
  onToggle: () => void;
  onDashboardClick: () => void;
  onLogoutClick: () => void;
}

export default function ProfileDropdown({
  user,
  isOpen,
  onToggle,
  onDashboardClick,
  onLogoutClick,
}: ProfileDropdownProps) {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        {user.avatar ? (
          <Image
            src={user.avatar}
            alt={user.name || "User"}
            width={32}
            height={32}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold">
            {user.name?.charAt(0) || "U"}
          </div>
        )}
        <span className="text-sm font-medium hidden sm:inline">{user.name}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* User Info Card */}
            <div className="p-3 border-b border-gray-200 dark:border-gray-700">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {user.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {user.email}
              </p>
            </div>

            {/* Menu Items */}
            <div className="p-2 space-y-1">
              {/* Admin/Staff Dashboard */}
              {(user.role === "admin" || user.role === "staff") && (
                <button
                  onClick={onDashboardClick}
                  className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors"
                >
                  <LayoutDashboard size={16} />
                  Management
                </button>
              )}

              {/* Customer Dashboard */}
              {user.role === "customer" && (
                <Link
                  href="/dashboard"
                  onClick={onToggle}
                  className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors block"
                >
                  <LayoutDashboard size={16} />
                  My Dashboard
                </Link>
              )}

              <button
                onClick={onLogoutClick}
                className="w-full text-left px-3 py-2 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2 text-sm font-medium text-red-600 dark:text-red-400 transition-colors"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
