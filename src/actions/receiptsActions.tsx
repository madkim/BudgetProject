import { receiptsConstants } from "../constants/receiptsConstants";
import { Receipts, Tag } from "../helpers/types";
import moment from "moment";

export const receiptsActions = {
  addNewReceipt,
  getAllReceipts,
  getAllTags,
  addNewTag,
};

function getAllReceipts() {
  //do some fetching
  const data = {};

  // const data = {
  //   "2021-02": [
  //     {
  //       id: "2021-02_0",
  //       date: "2021-03-25T10:00:00-00:00",
  //       price: 14,
  //       tags: ["target"],
  //     },
  //   ],
  //   "2021-01": [
  //     {
  //       id: "2021-01_0",
  //       date: "2021-03-25T10:00:00-00:00",
  //       price: 14,
  //       tags: ["target"],
  //     },
  //     {
  //       id: "2021-01_1",
  //       date: "2021-03-25T10:00:00-00:00",
  //       price: 14,
  //       tags: ["target"],
  //     },
  //     {
  //       id: "2021-01_2",
  //       date: "2021-03-25T10:00:00-00:00",
  //       price: 14,
  //       tags: ["target"],
  //     },
  //   ],
  // };
  return { type: receiptsConstants.GET_ALL_RECEIPTS, payload: data };
}

function addNewReceipt(
  date: string,
  price: number | null,
  tags: string[],
  receipts: Receipts
) {
  let newReceipt = { id: "", date: date, price: price, tags: tags };
  let updatedReceipts = { ...receipts };

  const month = moment(newReceipt.date).format("YYYY-MM");

  if (Object.keys(receipts).includes(month)) {
    newReceipt.id = `${month}_${updatedReceipts[month].length + 1}`;
    updatedReceipts[month].push(newReceipt);
  } else {
    newReceipt.id = `${month}_${0}`;
    updatedReceipts[month] = [newReceipt];
  }
  return { type: receiptsConstants.ADD_NEW_RECEIPT, payload: updatedReceipts };
}

function getAllTags() {
  //do some fetching

  const data = [
    { val: "Target", isChecked: false },
    { val: "Walmart", isChecked: false },
    { val: "Stater Bros", isChecked: false },
    { val: "Bargain Hunt", isChecked: false },
    { val: "Ben Franklin", isChecked: false },
    { val: "Bi-Mart", isChecked: false },
    { val: "Big Lots", isChecked: false },
    { val: "BJ's Wholesale Club", isChecked: false },
    { val: "Burlington", isChecked: false },
    { val: "Christmas Tree Shops", isChecked: false },
    { val: "Costco", isChecked: false },
    { val: "Dd's Discounts", isChecked: false },
    { val: "Dirt Cheap", isChecked: false },
    { val: "Dollar General", isChecked: false },
    { val: "Dollar Tree", isChecked: false },
    { val: "Family Dollar", isChecked: false },
    { val: "Five Below", isChecked: false },
    { val: "Fred Meyer", isChecked: false },
    { val: "Gabe's", isChecked: false },
    { val: "Harbor Freight Tools", isChecked: false },
    { val: "HomeGoods", isChecked: false },
    { val: "HomeSense", isChecked: false },
    { val: "Marshalls", isChecked: false },
    { val: "Meijer", isChecked: false },
    { val: "National Stores", isChecked: false },
    { val: "Ocean State Job Lot", isChecked: false },
    { val: "Ollie's Bargain Outlet", isChecked: false },
    { val: "Renys", isChecked: false },
    { val: "Roses", isChecked: false },
    { val: "Ross Stores", isChecked: false },
    { val: "Sam's Club", isChecked: false },
    { val: "Target", isChecked: false },
    { val: "T.J. Maxx", isChecked: false },
    { val: "Treasure Hunt", isChecked: false },
    { val: "Tuesday Morning", isChecked: false },
    { val: "Walmart", isChecked: false },
  ];

  return { type: receiptsConstants.GET_ALL_TAGS, payload: data };
}

function addNewTag(newTag: string, tagOptions: Tag[]) {
  const tags = [...tagOptions, { val: newTag, isChecked: false }];
  return { type: receiptsConstants.ADD_NEW_TAG, payload: tags };
}
