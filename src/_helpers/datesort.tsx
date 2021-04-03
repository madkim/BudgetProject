import { Receipt, Receipts } from "./types";

export function dateSortValue(a: Receipt, b: Receipt) {
  if (new Date(a.date) > new Date(b.date)) {
    return -1;
  }
  if (new Date(a.date) < new Date(b.date)) {
    return 1;
  }
  return 0;
}

export function dateSortKey(unordered: Receipts) {
  return Object.keys(unordered)
    .sort()
    .reduce((obj: Receipts, key: string) => {
      obj[key] = unordered[key];
      return obj;
    }, {});
}
