import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AuthSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] px-4 py-10">
      <div className="max-w-md w-full bg-white rounded-[var(--radius)] shadow-sm border border-border p-8 text-center space-y-6">
        <div className="w-14 h-14 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-2">
          <CheckCircle2 className="w-8 h-8 text-primary" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-[var(--text-dark)]">
            Account Created Successfully!
          </h1>
          <p className="text-sm text-[var(--text-light)]">
            Welcome aboard! Akun kamu sudah berhasil dibuat. Silakan cek email
            untuk verifikasi, lalu lanjut login dan jelajahi
            berbagai event menarik.
          </p>
        </div>

        <div className="flex flex-col gap-3 mt-6">
          <Button asChild className="w-full">
            <Link href="/auth/login">Go to Login Page</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/explore">Explore Events</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
