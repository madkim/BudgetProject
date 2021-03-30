import { Tag, Tags } from "../helpers/types";

export function alphaSortValue(a: Tag, b: Tag) {
  if (a.val.toLowerCase() < b.val.toLowerCase()) {
    return -1;
  }
  if (a.val.toLowerCase() > b.val.toLowerCase()) {
    return 1;
  }
  return 0;
}

export function alphaSortKey(unordered: Tags) {
  return Object.keys(unordered)
    .sort()
    .reduce((obj: Tags, key: string) => {
      obj[key] = unordered[key];
      return obj;
    }, {});
}
