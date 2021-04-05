import { sellerConstants } from "../_constants/sellerConstants";
import { Action } from "../_helpers/types";

export const initState = {
  loading: false,
  sellerOptions: {},
};

export function sellersReducer(state = initState, action: Action) {
  if (action.type === sellerConstants.GET_ALL_SELLERS) {
    return (state = {
      ...state,
      sellerOptions: action.payload,
    });
  }
  if (action.type === sellerConstants.UPDATE_SELLER) {
    return (state = {
      ...state,
      sellerOptions: action.payload,
    });
  }
  if (action.type === sellerConstants.ADD_NEW_SELLER) {
    return (state = {
      ...state,
      sellerOptions: action.payload,
    });
  }
  return state;
}
