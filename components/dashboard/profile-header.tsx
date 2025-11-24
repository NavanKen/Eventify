"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, Mail } from "lucide-react";

interface IUser {
  id?: string;
  name?: string;
  email?: string;
  avatar?: string;
  phone?: string;
  created_at?: string;
}

interface ProfileHeaderProps {
  user: IUser;
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  const joinDate = user.created_at
    ? new Date(user.created_at).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Unknown";

  return (
    <motion.div
      className="relative w-full mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header Background with Gradient */}
      <div className="relative h-48 bg-gradient-to-r from-blue-400 via-purple-500 to-orange-400 rounded-2xl overflow-hidden">
        {/* Decorative Shapes */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500 rounded-full opacity-20 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-orange-400 rounded-full opacity-20 translate-x-1/2 translate-y-1/2" />
      </div>

      {/* Profile Content */}
      <div className="px-6 md:px-12 pb-6">
        {/* Avatar and Name */}
        <div className="flex flex-col items-center -mt-20 mb-6">
          <motion.div
            className="relative mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name || "User"}
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
              />
            ) : (
              <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center">
                <span className="text-4xl font-bold text-white">
                  {user.name?.charAt(0) || "U"}
                </span>
              </div>
            )}
            {/* Online Status Indicator */}
            <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 rounded-full border-2 border-white" />
          </motion.div>

          {/* Welcome Message */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-1">
              Selamat Datang, {user.name?.split(" ")[0] || "User"}! 👋
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {user.email}
            </p>
          </motion.div>
        </div>

        {/* User Info */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
            <Mail className="w-5 h-5 text-primary" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-500">Email</p>
              <p className="font-medium text-gray-900 dark:text-white truncate">
                {user.email || "N/A"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
            <MapPin className="w-5 h-5 text-primary" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-500">Phone</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {user.phone || "Not set"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
            <Calendar className="w-5 h-5 text-primary" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                Member Since
              </p>
              <p className="font-medium text-gray-900 dark:text-white">
                {joinDate}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
