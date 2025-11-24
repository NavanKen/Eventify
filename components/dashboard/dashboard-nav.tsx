"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, History, User } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <LayoutGrid className="w-5 h-5" />,
  },
  {
    label: "Transactions",
    href: "/dashboard/transactions",
    icon: <History className="w-5 h-5" />,
  },
  {
    label: "Profile",
    href: "/dashboard/profile",
    icon: <User className="w-5 h-5" />,
  },
];

export default function DashboardNav() {
  const pathname = usePathname();

  return (
    <motion.div
      className="flex gap-2 border-b border-gray-200 dark:border-gray-700 mb-8 overflow-x-auto"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {navItems.map((item, index) => {
        const isActive =
          pathname === item.href ||
          (item.href !== "/dashboard" && pathname.startsWith(item.href));

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={item.href}>
              <button
                className={`relative flex items-center gap-2 px-6 py-4 font-medium transition-colors duration-300 whitespace-nowrap ${
                  isActive
                    ? "text-primary"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>

                {/* Active Indicator */}
                {isActive && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full"
                    layoutId="activeIndicator"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
