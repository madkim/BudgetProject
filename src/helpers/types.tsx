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

export interface Tag {
  val: string;
  isChecked: boolean;
}

export interface Tags {
  [key: string]: Tag[];
}

export type Ref = React.RefObject<HTMLIonInputElement>;
