import { ITransaction } from "@/types/global";
import { supabase } from "@/lib/supabase/client";
import { IGetDataParams } from "@/types/global";
import { GetUserService } from "./auth.service";

export const getTransactionService = async ({
  search = "",
  limit = 10,
  offset = 0,
  role,
  userId,
  paymentStatus,
}: IGetDataParams & { role?: string; userId?: string; paymentStatus?: string }) => {
  try {
    let query = supabase
      .from("transaction_search_view")
      .select(
        "*, event(title), ticket(ticket_name, price), users(name, role)",
        { count: "exact" }
      );

    if (search) {
     query = query.or(
        `order_code.ilike.%${search}%,event_title.ilike.%${search}%,ticket_name.ilike.%${search}%,user_name.ilike.%${search}%`
      );
    }

    if ((role === "staff" || role === "customer") && userId) {
      query = query.eq("user_id", userId);
    }

    if (paymentStatus && paymentStatus !== "all") {
      query = query.eq("payment_status", paymentStatus);
    }

    query = query
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    const { data, error, count } = await query;

    console.log("data",data)

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

export const getTransactionDetail = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from("transaction")
      .select(
        "*, event(title, location, start_date, end_date), ticket(ticket_name, price), users(name)"
      )
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

export const getTicketPassByTransaction = async (transactionId: string) => {
  try {
    const { data, error } = await supabase
      .from("ticket_pass")
      .select("*, ticket(ticket_name)")
      .eq("transaction_id", transactionId)
      .order("created_at", { ascending: true });

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

export const createTransaction = async (payload: ITransaction) => {
  try {
    const {
      order_code,
      event_id,
      ticket_id,
      quantity,
      total_price,
      payment_status,
      customer_name,
    } = payload;

    const user = await GetUserService();

    if (!user.status) {
      return {
        status: false,
        message: user.message,
      };
    }

    const user_id = user.data?.auth.id;

    const { data: ticketRow, error: ticketError } = await supabase
      .from("ticket")
      .select("id, quota, sold")
      .eq("id", ticket_id)
      .single();

    if (ticketError || !ticketRow) {
      return {
        status: false,
        message: ticketError?.message || "Tiket tidak ditemukan",
      };
    }

    const available = (ticketRow.quota || 0) - (ticketRow.sold || 0);
    if (quantity > available) {
      return {
        status: false,
        message: `Tiket hanya tersedia ${available} buah`,
      };
    }

  
    const { data, error } = await supabase
      .from("transaction")
      .insert({
        order_code,
        user_id,
        event_id,
        ticket_id,
        quantity,
        total_price,
        payment_status: payment_status ?? "pending",
        customer_name,
      })
      .select()
      .single();

    if (error) {
      return {
        status: false,
        message: error?.message,
      };
    }

    if (data && quantity > 0) {
      const ticketPasses = Array.from({ length: quantity }).map(() => ({
        transaction_id: data.id,
        ticket_id,
        qr_code: `${data.id}-${Math.random().toString(36).substr(2, 9)}`,
      }));

      const { error: passError } = await supabase
        .from("ticket_pass")
        .insert(ticketPasses);

      if (passError) {
        return {
          status: false,
          message: passError?.message,
        };
      }

      const newSold = (ticketRow.sold || 0) + quantity;
      const { error: updateSoldError } = await supabase
        .from("ticket")
        .update({ sold: newSold, updated_at: new Date().toISOString() })
        .eq("id", ticket_id);

      if (updateSoldError) {
        return {
          status: false,
          message: updateSoldError?.message,
        };
      }
    }

    return {
      status: true,
      message: "Berhasil Membuat Transaksi",
      data,
    };
  } catch (err) {
    return {
      status: false,
      message: err instanceof Error ? err.message : "Tejadi Kesalahan",
      data: null,
    };
  }
};


export const createOnlineTransaction = async (payload: ITransaction) => {
  try {
    const {
      order_code,
      event_id,
      ticket_id,
      quantity,
      total_price,
    } = payload;

    const user = await GetUserService();

    if (!user.status) {
      return {
        status: false,
        message: user.message,
      };
    }

    const user_id = user.data?.auth.id;
    const customer_name = user.data?.profile.name;

    const { data: ticketRow, error: ticketError } = await supabase
      .from("ticket")
      .select("id, quota, sold")
      .eq("id", ticket_id)
      .single();

    if (ticketError || !ticketRow) {
      return {
        status: false,
        message: ticketError?.message || "Tiket tidak ditemukan",
      };
    }

    const available = (ticketRow.quota || 0) - (ticketRow.sold || 0);
    if (quantity > available) {
      return {
        status: false,
        message: `Tiket hanya tersedia ${available} buah`,
      };
    }


    const { data, error } = await supabase
      .from("transaction")
      .insert({
        order_code,
        user_id,
        event_id,
        ticket_id,
        quantity,
        total_price,
        payment_status: "completed",
        customer_name,
      })
      .select()
      .single();

    if (error) {
      return {
        status: false,
        message: error?.message,
      };
    }

    if (data && quantity > 0) {
      const ticketPasses = Array.from({ length: quantity }).map(() => ({
        transaction_id: data.id,
        ticket_id,
        qr_code: `${data.id}-${Math.random().toString(36).substr(2, 9)}`,
      }));

      const { error: passError } = await supabase
        .from("ticket_pass")
        .insert(ticketPasses);

      if (passError) {
        return {
          status: false,
          message: passError?.message,
        };
      }

      const newSold = (ticketRow.sold || 0) + quantity;
      const { error: updateSoldError } = await supabase
        .from("ticket")
        .update({ sold: newSold, updated_at: new Date().toISOString() })
        .eq("id", ticket_id);

      if (updateSoldError) {
        return {
          status: false,
          message: updateSoldError?.message,
        };
      }
    }

    return {
      status: true,
      message: "Berhasil Membuat Transaksi",
      data,
    };
  } catch (err) {
    return {
      status: false,
      message: err instanceof Error ? err.message : "Tejadi Kesalahan",
      data: null,
    };
  }
};

export const updateTransaction = async (payload: ITransaction) => {
  try {
    const { id, payment_status } = payload;

    const user = await GetUserService();

    if (!user.status || !user.data?.profile?.role) {
      return {
        status: false,
        message: user.message || "Tidak dapat memuat data pengguna",
      };
    }

    const role = user.data.profile.role;

    if (role !== "admin" && role !== "staff") {
      return {
        status: false,
        message: "Anda tidak memiliki izin untuk mengubah status transaksi",
      };
    }

    const { error } = await supabase
      .from("transaction")
      .update({
        payment_status,
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
      message: "Berhasil Mengubah Status Transaksi",
    };
  } catch (err) {
    return {
      status: false,
      message: err instanceof Error ? err.message : "Tejadi Kesalahan",
      data: null,
    };
  }
};

export const deleteTransaction = async (id: string) => {
  try {
    await supabase.from("ticket_pass").delete().eq("transaction_id", id);

    const { error } = await supabase.from("transaction").delete().eq("id", id);

    if (error) {
      return {
        status: false,
        pesan: error?.message,
      };
    }

    return {
      status: true,
      pesan: "Berhasil Menghapus Transaksi",
    };
  } catch (err) {
    return {
      status: false,
      pesan: err instanceof Error ? err.message : "Tejadi Kesalahan",
    };
  }
};
