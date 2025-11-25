"use client";

import {
  Search,
  Ticket,
  Music,
  Calendar,
  MapPin,
  Star,
  Users,
  Clock,
} from "lucide-react";
import { motion, Variants } from "framer-motion";

interface DecorativeIcon {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  size: string;
  rotate: string;
  delay: number;
  icon: "ticket" | "music" | "calendar" | "mappin" | "star" | "users" | "clock";
  hideOnMobile?: boolean;
}

const Hero: React.FC = () => {
  const ticketVariants: Variants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i: number) => ({
      opacity: 0.1,
      scale: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: "easeOut" as const,
      },
    }),
  };

  const contentVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: "easeOut" as const,
      },
    }),
  };

  const decorativeIcons: DecorativeIcon[] = [
    {
      top: "12%",
      left: "8%",
      size: "w-24 h-24",
      rotate: "rotate-12",
      delay: 0,
      icon: "ticket",
      hideOnMobile: false,
    },
    {
      top: "20%",
      right: "10%",
      size: "w-28 h-28",
      rotate: "-rotate-12",
      delay: 1,
      icon: "music",
      hideOnMobile: false,
    },
    {
      bottom: "25%",
      left: "12%",
      size: "w-20 h-20",
      rotate: "rotate-45",
      delay: 2,
      icon: "calendar",
      hideOnMobile: true,
    },
    {
      bottom: "35%",
      right: "15%",
      size: "w-26 h-26",
      rotate: "-rotate-20",
      delay: 3,
      icon: "mappin",
      hideOnMobile: false,
    },
    {
      top: "55%",
      left: "6%",
      size: "w-18 h-18",
      rotate: "rotate-30",
      delay: 4,
      icon: "star",
      hideOnMobile: true,
    },
    {
      top: "45%",
      right: "8%",
      size: "w-22 h-22",
      rotate: "-rotate-45",
      delay: 5,
      icon: "users",
      hideOnMobile: false,
    },
    {
      top: "70%",
      left: "25%",
      size: "w-16 h-16",
      rotate: "rotate-60",
      delay: 6,
      icon: "clock",
      hideOnMobile: true,
    },
    {
      bottom: "15%",
      right: "35%",
      size: "w-20 h-20",
      rotate: "-rotate-15",
      delay: 7,
      icon: "ticket",
      hideOnMobile: true,
    },
    {
      top: "35%",
      left: "30%",
      size: "w-20 h-20",
      rotate: "rotate-75",
      delay: 8,
      icon: "music",
      hideOnMobile: true,
    },
    {
      top: "65%",
      right: "30%",
      size: "w-22 h-22",
      rotate: "-rotate-30",
      delay: 9,
      icon: "star",
      hideOnMobile: true,
    },
  ];

  const getIcon = (iconType: string, className: string) => {
    switch (iconType) {
      case "ticket":
        return <Ticket className={className} />;
      case "music":
        return <Music className={className} />;
      case "calendar":
        return <Calendar className={className} />;
      case "mappin":
        return <MapPin className={className} />;
      case "star":
        return <Star className={className} />;
      case "users":
        return <Users className={className} />;
      case "clock":
        return <Clock className={className} />;
      default:
        return <Ticket className={className} />;
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center relative overflow-hidden bg-linear-to-b from-white to-gray-50">
      <div className="absolute inset-0 pointer-events-none">
        {decorativeIcons.map((item, index) => (
          <motion.div
            key={index}
            custom={item.delay}
            initial="hidden"
            animate="visible"
            variants={ticketVariants}
            className={`absolute ${item.hideOnMobile ? "hidden md:block" : ""}`}
            style={{
              top: item.top,
              left: item.left,
              right: item.right,
              bottom: item.bottom,
            }}
          >
            {getIcon(item.icon, `${item.size} text-primary ${item.rotate}`)}
          </motion.div>
        ))}
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center relative z-10">
        <div className="flex flex-col gap-6 items-center">
          <motion.h1
            custom={0}
            initial="hidden"
            animate="visible"
            variants={contentVariants}
            className="text-4xl font-popins max-w-5xl font-extrabold font-heading tracking-tighter sm:text-5xl md:text-6xl text-[#1F2937]"
          >
            Temukan Pengalaman Tak Terlupakan Anda Berikutnya.
          </motion.h1>

          <motion.h2
            custom={1}
            initial="hidden"
            animate="visible"
            variants={contentVariants}
            className="max-w-2xl text-base sm:text-lg text-[#6B7280]"
          >
            Cara termudah untuk menemukan dan membeli tiket acara langsung
            terbaik, mulai dari konser dan festival hingga olahraga dan teater.
          </motion.h2>

          <motion.div
            custom={2}
            initial="hidden"
            animate="visible"
            variants={contentVariants}
            className="w-full max-w-2xl mt-4"
          >
            <div className="flex items-center h-14 rounded-full shadow-lg shadow-primary/20 border border-gray-200 bg-white overflow-hidden">
              <div className="flex items-center justify-center pl-6 text-gray-500">
                <Search className="w-5 h-5" />
              </div>

              <input
                type="text"
                className="flex-1 h-full px-4 text-base text-gray-900 placeholder:text-gray-400 bg-transparent outline-none"
                placeholder="Search events, artists, or venues..."
              />

              <div className="pr-2.5">
                <button className="min-w-[84px] h-11 px-6 rounded-full bg-primary text-white text-base font-bold tracking-wide hover:bg-blue-500/8 transition-colors">
                  Search
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
