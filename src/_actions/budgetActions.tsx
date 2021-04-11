import { Action } from "../_helpers/types";
import { Dispatch } from "react";
import { budgetConstants } from "../_constants/budgetConstants";
import { budgetService } from "../_services/budgetService";

export const budgetActions = {
  getTotalSpent,
};

function getTotalSpent() {
  return (dispatch: Dispatch<Action>) => {
    dispatch({ type: budgetConstants.MAKE_BUDGET_REQUEST, payload: true });
    budgetService
      .getTotal()
      .then((total: number) => {
        dispatch(success(total));
      })
      .catch(() => {
        dispatch({
          type: budgetConstants.BUDGET_REQUEST_FAILURE,
          payload: false,
        });
        alert("Could not retrieve total spent at this time. Please try again.");
      });
  };
  function success(total: number) {
    return {
      type: budgetConstants.GET_TOTAL_SPENT,
      payload: total,
    };
  }
}
