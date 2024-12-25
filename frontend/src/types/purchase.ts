import { IVendor } from "./vendor";

export interface IPurchase {
  _id: string;
  vendor: IVendor | string;
  quantity_kg: number;
  purchaseDate: string;
  createdAt: string;
  updatedAt: string;
}
