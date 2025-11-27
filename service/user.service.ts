import { IUserManagement } from "@/types/global";
import { supabase } from "@/lib/supabase/client";
import { supabaseServiceRole } from "@/lib/supabase/admin";
import { uploadFile } from "@/lib/helper/upload-file";
import { IGetDataParams } from "@/types/global";
import { environment } from "@/lib/config/env";

export const getUserService = async ({
  search = "",
  limit = 10,
  offset = 0,
}: IGetDataParams) => {
  try {
    const query = supabase
      .from("users")
      .select("*", { count: "exact" })
      .ilike("name", `%${search}%`)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    const { data, error, count } = await query;

    if (error) {
      return { status: false, error };
    }

    return { status: true, data, count };
  } catch (err) {
    return {
      status: false,
      message: err instanceof Error ? err.message : "Tejadi Kesalahan",
      data: null,
    };
  }
};

export const createUser = async (payload: IUserManagement) => {
  try {
    const { name, email, phone, file, role, password, bio } = payload;

    let avatar = undefined;
    if (file) {
      avatar = await uploadFile(file, "avatar");
    }

    const { data: authData, error: authError } =
      await supabaseServiceRole.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
      });

    if (authError) {
      return {
        status: false,
        message: authError?.message,
      };
    }

    const { error: userError } = await supabaseServiceRole
      .from("users")
      .insert({
        id: authData.user?.id,
        name,
        email,
        phone,
        avatar,
        bio,
        role: role ?? "customer",
      });

    if (userError) {
      return {
        status: false,
        message: userError?.message,
      };
    }

    return {
      status: true,
      message: "Berhasil Menambah Data User",
    };
  } catch (err) {
    return {
      status: false,
      message: err instanceof Error ? err.message : "Tejadi Kesalahan",
      data: null,
    };
  }
};

export const updateUser = async (payload: IUserManagement) => {
  try {
    const { id, name, email, phone, file, avatar, role, bio } = payload;

    let finalAvatar = avatar;

    if (file) {
      finalAvatar = await uploadFile(file, "avatar", avatar);
    }

    const { data: currentUser } =
      await supabaseServiceRole.auth.admin.getUserById(id!);
    if (currentUser.user?.email !== email) {
      const { error: authError } =
        await supabaseServiceRole.auth.admin.updateUserById(id!, { email });

      if (authError) {
        return {
          status: false,
          message: authError?.message,
        };
      }
    }

    const { error: userError } = await supabaseServiceRole
      .from("users")
      .update({
        name,
        email,
        phone,
        avatar: finalAvatar,
        bio,
        role,
      })
      .eq("id", id);

    if (userError) {
      return {
        status: false,
        message: userError?.message,
      };
    }

    return {
      status: true,
      message: "Berhasil Mengubah Data User",
    };
  } catch (err) {
    return {
      status: false,
      message: err instanceof Error ? err.message : "Tejadi Kesalahan",
      data: null,
    };
  }
};

export const deleteUser = async (id: string, avatarUrl?: string) => {
  try {
    if (avatarUrl) {
      const oldPath = avatarUrl.replace(
        `${environment.SUPABASE_URL}/storage/v1/object/public/${environment.SUPABASE_BUCKET}/`,
        ""
      );
      await supabaseServiceRole.storage
        .from(environment.SUPABASE_BUCKET!)
        .remove([oldPath]);
    }

    const { error: userError } = await supabaseServiceRole
      .from("users")
      .delete()
      .eq("id", id);

    if (userError) {
      return {
        status: false,
        pesan: userError?.message,
      };
    }

    const { error: authError } =
      await supabaseServiceRole.auth.admin.deleteUser(id);

    if (authError) {
      return {
        status: false,
        pesan: authError?.message,
      };
    }

    return {
      status: true,
      pesan: "Berhasil Menghapus Data User",
    };
  } catch (err) {
    return {
      status: false,
      pesan: err instanceof Error ? err.message : "Tejadi Kesalahan",
    };
  }
};
