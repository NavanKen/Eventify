import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const LoginComponent = () => {
  return (
    <>
      <div className="min-h-screen w-full flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="px-7 py-7 bg-white rounded-2xl border border-gray-200 shadow-md mb-4 mt-12">
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="mb-4 space-y-2">
                <h1 className="text-slate-700 text-3xl font-bold">
                  Selamat Datang
                </h1>
                <p className="text-gray-500 text-md text-center">
                  Masuk untuk lanjut ke akun anda
                </p>
              </div>
              <form className="w-full space-y-5">
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
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Masukkan Alamat Email"
                      //   value={credential.email}
                      //   onChange={(e) =>
                      //     setCredential({
                      //       ...credential,
                      //       email: e.target.value,
                      //     })
                      //   }
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
                      id="password"
                      type="password"
                      name="password"
                      placeholder="Masukkan Password"
                      //   value={credential.password}
                      //   onChange={(e) =>
                      //     setCredential({
                      //       ...credential,
                      //       password: e.target.value,
                      //     })
                      //   }
                      className="pl-12 h-12 bg-gray-50 border-0 text-card-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </div>
                </div>
                <div className="mb-3">
                  {/* <Button
                    type="submit"
                    disabled={isLoggingIn ? true : false}
                    className="bg-gradient-to-br from-orange-400 to-orange-600 w-full py-5 rounded-xl text-md text-neutral-100 cursor-pointer hover:bg-gradient-to-br hover:from-orange-400 hover:to-orange-600 transition duration-200"
                  >
                    {isLoggingIn ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                        Loading...
                      </>
                    ) : (
                      "Masuk"
                    )}
                  </Button> */}
                  <Button className="mt-3  w-full py-6 rounded-xl text-md text-neutral-100 cursor-pointer">
                    Masuk
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

export default LoginComponent;
