import { Action, Receipt, Sellers, Seller } from "../_helpers/types";
import { alphaSortValue, alphaSortKey } from "../_helpers/alphasort";
import { receiptConstants } from "../_constants/receiptConstants";
import { Dispatch } from "react";
import { db } from "../_helpers/firebase";

export const receiptActions = {
  getAllReceipts,
  addNewReceipt,
  deleteReceipt,
  getAllSellers,
  addNewSeller,
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
                seller: seller.data().name,
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
          seller: { id: seller.id, name: seller.name },
        };
        const updatedReceipts = [...receipts, newReceipt];
        dispatch(success(updatedReceipts));
      })
      .catch((error: Error) => {
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

function getAllSellers() {
  return (dispatch: Dispatch<Action>) => {
    const data: Sellers = {};
    db.collection("sellers")
      .orderBy("name", "asc")
      .get()
      .then((sellers) => {
        sellers.docs.map((seller) => {
          const name = seller.data().name;
          const letter = name.charAt(0).toUpperCase();
          const curSeller = { id: seller.id, name: name };

          if (data[letter]) {
            data[letter].push(curSeller);
            data[letter].sort(alphaSortValue);
          } else {
            data[letter] = [curSeller];
          }
        });
        const unsorted = Object.assign({}, data);
        dispatch(success(alphaSortKey(unsorted)));
      });
    function success(sorted: Sellers) {
      return { type: receiptConstants.GET_ALL_SELLERS, payload: sorted };
    }
  };
}

function addNewSeller(newSellerName: string, sellerOptions: Sellers) {
  return (dispatch: Dispatch<Action>) => {
    db.collection("sellers")
      .add({ name: newSellerName.toLowerCase() })
      .then((sellerRef) => {
        let sellers = { ...sellerOptions };
        const letter = newSellerName.charAt(0).toUpperCase();
        const newSeller = { id: sellerRef.id, name: newSellerName };

        if (sellers[letter]) {
          sellers[letter].push(newSeller);
          sellers[letter].sort(alphaSortValue);
        } else {
          sellers[letter] = [newSeller];
          sellers = alphaSortKey(sellers);
        }
        dispatch({ type: receiptConstants.ADD_NEW_SELLER, payload: sellers });
      })
      .catch((error) => {
        alert(error);
      });
  };
}
