"use server";

import { environment } from "@/lib/config/env";
import { supabaseServiceRole } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

interface UpdateProfilePayload {
  name?: string;
  phone?: string;
  avatar?: string;
  email?: string;
}

interface UpdatePasswordPayload {
  password: string;
}

export const getCurrentProfile = async () => {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return {
      status: false,
      message: error?.message || "User tidak ditemukan",
      data: null,
    };
  }

  const { data: profile, error: profileError } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  if (profileError) {
    return {
      status: false,
      message: profileError.message,
      data: null,
    };
  }

  return {
    status: true,
    message: "Berhasil mendapatkan profil",
    data: {
      auth: user,
      profile,
    },
  };
};

export const updateProfile = async (payload: UpdateProfilePayload) => {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return {
      status: false,
      message: error?.message || "User tidak ditemukan",
    };
  }

  const updates: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  };

  if (typeof payload.name !== "undefined") updates.name = payload.name;
  if (typeof payload.phone !== "undefined") updates.phone = payload.phone;
  if (typeof payload.avatar !== "undefined") updates.avatar = payload.avatar;
  if (typeof payload.email !== "undefined") updates.email = payload.email;

  if (Object.keys(updates).length > 1) {
    const { error: profileError } = await supabaseServiceRole
      .from("users")
      .update(updates)
      .eq("id", user.id);

    if (profileError) {
      return {
        status: false,
        message: profileError.message,
      };
    }
  }

  if (payload.email && payload.email !== user.email) {
    const { error: emailError } = await supabaseServiceRole.auth.admin.updateUserById(
      user.id,
      { email: payload.email }
    );

    if (emailError) {
      return {
        status: false,
        message: emailError.message,
      };
    }
  }

  return {
    status: true,
    message: "Profil berhasil diperbarui",
  };
};

export const updatePassword = async (payload: UpdatePasswordPayload) => {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return {
      status: false,
      message: error?.message || "User tidak ditemukan",
    };
  }

  const { error: passwordError } = await supabaseServiceRole.auth.admin.updateUserById(
    user.id,
    { password: payload.password }
  );

  if (passwordError) {
    return {
      status: false,
      message: passwordError.message,
    };
  }

  return {
    status: true,
    message: "Password berhasil diperbarui",
  };
};

export const deleteAccount = async () => {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return {
      status: false,
      message: error?.message || "User tidak ditemukan",
    };
  }

  const userId = user.id;

  const {data:userImage , error:imageError} = await supabase.from("users").select("avatar").eq("id", userId).single();

  if (imageError) {
    return {
      status: false,
      message: imageError.message,
    };
  }

  if (userImage?.avatar) {
    const oldPath = userImage.avatar.replace(
      `${environment.SUPABASE_URL}/storage/v1/object/public/eventify/`,
      ""
    );
    await supabase.storage.from(`eventify`).remove([oldPath]);
  }

  const { error: deleteProfileError } = await supabaseServiceRole
    .from("users")
    .delete()
    .eq("id", userId);

  if (deleteProfileError) {
    return {
      status: false,
      message: deleteProfileError.message,
    };
  }

  const { error: deleteAuthError } = await supabaseServiceRole.auth.admin.deleteUser(
    userId
  );

  if (deleteAuthError) {
    return {
      status: false,
      message: deleteAuthError.message,
    };
  }

  await supabase.auth.signOut();

  return {
    status: true,
    message: "Akun berhasil dihapus",
  };
};
