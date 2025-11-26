import { IBanner } from "@/types/global";
import { supabase } from "@/lib/supabase/client";
import { uploadFile } from "@/lib/helper/upload-file";
import { IGetDataParams } from "@/types/global";
import { environment } from "@/lib/config/env";

export const getBannerService = async ({
  search = "",
  limit = 10,
  offset = 0,
}: IGetDataParams) => {
  try {
    const query = supabase
      .from("banner")
      .select("*", { count: "exact" })
      .ilike("title", `%${search}%`)
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

export const getRandomBanners = async (limit: number = 5) => {
  try {
    const { data, error } = await supabase
      .from("banner")
      .select("*")
      .eq("status", true)
      .limit(limit);

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

export const createBanner = async (payload: IBanner) => {
  try {
    const { title, file, status } = payload;

    const image_url = await uploadFile(file!, "banners");

    const { error } = await supabase
      .from("banner")
      .insert({ title, image_url, status: status ?? true });

    if (error) {
      return {
        status: false,
        message: error?.message,
      };
    }

    return {
      status: true,
      message: "Berhasil Menambah Data Banner",
    };
  } catch (err) {
    return {
      status: false,
      message: err instanceof Error ? err.message : "Tejadi Kesalahan",
      data: null,
    };
  }
};

export const updateBanner = async (payload: IBanner) => {
  try {
    const { id, title, file, status, image_url } = payload;

    let finalImageUrl = image_url;

    if (file) {
      finalImageUrl = await uploadFile(file, "banners", image_url);
    }

    const { error } = await supabase
      .from("banner")
      .update({ title, image_url: finalImageUrl, status })
      .eq("id", id);

    if (error) {
      return {
        status: false,
        message: error?.message,
      };
    }

    return {
      status: true,
      message: "Berhasil Mengubah Data Banner",
    };
  } catch (err) {
    return {
      status: false,
      message: err instanceof Error ? err.message : "Tejadi Kesalahan",
      data: null,
    };
  }
};

export const deleteBanner = async (id: string, imageUrl?: string) => {
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

    const { error } = await supabase.from("banner").delete().eq("id", id);

    if (error) {
      return {
        status: false,
        pesan: error?.message,
      };
    }

    return {
      status: true,
      pesan: "Berhasil Menghapus Data Banner",
    };
  } catch (err) {
    return {
      status: false,
      pesan: err instanceof Error ? err.message : "Tejadi Kesalahan",
    };
  }
};
