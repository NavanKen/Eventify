"use client";

import { useEffect, useState } from "react";
import { getRandomCategories } from "@/service/category.service";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

interface ICategory {
  id: string;
  name: string;
  image?: string;
}

const CategoriesSection = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getRandomCategories(8);
      if (res.status && res.data) {
        setCategories(res.data);
      }
      setIsLoading(false);
    };
    fetchCategories();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="w-full px-4 md:px-20 py-16">
      <div className="w-full py-7 px-9 bg-white rounded-lg border border-[#E5E7EB]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="h-1 bg-[#635bff] w-full max-w-32 rounded-full mb-3" />
            <h2 className="text-xl md:text-4xl font-bold text-[#111827] mb-2">
              Event by Category
            </h2>
            {/* <p className="text-[#6b7280] text-sm md:text-base">
              Jelajahi berbagai event pilihan yang sedang berlangsung dan segera
              datang
            </p> */}
          </div>
        </div>
        {isLoading ? (
          <div className="grid auto-cols-[10rem] grid-flow-col gap-4 overflow-x-auto py-2 lg:grid-cols-8 scrollbar-hide">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="w-full h-32 rounded-lg" />
            ))}
          </div>
        ) : (
          <motion.div
            className="grid auto-cols-[10rem] grid-flow-col gap-4 overflow-x-auto py-2 lg:grid-cols-8 scrollbar-hide"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {categories.map((category) => (
              <motion.div key={category.id} variants={itemVariants}>
                <Link href={`/explore?category=${category.id}`}>
                  <div className="flex flex-col items-center gap-3 p-4 rounded-lg border transition-colors cursor-pointer h-full">
                    {category.image ? (
                      <div className="relative w-16 h-16 md:w-20 md:h-20">
                        <Image
                          src={category.image}
                          alt={category.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-300 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                        <span className="text-xs text-gray-500">No Image</span>
                      </div>
                    )}
                    <p className="text-sm font-medium text-center line-clamp-2">
                      {category.name}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default CategoriesSection;
