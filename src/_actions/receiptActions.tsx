import { Action, Receipt, Seller, Photo } from "../_helpers/types";
import { receiptConstants } from "../_constants/receiptConstants";
import { receiptsService } from "../_services/receiptsService";
import { dateSortValue } from "../_helpers/datesort";
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
    receiptsService
      .addNew(date, photo, price, seller, receipts)
      .then((updatedReceipts) => {
        dispatch(success(updatedReceipts.sort(dateSortValue)));
      })
      .catch((error: Error) => {
        alert("Could not create receipt. Please try again.");
        console.error("Error writing receipt: ", error);
      });
  };
  function success(updatedReceipts: Receipt[]) {
    return {
      type: receiptConstants.ADD_NEW_RECEIPT,
      payload: updatedReceipts,
    };
  }
}

function deleteReceipt(receipt: Receipt) {
  return (dispatch: Dispatch<Action>) => {
    receiptsService
      .remove(receipt)
      .then((receiptId) => {
        dispatch(success(receiptId));
      })
      .catch((error: Error) => {
        alert("Could not delete receipt. Please try again.");
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
