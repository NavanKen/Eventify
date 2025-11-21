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
