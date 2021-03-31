import { Seller, Sellers } from "./types";

export function alphaSortValue(a: Seller, b: Seller) {
  if (a.val.toLowerCase() < b.val.toLowerCase()) {
    return -1;
  }
  if (a.val.toLowerCase() > b.val.toLowerCase()) {
    return 1;
  }
  return 0;
}

export function alphaSortKey(unordered: Sellers) {
  return Object.keys(unordered)
    .sort()
    .reduce((obj: Sellers, key: string) => {
      obj[key] = unordered[key];
      return obj;
    }, {});
}
