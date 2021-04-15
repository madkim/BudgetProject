import { spendingConstants } from "../_constants/spendingConstants";
import { Action } from "../_helpers/types";

export const initState = {
  day: [],
  days: {},
  loading: false,
  totalSpent: 0,
};

export function spendingReducer(state = initState, action: Action) {
  if (action.type === spendingConstants.MAKE_SPENDING_REQUEST) {
    return (state = {
      ...state,
      loading: true,
    });
  }
  if (action.type === spendingConstants.SPENDING_REQUEST_FAILURE) {
    return (state = {
      ...state,
      loading: false,
    });
  }
  if (action.type === spendingConstants.GET_TOTAL_SPENT) {
    return (state = {
      ...state,
      loading: false,
      totalSpent: action.payload,
    });
  }
  if (action.type === spendingConstants.GET_TOTAL_SPENT) {
    return (state = {
      ...state,
      loading: false,
      totalSpent: action.payload,
    });
  }
  if (action.type === spendingConstants.GET_TOTAL_SPENT_BY_DAYS) {
    return (state = {
      ...state,
      loading: false,
      days: action.payload,
    });
  }
  if (action.type === spendingConstants.GET_TOTAL_SPENT_BY_DAY) {
    return (state = {
      ...state,
      loading: false,
      day: action.payload,
    });
  }
  return state;
}
