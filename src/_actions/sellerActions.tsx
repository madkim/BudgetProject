import { Dispatch, SetStateAction } from "react";
import { Action, Sellers, Seller } from "../_helpers/types";
import { sellerConstants } from "../_constants/sellerConstants";
import { sellersService } from "../_services/sellersService";

export const sellerActions = {
  setFavoriteSeller,
  getSellerByID,
  getAllSellers,
  addNewSeller,
  deleteSeller,
  renameSeller,
};

function setFavoriteSeller(id: string, current: boolean) {
  return (dispatch: Dispatch<any>) => {
    dispatch({ type: sellerConstants.GET_SELLER_REQUEST, payload: "" });
    sellersService
      .setFave(id, current)
      .then(() => {
        alert(`Seller ${current ? "unfavorited" : "favorited"}!`);
        dispatch(getAllSellers());
      })
      .catch(() => {
        dispatch({
          type: sellerConstants.GET_SELLER_REQUEST_FAILURE,
          payload: "",
        });
        alert("Could not un/favorite seller at this time. Please try again.");
      });
  };
}

function getSellerByID(
  id: string,
  history: any,
  setSeller: Dispatch<SetStateAction<string>> = () => {}
) {
  return (dispatch: Dispatch<Action>) => {
    dispatch({ type: sellerConstants.GET_SELLER_REQUEST, payload: "" });
    sellersService
      .getByID(id)
      .then((seller: Seller) => {
        dispatch(success(seller));
        setSeller(seller.name);
        history.push(`/manage/seller/${id}`);
      })
      .catch(() => {
        dispatch({
          type: sellerConstants.GET_SELLER_REQUEST_FAILURE,
          payload: "",
        });
        alert("Could not retrieve seller at this time. Please try again.");
      });
  };
  function success(seller: Seller) {
    return {
      type: sellerConstants.GET_SELLER_BY_ID,
      payload: seller,
    };
  }
}

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

function deleteSeller(id: string, history: any) {
  return (dispatch: Dispatch<any>) => {
    dispatch({ type: sellerConstants.GET_SELLER_REQUEST, payload: "" });
    sellersService
      .remove(id)
      .then(() => {
        dispatch(getAllSellers());
        history.goBack();
      })
      .catch((error: Error) => {
        if (error.message === "receiptsWithSeller") {
          alert("Could not delete seller. Seller is linked to receipts.");
        } else {
          alert("Could not delete seller. Please try again.");
        }
        dispatch({
          type: sellerConstants.GET_SELLER_REQUEST_FAILURE,
          payload: "",
        });
        console.error("Error deleting seller: ", error);
      });
  };
}

function renameSeller(id: string, newName: string) {
  return (dispatch: Dispatch<any>) => {
    dispatch({ type: sellerConstants.GET_SELLER_REQUEST, payload: "" });
    sellersService
      .rename(id, newName)
      .then(() => {
        dispatch(getAllSellers());
        alert("Seller renamed!");
      })
      .catch((error: Error) => {
        dispatch({
          type: sellerConstants.GET_SELLER_REQUEST_FAILURE,
          payload: "",
        });
        alert("Could not rename seller. Please try again.");
        console.error("Error renaming seller: ", error);
      });
  };
}
