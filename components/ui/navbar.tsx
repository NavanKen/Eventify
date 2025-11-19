"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Home, LayoutGrid, Wallet, Menu, X } from "lucide-react";
import { Button } from "./button";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  const navItems = [
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
    {
      title: "Transaction",
      href: "/transaction",
      icon: Wallet,
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
              {navItems.map((nav, index) => (
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
            </div>

            <button
              className="md:hidden p-2 text-gray-700 hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <motion.div
          initial={false}
          animate={{
            height: isMobileMenuOpen ? "auto" : 0,
            opacity: isMobileMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden bg-white border-b border-[#E5E7EB]"
        >
          <div className="px-4 py-4 space-y-3">
            {navItems.map((nav, index) => (
              <Link
                key={index}
                href={nav.href}
                className="flex items-center gap-3 py-2 px-3 text-text-dark hover:text-primary hover:bg-gray-50 rounded-lg transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <nav.icon size={20} />
                <span className="font-medium">{nav.title}</span>
              </Link>
            ))}
            <div className="pt-2 space-y-2 border-t border-gray-200">
              <Button
                onClick={() => router.push("/auth/login")}
                className="w-full h-10 cursor-pointer bg-gray-100 text-text-dark hover:bg-gray-200 transition-colors"
              >
                Login
              </Button>
              <Button
                onClick={() => router.push("/auth/register")}
                className="w-full h-10 cursor-pointer"
              >
                Register
              </Button>
            </div>
          </div>
        </motion.div>
      </nav>
    </>
  );
};

export default Navbar;
