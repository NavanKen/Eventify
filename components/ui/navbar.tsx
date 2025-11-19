"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Home, LayoutGrid, Wallet } from "lucide-react";
import { Button } from "./button";

const Navbar = () => {
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
      <nav className="fixed w-full top-0 bg-white border border-b-[#E5E7EB] z-50">
        <div className="md:px-20 px-4 h-16 flex items-center justify-between">
          <div className="text-primary">
            <h2 className="font-heading text-2xl font-bold leading-tight tracking-tighter">
              Eventify
            </h2>
          </div>
          <div className="hidden md:flex md:space-x-8 text-gray-700">
            {navItems.slice(0, 4).map((nav, index) => (
              <motion.div key={index} className="relative group">
                <Link
                  className="leading-normal text-text-dark hover:text-primary text-md font-medium transition-colors duration-200 py-2 px-1 relative"
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
          <div className="flex items-center justify-center gap-2">
            <Button className="px-5 h-10 min-w-[84px] max-w-[480px] cursor-pointer bg-gray-100 text-text-dark hover:bg-gray-200 transition-colors">
              Login
            </Button>
            <Button className="px-5 h-10 min-w-[84px] max-w-[480px] cursor-pointer ">
              Register
            </Button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
