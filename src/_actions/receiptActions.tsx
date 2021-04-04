import { Action, Receipt, Seller, Photo } from "../_helpers/types";
import { receiptConstants } from "../_constants/receiptConstants";
import { receiptsService } from "../_services/receiptsService";
import { dateSortValue } from "../_helpers/datesort";
import { uploadPhoto } from "../_hooks/useTakePhoto";
import { fireStorage } from "../_helpers/firebase";
import { Dispatch } from "react";
import { db } from "../_helpers/firebase";

export const receiptActions = {
  getAllReceipts,
  addNewReceipt,
  deleteReceipt,
};

function getAllReceipts() {
  return (dispatch: Dispatch<Action>) => {
    receiptsService
      .getAll()
      .then((receipts) => {
        dispatch(success(receipts));
      })
      .catch(() => {
        alert("Could not retrieve receipts at this time. Please try again.");
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
  photo: Photo | undefined,
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
        const newReceipt = {
          id: receiptRef.id,
          date: date,
          price: price,
          photo: "",
          seller: { id: seller.id, name: seller.name },
        };

        if (photo !== undefined) {
          uploadPhoto(photo, receiptRef.id)
            .then((photoRef) => {
              newReceipt.photo = photoRef.webPath ? photoRef.webPath : "";
              return newReceipt;
            })
            .catch((error: Error) => {
              alert("Error: could not upload receipt photo.");
              console.log("addNewReceipt", error);
            });
        }
        const updatedReceipts = [...receipts, newReceipt];
        dispatch(success(updatedReceipts.sort(dateSortValue)));
      })
      .catch((error: Error) => {
        alert("Could not create receipt. Please try again.");
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
        let receiptPhoto = fireStorage.child("receipts/" + receiptId);
        receiptPhoto.delete();

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
