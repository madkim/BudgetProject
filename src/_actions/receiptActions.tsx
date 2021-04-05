import { Action, Receipt, Seller, Photo } from "../_helpers/types";
import { receiptConstants } from "../_constants/receiptConstants";
import { receiptsService } from "../_services/receiptsService";
import { dateSortValue } from "../_helpers/datesort";
import { Dispatch } from "react";

export const receiptActions = {
  refreshReceipts,
  getReceiptByID,
  getAllReceipts,
  addNewReceipt,
  deleteReceipt,
};

function getReceiptByID(id: string, history: any) {
  return (dispatch: Dispatch<Action>) => {
    dispatch({ type: receiptConstants.GET_RECEIPT_REQUEST, payload: "" });
    receiptsService
      .getByID(id)
      .then((receipt: Receipt) => {
        dispatch(success(receipt));
        history.push(`/view/${id}`);
      })
      .catch(() => {
        alert("Could not retrieve receipt at this time. Please try again.");
      });
  };
  function success(receipt: Receipt) {
    return {
      type: receiptConstants.GET_RECEIPT_BY_ID,
      payload: receipt,
    };
  }
}

function getAllReceipts() {
  return (dispatch: Dispatch<Action>) => {
    dispatch({ type: receiptConstants.GET_RECEIPT_REQUEST, payload: "" });
    receiptsService
      .getAll()
      .then((receipts) => {
        dispatch(success(receipts));
      })
      .catch(() => {
        alert("Could not retrieve receipts at this time. Please try again.");
        dispatch({
          type: receiptConstants.GET_RECEIPT_REQUEST_FAILURE,
          payload: "",
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

function refreshReceipts(e: any) {
  return (dispatch: Dispatch<Action>) => {
    receiptsService
      .getAll()
      .then((receipts) => {
        dispatch({
          type: receiptConstants.GET_ALL_RECEIPTS,
          payload: receipts,
        });
        e.detail.complete();
      })
      .catch(() => {
        alert("Could not retrieve receipts at this time. Please try again.");
        dispatch({
          type: receiptConstants.GET_RECEIPT_REQUEST_FAILURE,
          payload: "",
        });
        e.detail.complete();
      });
  };
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

function deleteReceipt(receipt: Receipt, goBack: any) {
  return (dispatch: Dispatch<Action>) => {
    receiptsService
      .remove(receipt)
      .then((receiptId) => {
        dispatch(success(receiptId));
        if (goBack !== "") {
          goBack("/");
        }
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
