import { CameraPhoto } from "@capacitor/core";

export interface Receipt {
  id: string;
  date: Date;
  photo: string;
  price: number | null;
  seller: Seller;
}

export interface Receipts {
  [key: string]: Receipt[];
}

export interface Seller {
  id: string;
  name: string;
}

export interface Sellers {
  [key: string]: Seller[];
}

export interface Action {
  type: string;
  payload: any;
}

export type Ref = React.RefObject<HTMLIonInputElement>;

export type Photo = CameraPhoto;
