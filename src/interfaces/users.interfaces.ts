export interface IUserRes {
  id: string;
  name: string;
  email: string;
  registered_at: Date;
  isAdmin: boolean;
}

export interface IUserEdit {
  name: string;
  email: string;
  password: string;
}
