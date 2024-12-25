export type TUserRole = "user" | "admin" | "player";
export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: TUserRole;
  password: string;
}
