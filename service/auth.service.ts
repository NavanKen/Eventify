"use server";

import { ILogin, IRegister } from "@/types/auth";
import { createClient } from "@/lib/supabase/server";

export const LoginService = async ({ email, password }: ILogin) => {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return {
        status: false,
        message: error?.message,
        data: null,
      };
    }

    return {
      status: true,
      message: "Login Berhasil",
      data: data,
    };
  } catch (err) {
    return {
      status: false,
      message: err instanceof Error ? err.message : "Tejadi Kesalahan",
      data: null,
    };
  }
};

export const RegisterService = async ({
  email,
  password,
  username,
}: IRegister) => {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      return {
        status: false,
        message: error?.message,
        data: null,
      };
    }

    const userId = data.user?.id;

    const { data: usersData, error: usersError } = await supabase
      .from("users")
      .insert({ id: userId, name: username });

    if (usersError) {
      return {
        status: false,
        message: usersError?.message,
        data: null,
      };
    }

    return {
      status: true,
      message: "Register Berhasil",
      data: usersData,
    };
  } catch (err) {
    return {
      status: false,
      message: err instanceof Error ? err.message : "Tejadi Kesalahan",
      data: null,
    };
  }
};

export const GetUserService = async () => {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      return {
        status: false,
        message: error?.message,
      };
    }

    const { data: userProfile, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("id", data.user.id)
      .single();

    if (userError) {
      return {
        status: false,
        message: userError?.message,
      };
    }
    return {
      status: true,
      message: "Berhasil Mendapatkan Data",
      data: {
        auth: data.user,
        profile: userProfile,
      },
    };
  } catch (err) {
    return {
      status: false,
      message: err instanceof Error ? err.message : "Tejadi Kesalahan",
      data: null,
    };
  }
};

export const LogoutService = async () => {
  const supabase = await createClient();
};
