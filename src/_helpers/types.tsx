export interface Receipt {
  id: string;
  date: Date;
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

export interface Photo {
  filepath: string;
  webviewPath?: string;
}

export interface Action {
  type: string;
  payload: any;
}

export type Ref = React.RefObject<HTMLIonInputElement>;
