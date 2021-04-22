import { CameraPhoto } from "@capacitor/core";

export interface Receipt {
  id: string;
  date: Date;
  photo: string;
  price: number | null;
  seller: Seller;
  hasPhoto: boolean;
}

export interface Receipts {
  [key: string]: Receipt[];
}

export interface Seller {
  id: string;
  name: string;
  favorite: boolean;
}

export interface Sellers {
  [key: string]: Seller[];
}

export interface Expense {
  amount: number;
  name: string;
  type: string;
}

export interface Income {
  amount: number;
  name: string;
}

export interface Budget {
  income: Income[];
  expenses: Expense[];
}

export interface Days {
  [key: string]: number[];
}

export interface Action {
  type: string;
  payload: any;
}

export interface DynObject {
  [k: string]: any;
}

export type Ref = React.RefObject<HTMLIonInputElement>;

export type Photo = CameraPhoto;
