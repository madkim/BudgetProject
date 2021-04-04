import { receiptConstants } from "../_constants/receiptConstants";
import { Action, Receipt } from "../_helpers/types";

export const initState = {
  loading: false,
  receipt: {},
  receipts: [],
  sellerOptions: {},
};

export function receiptsReducer(state = initState, action: Action) {
  if (action.type === receiptConstants.GET_RECEIPT_REQUEST) {
    return (state = {
      ...state,
      loading: true,
    });
  }
  if (action.type === receiptConstants.GET_RECEIPT_BY_ID) {
    return (state = {
      ...state,
      loading: false,
      receipt: action.payload,
    });
  }
  if (action.type === receiptConstants.GET_ALL_RECEIPTS) {
    return (state = {
      ...state,
      receipts: action.payload,
    });
  }
  if (action.type === receiptConstants.ADD_NEW_RECEIPT) {
    return (state = {
      ...state,
      receipts: action.payload,
    });
  }
  if (action.type === receiptConstants.DELETE_RECEIPT) {
    const receiptId = action.payload;
    return (state = {
      ...state,
      receipts: state.receipts.filter(
        (receipt: Receipt) => receipt.id !== receiptId
      ),
    });
  }
  if (action.type === receiptConstants.GET_ALL_SELLERS) {
    return (state = {
      ...state,
      sellerOptions: action.payload,
    });
  }
  if (action.type === receiptConstants.UPDATE_SELLER) {
    return (state = {
      ...state,
      sellerOptions: action.payload,
    });
  }
  if (action.type === receiptConstants.ADD_NEW_SELLER) {
    return (state = {
      ...state,
      sellerOptions: action.payload,
    });
  }
  return state;
}
