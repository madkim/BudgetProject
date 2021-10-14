import { CameraPhoto } from "@capacitor/core";

export interface Receipt {
  id: string;
  date: Date;
  photo: string;
  price: number | null;
  seller: Seller;
  hasPhoto: boolean;
  wasRefunded: boolean;
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
  id: string;
  name: string;
  type: string;
  amount: number;
}

export interface Income {
  id: string;
  name: string;
  amount: number;
}

export interface Saving {
  id: string;
  type: string;
  amount: number;
}

export interface Budget {
  month: String;
  income: Income[];
  savings: Saving;
  expenses: Expense[];
}

export interface Days {
  [key: string]: number[];
}

export interface Year {
  [month: number]: number;
}

export interface Range {
  [month: string]: number[]
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
