"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const CheckoutSuccessPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] px-4 py-10">
      <div className="max-w-xl w-full bg-white rounded-[var(--radius)] shadow-sm border border-border p-8 space-y-6">
        <div className="text-center space-y-3">
          <div className="w-14 h-14 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-primary" />
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-[var(--text-dark)]">
              Pembayaran Berhasil
            </h1>
            <p className="text-sm text-[var(--text-light)] max-w-md mx-auto">
              Detail pesanan tiket kamu telah dikirim ke alamat email terdaftar.
              Simpan Order ID di bawah ini untuk keperluan verifikasi.
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 mt-2">
          <Button asChild className="flex-1">
            <Link href="/customer/transaction">View My Tickets</Link>
          </Button>
          <Button asChild variant="outline" className="flex-1">
            <Link href="/customer">Go to Dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccessPage;
