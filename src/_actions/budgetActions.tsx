import { Dispatch } from "react";
import { budgetService } from "../_services/budgetService";
import { Action, Budget } from "../_helpers/types";
import { budgetConstants } from "../_constants/budgetConstants";

export const budgetActions = {
  getCurrentBudget,
};

function getCurrentBudget(month: string) {
  return (dispatch: Dispatch<Action>) => {
    dispatch({ type: budgetConstants.GET_BUDGET_REQUEST, payload: true });
    budgetService
      .getBudget(month)
      .then((budget: Budget) => {
        dispatch(success(budget));
      })
      .catch(() => {
        dispatch({
          type: budgetConstants.GET_BUDGET_REQUEST_FAILURE,
          payload: false,
        });
        alert("Could not retrieve budget at this time. Please try again.");
      });
  };
  function success(budget: Budget) {
    return {
      type: budgetConstants.GET_BUDGET,
      payload: budget,
    };
  }
}
