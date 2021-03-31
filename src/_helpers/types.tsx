export interface Receipt {
  id: string;
  date: Date;
  price: number | null;
  tags: string[];
}

export interface Receipts {
  [key: string]: Receipt[];
}

export interface Action {
  type: string;
  payload: any;
}

export interface Seller {
  val: string;
  isChecked: boolean;
}

export interface Sellers {
  [key: string]: Seller[];
}

export type Ref = React.RefObject<HTMLIonInputElement>;
