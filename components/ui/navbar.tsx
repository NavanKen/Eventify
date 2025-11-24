"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Home, LayoutGrid, Menu } from "lucide-react";
import { Button } from "./button";
import { useRouter } from "next/navigation";
import { useNavbar } from "@/hooks/use-navbar";
import MobileMenu from "@/components/navbar/mobile-menu";
import ProfileDropdown from "@/components/navbar/profile-dropdown";

const Navbar = () => {
  const router = useRouter();
  const {
    isMobileMenuOpen,
    toggleMobileMenu,
    isProfileDropdownOpen,
    toggleProfileDropdown,
    user,
    handleDashboardClick,
    handleLogoutClick,
    navItems,
  } = useNavbar();

  const navItemsWithIcons = [
    {
      title: "Home",
      href: "/",
      icon: Home,
    },
    {
      title: "Explore",
      href: "/explore",
      icon: LayoutGrid,
    },
  ];

  return (
    <>
      <nav className="fixed w-full top-0 bg-white border-b border-[#E5E7EB] z-50">
        <div className="md:px-20 px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h2 className="font-heading text-primary text-2xl font-bold leading-tight tracking-tighter">
              Eventify
            </h2>
            <div className="hidden md:flex md:space-x-5 md:pt-0.5 text-gray-700">
              {navItemsWithIcons.map((nav, index) => (
                <motion.div key={index} className="relative group">
                  <Link
                    className="leading-normal text-text-dark hover:text-primary text-md font-medium transition-colors duration-200 py-2 relative inline-block"
                    href={nav.href}
                  >
                    {nav.title}
                    <motion.div
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-primary origin-left"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2">
              {user?.id ? (
                <ProfileDropdown
                  user={user}
                  isOpen={isProfileDropdownOpen}
                  onToggle={toggleProfileDropdown}
                  onDashboardClick={handleDashboardClick}
                  onLogoutClick={handleLogoutClick}
                />
              ) : (
                <>
                  <Button
                    onClick={() => router.push("/auth/login")}
                    className="px-5 h-10 min-w-[84px] max-w-[480px] cursor-pointer bg-gray-100 text-text-dark hover:bg-gray-200 transition-colors"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => router.push("/auth/register")}
                    className="px-5 h-10 min-w-[84px] max-w-[480px] cursor-pointer"
                  >
                    Register
                  </Button>
                </>
              )}
            </div>

            <button
              className="md:hidden p-2 text-gray-700 hover:text-primary transition-colors"
              onClick={toggleMobileMenu}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={toggleMobileMenu}
          navItems={navItems}
          isLoggedIn={!!user.id}
          user={user}
          onDashboardClick={handleDashboardClick}
          onLogoutClick={handleLogoutClick}
        />
      </nav>
    </>
  );
};

export default Navbar;
