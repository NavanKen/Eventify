// Get Data Params
interface IGetDataParams {
  search?: string;
  limit?: number;
  offset?: number;
}

// Data Table

export interface IDataTableProps {
  search: string;
  limit: number;
  page: number;
  onPageChange: (page: number) => void;
  onLimitChange: (value: number) => void;
}

// Auth
export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister extends ILogin {
  username: string;
  confirm_password?: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: "customer" | string;
  created_at?: string;
}

// Category
export interface ICategory {
  id?: string;
  name: string;
  image?: string;
  file?: File | null;
  description?: string;
  created_at?: Date;
}

// Banner
export interface IBanner {
  id?: string;
  title: string;
  image_url?: string;
  file?: File | null;
  status?: boolean;
  created_at?: Date;
}

// User
export interface IUserManagement {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  file?: File | null;
  password?: string;
  role?: "customer" | "admin" | "staff" | string;
  created_at?: Date;
}

// Event
export interface IEvent {
  id?: string;
  title: string;
  description?: string;
  category_id?: string;
  location: string;
  start_date: string;
  end_date: string;
  banner_image?: string;
  file?: File | null;
  status?: "published" | "unpublished" | string;
  created_at?: Date;
  updated_at?: Date;
}

// Ticket
export interface ITicket {
  id?: string;
  event_id: string;
  ticket_name: string;
  price: number;
  quota: number;
  sold?: number;
  description?: string;
  created_at?: Date;
  updated_at?: Date;
}

// Category (for select dropdowns)
export interface ICategory {
  id: string;
  name: string;
  image?: string;
  description?: string;
  created_at?: Date;
  updated_at?: Date;
}

// Event with relations
export interface IEventWithRelations extends IEvent {
  event?: IEvent;
  category?: ICategory;
}

// Minimal types for dropdowns
export interface IEventDropdown {
  id: string;
  title: string;
}

export interface ITicketDropdown {
  id: string;
  ticket_name: string;
  price: number;
}

// Transaction
export interface ITransaction {
  id?: string;
  order_code: string;
  user_id?: string;
  event_id: string;
  ticket_id: string;
  quantity: number;
  total_price: number;
  payment_status?: "pending" | "completed" | "cancelled" | string;
  customer_name?: string;
  created_at?: Date;
  updated_at?: Date;
}

// Ticket Pass
export interface ITicketPass {
  id?: string;
  transaction_id: string;
  ticket_id: string;
  qr_code?: string;
  created_at?: Date;
  updated_at?: Date;
}

// User
export interface IUser {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  role?: string;
  created_at?: Date;
  updated_at?: Date;
}
