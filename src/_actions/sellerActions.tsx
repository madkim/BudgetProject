import { alphaSortValue, alphaSortKey } from "../_helpers/alphasort";
import { receiptConstants } from "../_constants/receiptConstants";
import { Action, Sellers } from "../_helpers/types";
import { Dispatch } from "react";
import { db } from "../_helpers/firebase";

export const sellerActions = {
  getAllSellers,
  addNewSeller,
};

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
