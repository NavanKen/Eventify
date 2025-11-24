"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/hooks/auth-context";

export const useNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const router = useRouter();
  const { user, handleLogout } = useAuthContext();

  const safeUser = user || { id: null, role: "guest" };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleDashboardClick = () => {
    const dashboardUrl =
      safeUser?.role === "admin"
        ? "/admin"
        : safeUser?.role === "staff"
        ? "/staff"
        : "/customer";

    router.push(dashboardUrl);
    setIsProfileDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleLogoutClick = async () => {
    await handleLogout();
    setIsProfileDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { title: "Home", href: "/" },
    { title: "Explore", href: "/explore" },
  ];

  return {
    isMobileMenuOpen,
    toggleMobileMenu,
    isProfileDropdownOpen,
    toggleProfileDropdown,
    user: safeUser,
    handleDashboardClick,
    handleLogoutClick,
    navItems,
  };
};
