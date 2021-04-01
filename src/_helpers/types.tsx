export interface Receipt {
  id: string;
  date: Date;
  price: number | null;
  seller: Seller;
}

export interface Receipts {
  [key: string]: Receipt[];
}

export interface Action {
  type: string;
  payload: any;
}

export interface Seller {
  id: string;
  name: string;
}

export interface Sellers {
  [key: string]: Seller[];
}

export type Ref = React.RefObject<HTMLIonInputElement>;
