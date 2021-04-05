import { Action, Sellers } from "../_helpers/types";
import { sellerConstants } from "../_constants/sellerConstants";
import { sellersService } from "../_services/sellersService";
import { Dispatch } from "react";

export const sellerActions = {
  getAllSellers,
  addNewSeller,
};

function getAllSellers() {
  return (dispatch: Dispatch<Action>) => {
    sellersService
      .getAll()
      .then((sellers) => {
        dispatch(success(sellers));
      })
      .catch((error: Error) => {
        alert("Could not get sellers at this time. Please try again.");
        console.error("Error writing receipt: ", error);
      });
    function success(sellers: Sellers) {
      return { type: sellerConstants.GET_ALL_SELLERS, payload: sellers };
    }
  };
}

function addNewSeller(newSellerName: string, sellerOptions: Sellers) {
  return (dispatch: Dispatch<Action>) => {
    sellersService
      .addNew(newSellerName, sellerOptions)
      .then((sellers: Sellers) => {
        dispatch({ type: sellerConstants.ADD_NEW_SELLER, payload: sellers });
      })
      .catch((error: Error) => {
        alert("Could not create seller. Please try again.");
        console.error("Error writing seller: ", error);
      });
  };
}
