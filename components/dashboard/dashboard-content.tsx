"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface DashboardContentProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export default function DashboardContent({
  children,
  title,
  description,
}: DashboardContentProps) {
  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {title && (
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {title}
          </h2>
          {description && (
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {description}
            </p>
          )}
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200 dark:border-gray-700">
        {children}
      </div>
    </motion.div>
  );
}
