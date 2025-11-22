"use client";

import { ILogin, IRegister, IUser } from "@/types/global";
import { useForm } from "react-hook-form";
import {
  LoginService,
  RegisterService,
  GetUserService,
  LogoutService,
} from "@/service/auth.service";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export const useAuth = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false);
  const [user, setUser] = useState<IUser>({
    id: "",
    name: "",
    email: "",
    role: "",
    avatar: "",
    phone: "",
    created_at: "",
  });

  useEffect(() => {
    getProfile();
  }, []);

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
      confirm_password: "",
    },
  });

  const getProfile = async () => {
    try {
      setIsLoading(true);

      const res = await GetUserService();

      setUser(res.data?.profile ?? null);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Terjadi kesalahan");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (payload: ILogin) => {
    try {
      setIsLogin(true);

      const res = await LoginService(payload);

      if (!res.status) {
        toast.error(res.message);
        return;
      }

      toast.success(res.message);

      const user = await GetUserService();
      const role = user.data?.profile.role;

      switch (role) {
        case "admin":
          router.push("/admin");
          break;
        case "staff":
          router.push("/staff");
          break;
        default:
          router.push("/");
          break;
      }
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

  const handleRegister = async (payload: IRegister) => {
    if (payload.password !== payload.confirm_password) {
      toast.error("Password tidak sesuai");
      return;
    }

    try {
      setIsRegister(true);

      const res = await RegisterService(payload);

      if (!res.status) {
        toast.error(res.message);
        console.error(res.message);
        return;
      }

      toast.success(res.message);
      router.push("/auth/success");
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

  const handleLogout = async () => {
    try {
      const res = await LogoutService();
      if (!res.status) {
        toast.error(res.message);
        return;
      }
      toast.success(res.message);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Terjadi kesalahan");
      }
    } finally {
      router.push("/auth/login");
    }
  };

  return {
    user,
    isLogin,
    isRegister,
    isLoading,
    visiblePassword,
    visibleConfirmPassword,
    setVisiblePassword,
    setVisibleConfirmPassword,
    loginForm,
    registerForm,
    handleLogin,
    handleRegister,
    handleLogout,
  };
};
