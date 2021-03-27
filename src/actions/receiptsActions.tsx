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
  ];

  return { type: receiptsConstants.GET_ALL_TAGS, payload: data };
}

function addNewTag(newTag: string, tagOptions: Tag[]) {
  const tags = [...tagOptions, { val: newTag, isChecked: false }];
  return { type: receiptsConstants.ADD_NEW_TAG, payload: tags };
}
