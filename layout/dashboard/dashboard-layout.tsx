"use client";

import { useMemo, useState, ReactNode } from "react";
import DashboardNavbar from "./navbar-layout";
import DashboardLayoutSidebar from "./sidebar-layout";
import { SIDEBAR_ADMIN, SIDEBAR_STAFF } from "@/constant/dashboard.constant";

type DashboardLayoutProps = {
  children: ReactNode;
  type: "admin" | "staff";
};

const DashboardLayout = ({ children, type }: DashboardLayoutProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const sidebarItems = useMemo(() => {
    if (type === "staff") return SIDEBAR_STAFF;
    if (type === "admin") return SIDEBAR_ADMIN;
    return [];
  }, [type]);

  return (
    <div className="flex h-screen w-full bg-gray-50">
      <DashboardLayoutSidebar sidebarItems={sidebarItems} isOpen={isOpen} />

      <div className="flex flex-col w-full">
        <DashboardNavbar toggleMenu={toggleMenu} />
        <main className="p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
