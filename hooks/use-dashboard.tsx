"use client";

import { useEffect, useState } from "react";
import {
  AdminDashboardStats,
  CustomerDashboardStats,
  StaffDashboardStats,
  AdminRecentTransaction,
  StaffRecentTransaction,
  CustomerRecentTransaction,
  getAdminDashboardStats,
  getAdminRecentTransactions,
  getCustomerDashboardStats,
  getCustomerRecentTransactions,
  getStaffDashboardStats,
  getStaffRecentTransactions,
} from "@/service/dashboard.service";
import { useAuthContext } from "@/hooks/auth-context";

export const useAdminDashboard = () => {
  const [stats, setStats] = useState<AdminDashboardStats | null>(null);
  const [recentTransactions, setRecentTransactions] = useState<
    AdminRecentTransaction[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [statsRes, txRes] = await Promise.all([
        getAdminDashboardStats(),
        getAdminRecentTransactions(),
      ]);
      setStats(statsRes);
      setRecentTransactions(txRes);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return { stats, recentTransactions, isLoading };
};

export const useStaffDashboard = () => {
  const [stats, setStats] = useState<StaffDashboardStats | null>(null);
  const [recentTransactions, setRecentTransactions] = useState<
    StaffRecentTransaction[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [statsRes, txRes] = await Promise.all([
        getStaffDashboardStats(),
        getStaffRecentTransactions(),
      ]);
      setStats(statsRes);
      setRecentTransactions(txRes);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return { stats, recentTransactions, isLoading };
};

export const useCustomerDashboard = () => {
  const { user } = useAuthContext();
  const [stats, setStats] = useState<CustomerDashboardStats | null>(null);
  const [recentTransactions, setRecentTransactions] = useState<
    CustomerRecentTransaction[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;

    const fetchData = async () => {
      const [statsRes, txRes] = await Promise.all([
        getCustomerDashboardStats(user.id),
        getCustomerRecentTransactions(user.id),
      ]);
      setStats(statsRes);
      setRecentTransactions(txRes);
      setIsLoading(false);
    };

    fetchData();
  }, [user?.id]);

  return { stats, recentTransactions, isLoading };
};
