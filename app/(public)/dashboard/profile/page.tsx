"use client";

import { useAuthContext } from "@/hooks/auth-context";
import ProfileHeader from "@/components/dashboard/profile-header";
import DashboardNav from "@/components/dashboard/dashboard-nav";
import DashboardContent from "@/components/dashboard/dashboard-content";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { useState } from "react";
import { Mail, Phone, MapPin, Edit2, Save, X } from "lucide-react";

export default function ProfilePage() {
  const { user, isLoading, handleLogout } = useAuthContext();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  if (isLoading) {
    return (
      <div className="px-4 md:px-20 py-12">
        <Skeleton className="h-48 w-full rounded-2xl mb-8" />
        <Skeleton className="h-12 w-full rounded-lg mb-8" />
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-12 rounded-lg" />
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // TODO: Implement save logic
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
    });
    setIsEditing(false);
  };

  return (
    <div className="px-4 md:px-20 py-12">
      {/* Profile Header */}
      <ProfileHeader user={user} />

      {/* Navigation Tabs */}
      <DashboardNav />

      {/* Main Content */}
      <DashboardContent
        title="Profile Settings"
        description="Kelola informasi profil dan pengaturan akun Anda"
      >
        <div className="space-y-8">
          {/* Profile Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Personal Information
              </h3>
              {!isEditing && (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="gap-2"
                  variant="outline"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit Profile
                </Button>
              )}
            </div>

            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name
                </label>
                {isEditing ? (
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="py-5"
                  />
                ) : (
                  <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <p className="text-gray-900 dark:text-white font-medium">
                      {formData.name || "Not set"}
                    </p>
                  </div>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                {isEditing ? (
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="py-5"
                    disabled
                  />
                ) : (
                  <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <p className="text-gray-900 dark:text-white font-medium">
                      {formData.email || "Not set"}
                    </p>
                  </div>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number
                </label>
                {isEditing ? (
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    className="py-5"
                  />
                ) : (
                  <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <p className="text-gray-900 dark:text-white font-medium">
                      {formData.phone || "Not set"}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            {isEditing && (
              <motion.div
                className="flex gap-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Button
                  onClick={handleSave}
                  className="gap-2 flex-1"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="gap-2 flex-1"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </Button>
              </motion.div>
            )}
          </motion.div>

          {/* Account Settings */}
          <motion.div
            className="border-t border-gray-200 dark:border-gray-700 pt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Account Settings
            </h3>

            <div className="space-y-4">
              {/* Change Password */}
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Change Password
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Update your password regularly for security
                  </p>
                </div>
                <Button variant="outline">Change</Button>
              </div>

              {/* Two-Factor Authentication */}
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Two-Factor Authentication
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Add an extra layer of security
                  </p>
                </div>
                <Button variant="outline">Enable</Button>
              </div>

              {/* Notification Preferences */}
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Notification Preferences
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Manage your notification settings
                  </p>
                </div>
                <Button variant="outline">Manage</Button>
              </div>
            </div>
          </motion.div>

          {/* Danger Zone */}
          <motion.div
            className="border-t border-gray-200 dark:border-gray-700 pt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-6">
              Danger Zone
            </h3>

            <div className="space-y-4">
              {/* Logout */}
              <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                <div>
                  <p className="font-medium text-red-900 dark:text-red-200">
                    Logout
                  </p>
                  <p className="text-sm text-red-700 dark:text-red-300">
                    Sign out from your account
                  </p>
                </div>
                <Button
                  onClick={handleLogout}
                  variant="destructive"
                >
                  Logout
                </Button>
              </div>

              {/* Delete Account */}
              <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                <div>
                  <p className="font-medium text-red-900 dark:text-red-200">
                    Delete Account
                  </p>
                  <p className="text-sm text-red-700 dark:text-red-300">
                    Permanently delete your account and all data
                  </p>
                </div>
                <Button
                  variant="destructive"
                  className="opacity-50 cursor-not-allowed"
                  disabled
                >
                  Delete
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </DashboardContent>
    </div>
  );
}
