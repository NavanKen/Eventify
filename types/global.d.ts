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
