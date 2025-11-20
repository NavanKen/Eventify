"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, Loader2, EyeOff, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";

const RegisterComponent = () => {
  const {
    isRegister,
    handleRegister,
    registerForm,
    setVisibleConfirmPassword,
    setVisiblePassword,
    visibleConfirmPassword,
    visiblePassword,
  } = useAuth();

  const { register, handleSubmit } = registerForm;

  return (
    <>
      <div className="min-h-screen w-full flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="px-7 py-7 bg-white rounded-2xl mb-4 mt-12">
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="text-center mb-4 space-y-2">
                <h1 className="text-slate-700 text-3xl font-bold">
                  Buat Akun Anda
                </h1>
                <p className="text-gray-500 text-md text-center">
                  Bergabunglah dengan kami dan pesan acara Anda berikutnya
                </p>
              </div>
              <form
                className="w-full space-y-5"
                onSubmit={handleSubmit(handleRegister)}
              >
                <div className="space-y-2">
                  <Label
                    htmlFor="username"
                    className="text-sm font-medium text-slate-700"
                  >
                    Username
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      {...register("username")}
                      id="username"
                      type="text"
                      name="username"
                      placeholder="Masukkan Username Anda"
                      className="pl-12 h-12 bg-gray-50 border-0 text-card-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-slate-700"
                  >
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      {...register("email")}
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Masukkan Alamat Email"
                      className="pl-12 h-12 bg-gray-50 border-0 text-card-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-sm font-medium text-slate-700"
                  >
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      {...register("password")}
                      id="password"
                      type={visiblePassword ? "text" : "password"}
                      name="password"
                      placeholder="Masukkan Password"
                      className="pl-12 h-12 bg-gray-50 border-0 text-card-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
                    />
                    <button
                      type="button"
                      onClick={() => setVisiblePassword(!visiblePassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                    >
                      {visiblePassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="confirm_password"
                    className="text-sm font-medium text-slate-700"
                  >
                    Konfirmasi Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      {...register("confirm_password")}
                      id="confim_password"
                      type={visibleConfirmPassword ? "text" : "password"}
                      name="confirm_password"
                      placeholder="Masukkan Password"
                      className="pl-12 h-12 bg-gray-50 border-0 text-card-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setVisibleConfirmPassword(!visibleConfirmPassword)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                    >
                      {visibleConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="mb-3">
                  <Button
                    type="submit"
                    disabled={isRegister ? true : false}
                    className="mt-3 w-full py-6 rounded-xl text-md text-neutral-100 cursor-pointer"
                  >
                    {isRegister ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                        Loading...
                      </>
                    ) : (
                      "Masuk"
                    )}
                  </Button>
                </div>
                <p className="text-center text-gray-500 text-sm">
                  Tidak Punya Akun ? {""}
                  <Link className="text-primary" href={"/auth/register"}>
                    Buat Sekarang
                  </Link>
                </p>
              </form>
            </div>
          </div>
          <Link
            href={"/"}
            className="mx-auto block w-fit mt-3 text-gray-500 text-sm"
          >
            Kembali ke Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default RegisterComponent;
