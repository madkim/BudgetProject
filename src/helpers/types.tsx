export interface Receipt {
  id: string;
  date: string;
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
  [key: number]: Tag[];
}
