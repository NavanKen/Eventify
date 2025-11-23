import { ITransaction } from "@/types/global";
import { supabase } from "@/lib/supabase/client";
import { IGetDataParams } from "@/types/global";
import { GetUserService } from "./auth.service";

export const getTransactionService = async ({
  search = "",
  limit = 10,
  offset = 0,
}: IGetDataParams) => {
  try {
    const query = supabase
      .from("transaction")
      .select(
        "*, event(title), ticket(ticket_name, price), users(name, role)",
        { count: "exact" }
      )
      .ilike("order_code", `%${search}%`)
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
