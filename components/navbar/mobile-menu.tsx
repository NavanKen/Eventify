"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { X, LayoutDashboard, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavItem {
  title: string;
  href: string;
}

interface IUser {
  id?: string;
  name?: string;
  email?: string;
  avatar?: string;
  role?: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  isLoggedIn: boolean;
  user?: IUser;
  onDashboardClick: () => void;
  onLogoutClick: () => void;
}

export default function MobileMenu({
  isOpen,
  onClose,
  navItems,
  isLoggedIn,
  user,
  onDashboardClick,
  onLogoutClick,
}: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* Slide Menu */}
          <motion.div
            className="fixed top-0 left-0 h-full w-80 bg-white dark:bg-gray-800 z-50 shadow-2xl md:hidden"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              duration: 0.4,
            }}
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200 dark:border-gray-700">
                <motion.span
                  className="text-2xl font-bold text-primary"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Eventify
                </motion.span>
                <button
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                  onClick={onClose}
                >
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <X size={24} className="text-gray-700 dark:text-gray-300" />
                  </motion.div>
                </button>
              </div>

              {/* User Info Card */}
              {isLoggedIn && user?.id && (
                <motion.div
                  className="mb-6 p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border border-primary/20"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <div className="flex items-center gap-3">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name || "User"}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                        {user.name?.charAt(0) || "U"}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 dark:text-white truncate">
                        {user.name || "User"}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                        {user.email || ""}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Navigation Items */}
              <nav className="space-y-2 mb-6">
                {navItems.map((nav, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * (index + 1), duration: 0.3 }}
                  >
                    <Link
                      href={nav.href}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 text-gray-700 dark:text-gray-300"
                      onClick={onClose}
                    >
                      <span className="font-medium text-base">{nav.title}</span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Auth Section */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2">
                {isLoggedIn ? (
                  <>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Button
                        onClick={onDashboardClick}
                        className="w-full justify-start gap-2"
                        variant="ghost"
                      >
                        <LayoutDashboard size={18} />
                        Dashboard
                      </Button>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <Button
                        onClick={onLogoutClick}
                        className="w-full justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                        variant="ghost"
                      >
                        <LogOut size={18} />
                        Logout
                      </Button>
                    </motion.div>
                  </>
                ) : (
                  <>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Button
                        onClick={() => {
                          window.location.href = "/auth/login";
                          onClose();
                        }}
                        className="w-full"
                        variant="outline"
                      >
                        Login
                      </Button>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <Button
                        onClick={() => {
                          window.location.href = "/auth/register";
                          onClose();
                        }}
                        className="w-full"
                      >
                        Register
                      </Button>
                    </motion.div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
