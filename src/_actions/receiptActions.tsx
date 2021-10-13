import { Action, Receipt, Seller, Photo } from "../_helpers/types";
import { receiptConstants } from "../_constants/receiptConstants";
import { receiptsService } from "../_services/receiptsService";
import { dateSortValue } from "../_helpers/datesort";
import { Dispatch } from "react";
import moment from "moment";

export const receiptActions = {
  refreshReceipts,
  getReceiptByID,
  getAllReceipts,
  addNewReceipt,
  deleteReceipt,
  updateReceipt,
  refundReceipt,
  payReceipt
};

function getReceiptByID(id: string, history: any = "") {
  return (dispatch: Dispatch<Action>) => {
    dispatch({ type: receiptConstants.GET_RECEIPT_REQUEST, payload: "" });
    receiptsService
      .getByID(id)
      .then((receipt: Receipt) => {
        dispatch(success(receipt));
        if (history) {
          history.push(`/view/${id}`);
        }
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

function getAllReceipts(month: string) {
  return (dispatch: Dispatch<Action>) => {
    dispatch({ type: receiptConstants.GET_RECEIPT_REQUEST, payload: "" });
    receiptsService
      .getAll(month)
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
      .getAll(moment().format())
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
    dispatch({ type: receiptConstants.GET_RECEIPT_REQUEST, payload: "" });
    receiptsService
      .addNew(date, photo, price, seller, receipts, dispatch)
      .then((updatedReceipts) => {
        dispatch(success(updatedReceipts.sort(dateSortValue)));
      })
      .catch((error: Error) => {
        dispatch({
          type: receiptConstants.GET_RECEIPT_REQUEST_FAILURE,
          payload: "",
        });
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

function updateReceipt(
  id: string,
  photo: Photo | undefined,
  fields: object,
  goBack: (path: string) => void
) {
  return (dispatch: Dispatch<Action>) => {
    dispatch({ type: receiptConstants.GET_RECEIPT_REQUEST, payload: "" });
    receiptsService
      .update(id, fields, photo, dispatch)
      .then((receipt) => {
        dispatch(success(receipt));
        goBack(`/view/${id}`);
      })
      .catch((error: Error) => {
        dispatch({
          type: receiptConstants.GET_RECEIPT_REQUEST_FAILURE,
          payload: "",
        });
        alert("Could not update receipt. Please try again.");
        console.error("Error updating receipt: ", error);
      });
    function success(receipt: Receipt) {
      return {
        type: receiptConstants.UPDATE_RECEIPT,
        payload: receipt,
      };
    }
  };
}

function deleteReceipt(receipt: Receipt, goBack: any) {
  return (dispatch: Dispatch<Action>) => {
    receiptsService
      .remove(receipt)
      .then((receiptId) => {
        dispatch(success(receiptId));
        if (goBack !== "") {
          goBack("/");
        } else {
          window.location.reload();
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

function refundReceipt(receipt: Receipt) {
  return (dispatch: Dispatch<Action>) => {
    receiptsService
      .refund(receipt)
      .then((receiptId) => {
        dispatch(success(receiptId));
      })
      .catch((error: Error) => {
        alert("Could not refund receipt. Please try again.");
        console.error("Error refunding receipt: ", error);
      });
    function success(receiptId: string) {
      return {
        type: receiptConstants.REFUND_RECEIPT,
        payload: receiptId,
      };
    }
  };
}

function payReceipt(receipt: Receipt) {
  return (dispatch: Dispatch<Action>) => {
    receiptsService
      .pay(receipt)
      .then((receiptId) => {
        dispatch(success(receiptId));
      })
      .catch((error: Error) => {
        alert("Could not mark receipt as paid. Please try again.");
        console.error("Error marking receipt as paied: ", error);
      });
    function success(receiptId: string) {
      return {
        type: receiptConstants.PAY_RECEIPT,
        payload: receiptId,
      };
    }
  };
}
