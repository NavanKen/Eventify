import { IEvent } from "@/types/global";
import { supabase } from "@/lib/supabase/client";
import { uploadFile } from "@/lib/helper/upload-file";
import { IGetDataParams } from "@/types/global";
import { environment } from "@/lib/config/env";

// Get all events for admin (published & unpublished)
export const getEventService = async ({
  search = "",
  limit = 10,
  offset = 0,
}: IGetDataParams) => {
  try {
    const query = supabase
      .from("event")
      .select("*, category(name)", { count: "exact" })
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

// Get published events for public pages (landing, explore)
export const getPublishedEvents = async ({
  search = "",
  limit = 10,
  offset = 0,
}: IGetDataParams) => {
  try {
    const query = supabase
      .from("event")
      .select("*, category(name)", { count: "exact" })
      .eq("status", "published")
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

// Get featured events (random, max 4) - published only
export const getFeaturedEvents = async (limit: number = 4) => {
  try {
    const { data, error } = await supabase
      .from("event")
      .select("*, category(name)")
      .eq("status", "published")
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

// Get latest events (max 4) - published only
export const getLatestEvents = async (limit: number = 4) => {
  try {
    const { data, error } = await supabase
      .from("event")
      .select("*, category(name)")
      .eq("status", "published")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      return { status: false, error };
    }

    return { status: true, data };
  } catch (err) {
    return {
      status: false,
      message: err instanceof Error ? err.message : "Tejadi Kesalahan",
      data: null,
    };
  }
};

export const getEventDetail = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from("event")
      .select("*, category(name)")
      .eq("id", id)
      .single();

    if (error) {
      return { status: false, error };
    }

    return { status: true, data };
  } catch (err) {
    return {
      status: false,
      message: err instanceof Error ? err.message : "Tejadi Kesalahan",
      data: null,
    };
  }
};

export const createEvent = async (payload: IEvent) => {
  try {
    const { title, description, category_id, location, start_date, end_date, file, status } = payload;

    let banner_image = undefined;
    if (file) {
      banner_image = await uploadFile(file, "events");
    }

    const { error } = await supabase.from("event").insert({
      title,
      description,
      category_id,
      location,
      start_date,
      end_date,
      banner_image,
      status: status ?? "unpublished",
    });

    if (error) {
      return {
        status: false,
        message: error?.message,
      };
    }

    return {
      status: true,
      message: "Berhasil Menambah Data Event",
    };
  } catch (err) {
    return {
      status: false,
      message: err instanceof Error ? err.message : "Tejadi Kesalahan",
      data: null,
    };
  }
};

export const updateEvent = async (payload: IEvent) => {
  try {
    const { id, title, description, category_id, location, start_date, end_date, file, banner_image, status } = payload;

    let finalBannerImage = banner_image;

    if (file) {
      finalBannerImage = await uploadFile(file, "events", banner_image);
    }

    const { error } = await supabase
      .from("event")
      .update({
        title,
        description,
        category_id,
        location,
        start_date,
        end_date,
        banner_image: finalBannerImage,
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      return {
        status: false,
        message: error?.message,
      };
    }

    return {
      status: true,
      message: "Berhasil Mengubah Data Event",
    };
  } catch (err) {
    return {
      status: false,
      message: err instanceof Error ? err.message : "Tejadi Kesalahan",
      data: null,
    };
  }
};

export const deleteEvent = async (id: string, bannerImage?: string) => {
  try {
    if (bannerImage) {
      const oldPath = bannerImage.replace(
        `${environment.SUPABASE_URL}/storage/v1/object/public/${environment.SUPABASE_BUCKET}/`,
        ""
      );
      await supabase.storage
        .from(environment.SUPABASE_BUCKET!)
        .remove([oldPath]);
    }

    // Delete related tickets first
    await supabase.from("ticket").delete().eq("event_id", id);

    const { error } = await supabase.from("event").delete().eq("id", id);

    if (error) {
      return {
        status: false,
        pesan: error?.message,
      };
    }

    return {
      status: true,
      pesan: "Berhasil Menghapus Data Event",
    };
  } catch (err) {
    return {
      status: false,
      pesan: err instanceof Error ? err.message : "Tejadi Kesalahan",
    };
  }
};
