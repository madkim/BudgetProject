import { sellerConstants } from "../_constants/sellerConstants";
import { Action } from "../_helpers/types";

export const initState = {
  seller: {},
  request: "",
  loading: false,
  sellerOptions: {},
};

export function sellersReducer(state = initState, action: Action) {
  if (action.type === sellerConstants.GET_SELLER_REQUEST) {
    return (state = {
      ...state,
      request: "sent",
      loading: true,
    });
  }

  if (action.type === sellerConstants.GET_SELLER_REQUEST_FAILURE) {
    return (state = {
      ...state,
      request: "failed",
      loading: false,
    });
  }

  if (action.type === sellerConstants.GET_SELLER_BY_ID) {
    return (state = {
      ...state,
      loading: false,
      seller: action.payload,
    });
  }

  if (action.type === sellerConstants.GET_ALL_SELLERS) {
    return (state = {
      ...state,
      loading: false,
      sellerOptions: action.payload,
    });
  }

  if (action.type === sellerConstants.UPDATE_SELLER) {
    return (state = {
      ...state,
      loading: false,
      sellerOptions: action.payload,
    });
  }

  if (action.type === sellerConstants.ADD_NEW_SELLER) {
    return (state = {
      ...state,
      loading: false,
      sellerOptions: action.payload,
    });
  }
  return state;
}
