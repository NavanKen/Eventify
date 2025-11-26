"use client";

const footerNavigation = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Explore",
    href: "/",
  },
  {
    name: "Transaction",
    href: "/",
  },
];

import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full border-t mt-14">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-bold mb-4 leading-tight text-primary">
              Eventify
            </h1>
            <p className="text-slate-600 text-sm leading-relaxed mb-6 max-w-md">
              Eventify adalah platform yang membantu kamu menemukan berbagai
              acara menarik dengan mudah. Kamu dapat menjelajahi mulai dari
              konser, workshop, hingga kegiatan lokal. Proses pembelian tiket
              dibuat sederhana dan aman untuk memastikan pengalaman yang nyaman.
              Nikmati kemudahan menemukan dan mengikuti acara favoritmu dalam
              satu tempat.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Navigasi
            </h3>
            <div className="flex flex-col gap-3">
              {footerNavigation.map((nav, key) => (
                <Link
                  key={key}
                  href={nav.href}
                  className="text-slate-600 hover:text-primary text-sm transition-all duration-100 hover:translate-x-1 transform inline-block"
                >
                  {nav.name}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Kontak
            </h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3 text-slate-600 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 text-primary" />
                <span>Kota Malang, Jawa Timur</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600 text-sm">
                <Mail className="w-4 h-4 text-primary" />
                <span>info@event.id</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600 text-sm">
                <Phone className="w-4 h-4 text-primary" />
                <span>+62 812-3456-7890</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">
              © 2025 ApanApin. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-slate-500">
              <Link
                href="/privacy"
                className="hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-primary transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
