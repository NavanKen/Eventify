import { ITicket } from "@/types/global";
import { supabase } from "@/lib/supabase/client";
import { IGetDataParams } from "@/types/global";

export const getTicketService = async (
  eventId: string,
  { search = "", limit = 10, offset = 0 }: IGetDataParams
) => {
  try {
    const query = supabase
      .from("ticket")
      .select("*", { count: "exact" })
      .eq("event_id", eventId)
      .ilike("ticket_name", `%${search}%`)
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

export const createTicket = async (payload: ITicket) => {
  try {
    const { event_id, ticket_name, price, quota, description } = payload;

    const { error } = await supabase.from("ticket").insert({
      event_id,
      ticket_name,
      price,
      quota,
      description,
      sold: 0,
    });

    if (error) {
      return {
        status: false,
        message: error?.message,
      };
    }

    return {
      status: true,
      message: "Berhasil Menambah Data Tiket",
    };
  } catch (err) {
    return {
      status: false,
      message: err instanceof Error ? err.message : "Tejadi Kesalahan",
      data: null,
    };
  }
};

export const updateTicket = async (payload: ITicket) => {
  try {
    const { id, ticket_name, price, quota, description } = payload;

    const { error } = await supabase
      .from("ticket")
      .update({
        ticket_name,
        price,
        quota,
        description,
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
      message: "Berhasil Mengubah Data Tiket",
    };
  } catch (err) {
    return {
      status: false,
      message: err instanceof Error ? err.message : "Tejadi Kesalahan",
      data: null,
    };
  }
};

export const deleteTicket = async (id: string) => {
  try {
    const { error } = await supabase.from("ticket").delete().eq("id", id);

    if (error) {
      return {
        status: false,
        pesan: error?.message,
      };
    }

    return {
      status: true,
      pesan: "Berhasil Menghapus Data Tiket",
    };
  } catch (err) {
    return {
      status: false,
      pesan: err instanceof Error ? err.message : "Tejadi Kesalahan",
    };
  }
};
