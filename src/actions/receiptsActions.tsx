import { receiptsConstants } from "../constants/receiptsConstants";
import { Receipt, Receipts, Tags, Tag } from "../helpers/types";
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
    let data: Receipt[] = [];
    db.collection("receipts")
      .orderBy("date", "desc")
      .get()
      .then((receipts) => {
        receipts.docs.map((receipt) => {
          data.push({
            date: receipt.data().date.toDate(),
            price: receipt.data().price,
            tags: receipt.data().tags,
          });
        });
        dispatch(success(data));
      });
  };
  function success(receipts: Receipt[]) {
    return {
      type: receiptsConstants.GET_ALL_RECEIPTS,
      payload: receipts,
    };
  }
}

function addNewReceipt(
  date: Date,
  price: number | null,
  tags: string[],
  receipts: Receipt[]
) {
  return (dispatch: Dispatch<Action>) => {
    const newReceipt = { date: date, price: price, tags: tags };
    const updatedReceipts = [...receipts, newReceipt];

    db.collection("receipts")
      .add({
        date: new Date(date),
        price: price,
        tags: tags,
      })
      .then(() => {
        console.log("Document successfully written!");
        dispatch(success(updatedReceipts));
      })
      .catch((error: Error) => {
        console.error("Error writing document: ", error);
      });
    function success(updatedReceipts: Receipt[]) {
      return {
        type: receiptsConstants.ADD_NEW_RECEIPT,
        payload: updatedReceipts,
      };
    }
  };
}

function getAllTags() {
  let data: Tags = {};
  db.collection("tags")
    .orderBy("name", "asc")
    .get()
    .then((tags) => {
      tags.docs.map((tag) => {
        const letter = tag.data().name.charAt(0).toUpperCase();
        const tagData = { val: tag.data().name, isChecked: false };
        if (data[letter]) {
          data[letter].push(tagData);
        } else {
          data[letter] = [tagData];
        }
      });
    });

  // const data = [
  //   { val: "Target", isChecked: false },
  //   { val: "Walmart", isChecked: false },
  //   { val: "Stater Bros", isChecked: false },
  //   { val: "Bargain Hunt", isChecked: false },
  //   { val: "Ben Franklin", isChecked: false },
  //   { val: "Bi-Mart", isChecked: false },
  //   { val: "Big Lots", isChecked: false },
  //   { val: "BJ's Wholesale Club", isChecked: false },
  //   { val: "Burlington", isChecked: false },
  //   { val: "Christmas Tree Shops", isChecked: false },
  //   { val: "Costco", isChecked: false },
  //   { val: "Dd's Discounts", isChecked: false },
  //   { val: "Dirt Cheap", isChecked: false },
  //   { val: "Dollar General", isChecked: false },
  //   { val: "Dollar Tree", isChecked: false },
  //   { val: "Family Dollar", isChecked: false },
  //   { val: "Five Below", isChecked: false },
  //   { val: "Fred Meyer", isChecked: false },
  //   { val: "Gabe's", isChecked: false },
  //   { val: "Harbor Freight Tools", isChecked: false },
  //   { val: "HomeGoods", isChecked: false },
  //   { val: "HomeSense", isChecked: false },
  //   { val: "Marshalls", isChecked: false },
  //   { val: "Meijer", isChecked: false },
  //   { val: "National Stores", isChecked: false },
  //   { val: "Ocean State Job Lot", isChecked: false },
  //   { val: "Ollie's Bargain Outlet", isChecked: false },
  //   { val: "Renys", isChecked: false },
  //   { val: "Roses", isChecked: false },
  //   { val: "Ross Stores", isChecked: false },
  //   { val: "Sam's Club", isChecked: false },
  //   { val: "Target", isChecked: false },
  //   { val: "T.J. Maxx", isChecked: false },
  //   { val: "Treasure Hunt", isChecked: false },
  //   { val: "Tuesday Morning", isChecked: false },
  //   { val: "Walmart", isChecked: false },
  // ];

  return { type: receiptsConstants.GET_ALL_TAGS, payload: data };
}

function addNewTag(newTag: string, tagOptions: Tag[]) {
  return (dispatch: Dispatch<Action>) => {
    db.collection("tags")
      .doc(newTag)
      .set({ name: newTag.toLowerCase() })
      .then(() => {
        const tags = [...tagOptions, { val: newTag, isChecked: false }];
        dispatch({ type: receiptsConstants.ADD_NEW_TAG, payload: tags });
      })
      .catch((error) => {
        alert(error);
      });
  };
}
