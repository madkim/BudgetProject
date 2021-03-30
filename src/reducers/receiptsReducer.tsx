import { receiptsConstants } from "../constants/receiptsConstants";
import { Action, Receipt } from "../helpers/types";

export const initState = {
  receipts: [],
  tagOptions: {},
};

export function receiptsReducer(state = initState, action: Action) {
  if (action.type === receiptsConstants.GET_ALL_RECEIPTS) {
    return (state = {
      ...state,
      receipts: action.payload,
    });
  }
  if (action.type === receiptsConstants.ADD_NEW_RECEIPT) {
    return (state = {
      ...state,
      receipts: action.payload,
    });
  }
  if (action.type === receiptsConstants.DELETE_RECEIPT) {
    const receiptId = action.payload;
    return (state = {
      ...state,
      receipts: state.receipts.filter(
        (receipt: Receipt) => receipt.id !== receiptId
      ),
    });
  }
  if (action.type === receiptsConstants.GET_ALL_TAGS) {
    return (state = {
      ...state,
      tagOptions: action.payload,
    });
  }
  if (action.type === receiptsConstants.UPDATE_TAGS) {
    return (state = {
      ...state,
      tagOptions: action.payload,
    });
  }
  if (action.type === receiptsConstants.ADD_NEW_TAG) {
    return (state = {
      ...state,
      tagOptions: action.payload,
    });
  }
  return state;
}
