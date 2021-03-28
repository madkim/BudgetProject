import { receiptsConstants } from "../constants/receiptsConstants";
import { Receipts, Tag } from "../helpers/types";
import { Dispatch } from "react";
import { Action } from "../helpers/types";
import { db } from "../helpers/firebase";
import moment from "moment";

export const receiptsActions = {
  addNewReceipt,
  getAllReceipts,
  getAllTags,
  addNewTag,
};

function getAllReceipts() {
  return (dispatch: Dispatch<Action>) => {
    db.collection("receipts")
      .doc("2021")
      .collection("02")
      .get()
      .then((receipts) => {
        let data: Receipts = {
          "2021-02": [],
        };
        receipts.docs.map((doc, index) => {
          const receipt = doc.data();
          const date = moment(receipt.date.toDate());
          data["2021-02"].push({
            id: date.format(`YYYY[-]MM[_]${index}`),
            date: date.format(),
            price: receipt.price,
            tags: receipt.tags,
          });
        });
        dispatch(success(data));
      });
    function success(receipts: Receipts) {
      return {
        type: receiptsConstants.GET_ALL_RECEIPTS,
        payload: receipts,
      };
    }
  };
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

  db.collection("receipts")
    .doc("2021")
    .collection("02")
    .doc(date)
    .set({
      date: new Date(date),
      price: price,
      tags: tags,
    })
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch((error: Error) => {
      console.error("Error writing document: ", error);
    });

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
