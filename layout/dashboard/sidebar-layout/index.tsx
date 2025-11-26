"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { JSX } from "react";

export interface SidebarItem {
  key: string;
  label: string;
  href: string;
  icon: JSX.Element;
}

interface DashboardLayoutSidebarProps {
  sidebarItems: SidebarItem[];
  isOpen: boolean;
}

const DashboardLayoutSidebar = ({
  sidebarItems,
  isOpen,
}: DashboardLayoutSidebarProps) => {
  const pathname = usePathname();

  // const isActive = (href: string) => pathname === href;
  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <div
      className={cn(
        "fixed z-50 flex h-screen w-full max-w-[300px] -translate-x-full flex-col border-r border-default-200 bg-white px-4 py-6 transition-all lg:relative lg:translate-x-0",
        { "translate-x-0": isOpen }
      )}
    >
      <div>
        <div className="mb-7 p-3">
          <h1 className="font-bold text-3xl text-primary">Eventify</h1>
        </div>
        <div className="space-y-3">
          {sidebarItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all",
                isActive(item.href)
                  ? "bg-primary/10 text-primary font-semibold"
                  : "hover:bg-gray-100"
              )}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayoutSidebar;
