"use client";

import { ILogin, IRegister } from "@/types/auth.types";
import { useForm } from "react-hook-form";
import { LoginService, RegisterService } from "@/service/auth.service";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const useAuth = () => {
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false);

  const loginForm = useForm<ILogin>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const registerForm = useForm<IRegister>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const handleLogin = async (values: ILogin) => {
    try {
      setIsLogin(true);

      const res = await LoginService(values);

      if (!res.status) {
        toast.error(res.message);
        return;
      }

      toast.success(res.message);
      router.push("/dashboard");
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Terjadi kesalahan");
      }
    } finally {
      setIsLogin(false);
    }
  };

  const handleRegister = async (values: IRegister) => {
    try {
      setIsRegister(true);
      const res = await RegisterService(values);

      if (!res.status) {
        toast.error(res.message);
        return;
      }

      toast.success(res.message);
      router.push("/auth/login");
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Terjadi kesalahan");
      }
    } finally {
      setIsRegister(false);
    }
  };

  return {
    isLogin,
    isRegister,
    visiblePassword,
    visibleConfirmPassword,
    setVisiblePassword,
    setVisibleConfirmPassword,
    loginForm,
    registerForm,
    handleLogin,
    handleRegister,
  };
};
