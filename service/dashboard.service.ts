import { supabase } from "@/lib/supabase/client";

export type AdminDashboardStats = {
  events: number;
  categories: number;
  ticketsSold: number;
  users: number;
  transactions: number;
  revenue: number;
};

export type StaffDashboardStats = {
  ticketsSold: number;
  pendingTransactions: number;
  completedTransactions: number;
};

export type CustomerDashboardStats = {
  upcomingEvents: number;
  ticketsOwned: number;
  pendingPayments: number;
};

export type AdminRecentTransaction = {
  id: string;
  order_code: string;
  total_price: number;
  payment_status: string;
  created_at: string;
  customer_name?: string | null;
  event: {
    title: string;
  } | null;
  users: {
    name: string;
  } | null;
};

export type StaffRecentTransaction = AdminRecentTransaction;

export type CustomerRecentTransaction = {
  id: string;
  order_code: string;
  total_price: number;
  payment_status: string;
  created_at: string;
  event: {
    title: string;
  } | null;
  ticket: {
    ticket_name: string;
  } | null;
};

type TicketSoldRow = {
  sold: number | null;
};

type TransactionTotalRow = {
  total_price: number | null;
};

type TransactionQuantityRow = {
  quantity: number | null;
};

export const getAdminDashboardStats = async (): Promise<AdminDashboardStats> => {
  const { count: eventsCount } = await supabase
    .from("event")
    .select("id", { count: "exact", head: true });

  const { count: categoriesCount } = await supabase
    .from("category")
    .select("id", { count: "exact", head: true });

  const { data: tickets } = await supabase.from("ticket").select("sold");
  const ticketRows = (tickets ?? []) as TicketSoldRow[];
  const ticketsSold = ticketRows.reduce((sum, t) => sum + (t.sold ?? 0), 0);

  const { count: usersCount } = await supabase
    .from("users")
    .select("id", { count: "exact", head: true });

  const { count: transactionsCount } = await supabase
    .from("transaction")
    .select("id", { count: "exact", head: true });

  const { data: completedTx } = await supabase
    .from("transaction")
    .select("total_price")
    .eq("payment_status", "completed");

  const completedRows = (completedTx ?? []) as unknown as TransactionTotalRow[];
  const revenue = completedRows.reduce(
    (sum, tx) => sum + (tx.total_price ?? 0),
    0
  );

  return {
    events: eventsCount || 0,
    categories: categoriesCount || 0,
    ticketsSold,
    users: usersCount || 0,
    transactions: transactionsCount || 0,
    revenue,
  };
};

export const getAdminRecentTransactions = async (): Promise<
  AdminRecentTransaction[]
> => {
  const { data } = await supabase
    .from("transaction")
    .select(
      "id, order_code, total_price, payment_status, created_at, customer_name, event(title), users(name)"
    )
    .order("created_at", { ascending: false })
    .limit(5);

  return (data ?? []) as unknown as AdminRecentTransaction[];
};

export const getStaffDashboardStats = async (): Promise<StaffDashboardStats> => {
  const { data: tickets } = await supabase.from("ticket").select("sold");
  const ticketRows = (tickets ?? []) as TicketSoldRow[];
  const ticketsSold = ticketRows.reduce((sum, t) => sum + (t.sold ?? 0), 0);

  const { count: pendingCount } = await supabase
    .from("transaction")
    .select("id", { count: "exact", head: true })
    .eq("payment_status", "pending");

  const { count: completedCount } = await supabase
    .from("transaction")
    .select("id", { count: "exact", head: true })
    .eq("payment_status", "completed");

  return {
    ticketsSold,
    pendingTransactions: pendingCount || 0,
    completedTransactions: completedCount || 0,
  };
};

export const getStaffRecentTransactions = async (): Promise<
  StaffRecentTransaction[]
> => {
  const { data } = await supabase
    .from("transaction")
    .select(
      "id, order_code, total_price, payment_status, created_at, customer_name, event(title), users(name)"
    )
    .order("created_at", { ascending: false })
    .limit(5);

  return (data ?? []) as unknown as StaffRecentTransaction[];
};

export const getCustomerDashboardStats = async (
  userId: string
): Promise<CustomerDashboardStats> => {
  const today = new Date().toISOString().split("T")[0];

  const { count: upcomingEvents } = await supabase
    .from("event")
    .select("id", { count: "exact", head: true })
    .eq("status", "published")
    .gte("start_date", today);

  const { data: completedTx } = await supabase
    .from("transaction")
    .select("quantity")
    .eq("user_id", userId)
    .eq("payment_status", "completed");

  const completedRows = (completedTx ?? []) as unknown as TransactionQuantityRow[];
  const ticketsOwned = completedRows.reduce(
    (sum, tx) => sum + (tx.quantity ?? 0),
    0
  );

  const { count: pendingPayments } = await supabase
    .from("transaction")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("payment_status", "pending");

  return {
    upcomingEvents: upcomingEvents || 0,
    ticketsOwned,
    pendingPayments: pendingPayments || 0,
  };
};

export const getCustomerRecentTransactions = async (
  userId: string
): Promise<CustomerRecentTransaction[]> => {
  const { data } = await supabase
    .from("transaction")
    .select(
      "id, order_code, total_price, payment_status, created_at, event(title), ticket(ticket_name)"
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(5);

  return (data ?? []) as unknown as CustomerRecentTransaction[];
};
