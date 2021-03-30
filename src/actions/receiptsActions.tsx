import { receiptsConstants } from "../constants/receiptsConstants";
import { Receipt, Tags } from "../helpers/types";
import { alphaSortValue, alphaSortKey } from "../helpers/alphasort";
import { Dispatch } from "react";
import { Action } from "../helpers/types";
import { db } from "../helpers/firebase";

export const receiptsActions = {
  addNewReceipt,
  deleteReceipt,
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
            id: receipt.id,
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
    db.collection("receipts")
      .add({
        date: new Date(date),
        price: price,
        tags: tags,
      })
      .then((docRef) => {
        const newReceipt = {
          id: docRef.id,
          date: date,
          price: price,
          tags: tags,
        };
        const updatedReceipts = [...receipts, newReceipt];
        dispatch(success(updatedReceipts));
      })
      .catch((error: Error) => {
        console.error("Error writing receipt: ", error);
      });
    function success(updatedReceipts: Receipt[]) {
      return {
        type: receiptsConstants.ADD_NEW_RECEIPT,
        payload: updatedReceipts,
      };
    }
  };
}

function deleteReceipt(receiptId: string) {
  return (dispatch: Dispatch<Action>) => {
    db.collection("receipts")
      .doc(receiptId)
      .delete()
      .then(() => {
        console.log("Receipt successfully deleted!");
        dispatch(success(receiptId));
      })
      .catch((error) => {
        console.error("Error removing receipt: ", error);
      });
    function success(receiptId: string) {
      return {
        type: receiptsConstants.DELETE_RECEIPT,
        payload: receiptId,
      };
    }
  };
}

function getAllTags() {
  return (dispatch: Dispatch<Action>) => {
    const data: Tags = {};
    db.collection("tags")
      .orderBy("name", "asc")
      .get()
      .then((tags) => {
        tags.docs.map((tag) => {
          const letter = tag.data().name.charAt(0).toUpperCase();
          const tagData = { val: tag.data().name, isChecked: false };
          if (data[letter]) {
            data[letter].push(tagData);
            data[letter].sort(alphaSortValue);
          } else {
            data[letter] = [tagData];
          }
        });
        const unsorted = Object.assign({}, data);
        dispatch(success(alphaSortKey(unsorted)));
      });
    function success(sorted: Tags) {
      return { type: receiptsConstants.GET_ALL_TAGS, payload: sorted };
    }
  };
}

function addNewTag(newTag: string, tagOptions: Tags) {
  return (dispatch: Dispatch<Action>) => {
    db.collection("tags")
      .doc(newTag)
      .set({ name: newTag.toLowerCase() })
      .then(() => {
        let tags = { ...tagOptions };
        const letter = newTag.charAt(0).toUpperCase();
        const newTagData = { val: newTag, isChecked: false };

        if (tags[letter]) {
          tags[letter].push(newTagData);
          tags[letter].sort(alphaSortValue);
        } else {
          tags[letter] = [newTagData];
          tags = alphaSortKey(tags);
        }
        dispatch({ type: receiptsConstants.ADD_NEW_TAG, payload: tags });
      })
      .catch((error) => {
        alert(error);
      });
  };
}
