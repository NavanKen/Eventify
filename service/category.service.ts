import { ICategory } from "@/types/global";
import { supabase } from "@/lib/supabase/client";
import { uploadFile } from "@/lib/helper/upload-file";
import { IGetDataParams } from "@/types/global";
import { getTimestamp } from "@/lib/helper/get-time";
import { environment } from "@/lib/config/env";

export const getCategoryService = async ({
  search = "",
  limit = 10,
  offset = 0,
}: IGetDataParams) => {
  try {
    const query = supabase
      .from("category")
      .select("*", { count: "exact" })
      .ilike("name", `%${search}%`)
      .order("updated_at", { ascending: false, nullsFirst: false })
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

export const getRandomCategories = async (limit: number = 8) => {
  try {
    const { data, error } = await supabase
      .from("category")
      .select("*")
      .limit(limit * 2);

    if (error) {
      return { status: false, error };
    }

    const shuffled = data?.sort(() => Math.random() - 0.5) || [];
    return { status: true, data: shuffled.slice(0, limit) };
  } catch (err) {
    return {
      status: false,
      message: err instanceof Error ? err.message : "Tejadi Kesalahan",
      data: null,
    };
  }
};

export const createCategory = async (payload: ICategory) => {
  try {
    const { name, description, file } = payload;

    const image = await uploadFile(file!, "category");

    const { error } = await supabase
      .from("category")
      .insert({ name, description, image });

    if (error) {
      return {
        status: false,
        message: error?.message,
      };
    }

    return {
      status: true,
      message: "Berhasil Menabah Data Category",
    };
  } catch (err) {
    return {
      status: false,
      message: err instanceof Error ? err.message : "Tejadi Kesalahan",
      data: null,
    };
  }
};

export const updateCategory = async (payload: ICategory) => {
  try {
    const { id, name, description, file } = payload;

    let image = payload.image;

    if (file) {
      image = await uploadFile(file, "category", payload.image);
    }

    const { error } = await supabase
      .from("category")
      .update({ name, description, image, updated_at: getTimestamp() })
      .eq("id", id);

    if (error) {
      return {
        status: false,
        message: error?.message,
      };
    }

    return {
      status: true,
      message: "Berhasil Mengubah Data Category",
    };
  } catch (err) {
    return {
      status: false,
      message: err instanceof Error ? err.message : "Tejadi Kesalahan",
      data: null,
    };
  }
};

export const deleteCategory = async (id: string, imageUrl?: string) => {
  try {
    if (imageUrl) {
      const oldPath = imageUrl.replace(
        `${environment.SUPABASE_URL}/storage/v1/object/public/${environment.SUPABASE_BUCKET}/`,
        ""
      );
      await supabase.storage
        .from(environment.SUPABASE_BUCKET!)
        .remove([oldPath]);
    }

    const { error } = await supabase.from("category").delete().eq("id", id);

    if (error) {
      return {
        status: false,
        pesan: error?.message,
      };
    }

    return {
      status: true,
      pesan: "Berhasil Menghapus Data Category",
    };
  } catch (err) {
    return {
      status: false,
      pesan: err instanceof Error ? err.message : "Tejadi Kesalahan",
    };
  }
};
