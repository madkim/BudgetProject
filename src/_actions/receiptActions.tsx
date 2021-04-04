import { Action, Receipt, Seller, Photo } from "../_helpers/types";
import { receiptConstants } from "../_constants/receiptConstants";
import { dateSortValue } from "../_helpers/datesort";
import { uploadPhoto } from "../_hooks/useTakePhoto";
import { Dispatch } from "react";
import { db } from "../_helpers/firebase";

export const receiptActions = {
  getAllReceipts,
  addNewReceipt,
  deleteReceipt,
};

function getAllReceipts() {
  return (dispatch: Dispatch<Action>) => {
    let data: Receipt[] = [];
    db.collection("receipts")
      .orderBy("date", "desc")
      .get()
      .then((receipts) => {
        const receiptsLen = receipts.docs.length;
        receipts.docs.map((receipt, index) => {
          receipt
            .data()
            .seller.get()
            .then((seller: any) => {
              data.push({
                id: receipt.id,
                date: receipt.data().date.toDate(),
                price: receipt.data().price,
                seller: { id: seller.data().id, name: seller.data().name },
              });
              return data;
            })
            .then((data: Receipt[]) => {
              if (index + 1 === receiptsLen) {
                dispatch(success(data));
              }
            });
        });
      });
  };
  function success(receipts: Receipt[]) {
    return {
      type: receiptConstants.GET_ALL_RECEIPTS,
      payload: receipts,
    };
  }
}

function addNewReceipt(
  date: Date,
  photo: Photo,
  price: number | null,
  seller: Seller,
  receipts: Receipt[]
) {
  return (dispatch: Dispatch<Action>) => {
    db.collection("receipts")
      .add({
        date: new Date(date),
        price: price,
        seller: db.collection("sellers").doc(seller.id),
      })
      .then((receiptRef) => {
        uploadPhoto(photo, receiptRef.id)
          .then(() => {
            const newReceipt = {
              id: receiptRef.id,
              date: date,
              price: price,
              seller: { id: seller.id, name: seller.name },
            };
            const updatedReceipts = [...receipts, newReceipt];
            dispatch(success(updatedReceipts.sort(dateSortValue)));
          })
          .catch((error: Error) => {
            alert(
              "There was an error creating your receipt. Please try again."
            );
            console.error("Error writing receipt: ", error);
          });
      })
      .catch((error: Error) => {
        alert("There was an error creating your receipt. Please try again.");
        console.error("Error writing receipt: ", error);
      });
    function success(updatedReceipts: Receipt[]) {
      return {
        type: receiptConstants.ADD_NEW_RECEIPT,
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
        type: receiptConstants.DELETE_RECEIPT,
        payload: receiptId,
      };
    }
  };
}
