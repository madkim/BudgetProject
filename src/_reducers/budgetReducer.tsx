import { budgetConstants } from "../_constants/budgetConstants";
import { Action } from "../_helpers/types";

export const initState = {
  loading: false,
  totalSpent: 0,
};

export function budgetReducer(state = initState, action: Action) {
  if (action.type === budgetConstants.MAKE_BUDGET_REQUEST) {
    return (state = {
      ...state,
      loading: true,
    });
  }
  if (action.type === budgetConstants.BUDGET_REQUEST_FAILURE) {
    return (state = {
      ...state,
      loading: false,
    });
  }
  if (action.type === budgetConstants.GET_TOTAL_SPENT) {
    return (state = {
      ...state,
      loading: false,
      totalSpent: action.payload,
    });
  }
  return state;
}
