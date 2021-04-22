import { Action } from "../_helpers/types";
import { budgetConstants } from "../_constants/budgetConstants";

export const initState = {
  budget: {},
  loading: false,
};

export function budgetReducer(state = initState, action: Action) {
  if (action.type === budgetConstants.GET_BUDGET_REQUEST_FAILURE) {
    return (state = {
      ...state,
      loading: false,
    });
  }
  if (action.type === budgetConstants.GET_BUDGET_REQUEST) {
    return (state = {
      ...state,
      loading: true,
    });
  }
  if (action.type === budgetConstants.GET_BUDGET) {
    return (state = {
      ...state,
      loading: false,
      budget: action.payload,
    });
  }
  return state;
}
